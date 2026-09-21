Tabbara Fish POS v47

Includes all v46 functionality plus:
- Offer management simplified to: offer name, offer details, price, available/unavailable.
- Removed item selection from the offer editor.
- Existing offer item lists are ignored when loading from Supabase.
- Saving an offer writes only price/details plus standard POS fields; old embedded item lists are no longer stored.
- AI can read offer name, details, price and availability from the live pos_menu data.

Keep existing setup and printing configuration unchanged.


AUTO PRINT v52
This version uses QZ Tray for direct Windows thermal printing instead of relying on Chrome kiosk printing.
Install QZ Tray on the Windows PC, start it, then open the POS over HTTPS. On first connection, allow the browser/QZ Tray permission. The POS automatically selects a printer containing XP-80C; otherwise it uses the first available Windows printer.
Official download: https://qz.io/download/

IMPORTANT: qz.print() confirms the job was sent to the selected printer; Windows/printer hardware may still report completion asynchronously.
