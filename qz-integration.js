/* Tabbara Fish - QZ Tray signed integration
   Uses the local Tabbara Print Bridge for the QZ demo certificate/private key.
   The private key never leaves the local computer.
*/
(function () {
  'use strict';

  const QZ_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/qz-tray/2.3.0/qz-tray.js';
  const SIGNER = 'http://127.0.0.1:17890';

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      if (window.qz) return resolve();
      const s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = () => reject(new Error('Could not load QZ Tray library'));
      document.head.appendChild(s);
    });
  }

  async function localText(path) {
    const r = await fetch(SIGNER + path, {
      cache: 'no-store',
      credentials: 'omit'
    });
    if (!r.ok) throw new Error('Local signer returned HTTP ' + r.status + ' for ' + path);
    return r.text();
  }

  function configureSigning() {
    if (!window.qz || !qz.security) throw new Error('QZ security API unavailable');
    if (!window.KEYUTIL || !window.KJUR || !window.hextob64) {
      throw new Error('jsrsasign is not loaded');
    }

    qz.security.setCertificatePromise(function (resolve, reject) {
      localText('/qz/certificate').then(resolve).catch(reject);
    });

    qz.security.setSignatureAlgorithm('SHA512');

    qz.security.setSignaturePromise(function (toSign) {
      return function (resolve, reject) {
        localText('/qz/private-key').then(function (privateKey) {
          try {
            const key = KEYUTIL.getKey(privateKey);
            const sig = new KJUR.crypto.Signature({ alg: 'SHA512withRSA' });
            sig.init(key);
            sig.updateString(toSign);
            resolve(hextob64(sig.sign()));
          } catch (e) {
            reject(e);
          }
        }).catch(reject);
      };
    });
  }

  async function ensureQz() {
    await loadScript(QZ_SRC);
    configureSigning();
    if (!qz.websocket.isActive()) {
      await qz.websocket.connect();
    }
  }

  async function findPrinter() {
    const printers = await qz.printers.find();
    const list = Array.isArray(printers) ? printers : [printers];
    const exact = list.find(p => String(p).trim().toLowerCase() === 'xp-80c');
    if (exact) return exact;
    const match = list.find(p => /xp[- ]?80c|80c/i.test(String(p)));
    if (match) return match;
    throw new Error('XP-80C printer not found. Printers: ' + list.join(', '));
  }

  function wrapReceiptHtml(documentHtml) {
    return `<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<style>
@page { size: 80mm auto; margin: 0; }
html, body {
  margin: 0 !important;
  padding: 0 !important;
  width: 80mm !important;
  background: #fff !important;
  direction: rtl !important;
  text-align: right !important;
}
body {
  font-family: Tahoma, Arial, sans-serif !important;
  color: #000 !important;
  font-size: 11.5px !important;
  line-height: 1.35 !important;
}
*, *::before, *::after {
  box-sizing: border-box;
  font-family: Tahoma, Arial, sans-serif !important;
}
[dir="rtl"], .receipt-name {
  direction: rtl !important;
  unicode-bidi: plaintext !important;
}
.receipt-name {
  text-align: right !important;
  white-space: normal !important;
  word-break: normal !important;
  overflow-wrap: anywhere !important;
}
</style>
</head>
<body>
<div style="width:80mm;max-width:80mm;margin:0;padding:0 3mm 2mm 3mm;direction:rtl;text-align:right;">
${documentHtml}
</div>
</body>
</html>`;
  }

  async function printWithQz(documentHtml, orderNumber) {
    await ensureQz();
    const printer = await findPrinter();

    const config = qz.configs.create(printer, {
      jobName: 'Tabbara Fish #' + (orderNumber || ''),
      units: 'mm',
      margins: 0,
      orientation: 'portrait',
      scaleContent: false,
      size: { width: 80, height: 300 }
    });

    const data = [{
      type: 'pixel',
      format: 'html',
      flavor: 'plain',
      data: wrapReceiptHtml(documentHtml),
      options: { pageWidth: 80 }
    }];

    await qz.print(config, data);
    return printer;
  }

  window.printWithLocalBridge = function (documentHtml, orderNumber) {
    return printWithQz(documentHtml, orderNumber);
  };

  window.tabbaraQzTest = async function () {
    await ensureQz();
    const printer = await findPrinter();
    console.log('XP-80C found:', printer);
    return printer;
  };

  ensureQz()
    .then(() => console.info('QZ Tray connected - signed Arabic HTML renderer'))
    .catch(err => console.error('QZ Tray setup failed', err));
})();
