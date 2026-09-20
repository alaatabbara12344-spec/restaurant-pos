Tabbara Fish POS v22

هذه النسخة تعيد إدارة المنيو بشكل كامل:
- إضافة صنف جديد
- تعديل الصنف والسعر والتصنيف
- إلغاء/حذف الصنف
- إضافة عرض جديد
- تعديل العرض
- عرض تفاصيل العرض والأصناف الموجودة بداخله
- تعديل سعر العرض
- إخفاء/إظهار الأصناف
- كلفة التوصيل
- إضافة القلي والشوي الموحدة
- مخزون الأسماك بالكيلو

ارفع الملفات الخمسة إلى GitHub واستبدل النسخة السابقة.
بعد النشر على Vercel اعمل Refresh قوي للموقع، وإذا بقيت النسخة القديمة افتح الموقع في نافذة خاصة أو امسح Cache الموقع.


----------------------------------------
v36 - AI/WhatsApp Receipt + New 80mm Design
----------------------------------------
- Fixed AI/WhatsApp item prices on printed receipts.
- Supports price/unitPrice and calculates line totals when needed.
- New clean 80mm thermal receipt layout.
- Shows customer, phone, delivery type, address, date/time and order number.
- Delivery charge shows "يحدد حسب المنطقة" when it is still 0.
- Cleans technical delivery/WhatsApp text from receipt notes.
- Cache versions bumped to load the new print code.

v37 fixes (2026-09-20)
- Added the real Tabbara Fish logo to the 80mm receipt.
- Fixed shop phone display direction so 01 651 803 | 70 141 148 prints correctly.
- Added/connected Previous Orders, Customers, and Sales Reports screens.
- Added cache/version bump to force the new files to load.


V38 RECEIPT TEST
- Logo is embedded directly as base64 in the print HTML so PrintNode/browser image loading cannot hide it.
- Receipt typography and spacing are reduced for a more compact 80mm ticket.
- Item table uses fixed column widths so the Total column is fully visible.
- Money values are forced LTR to prevent RTL clipping/reversal.


v41 final adjustments: sales item totals fallback for WhatsApp/AI items; customer search/edit; automatic customer lookup by phone; previous-order details, reprint and delete/cancel actions; receipt text slightly enlarged; cache bumped to v41.


V42 cache/update fix: index, CSS and JS use v42; service worker uses network-first for app assets and deletes previous caches on activation.


v43 final requested changes:
- Separate menu tabs: الوجبات and الساندويشات; meal items appear in both with the correct price option.
- Customer lookup checks Supabase first by normalized phone, then local cache fallback.
- Added dedicated delivery time field stored in order metadata and shown in order details/receipt.
- Preserved previous reports, customer search/edit, previous order details/delete/reprint, receipt logo/tagline and print layout.


v45: final requested POS fixes: separate meals/sandwiches display without meal/sandwich selector, customer lookup refresh, customer delete, WhatsApp item report values, delivery time field, previous order actions, receipt font slightly larger, and cache version 44.
