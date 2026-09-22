/* Tabbara Fish - QZ Tray signed integration
   IMPORTANT:
   - private-key.pem stays on the Windows PC.
   - It is NOT stored in GitHub.
   - The local signer must be running on the POS computer.
*/
(function () {
  'use strict';

  const SIGNER = 'http://127.0.0.1:17891';

  async function localText(path) {
    const response = await fetch(SIGNER + path, {
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error('Local QZ signer error: ' + response.status);
    }

    return await response.text();
  }

  // QZ certificate
  qz.security.setCertificatePromise(function (resolve, reject) {
    localText('/certificate')
      .then(resolve)
      .catch(reject);
  });

  // QZ signature algorithm
  qz.security.setSignatureAlgorithm('SHA512');

  // QZ signature
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
              throw new Error(
                'jsrsasign library is not loaded.'
              );
            }

            const key = KEYUTIL.getKey(privateKey);

            const signature =
              new KJUR.crypto.Signature({
                alg: 'SHA512withRSA'
              });

            signature.init(key);
            signature.updateString(toSign);

            const signed = signature.sign();

            resolve(hextob64(signed));

          } catch (error) {
            reject(error);
          }

        })
        .catch(reject);
    };
  });


  async function connectQZ() {

    if (!window.qz) {
      throw new Error(
        'QZ Tray Connector غير محمّل.'
      );
    }

    if (qz.websocket.isActive()) {
      return;
    }

    await qz.websocket.connect();
  }


  async function findPrinter() {

    await connectQZ();

    const printers = await qz.printers.find();

    const list =
      Array.isArray(printers)
        ? printers
        : [printers];

    const exact = list.find(
      p =>
        String(p)
          .trim()
          .toLowerCase() === 'xp-80c'
    );

    if (exact) {
      return exact;
    }

    const match = list.find(
      p => /xp[- ]?80c|80c/i.test(String(p))
    );

    if (match) {
      return match;
    }

    throw new Error(
      'QZ Tray شغّال، لكن ما لقى طابعة XP-80C.'
    );
  }


  async function printThroughQZ(
    html,
    orderNumber
  ) {

    const printer = await findPrinter();

    if (
      typeof window.htmlToPngDataUrl !==
      'function'
    ) {
      throw new Error(
        'دالة تجهيز الفاتورة غير موجودة في POS.'
      );
    }

    const png =
      await window.htmlToPngDataUrl(html);

    const base64 =
      png.substring(
        png.indexOf(',') + 1
      );


    const config =
      qz.configs.create(
        printer,
        {
          jobName:
            'Tabbara Fish #' +
            orderNumber
        }
      );


    const data = [

      {
        type: 'raw',

        format: 'image',

        flavor: 'base64',

        data: base64,

        options: {
          language: 'ESCPOS',
          dotDensity: 'double'
        }
      }

    ];


    await qz.print(
      config,
      data
    );

    return printer;
  }


  /*
    Existing POS printing function.
    We replace only the printing transport.
  */

  window.printWithLocalBridge =
    printThroughQZ;


  /*
    Manual QZ test.
  */

  window.tabbaraQzTest =
    async function () {

      const health =
        await localText('/health');

      if (health !== 'OK') {
        throw new Error(
          'Local QZ signer is not running.'
        );
      }

      const printer =
        await findPrinter();

      alert(
        '✅ QZ Tray + التوقيع شغّال\n' +
        '🖨️ الطابعة: ' +
        printer
      );

      return printer;
    };


  /*
    Connect when POS loads.
  */

  window.addEventListener(
    'load',
    function () {

      if (!window.qz) {
        return;
      }

      qz.websocket
        .connect()
        .then(function () {

          console.info(
            'QZ Tray connected with signing'
          );

        })
        .catch(function (error) {

          console.warn(
            'QZ Tray connection:',
            error
          );

        });

    }
  );

})();
