// ============================================================
// TABBARA SEAFOOD POS
// CLEAN SCRIPT - PART 1 / 6
// Compatible with current index.html
// ============================================================

const SUPABASE_URL =
  "https://tpvhxauivmjgfcugpldp.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_0n__ZztsS8BQtdVn5lhmmA_WWuHjVg7";

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

  localStorage.setItem(
    DEVICE_ID_KEY,
    deviceId
  );
}


// ============================================================
// DEFAULT MENU
// ============================================================

const DEFAULT_MENU = [

  // ==========================================================
  // FISH
  // ==========================================================

  {
    id: "fish_ajaj",
    name: "أجاج",
    category: "🐟 الأسماك",
    type: "weight",
    pricing: {
      base: 12,
      grill: 3,
      fry: 4
    },
    available: true
  },

  {
    id: "fish_boraq",
    name: "براق",
    category: "🐟 الأسماك",
    type: "weight",
    pricing: {
      base: 14,
      grill: 3,
      fry: 4
    },
    available: true
  },

  {
    id: "fish_sardine",
    name: "سردين",
    category: "🐟 الأسماك",
    type: "weight",
    pricing: {
      base: 8,
      grill: 2,
      fry: 3
    },
    available: true
  },

  {
    id: "fish_laqz_sandy",
    name: "لقز رملي",
    category: "🐟 الأسماك",
    type: "weight",
    pricing: {
      base: 16,
      grill: 3,
      fry: 4
    },
    available: true
  },

  {
    id: "fish_laqz_rocky",
    name: "لقز صخري",
    category: "🐟 الأسماك",
    type: "weight",
    pricing: {
      base: 18,
      grill: 3,
      fry: 4
    },
    available: true
  },

  {
    id: "fish_sultan",
    name: "سلطان",
    category: "🐟 الأسماك",
    type: "weight",
    pricing: {
      base: 15,
      grill: 3,
      fry: 4
    },
    available: true
  },

  {
    id: "fish_masqar",
    name: "مسقار",
    category: "🐟 الأسماك",
    type: "weight",
    pricing: {
      base: 13,
      grill: 3,
      fry: 4
    },
    available: true
  },

  {
    id: "fish_malifa",
    name: "مليفة",
    category: "🐟 الأسماك",
    type: "weight",
    pricing: {
      base: 12,
      grill: 3,
      fry: 4
    },
    available: true
  },

  {
    id: "fish_jarbidi",
    name: "جربيدي",
    category: "🐟 الأسماك",
    type: "weight",
    pricing: {
      base: 14,
      grill: 3,
      fry: 4
    },
    available: true
  },

  {
    id: "fish_armout_blond",
    name: "عرموط أشقر",
    category: "🐟 الأسماك",
    type: "weight",
    pricing: {
      base: 11,
      grill: 3,
      fry: 4
    },
    available: true
  },

  {
    id: "fish_armout_cut",
    name: "عرموط مقطع",
    category: "🐟 الأسماك",
    type: "weight",
    pricing: {
      base: 12,
      grill: 3,
      fry: 4
    },
    available: true
  },


  // ==========================================================
  // SEAFOOD
  // ==========================================================

  {
    id: "seafood_shrimp_medium",
    name: "قريدس وسط",
    category: "🦐 ثمار البحر",
    type: "weight",
    pricing: {
      base: 16,
      grill: 2,
      fry: 3
    },
    available: true
  },

  {
    id: "seafood_shrimp_large",
    name: "قريدس كبير",
    category: "🦐 ثمار البحر",
    type: "weight",
    pricing: {
      base: 20,
      grill: 2,
      fry: 3
    },
    available: true
  },

  {
    id: "seafood_calamari",
    name: "كالامار",
    category: "🦐 ثمار البحر",
    type: "weight",
    pricing: {
      base: 14,
      grill: 2,
      fry: 3
    },
    available: true
  },

  {
    id: "seafood_fillet_fresh",
    name: "فيليه طازج",
    category: "🦐 ثمار البحر",
    type: "weight",
    pricing: {
      base: 17,
      grill: 3,
      fry: 4
    },
    available: true
  },

  {
    id: "seafood_fillet_crispy",
    name: "فيليه مقرمش",
    category: "🦐 ثمار البحر",
    type: "weight",
    pricing: {
      base: 18,
      grill: 2,
      fry: 3
    },
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


  // ==========================================================
  // MEALS / SANDWICHES
  // ==========================================================

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


  // ==========================================================
  // APPETIZERS
  // ==========================================================

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


  // ==========================================================
  // SALADS
  // ==========================================================

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


  // ==========================================================
  // DRINKS
  // ==========================================================

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
// MENU LOAD
// ============================================================

function loadMenu() {
  try {
    const saved =
      localStorage.getItem(
        MENU_STORAGE_KEY
      );

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
}


// ============================================================
// MENU SAVE
// ============================================================

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


function generateId(prefix) {
  return (
    (prefix || "id") +
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
    function (item) {
      return item.id === id;
    }
  );
}


function getTotal() {
  return cart.reduce(
    function (sum, item) {
      return (
        sum +
        Number(item.total || 0)
      );
    },
    0
  );
}


// ============================================================
// PHONE NORMALIZATION
// ============================================================

function normalizePhone(phone) {
  if (
    phone === null ||
    phone === undefined
  ) {
    return "";
  }

  let value = String(phone);

  value = value
    .replace(
      /[٠-٩]/g,
      function (digit) {
        return String(
          "٠١٢٣٤٥٦٧٨٩".indexOf(
            digit
          )
        );
      }
    )
    .replace(
      /[۰-۹]/g,
      function (digit) {
        return String(
          "۰۱۲۳۴۵۶۷۸۹".indexOf(
            digit
          )
        );
      }
    );

  value =
    value.replace(
      /[^\d+]/g,
      ""
    );

  if (
    value.startsWith("00961")
  ) {
    value =
      "+" +
      value.substring(2);
  }

  if (
    value.startsWith("961")
  ) {
    value =
      "+" + value;
  }

  if (
    value.startsWith("0") &&
    value.length >= 8 &&
    value.length <= 9
  ) {
    value =
      "+961" +
      value.substring(1);
  }

  return value;
}


// ============================================================
// INITIAL LOAD
// ============================================================

loadMenu();
saveMenu();
// ============================================================
// LOGIN
// ============================================================

function checkLogin() {
  const loggedIn =
    localStorage.getItem(
      "tabbaraLoggedIn"
    );

  if (loggedIn === "true") {
    showPOS();
  } else {
    showLogin();
  }
}


function showLogin() {
  const loginScreen =
    document.getElementById(
      "loginScreen"
    );

  const app =
    document.querySelector(
      ".app"
    );

  if (loginScreen) {
    loginScreen.style.display =
      "flex";
  }

  if (app) {
    app.style.display =
      "none";
  }
}


function login() {
  const input =
    document.getElementById(
      "loginPassword"
    );

  const error =
    document.getElementById(
      "loginError"
    );

  const password =
    input
      ? input.value
      : "";

  if (
    password ===
    LOGIN_PASSWORD
  ) {
    localStorage.setItem(
      "tabbaraLoggedIn",
      "true"
    );

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
    error.textContent =
      "كلمة السر غير صحيحة";
  }
}


function showPOS() {
  const loginScreen =
    document.getElementById(
      "loginScreen"
    );

  const app =
    document.querySelector(
      ".app"
    );

  if (loginScreen) {
    loginScreen.style.display =
      "none";
  }

  if (app) {
    app.style.display =
      "flex";
  }

  renderCategories();

  updateCart();

  updateConnectionStatus();

  if (
    selectedOrderType
  ) {
    showCategory(
      currentCategory ||
      CATEGORIES[0]
    );
  } else {
    const items =
      document.getElementById(
        "items"
      );

    if (items) {
      items.innerHTML =
        '<div class="empty-state">اختار نوع الطلب أولاً</div>';
    }
  }
}


function logout() {
  localStorage.removeItem(
    "tabbaraLoggedIn"
  );

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

  const deliveryBtn =
    document.getElementById(
      "deliveryBtn"
    );

  const pickupBtn =
    document.getElementById(
      "pickupBtn"
    );

  if (deliveryBtn) {
    deliveryBtn.classList.remove(
      "active"
    );
  }

  if (pickupBtn) {
    pickupBtn.classList.remove(
      "active"
    );
  }

  /*
    IMPORTANT:
    index.html uses:

    setOrderType('Delevery')
    setOrderType('استلام من المحل')

    لذلك منستخدم نفس القيم حرفياً.
  */

  if (
    type === "Delevery" &&
    deliveryBtn
  ) {
    deliveryBtn.classList.add(
      "active"
    );
  }

  if (
    type ===
      "استلام من المحل" &&
    pickupBtn
  ) {
    pickupBtn.classList.add(
      "active"
    );
  }

  const address =
    document.getElementById(
      "address"
    );

  if (address) {
    if (
      type === "Delevery"
    ) {
      address.disabled = false;

      address.placeholder =
        "عنوان الزبون";
    } else {
      address.disabled = true;

      address.value = "";

      address.placeholder =
        "غير مطلوب للاستلام من المحل";
    }
  }

  renderCategories();

  showCategory(
    currentCategory ||
      CATEGORIES[0]
  );
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

  container.innerHTML = "";

  CATEGORIES.forEach(
    function (category) {

      const button =
        document.createElement(
          "button"
        );

      button.type =
        "button";

      button.className =
        "category-btn";

      if (
        category ===
        currentCategory
      ) {
        button.classList.add(
          "active"
        );
      }

      button.textContent =
        category;

      button.addEventListener(
        "click",
        function () {
          showCategory(
            category
          );
        }
      );

      container.appendChild(
        button
      );
    }
  );
}


// ============================================================
// SHOW CATEGORY
// ============================================================

function showCategory(
  category
) {
  if (
    !selectedOrderType
  ) {
    const items =
      document.getElementById(
        "items"
      );

    if (items) {
      items.innerHTML =
        '<div class="empty-state">اختار نوع الطلب أولاً</div>';
    }

    return;
  }

  currentCategory =
    category;

  renderCategories();

  const container =
    document.getElementById(
      "items"
    );

  if (!container) {
    return;
  }

  const categoryItems =
    menu.filter(
      function (item) {
        return (
          item.category ===
          category
        );
      }
    );

  if (
    categoryItems.length ===
    0
  ) {
    container.innerHTML =
      '<div class="empty-state">ما في أصناف بهالقسم</div>';

    return;
  }

  container.innerHTML = "";

  categoryItems.forEach(
    function (item) {

      const button =
        document.createElement(
          "button"
        );

      button.type =
        "button";

      button.className =
        "menu-item";

      if (
        item.available ===
        false
      ) {
        button.classList.add(
          "finished"
        );

        button.disabled =
          true;
      }

      let priceText = "";

      if (
        item.type ===
        "weight"
      ) {
        const base =
          Number(
            item.pricing?.base ||
            0
          );

        priceText =
          `${money(base)} / كغ`;
      }

      else if (
        item.type ===
        "fixed"
      ) {
        priceText =
          money(
            item.price
          );
      }

      else if (
        item.type ===
        "sizes"
      ) {
        const sizes =
          item.sizes ||
          {};

        priceText =
          Object.entries(
            sizes
          )
            .map(
              function (
                entry
              ) {
                return (
                  entry[0] +
                  ": " +
                  money(
                    entry[1]
                  )
                );
              }
            )
            .join(
              " • "
            );
      }

      else if (
        item.type ===
        "meal"
      ) {
        const prices =
          item.prices ||
          {};

        priceText =
          "وجبة: " +
          money(
            prices["وجبة"]
          ) +
          " • ساندويش: " +
          money(
            prices["ساندويش"]
          );
      }

      else if (
        item.type ===
        "offer"
      ) {
        priceText =
          money(
            item.price
          );
      }

      button.innerHTML = `
        <span class="item-name">
          ${escapeHtml(item.name)}
        </span>

        <span class="item-price">
          ${escapeHtml(priceText)}
        </span>

        ${
          item.available ===
          false
            ? '<span class="sold-out">خلص</span>'
            : ""
        }
      `;

      button.addEventListener(
        "click",
        function () {
          chooseItem(
            item.id
          );
        }
      );

      container.appendChild(
        button
      );
    }
  );
}


// ============================================================
// CHOOSE ITEM
// ============================================================

function chooseItem(
  itemId
) {
  const item =
    getItemById(
      itemId
    );

  if (!item) {
    return;
  }

  if (
    item.available ===
    false
  ) {
    return;
  }

  currentModalItem =
    item;

  if (
    item.type ===
    "weight"
  ) {
    openWeightModal(
      item
    );

    return;
  }

  if (
    item.type ===
    "sizes"
  ) {
    openSizeModal(
      item
    );

    return;
  }

  if (
    item.type ===
    "meal"
  ) {
    openMealModal(
      item
    );

    return;
  }

  if (
    item.type ===
    "offer"
  ) {
    const price =
      Number(
        item.price || 0
      );

    addCart({
      id: generateId(
        "cart"
      ),

      menuItemId:
        item.id,

      name:
        item.name,

      description:
        "عرض",

      quantity: 1,

      unitPrice:
        price,

      total:
        price
    });

    return;
  }

  if (
    item.type ===
    "fixed"
  ) {
    const price =
      Number(
        item.price || 0
      );

    addCart({
      id: generateId(
        "cart"
      ),

      menuItemId:
        item.id,

      name:
        item.name,

      description:
        "",

      quantity: 1,

      unitPrice:
        price,

      total:
        price
    });
  }
}


// ============================================================
// MODAL
// ============================================================

function modal(
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
      class="modal-overlay"
      onclick="closeModal(event)"
    >
      <div
        class="modal"
        onclick="event.stopPropagation()"
      >
        ${content}
      </div>
    </div>
  `;

  root.style.display =
    "block";
}


function closeModal(
  event
) {
  if (
    event &&
    event.target
  ) {
    const overlay =
      event.target.closest(
        ".modal-overlay"
      );

    if (
      overlay &&
      event.target !==
        overlay
    ) {
      return;
    }
  }

  const root =
    document.getElementById(
      "modalRoot"
    );

  if (root) {
    root.innerHTML = "";

    root.style.display =
      "none";
  }

  currentModalItem =
    null;
}


// ============================================================
// END OF PART 2
// ============================================================
// ============================================================
// WEIGHT ITEMS
// ============================================================

function openWeightModal(item) {
  currentModalItem = item;

  const pricing = item.pricing || {};

  const base = Number(pricing.base || 0);
  const grill = Number(pricing.grill || 0);
  const fry = Number(pricing.fry || 0);

  modal(`
    <div class="modal-title">
      ${escapeHtml(item.name)}
    </div>

    <div class="modal-subtitle">
      اختار طريقة التحضير
    </div>

    <div class="choice-grid">

      <button
        type="button"
        class="choice-btn"
        onclick="selectWeightMethod('ني')"
      >
        <strong>ني</strong>
        <span>${money(base)} / كغ</span>
      </button>

      <button
        type="button"
        class="choice-btn"
        onclick="selectWeightMethod('مشوي')"
      >
        <strong>مشوي</strong>
        <span>${money(base + grill)} / كغ</span>
      </button>

      <button
        type="button"
        class="choice-btn"
        onclick="selectWeightMethod('مقلي')"
      >
        <strong>مقلي</strong>
        <span>${money(base + fry)} / كغ</span>
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
  const item =
    getCurrentModalItem();

  if (!item) {
    return;
  }

  const pricing =
    item.pricing || {};

  const base =
    Number(
      pricing.base || 0
    );

  const grill =
    Number(
      pricing.grill || 0
    );

  const fry =
    Number(
      pricing.fry || 0
    );

  let unitPrice = base;

  if (
    method === "مشوي"
  ) {
    unitPrice =
      base + grill;
  }

  if (
    method === "مقلي"
  ) {
    unitPrice =
      base + fry;
  }

  modal(`
    <div class="modal-title">
      ${escapeHtml(item.name)}
    </div>

    <div class="modal-subtitle">
      ${escapeHtml(method)}
      <br>
      ${money(unitPrice)} / كغ
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
      onclick="addWeightedItem()"
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

  setTimeout(
    function () {
      const input =
        document.getElementById(
          "weightInput"
        );

      if (input) {
        input.focus();
      }
    },
    50
  );

  currentModalItem = {
    ...item,
    selectedPreparation:
      method
  };
}


function getCurrentModalItem() {
  return currentModalItem;
}


function addWeightedItem() {
  const item =
    getCurrentModalItem();

  const input =
    document.getElementById(
      "weightInput"
    );

  if (!item || !input) {
    return;
  }

  const weight =
    Number(input.value);

  if (
    !weight ||
    weight <= 0
  ) {
    alert(
      "دخل الوزن بشكل صحيح"
    );

    return;
  }

  const method =
    item.selectedPreparation ||
    "ني";

  const pricing =
    item.pricing || {};

  const base =
    Number(
      pricing.base || 0
    );

  const grill =
    Number(
      pricing.grill || 0
    );

  const fry =
    Number(
      pricing.fry || 0
    );

  let unitPrice =
    base;

  if (
    method === "مشوي"
  ) {
    unitPrice =
      base + grill;
  }

  if (
    method === "مقلي"
  ) {
    unitPrice =
      base + fry;
  }

  const total =
    unitPrice * weight;

  addCart({
    id: generateId(
      "cart"
    ),

    menuItemId:
      item.id,

    name:
      item.name,

    description:
      `${method} • ${weight} كغ`,

    quantity:
      weight,

    weight:
      weight,

    preparation:
      method,

    unitPrice:
      unitPrice,

    total:
      total
  });

  closeModal();
}


// ============================================================
// SIZE ITEMS
// ============================================================

function openSizeModal(item) {
  currentModalItem = item;

  const sizes =
    item.sizes || {};

  const sizeEntries =
    Object.entries(
      sizes
    );

  if (
    sizeEntries.length ===
    0
  ) {
    alert(
      "ما في أحجام لهذا الصنف"
    );

    return;
  }

  modal(`
    <div class="modal-title">
      ${escapeHtml(item.name)}
    </div>

    <div class="choice-grid">

      ${sizeEntries
        .map(
          function (
            entry
          ) {
            const sizeName =
              entry[0];

            const price =
              Number(
                entry[1] || 0
              );

            return `
              <button
                type="button"
                class="choice-btn"
                onclick="addSizedItem(${JSON.stringify(
                  sizeName
                )})"
              >
                <strong>
                  ${escapeHtml(
                    sizeName
                  )}
                </strong>

                <span>
                  ${money(price)}
                </span>
              </button>
            `;
          }
        )
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


function addSizedItem(
  sizeName
) {
  const item =
    getCurrentModalItem();

  if (!item) {
    return;
  }

  const sizes =
    item.sizes || {};

  if (
    !Object.prototype.hasOwnProperty.call(
      sizes,
      sizeName
    )
  ) {
    return;
  }

  const price =
    Number(
      sizes[sizeName] || 0
    );

  addCart({
    id: generateId(
      "cart"
    ),

    menuItemId:
      item.id,

    name:
      item.name,

    description:
      sizeName,

    quantity:
      1,

    size:
      sizeName,

    unitPrice:
      price,

    total:
      price
  });

  closeModal();
}


// ============================================================
// MEAL / SANDWICH
// ============================================================

function openMealModal(item) {
  currentModalItem = item;

  const prices =
    item.prices || {};

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
        <strong>
          وجبة
        </strong>

        <span>
          ${money(
            prices["وجبة"]
          )}
        </span>
      </button>

      <button
        type="button"
        class="choice-btn"
        onclick="addMealItem('ساندويش')"
      >
        <strong>
          ساندويش
        </strong>

        <span>
          ${money(
            prices["ساندويش"]
          )}
        </span>
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


function addMealItem(
  mealType
) {
  const item =
    getCurrentModalItem();

  if (!item) {
    return;
  }

  const prices =
    item.prices || {};

  const price =
    Number(
      prices[mealType] || 0
    );

  if (
    price <= 0
  ) {
    return;
  }

  addCart({
    id: generateId(
      "cart"
    ),

    menuItemId:
      item.id,

    name:
      item.name,

    description:
      mealType,

    quantity:
      1,

    mealType:
      mealType,

    unitPrice:
      price,

    total:
      price
  });

  closeModal();
}


// ============================================================
// CART
// ============================================================

function addCart(item) {
  if (!item) {
    return;
  }

  cart.push(item);

  updateCart();
}


function updateCart() {
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

  if (
    cart.length ===
    0
  ) {
    container.innerHTML = `
      <div class="empty-cart">
        ما في أصناف بالطلب
      </div>
    `;

    if (totalElement) {
      totalElement.textContent =
        money(0);
    }

    return;
  }

  container.innerHTML = "";

  cart.forEach(
    function (
      item,
      index
    ) {
      const row =
        document.createElement(
          "div"
        );

      row.className =
        "cart-item";

      const description =
        item.description
          ? `
            <small>
              ${escapeHtml(
                item.description
              )}
            </small>
          `
          : "";

      row.innerHTML = `
        <div class="cart-item-info">

          <strong>
            ${escapeHtml(
              item.name
            )}
          </strong>

          ${description}

        </div>

        <div class="cart-item-price">
          ${money(
            item.total
          )}
        </div>

        <div class="cart-item-actions">

          <button
            type="button"
            onclick="duplicateCart(${index})"
          >
            +
          </button>

          <button
            type="button"
            onclick="removeCart(${index})"
          >
            ×
          </button>

        </div>
      `;

      container.appendChild(
        row
      );
    }
  );

  if (totalElement) {
    totalElement.textContent =
      money(
        getTotal()
      );
  }
}


function duplicateCart(
  index
) {
  const item =
    cart[index];

  if (!item) {
    return;
  }

  const copy =
    JSON.parse(
      JSON.stringify(
        item
      )
    );

  copy.id =
    generateId(
      "cart"
    );

  cart.push(copy);

  updateCart();
}


function removeCart(
  index
) {
  if (
    index < 0 ||
    index >= cart.length
  ) {
    return;
  }

  cart.splice(
    index,
    1
  );

  updateCart();
}


// ============================================================
// CLEAR ORDER
// ============================================================

function clearOrder() {
  cart = [];

  selectedOrderType =
    "";

  currentCategory =
    "";

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

  const message =
    document.getElementById(
      "customerMessage"
    );

  if (name) {
    name.value = "";
  }

  if (phone) {
    phone.value = "";
  }

  if (address) {
    address.value = "";
    address.disabled = false;
    address.placeholder =
      "عنوان الزبون";
  }

  if (notes) {
    notes.value = "";
  }

  if (message) {
    message.textContent =
      "";
    message.className =
      "customer-message";
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
    deliveryBtn.classList.remove(
      "active"
    );
  }

  if (pickupBtn) {
    pickupBtn.classList.remove(
      "active"
    );
  }

  const items =
    document.getElementById(
      "items"
    );

  if (items) {
    items.innerHTML =
      '<div class="empty-state">اختار نوع الطلب أولاً</div>';
  }

  renderCategories();

  updateCart();
}


// ============================================================
// END OF PART 3
// ============================================================
// ============================================================
// PART 4 / 6
// Customer System + Orders + Menu Manager
// ============================================================

/* ============================================================
   CUSTOMER HELPERS
   ============================================================ */

function getCustomerData() {
    return {
        name: (document.getElementById("name")?.value || "").trim(),
        phone: normalizePhone(document.getElementById("phone")?.value || ""),
        address: (document.getElementById("address")?.value || "").trim(),
        notes: (document.getElementById("notes")?.value || "").trim()
    };
}


function fillCustomerData(customer) {
    if (!customer) return;

    const name = document.getElementById("name");
    const phone = document.getElementById("phone");
    const address = document.getElementById("address");
    const notes = document.getElementById("notes");

    if (name) name.value = customer.name || "";
    if (phone) phone.value = customer.phone || "";
    if (address) address.value = customer.address || "";
    if (notes) notes.value = customer.notes || "";
}


function clearCustomerMessage() {
    const el = document.getElementById("customerMessage");

    if (el) {
        el.textContent = "";
        el.style.display = "none";
    }
}


function showCustomerMessage(message, type = "info") {
    const el = document.getElementById("customerMessage");

    if (!el) return;

    el.textContent = message;
    el.style.display = "block";

    el.className = "customer-message " + type;
}


function getCustomerCache() {
    try {
        return JSON.parse(
            localStorage.getItem("tabbara_customers") || "{}"
        );
    } catch (error) {
        console.error("Customer cache error:", error);
        return {};
    }
}


function saveCustomerCache(customers) {
    try {
        localStorage.setItem(
            "tabbara_customers",
            JSON.stringify(customers)
        );
    } catch (error) {
        console.error("Unable to save customer cache:", error);
    }
}


function cacheCustomer(customer) {
    if (!customer?.phone) return;

    const customers = getCustomerCache();

    customers[customer.phone] = {
        phone: customer.phone,
        name: customer.name || "",
        address: customer.address || "",
        notes: customer.notes || "",
        updated_at: new Date().toISOString()
    };

    saveCustomerCache(customers);
}


function findCachedCustomer(phone) {
    const normalized = normalizePhone(phone);

    if (!normalized) return null;

    const customers = getCustomerCache();

    return customers[normalized] || null;
}


/* ============================================================
   CUSTOMER SEARCH
   ============================================================ */

function setupCustomerSearch() {
    const phoneInput = document.getElementById("phone");

    if (!phoneInput) return;

    phoneInput.addEventListener("blur", async function () {
        const phone = normalizePhone(phoneInput.value);

        if (!phone) {
            clearCustomerMessage();
            return;
        }

        phoneInput.value = phone;

        const cached = findCachedCustomer(phone);

        if (cached) {
            fillCustomerData(cached);
            showCustomerMessage("تم العثور على بيانات الزبون", "success");
            return;
        }

        await searchCustomerOnline(phone);
    });
}


async function searchCustomerOnline(phone) {
    const normalized = normalizePhone(phone);

    if (!normalized) return null;

    if (!navigator.onLine) {
        clearCustomerMessage();
        return null;
    }

    try {
        const response = await fetch(
            `${SUPABASE_URL}/rest/v1/customers?phone=eq.${encodeURIComponent(normalized)}&select=*`,
            {
                method: "GET",
                headers: supabaseHeaders()
            }
        );

        if (!response.ok) {
            throw new Error("Customer search failed");
        }

        const data = await response.json();

        if (data.length > 0) {
            const customer = data[0];

            fillCustomerData(customer);
            cacheCustomer(customer);

            showCustomerMessage(
                "تم العثور على بيانات الزبون",
                "success"
            );

            return customer;
        }

        clearCustomerMessage();

        return null;

    } catch (error) {
        console.error("Customer search error:", error);
        return null;
    }
}


/* ============================================================
   SAVE CUSTOMER
   ============================================================ */

async function saveCustomer(customer) {
    if (!customer?.phone) {
        return false;
    }

    const normalizedCustomer = {
        phone: normalizePhone(customer.phone),
        name: customer.name || "",
        address: customer.address || "",
        notes: customer.notes || ""
    };

    cacheCustomer(normalizedCustomer);

    if (!navigator.onLine) {
        return true;
    }

    try {
        const response = await fetch(
            `${SUPABASE_URL}/rest/v1/customers`,
            {
                method: "POST",
                headers: {
                    ...supabaseHeaders(),
                    "Prefer": "resolution=merge-duplicates,return=minimal"
                },
                body: JSON.stringify(normalizedCustomer)
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Save customer error:", errorText);
        }

        return true;

    } catch (error) {
        console.error("Customer save error:", error);
        return true;
    }
}


/* ============================================================
   ORDER OBJECT
   ============================================================ */

function buildOrderObject() {
    const customer = getCustomerData();

    return {
        order_type: currentOrderType || "Delevery",

        customer_name: customer.name,
        customer_phone: customer.phone,
        customer_address: customer.address,
        notes: customer.notes,

        items: JSON.parse(JSON.stringify(cart)),

        total: Number(
            cart.reduce(
                (sum, item) => sum + Number(item.total || 0),
                0
            ).toFixed(2)
        ),

        device_id: getDeviceId(),

        sync_status: "pending",

        created_at: new Date().toISOString()
    };
}


/* ============================================================
   DEVICE ID
   ============================================================ */

function getDeviceId() {
    let deviceId = localStorage.getItem("tabbara_device_id");

    if (!deviceId) {
        deviceId =
            "device-" +
            Date.now() +
            "-" +
            Math.random().toString(36).substring(2, 10);

        localStorage.setItem(
            "tabbara_device_id",
            deviceId
        );
    }

    return deviceId;
}


/* ============================================================
   LOCAL ORDER QUEUE
   ============================================================ */

function getPendingOrders() {
    try {
        return JSON.parse(
            localStorage.getItem("tabbara_pending_orders") || "[]"
        );
    } catch (error) {
        console.error("Pending orders error:", error);
        return [];
    }
}


function savePendingOrders(orders) {
    localStorage.setItem(
        "tabbara_pending_orders",
        JSON.stringify(orders)
    );
}


function queueOrder(order) {
    const orders = getPendingOrders();

    orders.push(order);

    savePendingOrders(orders);
}


/* ============================================================
   SEND ORDER TO SUPABASE
   ============================================================ */

async function sendOrderToSupabase(order) {
    try {
        const response = await fetch(
            `${SUPABASE_URL}/rest/v1/orders`,
            {
                method: "POST",
                headers: {
                    ...supabaseHeaders(),
                    "Prefer": "return=minimal"
                },
                body: JSON.stringify({
                    ...order,
                    sync_status: "synced"
                })
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Order upload error:", errorText);

            return false;
        }

        return true;

    } catch (error) {
        console.error("Order upload failed:", error);

        return false;
    }
}


/* ============================================================
   SYNC PENDING ORDERS
   ============================================================ */

async function syncPendingOrders() {
    if (!navigator.onLine) return;

    const orders = getPendingOrders();

    if (!orders.length) return;

    const remaining = [];

    for (const order of orders) {
        const success = await sendOrderToSupabase(order);

        if (!success) {
            remaining.push(order);
        }
    }

    savePendingOrders(remaining);

    updateConnectionStatus();
}


async function syncNow() {
    await syncPendingOrders();
}


/* ============================================================
   CONFIRM ORDER
   ============================================================ */

async function confirmOrder() {
    clearCustomerMessage();

    if (!cart.length) {
        modal(
            "السلة فارغة",
            "<p>أضف صنف واحد على الأقل قبل تأكيد الطلب.</p>"
        );
        return;
    }

    if (!currentOrderType) {
        currentOrderType = "Delevery";
    }

    const customer = getCustomerData();

    if (
        currentOrderType === "Delevery" &&
        !customer.phone &&
        !customer.name
    ) {
        showCustomerMessage(
            "أدخل اسم أو رقم هاتف الزبون",
            "error"
        );
        return;
    }

    const order = buildOrderObject();

    if (customer.phone) {
        await saveCustomer(customer);
    }

    if (navigator.onLine) {
        const success = await sendOrderToSupabase(order);

        if (!success) {
            queueOrder(order);
        }
    } else {
        queueOrder(order);
    }

    showOrderSuccess(order);

    clearOrderAfterConfirmation();
}


/* ============================================================
   ORDER SUCCESS
   ============================================================ */

function showOrderSuccess(order) {
    const total = Number(order.total || 0).toFixed(2);

    modal(
        "تم تأكيد الطلب ✅",
        `
            <div class="order-success">
                <p><strong>نوع الطلب:</strong></p>
                <p>${escapeHtml(order.order_type)}</p>

                <p><strong>المجموع:</strong></p>
                <p>${total}</p>

                <p style="margin-top:15px;">
                    تم حفظ الطلب بنجاح.
                </p>
            </div>
        `
    );
}


/* ============================================================
   CLEAR AFTER ORDER
   ============================================================ */

function clearOrderAfterConfirmation() {
    cart = [];

    const name = document.getElementById("name");
    const phone = document.getElementById("phone");
    const address = document.getElementById("address");
    const notes = document.getElementById("notes");

    if (name) name.value = "";
    if (phone) phone.value = "";
    if (address) address.value = "";
    if (notes) notes.value = "";

    clearCustomerMessage();

    updateCart();
}


/* ============================================================
   PREVIOUS ORDERS
   ============================================================ */

async function showOrders() {
    if (!navigator.onLine) {
        modal(
            "الطلبات السابقة",
            "<p>الطلبات السابقة تحتاج إلى اتصال بالإنترنت.</p>"
        );
        return;
    }

    try {
        const response = await fetch(
            `${SUPABASE_URL}/rest/v1/orders?select=*&order=created_at.desc&limit=50`,
            {
                method: "GET",
                headers: supabaseHeaders()
            }
        );

        if (!response.ok) {
            throw new Error("Unable to load orders");
        }

        const orders = await response.json();

        if (!orders.length) {
            modal(
                "الطلبات السابقة",
                "<p>لا يوجد طلبات سابقة.</p>"
            );
            return;
        }

        const html = orders.map((order, index) => {
            const date = order.created_at
                ? new Date(order.created_at).toLocaleString("ar-LB")
                : "";

            return `
                <div class="previous-order">
                    <strong>طلب #${orders.length - index}</strong>

                    <div>
                        ${escapeHtml(order.order_type || "")}
                    </div>

                    <div>
                        ${escapeHtml(order.customer_name || "بدون اسم")}
                    </div>

                    <div>
                        ${escapeHtml(order.customer_phone || "")}
                    </div>

                    <div>
                        المجموع: ${Number(order.total || 0).toFixed(2)}
                    </div>

                    <small>${escapeHtml(date)}</small>
                </div>
            `;
        }).join("");

        modal(
            "الطلبات السابقة",
            `<div class="previous-orders-list">${html}</div>`
        );

    } catch (error) {
        console.error("Orders loading error:", error);

        modal(
            "خطأ",
            "<p>تعذر تحميل الطلبات السابقة.</p>"
        );
    }
}


/* Compatibility with existing HTML */
function showPreviousOrders() {
    showOrders();
}


/* ============================================================
   MENU MANAGER
   ============================================================ */

function showMenuManager() {
    const categories = Object.keys(MENU);

    let html = `
        <div class="menu-manager">
            <h2>إدارة المنيو</h2>

            <div class="menu-manager-actions">
                <button onclick="openAddMenuItemModal()">
                    إضافة صنف
                </button>

                <button onclick="openAddOfferModal()">
                    إضافة عرض
                </button>
            </div>
    `;

    categories.forEach(category => {
        const items = MENU[category] || [];

        html += `
            <div class="manager-category">
                <h3>${escapeHtml(category)}</h3>
        `;

        items.forEach(item => {
            const available = item.available !== false;

            html += `
                <div class="manager-item">

                    <div class="manager-item-info">
                        <strong>${escapeHtml(item.name)}</strong>

                        <span>
                            ${
                                available
                                    ? "متوفر"
                                    : "منتهي"
                            }
                        </span>
                    </div>

                    <div class="manager-item-actions">

                        <button
                            onclick="toggleItemAvailability('${escapeJs(item.id)}')"
                        >
                            ${
                                available
                                    ? "إنهاء"
                                    : "تفعيل"
                            }
                        </button>

                        <button
                            onclick="editMenuItem('${escapeJs(item.id)}')"
                        >
                            تعديل
                        </button>

                    </div>

                </div>
            `;
        });

        html += `</div>`;
    });

    html += `</div>`;

    modal("إدارة المنيو", html);
}


/* ============================================================
   MENU ITEM FINDER
   ============================================================ */

function findMenuItemById(id) {
    for (const category of Object.keys(MENU)) {
        const item = MENU[category].find(
            item => String(item.id) === String(id)
        );

        if (item) {
            return {
                item,
                category
            };
        }
    }

    return null;
}


/* ============================================================
   TOGGLE ITEM AVAILABILITY
   ============================================================ */

function toggleItemAvailability(id) {
    const result = findMenuItemById(id);

    if (!result) return;

    result.item.available =
        result.item.available === false;

    saveMenu();

    renderCategories();

    showMenuManager();
}


/* ============================================================
   ESCAPE HELPERS
   ============================================================ */

function escapeHtml(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function escapeJs(value) {
    return String(value ?? "")
        .replace(/\\/g, "\\\\")
        .replace(/'/g, "\\'");
}


/* ============================================================
   ADD MENU ITEM MODAL
   ============================================================ */

function openAddMenuItemModal() {
    const categoryOptions = Object.keys(MENU)
        .map(category =>
            `<option value="${escapeHtml(category)}">
                ${escapeHtml(category)}
            </option>`
        )
        .join("");

    const html = `
        <div class="menu-form">

            <label>اسم الصنف</label>
            <input
                id="newItemName"
                class="modal-input"
                type="text"
                placeholder="اسم الصنف"
            >

            <label>القسم</label>
            <select
                id="newItemCategory"
                class="modal-input"
            >
                ${categoryOptions}
            </select>

            <label>نوع الصنف</label>
            <select
                id="newItemType"
                class="modal-input"
            >
                <option value="fixed">سعر ثابت</option>
                <option value="weight">بالوزن</option>
                <option value="meal">وجبة / ساندويش</option>
            </select>

            <label>السعر</label>
            <input
                id="newItemPrice"
                class="modal-input"
                type="number"
                step="0.01"
                min="0"
                placeholder="0"
            >

            <button onclick="createMenuItem()">
                حفظ الصنف
            </button>

            <button
                class="cancel-btn"
                onclick="showMenuManager()"
            >
                إلغاء
            </button>

        </div>
    `;

    modal("إضافة صنف", html);
}


/* ============================================================
   CREATE MENU ITEM
   ============================================================ */

function createMenuItem() {
    const name =
        document.getElementById("newItemName")?.value.trim();

    const category =
        document.getElementById("newItemCategory")?.value;

    const type =
        document.getElementById("newItemType")?.value;

    const price =
        Number(
            document.getElementById("newItemPrice")?.value || 0
        );

    if (!name) {
        alert("أدخل اسم الصنف");
        return;
    }

    if (!category || !MENU[category]) {
        alert("اختر القسم");
        return;
    }

    const item = {
        id:
            "item-" +
            Date.now() +
            "-" +
            Math.random().toString(36).substring(2, 7),

        name: name,

        type: type,

        available: true
    };

    if (type === "weight") {
        item.pricing = {
            base: price,
            grill: 0,
            fry: 0
        };
    } else if (type === "meal") {
        item.prices = {
            "وجبة": price,
            "ساندويش": price
        };
    } else {
        item.price = price;
    }

    MENU[category].push(item);

    saveMenu();

    renderCategories();

    showMenuManager();
}


/* ============================================================
   EDIT MENU ITEM
   ============================================================ */

function editMenuItem(id) {
    const result = findMenuItemById(id);

    if (!result) return;

    const item = result.item;
    const category = result.category;

    let price = 0;

    if (item.type === "weight") {
        price = item.pricing?.base || 0;
    } else if (item.type === "meal") {
        price = item.prices?.["وجبة"] || 0;
    } else {
        price = item.price || 0;
    }

    const html = `
        <div class="menu-form">

            <label>اسم الصنف</label>

            <input
                id="editItemName"
                class="modal-input"
                type="text"
                value="${escapeHtml(item.name)}"
            >

            <label>السعر الأساسي</label>

            <input
                id="editItemPrice"
                class="modal-input"
                type="number"
                step="0.01"
                min="0"
                value="${price}"
            >

            ${
                item.type === "weight"
                ? `
                    <label>زيادة المشوي</label>

                    <input
                        id="editGrillPrice"
                        class="modal-input"
                        type="number"
                        step="0.01"
                        min="0"
                        value="${item.pricing?.grill || 0}"
                    >

                    <label>زيادة المقلي</label>

                    <input
                        id="editFryPrice"
                        class="modal-input"
                        type="number"
                        step="0.01"
                        min="0"
                        value="${item.pricing?.fry || 0}"
                    >
                `
                : ""
            }

            <button
                onclick="saveEditedMenuItem('${escapeJs(id)}')"
            >
                حفظ التعديل
            </button>

            <button
                class="cancel-btn"
                onclick="showMenuManager()"
            >
                إلغاء
            </button>

        </div>
    `;

    modal(
        "تعديل " + escapeHtml(category),
        html
    );
}


/* ============================================================
   SAVE EDITED MENU ITEM
   ============================================================ */

function saveEditedMenuItem(id) {
    const result = findMenuItemById(id);

    if (!result) return;

    const item = result.item;

    const name =
        document.getElementById("editItemName")?.value.trim();

    const price =
        Number(
            document.getElementById("editItemPrice")?.value || 0
        );

    if (!name) {
        alert("أدخل اسم الصنف");
        return;
    }

    item.name = name;

    if (item.type === "weight") {
        item.pricing = item.pricing || {};

        item.pricing.base = price;

        item.pricing.grill =
            Number(
                document.getElementById("editGrillPrice")
                    ?.value || 0
            );

        item.pricing.fry =
            Number(
                document.getElementById("editFryPrice")
                    ?.value || 0
            );

    } else if (item.type === "meal") {
        item.prices = item.prices || {};

        item.prices["وجبة"] = price;

    } else {
        item.price = price;
    }

    saveMenu();

    renderCategories();

    showMenuManager();
}


/* ============================================================
   END OF PART 4
   ============================================================ */
// ============================================================
// PART 5 / 6
// Offers + Menu Manager Advanced Functions + Printing
// ============================================================


/* ============================================================
   ADD OFFER MODAL
   ============================================================ */

function openAddOfferModal() {
    const selectableItems = [];

    for (const category of Object.keys(MENU)) {
        const items = MENU[category] || [];

        items.forEach(item => {
            if (item.type !== "offer") {
                selectableItems.push({
                    ...item,
                    category
                });
            }
        });
    }

    let itemsHtml = "";

    selectableItems.forEach(item => {
        itemsHtml += `
            <label class="offer-item-row">

                <input
                    type="checkbox"
                    class="offer-item-checkbox"
                    value="${escapeHtml(item.id)}"
                >

                <span>
                    ${escapeHtml(item.name)}
                    <small>
                        ${escapeHtml(item.category)}
                    </small>
                </span>

            </label>
        `;
    });

    const html = `
        <div class="menu-form">

            <label>اسم العرض</label>

            <input
                id="newOfferName"
                class="modal-input"
                type="text"
                placeholder="مثلاً عرض العائلة"
            >

            <label>سعر العرض النهائي</label>

            <input
                id="newOfferPrice"
                class="modal-input"
                type="number"
                step="0.01"
                min="0"
                placeholder="0"
            >

            <label>الأصناف الموجودة داخل العرض</label>

            <div class="offer-items-list">
                ${
                    itemsHtml ||
                    "<p>لا يوجد أصناف متاحة.</p>"
                }
            </div>

            <label>حالة العرض</label>

            <select
                id="newOfferAvailable"
                class="modal-input"
            >
                <option value="true">متوفر</option>
                <option value="false">منتهي</option>
            </select>

            <button onclick="createOffer()">
                حفظ العرض
            </button>

            <button
                class="cancel-btn"
                onclick="showMenuManager()"
            >
                إلغاء
            </button>

        </div>
    `;

    modal("إضافة عرض", html);
}


/* ============================================================
   CREATE OFFER
   ============================================================ */

function createOffer() {
    const name =
        document.getElementById("newOfferName")
            ?.value
            .trim();

    const price =
        Number(
            document.getElementById("newOfferPrice")
                ?.value || 0
        );

    const available =
        document.getElementById("newOfferAvailable")
            ?.value !== "false";

    if (!name) {
        alert("أدخل اسم العرض");
        return;
    }

    if (price < 0) {
        alert("السعر غير صحيح");
        return;
    }

    const checkboxes =
        document.querySelectorAll(
            ".offer-item-checkbox:checked"
        );

    const includedItems = [];

    checkboxes.forEach(checkbox => {
        const result =
            findMenuItemById(checkbox.value);

        if (!result) return;

        includedItems.push({
            id: result.item.id,
            name: result.item.name,
            category: result.category
        });
    });

    const offer = {
        id:
            "offer-" +
            Date.now() +
            "-" +
            Math.random().toString(36).substring(2, 7),

        name: name,

        type: "offer",

        price: price,

        available: available,

        includedItems: includedItems
    };

    if (!MENU["🎁 العروض"]) {
        MENU["🎁 العروض"] = [];
    }

    MENU["🎁 العروض"].push(offer);

    saveMenu();

    renderCategories();

    showMenuManager();
}


/* ============================================================
   EDIT OFFER
   ============================================================ */

function editOffer(id) {
    const result = findMenuItemById(id);

    if (!result || result.item.type !== "offer") {
        return;
    }

    const offer = result.item;

    const selectedIds =
        (offer.includedItems || [])
            .map(item => String(item.id));

    const selectableItems = [];

    for (const category of Object.keys(MENU)) {
        const items = MENU[category] || [];

        items.forEach(item => {
            if (item.type !== "offer") {
                selectableItems.push({
                    ...item,
                    category
                });
            }
        });
    }

    let itemsHtml = "";

    selectableItems.forEach(item => {
        const checked =
            selectedIds.includes(String(item.id))
                ? "checked"
                : "";

        itemsHtml += `
            <label class="offer-item-row">

                <input
                    type="checkbox"
                    class="edit-offer-item-checkbox"
                    value="${escapeHtml(item.id)}"
                    ${checked}
                >

                <span>
                    ${escapeHtml(item.name)}
                    <small>
                        ${escapeHtml(item.category)}
                    </small>
                </span>

            </label>
        `;
    });

    const html = `
        <div class="menu-form">

            <label>اسم العرض</label>

            <input
                id="editOfferName"
                class="modal-input"
                type="text"
                value="${escapeHtml(offer.name)}"
            >

            <label>السعر النهائي</label>

            <input
                id="editOfferPrice"
                class="modal-input"
                type="number"
                step="0.01"
                min="0"
                value="${Number(offer.price || 0)}"
            >

            <label>الأصناف الموجودة داخل العرض</label>

            <div class="offer-items-list">
                ${itemsHtml}
            </div>

            <label>حالة العرض</label>

            <select
                id="editOfferAvailable"
                class="modal-input"
            >
                <option
                    value="true"
                    ${
                        offer.available !== false
                            ? "selected"
                            : ""
                    }
                >
                    متوفر
                </option>

                <option
                    value="false"
                    ${
                        offer.available === false
                            ? "selected"
                            : ""
                    }
                >
                    منتهي
                </option>
            </select>

            <button
                onclick="saveEditedOffer('${escapeJs(id)}')"
            >
                حفظ التعديل
            </button>

            <button
                class="cancel-btn"
                onclick="showMenuManager()"
            >
                إلغاء
            </button>

        </div>
    `;

    modal("تعديل العرض", html);
}


/* ============================================================
   SAVE EDITED OFFER
   ============================================================ */

function saveEditedOffer(id) {
    const result = findMenuItemById(id);

    if (!result || result.item.type !== "offer") {
        return;
    }

    const offer = result.item;

    const name =
        document.getElementById("editOfferName")
            ?.value
            .trim();

    const price =
        Number(
            document.getElementById("editOfferPrice")
                ?.value || 0
        );

    const available =
        document.getElementById("editOfferAvailable")
            ?.value !== "false";

    if (!name) {
        alert("أدخل اسم العرض");
        return;
    }

    const checkboxes =
        document.querySelectorAll(
            ".edit-offer-item-checkbox:checked"
        );

    const includedItems = [];

    checkboxes.forEach(checkbox => {
        const itemResult =
            findMenuItemById(checkbox.value);

        if (!itemResult) return;

        includedItems.push({
            id: itemResult.item.id,
            name: itemResult.item.name,
            category: itemResult.category
        });
    });

    offer.name = name;
    offer.price = price;
    offer.available = available;
    offer.includedItems = includedItems;

    saveMenu();

    renderCategories();

    showMenuManager();
}


/* ============================================================
   UPDATE MENU MANAGER OFFER BUTTON
   ============================================================ */

function openOfferEditor(id) {
    editOffer(id);
}


/* ============================================================
   GET OFFER DETAILS
   ============================================================ */

function getOfferDetails(offer) {
    if (!offer) return "";

    const included =
        offer.includedItems || [];

    if (!included.length) {
        return "عرض";
    }

    return included
        .map(item => item.name)
        .join(" + ");
}


/* ============================================================
   PRINT INVOICE
   ============================================================ */

function printInvoice(order = null) {
    const printableOrder =
        order || buildOrderObject();

    if (!printableOrder) {
        return;
    }

    const items =
        printableOrder.items || [];

    const total =
        Number(printableOrder.total || 0);

    let itemsHtml = "";

    items.forEach(item => {
        const quantity =
            Number(item.quantity || 1);

        const itemTotal =
            Number(item.total || 0);

        let details = "";

        if (item.weight) {
            details +=
                ` - ${Number(item.weight).toFixed(2)} كغ`;
        }

        if (item.preparation) {
            details +=
                ` - ${escapeHtml(item.preparation)}`;
        }

        if (item.size) {
            details +=
                ` - ${escapeHtml(item.size)}`;
        }

        if (item.mealType) {
            details +=
                ` - ${escapeHtml(item.mealType)}`;
        }

        itemsHtml += `
            <tr>
                <td>
                    ${escapeHtml(item.name)}
                    ${details}
                </td>

                <td>
                    ${quantity}
                </td>

                <td>
                    ${itemTotal.toFixed(2)}
                </td>
            </tr>
        `;
    });

    const date =
        printableOrder.created_at
            ? new Date(
                printableOrder.created_at
              ).toLocaleString("ar-LB")
            : new Date().toLocaleString("ar-LB");

    const invoiceHtml = `
        <!DOCTYPE html>

        <html lang="ar" dir="rtl">

        <head>

            <meta charset="UTF-8">

            <title>Tabbara Seafood</title>

            <style>

                @page {
                    size: 80mm auto;
                    margin: 0;
                }

                * {
                    box-sizing: border-box;
                }

                body {
                    width: 80mm;
                    margin: 0;
                    padding: 8px;
                    font-family: Arial, sans-serif;
                    font-size: 12px;
                    direction: rtl;
                }

                .header {
                    text-align: center;
                    margin-bottom: 10px;
                }

                .header h2 {
                    margin: 0 0 5px;
                    font-size: 18px;
                }

                .line {
                    border-top: 1px dashed #000;
                    margin: 8px 0;
                }

                .info {
                    line-height: 1.7;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                }

                th,
                td {
                    padding: 4px 2px;
                    text-align: right;
                    vertical-align: top;
                }

                th {
                    border-bottom: 1px solid #000;
                }

                .total {
                    font-size: 16px;
                    font-weight: bold;
                    margin-top: 10px;
                }

                .footer {
                    text-align: center;
                    margin-top: 15px;
                }

            </style>

        </head>

        <body>

            <div class="header">

                <h2>Tabbara Seafood</h2>

                <div>فاتورة طلب</div>

            </div>

            <div class="line"></div>

            <div class="info">

                <div>
                    التاريخ: ${escapeHtml(date)}
                </div>

                <div>
                    نوع الطلب:
                    ${escapeHtml(
                        printableOrder.order_type || ""
                    )}
                </div>

                ${
                    printableOrder.customer_name
                        ? `
                            <div>
                                الاسم:
                                ${escapeHtml(
                                    printableOrder.customer_name
                                )}
                            </div>
                        `
                        : ""
                }

                ${
                    printableOrder.customer_phone
                        ? `
                            <div>
                                الهاتف:
                                ${escapeHtml(
                                    printableOrder.customer_phone
                                )}
                            </div>
                        `
                        : ""
                }

                ${
                    printableOrder.customer_address
                        ? `
                            <div>
                                العنوان:
                                ${escapeHtml(
                                    printableOrder.customer_address
                                )}
                            </div>
                        `
                        : ""
                }

            </div>

            <div class="line"></div>

            <table>

                <thead>

                    <tr>
                        <th>الصنف</th>
                        <th>الكمية</th>
                        <th>المجموع</th>
                    </tr>

                </thead>

                <tbody>

                    ${itemsHtml}

                </tbody>

            </table>

            <div class="line"></div>

            <div class="total">
                المجموع:
                ${total.toFixed(2)}
            </div>

            ${
                printableOrder.notes
                    ? `
                        <div class="line"></div>

                        <div>
                            ملاحظات:
                            ${escapeHtml(
                                printableOrder.notes
                            )}
                        </div>
                    `
                    : ""
            }

            <div class="footer">
                شكراً لزيارتكم
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
    `;

    const printWindow =
        window.open(
            "",
            "_blank",
            "width=420,height=700"
        );

    if (!printWindow) {
        alert(
            "المتصفح منع نافذة الطباعة. اسمح بالنوافذ المنبثقة."
        );
        return;
    }

    printWindow.document.open();

    printWindow.document.write(
        invoiceHtml
    );

    printWindow.document.close();
}


/* ============================================================
   PRINT CURRENT CART
   ============================================================ */

function printCurrentOrder() {
    if (!cart.length) {
        alert("السلة فارغة");
        return;
    }

    const order = buildOrderObject();

    printInvoice(order);
}


/* ============================================================
   DELETE MENU ITEM
   ============================================================ */

function deleteMenuItem(id) {
    const result = findMenuItemById(id);

    if (!result) {
        return;
    }

    const confirmed =
        confirm(
            `هل تريد حذف "${result.item.name}"؟`
        );

    if (!confirmed) {
        return;
    }

    MENU[result.category] =
        MENU[result.category].filter(
            item =>
                String(item.id) !== String(id)
        );

    saveMenu();

    renderCategories();

    showMenuManager();
}


/* ============================================================
   MENU DATA FOR AI / N8N
   ============================================================ */

function getStructuredMenu() {
    const result = [];

    for (const category of Object.keys(MENU)) {
        const items = MENU[category] || [];

        items.forEach(item => {

            const entry = {
                id: item.id,
                category: category,
                name: item.name,
                type: item.type,
                available: item.available !== false
            };

            if (item.type === "weight") {

                entry.pricing = {
                    base: Number(
                        item.pricing?.base || 0
                    ),
                    grill: Number(
                        item.pricing?.grill || 0
                    ),
                    fry: Number(
                        item.pricing?.fry || 0
                    )
                };

            } else if (item.type === "meal") {

                entry.prices = {
                    "وجبة": Number(
                        item.prices?.["وجبة"] || 0
                    ),
                    "ساندويش": Number(
                        item.prices?.["ساندويش"] || 0
                    )
                };

            } else if (item.type === "offer") {

                entry.price =
                    Number(item.price || 0);

                entry.includedItems =
                    item.includedItems || [];

            } else {

                entry.price =
                    Number(item.price || 0);
            }

            result.push(entry);
        });
    }

    return result;
}


/* ============================================================
   EXPORT MENU DATA
   ============================================================ */

function exportMenuData() {
    const data = getStructuredMenu();

    const json =
        JSON.stringify(
            data,
            null,
            2
        );

    const blob =
        new Blob(
            [json],
            {
                type: "application/json"
            }
        );

    const url =
        URL.createObjectURL(blob);

    const link =
        document.createElement("a");

    link.href = url;

    link.download =
        "tabbara-seafood-menu.json";

    document.body.appendChild(link);

    link.click();

    link.remove();

    URL.revokeObjectURL(url);
}


/* ============================================================
   END OF PART 5
   ============================================================ */
// ============================================================
// PART 6 / 6
// Final Initialization + Offline Sync + Safety Checks
// ============================================================


/* ============================================================
   CONNECTION EVENTS
   ============================================================ */

window.addEventListener("online", async function () {
    console.log("Internet connection restored.");

    updateConnectionStatus();

    await syncPendingOrders();
});


window.addEventListener("offline", function () {
    console.log("Internet connection lost.");

    updateConnectionStatus();
});


/* ============================================================
   PAGE VISIBILITY
   ============================================================ */

document.addEventListener(
    "visibilitychange",
    async function () {

        if (
            document.visibilityState === "visible" &&
            navigator.onLine
        ) {
            updateConnectionStatus();

            await syncPendingOrders();
        }
    }
);


/* ============================================================
   BEFORE UNLOAD
   ============================================================ */

window.addEventListener("beforeunload", function () {
    try {
        localStorage.setItem(
            "tabbara_last_cart",
            JSON.stringify(cart || [])
        );
    } catch (error) {
        console.error(
            "Unable to save cart:",
            error
        );
    }
});


/* ============================================================
   RESTORE CART
   ============================================================ */

function restoreCart() {
    try {
        const saved =
            localStorage.getItem(
                "tabbara_last_cart"
            );

        if (!saved) {
            return;
        }

        const savedCart =
            JSON.parse(saved);

        if (Array.isArray(savedCart)) {
            cart = savedCart;
        }

    } catch (error) {
        console.error(
            "Cart restore error:",
            error
        );

        cart = [];
    }
}


/* ============================================================
   CLEAN OLD CART DATA
   ============================================================ */

function clearSavedCart() {
    try {
        localStorage.removeItem(
            "tabbara_last_cart"
        );
    } catch (error) {
        console.error(
            "Unable to clear saved cart:",
            error
        );
    }
}


/* ============================================================
   PERIODIC SYNC
   ============================================================ */

setInterval(
    async function () {

        if (!navigator.onLine) {
            return;
        }

        try {
            await syncPendingOrders();
        } catch (error) {
            console.error(
                "Periodic sync error:",
                error
            );
        }

    },
    60000
);


/* ============================================================
   GLOBAL ERROR HANDLER
   ============================================================ */

window.addEventListener(
    "error",
    function (event) {
        console.error(
            "POS error:",
            event.error || event.message
        );
    }
);


/* ============================================================
   UNHANDLED PROMISE ERRORS
   ============================================================ */

window.addEventListener(
    "unhandledrejection",
    function (event) {
        console.error(
            "POS promise error:",
            event.reason
        );
    }
);


/* ============================================================
   INITIALIZE POS
   ============================================================ */

document.addEventListener(
    "DOMContentLoaded",
    async function () {

        console.log(
            "Tabbara Seafood POS starting..."
        );

        try {

            /* Load saved menu */

            loadMenu();

            /* Make sure menu exists */

            if (
                !MENU ||
                typeof MENU !== "object"
            ) {
                MENU =
                    JSON.parse(
                        JSON.stringify(
                            DEFAULT_MENU
                        )
                    );

                saveMenu();
            }


            /* Make sure categories exist */

            if (
                !Array.isArray(CATEGORIES) ||
                !CATEGORIES.length
            ) {
                CATEGORIES =
                    Object.keys(MENU);
            }


            /* Login */

            checkLogin();


            /* Connection */

            updateConnectionStatus();


            /* Categories */

            renderCategories();


            if (
                CATEGORIES.length > 0
            ) {

                currentCategory =
                    CATEGORIES[0];

                showCategory(
                    currentCategory
                );
            }


            /* Customer search */

            setupCustomerSearch();


            /* Restore cart */

            restoreCart();

            updateCart();


            /* Sync */

            if (navigator.onLine) {
                await syncPendingOrders();
            }


            console.log(
                "Tabbara Seafood POS ready."
            );

        } catch (error) {

            console.error(
                "POS initialization error:",
                error
            );

            alert(
                "حدث خطأ أثناء تشغيل النظام. راجع Console."
            );
        }
    }
);


/* ============================================================
   FINAL GLOBAL HELPERS
   ============================================================ */

function getPendingOrdersCount() {
    return getPendingOrders().length;
}


function isOnline() {
    return navigator.onLine;
}


function getCurrentOrderTotal() {
    return Number(
        cart.reduce(
            (sum, item) =>
                sum + Number(item.total || 0),
            0
        ).toFixed(2)
    );
}


function getCurrentCart() {
    return JSON.parse(
        JSON.stringify(cart || [])
    );
}


/* ============================================================
   DEBUG INFORMATION
   ============================================================ */

window.TABBARA_POS = {
    getMenu: getStructuredMenu,
    getCart: getCurrentCart,
    getTotal: getCurrentOrderTotal,
    getPendingOrders: getPendingOrders,
    getPendingOrdersCount:
        getPendingOrdersCount,
    sync: syncNow,
    isOnline: isOnline,
    deviceId: getDeviceId
};


/* ============================================================
   FINAL STATUS
   ============================================================ */

console.log(
    "Tabbara Seafood POS script loaded successfully."
);


/* ============================================================
   END OF PART 6
   ============================================================ */
