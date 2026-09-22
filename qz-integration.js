/* Tabbara Fish - QZ Tray Arabic receipt renderer FINAL */
(function () {
  'use strict';

  const SIGNER = 'http://127.0.0.1:17891';

  async function localText(path) {
    const r = await fetch(SIGNER + path, {cache:'no-store'});
    if (!r.ok) throw new Error('Local QZ signer error: ' + r.status);
    return r.text();
  }

  qz.security.setCertificatePromise((resolve,reject) =>
    localText('/certificate').then(resolve).catch(reject)
  );
  qz.security.setSignatureAlgorithm('SHA512');
  qz.security.setSignaturePromise(toSign => resolve => {
    localText('/private-key').then(privateKey => {
      if (typeof KEYUTIL === 'undefined' || typeof KJUR === 'undefined' || typeof hextob64 === 'undefined') {
        throw new Error('jsrsasign library is not loaded.');
      }
      const key = KEYUTIL.getKey(privateKey);
      const sig = new KJUR.crypto.Signature({alg:'SHA512withRSA'});
      sig.init(key);
      sig.updateString(toSign);
      resolve(hextob64(sig.sign()));
    }).catch(reject);
  });

  async function connectQZ() {
    if (!window.qz) throw new Error('QZ Tray Connector غير محمّل.');
    if (!qz.websocket.isActive()) await qz.websocket.connect();
  }

  async function findPrinter() {
    await connectQZ();
    const found = await qz.printers.find();
    const list = Array.isArray(found) ? found : [found];
    return list.find(p => String(p).trim().toLowerCase() === 'xp-80c') ||
           list.find(p => /xp[- ]?80c|80c/i.test(String(p))) ||
           (()=>{throw new Error('QZ Tray شغّال، لكن ما لقى طابعة XP-80C.')})();
  }

  function wrapReceiptHtml(html) {
    // QZ's HTML renderer is Java/WebKit. Give it a complete UTF-8 RTL document
    // and a Windows font with reliable Arabic shaping.
    return `<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta charset="UTF-8">
<style>
  @page { size: 80mm auto; margin: 0; }
  html, body {
    margin: 0 !important;
    padding: 0 !important;
    width: 80mm !important;
    direction: rtl !important;
    text-align: right !important;
    background: #fff !important;
  }
  body {
    font-family: Tahoma, Arial, sans-serif !important;
    color: #000;
    -webkit-font-smoothing: antialiased;
    font-kerning: normal;
  }
  * {
    box-sizing: border-box;
    font-family: Tahoma, Arial, sans-serif;
  }
  b, strong { font-weight: 700; }
  .receipt-name, [dir="rtl"] { direction: rtl !important; unicode-bidi: embed; }
  .receipt-name {
    text-align: right !important;
    white-space: normal !important;
    word-break: normal !important;
    overflow-wrap: normal !important;
  }
</style>
</head>
<body>
<div style="width:80mm;max-width:80mm;margin:0;padding:0 4mm 2mm 4mm;direction:rtl;text-align:right;">
${String(html || '')}
</div>
</body>
</html>`;
  }

  async function printThroughQZ(html, orderNumber) {
    const printer = await findPrinter();
    const documentHtml = wrapReceiptHtml(html);

    const config = qz.configs.create(printer, {
      jobName: 'Tabbara Fish #' + orderNumber,
      units: 'mm',
      margins: 0,
      orientation: 'portrait',
      scaleContent: false,
      size: {width:80, height:300}
    });

    const data = [{
      type: 'pixel',
      format: 'html',
      flavor: 'plain',
      data: documentHtml,
      options: {
        pageWidth: 80
      }
    }];

    await qz.print(config, data);
    return printer;
  }

  window.printWithLocalBridge = printThroughQZ;

  window.tabbaraQzTest = async function () {
    const health = await localText('/health');
    if (health !== 'OK') throw new Error('Local QZ signer is not running.');
    const printer = await findPrinter();
    alert('✅ QZ Tray + التوقيع شغّال\n🖨️ الطابعة: ' + printer);
    return printer;
  };

  window.addEventListener('load', function () {
    if (!window.qz) return;
    qz.websocket.connect()
      .then(() => console.info('QZ Tray connected - Arabic HTML renderer'))
      .catch(e => console.warn('QZ Tray connection:', e));
  });
})();
