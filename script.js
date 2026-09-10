// ============================================================
// TABBARA SEAFOOD POS
// script.js — Part 1 / 6
// ============================================================

const SUPABASE_URL = "https://tpvhxauivmjgfcugpldp.supabase.co";
const SUPABASE_KEY = "sb_publishable_0n__ZztsS8BQtdVn5lhmmA_WWuHjVg7";

const LOGIN_PASSWORD = "1234";

const CUSTOMER_STORAGE_KEY = "tabbaraCustomers";
const PENDING_ORDERS_KEY = "tabbaraPendingOrders";
const MENU_STORAGE_KEY = "tabbaraMenu";
const DEVICE_ID_KEY = "tabbaraDeviceId";


// ============================================================
// DEVICE ID
// ============================================================

let deviceId = localStorage.getItem(DEVICE_ID_KEY);

if (!deviceId) {
  deviceId =
    "device-" +
    Date.now() +
    "-" +
    Math.random().toString(36).substring(2, 10);

  localStorage.setItem(DEVICE_ID_KEY, deviceId);
}


// ============================================================
// MENU
// ============================================================

const DEFAULT_MENU = [

  // ----------------------------------------------------------
  // FISH
  // ----------------------------------------------------------

  {
    id: "fish-ajaj",
    category: "🐟 الأسماك",
    name: "أجاج",
    type: "weight",
    price: 12,
    grill: 3,
    fry: 4,
    available: true
  },

  {
    id: "fish-boraq",
    category: "🐟 الأسماك",
    name: "براق",
    type: "weight",
    price: 14,
    grill: 3,
    fry: 4,
    available: true
  },

  {
    id: "fish-sardine",
    category: "🐟 الأسماك",
    name: "سردين",
    type: "weight",
    price: 8,
    grill: 2,
    fry: 3,
    available: true
  },

  {
    id: "fish-la2ez-ramli",
    category: "🐟 الأسماك",
    name: "لقز رملي",
    type: "weight",
    price: 16,
    grill: 3,
    fry: 4,
    available: true
  },

  {
    id: "fish-la2ez-sakhri",
    category: "🐟 الأسماك",
    name: "لقز صخري",
    type: "weight",
    price: 18,
    grill: 3,
    fry: 4,
    available: true
  },

  {
    id: "fish-sultan",
    category: "🐟 الأسماك",
    name: "سلطان",
    type: "weight",
    price: 15,
    grill: 3,
    fry: 4,
    available: true
  },

  {
    id: "fish-masqar",
    category: "🐟 الأسماك",
    name: "مسقار",
    type: "weight",
    price: 13,
    grill: 3,
    fry: 4,
    available: true
  },

  {
    id: "fish-malifa",
    category: "🐟 الأسماك",
    name: "مليفة",
    type: "weight",
    price: 12,
    grill: 3,
    fry: 4,
    available: true
  },

  {
    id: "fish-jarbidi",
    category: "🐟 الأسماك",
    name: "جربيدي",
    type: "weight",
    price: 14,
    grill: 3,
    fry: 4,
    available: true
  },

  {
    id: "fish-armout-ashqar",
    category: "🐟 الأسماك",
    name: "عرموط أشقر",
    type: "weight",
    price: 11,
    grill: 3,
    fry: 4,
    available: true
  },

  {
    id: "fish-armout-moqatta",
    category: "🐟 الأسماك",
    name: "عرموط مقطع",
    type: "weight",
    price: 12,
    grill: 3,
    fry: 4,
    available: true
  },


  // ----------------------------------------------------------
  // SEAFOOD
  // ----------------------------------------------------------

  {
    id: "sea-shrimp-medium",
    category: "🦐 ثمار البحر",
    name: "قريدس وسط",
    type: "weight",
    price: 16,
    grill: 2,
    fry: 3,
    available: true
  },

  {
    id: "sea-shrimp-large",
    category: "🦐 ثمار البحر",
    name: "قريدس كبير",
    type: "weight",
    price: 20,
    grill: 2,
    fry: 3,
    available: true
  },

  {
    id: "sea-calamari",
    category: "🦐 ثمار البحر",
    name: "كالامار",
    type: "weight",
    price: 14,
    grill: 2,
    fry: 3,
    available: true
  },

  {
    id: "sea-fillet-fresh",
    category: "🦐 ثمار البحر",
    name: "فيليه طازج",
    type: "weight",
    price: 17,
    grill: 3,
    fry: 4,
    available: true
  },

  {
    id: "sea-fillet-crispy",
    category: "🦐 ثمار البحر",
    name: "فيليه مقرمش",
    type: "weight",
    price: 18,
    grill: 2,
    fry: 3,
    available: true
  },

  {
    id: "sea-mix",
    category: "🦐 ثمار البحر",
    name: "ثمار البحر",
    type: "sizes",
    sizes: [
      {
        name: "صغير",
        price: 15
      },
      {
        name: "وسط",
        price: 22
      },
      {
        name: "سطل",
        price: 35
      }
    ],
    available: true
  },


  // ----------------------------------------------------------
  // MEALS & SANDWICHES
  // ----------------------------------------------------------

  {
    id: "meal-harra-fish",
    category: "🍽️ الوجبات والساندويش",
    name: "سمكة حرة",
    type: "meal",
    mealPrice: 15,
    sandwichPrice: 8,
    available: true
  },

  {
    id: "meal-shrimp",
    category: "🍽️ الوجبات والساندويش",
    name: "قريدس",
    type: "meal",
    mealPrice: 15,
    sandwichPrice: 8,
    available: true
  },

  {
    id: "meal-seafood",
    category: "🍽️ الوجبات والساندويش",
    name: "ثمار البحر",
    type: "meal",
    mealPrice: 16,
    sandwichPrice: 9,
    available: true
  },

  {
    id: "meal-calamari",
    category: "🍽️ الوجبات والساندويش",
    name: "كالامار",
    type: "meal",
    mealPrice: 14,
    sandwichPrice: 8,
    available: true
  },

  {
    id: "meal-sardine",
    category: "🍽️ الوجبات والساندويش",
    name: "سردين",
    type: "meal",
    mealPrice: 11,
    sandwichPrice: 7,
    available: true
  },


  // ----------------------------------------------------------
  // APPETIZERS
  // ----------------------------------------------------------

  {
    id: "app-sayyadieh",
    category: "🥗 المقبلات",
    name: "صيادية",
    type: "sizes",
    sizes: [
      {
        name: "صغير",
        price: 5
      },
      {
        name: "وسط",
        price: 8
      },
      {
        name: "كبير",
        price: 11
      }
    ],
    available: true
  },

  {
    id: "app-mtabbal",
    category: "🥗 المقبلات",
    name: "متبل",
    type: "fixed",
    price: 4,
    available: true
  },

  {
    id: "app-shakshouka",
    category: "🥗 المقبلات",
    name: "شكشوكة",
    type: "fixed",
    price: 5,
    available: true
  },

  {
    id: "app-tarator",
    category: "🥗 المقبلات",
    name: "طرطور كبير",
    type: "fixed",
    price: 4,
    available: true
  },

  {
    id: "app-fries",
    category: "🥗 المقبلات",
    name: "بطاطا مقلية",
    type: "sizes",
    sizes: [
      {
        name: "صغير",
        price: 3
      },
      {
        name: "وسط",
        price: 5
      },
      {
        name: "كبير",
        price: 7
      }
    ],
    available: true
  },


  // ----------------------------------------------------------
  // SALADS
  // ----------------------------------------------------------

  {
    id: "salad-tabbouleh",
    category: "🥬 السلطات",
    name: "تبولة",
    type: "fixed",
    price: 6,
    available: true
  },

  {
    id: "salad-fattoush",
    category: "🥬 السلطات",
    name: "فتوش",
    type: "fixed",
    price: 6,
    available: true
  },

  {
    id: "salad-crab",
    category: "🥬 السلطات",
    name: "سلطة كراب",
    type: "fixed",
    price: 8,
    available: true
  },


  // ----------------------------------------------------------
  // DRINKS
  // ----------------------------------------------------------

  {
    id: "drink-pepsi",
    category: "🥤 المشروبات",
    name: "Pepsi",
    type: "sizes",
    sizes: [
      {
        name: "صغير",
        price: 2
      },
      {
        name: "كبير",
        price: 3
      }
    ],
    available: true
  },

  {
    id: "drink-7up",
    category: "🥤 المشروبات",
    name: "7up",
    type: "sizes",
    sizes: [
      {
        name: "صغير",
        price: 2
      },
      {
        name: "كبير",
        price: 3
      }
    ],
    available: true
  },

  {
    id: "drink-miranda",
    category: "🥤 المشروبات",
    name: "Miranda",
    type: "sizes",
    sizes: [
      {
        name: "صغير",
        price: 2
      },
      {
        name: "كبير",
        price: 3
      }
    ],
    available: true
  }

];


