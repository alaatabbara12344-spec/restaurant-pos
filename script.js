const menu = [
  // مقبلات
  {name: "حمص", category: "مقبلات", price: 4},
  {name: "متبل", category: "مقبلات", price: 4},
  {name: "ورق عنب", category: "مقبلات", price: 5},
  {name: "بطاطا حرة", category: "مقبلات", price: 5},
  // أسماك
  {name: "قاروص", category: "أسماك", price: 15},
  {name: "دنيس", category: "أسماك", price: 16},
  {name: "سلطان إبراهيم", category: "أسماك", price: 18},
  {name: "سلمون", category: "أسماك", price: 20},
  // مشاوي
  {name: "سمك مشوي", category: "مشاوي", price: 17},
  {name: "روبيان مشوي", category: "مشاوي", price: 19},
  {name: "كالاماري مشوي", category: "مشاوي", price: 16},
  // مقالي
  {name: "سمك مقلي", category: "مقالي", price: 15},
  {name: "روبيان مقلي", category: "مقالي", price: 17},
  {name: "كالاماري مقلي", category: "مقالي", price: 14},
  // سلطات
  {name: "فتوش", category: "سلطات", price: 5},
  {name: "سلطة خضراء", category: "سلطات", price: 5},
  {name: "تبولة", category: "سلطات", price: 5},
  // مشروبات
  {name: "Pepsi", category: "مشروبات", price: 2},
  {name: "7Up", category: "مشروبات", price: 2},
  {name: "مياه", category: "مشروبات", price: 1}
];
let cart = [];
let orderType = "";
/* اختيار نوع الطلب */
function setOrderType(type) {
  orderType = type;
  document.getElementById("orderType").textContent = type;
}
/* عرض التصنيف */
function showCategory(category) {
  const items = document.getElementById("items");
  items.innerHTML = "";
  menu
    .filter(item => item.category === category)
    .forEach(item => {
      const div = document.createElement("div");
      div.className = "item";
      div.innerHTML = `
        <strong>${item.name}</strong>
        <div class="price">$${item.price}</div>
      `;
      div.onclick = () => addItem(item);
      items.appendChild(div);
    });
}
/* إضافة صنف */
function addItem(item) {
  const existing = cart.find(
    x => x.name === item.name
  );
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
/* تغيير الكمية */
function changeQuantity(name, amount) {
  const item = cart.find(
    x => x.name === name
  );
  if (!item) return;
  item.quantity += amount;
  if (item.quantity <= 0) {
    cart = cart.filter(
      x => x.name !== name
    );
  }
  updateCart();
}
/* تحديث الطلب */
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
/* مسح الطلب */
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
/* تأكيد الطلب */
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
  alert(
    "تم تأكيد الطلب ✅\n\n" +
    "نوع الطلب: " +
    orderType +
    "\n" +
    "الزبون: " +
    name +
    "\n" +
    "الهاتف: " +
    phone +
    "\n" +
    "العنوان: " +
    address +
    "\n" +
    "الملاحظات: " +
    notes +
    "\n\n" +
    "المجموع: $" +
    document.getElementById("total").textContent
  );
}
/* فتح الأسماك عند تشغيل الصفحة */
showCategory("أسماك");
