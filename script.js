/* =========================
   قائمة الطعام
========================= */
const defaultMenu = [
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
/* =========================
   تحميل المنيو المحفوظة
========================= */
let menu = JSON.parse(
  localStorage.getItem("menu")
);
if (!Array.isArray(menu)) {
  menu = [...defaultMenu];
  localStorage.setItem(
    "menu",
    JSON.stringify(menu)
  );
}
let cart = [];
let orderType = "";
/* =========================
   حفظ المنيو
========================= */
function saveMenu() {
  localStorage.setItem(
    "menu",
    JSON.stringify(menu)
  );
}
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
    const div =
      document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <span>
        ${item.name}
        <br>
        $${itemTotal}
      </span>
      <span class="quantity">
        <button
          type="button"
          onclick="changeQuantity('${item.name}', -1)">
          −
        </button>
        ${item.quantity}
        <button
          type="button"
          onclick="changeQuantity('${item.name}', 1)">
          +
        </button>
      </span>
    `;
    cartItems.appendChild(div);
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
            type="button"
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
/* =========================================================
   إدارة المنيو
========================================================= */
/* =========================
   فتح إدارة المنيو
========================= */
function showMenuManager() {
  const existing =
    document.getElementById("menuManagerOverlay");
  if (existing) {
    existing.remove();
  }
  const categories = [
    "مقبلات",
    "أسماك",
    "مشاوي",
    "مقالي",
    "سلطات",
    "مشروبات"
  ];
  let html = `
    <div id="menuManagerOverlay"
      style="
        position:fixed;
        inset:0;
        background:rgba(0,0,0,0.6);
        z-index:10000;
        padding:15px;
        overflow:auto;
      ">
      <div style="
        background:white;
        max-width:900px;
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
          <h2 style="margin:0;">
            ⚙️ إدارة المنيو
          </h2>
          <button
            type="button"
            onclick="closeMenuManager()"
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
        <div style="
          background:#eef4f6;
          padding:15px;
          border-radius:10px;
          margin-bottom:15px;
        ">
          <h3 style="margin-top:0;">
            ➕ إضافة صنف جديد
          </h3>
          <input
            id="newItemName"
            type="text"
            placeholder="اسم الصنف"
            style="
              width:100%;
              padding:12px;
              margin:5px 0;
              border:1px solid #ccc;
              border-radius:8px;
            "
          >
          <input
            id="newItemPrice"
            type="number"
            step="0.01"
            min="0"
            placeholder="السعر بالدولار"
            style="
              width:100%;
              padding:12px;
              margin:5px 0;
              border:1px solid #ccc;
              border-radius:8px;
            "
          >
          <select
            id="newItemCategory"
            style="
              width:100%;
              padding:12px;
              margin:5px 0;
              border:1px solid #ccc;
              border-radius:8px;
            "
          >
            ${categories.map(category => `
              <option value="${category}">
                ${category}
              </option>
            `).join("")}
          </select>
          <button
            type="button"
            onclick="addNewMenuItem()"
            style="
              width:100%;
              padding:13px;
              margin-top:8px;
              border:none;
              border-radius:8px;
              background:#16803c;
              color:white;
              font-size:16px;
              font-weight:bold;
              cursor:pointer;
            "
          >
            ➕ إضافة الصنف
          </button>
        </div>
        <h3>
          🍽️ الأصناف الحالية
        </h3>
        <div id="menuManagerItems"></div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML(
    "beforeend",
    html
  );
  renderMenuManager();
}
/* =========================
   عرض أصناف إدارة المنيو
========================= */
function renderMenuManager() {
  const container =
    document.getElementById("menuManagerItems");
  if (!container) return;
  if (menu.length === 0) {
    container.innerHTML = `
      <p style="text-align:center;">
        لا يوجد أصناف
      </p>
    `;
    return;
  }
  container.innerHTML = "";
  menu.forEach((item, index) => {
    const row =
      document.createElement("div");
    row.style.cssText = `
      background:#f5f6f7;
      padding:12px;
      margin:8px 0;
      border-radius:10px;
    `;
    row.innerHTML = `
      <div style="
        display:grid;
        grid-template-columns:1fr 130px 150px;
        gap:8px;
        align-items:center;
      ">
        <input
          id="menuName${index}"
          type="text"
          value="${item.name}"
          style="
            width:100%;
            padding:10px;
            border:1px solid #ccc;
            border-radius:7px;
          "
        >
        <input
          id="menuPrice${index}"
          type="number"
          step="0.01"
          min="0"
          value="${item.price}"
          style="
            width:100%;
            padding:10px;
            border:1px solid #ccc;
            border-radius:7px;
          "
        >
        <select
          id="menuCategory${index}"
          style="
            width:100%;
            padding:10px;
            border:1px solid #ccc;
            border-radius:7px;
          "
        >
          <option value="مقبلات">مقبلات</option>
          <option value="أسماك">أسماك</option>
          <option value="مشاوي">مشاوي</option>
          <option value="مقالي">مقالي</option>
          <option value="سلطات">سلطات</option>
          <option value="مشروبات">مشروبات</option>
        </select>
      </div>
      <div style="
        display:flex;
        gap:8px;
        margin-top:8px;
      ">
        <button
          type="button"
          onclick="updateMenuItem(${index})"
          style="
            flex:1;
            padding:10px;
            border:none;
            border-radius:7px;
            background:#16803c;
            color:white;
            font-weight:bold;
            cursor:pointer;
          "
        >
          💾 حفظ التعديل
        </button>
        <button
          type="button"
          onclick="deleteMenuItem(${index})"
          style="
            padding:10px 15px;
            border:none;
            border-radius:7px;
            background:#777;
            color:white;
            font-weight:bold;
            cursor:pointer;
          "
        >
          🗑️ حذف
        </button>
      </div>
    `;
    container.appendChild(row);
    document.getElementById(
      `menuCategory${index}`
    ).value = item.category;
  });
}
/* =========================
   تعديل صنف
========================= */
function updateMenuItem(index) {
  const name =
    document.getElementById(
      `menuName${index}`
    ).value.trim();
  const price =
    Number(
      document.getElementById(
        `menuPrice${index}`
      ).value
    );
  const category =
    document.getElementById(
      `menuCategory${index}`
    ).value;
  if (!name) {
    alert("اكتب اسم الصنف");
    return;
  }
  if (isNaN(price) || price < 0) {
    alert("اكتب سعر صحيح");
    return;
  }
  const oldName =
    menu[index].name;
  menu[index] = {
    name: name,
    category: category,
    price: price
  };
  /*
     إذا كان الصنف موجودًا حاليًا في الطلب
     نحدّث اسمه وسعره أيضًا.
  */
  cart.forEach(item => {
    if (item.name === oldName) {
      item.name = name;
      item.category = category;
      item.price = price;
    }
  });
  saveMenu();
  updateCart();
  renderMenuManager();
  showCategory(category);
  alert("تم حفظ التعديل ✅");
}
/* =========================
   إضافة صنف جديد
========================= */
function addNewMenuItem() {
  const name =
    document.getElementById(
      "newItemName"
    ).value.trim();
  const price =
    Number(
      document.getElementById(
        "newItemPrice"
      ).value
    );
  const category =
    document.getElementById(
      "newItemCategory"
    ).value;
  if (!name) {
    alert("اكتب اسم الصنف");
    return;
  }
  if (isNaN(price) || price < 0) {
    alert("اكتب سعر صحيح");
    return;
  }
  const exists =
    menu.some(
      item =>
        item.name.toLowerCase() ===
        name.toLowerCase()
    );
  if (exists) {
    alert("هذا الصنف موجود مسبقًا");
    return;
  }
  menu.push({
    name: name,
    category: category,
    price: price
  });
  saveMenu();
  renderMenuManager();
  showCategory(category);
  document.getElementById(
    "newItemName"
  ).value = "";
  document.getElementById(
    "newItemPrice"
  ).value = "";
  alert("تمت إضافة الصنف ✅");
}
/* =========================
   حذف صنف
========================= */
function deleteMenuItem(index) {
  const item =
    menu[index];
  if (!item) return;
  const confirmed =
    confirm(
      `هل تريد حذف "${item.name}"؟`
    );
  if (!confirmed) return;
  menu.splice(index, 1);
  /*
     إذا كان الصنف موجودًا بالطلب الحالي
     نحذفه أيضًا.
  */
  cart =
    cart.filter(
      cartItem =>
        cartItem.name !== item.name
    );
  saveMenu();
  updateCart();
  renderMenuManager();
  /*
     نعيد عرض التصنيف الحالي إذا كان موجودًا.
  */
  if (item.category) {
    showCategory(item.category);
  }
  alert("تم حذف الصنف 🗑️");
}
/* =========================
   إغلاق إدارة المنيو
========================= */
function closeMenuManager() {
  const overlay =
    document.getElementById(
      "menuManagerOverlay"
    );
  if (overlay) {
    overlay.remove();
  }
}
/* =========================
   تشغيل أول تصنيف
========================= */
showCategory("أسماك");
