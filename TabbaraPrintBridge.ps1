$ErrorActionPreference = 'Stop'
$Port = 17890
$Prefix = "http://127.0.0.1:$Port/"

Add-Type -AssemblyName System.Drawing
Add-Type -TypeDefinition @"
using System;
using System.Runtime.InteropServices;
public static class RawPrinter {
  [StructLayout(LayoutKind.Sequential, CharSet=CharSet.Unicode)] public class DOCINFO {
    [MarshalAs(UnmanagedType.LPWStr)] public string pDocName;
    [MarshalAs(UnmanagedType.LPWStr)] public string pOutputFile;
    [MarshalAs(UnmanagedType.LPWStr)] public string pDataType;
  }
  [DllImport("winspool.drv", SetLastError=true, CharSet=CharSet.Unicode)] public static extern bool OpenPrinter(string pPrinterName, out IntPtr phPrinter, IntPtr pDefault);
  [DllImport("winspool.drv", SetLastError=true)] public static extern bool ClosePrinter(IntPtr hPrinter);
  [DllImport("winspool.drv", SetLastError=true, CharSet=CharSet.Unicode)] public static extern bool StartDocPrinter(IntPtr hPrinter, int level, [In] DOCINFO di);
  [DllImport("winspool.drv", SetLastError=true)] public static extern bool EndDocPrinter(IntPtr hPrinter);
  [DllImport("winspool.drv", SetLastError=true)] public static extern bool StartPagePrinter(IntPtr hPrinter);
  [DllImport("winspool.drv", SetLastError=true)] public static extern bool EndPagePrinter(IntPtr hPrinter);
  [DllImport("winspool.drv", SetLastError=true)] public static extern bool WritePrinter(IntPtr hPrinter, byte[] pBytes, int dwCount, out int dwWritten);
  public static void Send(string printer, byte[] bytes, string name){
    IntPtr h;
    if(!OpenPrinter(printer,out h,IntPtr.Zero)) throw new Exception("OpenPrinter failed: "+Marshal.GetLastWin32Error());
    try {
      DOCINFO di=new DOCINFO(); di.pDocName=name; di.pDataType="RAW";
      if(!StartDocPrinter(h,1,di)) throw new Exception("StartDocPrinter failed: "+Marshal.GetLastWin32Error());
      try { if(!StartPagePrinter(h)) throw new Exception("StartPagePrinter failed: "+Marshal.GetLastWin32Error());
        try { int written; if(!WritePrinter(h,bytes,bytes.Length,out written)) throw new Exception("WritePrinter failed: "+Marshal.GetLastWin32Error()); if(written != bytes.Length) throw new Exception("WritePrinter wrote only "+written+" of "+bytes.Length+" bytes."); }
        finally { EndPagePrinter(h); }
      } finally { EndDocPrinter(h); }
    } finally { ClosePrinter(h); }
  }
}
"@

function Send-Json($ctx, $status, $obj) {
  $bytes = [Text.Encoding]::UTF8.GetBytes(($obj | ConvertTo-Json -Compress -Depth 10))
  $ctx.Response.StatusCode=$status; $ctx.Response.ContentType='application/json; charset=utf-8'; $ctx.Response.Headers.Add('Access-Control-Allow-Origin','*'); $ctx.Response.Headers.Add('Access-Control-Allow-Headers','Content-Type, Accept'); if($ctx.Request.Headers['Access-Control-Request-Private-Network'] -eq 'true'){$ctx.Response.Headers.Add('Access-Control-Allow-Private-Network','true')}; $ctx.Response.Headers.Add('Access-Control-Allow-Methods','POST, OPTIONS, GET'); $ctx.Response.Headers.Add('Access-Control-Max-Age','600'); $ctx.Response.OutputStream.Write($bytes,0,$bytes.Length); $ctx.Response.Close()
}
function Get-PrinterName($requested) {
  $printers=Get-CimInstance Win32_Printer
  if($requested){$p=$printers|Where-Object {$_.Name -eq $requested}|Select-Object -First 1;if($p){return $p.Name}}
  $p=$printers|Where-Object {$_.Name -match 'XP[- ]?80C|80C'}|Select-Object -First 1
  if($p){return $p.Name}
  $p=$printers|Where-Object {$_.Default -eq $true}|Select-Object -First 1
  if($p){return $p.Name}
  throw 'لم يتم العثور على طابعة XP-80C أو طابعة Windows افتراضية.'
}
function Image-ToEscPos($bmp) {
  $targetW=576
  $scale=$targetW/$bmp.Width
  $targetH=[Math]::Max(1,[int]($bmp.Height*$scale))
  $src=New-Object Drawing.Bitmap($bmp,$targetW,$targetH)
  $cropH=$targetH
  while($cropH -gt 1){$dark=$false;for($x=0;$x -lt $targetW;$x+=4){$c=$src.GetPixel($x,$cropH-1);if(($c.R+$c.G+$c.B)/3 -lt 245){$dark=$true;break}}if($dark){break};$cropH--}
  $bytes=New-Object System.Collections.Generic.List[byte]
  $bytes.AddRange([byte[]](0x1B,0x40))
  $bytes.AddRange([byte[]](0x1B,0x61,0x00))
  $bytes.AddRange([byte[]](0x1D,0x76,0x30,0x00))
  $widthBytes=[int][Math]::Ceiling($targetW/8)
  $bytes.Add([byte]($widthBytes -band 0xFF)); $bytes.Add([byte](($widthBytes -shr 8)-band 0xFF)); $bytes.Add([byte]($cropH -band 0xFF)); $bytes.Add([byte](($cropH -shr 8)-band 0xFF))
  for($y=0;$y -lt $cropH;$y++){
    for($xb=0;$xb -lt $widthBytes;$xb++){
      $v=0
      for($bit=0;$bit -lt 8;$bit++){$x=$xb*8+$bit;if($x -ge $targetW){continue};$c=$src.GetPixel($x,$y);$g=($c.R*299+$c.G*587+$c.B*114)/1000;if($g -lt 180){$v=$v -bor (1 -shl (7-$bit))}}
      $bytes.Add([byte]$v)
    }
  }
  $bytes.AddRange([byte[]](0x1B,0x64,0x03))
  $bytes.AddRange([byte[]](0x1D,0x56,0x00))
  $src.Dispose(); return $bytes.ToArray()
}

