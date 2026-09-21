Tabbara Fish - Local Print Bridge

1. Keep START_TABBARA_PRINT_BRIDGE.bat running on the Windows PC connected to XP-80C.
2. Open the POS from the deployed HTTPS site on the same PC.
3. New WhatsApp orders with sync_status=pending are detected automatically.
4. The POS sends the receipt image to http://127.0.0.1:17890/print.
5. The bridge accepts the browser private-network preflight and sends RAW ESC/POS data to the XP-80C Windows printer.
6. Only after a successful bridge response does the POS mark the WhatsApp order as synced.

If a print fails, the order stays pending so it can be retried.