// ============================================================
// CATEGORIES
// ============================================================

const CATEGORIES = [
  "🐟 الأسماك",
  "🦐 ثمار البحر",
  "🍽️ الوجبات والساندويش",
  "🎁 العروض",
  "🥗 المقبلات",
  "🥬 السلطات",
  "🥤 المشروبات"
];


// ============================================================
// GLOBAL STATE
// ============================================================

let menu = [];
let cart = [];

let selectedOrderType = "";
let currentCategory = "";
let currentModalItem = null;


// ============================================================
// LOAD / SAVE MENU
// ============================================================

function loadMenu() {
  try {
    const saved = localStorage.getItem(MENU_STORAGE_KEY);

    if (saved) {
      const parsed = JSON.parse(saved);

      if (Array.isArray(parsed) && parsed.length > 0) {
        menu = parsed;
        return;
      }
    }
  } catch (error) {
    console.error("Error loading menu:", error);
  }

  menu = JSON.parse(JSON.stringify(DEFAULT_MENU));
}


function saveMenu() {
  try {
    localStorage.setItem(
      MENU_STORAGE_KEY,
      JSON.stringify(menu)
    );
  } catch (error) {
    console.error("Error saving menu:", error);
  }
}


// ============================================================
// HELPERS
// ============================================================

function money(value) {
  const number = Number(value) || 0;

  return number.toFixed(2);
}


function normalizePhone(phone) {
  if (phone === null || phone === undefined) {
    return "";
  }

  let value = String(phone);

  // Arabic numbers → English numbers
  value = value
    .replace(/[٠-٩]/g, function (digit) {
      return String("٠١٢٣٤٥٦٧٨٩".indexOf(digit));
    })
    .replace(/[۰-۹]/g, function (digit) {
      return String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit));
    });

  value = value.replace(/[^\d+]/g, "");

  // Lebanon international normalization
  if (value.startsWith("00961")) {
    value = "+" + value.substring(2);
  }

  if (value.startsWith("961")) {
    value = "+" + value;
  }

  if (
    value.startsWith("0") &&
    value.length >= 8 &&
    value.length <= 9
  ) {
    value = "+961" + value.substring(1);
  }

  return value;
}


function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


function getItemById(id) {
  return menu.find(function (item) {
    return item.id === id;
  });
}


function getCategoryItems(category) {
  return menu.filter(function (item) {
    return item.category === category;
  });
}


function getTotal() {
  return cart.reduce(function (sum, item) {
    return sum + Number(item.total || 0);
  }, 0);
}


function generateId(prefix = "id") {
  return (
    prefix +
    "-" +
    Date.now() +
    "-" +
    Math.random().toString(36).substring(2, 9)
  );
}


// ============================================================
// INITIAL MENU LOAD
// ============================================================

loadMenu();
saveMenu();
// ============================================================
// LOGIN
// ============================================================

function checkLogin() {
  const loggedIn = localStorage.getItem("tabbaraLoggedIn");

  if (loggedIn === "true") {
    showPOS();
  } else {
    showLogin();
  }
}


function showLogin() {
  const loginScreen = document.getElementById("loginScreen");
  const app = document.querySelector(".app");

  if (loginScreen) {
    loginScreen.style.display = "flex";
  }

  if (app) {
    app.style.display = "none";
  }
}


function login() {
  const input = document.getElementById("loginPassword");
  const error = document.getElementById("loginError");

  const password = input ? input.value : "";

  if (password === LOGIN_PASSWORD) {
    localStorage.setItem("tabbaraLoggedIn", "true");

    if (input) {
      input.value = "";
    }

    if (error) {
      error.textContent = "";
    }

    showPOS();
    return;
  }

  if (error) {
    error.textContent = "كلمة السر غير صحيحة";
  }
}


function showPOS() {
  const loginScreen = document.getElementById("loginScreen");
  const app = document.querySelector(".app");

  if (loginScreen) {
    loginScreen.style.display = "none";
  }

  if (app) {
    app.style.display = "flex";
  }

  renderCategories();

  if (selectedOrderType) {
    showCategory(currentCategory || CATEGORIES[0]);
  } else {
    const itemsContainer = document.getElementById("items");

    if (itemsContainer) {
      itemsContainer.innerHTML =
        '<div class="empty-state">اختار نوع الطلب أولاً</div>';
    }
  }

  updateCart();
  updateConnectionStatus();
}


function logout() {
  localStorage.removeItem("tabbaraLoggedIn");

  cart = [];
  selectedOrderType = "";
  currentCategory = "";

  updateCart();
  showLogin();
}


// ============================================================
// ORDER TYPE
// ============================================================

function setOrderType(type) {
  selectedOrderType = type;

  const deliveryBtn = document.getElementById("deliveryBtn");
  const pickupBtn = document.getElementById("pickupBtn");

  if (deliveryBtn) {
    deliveryBtn.classList.remove("active");
  }

  if (pickupBtn) {
    pickupBtn.classList.remove("active");
  }

  if (type === "delivery" && deliveryBtn) {
    deliveryBtn.classList.add("active");
  }

  if (type === "pickup" && pickupBtn) {
    pickupBtn.classList.add("active");
  }

  const address = document.getElementById("address");

  if (address) {
    if (type === "delivery") {
      address.disabled = false;
      address.placeholder = "عنوان الزبون";
    } else {
      address.disabled = true;
      address.value = "";
      address.placeholder = "غير مطلوب للاستلام من المحل";
    }
  }

  renderCategories();

  if (currentCategory) {
    showCategory(currentCategory);
  } else {
    showCategory(CATEGORIES[0]);
  }
}


// ============================================================
// CATEGORIES
// ============================================================

function renderCategories() {
  const container = document.getElementById("categories");

  if (!container) {
    return;
  }

  container.innerHTML = "";

  CATEGORIES.forEach(function (category) {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "category-btn";

    if (category === currentCategory) {
      button.classList.add("active");
    }

    button.textContent = category;

    button.addEventListener("click", function () {
      showCategory(category);
    });

    container.appendChild(button);
  });
}


// ============================================================
// SHOW CATEGORY
// ============================================================

function showCategory(category) {
  if (!selectedOrderType) {
    return;
  }

  currentCategory = category;

  renderCategories();

  const container = document.getElementById("items");

  if (!container) {
    return;
  }

  const categoryItems = getCategoryItems(category);

  if (categoryItems.length === 0) {
    container.innerHTML =
      '<div class="empty-state">ما في أصناف بهالقسم</div>';

    return;
  }

  container.innerHTML = "";

  categoryItems.forEach(function (item) {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "menu-item";

    if (item.available === false) {
      button.classList.add("finished");
      button.disabled = true;
    }

    let priceText = "";

    if (item.type === "weight") {
      priceText = "ابتداءً من " + money(item.price) + " / كغ";
    }

    else if (item.type === "fixed") {
      priceText = money(item.price);
    }

    else if (item.type === "sizes") {
      priceText = item.sizes
        .map(function (size) {
          return size.name + ": " + money(size.price);
        })
        .join(" • ");
    }

    else if (item.type === "meal") {
      priceText =
        "وجبة: " +
        money(item.mealPrice) +
        " • ساندويش: " +
        money(item.sandwichPrice);
    }

    else if (item.type === "offer") {
      priceText = money(item.price);
    }

    button.innerHTML = `
      <span class="item-name">${escapeHtml(item.name)}</span>
      <span class="item-price">${escapeHtml(priceText)}</span>
      ${
        item.available === false
          ? '<span class="sold-out">خلص</span>'
          : ""
      }
    `;

    button.addEventListener("click", function () {
      chooseItem(item.id);
    });

    container.appendChild(button);
  });
}


// ============================================================
// CHOOSE ITEM
// ============================================================

