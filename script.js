const menu = [
  {name: "حمص", category: "مقبلات", price: 4},
  {name: "متبل", category: "مقبلات", price: 4},
  {name: "ورق عنب", category: "مقبلات", price: 5},
  {name: "بطاطا حرة", category: "مقبلات", price: 5},

  {name: "قاروص", category: "أسماك", price: 15},
  {name: "دنيس", category: "أسماك", price: 16},
  {name: "سلطان إبراهيم", category: "أسماك", price: 18},
  {name: "سلمون", category: "أسماك", price: 20},

  {name: "سمك مشوي", category: "مشاوي", price: 17},
  {name: "روبيان مشوي", category: "مشاوي", price: 19},
  {name: "كالاماري مشوي", category: "مشاوي", price: 16},

  {name: "سمك مقلي", category: "مقالي", price: 15},
  {name: "روبيان مقلي", category: "مقالي", price: 17},
  {name: "كالاماري مقلي", category: "مقالي", price: 14},

  {name: "فتوش", category: "سلطات", price: 5},
  {name: "سلطة خضراء", category: "سلطات", price: 5},
  {name: "تبولة", category: "سلطات", price: 5},

  {name: "Pepsi", category: "مشروبات", price: 2},
  {name: "7Up", category: "مشروبات", price: 2},
  {name: "مياه", category: "مشروبات", price: 1}
];

let cart = [];

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

function addItem(item) {
  const existing = cart.find(x => x.name === item.name);

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

function changeQuantity(name, amount) {
  const item = cart.find(x => x.name === name);

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart = cart.filter(x => x.name !== name);
  }

  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cartItems");

  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;

    total += itemTotal;

    cartItems.innerHTML += `
      <div class="cart-item">

        <span>
          ${item.name}
          <br>
          $${itemTotal}
        </span>

        <span class="quantity">

          <button onclick="changeQuantity('${item.name}', -1)">
            −
          </button>

          ${item.quantity}

          <button onclick="changeQuantity('${item.name}', 1)">
            +
          </button>

        </span>

      </div>
    `;
  });

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>لا يوجد أصناف</p>";
  }

  document.getElementById("total").textContent = total;
}

function confirmOrder() {
  if (cart.length === 0) {
    alert("أضف أصناف إلى الطلب أولاً");
    return;
  }

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;
  const notes = document.getElementById("notes").value;

  alert(
    "تم تأكيد الطلب ✅\n\n" +
    "الزبون: " + name + "\n" +
    "الهاتف: " + phone + "\n" +
    "العنوان: " + address + "\n" +
    "الملاحظات: " + notes + "\n\n" +
    "المجموع: $" +
    document.getElementById("total").textContent
  );
}

showCategory("أسماك");
