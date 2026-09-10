// ============================================================
// TABBARA SEAFOOD POS
// CLEAN SCRIPT - PART 1 / 6
// ============================================================

const SUPABASE_URL =
  "https://tpvhxauivmjgfcugpldp.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_0n__ZztsS8BQtdVn5lhmmA_WWuHjVg7";

const LOGIN_PASSWORD = "1234";

const CUSTOMER_STORAGE_KEY = "tabbaraCustomers";
const PENDING_ORDERS_KEY = "tabbara_pending_orders";
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
// DEFAULT MENU
// ============================================================

const DEFAULT_MENU = [

  // ---------------- FISH ----------------

  {
    id: "fish_ajaj",
    name: "أجاج",
    category: "🐟 الأسماك",
    type: "weight",
    pricing: { base: 12, grill: 3, fry: 4 },
    available: true
  },

  {
    id: "fish_boraq",
    name: "براق",
    category: "🐟 الأسماك",
    type: "weight",
    pricing: { base: 14, grill: 3, fry: 4 },
    available: true
  },

  {
    id: "fish_sardine",
    name: "سردين",
    category: "🐟 الأسماك",
    type: "weight",
    pricing: { base: 8, grill: 2, fry: 3 },
    available: true
  },

  {
    id: "fish_laqz_sandy",
    name: "لقز رملي",
    category: "🐟 الأسماك",
    type: "weight",
    pricing: { base: 16, grill: 3, fry: 4 },
    available: true
  },

  {
    id: "fish_laqz_rocky",
    name: "لقز صخري",
    category: "🐟 الأسماك",
    type: "weight",
    pricing: { base: 18, grill: 3, fry: 4 },
    available: true
  },

  {
    id: "fish_sultan",
    name: "سلطان",
    category: "🐟 الأسماك",
    type: "weight",
    pricing: { base: 15, grill: 3, fry: 4 },
    available: true
  },

  {
    id: "fish_masqar",
    name: "مسقار",
    category: "🐟 الأسماك",
    type: "weight",
    pricing: { base: 13, grill: 3, fry: 4 },
    available: true
  },

  {
    id: "fish_malifa",
    name: "مليفة",
    category: "🐟 الأسماك",
    type: "weight",
    pricing: { base: 12, grill: 3, fry: 4 },
    available: true
  },

  {
    id: "fish_jarbidi",
    name: "جربيدي",
    category: "🐟 الأسماك",
    type: "weight",
    pricing: { base: 14, grill: 3, fry: 4 },
    available: true
  },

  {
    id: "fish_armout_blond",
    name: "عرموط أشقر",
    category: "🐟 الأسماك",
    type: "weight",
    pricing: { base: 11, grill: 3, fry: 4 },
    available: true
  },

  {
    id: "fish_armout_cut",
    name: "عرموط مقطع",
    category: "🐟 الأسماك",
    type: "weight",
    pricing: { base: 12, grill: 3, fry: 4 },
    available: true
  },


  // ---------------- SEAFOOD ----------------

  {
    id: "seafood_shrimp_medium",
    name: "قريدس وسط",
    category: "🦐 ثمار البحر",
    type: "weight",
    pricing: { base: 16, grill: 2, fry: 3 },
    available: true
  },

  {
    id: "seafood_shrimp_large",
    name: "قريدس كبير",
    category: "🦐 ثمار البحر",
    type: "weight",
    pricing: { base: 20, grill: 2, fry: 3 },
    available: true
  },

  {
    id: "seafood_calamari",
    name: "كالامار",
    category: "🦐 ثمار البحر",
    type: "weight",
    pricing: { base: 14, grill: 2, fry: 3 },
    available: true
  },

  {
    id: "seafood_fillet_fresh",
    name: "فيليه طازج",
    category: "🦐 ثمار البحر",
    type: "weight",
    pricing: { base: 17, grill: 3, fry: 4 },
    available: true
  },

  {
    id: "seafood_fillet_crispy",
    name: "فيليه مقرمش",
    category: "🦐 ثمار البحر",
    type: "weight",
    pricing: { base: 18, grill: 2, fry: 3 },
    available: true
  },

  {
    id: "seafood_mix",
    name: "ثمار البحر",
    category: "🦐 ثمار البحر",
    type: "sizes",
    sizes: {
      صغير: 15,
      وسط: 22,
      سطل: 35
    },
    available: true
  },


  // ---------------- MEALS / SANDWICHES ----------------

  {
    id: "meal_free_fish",
    name: "سمكة حرة",
    category: "🍽️ الوجبات والساندويش",
    type: "meal",
    prices: {
      وجبة: 15,
      ساندويش: 8
    },
    available: true
  },

  {
    id: "meal_shrimp",
    name: "قريدس",
    category: "🍽️ الوجبات والساندويش",
    type: "meal",
    prices: {
      وجبة: 15,
      ساندويش: 8
    },
    available: true
  },

  {
    id: "meal_seafood",
    name: "ثمار البحر",
    category: "🍽️ الوجبات والساندويش",
    type: "meal",
    prices: {
      وجبة: 16,
      ساندويش: 9
    },
    available: true
  },

  {
    id: "meal_calamari",
    name: "كالامار",
    category: "🍽️ الوجبات والساندويش",
    type: "meal",
    prices: {
      وجبة: 14,
      ساندويش: 8
    },
    available: true
  },

  {
    id: "meal_sardine",
    name: "سردين",
    category: "🍽️ الوجبات والساندويش",
    type: "meal",
    prices: {
      وجبة: 11,
      ساندويش: 7
    },
    available: true
  },


  // ---------------- APPETIZERS ----------------

  {
    id: "app_sayadieh",
    name: "صيادية",
    category: "🥗 المقبلات",
    type: "sizes",
    sizes: {
      صغير: 5,
      وسط: 8,
      كبير: 11
    },
    available: true
  },

  {
    id: "app_mtabbal",
    name: "متبل",
    category: "🥗 المقبلات",
    type: "fixed",
    price: 4,
    available: true
  },

  {
    id: "app_shakshuka",
    name: "شكشوكة",
    category: "🥗 المقبلات",
    type: "fixed",
    price: 5,
    available: true
  },

  {
    id: "app_tarator",
    name: "طرطور كبير",
    category: "🥗 المقبلات",
    type: "fixed",
    price: 4,
    available: true
  },

  {
    id: "app_fries",
    name: "بطاطا مقلية",
    category: "🥗 المقبلات",
    type: "sizes",
    sizes: {
      صغير: 3,
      وسط: 5,
      كبير: 7
    },
    available: true
  },


  // ---------------- SALADS ----------------

  {
    id: "salad_tabouleh",
    name: "تبولة",
    category: "🥬 السلطات",
    type: "fixed",
    price: 6,
    available: true
  },

  {
    id: "salad_fattoush",
    name: "فتوش",
    category: "🥬 السلطات",
    type: "fixed",
    price: 6,
    available: true
  },

  {
    id: "salad_crab",
    name: "سلطة كراب",
    category: "🥬 السلطات",
    type: "fixed",
    price: 8,
    available: true
  },


  // ---------------- DRINKS ----------------

  {
    id: "drink_pepsi",
    name: "Pepsi",
    category: "🥤 المشروبات",
    type: "sizes",
    sizes: {
      صغير: 2,
      كبير: 3
    },
    available: true
  },

  {
    id: "drink_7up",
    name: "7up",
    category: "🥤 المشروبات",
    type: "sizes",
    sizes: {
      صغير: 2,
      كبير: 3
    },
    available: true
  },

  {
    id: "drink_miranda",
    name: "Miranda",
    category: "🥤 المشروبات",
    type: "sizes",
    sizes: {
      صغير: 2,
      كبير: 3
    },
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
// APP STATE
// ============================================================

let menu = [];
let cart = [];

let selectedOrderType = "";
let currentCategory = "";
let currentModalItem = null;


// ============================================================
// MENU STORAGE
// ============================================================

function loadMenu() {

  try {

    const saved =
      localStorage.getItem(MENU_STORAGE_KEY);

    if (saved) {

      const parsed =
        JSON.parse(saved);

      if (
        Array.isArray(parsed) &&
        parsed.length > 0
      ) {

        menu = parsed;

        return;
      }
    }

  } catch (error) {

    console.error(
      "Menu load error:",
      error
    );
  }

  menu =
    JSON.parse(
      JSON.stringify(DEFAULT_MENU)
    );

  saveMenu();
}


function saveMenu() {

  try {

    localStorage.setItem(
      MENU_STORAGE_KEY,
      JSON.stringify(menu)
    );

  } catch (error) {

    console.error(
      "Menu save error:",
      error
    );
  }
}


// ============================================================
// HELPERS
// ============================================================

function money(value) {

  return Number(
    value || 0
  ).toFixed(2);
}


function escapeHtml(value) {

  return String(
    value ?? ""
  )
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


function generateId(prefix = "id") {

  return (
    prefix +
    "-" +
    Date.now() +
    "-" +
    Math.random()
      .toString(36)
      .substring(2, 9)
  );
}


function getItemById(id) {

  return menu.find(
    item => item.id === id
  );
}


function getTotal() {

  return cart.reduce(
    (sum, item) =>
      sum + Number(item.total || 0),
    0
  );
}


// ============================================================
// PHONE
// ============================================================

function normalizePhone(phone) {

  if (
    phone === null ||
    phone === undefined
  ) {
    return "";
  }

  let value =
    String(phone).trim();

  value =
    value.replace(
      /[\s\-().]/g,
      ""
    );

  if (
    value.startsWith("00")
  ) {
    value =
      "+" +
      value.substring(2);
  }

  if (
    value.startsWith("03") ||
    value.startsWith("70") ||
    value.startsWith("71") ||
    value.startsWith("76") ||
    value.startsWith("78") ||
    value.startsWith("79") ||
    value.startsWith("81")
  ) {
    value =
      "+961" +
      value;
  }

  return value;
}


// ============================================================
// END OF PART 1
// ============================================================
// ============================================================
// AUTH / LOGIN
// ============================================================

function login() {

  const passwordInput =
    document.getElementById("loginPassword");

  const error =
    document.getElementById("loginError");

  if (!passwordInput) {
    return;
  }

  const password =
    passwordInput.value;

  if (
    password === LOGIN_PASSWORD
  ) {

    localStorage.setItem(
      "tabbaraLoggedIn",
      "true"
    );

    if (error) {
      error.textContent = "";
    }

    showApp();

  } else {

    if (error) {
      error.textContent =
        "كلمة المرور غير صحيحة";
    }
  }
}


function logout() {

  localStorage.removeItem(
    "tabbaraLoggedIn"
  );

  location.reload();
}


function showApp() {

  const loginScreen =
    document.getElementById(
      "loginScreen"
    );

  if (loginScreen) {
    loginScreen.style.display =
      "none";
  }

  const app =
    document.querySelector(".app");

  if (app) {
    app.style.display =
      "block";
  }

  updateConnectionStatus();

  renderCategories();

  showPOS();
}


// ============================================================
// CONNECTION STATUS
// ============================================================

function updateConnectionStatus() {

  const element =
    document.getElementById(
      "connectionStatus"
    );

  if (!element) {
    return;
  }

  if (navigator.onLine) {

    element.textContent =
      "🟢 متصل";

    element.style.color =
      "#16a34a";

  } else {

    element.textContent =
      "🔴 بدون إنترنت";

    element.style.color =
      "#dc2626";
  }
}


window.addEventListener(
  "online",
  function () {

    updateConnectionStatus();

    syncPendingOrders();
  }
);


window.addEventListener(
  "offline",
  function () {

    updateConnectionStatus();
  }
);


// ============================================================
// MODAL
// ============================================================

function modal(
  title,
  content
) {

  const root =
    document.getElementById(
      "modalRoot"
    );

  if (!root) {
    return;
  }

  root.innerHTML = `

    <div
      class="modal-backdrop"
      onclick="closeModal(event)"
    >

      <div
        class="modal-box"
        onclick="event.stopPropagation()"
      >

        <div class="modal-header">

          <h3>
            ${escapeHtml(title)}
          </h3>

          <button
            onclick="closeModal()"
          >
            ✕
          </button>

        </div>

        <div class="modal-body">

          ${content}

        </div>

      </div>

    </div>
  `;
}


function closeModal() {

  const root =
    document.getElementById(
      "modalRoot"
    );

  if (root) {
    root.innerHTML = "";
  }

  currentModalItem = null;
}


// ============================================================
// ORDER TYPE
// ============================================================

function setOrderType(type) {

  selectedOrderType =
    type;

  const orderTypeElement =
    document.getElementById(
      "orderType"
    );

  if (orderTypeElement) {

    orderTypeElement.textContent =
      type;
  }

  const deliveryBtn =
    document.getElementById(
      "deliveryBtn"
    );

  const pickupBtn =
    document.getElementById(
      "pickupBtn"
    );

  if (deliveryBtn) {

    deliveryBtn.classList.toggle(
      "active",
      type === "Delevery"
    );
  }

  if (pickupBtn) {

    pickupBtn.classList.toggle(
      "active",
      type === "استلام من المحل"
    );
  }

  showPOS();
}


// ============================================================
// CATEGORIES
// ============================================================

function renderCategories() {

  const container =
    document.getElementById(
      "categories"
    );

  if (!container) {
    return;
  }

  container.innerHTML =
    CATEGORIES.map(
      category => `

        <button
          class="category-btn ${
            currentCategory === category
              ? "active"
              : ""
          }"
          onclick='selectCategory(${JSON.stringify(category)})'
        >

          ${escapeHtml(category)}

        </button>
      `
    ).join("");
}


function selectCategory(category) {

  currentCategory =
    category;

  renderCategories();

  renderItems();
}


// ============================================================
// POS
// ============================================================

function showPOS() {

  renderCategories();

  renderItems();

  renderCart();
}


function renderItems() {

  const container =
    document.getElementById(
      "items"
    );

  if (!container) {
    return;
  }

  if (!selectedOrderType) {

    container.innerHTML = `

      <div class="empty-state">

        اختر نوع الطلب أولاً

      </div>
    `;

    return;
  }

  if (!currentCategory) {

    container.innerHTML = `

      <div class="empty-state">

        اختر القسم

      </div>
    `;

    return;
  }

  let items =
    menu.filter(
      item =>
        item.category ===
        currentCategory
    );

  if (
    currentCategory ===
    "🎁 العروض"
  ) {

    items =
      menu.filter(
        item =>
          item.category ===
          "🎁 العروض"
      );
  }

  if (!items.length) {

    container.innerHTML = `

      <div class="empty-state">

        لا يوجد أصناف حالياً

      </div>
    `;

    return;
  }

  container.innerHTML =
    items
      .map(
        item => {

          const disabled =
            item.available === false;

          return `

            <button
              class="menu-item ${
                disabled
                  ? "disabled"
                  : ""
              }"
              ${
                disabled
                  ? "disabled"
                  : `onclick='openItem(${JSON.stringify(item.id)})'`
              }
            >

              <div class="menu-item-name">

                ${escapeHtml(item.name)}

              </div>

              <div class="menu-item-price">

                ${
                  disabled
                    ? "منتهي"
                    : getDisplayPrice(item)
                }

              </div>

            </button>
          `;
        }
      )
      .join("");
}


function getDisplayPrice(item) {

  if (
    item.type ===
    "fixed"
  ) {

    return money(
      item.price
    );
  }

  if (
    item.type ===
    "weight"
  ) {

    return (
      "ابتداءً من " +
      money(
        item.pricing?.base
      ) +
      " / كغ"
    );
  }

  if (
    item.type ===
    "sizes"
  ) {

    const values =
      Object.values(
        item.sizes || {}
      );

    if (!values.length) {
      return "";
    }

    return (
      "ابتداءً من " +
      money(
        Math.min(
          ...values
        )
      )
    );
  }

  if (
    item.type ===
    "meal"
  ) {

    return (
      "وجبة " +
      money(
        item.prices?.وجبة
      ) +
      " | ساندويش " +
      money(
        item.prices?.ساندويش
      )
    );
  }

  if (
    item.type ===
    "offer"
  ) {

    return money(
      item.price
    );
  }

  return "";
}


// ============================================================
// OPEN ITEM
// ============================================================

function openItem(id) {

  const item =
    getItemById(id);

  if (!item) {
    return;
  }

  if (
    item.available === false
  ) {

    alert(
      "هذا الصنف منتهي حالياً"
    );

    return;
  }

  currentModalItem =
    item;

  if (
    item.type ===
    "weight"
  ) {

    openWeightModal(item);

    return;
  }

  if (
    item.type ===
    "sizes"
  ) {

    openSizesModal(item);

    return;
  }

  if (
    item.type ===
    "meal"
  ) {

    openMealModal(item);

    return;
  }

  if (
    item.type ===
    "offer"
  ) {

    addToCart({
      id: generateId("cart"),
      menuItemId: item.id,
      name: item.name,
      quantity: 1,
      unitPrice: Number(
        item.price || 0
      ),
      total: Number(
        item.price || 0
      )
    });

    closeModal();

    return;
  }

  if (
    item.type ===
    "fixed"
  ) {

    addToCart({
      id: generateId("cart"),
      menuItemId: item.id,
      name: item.name,
      quantity: 1,
      unitPrice: Number(
        item.price || 0
      ),
      total: Number(
        item.price || 0
      )
    });

    renderCart();
  }
}


// ============================================================
// END OF PART 2
// ============================================================
// ============================================================
// WEIGHT MODAL
// ============================================================

function openWeightModal(item) {

  const pricing =
    item.pricing || {};

  modal(
    item.name,
    `

      <div class="option-group">

        <label>
          الوزن بالكيلو
        </label>

        <input
          id="weightInput"
          type="number"
          min="0.01"
          step="0.01"
          value="1"
          class="modal-input"
        >

      </div>


      <div class="option-group">

        <label>
          طريقة التحضير
        </label>

        <div class="option-buttons">

          <button
            type="button"
            onclick="selectPreparation('ني')"
            id="prep-raw"
            class="option-btn active"
          >
            ني
          </button>

          <button
            type="button"
            onclick="selectPreparation('مشوي')"
            id="prep-grill"
            class="option-btn"
          >
            مشوي
            (+${money(pricing.grill)})
          </button>

          <button
            type="button"
            onclick="selectPreparation('مقلي')"
            id="prep-fry"
            class="option-btn"
          >
            مقلي
            (+${money(pricing.fry)})
          </button>

        </div>

      </div>


      <input
        type="hidden"
        id="preparationInput"
        value="ني"
      >


      <button
        type="button"
        class="modal-confirm-btn"
        onclick="confirmWeightItem()"
      >
        إضافة للطلب
      </button>

    `
  );
}


function selectPreparation(value) {

  const input =
    document.getElementById(
      "preparationInput"
    );

  if (input) {
    input.value = value;
  }

  document
    .querySelectorAll(
      ".option-btn"
    )
    .forEach(
      button =>
        button.classList.remove(
          "active"
        )
    );

  if (
    value === "ني"
  ) {

    document
      .getElementById(
        "prep-raw"
      )
      ?.classList.add(
        "active"
      );
  }

  if (
    value === "مشوي"
  ) {

    document
      .getElementById(
        "prep-grill"
      )
      ?.classList.add(
        "active"
      );
  }

  if (
    value === "مقلي"
  ) {

    document
      .getElementById(
        "prep-fry"
      )
      ?.classList.add(
        "active"
      );
  }
}


function confirmWeightItem() {

  const item =
    currentModalItem;

  if (!item) {
    return;
  }

  const weight =
    Number(
      document.getElementById(
        "weightInput"
      )?.value
    );

  if (
    !weight ||
    weight <= 0
  ) {

    alert(
      "أدخل وزن صحيح"
    );

    return;
  }

  const preparation =
    document.getElementById(
      "preparationInput"
    )?.value ||
    "ني";

  const pricing =
    item.pricing || {};

  let unitPrice =
    Number(
      pricing.base || 0
    );

  if (
    preparation === "مشوي"
  ) {

    unitPrice +=
      Number(
        pricing.grill || 0
      );
  }

  if (
    preparation === "مقلي"
  ) {

    unitPrice +=
      Number(
        pricing.fry || 0
      );
  }

  addToCart({

    id:
      generateId("cart"),

    menuItemId:
      item.id,

    name:
      item.name,

    preparation:
      preparation,

    weight:
      weight,

    quantity:
      1,

    unitPrice:
      unitPrice,

    total:
      unitPrice * weight

  });

  closeModal();

  renderCart();
}


// ============================================================
// SIZES MODAL
// ============================================================

function openSizesModal(item) {

  const sizes =
    item.sizes || {};

  const buttons =
    Object.entries(
      sizes
    )
      .map(
        ([size, price], index) => `

          <button
            type="button"
            class="size-option ${
              index === 0
                ? "active"
                : ""
            }"
            onclick="selectSizeOption(this)"
            data-size="${escapeHtml(size)}"
            data-price="${Number(price)}"
          >

            <strong>
              ${escapeHtml(size)}
            </strong>

            <span>
              ${money(price)}
            </span>

          </button>
        `
      )
      .join("");

  modal(
    item.name,
    `

      <div
        id="sizeOptions"
        class="size-options"
      >

        ${buttons}

      </div>


      <button
        type="button"
        class="modal-confirm-btn"
        onclick="confirmSizeItem()"
      >
        إضافة للطلب
      </button>

    `
  );
}


function selectSizeOption(button) {

  document
    .querySelectorAll(
      ".size-option"
    )
    .forEach(
      element =>
        element.classList.remove(
          "active"
        )
    );

  button.classList.add(
    "active"
  );
}


function confirmSizeItem() {

  const item =
    currentModalItem;

  if (!item) {
    return;
  }

  const selected =
    document.querySelector(
      ".size-option.active"
    );

  if (!selected) {
    return;
  }

  const size =
    selected.dataset.size;

  const price =
    Number(
      selected.dataset.price
    );

  addToCart({

    id:
      generateId("cart"),

    menuItemId:
      item.id,

    name:
      item.name,

    size:
      size,

    quantity:
      1,

    unitPrice:
      price,

    total:
      price

  });

  closeModal();

  renderCart();
}


// ============================================================
// MEAL / SANDWICH MODAL
// ============================================================

function openMealModal(item) {

  const prices =
    item.prices || {};

  modal(
    item.name,
    `

      <div
        class="option-buttons"
      >

        <button
          type="button"
          class="option-btn active"
          onclick="confirmMealItem('وجبة')"
        >

          وجبة

          <strong>
            ${money(prices.وجبة)}
          </strong>

        </button>


        <button
          type="button"
          class="option-btn"
          onclick="confirmMealItem('ساندويش')"
        >

          ساندويش

          <strong>
            ${money(prices.ساندويش)}
          </strong>

        </button>

      </div>

    `
  );
}


function confirmMealItem(type) {

  const item =
    currentModalItem;

  if (!item) {
    return;
  }

  const price =
    Number(
      item.prices?.[type] || 0
    );

  if (
    price <= 0
  ) {

    alert(
      "السعر غير محدد"
    );

    return;
  }

  addToCart({

    id:
      generateId("cart"),

    menuItemId:
      item.id,

    name:
      item.name,

    option:
      type,

    quantity:
      1,

    unitPrice:
      price,

    total:
      price

  });

  closeModal();

  renderCart();
}


// ============================================================
// CART
// ============================================================

function addToCart(item) {

  cart.push(item);

  renderCart();
}


function removeFromCart(id) {

  cart =
    cart.filter(
      item =>
        item.id !== id
    );

  renderCart();
}


function changeCartQuantity(
  id,
  amount
) {

  const item =
    cart.find(
      entry =>
        entry.id === id
    );

  if (!item) {
    return;
  }

  item.quantity =
    Math.max(
      1,
      Number(
        item.quantity || 1
      ) + amount
    );

  if (
    item.weight
  ) {

    item.total =
      Number(
        item.unitPrice || 0
      ) *
      Number(
        item.weight || 0
      ) *
      Number(
        item.quantity || 1
      );

  } else {

    item.total =
      Number(
        item.unitPrice || 0
      ) *
      Number(
        item.quantity || 1
      );
  }

  renderCart();
}


// ============================================================
// RENDER CART
// ============================================================

function renderCart() {

  const container =
    document.getElementById(
      "cartItems"
    );

  const totalElement =
    document.getElementById(
      "total"
    );

  if (!container) {
    return;
  }

  if (!cart.length) {

    container.innerHTML = `

      <div class="empty-cart">

        السلة فارغة

      </div>

    `;

  } else {

    container.innerHTML =
      cart
        .map(
          item => {

            let details = "";

            if (
              item.weight
            ) {

              details =
                `${Number(item.weight).toFixed(2)} كغ • ${escapeHtml(item.preparation || "ني")}`;

            } else if (
              item.size
            ) {

              details =
                escapeHtml(
                  item.size
                );

            } else if (
              item.option
            ) {

              details =
                escapeHtml(
                  item.option
                );
            }

            return `

              <div
                class="cart-item"
              >

                <div
                  class="cart-item-info"
                >

                  <strong>
                    ${escapeHtml(item.name)}
                  </strong>

                  ${
                    details
                      ? `<small>${details}</small>`
                      : ""
                  }

                </div>


                <div
                  class="cart-item-controls"
                >

                  <button
                    onclick="changeCartQuantity('${item.id}', -1)"
                  >
                    −
                  </button>

                  <span>
                    ${item.quantity || 1}
                  </span>

                  <button
                    onclick="changeCartQuantity('${item.id}', 1)"
                  >
                    +
                  </button>

                  <button
                    class="remove-btn"
                    onclick="removeFromCart('${item.id}')"
                  >
                    🗑
                  </button>

                </div>


                <div
                  class="cart-item-total"
                >

                  ${money(item.total)}

                </div>

              </div>

            `;
          }
        )
        .join("");
  }

  if (totalElement) {

    totalElement.textContent =
      money(
        getTotal()
      );
  }
}


// ============================================================
// END OF PART 3
// ============================================================
// ============================================================
// CUSTOMER CACHE
// ============================================================

function loadCustomers() {

  try {

    const saved =
      localStorage.getItem(
        CUSTOMER_STORAGE_KEY
      );

    if (!saved) {
      return [];
    }

    const customers =
      JSON.parse(saved);

    return Array.isArray(customers)
      ? customers
      : [];

  } catch (error) {

    console.error(
      "Customer cache error:",
      error
    );

    return [];
  }
}


function saveCustomers(customers) {

  try {

    localStorage.setItem(
      CUSTOMER_STORAGE_KEY,
      JSON.stringify(customers)
    );

  } catch (error) {

    console.error(
      "Customer save error:",
      error
    );
  }
}


function cacheCustomer(customer) {

  if (!customer) {
    return;
  }

  const customers =
    loadCustomers();

  const phone =
    normalizePhone(
      customer.phone
    );

  if (!phone) {
    return;
  }

  const index =
    customers.findIndex(
      item =>
        normalizePhone(
          item.phone
        ) === phone
    );

  const savedCustomer = {

    phone:

      phone,

    name:

      customer.name ||
      "",

    address:

      customer.address ||
      "",

    notes:

      customer.notes ||
      "",

    updated_at:

      new Date().toISOString()
  };


  if (index >= 0) {

    customers[index] =
      {
        ...customers[index],
        ...savedCustomer
      };

  } else {

    customers.push(
      savedCustomer
    );
  }

  saveCustomers(
    customers
  );
}


// ============================================================
// CUSTOMER SEARCH
// ============================================================

async function findCustomer(
  phone
) {

  const normalized =
    normalizePhone(
      phone
    );

  if (!normalized) {
    return null;
  }


  // ----------------------------------------------------------
  // LOCAL CACHE FIRST
  // ----------------------------------------------------------

  const customers =
    loadCustomers();

  const localCustomer =
    customers.find(
      customer =>
        normalizePhone(
          customer.phone
        ) === normalized
    );

  if (localCustomer) {

    fillCustomerFields(
      localCustomer
    );

    return localCustomer;
  }


  // ----------------------------------------------------------
  // SUPABASE
  // ----------------------------------------------------------

  if (!navigator.onLine) {
    return null;
  }

  try {

    const url =
      SUPABASE_URL +
      "/rest/v1/customers" +
      "?phone=eq." +
      encodeURIComponent(
        normalized
      ) +
      "&select=*";

    const response =
      await fetch(
        url,
        {
          method: "GET",

          headers: {

            apikey:
              SUPABASE_KEY,

            Authorization:
              "Bearer " +
              SUPABASE_KEY
          }
        }
      );

    if (!response.ok) {
      return null;
    }

    const data =
      await response.json();

    if (
      Array.isArray(data) &&
      data.length > 0
    ) {

      const customer =
        data[0];

      cacheCustomer(
        customer
      );

      fillCustomerFields(
        customer
      );

      return customer;
    }

  } catch (error) {

    console.error(
      "Customer lookup error:",
      error
    );
  }

  return null;
}


// ============================================================
// FILL CUSTOMER FIELDS
// ============================================================

function fillCustomerFields(
  customer
) {

  const name =
    document.getElementById(
      "name"
    );

  const phone =
    document.getElementById(
      "phone"
    );

  const address =
    document.getElementById(
      "address"
    );

  const notes =
    document.getElementById(
      "notes"
    );


  if (phone) {

    phone.value =
      customer.phone ||
      "";
  }

  if (name) {

    name.value =
      customer.name ||
      "";
  }

  if (address) {

    address.value =
      customer.address ||
      "";
  }

  if (notes) {

    notes.value =
      customer.notes ||
      "";
  }
}


// ============================================================
// CUSTOMER PHONE INPUT
// ============================================================

async function handlePhoneChange() {

  const phone =
    document.getElementById(
      "phone"
    )?.value;

  if (!phone) {
    return;
  }

  const normalized =
    normalizePhone(
      phone
    );

  if (
    normalized.length < 8
  ) {
    return;
  }

  await findCustomer(
    normalized
  );
}


// ============================================================
// SAVE CUSTOMER
// ============================================================

async function saveCustomer(
  customer
) {

  if (!customer) {
    return null;
  }

  const normalized =
    normalizePhone(
      customer.phone
    );

  if (!normalized) {
    return null;
  }

  const record = {

    phone:
      normalized,

    name:
      customer.name ||
      "",

    address:
      customer.address ||
      "",

    notes:
      customer.notes ||
      "",

    updated_at:
      new Date().toISOString()
  };


  // ----------------------------------------------------------
  // ALWAYS SAVE LOCALLY
  // ----------------------------------------------------------

  cacheCustomer(
    record
  );


  // ----------------------------------------------------------
  // SAVE TO SUPABASE WHEN ONLINE
  // ----------------------------------------------------------

  if (!navigator.onLine) {

    return record;
  }

  try {

    const response =
      await fetch(
        SUPABASE_URL +
        "/rest/v1/customers",
        {

          method:
            "POST",

          headers: {

            apikey:
              SUPABASE_KEY,

            Authorization:
              "Bearer " +
              SUPABASE_KEY,

            "Content-Type":
              "application/json",

            Prefer:
              "resolution=merge-duplicates"
          },

          body:
            JSON.stringify(
              record
            )
        }
      );

    if (!response.ok) {

      console.warn(
        "Customer cloud save failed:",
        response.status
      );
    }

  } catch (error) {

    console.error(
      "Customer save error:",
      error
    );
  }

  return record;
}


// ============================================================
// PENDING ORDERS
// ============================================================

function loadPendingOrders() {

  try {

    const primary =
      localStorage.getItem(
        PENDING_ORDERS_KEY
      );

    const old =
      localStorage.getItem(
        "tabbaraPendingOrders"
      );

    const saved =
      primary ||
      old;

    if (!saved) {
      return [];
    }

    const parsed =
      JSON.parse(saved);

    return Array.isArray(parsed)
      ? parsed
      : [];

  } catch (error) {

    console.error(
      "Pending orders load error:",
      error
    );

    return [];
  }
}


function savePendingOrders(
  orders
) {

  try {

    localStorage.setItem(
      PENDING_ORDERS_KEY,
      JSON.stringify(
        orders
      )
    );

  } catch (error) {

    console.error(
      "Pending orders save error:",
      error
    );
  }
}


// ============================================================
// ADD PENDING ORDER
// ============================================================

function addPendingOrder(
  order
) {

  const pending =
    loadPendingOrders();

  pending.push(
    order
  );

  savePendingOrders(
    pending
  );
}


// ============================================================
// SEND ORDER TO SUPABASE
// ============================================================

async function sendOrder(
  order
) {

  const response =
    await fetch(
      SUPABASE_URL +
      "/rest/v1/orders",
      {

        method:
          "POST",

        headers: {

          apikey:
            SUPABASE_KEY,

          Authorization:
            "Bearer " +
            SUPABASE_KEY,

          "Content-Type":
            "application/json",

          Prefer:
            "return=minimal"
        },

        body:
          JSON.stringify(
            {
              ...order,
              sync_status:
                "synced"
            }
          )
      }
    );

  if (!response.ok) {

    throw new Error(
      "Order save failed: " +
      response.status
    );
  }

  return true;
}


// ============================================================
// SYNC PENDING ORDERS
// ============================================================

async function syncPendingOrders() {

  if (!navigator.onLine) {
    return;
  }

  const pending =
    loadPendingOrders();

  if (!pending.length) {
    return;
  }

  const remaining = [];

  for (
    const order
    of pending
  ) {

    try {

      await sendOrder(
        order
      );

    } catch (error) {

      console.error(
        "Pending order sync failed:",
        error
      );

      remaining.push(
        order
      );
    }
  }

  savePendingOrders(
    remaining
  );
}


// ============================================================
// END OF PART 4
// ============================================================
// ============================================================
// TABBARA SEAFOOD POS
// CLEAN SCRIPT - PART 5 / 6
// ============================================================

// ============================================================
// CLEAR ORDER
// ============================================================

function clearOrder() {
  cart = [];

  const nameInput = document.getElementById("name");
  const phoneInput = document.getElementById("phone");
  const addressInput = document.getElementById("address");
  const notesInput = document.getElementById("notes");

  if (nameInput) nameInput.value = "";
  if (phoneInput) phoneInput.value = "";
  if (addressInput) addressInput.value = "";
  if (notesInput) notesInput.value = "";

  const customerMessage = document.getElementById("customerMessage");
  if (customerMessage) {
    customerMessage.textContent = "";
  }

  orderType = "";
  selectedCategory = "";

  const orderTypeElement = document.getElementById("orderType");
  if (orderTypeElement) {
    orderTypeElement.textContent = "—";
  }

  document.querySelectorAll("#deliveryBtn, #pickupBtn").forEach(btn => {
    btn.classList.remove("active");
  });

  renderCart();
  showPOS();
}


// ============================================================
// CONFIRM ORDER
// ============================================================

async function confirmOrder() {

  if (!orderType) {
    alert("اختار نوع الطلب أولاً.");
    return;
  }

  if (!cart.length) {
    alert("السلة فارغة.");
    return;
  }

  const name =
    document.getElementById("name")?.value.trim() || "";

  const phone =
    document.getElementById("phone")?.value.trim() || "";

  const address =
    document.getElementById("address")?.value.trim() || "";

  const notes =
    document.getElementById("notes")?.value.trim() || "";

  if (orderType === "Delevery") {

    if (!name) {
      alert("اكتب اسم الزبون.");
      return;
    }

    if (!phone) {
      alert("اكتب رقم الهاتف.");
      return;
    }

    if (!address) {
      alert("اكتب عنوان التوصيل.");
      return;
    }
  }

  const order = {
    id: generateId(),

    order_type: orderType,

    customer_name: name || null,

    customer_phone: phone || null,

    customer_address: address || null,

    notes: notes || null,

    items: cart.map(item => ({
      id: item.id,
      name: item.name,
      category: item.category,
      quantity: item.quantity,
      unit_price: Number(item.unit_price || 0),
      total: Number(item.unit_price || 0) * Number(item.quantity || 1),

      weight: item.weight || null,

      preparation: item.preparation || null,

      size: item.size || null,

      mealType: item.mealType || null
    })),

    total: Number(getTotal().toFixed(2)),

    device_id: getDeviceId(),

    sync_status: navigator.onLine ? "synced" : "pending",

    created_at: new Date().toISOString()
  };

  // Save customer
  if (phone) {
    await saveCustomer({
      phone,
      name,
      address,
      notes
    });
  }

  let sent = false;

  if (navigator.onLine) {
    sent = await sendOrder(order);
  }

  if (!sent) {
    addPendingOrder(order);
  }

  window.lastCompletedOrder = order;

  const statusText = sent
    ? "تم حفظ الطلب بنجاح."
    : "تم حفظ الطلب على الجهاز وسيتم مزامنته تلقائياً عند عودة الإنترنت.";

  modal(
    "تم تأكيد الطلب",
    `
      <div style="text-align:center;padding:10px">

        <div style="font-size:42px;margin-bottom:10px">
          ✓
        </div>

        <h3 style="margin:8px 0">
          ${statusText}
        </h3>

        <div style="font-size:20px;font-weight:bold;margin:15px 0">
          المجموع: ${money(order.total)}
        </div>

        <button
          class="primary"
          onclick="printInvoice(window.lastCompletedOrder)"
          style="width:100%;margin-bottom:8px"
        >
          🖨️ طباعة الفاتورة
        </button>

        <button
          class="secondary"
          onclick="closeModal(); clearOrder();"
          style="width:100%"
        >
          طلب جديد
        </button>

      </div>
    `
  );
}


// ============================================================
// PREVIOUS ORDERS
// ============================================================

async function showOrders() {

  if (!navigator.onLine) {
    modal(
      "الطلبات السابقة",
      `
        <div style="padding:15px;text-align:center">
          <p>أنت حالياً بدون إنترنت.</p>
          <p>الطلبات الموجودة على السيرفر غير متاحة حالياً.</p>
        </div>
      `
    );
    return;
  }

  try {

    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/orders?select=*&order=created_at.desc&limit=100`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`
        }
      }
    );

    if (!response.ok) {
      throw new Error("Failed to load orders");
    }

    const orders = await response.json();

    if (!orders.length) {

      modal(
        "الطلبات السابقة",
        `
          <div style="text-align:center;padding:20px">
            لا يوجد طلبات محفوظة بعد.
          </div>
        `
      );

      return;
    }

    const html = orders.map((order, index) => {

      const date = order.created_at
        ? new Date(order.created_at).toLocaleString("ar-LB")
        : "";

      return `
        <div
          style="
            border:1px solid #ddd;
            border-radius:12px;
            padding:12px;
            margin-bottom:10px;
            background:#fff;
          "
        >

          <div style="font-weight:bold;font-size:17px">
            طلب #${orders.length - index}
          </div>

          <div style="font-size:13px;color:#666;margin-top:4px">
            ${escapeHtml(date)}
          </div>

          <div style="margin-top:8px">
            النوع:
            <strong>
              ${escapeHtml(order.order_type || "")}
            </strong>
          </div>

          ${
            order.customer_name
              ? `
                <div>
                  الزبون:
                  ${escapeHtml(order.customer_name)}
                </div>
              `
              : ""
          }

          ${
            order.customer_phone
              ? `
                <div>
                  الهاتف:
                  ${escapeHtml(order.customer_phone)}
                </div>
              `
              : ""
          }

          <div style="margin-top:8px;font-weight:bold">
            المجموع: ${money(order.total)}
          </div>

        </div>
      `;

    }).join("");

    modal(
      "الطلبات السابقة",
      `
        <div style="max-height:70vh;overflow:auto">
          ${html}
        </div>
      `
    );

  } catch (error) {

    console.error(error);

    modal(
      "الطلبات السابقة",
      `
        <div style="text-align:center;padding:20px">
          تعذر تحميل الطلبات.
        </div>
      `
    );
  }
}


