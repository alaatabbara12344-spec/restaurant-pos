/* Tabbara Fish - QZ Tray FINAL HTML printing
   Root fix:
   - Does NOT convert the receipt to PNG/canvas.
   - Sends the existing receipt HTML directly to QZ Tray's pixel HTML engine.
   - This avoids the cross-origin/canvas-taint SecurityError completely.
   - The private key remains on the POS PC via the local signer.
*/
(function () {
  'use strict';

  const SIGNER = 'http://127.0.0.1:17891';

  async function localText(path) {
    const response = await fetch(SIGNER + path, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error('Local QZ signer error: ' + response.status);
    }
    return response.text();
  }

  // QZ certificate
  qz.security.setCertificatePromise(function (resolve, reject) {
    localText('/certificate').then(resolve).catch(reject);
  });

  qz.security.setSignatureAlgorithm('SHA512');

  // QZ digital signature
  qz.security.setSignaturePromise(function (toSign) {
    return function (resolve, reject) {
      localText('/private-key')
        .then(function (privateKey) {
          try {
            if (
              typeof KEYUTIL === 'undefined' ||
              typeof KJUR === 'undefined' ||
              typeof hextob64 === 'undefined'
            ) {
              throw new Error('jsrsasign library is not loaded.');
            }

            const key = KEYUTIL.getKey(privateKey);
            const signature = new KJUR.crypto.Signature({
              alg: 'SHA512withRSA'
            });

            signature.init(key);
            signature.updateString(toSign);

            resolve(hextob64(signature.sign()));
          } catch (error) {
            reject(error);
          }
        })
        .catch(reject);
    };
  });

  async function connectQZ() {
    if (!window.qz) {
      throw new Error('QZ Tray Connector غير محمّل.');
    }
    if (!qz.websocket.isActive()) {
      await qz.websocket.connect();
    }
  }

  async function findPrinter() {
    await connectQZ();

    const printers = await qz.printers.find();
    const list = Array.isArray(printers) ? printers : [printers];

    const exact = list.find(
      p => String(p).trim().toLowerCase() === 'xp-80c'
    );
    if (exact) return exact;

    const match = list.find(p => /xp[- ]?80c|80c/i.test(String(p)));
    if (match) return match;

    throw new Error('QZ Tray شغّال، لكن ما لقى طابعة XP-80C.');
  }

  async function printThroughQZ(html, orderNumber) {
    const printer = await findPrinter();

    // IMPORTANT:
    // Print HTML directly. Do not call htmlToPngDataUrl().
    // This is the actual root fix for the canvas SecurityError.
    const config = qz.configs.create(printer, {
      jobName: 'Tabbara Fish #' + orderNumber,
      units: 'mm',
      margins: 0,
      scaleContent: false,
      orientation: 'portrait',
      size: {
        width: 80,
        height: 300
      }
    });

    const data = [{
      type: 'pixel',
      format: 'html',
      flavor: 'plain',
      data: String(html || ''),
      options: {
        pageWidth: 72
      }
    }];

    await qz.print(config, data);
    return printer;
  }

  // Replace the POS print transport.
  window.printWithLocalBridge = printThroughQZ;

  // Manual connection/printer test.
  window.tabbaraQzTest = async function () {
    const health = await localText('/health');
    if (health !== 'OK') {
      throw new Error('Local QZ signer is not running.');
    }

    const printer = await findPrinter();

    alert(
      '✅ QZ Tray + التوقيع شغّال\n' +
      '🖨️ الطابعة: ' + printer
    );

    return printer;
  };

  window.addEventListener('load', function () {
    if (!window.qz) return;

    qz.websocket
      .connect()
      .then(function () {
        console.info('QZ Tray connected with signing (HTML mode)');
      })
      .catch(function (error) {
        console.warn('QZ Tray connection:', error);
      });
  });
})();
