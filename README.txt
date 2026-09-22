TABBARA FISH - QZ TRAY TEST

الملفات:
1) index.html
2) qz-integration.js

التعديل:
- تمت إضافة QZ Tray 2.3.0.
- POS سيستخدم QZ Tray بدل Print Bridge عند الطباعة.
- لا يوجد private-key.pem أو certificate داخل هذه الملفات.
- أول مرة QZ قد يطلب Allow؛ هذا متوقع في مرحلة الاختبار.

طريقة الرفع:
- استبدل index.html الموجود في GitHub بهذا الملف.
- أضف qz-integration.js إلى جذر المشروع.
- لا تحذف script.js أو style.css أو sw.js أو ملفات Print Bridge.

بعد الرفع:
1) تأكد أن QZ Tray شغّال بجانب الساعة في Windows.
2) افتح POS.
3) جرّب إعادة طباعة فاتورة.
4) إذا ظهر طلب QZ للسماح، اختر Allow/Remember إذا ظهر الخيار.
5) إذا لم تطبع، لا تغيّر أي شيء آخر؛ ابعتلي صورة الخطأ.