// ============================================================
// MENU MANAGER
// ============================================================

function showMenuManager() {

  const rows = menu.map(item => {

    const status = item.available !== false
      ? "متوفر"
      : "خلص";

    const statusClass = item.available !== false
      ? "available"
      : "soldout";

    return `
      <div
        class="menu-manager-row"
        style="
          border:1px solid #ddd;
          border-radius:12px;
          padding:12px;
          margin-bottom:10px;
          background:#fff;
        "
      >

        <div style="display:flex;justify-content:space-between;gap:10px">

          <div>

            <div style="font-weight:bold;font-size:17px">
              ${escapeHtml(item.name)}
            </div>

            <div style="font-size:13px;color:#777">
              ${escapeHtml(item.category || "")}
            </div>

            <div style="margin-top:5px">
              ${getManagerPriceText(item)}
            </div>

            <div
              class="${statusClass}"
              style="margin-top:5px;font-weight:bold"
            >
              ${status}
            </div>

          </div>

          <div
            style="
              display:flex;
              flex-direction:column;
              gap:6px;
              min-width:90px;
            "
          >

            <button
              onclick="toggleAvailability('${item.id}')"
            >
              ${item.available !== false ? "خلص" : "متوفر"}
            </button>

            <button
              onclick="editMenuItem('${item.id}')"
            >
              تعديل
            </button>

            <button
              onclick="deleteMenuItem('${item.id}')"
              style="color:#b00020"
            >
              حذف
            </button>

          </div>

        </div>

      </div>
    `;

  }).join("");

  modal(
    "إدارة المنيو",
    `
      <div>

        <div
          style="
            display:flex;
            gap:8px;
            margin-bottom:15px;
            flex-wrap:wrap;
          "
        >

          <button
            class="primary"
            onclick="openAddMenuItem()"
          >
            ➕ إضافة صنف
          </button>

          <button
            onclick="openAddOffer()"
          >
            🎁 إضافة عرض
          </button>

          <button
            onclick="exportStructuredMenu()"
          >
            📄 تصدير المنيو
          </button>

        </div>

        <div style="max-height:65vh;overflow:auto">
          ${rows}
        </div>

      </div>
    `
  );
}


