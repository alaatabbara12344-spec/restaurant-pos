/* Tabbara Fish - QZ Tray signed Arabic PNG renderer
   Renders the receipt in the browser first, then sends a PNG to QZ as
   ESC/POS raster data. This avoids QZ's HTML/RTL shaping problems.
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
    const r = await fetch(SIGNER + path, { cache: 'no-store', credentials: 'omit' });
    if (!r.ok) throw new Error('Local signer HTTP ' + r.status + ' for ' + path);
    return r.text();
  }

  function configureSigning() {
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
    if (!qz.websocket.isActive()) await qz.websocket.connect();
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

  function htmlToPngDataUrl(html) {
    return new Promise((resolve, reject) => {
      const width = 576;
      const cssWidth = 272;
      const scale = width / cssWidth;
      const height = 2400;

      const safe = String(html)
        .replace(/<script[\s\S]*?<\/script>/gi, '')
        .replace(/<iframe[\s\S]*?<\/iframe>/gi, '');

      const svg =
        '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xhtml="http://www.w3.org/1999/xhtml"' +
        ' width="' + width + '" height="' + height + '">' +
        '<rect width="100%" height="100%" fill="white"/>' +
        '<foreignObject x="0" y="0" width="' + width + '" height="' + height + '">' +
        '<div xmlns="http://www.w3.org/1999/xhtml" style="' +
          'width:' + cssWidth + 'px;' +
          'min-height:' + Math.floor(height / scale) + 'px;' +
          'background:#fff;color:#000;' +
          'font-family:Tahoma,Arial,sans-serif;' +
          'font-size:11.5px;line-height:1.35;' +
          'direction:rtl;text-align:right;' +
          'overflow:hidden;">' +
          safe +
        '</div></foreignObject></svg>';

      const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const img = new Image();

      img.onload = function () {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d', { alpha: false });
          ctx.fillStyle = '#fff';
          ctx.fillRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);
          URL.revokeObjectURL(url);

          // Trim only empty white space from the bottom.
          const pixels = ctx.getImageData(0, 0, width, height).data;
          let bottom = height;
          outer:
          for (let y = height - 1; y >= 0; y--) {
            for (let x = 0; x < width; x++) {
              const i = (y * width + x) * 4;
              if (pixels[i] < 245 || pixels[i + 1] < 245 || pixels[i + 2] < 245) {
                bottom = Math.min(height, y + 12);
                break outer;
              }
            }
          }

          const out = document.createElement('canvas');
          out.width = width;
          out.height = Math.max(120, bottom);
          out.getContext('2d').drawImage(canvas, 0, 0, width, out.height, 0, 0, width, out.height);
          resolve(out.toDataURL('image/png'));
        } catch (e) {
          URL.revokeObjectURL(url);
          reject(e);
        }
      };
      img.onerror = function () {
        URL.revokeObjectURL(url);
        reject(new Error('Browser could not render receipt HTML as PNG'));
      };
      img.src = url;
    });
  }

  async function printWithQz(documentHtml, orderNumber) {
    await ensureQz();
    const printer = await findPrinter();

    const png = await htmlToPngDataUrl(documentHtml);
    const base64 = png.substring(png.indexOf(',') + 1);

    const config = qz.configs.create(printer, {
      jobName: 'Tabbara Fish #' + (orderNumber || '')
    });

    const data = [{
      type: 'raw',
      format: 'image',
      flavor: 'base64',
      data: base64,
      options: {
        language: 'ESCPOS',
        dotDensity: 'double'
      }
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
    .then(() => console.info('QZ Tray connected - signed Arabic PNG renderer'))
    .catch(err => console.error('QZ Tray setup failed', err));
})();
