/* Tabbara Fish - QZ Tray integration
   Test version: uses QZ Tray directly and lets QZ show its first-time Allow prompt.
   No private key or certificate is stored in this file.
*/
(function () {
  'use strict';

  async function connectQZ() {
    if (!window.qz) {
      throw new Error('QZ Tray Connector غير محمّل.');
    }
    if (qz.websocket.isActive()) return;
    await qz.websocket.connect();
  }

  async function findPrinter() {
    await connectQZ();
    const printers = await qz.printers.find();
    const list = Array.isArray(printers) ? printers : [printers];
    const exact = list.find(p => String(p).trim().toLowerCase() === 'xp-80c');
    if (exact) return exact;
    const match = list.find(p => /xp[- ]?80c|80c/i.test(String(p)));
    if (match) return match;
    throw new Error('QZ Tray شغّال، لكن ما لقى طابعة XP-80C. تأكد إن الطابعة ظاهرة في Windows.');
  }

  async function printThroughQZ(html, orderNumber) {
    const printer = await findPrinter();

    if (typeof window.htmlToPngDataUrl !== 'function') {
      throw new Error('دالة تجهيز الفاتورة غير موجودة في POS.');
    }

    const png = await window.htmlToPngDataUrl(html);
    const base64 = png.substring(png.indexOf(',') + 1);

    const config = qz.configs.create(printer, {
      jobName: 'Tabbara Fish #' + orderNumber
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

  // Existing POS calls this function. We replace only the printing transport.
  window.printWithLocalBridge = printThroughQZ;

  window.tabbaraQzTest = async function () {
    const printer = await findPrinter();
    alert('✅ QZ Tray متصل\n🖨️ الطابعة: ' + printer);
    return printer;
  };

  window.addEventListener('load', function () {
    if (window.qz) {
      qz.websocket.connect()
        .then(() => console.info('QZ Tray connected'))
        .catch(err => console.warn('QZ Tray not connected yet', err));
    }
  });
})();