// ============================================================
// MANAGER PRICE DISPLAY
// ============================================================

function getManagerPriceText(item) {

  if (item.type === "weight") {

    let text = `₪?`;

    if (item.basePrice != null) {
      text = `${money(item.basePrice)} / كغ`;
    }

    if (
      item.grillSurcharge != null ||
      item.frySurcharge != null
    ) {
      text += `
        <div style="font-size:12px;color:#666">
          مشوي +${money(item.grillSurcharge || 0)}
          |
          مقلي +${money(item.frySurcharge || 0)}
        </div>
      `;
    }

    return text;
  }

  if (item.type === "size" && item.sizes) {

    return Object.entries(item.sizes)
      .map(([size, price]) =>
        `${escapeHtml(size)}: ${money(price)}`
      )
      .join(" | ");
  }

  if (item.type === "meal") {

    return `
      وجبة: ${money(item.mealPrice || 0)}
      |
      ساندويش: ${money(item.sandwichPrice || 0)}
    `;
  }

  return money(item.price || 0);
}


// ============================================================
// ADD MENU ITEM
// ============================================================

function openAddMenuItem() {

  modal(
    "إضافة صنف",
    `
      <div>

        <label>اسم الصنف</label>
        <input id="managerName" type="text">

        <label>التصنيف</label>

        <select id="managerCategory">
          ${CATEGORIES.map(category =>
            `<option value="${escapeHtml(category)}">
              ${escapeHtml(category)}
            </option>`
          ).join("")}
        </select>

        <label>نوع الصنف</label>

        <select
          id="managerType"
          onchange="updateManagerTypeFields()"
        >

          <option value="fixed">
            سعر ثابت
          </option>

          <option value="weight">
            بالوزن
          </option>

          <option value="size">
            أحجام
          </option>

          <option value="meal">
            وجبة / ساندويش
          </option>

        </select>

        <div id="managerTypeFields"></div>

        <button
          class="primary"
          onclick="saveNewMenuItem()"
          style="width:100%;margin-top:15px"
        >
          حفظ الصنف
        </button>

      </div>
    `
  );

  setTimeout(updateManagerTypeFields, 0);
}


