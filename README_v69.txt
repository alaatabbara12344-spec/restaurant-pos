Tabbara Fish POS v69

Included changes:
1. Menu edits are treated as the local last-known backup. User changes are stored locally and synchronized to Supabase; on reconnect, local pending menu changes are pushed before downloading cloud menu data.
2. Added an in-POS "تحديث النظام" button that unregisters the service worker, clears browser caches, and reloads with a cache-busting parameter.
3. Added "تعديل الطلب" to Previous Orders. Quantities can be increased/decreased (0.1 kg steps for weight items), the same order/invoice is updated in Supabase, total is recalculated, and the edited invoice is reprinted.
4. Added Vercel no-cache headers and bumped app asset version to v69.

Upload the files to the existing restaurant-pos GitHub repository. Existing printer bridge files in the repository can remain unchanged.
