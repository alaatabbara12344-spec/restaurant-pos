const menu = [
  // مقبلات
  { name: "حمص", category: "مقبلات", price: 4 },
  { name: "متبل", category: "مقبلات", price: 4 },
  { name: "ورق عنب", category: "مقبلات", price: 5 },
  { name: "بطاطا حرة", category: "مقبلات", price: 5 },
  // أسماك
  { name: "قاروص", category: "أسماك", price: 15 },
  { name: "دنيس", category: "أسماك", price: 16 },
  { name: "سلطان إبراهيم", category: "أسماك", price: 18 },
  { name: "سلمون", category: "أسماك", price: 20 },
  // مشاوي
  { name: "سمك مشوي", category: "مشاوي", price: 17 },
  { name: "روبيان مشوي", category: "مشاوي", price: 19 },
  { name: "كالاماري مشوي", category: "مشاوي", price: 16 },
  // مقالي
  { name: "سمك مقلي", category: "مقالي", price: 15 },
  { name: "روبيان مقلي", category: "مقالي", price: 17 },
  { name: "كالاماري مقلي", category: "مقالي", price: 14 },
  // سلطات
  { name: "فتوش", category: "سلطات", price: 5 },
  { name: "سلطة خضراء", category: "سلطات", price: 5 },
  { name: "تبولة", category: "سلطات", price: 5 },
  // مشروبات
  { name: "Pepsi", category: "مشروبات", price: 2 },
  { name: "7Up", category: "مشروبات", price: 2 },
  { name: "مياه", category: "مشروبات", price: 1 }
];
let cart = [];
let orderType = "";
/* =========================
   رقم الطلب
========================= */
function getNextOrderNumber() {
  let number =
    Number(localStorage.getItem("orderNumber")) || 1000;
  number++;
  localStorage.setItem(
    "orderNumber",
    number
  );
  return number;
}
/* =========================
   اختيار نوع الطلب
========================= */
function setOrderType(type) {
  orderType = type;
  document.getElementById("orderType").textContent =
    type;
}
/* =========================
   عرض التصنيف
========================= */
function showCategory(category) {
  const items =
    document.getElementById("items");
  items.innerHTML = "";
  menu
    .filter(item => item.category === category)
    .forEach(item => {
      const div =
        document.createElement("div");
      div.className = "item";
      div.innerHTML = `
        <strong>${item.name}</strong>
        <div class="price">$${item.price}</div>
      `;
      div.onclick = () => addItem(item);
      items.appendChild(div);
    });
}
/* =========================
   إضافة صنف
========================= */
function addItem(item) {
  const existing =
    cart.find(x => x.name === item.name);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      ...item,
      quantity: 1
    });
  }
  updateCart();
}
/* =========================
   تغيير الكمية
========================= */
function changeQuantity(name, amount) {
  const item =
    cart.find(x => x.name === name);
  if (!item) return;
  item.quantity += amount;
  if (item.quantity <= 0) {
    cart =
      cart.filter(x => x.name !== name);
  }
  updateCart();
}
/* =========================
   تحديث السلة
========================= */
function updateCart() {
  const cartItems =
    document.getElementById("cartItems");
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    const itemTotal =
      item.price * item.quantity;
    total += itemTotal;
    cartItems.innerHTML += `
      <div class="cart-item">
        <span>
          ${item.name}
          <br>
          $${itemTotal}
        </span>
        <span class="quantity">
          <button
            onclick="changeQuantity('${item.name}', -1)">
            −
          </button>
          ${item.quantity}
          <button
            onclick="changeQuantity('${item.name}', 1)">
            +
          </button>
        </span>
      </div>
    `;
  });
  if (cart.length === 0) {
    cartItems.innerHTML =
      "<p>لا يوجد أصناف</p>";
  }
  document.getElementById("total").textContent =
    total;
}
/* =========================
   حفظ الطلب
========================= */
function saveOrder(order) {
  let orders =
    JSON.parse(
      localStorage.getItem("orders") || "[]"
    );
  orders.push(order);
  localStorage.setItem(
    "orders",
    JSON.stringify(orders)
  );
}
/* =========================
   مسح الطلب
========================= */
function clearOrder() {
  cart = [];
  orderType = "";
  document.getElementById("orderType")
    .textContent = "لم يتم الاختيار";
  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("address").value = "";
  document.getElementById("notes").value = "";
  updateCart();
}
/* =========================
   تأكيد الطلب
========================= */
function confirmOrder() {
  if (cart.length === 0) {
    alert("أضف أصناف إلى الطلب أولاً");
    return;
  }
  if (orderType === "") {
    alert("اختر نوع الطلب أولاً");
    return;
  }
  const name =
    document.getElementById("name").value;
  const phone =
    document.getElementById("phone").value;
  const address =
    document.getElementById("address").value;
  const notes =
    document.getElementById("notes").value;
  const total =
    Number(
      document.getElementById("total").textContent
    );
  const orderNumber =
    getNextOrderNumber();
  const order = {
    number: orderNumber,
    date: new Date().toLocaleString("ar-LB"),
    type: orderType,
    customer: {
      name: name,
      phone: phone,
      address: address
    },
    notes: notes,
    items: cart.map(item => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      total: item.price * item.quantity
    })),
    total: total
  };
  saveOrder(order);
  printReceipt(order);
  clearOrder();
}
/* =========================
   طباعة الإيصال
========================= */
function printReceipt(order) {
  let itemsHTML = "";
  order.items.forEach(item => {
    itemsHTML += `
      <tr>
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>$${item.total}</td>
      </tr>
    `;
  });
  const receipt = `
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <title>فاتورة #${order.number}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          width: 80mm;
          margin: 0 auto;
          padding: 10px;
          text-align: center;
        }
        h2 {
          margin-bottom: 5px;
        }
        p {
          margin: 4px 0;
          font-size: 13px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 12px;
          font-size: 13px;
        }
        th,
        td {
          padding: 5px 2px;
          border-bottom: 1px dashed #999;
        }
        .total {
          font-size: 20px;
          font-weight: bold;
          margin-top: 15px;
        }
        .footer {
          margin-top: 20px;
          font-size: 12px;
        }
        @media print {
          body {
            width: 80mm;
          }
        }
      </style>
    </head>
    <body>
      <h2>🐟 مطعم البحر</h2>
      <p>
        فاتورة رقم #${order.number}
      </p>
      <p>
        ${order.date}
      </p>
      <hr>
      <p>
        <strong>نوع الطلب:</strong>
        ${order.type}
      </p>
      <p>
        <strong>الزبون:</strong>
        ${order.customer.name || "-"}
      </p>
      <p>
        <strong>الهاتف:</strong>
        ${order.customer.phone || "-"}
      </p>
      <p>
        <strong>العنوان:</strong>
        ${order.customer.address || "-"}
      </p>
      <table>
        <thead>
          <tr>
            <th>الصنف</th>
            <th>الكمية</th>
            <th>المجموع</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHTML}
        </tbody>
      </table>
      <div class="total">
        المجموع: $${order.total}
      </div>
      <p class="footer">
        شكرًا لزيارتكم ❤️
      </p>
    </body>
    </html>
  `;
  const printWindow =
    window.open(
      "",
      "_blank",
      "width=400,height=600"
    );
  if (!printWindow) {
    alert(
      "المتصفح منع نافذة الطباعة. اسمح بالنوافذ المنبثقة ثم حاول مجددًا."
    );
    return;
  }
  printWindow.document.write(receipt);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
}
/* =========================
   عرض الطلبات السابقة
========================= */
function showOrders() {
  const orders =
    JSON.parse(
      localStorage.getItem("orders") || "[]"
    );
  let ordersHTML = `
    <div id="ordersOverlay"
      style="
        position:fixed;
        inset:0;
        background:rgba(0,0,0,0.55);
        z-index:9999;
        padding:20px;
        overflow:auto;
      ">
      <div style="
        background:white;
        max-width:800px;
        margin:20px auto;
        padding:20px;
        border-radius:15px;
        direction:rtl;
      ">
        <div style="
          display:flex;
          justify-content:space-between;
          align-items:center;
          gap:10px;
        ">
          <h2>📋 الطلبات السابقة</h2>
          <button
            onclick="closeOrders()"
            style="
              padding:10px 15px;
              border:none;
              border-radius:8px;
              cursor:pointer;
              font-size:16px;
            "
          >
            ✕ إغلاق
          </button>
        </div>
        <hr>
  `;
  if (orders.length === 0) {
    ordersHTML += `
      <p style="text-align:center;">
        لا يوجد طلبات محفوظة حتى الآن
      </p>
    `;
  } else {
    [...orders].reverse().forEach(order => {
      ordersHTML += `
        <div style="
          background:#f5f6f7;
          padding:15px;
          margin:10px 0;
          border-radius:10px;
        ">
          <h3>
            🧾 الطلب #${order.number}
          </h3>
          <p>
            📅 ${order.date}
          </p>
          <p>
            👤 الزبون:
            ${order.customer.name || "-"}
          </p>
          <p>
            📞 الهاتف:
            ${order.customer.phone || "-"}
          </p>
          <p>
            🛵 النوع:
            ${order.type}
          </p>
          <p>
            💰 المجموع:
            <strong>$${order.total}</strong>
          </p>
          <details>
            <summary>
              عرض الأصناف
            </summary>
            <ul>
              ${order.items.map(item => `
                <li>
                  ${item.name}
                  × ${item.quantity}
                  — $${item.total}
                </li>
              `).join("")}
            </ul>
          </details>
        </div>
      `;
    });
  }
  ordersHTML += `
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML(
    "beforeend",
    ordersHTML
  );
}
/* =========================
   إغلاق الطلبات السابقة
========================= */
function closeOrders() {
  const overlay =
    document.getElementById("ordersOverlay");
  if (overlay) {
    overlay.remove();
  }
}
/* =========================
   تشغيل أول تصنيف
========================= */
showCategory("أسماك");