// ============================================================
// MANAGER TYPE FIELDS
// ============================================================

function updateManagerTypeFields(item = null) {

  const typeElement =
    document.getElementById("managerType");

  const container =
    document.getElementById("managerTypeFields");

  if (!typeElement || !container) return;

  const type = typeElement.value;

  if (type === "fixed") {

    container.innerHTML = `
      <label>السعر</label>
      <input
        id="managerPrice"
        type="number"
        step="0.01"
        value="${item?.price ?? ""}"
      >
    `;

    return;
  }

  if (type === "weight") {

    container.innerHTML = `
      <label>السعر الأساسي / كغ</label>
      <input
        id="managerBasePrice"
        type="number"
        step="0.01"
        value="${item?.basePrice ?? ""}"
      >

      <label>زيادة المشوي</label>
      <input
        id="managerGrill"
        type="number"
        step="0.01"
        value="${item?.grillSurcharge ?? 0}"
      >

      <label>زيادة المقلي</label>
      <input
        id="managerFry"
        type="number"
        step="0.01"
        value="${item?.frySurcharge ?? 0}"
      >
    `;

    return;
  }

  if (type === "size") {

    const sizes = item?.sizes || {};

    container.innerHTML = `
      <label>
        الأحجام والأسعار
      </label>

      <textarea
        id="managerSizes"
        rows="6"
        placeholder="صغير=5
وسط=8
كبير=11"
      >${
        Object.entries(sizes)
          .map(([key, value]) => `${key}=${value}`)
          .join("\n")
      }</textarea>
    `;

    return;
  }

  if (type === "meal") {

    container.innerHTML = `
      <label>سعر الوجبة</label>
      <input
        id="managerMealPrice"
        type="number"
        step="0.01"
        value="${item?.mealPrice ?? ""}"
      >

      <label>سعر الساندويش</label>
      <input
        id="managerSandwichPrice"
        type="number"
        step="0.01"
        value="${item?.sandwichPrice ?? ""}"
      >
    `;

    return;
  }
}