function chooseItem(itemId) {
  const item = getItemById(itemId);

  if (!item) {
    return;
  }

  if (item.available === false) {
    return;
  }

  currentModalItem = item;

  if (item.type === "weight") {
    openWeightModal(item);
    return;
  }

  if (item.type === "sizes") {
    openSizeModal(item);
    return;
  }

  if (item.type === "meal") {
    openMealModal(item);
    return;
  }

  if (item.type === "offer") {
    addCart({
      id: generateId("cart"),
      menuItemId: item.id,
      name: item.name,
      description: "عرض",
      quantity: 1,
      unitPrice: Number(item.price) || 0,
      total: Number(item.price) || 0
    });

    return;
  }

  if (item.type === "fixed") {
    addCart({
      id: generateId("cart"),
      menuItemId: item.id,
      name: item.name,
      description: "",
      quantity: 1,
      unitPrice: Number(item.price) || 0,
      total: Number(item.price) || 0
    });
  }
}


// ============================================================
// MODAL
// ============================================================

function modal(content) {
  const root = document.getElementById("modalRoot");

  if (!root) {
    return;
  }

  root.innerHTML = `
    <div class="modal-overlay" onclick="closeModal(event)">
      <div class="modal" onclick="event.stopPropagation()">
        ${content}
      </div>
    </div>
  `;

  root.style.display = "block";
}


function closeModal(event) {
  if (event && event.target) {
    const overlay = event.target.closest(".modal-overlay");

    if (overlay && event.target !== overlay) {
      return;
    }
  }

  const root = document.getElementById("modalRoot");

  if (root) {
    root.innerHTML = "";
    root.style.display = "none";
  }

  currentModalItem = null;
}
// ============================================================
// WEIGHT MODAL
// ============================================================

function openWeightModal(item) {
  currentModalItem = item;

  modal(`
    <div class="modal-title">
      ${escapeHtml(item.name)}
    </div>

    <div class="modal-subtitle">
      السعر الأساسي: ${money(item.price)} / كغ
    </div>

    <div class="choice-grid">

      <button
        type="button"
        class="choice-btn"
        onclick="selectWeightMethod('ني')"
      >
        <strong>ني</strong>
        <span>${money(item.price)} / كغ</span>
      </button>

      <button
        type="button"
        class="choice-btn"
        onclick="selectWeightMethod('مشوي')"
      >
        <strong>مشوي</strong>
        <span>${money(Number(item.price) + Number(item.grill || 0))} / كغ</span>
      </button>

      <button
        type="button"
        class="choice-btn"
        onclick="selectWeightMethod('مقلي')"
      >
        <strong>مقلي</strong>
        <span>${money(Number(item.price) + Number(item.fry || 0))} / كغ</span>
      </button>

    </div>

    <button
      type="button"
      class="cancel-btn"
      onclick="closeModal()"
    >
      إلغاء
    </button>
  `);
}


function selectWeightMethod(method) {
  const item = getCurrentModalItem();

  if (!item) {
    return;
  }

  let unitPrice = Number(item.price) || 0;

  if (method === "مشوي") {
    unitPrice += Number(item.grill || 0);
  }

  if (method === "مقلي") {
    unitPrice += Number(item.fry || 0);
  }

  modal(`
    <div class="modal-title">
      ${escapeHtml(item.name)}
    </div>

    <div class="modal-subtitle">
      التحضير: ${escapeHtml(method)}
      <br>
      السعر: ${money(unitPrice)} / كغ
    </div>

    <label class="modal-label">
      الوزن بالكيلو
    </label>

    <input
      id="weightInput"
      class="modal-input"
      type="number"
      inputmode="decimal"
      min="0.01"
      step="0.01"
      placeholder="مثلاً 1.25"
      autofocus
    >

    <button
      type="button"
      class="confirm"
      onclick="addWeightedItem('${escapeHtml(method)}')"
    >
      إضافة للطلب
    </button>

    <button
      type="button"
      class="cancel-btn"
      onclick="closeModal()"
    >
      إلغاء
    </button>
  `);

  setTimeout(function () {
    const input = document.getElementById("weightInput");

    if (input) {
      input.focus();
    }
  }, 50);
}


function getCurrentModalItem() {
  return currentModalItem;
}


function addWeightedItem(method) {
  const item = getCurrentModalItem();
  const input = document.getElementById("weightInput");

  if (!item || !input) {
    return;
  }

  const weight = Number(input.value);

  if (!weight || weight <= 0) {
    alert("دخل الوزن بشكل صحيح");
    return;
  }

  let unitPrice = Number(item.price) || 0;

  if (method === "مشوي") {
    unitPrice += Number(item.grill || 0);
  }

  if (method === "مقلي") {
    unitPrice += Number(item.fry || 0);
  }

  const total = unitPrice * weight;

  addCart({
    id: generateId("cart"),
    menuItemId: item.id,
    name: item.name,
    description: `${method} • ${weight} كغ`,
    quantity: weight,
    weight: weight,
    preparation: method,
    unitPrice: unitPrice,
    total: total
  });

  closeModal();
}


// ============================================================
// SIZE MODAL
// ============================================================

function openSizeModal(item) {
  currentModalItem = item;

  const sizes = Array.isArray(item.sizes)
    ? item.sizes
    : [];

  modal(`
    <div class="modal-title">
      ${escapeHtml(item.name)}
    </div>

    <div class="choice-grid">
      ${sizes
        .map(function (size, index) {
          return `
            <button
              type="button"
              class="choice-btn"
              onclick="addSizedItem(${index})"
            >
              <strong>${escapeHtml(size.name)}</strong>
              <span>${money(size.price)}</span>
            </button>
          `;
        })
        .join("")}
    </div>

    <button
      type="button"
      class="cancel-btn"
      onclick="closeModal()"
    >
      إلغاء
    </button>
  `);
}


function addSizedItem(index) {
  const item = getCurrentModalItem();

  if (!item || !Array.isArray(item.sizes)) {
    return;
  }

  const size = item.sizes[index];

  if (!size) {
    return;
  }

  const price = Number(size.price) || 0;

  addCart({
    id: generateId("cart"),
    menuItemId: item.id,
    name: item.name,
    description: size.name,
    quantity: 1,
    size: size.name,
    unitPrice: price,
    total: price
  });

  closeModal();
}


// ============================================================
// MEAL / SANDWICH MODAL
// ============================================================

function openMealModal(item) {
  currentModalItem = item;

  modal(`
    <div class="modal-title">
      ${escapeHtml(item.name)}
    </div>

    <div class="choice-grid">

      <button
        type="button"
        class="choice-btn"
        onclick="addMealItem('وجبة')"
      >
        <strong>وجبة</strong>
        <span>${money(item.mealPrice)}</span>
      </button>

      <button
        type="button"
        class="choice-btn"
        onclick="addMealItem('ساندويش')"
      >
        <strong>ساندويش</strong>
        <span>${money(item.sandwichPrice)}</span>
      </button>

    </div>

    <button
      type="button"
      class="cancel-btn"
      onclick="closeModal()"
    >
      إلغاء
    </button>
  `);
}


function addMealItem(type) {
  const item = getCurrentModalItem();

  if (!item) {
    return;
  }

  const price =
    type === "وجبة"
      ? Number(item.mealPrice) || 0
      : Number(item.sandwichPrice) || 0;

  addCart({
    id: generateId("cart"),
    menuItemId: item.id,
    name: item.name,
    description: type,
    quantity: 1,
    mealType: type,
    unitPrice: price,
    total: price
  });

  closeModal();
}


// ============================================================
// CART
// ============================================================

function addCart(cartItem) {
  cart.push(cartItem);

  updateCart();
}


