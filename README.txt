Tabbara Fish POS v47

Includes all v46 functionality plus:
- Offer management simplified to: offer name, offer details, price, available/unavailable.
- Removed item selection from the offer editor.
- Existing offer item lists are ignored when loading from Supabase.
- Saving an offer writes only price/details plus standard POS fields; old embedded item lists are no longer stored.
- AI can read offer name, details, price and availability from the live pos_menu data.

Keep existing setup and printing configuration unchanged.