// ============================================================
// PARSE SIZES
// ============================================================

function parseManagerSizes(value) {

  const result = {};

  String(value || "")
    .split("\n")
    .map(line => line.trim())
    .filter(Boolean)
    .forEach(line => {

      const parts = line.split("=");

      if (parts.length < 2) return;

      const name = parts[0].trim();

      const price = Number(
        parts.slice(1).join("=").trim()
      );

      if (name && Number.isFinite(price)) {
        result[name] = price;
      }

    });

  return result;
}


// ============================================================
// SAVE NEW MENU ITEM
// ============================================================

function saveNewMenuItem() {

  const name =
    document.getElementById("managerName")?.value.trim();

  const category =
    document.getElementById("managerCategory")?.value;

  const type =
    document.getElementById("managerType")?.value;

  if (!name) {
    alert("اكتب اسم الصنف.");
    return;
  }

  const item = {
    id: generateId(),
    name,
    category,
    type,
    available: true
  };

  if (type === "fixed") {

    const price =
      Number(document.getElementById("managerPrice")?.value);

    if (!Number.isFinite(price)) {
      alert("اكتب السعر.");
      return;
    }

    item.price = price;
  }

  if (type === "weight") {

    const basePrice =
      Number(document.getElementById("managerBasePrice")?.value);

    const grill =
      Number(document.getElementById("managerGrill")?.value || 0);

    const fry =
      Number(document.getElementById("managerFry")?.value || 0);

    if (!Number.isFinite(basePrice)) {
      alert("اكتب السعر الأساسي.");
      return;
    }

    item.basePrice = basePrice;
    item.grillSurcharge = grill;
    item.frySurcharge = fry;
  }

  if (type === "size") {

    const sizes =
      parseManagerSizes(
        document.getElementById("managerSizes")?.value
      );

    if (!Object.keys(sizes).length) {
      alert("أدخل الأحجام والأسعار.");
      return;
    }

    item.sizes = sizes;
  }

  if (type === "meal") {

    const mealPrice =
      Number(document.getElementById("managerMealPrice")?.value);

    const sandwichPrice =
      Number(document.getElementById("managerSandwichPrice")?.value);

    if (
      !Number.isFinite(mealPrice) ||
      !Number.isFinite(sandwichPrice)
    ) {
      alert("أدخل سعر الوجبة وسعر الساندويش.");
      return;
    }

    item.mealPrice = mealPrice;
    item.sandwichPrice = sandwichPrice;
  }

  menu.push(item);

  saveMenu();

  showMenuManager();
}