function updateCart() {
  const container = document.getElementById("cartItems");
  const totalElement = document.getElementById("total");

  if (!container) {
    return;
  }

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart">
        ما في أصناف بالطلب
      </div>
    `;

    if (totalElement) {
      totalElement.textContent = "0.00";
    }

    return;
  }

  container.innerHTML = "";

  cart.forEach(function (item, index) {
    const row = document.createElement("div");

    row.className = "cart-item";

    const description =
      item.description
        ? `<small>${escapeHtml(item.description)}</small>`
        : "";

    row.innerHTML = `
      <div class="cart-item-info">
        <strong>${escapeHtml(item.name)}</strong>
        ${description}
      </div>

      <div class="cart-item-price">
        ${money(item.total)}
      </div>

      <div class="cart-item-actions">

        <button
          type="button"
          onclick="duplicateCart(${index})"
          title="تكرار"
        >
          +
        </button>

        <button
          type="button"
          onclick="removeCart(${index})"
          title="حذف"
        >
          ×
        </button>

      </div>
    `;

    container.appendChild(row);
  });

  if (totalElement) {
    totalElement.textContent = money(getTotal());
  }
}


function duplicateCart(index) {
  const item = cart[index];

  if (!item) {
    return;
  }

  const copy = JSON.parse(JSON.stringify(item));

  copy.id = generateId("cart");

  cart.push(copy);

  updateCart();
}


function removeCart(index) {
  if (index < 0 || index >= cart.length) {
    return;
  }

  cart.splice(index, 1);

  updateCart();
}


function clearOrder() {
  cart = [];

  const name = document.getElementById("name");
  const phone = document.getElementById("phone");
  const address = document.getElementById("address");
  const notes = document.getElementById("notes");
  const customerMessage = document.getElementById("customerMessage");

  if (name) {
    name.value = "";
  }

  if (phone) {
    phone.value = "";
  }

  if (address) {
    address.value = "";
  }

  if (notes) {
    notes.value = "";
  }

  if (customerMessage) {
    customerMessage.textContent = "";
  }

  selectedOrderType = "";
  currentCategory = "";

  const deliveryBtn = document.getElementById("deliveryBtn");
  const pickupBtn = document.getElementById("pickupBtn");

  if (deliveryBtn) {
    deliveryBtn.classList.remove("active");
  }

  if (pickupBtn) {
    pickupBtn.classList.remove("active");
  }

  if (address) {
    address.disabled = false;
    address.placeholder = "عنوان الزبون";
  }

  const items = document.getElementById("items");

  if (items) {
    items.innerHTML =
      '<div class="empty-state">اختار نوع الطلب أولاً</div>';
  }

  renderCategories();
  updateCart();
}
// ============================================================
// CUSTOMER STORAGE
// ============================================================

function customerPhoneKey(phone) {
  return normalizePhone(phone);
}


function getLocalCustomers() {
  try {
    const saved = localStorage.getItem(CUSTOMER_STORAGE_KEY);

    if (!saved) {
      return [];
    }

    const customers = JSON.parse(saved);

    return Array.isArray(customers) ? customers : [];
  } catch (error) {
    console.error("Error loading local customers:", error);
    return [];
  }
}


function saveLocalCustomers(customers) {
  try {
    localStorage.setItem(
      CUSTOMER_STORAGE_KEY,
      JSON.stringify(customers)
    );
  } catch (error) {
    console.error("Error saving local customers:", error);
  }
}


function findCustomerByPhone(phone) {
  const normalized = customerPhoneKey(phone);

  if (!normalized) {
    return null;
  }

  const customers = getLocalCustomers();

  return (
    customers.find(function (customer) {
      return customer.phone === normalized;
    }) || null
  );
}


function fillCustomerFields(customer) {
  if (!customer) {
    return;
  }

  const name = document.getElementById("name");
  const phone = document.getElementById("phone");
  const address = document.getElementById("address");
  const notes = document.getElementById("notes");

  if (phone && customer.phone) {
    phone.value = customer.phone;
  }

  if (name) {
    name.value = customer.name || "";
  }

  if (address) {
    address.value = customer.address || "";
  }

  if (notes) {
    notes.value = customer.notes || "";
  }
}


function showCustomerMessage(message, type = "") {
  const element = document.getElementById("customerMessage");

  if (!element) {
    return;
  }

  element.textContent = message;
  element.className = "customer-message";

  if (type) {
    element.classList.add(type);
  }
}


// ============================================================
// REMOTE CUSTOMER LOOKUP
// ============================================================

async function findRemoteCustomer(phone) {
  const normalized = customerPhoneKey(phone);

  if (!normalized) {
    return null;
  }

  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/customers?phone=eq.${encodeURIComponent(
        normalized
      )}&select=*`,
      {
        method: "GET",

        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`
        }
      }
    );

    if (!response.ok) {
      throw new Error(
        `Customer lookup failed: ${response.status}`
      );
    }

    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      return null;
    }

    return data[0];
  } catch (error) {
    console.warn(
      "Remote customer lookup unavailable:",
      error
    );

    return null;
  }
}


// ============================================================
// CUSTOMER SEARCH
// ============================================================

let customerSearchTimer = null;


async function searchCustomer() {
  const phoneInput = document.getElementById("phone");

  if (!phoneInput) {
    return;
  }

  const rawPhone = phoneInput.value;
  const normalized = customerPhoneKey(rawPhone);

  if (!normalized) {
    showCustomerMessage("");
    return;
  }

  const localCustomer = findCustomerByPhone(normalized);

  if (localCustomer) {
    fillCustomerFields(localCustomer);

    showCustomerMessage(
      "تم العثور على بيانات الزبون",
      "success"
    );

    return;
  }

  showCustomerMessage("جاري البحث...", "loading");

  const remoteCustomer = await findRemoteCustomer(normalized);

  if (remoteCustomer) {
    const customers = getLocalCustomers();

    const index = customers.findIndex(function (customer) {
      return customer.phone === normalized;
    });

    const customerToSave = {
      phone: normalized,
      name: remoteCustomer.name || "",
      address: remoteCustomer.address || "",
      notes: remoteCustomer.notes || ""
    };

    if (index >= 0) {
      customers[index] = customerToSave;
    } else {
      customers.push(customerToSave);
    }

    saveLocalCustomers(customers);

    fillCustomerFields(customerToSave);

    showCustomerMessage(
      "تم العثور على بيانات الزبون",
      "success"
    );

    return;
  }

  showCustomerMessage(
    "زبون جديد",
    "new"
  );
}


function setupCustomerSearch() {
  const phoneInput = document.getElementById("phone");

  if (!phoneInput) {
    return;
  }

  phoneInput.addEventListener("input", function () {
    clearTimeout(customerSearchTimer);

    customerSearchTimer = setTimeout(function () {
      searchCustomer();
    }, 500);
  });

  phoneInput.addEventListener("blur", function () {
    clearTimeout(customerSearchTimer);
    searchCustomer();
  });
}


// ============================================================
// SAVE CUSTOMER
// ============================================================

async function saveCustomer() {
  const phoneInput = document.getElementById("phone");
  const nameInput = document.getElementById("name");
  const addressInput = document.getElementById("address");
  const notesInput = document.getElementById("notes");

  const phone = customerPhoneKey(
    phoneInput ? phoneInput.value : ""
  );

  const name = nameInput
    ? nameInput.value.trim()
    : "";

  const address = addressInput
    ? addressInput.value.trim()
    : "";

  const notes = notesInput
    ? notesInput.value.trim()
    : "";

  if (!phone) {
    return null;
  }

  const customer = {
    phone,
    name,
    address,
    notes
  };

  // ----------------------------------------------------------
  // SAVE LOCALLY FIRST
  // ----------------------------------------------------------

  const customers = getLocalCustomers();

  const existingIndex = customers.findIndex(
    function (item) {
      return item.phone === phone;
    }
  );

  if (existingIndex >= 0) {
    customers[existingIndex] = {
      ...customers[existingIndex],
      ...customer,
      updated_at: new Date().toISOString()
    };
  } else {
    customers.push({
      ...customer,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
  }

  saveLocalCustomers(customers);


  // ----------------------------------------------------------
  // SAVE TO SUPABASE
  // ----------------------------------------------------------

  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/customers`,
      {
        method: "POST",

        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          "Content-Type": "application/json",
          Prefer: "resolution=merge-duplicates"
        },

        body: JSON.stringify(customer)
      }
    );

    if (!response.ok) {
      console.warn(
        "Customer cloud save failed:",
        response.status
      );
    }
  } catch (error) {
    console.warn(
      "Customer saved locally; cloud unavailable:",
      error
    );
  }

  return customer;
}


// ============================================================
// PENDING ORDERS
// ============================================================

function getPendingOrders() {
  try {
    const saved = localStorage.getItem(
      PENDING_ORDERS_KEY
    );

    if (!saved) {
      return [];
    }

    const orders = JSON.parse(saved);

    return Array.isArray(orders) ? orders : [];
  } catch (error) {
    console.error(
      "Error loading pending orders:",
      error
    );

    return [];
  }
}


function savePendingOrders(orders) {
  try {
    localStorage.setItem(
      PENDING_ORDERS_KEY,
      JSON.stringify(orders)
    );
  } catch (error) {
    console.error(
      "Error saving pending orders:",
      error
    );
  }
}


function queueOrder(order) {
  const pending = getPendingOrders();

  pending.push(order);

  savePendingOrders(pending);
}


