Tabbara Fish POS - v61 cache/printing package

IMPORTANT:
- This package updates the Service Worker/cache version to v61.
- qz-integration.js uses jsDelivr for QZ Tray and a bundled html2canvas.min.js.
- script.js is the latest PRINT_FINAL_v3 file available in the project library.
- Keep the existing logo.png and any other current project assets when replacing the files.
- After deploying, use Ctrl+F5 once and allow the new Service Worker to activate.

Recommended deployment:
1. Replace index.html, sw.js, script.js, qz-integration.js, html2canvas.min.js.
2. Keep the existing style.css and logo.png from the repository.
3. Deploy to Vercel.
4. On Windows, restart Tabbara Print Bridge before testing printing.
