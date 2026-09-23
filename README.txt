Tabbara Fish POS - All Fixes v60

Changes in this package:
- Faster login/startup: network sync and WhatsApp polling start only after login; QZ Tray loads lazily.
- Arabic receipt remains browser-rendered through html2canvas + QZ Tray signing.
- Every invoice prints two physically separate copies: print -> cut -> print -> cut.
- Delivery time is shown in its own bold box and is removed from printed notes without changing the database notes.
- Fish preparation is combined on the receipt (example: سردين مقلي $13) without changing menu/AI calculations.
- Receipt text is heavier/bolder while keeping the same 72mm receipt width.
- Reports are daily by Beirut date with a date picker.
- Invoice numbers are centralized in Supabase and reset daily per Asia/Beirut with no cross-device duplicates.
- WhatsApp orders use an atomic pending -> printing -> synced claim so one order is not auto-printed twice. Failed prints remain in "printing" instead of being retried automatically.

Supabase:
- The included SUPABASE_DAILY_INVOICE_NUMBERING.sql was already applied to project tpvhxauivmjgfcugpldp.
- Existing order/customer records were not deleted. Existing orders were only given the new invoice_date/invoice_no metadata needed for centralized numbering.

Printing:
1. Keep QZ Tray installed.
2. Keep the QZ Tray Demo Cert folder on the Windows desktop with digital-certificate.txt and private-key.pem.
3. Do NOT upload or share private-key.pem.
4. Start START_TABBARA_PRINT_BRIDGE.bat on the Windows PC connected to XP-80C.
5. The bridge serves the QZ certificate/key only on 127.0.0.1 and sends raw print data to XP-80C.

Files:
- index.html
- script.js
- style.css
- sw.js
- qz-integration.js
- TabbaraPrintBridge.ps1
- START_TABBARA_PRINT_BRIDGE.bat
- SUPABASE_DAILY_INVOICE_NUMBERING.sql
- logo.png