async function sendOrder(order) {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/orders`,
    {
      method: "POST",

      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal"
      },

      body: JSON.stringify(order)
    }
  );

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `Order save failed: ${response.status} ${errorText}`
    );
  }

  return true;
}


// ============================================================
// SYNC PENDING ORDERS
// ============================================================

async function syncNow() {
  if (!navigator.onLine) {
    updateConnectionStatus();
    return;
  }

  const pending = getPendingOrders();

  if (pending.length === 0) {
    updateConnectionStatus();
    return;
  }

  const remaining = [];

  for (const order of pending) {
    try {
      await sendOrder(order);
    } catch (error) {
      console.warn(
        "Could not sync order:",
        error
      );

      remaining.push(order);
    }
  }

  savePendingOrders(remaining);

  updateConnectionStatus();
}


// ============================================================
// CONNECTION STATUS
// ============================================================

function updateConnectionStatus() {
  const element =
    document.getElementById("connectionStatus");

  if (!element) {
    return;
  }

  if (navigator.onLine) {
    element.textContent = "🟢 متصل";

    element.className = "connection-status online";
  } else {
    element.textContent = "🔴 بدون إنترنت";

    element.className =
      "connection-status offline";
  }
}
// ============================================================
// CONFIRM ORDER
// ============================================================

async function confirmOrder() {
  if (!selectedOrderType) {
    alert("اختار نوع الطلب أولاً");
    return;
  }

  if (cart.length === 0) {
    alert("الطلب فاضي");
    return;
  }

  const phoneInput = document.getElementById("phone");
  const nameInput = document.getElementById("name");
  const addressInput = document.getElementById("address");
  const notesInput = document.getElementById("notes");

  const phone = phoneInput
    ? phoneInput.value.trim()
    : "";

  const name = nameInput
    ? nameInput.value.trim()
    : "";

  const address = addressInput
    ? addressInput.value.trim()
    : "";

  const notes = notesInput
    ? notesInput.value.trim()
    : "";

  if (!phone) {
    alert("دخل رقم تلفون الزبون");
    return;
  }

  if (selectedOrderType === "delivery" && !address) {
    alert("دخل عنوان الزبون");
    return;
  }

  // ----------------------------------------------------------
  // SAVE CUSTOMER
  // ----------------------------------------------------------

  const customer = await saveCustomer();

  // ----------------------------------------------------------
  // CREATE ORDER
  // ----------------------------------------------------------

  const order = {
    order_type: selectedOrderType,

    customer_name: name,

    customer_phone: customer
      ? customer.phone
      : normalizePhone(phone),

    customer_address: address,

    notes: notes,

    items: cart.map(function (item) {
      return {
        name: item.name,
        description: item.description || "",
        quantity: item.quantity || 1,
        weight: item.weight || null,
        preparation: item.preparation || null,
        size: item.size || null,
        meal_type: item.mealType || null,
        unit_price: Number(item.unitPrice || 0),
        total: Number(item.total || 0)
      };
    }),

    total: Number(getTotal().toFixed(2)),

    device_id: deviceId,

    sync_status: "synced",

    created_at: new Date().toISOString()
  };

  // ----------------------------------------------------------
  // TRY CLOUD SAVE
  // ----------------------------------------------------------

  let savedOnline = false;

  if (navigator.onLine) {
    try {
      await sendOrder(order);

      savedOnline = true;
    } catch (error) {
      console.warn(
        "Order could not be saved online:",
        error
      );
    }
  }

  // ----------------------------------------------------------
  // OFFLINE QUEUE
  // ----------------------------------------------------------

  if (!savedOnline) {
    order.sync_status = "pending";

    queueOrder(order);
  }

  // ----------------------------------------------------------
  // PRINT
  // ----------------------------------------------------------

  try {
    printInvoice(order);
  } catch (error) {
    console.warn(
      "Printing failed:",
      error
    );
  }

  // ----------------------------------------------------------
  // SUCCESS MESSAGE
  // ----------------------------------------------------------

  if (savedOnline) {
    alert("تم تأكيد الطلب وحفظه بنجاح ✅");
  } else {
    alert(
      "تم تأكيد الطلب وحفظه على الجهاز.\nسيتم رفعه تلقائياً عند عودة الإنترنت. 📶"
    );
  }

  clearOrder();
}


// ============================================================
// PRINT INVOICE
// ============================================================

function printInvoice(order) {
  if (!order) {
    return;
  }

  const printWindow = window.open(
    "",
    "_blank",
    "width=420,height=700"
  );

  if (!printWindow) {
    alert(
      "المتصفح منع نافذة الطباعة. اسمح بالنوافذ المنبثقة لهذا الموقع."
    );

    return;
  }

  const itemsHtml = Array.isArray(order.items)
    ? order.items
        .map(function (item) {
          const itemName = escapeHtml(item.name);

          const details = escapeHtml(
            item.description || ""
          );

          const quantity =
            item.weight !== null &&
            item.weight !== undefined
              ? `${item.weight} كغ`
              : `× ${item.quantity || 1}`;

          return `
            <div class="item">
              <div>
                <strong>${itemName}</strong>

                ${
                  details
                    ? `<div class="details">${details}</div>`
                    : ""
                }
              </div>

              <div class="item-right">
                <div>${escapeHtml(quantity)}</div>
                <strong>${money(item.total)}</strong>
              </div>
            </div>
          `;
        })
        .join("")
    : "";

  const orderType =
    order.order_type === "delivery"
      ? "Delevery"
      : "استلام من المحل";

  printWindow.document.open();

  printWindow.document.write(`
    <!DOCTYPE html>

    <html lang="ar" dir="rtl">

    <head>

      <meta charset="UTF-8">

      <title>فاتورة Tabbara Seafood</title>

      <style>

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          padding: 15px;
          font-family: Arial, sans-serif;
          direction: rtl;
          font-size: 14px;
        }

        .invoice {
          width: 100%;
          max-width: 380px;
          margin: auto;
        }

        .header {
          text-align: center;
          border-bottom: 1px dashed #000;
          padding-bottom: 12px;
          margin-bottom: 12px;
        }

        .header h1 {
          margin: 0 0 5px;
          font-size: 22px;
        }

        .header div {
          font-size: 13px;
        }

        .customer {
          border-bottom: 1px dashed #000;
          padding-bottom: 10px;
          margin-bottom: 10px;
        }

        .customer div {
          margin: 4px 0;
        }

        .item {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          padding: 7px 0;
          border-bottom: 1px dotted #999;
        }

        .item-right {
          text-align: left;
          white-space: nowrap;
        }

        .details {
          font-size: 12px;
          margin-top: 3px;
        }

        .total {
          display: flex;
          justify-content: space-between;
          font-size: 18px;
          font-weight: bold;
          padding-top: 12px;
          margin-top: 8px;
          border-top: 2px solid #000;
        }

        .footer {
          text-align: center;
          margin-top: 20px;
          font-size: 12px;
        }

        @media print {
          body {
            padding: 0;
          }

          .invoice {
            max-width: none;
          }
        }

      </style>

    </head>

    <body>

      <div class="invoice">

        <div class="header">
          <h1>Tabbara Seafood</h1>
          <div>فاتورة طلب</div>
        </div>

        <div class="customer">

          <div>
            <strong>نوع الطلب:</strong>
            ${escapeHtml(orderType)}
          </div>

          <div>
            <strong>الزبون:</strong>
            ${escapeHtml(order.customer_name || "-")}
          </div>

          <div>
            <strong>الهاتف:</strong>
            ${escapeHtml(order.customer_phone || "-")}
          </div>

          ${
            order.customer_address
              ? `
                <div>
                  <strong>العنوان:</strong>
                  ${escapeHtml(order.customer_address)}
                </div>
              `
              : ""
          }

          ${
            order.notes
              ? `
                <div>
                  <strong>ملاحظات:</strong>
                  ${escapeHtml(order.notes)}
                </div>
              `
              : ""
          }

        </div>

        <div>
          ${itemsHtml}
        </div>

        <div class="total">
          <span>المجموع</span>
          <span>${money(order.total)}</span>
        </div>

        <div class="footer">
          شكراً لزيارتكم ❤️
        </div>

      </div>

      <script>
        window.onload = function () {
          setTimeout(function () {
            window.print();
          }, 300);
        };
      <\/script>

    </body>

    </html>
  `);

  printWindow.document.close();
}


// ============================================================
// PREVIOUS ORDERS
// ============================================================

async function showPreviousOrders() {
  const root = document.getElementById("modalRoot");

  if (!root) {
    return;
  }

  modal(`
    <div class="modal-title">
      📋 الطلبات السابقة
    </div>

    <div id="previousOrdersContent">
      جاري تحميل الطلبات...
    </div>

    <button
      type="button"
      class="cancel-btn"
      onclick="closeModal()"
    >
      إغلاق
    </button>
  `);

  const content =
    document.getElementById("previousOrdersContent");

  if (!content) {
    return;
  }

  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/orders?select=*&order=created_at.desc&limit=50`,
      {
        method: "GET",

        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`
        }
      }
    );

    if (!response.ok) {
      throw new Error(
        `Orders request failed: ${response.status}`
      );
    }

    const orders = await response.json();

    if (!Array.isArray(orders) || orders.length === 0) {
      content.innerHTML = `
        <div class="empty-state">
          ما في طلبات سابقة
        </div>
      `;

      return;
    }

    content.innerHTML = orders
      .map(function (order, index) {
        const date = order.created_at
          ? new Date(order.created_at).toLocaleString(
              "ar-LB"
            )
          : "";

        const type =
          order.order_type === "delivery"
            ? "Delevery"
            : "استلام من المحل";

        return `
          <div class="previous-order">

            <div>
              <strong>
                ${escapeHtml(order.customer_name || "بدون اسم")}
              </strong>

              <div>
                ${escapeHtml(order.customer_phone || "")}
              </div>

              <small>
                ${escapeHtml(date)}
              </small>

              <div>
                ${escapeHtml(type)}
              </div>
            </div>

            <div class="previous-order-right">

              <strong>
                ${money(order.total)}
              </strong>

              <button
                type="button"
                onclick="printPreviousOrder(${index})"
              >
                🖨️
              </button>

            </div>

          </div>
        `;
      })
      .join("");

    window.tabbaraPreviousOrders = orders;

  } catch (error) {
    console.error(
      "Could not load previous orders:",
      error
    );

    content.innerHTML = `
      <div class="empty-state">
        تعذر تحميل الطلبات.
        <br>
        تأكد من الإنترنت.
      </div>
    `;
  }
}


// ============================================================
// PRINT PREVIOUS ORDER
// ============================================================

function printPreviousOrder(index) {
  const orders =
    window.tabbaraPreviousOrders || [];

  const order = orders[index];

  if (!order) {
    return;
  }

  printInvoice(order);
}


// ============================================================
// HTML BUTTON COMPATIBILITY
// ============================================================

function showOrders() {
  showPreviousOrders();
}
// ============================================================
// MENU MANAGER
// ============================================================

function showMenuManager() {
  const root = document.getElementById("modalRoot");

  if (!root) {
    return;
  }

  renderMenuManager();
}


function renderMenuManager() {
  const root = document.getElementById("modalRoot");

  if (!root) {
    return;
  }

  const categories = CATEGORIES.filter(function (category) {
    return category !== "🎁 العروض";
  });

  modal(`
    <div class="modal-title">
      ⚙️ إدارة المنيو
    </div>

    <div class="menu-manager">

      <button
        type="button"
        class="confirm"
        onclick="newMenuItem()"
      >
        ➕ إضافة صنف
      </button>

      <button
        type="button"
        class="confirm"
        onclick="newOffer()"
      >
        🎁 إضافة عرض
      </button>

      <div class="manager-list">

        ${menu
          .map(function (item, index) {
            const status =
              item.available === false
                ? "خلص"
                : "متوفر";

            const statusClass =
              item.available === false
                ? "finished"
                : "available";

            return `
              <div class="manager-item">

                <div class="manager-item-info">

                  <strong>
                    ${escapeHtml(item.name)}
                  </strong>

                  <small>
                    ${escapeHtml(item.category)}
                  </small>

                  <span class="${statusClass}">
                    ${status}
                  </span>

                </div>

                <div class="manager-actions">

                  <button
                    type="button"
                    onclick="toggleAvailable(${index})"
                  >
                    ${
                      item.available === false
                        ? "✅"
                        : "🚫"
                    }
                  </button>

                  <button
                    type="button"
                    onclick="editMenuItem(${index})"
                  >
                    ✏️
                  </button>

                  <button
                    type="button"
                    onclick="deleteMenuItem(${index})"
                  >
                    🗑️
                  </button>

                </div>

              </div>
            `;
          })
          .join("")}

      </div>

    </div>

    <button
      type="button"
      class="cancel-btn"
      onclick="closeModal()"
    >
      إغلاق
    </button>
  `);
}


// ============================================================
// TOGGLE AVAILABLE
// ============================================================

function toggleAvailable(index) {
  const item = menu[index];

  if (!item) {
    return;
  }

  item.available = item.available === false;

  saveMenu();

  if (currentCategory) {
    showCategory(currentCategory);
  }

  renderMenuManager();
}


// ============================================================
// NEW MENU ITEM
// ============================================================

function newMenuItem() {
  const categories = CATEGORIES.filter(function (category) {
    return category !== "🎁 العروض";
  });

  currentModalItem = null;

  modal(`
    <div class="modal-title">
      ➕ إضافة صنف جديد
    </div>

    <label class="modal-label">
      اسم الصنف
    </label>

    <input
      id="menuName"
      class="modal-input"
      type="text"
      placeholder="اسم الصنف"
    >

    <label class="modal-label">
      القسم
    </label>

    <select
      id="menuCategory"
      class="modal-input"
      onchange="renderPricingFields()"
    >
      ${categories
        .map(function (category) {
          return `
            <option value="${escapeHtml(category)}">
              ${escapeHtml(category)}
            </option>
          `;
        })
        .join("")}
    </select>

    <label class="modal-label">
      نوع الصنف
    </label>

    <select
      id="menuType"
      class="modal-input"
      onchange="renderPricingFields()"
    >
      <option value="fixed">سعر ثابت</option>
      <option value="weight">بالوزن</option>
      <option value="sizes">أحجام</option>
      <option value="meal">وجبة / ساندويش</option>
    </select>

    <div id="pricingFields"></div>

    <button
      type="button"
      class="confirm"
      onclick="saveMenuForm()"
    >
      💾 حفظ
    </button>

    <button
      type="button"
      class="cancel-btn"
      onclick="closeModal()"
    >
      إلغاء
    </button>
  `);

  renderPricingFields();
}


// ============================================================
// NEW OFFER
// ============================================================

function newOffer() {
  const selectableItems = menu.filter(function (item) {
    return item.category !== "🎁 العروض";
  });

  modal(`
    <div class="modal-title">
      🎁 إضافة عرض جديد
    </div>

    <label class="modal-label">
      اسم العرض
    </label>

    <input
      id="offerName"
      class="modal-input"
      type="text"
      placeholder="مثلاً عرض العيلة"
    >

    <label class="modal-label">
      الأصناف داخل العرض
    </label>

    <div class="offer-items">

      ${selectableItems
        .map(function (item, index) {
          return `
            <label class="offer-check">

              <input
                type="checkbox"
                class="offer-item-checkbox"
                value="${escapeHtml(item.id)}"
              >

              <span>
                ${escapeHtml(item.name)}
              </span>

            </label>
          `;
        })
        .join("")}

    </div>

    <label class="modal-label">
      سعر العرض
    </label>

    <input
      id="offerPrice"
      class="modal-input"
      type="number"
      inputmode="decimal"
      min="0"
      step="0.01"
      placeholder="السعر النهائي"
    >

    <button
      type="button"
      class="confirm"
      onclick="saveOffer()"
    >
      💾 حفظ العرض
    </button>

    <button
      type="button"
      class="cancel-btn"
      onclick="closeModal()"
    >
      إلغاء
    </button>
  `);
}


// ============================================================
// SAVE OFFER
// ============================================================

function saveOffer() {
  const nameInput = document.getElementById("offerName");
  const priceInput = document.getElementById("offerPrice");

  const name = nameInput
    ? nameInput.value.trim()
    : "";

  const price = priceInput
    ? Number(priceInput.value)
    : 0;

  if (!name) {
    alert("دخل اسم العرض");
    return;
  }

  if (!price || price < 0) {
    alert("دخل سعر العرض");
    return;
  }

  const checkboxes = document.querySelectorAll(
    ".offer-item-checkbox:checked"
  );

  const includedItems = Array.from(checkboxes)
    .map(function (checkbox) {
      return getItemById(checkbox.value);
    })
    .filter(Boolean)
    .map(function (item) {
      return {
        id: item.id,
        name: item.name
      };
    });

  if (includedItems.length === 0) {
    alert("اختار صنف واحد على الأقل داخل العرض");
    return;
  }

  menu.push({
    id: generateId("offer"),
    category: "🎁 العروض",
    name: name,
    type: "offer",
    price: price,
    available: true,
    includedItems: includedItems
  });

  saveMenu();

  closeModal();

  if (currentCategory === "🎁 العروض") {
    showCategory(currentCategory);
  }
}


// ============================================================
// EDIT MENU ITEM
// ============================================================

function editMenuItem(index) {
  const item = menu[index];

  if (!item) {
    return;
  }

  currentModalItem = item;

  if (item.type === "offer") {
    editOffer(index);
    return;
  }

  const categories = CATEGORIES.filter(function (category) {
    return category !== "🎁 العروض";
  });

  modal(`
    <div class="modal-title">
      ✏️ تعديل الصنف
    </div>

    <label class="modal-label">
      اسم الصنف
    </label>

    <input
      id="menuName"
      class="modal-input"
      type="text"
      value="${escapeHtml(item.name)}"
    >

    <label class="modal-label">
      القسم
    </label>

    <select
      id="menuCategory"
      class="modal-input"
    >
      ${categories
        .map(function (category) {
          return `
            <option
              value="${escapeHtml(category)}"
              ${
                item.category === category
                  ? "selected"
                  : ""
              }
            >
              ${escapeHtml(category)}
            </option>
          `;
        })
        .join("")}
    </select>

    <label class="modal-label">
      نوع الصنف
    </label>

    <select
      id="menuType"
      class="modal-input"
      onchange="renderPricingFields()"
    >
      <option
        value="fixed"
        ${item.type === "fixed" ? "selected" : ""}
      >
        سعر ثابت
      </option>

      <option
        value="weight"
        ${item.type === "weight" ? "selected" : ""}
      >
        بالوزن
      </option>

      <option
        value="sizes"
        ${item.type === "sizes" ? "selected" : ""}
      >
        أحجام
      </option>

      <option
        value="meal"
        ${item.type === "meal" ? "selected" : ""}
      >
        وجبة / ساندويش
      </option>
    </select>

    <div id="pricingFields"></div>

    <button
      type="button"
      class="confirm"
      onclick="saveMenuForm(${index})"
    >
      💾 حفظ التعديل
    </button>

    <button
      type="button"
      class="cancel-btn"
      onclick="closeModal()"
    >
      إلغاء
    </button>
  `);

  renderPricingFields(item);
}


// ============================================================
// EDIT OFFER
// ============================================================

function editOffer(index) {
  const item = menu[index];

  if (!item) {
    return;
  }

  const selectableItems = menu.filter(function (menuItem) {
    return menuItem.category !== "🎁 العروض";
  });

  const selectedIds = Array.isArray(item.includedItems)
    ? item.includedItems.map(function (included) {
        return included.id;
      })
    : [];

  modal(`
    <div class="modal-title">
      ✏️ تعديل العرض
    </div>

    <label class="modal-label">
      اسم العرض
    </label>

    <input
      id="offerName"
      class="modal-input"
      type="text"
      value="${escapeHtml(item.name)}"
    >

    <label class="modal-label">
      الأصناف داخل العرض
    </label>

    <div class="offer-items">

      ${selectableItems
        .map(function (menuItem) {
          const checked = selectedIds.includes(
            menuItem.id
          );

          return `
            <label class="offer-check">

              <input
                type="checkbox"
                class="offer-item-checkbox"
                value="${escapeHtml(menuItem.id)}"
                ${checked ? "checked" : ""}
              >

              <span>
                ${escapeHtml(menuItem.name)}
              </span>

            </label>
          `;
        })
        .join("")}

    </div>

    <label class="modal-label">
      سعر العرض
    </label>

    <input
      id="offerPrice"
      class="modal-input"
      type="number"
      inputmode="decimal"
      min="0"
      step="0.01"
      value="${escapeHtml(item.price)}"
    >

    <button
      type="button"
      class="confirm"
      onclick="saveOfferEdit(${index})"
    >
      💾 حفظ
    </button>

    <button
      type="button"
      class="cancel-btn"
      onclick="closeModal()"
    >
      إلغاء
    </button>
  `);
}


function saveOfferEdit(index) {
  const item = menu[index];

  if (!item) {
    return;
  }

  const nameInput = document.getElementById("offerName");
  const priceInput = document.getElementById("offerPrice");

  const name = nameInput
    ? nameInput.value.trim()
    : "";

  const price = priceInput
    ? Number(priceInput.value)
    : 0;

  if (!name) {
    alert("دخل اسم العرض");
    return;
  }

  if (!price || price < 0) {
    alert("دخل سعر العرض");
    return;
  }

  const checkboxes = document.querySelectorAll(
    ".offer-item-checkbox:checked"
  );

  const includedItems = Array.from(checkboxes)
    .map(function (checkbox) {
      return getItemById(checkbox.value);
    })
    .filter(Boolean)
    .map(function (menuItem) {
      return {
        id: menuItem.id,
        name: menuItem.name
      };
    });

  if (includedItems.length === 0) {
    alert("اختار صنف واحد على الأقل داخل العرض");
    return;
  }

  item.name = name;
  item.price = price;
  item.includedItems = includedItems;

  saveMenu();

  closeModal();

  if (currentCategory === "🎁 العروض") {
    showCategory(currentCategory);
  }
}


// ============================================================
// PRICING FIELDS
// ============================================================

function renderPricingFields(existingItem = null) {
  const container =
    document.getElementById("pricingFields");

  const typeElement =
    document.getElementById("menuType");

  if (!container || !typeElement) {
    return;
  }

  const type = typeElement.value;

  // ----------------------------------------------------------
  // FIXED
  // ----------------------------------------------------------

  if (type === "fixed") {
    const price =
      existingItem && existingItem.type === "fixed"
        ? existingItem.price
        : "";

    container.innerHTML = `
      <label class="modal-label">
        السعر
      </label>

      <input
        id="price"
        class="modal-input"
        type="number"
        inputmode="decimal"
        min="0"
        step="0.01"
        value="${escapeHtml(price)}"
        placeholder="السعر"
      >
    `;

    return;
  }


  // ----------------------------------------------------------
  // WEIGHT
  // ----------------------------------------------------------

  if (type === "weight") {
    const price =
      existingItem && existingItem.type === "weight"
        ? existingItem.price
        : "";

    const grill =
      existingItem && existingItem.type === "weight"
        ? existingItem.grill
        : "";

    const fry =
      existingItem && existingItem.type === "weight"
        ? existingItem.fry
        : "";

    container.innerHTML = `
      <label class="modal-label">
        السعر الأساسي / كغ
      </label>

      <input
        id="price"
        class="modal-input"
        type="number"
        inputmode="decimal"
        min="0"
        step="0.01"
        value="${escapeHtml(price)}"
      >

      <label class="modal-label">
        زيادة المشوي / كغ
      </label>

      <input
        id="grill"
        class="modal-input"
        type="number"
        inputmode="decimal"
        min="0"
        step="0.01"
        value="${escapeHtml(grill)}"
      >

      <label class="modal-label">
        زيادة المقلي / كغ
      </label>

      <input
        id="fry"
        class="modal-input"
        type="number"
        inputmode="decimal"
        min="0"
        step="0.01"
        value="${escapeHtml(fry)}"
      >
    `;

    return;
  }


  // ----------------------------------------------------------
  // SIZES
  // ----------------------------------------------------------

  if (type === "sizes") {
    const sizes =
      existingItem &&
      existingItem.type === "sizes" &&
      Array.isArray(existingItem.sizes)
        ? existingItem.sizes
        : [
            {
              name: "صغير",
              price: ""
            },
            {
              name: "وسط",
              price: ""
            },
            {
              name: "كبير",
              price: ""
            }
          ];

    container.innerHTML = `
      <label class="modal-label">
        الأحجام والأسعار
      </label>

      <div id="sizesFields">

        ${sizes
          .map(function (size, index) {
            return `
              <div class="size-row">

                <input
                  class="modal-input size-name"
                  type="text"
                  value="${escapeHtml(size.name)}"
                  placeholder="اسم الحجم"
                  data-index="${index}"
                >

                <input
                  class="modal-input size-price"
                  type="number"
                  inputmode="decimal"
                  min="0"
                  step="0.01"
                  value="${escapeHtml(size.price)}"
                  placeholder="السعر"
                  data-index="${index}"
                >

              </div>
            `;
          })
          .join("")}

      </div>

      <button
        type="button"
        class="secondary-btn"
        onclick="addSizeField()"
      >
        ➕ إضافة حجم
      </button>
    `;

    return;
  }


  // ----------------------------------------------------------
  // MEAL / SANDWICH
  // ----------------------------------------------------------

  if (type === "meal") {
    const mealPrice =
      existingItem && existingItem.type === "meal"
        ? existingItem.mealPrice
        : "";

    const sandwichPrice =
      existingItem && existingItem.type === "meal"
        ? existingItem.sandwichPrice
        : "";

    container.innerHTML = `
      <label class="modal-label">
        سعر الوجبة
      </label>

      <input
        id="mealPrice"
        class="modal-input"
        type="number"
        inputmode="decimal"
        min="0"
        step="0.01"
        value="${escapeHtml(mealPrice)}"
      >

      <label class="modal-label">
        سعر الساندويش
      </label>

      <input
        id="sandwichPrice"
        class="modal-input"
        type="number"
        inputmode="decimal"
        min="0"
        step="0.01"
        value="${escapeHtml(sandwichPrice)}"
      >
    `;

    return;
  }
}


// ============================================================
// ADD SIZE FIELD
// ============================================================

function addSizeField() {
  const container =
    document.getElementById("sizesFields");

  if (!container) {
    return;
  }

  const index =
    container.querySelectorAll(".size-row").length;

  const row = document.createElement("div");

  row.className = "size-row";

  row.innerHTML = `
    <input
      class="modal-input size-name"
      type="text"
      placeholder="اسم الحجم"
      data-index="${index}"
    >

    <input
      class="modal-input size-price"
      type="number"
      inputmode="decimal"
      min="0"
      step="0.01"
      placeholder="السعر"
      data-index="${index}"
    >
  `;

  container.appendChild(row);
}


// ============================================================
// SAVE MENU FORM
// ============================================================

function saveMenuForm(index = null) {
  const nameInput =
    document.getElementById("menuName");

  const categoryInput =
    document.getElementById("menuCategory");

  const typeInput =
    document.getElementById("menuType");

  const name = nameInput
    ? nameInput.value.trim()
    : "";

  const category = categoryInput
    ? categoryInput.value
    : "";

  const type = typeInput
    ? typeInput.value
    : "";

  if (!name) {
    alert("دخل اسم الصنف");
    return;
  }

  if (!category) {
    alert("اختار القسم");
    return;
  }

  let itemData = {
    name,
    category,
    type
  };


  // ----------------------------------------------------------
  // FIXED
  // ----------------------------------------------------------

  if (type === "fixed") {
    const priceInput =
      document.getElementById("price");

    const price = priceInput
      ? Number(priceInput.value)
      : 0;

    if (!price || price < 0) {
      alert("دخل السعر");
      return;
    }

    itemData.price = price;
  }


  // ----------------------------------------------------------
  // WEIGHT
  // ----------------------------------------------------------

  if (type === "weight") {
    const priceInput =
      document.getElementById("price");

    const grillInput =
      document.getElementById("grill");

    const fryInput =
      document.getElementById("fry");

    const price = priceInput
      ? Number(priceInput.value)
      : 0;

    const grill = grillInput
      ? Number(grillInput.value) || 0
      : 0;

    const fry = fryInput
      ? Number(fryInput.value) || 0
      : 0;

    if (!price || price < 0) {
      alert("دخل السعر الأساسي");
      return;
    }

    itemData.price = price;
    itemData.grill = grill;
    itemData.fry = fry;
  }


  // ----------------------------------------------------------
  // SIZES
  // ----------------------------------------------------------

  if (type === "sizes") {
    const names =
      document.querySelectorAll(".size-name");

    const prices =
      document.querySelectorAll(".size-price");

    const sizes = [];

    for (let i = 0; i < names.length; i++) {
      const sizeName =
        names[i].value.trim();

      const sizePrice =
        Number(prices[i].value);

      if (!sizeName) {
        continue;
      }

      if (
        Number.isNaN(sizePrice) ||
        sizePrice < 0
      ) {
        alert("تأكد من أسعار الأحجام");
        return;
      }

      sizes.push({
        name: sizeName,
        price: sizePrice
      });
    }

    if (sizes.length === 0) {
      alert("أضف حجم واحد على الأقل");
      return;
    }

    itemData.sizes = sizes;
  }


  // ----------------------------------------------------------
  // MEAL
  // ----------------------------------------------------------

  if (type === "meal") {
    const mealInput =
      document.getElementById("mealPrice");

    const sandwichInput =
      document.getElementById("sandwichPrice");

    const mealPrice = mealInput
      ? Number(mealInput.value)
      : 0;

    const sandwichPrice = sandwichInput
      ? Number(sandwichInput.value)
      : 0;

    if (
      !mealPrice ||
      mealPrice < 0 ||
      !sandwichPrice ||
      sandwichPrice < 0
    ) {
      alert(
        "دخل سعر الوجبة وسعر الساندويش"
      );

      return;
    }

    itemData.mealPrice = mealPrice;
    itemData.sandwichPrice = sandwichPrice;
  }


  // ----------------------------------------------------------
  // SAVE
  // ----------------------------------------------------------

  if (
    index !== null &&
    index !== undefined &&
    menu[index]
  ) {
    itemData.id = menu[index].id;

    itemData.available =
      menu[index].available !== false;

    menu[index] = {
      ...menu[index],
      ...itemData
    };

  } else {
    itemData.id = generateId("menu");
    itemData.available = true;

    menu.push(itemData);
  }

  saveMenu();

  closeModal();

  if (currentCategory) {
    showCategory(currentCategory);
  }
}


// ============================================================
// DELETE MENU ITEM
// ============================================================

function deleteMenuItem(index) {
  const item = menu[index];

  if (!item) {
    return;
  }

  const confirmed = confirm(
    `متأكد بدك تحذف "${item.name}"؟`
  );

  if (!confirmed) {
    return;
  }

  menu.splice(index, 1);

  saveMenu();

  if (
    currentCategory === item.category
  ) {
    showCategory(currentCategory);
  }

  renderMenuManager();
}


// ============================================================
// ONLINE / OFFLINE
// ============================================================

window.addEventListener(
  "online",
  function () {
    updateConnectionStatus();
    syncNow();
  }
);


window.addEventListener(
  "offline",
  function () {
    updateConnectionStatus();
  }
);


// ============================================================
// DOM READY
// ============================================================

document.addEventListener(
  "DOMContentLoaded",
  function () {

    loadMenu();

    setupCustomerSearch();

    updateConnectionStatus();

    checkLogin();

    // Try syncing any orders saved while offline
    if (navigator.onLine) {
      syncNow();
    }

  }
);


// ============================================================
// GLOBAL FUNCTIONS
// ============================================================

window.login = login;
window.logout = logout;

window.setOrderType = setOrderType;

window.showCategory = showCategory;
window.chooseItem = chooseItem;

window.closeModal = closeModal;

window.selectWeightMethod =
  selectWeightMethod;

window.addWeightedItem =
  addWeightedItem;

window.addSizedItem =
  addSizedItem;

window.addMealItem =
  addMealItem;

window.duplicateCart =
  duplicateCart;

window.removeCart =
  removeCart;

window.clearOrder =
  clearOrder;

window.confirmOrder =
  confirmOrder;

window.showOrders =
  showOrders;

window.showPreviousOrders =
  showPreviousOrders;

window.printPreviousOrder =
  printPreviousOrder;

window.showMenuManager =
  showMenuManager;

window.toggleAvailable =
  toggleAvailable;

window.newMenuItem =
  newMenuItem;

window.newOffer =
  newOffer;

window.saveOffer =
  saveOffer;

window.editMenuItem =
  editMenuItem;

window.editOffer =
  editOffer;

window.saveOfferEdit =
  saveOfferEdit;

window.renderPricingFields =
  renderPricingFields;

window.addSizeField =
  addSizeField;

window.saveMenuForm =
  saveMenuForm;

window.deleteMenuItem =
  deleteMenuItem;

window.syncNow =
  syncNow;


// ============================================================
// END OF SCRIPT
// ============================================================


// ============================================================
// END OF PART 5
// ============================================================


// ============================================================
// END OF PART 4
// ============================================================