$listener=New-Object Net.HttpListener; $listener.Prefixes.Add($Prefix); $listener.Start(); Write-Host "Tabbara Print Bridge listening on $Prefix"
while($listener.IsListening){
  try{
    $ctx=$listener.GetContext();
    if($ctx.Request.HttpMethod -eq 'OPTIONS'){Send-Json $ctx 200 @{ok=$true;cors=$true;privateNetwork=$true};continue}
    if($ctx.Request.HttpMethod -eq 'GET'){
      if($ctx.Request.Url.AbsolutePath -eq '/test'){
        $printer=Get-PrinterName 'XP-80C'
        $test=New-Object System.Collections.Generic.List[byte]
        $test.AddRange([byte[]](0x1B,0x40))
        $test.AddRange([byte[]](0x1B,0x61,0x01))
        $test.AddRange([Text.Encoding]::ASCII.GetBytes('TABBARA FISH PRINT TEST'))
        $test.AddRange([byte[]](0x0A,0x0A,0x0A,0x1D,0x56,0x00))
        [RawPrinter]::Send($printer,$test.ToArray(),'Tabbara Fish Printer Test')
        Write-Host "TEST PRINT SENT: printer=$printer"
        Send-Json $ctx 200 @{ok=$true;test=$true;printer=$printer};continue
      }
      Send-Json $ctx 200 @{ok=$true;service='Tabbara Print Bridge'};continue
    }
    if($ctx.Request.HttpMethod -ne 'POST' -or $ctx.Request.Url.AbsolutePath -ne '/print'){Send-Json $ctx 404 @{ok=$false;error='Not found'};continue}
    $reader=New-Object IO.StreamReader($ctx.Request.InputStream,[Text.Encoding]::UTF8);$body=$reader.ReadToEnd();$reader.Close();
    if($ctx.Request.ContentType -like 'application/x-www-form-urlencoded*'){
      $payloadMatch=[regex]::Match($body,'(?:^|&)payload=([^&]*)')
      if(-not $payloadMatch.Success){throw 'Missing payload'}
      $body=[Uri]::UnescapeDataString($payloadMatch.Groups[1].Value.Replace('+',' '))
    }
    $job=$body|ConvertFrom-Json
    Write-Host "Print request received: invoice=$($job.orderNumber) printer=$($job.printer)"
    if(-not $job.png){throw 'Missing png'}
    $b64=[string]$job.png;if($b64 -match '^data:image/[^;]+;base64,'){$b64=$b64.Substring($b64.IndexOf(',')+1)}
    $raw=[Convert]::FromBase64String($b64);$ms=New-Object IO.MemoryStream(,$raw);$bmp=New-Object Drawing.Bitmap($ms)
    try{$printer=Get-PrinterName $job.printer;$esc=Image-ToEscPos $bmp;[RawPrinter]::Send($printer,$esc,"Tabbara Fish #$($job.orderNumber)")}finally{$bmp.Dispose();$ms.Dispose()}
    Write-Host "PRINT SENT: invoice=$($job.orderNumber) printer=$printer"
    Send-Json $ctx 200 @{ok=$true;printer=$printer;orderNumber=$job.orderNumber}
  }catch{Write-Host "PRINT ERROR: $($_.Exception.Message)";try{Send-Json $ctx 500 @{ok=$false;error=$_.Exception.Message}}catch{}}
}