// ============================================================
// EDIT MENU ITEM
// ============================================================

function editMenuItem(id) {

  const item = getItemById(id);

  if (!item) {
    alert("الصنف غير موجود.");
    return;
  }

  modal(
    "تعديل الصنف",
    `
      <div>

        <label>اسم الصنف</label>

        <input
          id="managerName"
          type="text"
          value="${escapeHtml(item.name)}"
        >

        <label>التصنيف</label>

        <select id="managerCategory">
          ${CATEGORIES.map(category =>
            `<option
              value="${escapeHtml(category)}"
              ${category === item.category ? "selected" : ""}
            >
              ${escapeHtml(category)}
            </option>`
          ).join("")}
        </select>

        <label>نوع الصنف</label>

        <select
          id="managerType"
          onchange="updateManagerTypeFields()"
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
            value="size"
            ${item.type === "size" ? "selected" : ""}
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

        <div id="managerTypeFields"></div>

        <button
          class="primary"
          onclick="saveEditedMenuItem('${item.id}')"
          style="width:100%;margin-top:15px"
        >
          حفظ التعديل
        </button>

      </div>
    `
  );

  setTimeout(
    () => updateManagerTypeFields(item),
    0
  );
}


// ============================================================
// SAVE EDITED ITEM
// ============================================================

