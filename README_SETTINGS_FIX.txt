Tabbara Fish POS v66 - Settings fix

Updated script.js so fry/grill surcharge settings are loaded from Supabase pos_settings (fish_fry_surcharge / fish_grill_surcharge) when online, with localStorage fallback when offline.
Delivery charge remains 0 in the POS; delivery cost is handled by the restaurant by area.
No other application files were changed.
