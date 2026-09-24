Tabbara Fish POS — v62

This package is a GitHub-ready code update prepared without changing GitHub or Supabase directly.

Included code-side fixes:
- POS offline order: save locally first, print immediately, sync later without re-printing.
- WhatsApp pending orders: when the POS reconnects, pending WhatsApp orders are checked and printed.
- Each invoice keeps the existing two-copy QZ printing behavior (kitchen + delivery).
- Delivery charge is not calculated or added to the order total. Delivery invoices show: "كلفة التوصيل: تحدد حسب المنطقة".
- Delivery time is read from the dedicated delivery_time field first, with fallback parsing from notes.
- Weight preparation option "ني" prints as "ني", never "Raw".
- POS menu is refreshed from Supabase before rendering on startup when online; local menu remains the offline fallback.
- pos_settings writes now use key/on_conflict=key.
- Cache/version bumped to v62.

Supabase work intentionally NOT included in this zip:
- Add idempotent client_order_id / unique constraint for duplicate-proof sync.
- Central invoice numbering across devices.
- Final WhatsApp print/claim locking across multiple POS devices.
- RLS/security cleanup for obsolete backup table.

After uploading this zip to GitHub, Supabase should be updated and then the code can be rechecked against the new schema.
