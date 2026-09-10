Tabbara Seafood POS - Multi-device menu sync

Updated script.js reads/writes the central Supabase public.pos_menu table.
Menu changes are stored per item and auto-downloaded every 10 seconds.
The existing orders/customers tables are not modified by this package.

Before deployment: replace the repository script.js with this file and test the POS.