function saveEditedMenuItem(id) {

  const item = getItemById(id);

  if (!item) return;

  const name =
    document.getElementById("managerName")?.value.trim();

  const category =
    document.getElementById("managerCategory")?.value;

  const type =
    document.getElementById("managerType")?.value;

  if (!name) {
    alert("اكتب اسم الصنف.");
    return;
  }

  item.name = name;
  item.category = category;
  item.type = type;

  delete item.price;
  delete item.basePrice;
  delete item.grillSurcharge;
  delete item.frySurcharge;
  delete item.sizes;
  delete item.mealPrice;
  delete item.sandwichPrice;

  if (type === "fixed") {

    const price =
      Number(document.getElementById("managerPrice")?.value);

    if (!Number.isFinite(price)) {
      alert("اكتب السعر.");
      return;
    }

    item.price = price;
  }

  if (type === "weight") {

    const basePrice =
      Number(document.getElementById("managerBasePrice")?.value);

    const grill =
      Number(document.getElementById("managerGrill")?.value || 0);

    const fry =
      Number(document.getElementById("managerFry")?.value || 0);

    if (!Number.isFinite(basePrice)) {
      alert("اكتب السعر الأساسي.");
      return;
    }

    item.basePrice = basePrice;
    item.grillSurcharge = grill;
    item.frySurcharge = fry;
  }

  if (type === "size") {

    const sizes =
      parseManagerSizes(
        document.getElementById("managerSizes")?.value
      );

    if (!Object.keys(sizes).length) {
      alert("أدخل الأحجام والأسعار.");
      return;
    }

    item.sizes = sizes;
  }

  if (type === "meal") {

    const mealPrice =
      Number(document.getElementById("managerMealPrice")?.value);

    const sandwichPrice =
      Number(document.getElementById("managerSandwichPrice")?.value);

    if (
      !Number.isFinite(mealPrice) ||
      !Number.isFinite(sandwichPrice)
    ) {
      alert("أدخل سعر الوجبة وسعر الساندويش.");
      return;
    }

    item.mealPrice = mealPrice;
    item.sandwichPrice = sandwichPrice;
  }

  saveMenu();

  showMenuManager();
}


// ============================================================
// TOGGLE AVAILABILITY
// ============================================================

function toggleAvailability(id) {

  const item = getItemById(id);

  if (!item) return;

  item.available = item.available === false;

  saveMenu();

  showMenuManager();
}


// ============================================================
// DELETE MENU ITEM
// ============================================================

function deleteMenuItem(id) {

  const item = getItemById(id);

  if (!item) return;

  const confirmed =
    confirm(`حذف "${item.name}" من المنيو؟`);

  if (!confirmed) return;

  menu = menu.filter(
    menuItem => menuItem.id !== id
  );

  saveMenu();

  showMenuManager();
}


// ============================================================
// OFFERS
// ============================================================

function openAddOffer() {

  const availableItems =
    menu.filter(item => item.available !== false);

  modal(
    "إضافة عرض",
    `
      <div>

        <label>اسم العرض</label>

        <input
          id="offerName"
          type="text"
          placeholder="مثلاً عرض العيلة"
        >

        <label>
          سعر العرض النهائي
        </label>

        <input
          id="offerPrice"
          type="number"
          step="0.01"
        >

        <label>الأصناف داخل العرض</label>

        <div
          style="
            max-height:45vh;
            overflow:auto;
            border:1px solid #ddd;
            padding:8px;
            border-radius:10px;
          "
        >

          ${
            availableItems.map(item => `
              <label
                style="
                  display:flex;
                  gap:8px;
                  align-items:center;
                  padding:7px;
                "
              >

                <input
                  type="checkbox"
                  class="offerItemCheck"
                  value="${item.id}"
                >

                <span>
                  ${escapeHtml(item.name)}
                </span>

              </label>
            `).join("")
          }

        </div>

        <button
          class="primary"
          onclick="saveOffer()"
          style="width:100%;margin-top:15px"
        >
          حفظ العرض
        </button>

      </div>
    `
  );
}


// ============================================================
// SAVE OFFER
// ============================================================

function saveOffer() {

  const name =
    document.getElementById("offerName")?.value.trim();

  const price =
    Number(document.getElementById("offerPrice")?.value);

  const checks =
    [...document.querySelectorAll(".offerItemCheck:checked")];

  if (!name) {
    alert("اكتب اسم العرض.");
    return;
  }

  if (!Number.isFinite(price)) {
    alert("اكتب سعر العرض.");
    return;
  }

  if (!checks.length) {
    alert("اختار أصناف العرض.");
    return;
  }

  const includedItems =
    checks.map(check => ({
      menuItemId: check.value,
      quantity: 1
    }));

  menu.push({
    id: generateId(),
    name,
    category: "🎁 العروض",
    type: "offer",
    price,
    includedItems,
    available: true
  });

  saveMenu();

  showMenuManager();
}


// ============================================================
// STRUCTURED MENU
// ============================================================

