/* Tabbara Fish - QZ Tray signed Arabic PNG renderer v9
   Chrome DOM -> html2canvas -> PNG -> QZ ESC/POS raster + paper cut.
   External libraries use jsDelivr instead of cdnjs for reliability.
*/
(function () {
  'use strict';

  const QZ_SRC = 'https://cdn.jsdelivr.net/npm/qz-tray@2.3.0/qz-tray.js';
  const H2C_SRC = 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js';
  const JSRSASIGN_SRC = 'https://cdn.jsdelivr.net/npm/jsrsasign@11.1.0/lib/jsrsasign-all-min.js';
  const SIGNER = 'http://127.0.0.1:17890';
  let qzReadyPromise = null;

  function loadScript(src, globalName) {
    return new Promise((resolve, reject) => {
      if (globalName && window[globalName]) return resolve();
      const s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = () => reject(new Error('Could not load ' + src));
      document.head.appendChild(s);
    });
  }

  async function localText(path) {
    const r = await fetch(SIGNER + path, { cache: 'no-store', credentials: 'omit' });
    if (!r.ok) throw new Error('Local signer HTTP ' + r.status + ' for ' + path);
    return r.text();
  }

  function configureSigning() {
    if (!window.KEYUTIL || !window.KJUR || !window.hextob64) {
      throw new Error('jsrsasign is not loaded');
    }
    qz.security.setCertificatePromise((resolve, reject) => {
      localText('/qz/certificate').then(resolve).catch(reject);
    });
    qz.security.setSignatureAlgorithm('SHA512');
    qz.security.setSignaturePromise(toSign => (resolve, reject) => {
      localText('/qz/private-key').then(privateKey => {
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
    });
  }

  async function ensureQz() {
    if (qzReadyPromise) return qzReadyPromise;
    qzReadyPromise = (async () => {
      await loadScript(JSRSASIGN_SRC, 'KEYUTIL');
      await loadScript(QZ_SRC, 'qz');
      configureSigning();
      if (!qz.websocket.isActive()) await qz.websocket.connect();
    })().catch(err => { qzReadyPromise = null; throw err; });
    return qzReadyPromise;
  }

  async function ensureHtml2Canvas() {
    await loadScript(H2C_SRC, 'html2canvas');
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

  async function renderReceiptToPng(documentHtml) {
    await ensureHtml2Canvas();

    const host = document.createElement('div');
    host.style.position = 'fixed';
    host.style.left = '-10000px';
    host.style.top = '0';
    host.style.width = '72mm';
    host.style.background = '#fff';
    host.style.zIndex = '-1';
    host.style.direction = 'rtl';
    host.style.color = '#000';

    const style = document.createElement('style');
    style.textContent = `
      .tabbara-print-root, .tabbara-print-root * {
        box-sizing: border-box !important;
      }
      .tabbara-print-root {
        width: 72mm !important;
        max-width: 72mm !important;
        margin: 0 !important;
        padding: 1.5mm 0.5mm 2mm 0.5mm !important;
        background: #fff !important;
        color: #000 !important;
        direction: rtl !important;
        text-align: right !important;
        font-family: Tahoma, Arial, sans-serif !important;
        font-size: 11.5px !important;
        line-height: 1.25 !important;
      }
      .tabbara-print-root img { max-width: 100% !important; }
      .tabbara-print-root .receipt-name,
      .tabbara-print-root [dir="rtl"] {
        direction: rtl !important;
        unicode-bidi: plaintext !important;
      }
    `;
    host.appendChild(style);

    const root = document.createElement('div');
    root.className = 'tabbara-print-root';
    root.innerHTML = String(documentHtml)
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<iframe[\s\S]*?<\/iframe>/gi, '');
    host.appendChild(root);
    document.body.appendChild(host);

    try {
      if (document.fonts && document.fonts.ready) await document.fonts.ready;

      const images = Array.from(root.querySelectorAll('img'));
      await Promise.all(images.map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise(res => {
          img.onload = res;
          img.onerror = res;
        });
      }));

      const canvas = await html2canvas(root, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        allowTaint: false,
        logging: false,
        imageTimeout: 10000
      });

      const targetWidth = 576;
      const targetHeight = Math.max(120, Math.round(canvas.height * targetWidth / canvas.width));
      const out = document.createElement('canvas');
      out.width = targetWidth;
      out.height = targetHeight;

      const ctx = out.getContext('2d', { alpha: false });
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, targetWidth, targetHeight);
      ctx.drawImage(canvas, 0, 0, targetWidth, targetHeight);

      return out.toDataURL('image/png');
    } finally {
      if (host.parentNode) host.parentNode.removeChild(host);
    }
  }

  async function printWithQz(documentHtml, orderNumber) {
    await ensureQz();
    const printer = await findPrinter();
    const png = await renderReceiptToPng(documentHtml);
    const base64 = png.slice(png.indexOf(',') + 1);

    const config = qz.configs.create(printer, {
      jobName: 'Tabbara Fish #' + (orderNumber || '')
    });

    const oneCopy = async (copyNo) => {
      const data = [
        {
          type: 'raw',
          format: 'image',
          flavor: 'base64',
          data: base64,
          options: { language: 'ESCPOS', dotDensity: 'double' }
        },
        {
          type: 'raw',
          format: 'command',
          flavor: 'hex',
          data: '1B64031D5600'
        }
      ];
      await qz.print(config, data);
      console.info('Printed invoice copy', copyNo, 'for #', orderNumber || '');
    };

    await oneCopy(1);
    await new Promise(resolve => setTimeout(resolve, 350));
    await oneCopy(2);
    return printer;
  }

  window.printWithLocalBridge = (documentHtml, orderNumber) =>
    printWithQz(documentHtml, orderNumber);

  window.tabbaraPreparePrinter = async () => {
    await ensureQz();
    return findPrinter();
  };

  window.tabbaraQzTest = async () => {
    await ensureQz();
    const printer = await findPrinter();
    console.log('XP-80C found:', printer);
    return printer;
  };
})();