function getStructuredMenu() {

  return menu.map(item => {

    const result = {
      id: item.id,
      name: item.name,
      category: item.category,
      type: item.type,
      available: item.available !== false
    };

    if (item.type === "fixed") {
      result.price = Number(item.price || 0);
    }

    if (item.type === "weight") {

      result.basePrice =
        Number(item.basePrice || 0);

      result.grillSurcharge =
        Number(item.grillSurcharge || 0);

      result.frySurcharge =
        Number(item.frySurcharge || 0);

      result.unit = "kg";
    }

    if (item.type === "size") {

      result.sizes = {
        ...(item.sizes || {})
      };
    }

    if (item.type === "meal") {

      result.mealPrice =
        Number(item.mealPrice || 0);

      result.sandwichPrice =
        Number(item.sandwichPrice || 0);
    }

    if (item.type === "offer") {

      result.price =
        Number(item.price || 0);

      result.includedItems =
        (item.includedItems || []).map(entry => {

          const included =
            getItemById(entry.menuItemId);

          return {
            id: entry.menuItemId,
            name: included?.name || "",
            quantity: entry.quantity || 1
          };

        });
    }

    return result;

  });
}


// ============================================================
// EXPORT STRUCTURED MENU
// ============================================================

function exportStructuredMenu() {

  const data = getStructuredMenu();

  const blob = new Blob(
    [
      JSON.stringify(data, null, 2)
    ],
    {
      type: "application/json"
    }
  );

  const url =
    URL.createObjectURL(blob);

  const a =
    document.createElement("a");

  a.href = url;
  a.download = "tabbara-seafood-menu.json";

  document.body.appendChild(a);

  a.click();

  a.remove();

  URL.revokeObjectURL(url);
}


// ============================================================
// PRINT INVOICE
// ============================================================

function printInvoice(order) {

  if (!order) {
    alert("لا يوجد طلب للطباعة.");
    return;
  }

  const itemsHtml =
    (order.items || []).map(item => {

      const description = [
        item.name,
        item.weight
          ? `${item.weight} كغ`
          : "",
        item.preparation
          ? item.preparation
          : "",
        item.size
          ? item.size
          : "",
        item.mealType
          ? item.mealType
          : ""
      ]
        .filter(Boolean)
        .join(" - ");

      return `
        <tr>

          <td>
            ${escapeHtml(description)}
          </td>

          <td style="text-align:center">
            ${item.quantity}
          </td>

          <td style="text-align:right">
            ${money(item.total)}
          </td>

        </tr>
      `;

    }).join("");

  const popup =
    window.open(
      "",
      "_blank",
      "width=400,height=700"
    );

  if (!popup) {
    alert("المتصفح منع نافذة الطباعة.");
    return;
  }

  popup.document.write(`
    <!DOCTYPE html>

    <html dir="rtl">

    <head>

      <meta charset="UTF-8">

      <title>Tabbara Seafood</title>

      <style>

        body {
          font-family: Arial, sans-serif;
          width: 80mm;
          margin: 0 auto;
          padding: 10px;
          box-sizing: border-box;
        }

        h2 {
          text-align:center;
          margin:0 0 5px;
        }

        .center {
          text-align:center;
        }

        table {
          width:100%;
          border-collapse:collapse;
          margin-top:12px;
        }

        th,
        td {
          border-bottom:1px dashed #999;
          padding:5px 2px;
          font-size:12px;
        }

        .total {
          font-size:18px;
          font-weight:bold;
          margin-top:15px;
          text-align:center;
        }

      </style>

    </head>

    <body>

      <h2>Tabbara Seafood</h2>

      <div class="center">
        ${escapeHtml(order.order_type || "")}
      </div>

      ${
        order.customer_name
          ? `
            <div>
              الزبون:
              ${escapeHtml(order.customer_name)}
            </div>
          `
          : ""
      }

      ${
        order.customer_phone
          ? `
            <div>
              الهاتف:
              ${escapeHtml(order.customer_phone)}
            </div>
          `
          : ""
      }

      ${
        order.customer_address
          ? `
            <div>
              العنوان:
              ${escapeHtml(order.customer_address)}
            </div>
          `
          : ""
      }

      <table>

        <thead>

          <tr>
            <th>الصنف</th>
            <th>العدد</th>
            <th>السعر</th>
          </tr>

        </thead>

        <tbody>
          ${itemsHtml}
        </tbody>

      </table>

      <div class="total">
        المجموع: ${money(order.total)}
      </div>

      ${
        order.notes
          ? `
            <div style="margin-top:15px">
              ملاحظات:
              ${escapeHtml(order.notes)}
            </div>
          `
          : ""
      }

      <div
        class="center"
        style="margin-top:20px"
      >
        شكراً لزيارتكم ❤️
      </div>

      <script>
        window.onload = function() {
          window.print();
        };
      <\/script>

    </body>

    </html>
  `);

  popup.document.close();
}


// ============================================================
// END OF PART 5
// ============================================================
// ============================================================
// TABBARA SEAFOOD POS
// CLEAN SCRIPT - PART 6 / 6
// ============================================================

// ============================================================
// LOGIN ENTER KEY
// ============================================================

document.addEventListener("keydown", function(event) {

  if (event.key !== "Enter") return;

  const loginScreen =
    document.getElementById("loginScreen");

  if (!loginScreen) return;

  const style =
    window.getComputedStyle(loginScreen);

  if (style.display === "none") return;

  login();
});


// ============================================================
// PHONE ENTER / CHANGE
// ============================================================

document.addEventListener("DOMContentLoaded", function() {

  const phoneInput =
    document.getElementById("phone");

  if (phoneInput) {

    phoneInput.addEventListener(
      "change",
      handlePhoneChange
    );

    phoneInput.addEventListener(
      "blur",
      handlePhoneChange
    );
  }

});


// ============================================================
// INITIALIZE POS
// ============================================================

async function initPOS() {

  try {

    loadMenu();

    loadCustomers();

    loadPendingOrders();

    getDeviceId();

    updateConnectionStatus();

    renderCategories();

    renderCart();

    // Check login state
    const loggedIn =
      localStorage.getItem("tabbaraLoggedIn") === "true";

    if (loggedIn) {
      showApp();
    } else {
      const loginScreen =
        document.getElementById("loginScreen");

      if (loginScreen) {
        loginScreen.style.display = "flex";
      }
    }

    // Sync pending orders
    if (navigator.onLine) {
      setTimeout(
        syncPendingOrders,
        1000
      );
    }

  } catch (error) {

    console.error(
      "POS initialization error:",
      error
    );
  }
}


// ============================================================
// DOM READY
// ============================================================

if (
  document.readyState === "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    initPOS
  );

} else {

  initPOS();

}


// ============================================================
// GLOBAL API
// ============================================================

window.TABBARA_POS = {

  // Menu
  getMenu: function() {
    return menu;
  },

  getStructuredMenu: function() {
    return getStructuredMenu();
  },

  saveMenu: function() {
    saveMenu();
  },

  // Customer
  findCustomer: function(phone) {
    return findCustomer(phone);
  },

  saveCustomer: function(customer) {
    return saveCustomer(customer);
  },

  // Orders
  confirmOrder: function() {
    return confirmOrder();
  },

  syncPendingOrders: function() {
    return syncPendingOrders();
  },

  getPendingOrders: function() {
    return loadPendingOrders();
  },

  // Device
  getDeviceId: function() {
    return getDeviceId();
  }

};


// ============================================================
// DEBUG HELPERS
// ============================================================

window.getTabbaraMenu = function() {
  return getStructuredMenu();
};

window.getTabbaraDeviceId = function() {
  return getDeviceId();
};

window.syncTabbaraOrders = function() {
  return syncPendingOrders();
};


// ============================================================
// FINAL SAFETY CHECK
// ============================================================

console.log(
  "Tabbara Seafood POS loaded successfully."
);

console.log(
  "Menu items:",
  menu.length
);

console.log(
  "Device ID:",
  getDeviceId()
);


// ============================================================
// END OF PART 6
// ============================================================
