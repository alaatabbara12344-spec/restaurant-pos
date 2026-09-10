// =====================================================
// Tabbara Seafood POS
// Complete POS System
// Part 1 / 6
// =====================================================

const SUPABASE_URL =
  "https://tpvhxauivmjgfcugpldp.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_0n__ZztsS8BQtdVn5lhmmA_WWuHjVg7";

const LOGIN_PASSWORD =
  "1234";


// =====================================================
// الإعدادات
// =====================================================

const CUSTOMER_STORAGE_KEY =
  "tabbaraCustomers";

const PENDING_ORDERS_KEY =
  "tabbaraPendingOrders";

const MENU_STORAGE_KEY =
  "tabbaraMenu";

const DEVICE_ID_KEY =
  "tabbaraDeviceId";


// =====================================================
// Device ID
// =====================================================

let deviceId =
  localStorage.getItem(
    DEVICE_ID_KEY
  );

if (!deviceId) {

  deviceId =
    crypto.randomUUID();

  localStorage.setItem(
    DEVICE_ID_KEY,
    deviceId
  );

}


// =====================================================
// المنيو الافتراضية
// =====================================================

const DEFAULT_MENU = [

  // ---------------------------------------------------
  // الأسماك
  // ---------------------------------------------------

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


  // ---------------------------------------------------
  // ثمار البحر
  // ---------------------------------------------------

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


  // ---------------------------------------------------
  // الوجبات والساندويش
  // ---------------------------------------------------

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


  // ---------------------------------------------------
  // المقبلات
  // ---------------------------------------------------

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


  // ---------------------------------------------------
  // السلطات
  // ---------------------------------------------------

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


  // ---------------------------------------------------
  // المشروبات
  // ---------------------------------------------------

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


// =====================================================
// التصنيفات
// =====================================================

const CATEGORIES = [

  "🐟 الأسماك",

  "🦐 ثمار البحر",

  "🍽️ الوجبات والساندويش",

  "🎁 العروض",

  "🥗 المقبلات",

  "🥬 السلطات",

  "🥤 المشروبات"

];


// =====================================================
// متغيرات التطبيق
// =====================================================

let menu = [];

let cart = [];

let selectedOrderType =
  "";

let currentCategory =
  "";

let currentModalItem =
  null;


// =====================================================
// تحميل المنيو
// =====================================================

function loadMenu() {

  try {

    const saved =
      localStorage.getItem(
        MENU_STORAGE_KEY
      );


    if (
      saved
    ) {

      const parsed =
        JSON.parse(
          saved
        );


      if (
        Array.isArray(
          parsed
        ) &&
        parsed.length
      ) {

        menu =
          parsed;

        return;

      }

    }

  }

  catch (error) {

    console.error(
      "Menu load error:",
      error
    );

  }


  menu =
    JSON.parse(
      JSON.stringify(
        DEFAULT_MENU
      )
    );

}


// =====================================================
// حفظ المنيو
// =====================================================

function saveMenu() {

  localStorage.setItem(
    MENU_STORAGE_KEY,
    JSON.stringify(
      menu
    )
  );

}


// =====================================================
// تنسيق السعر
// =====================================================

function money(
  value
) {

  return Number(
    value || 0
  ).toFixed(2);

}


// =====================================================
// تنظيف رقم الهاتف
// =====================================================

function normalizePhone(
  phone
) {

  return String(
    phone || ""
  )
    .replace(
      /[^\d+]/g,
      ""
    )
    .trim();

}


// =====================================================
// حماية HTML
// =====================================================

function escapeHtml(
  value
) {

  return String(
    value ?? ""
  )
    .replace(
      /&/g,
      "&amp;"
    )
    .replace(
      /</g,
      "&lt;"
    )
    .replace(
      />/g,
      "&gt;"
    )
    .replace(
      /"/g,
      "&quot;"
    )
    .replace(
      /'/g,
      "&#039;"
    );

}


// =====================================================
// تحميل المنيو عند بدء الملف
// =====================================================

loadMenu();

saveMenu();
// =====================================================
// Part 2 / 6
// Login + Order Type + Categories
// =====================================================


// =====================================================
// تسجيل الدخول
// =====================================================

function checkLogin() {

  const loggedIn =
    localStorage.getItem(
      "tabbaraLoggedIn"
    );


  if (
    loggedIn === "true"
  ) {

    showPOS();

  }

  else {

    showLogin();

  }

}


// =====================================================
// شاشة تسجيل الدخول
// =====================================================

function showLogin() {

  const loginScreen =
    document.getElementById(
      "loginScreen"
    );

  const app =
    document.getElementById(
      "app"
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


// =====================================================
// الدخول
// =====================================================

function login() {

  const input =
    document.getElementById(
      "password"
    );


  if (!input) {

    return;

  }


  if (
    input.value ===
    LOGIN_PASSWORD
  ) {

    localStorage.setItem(
      "tabbaraLoggedIn",
      "true"
    );


    showPOS();

  }

  else {

    alert(
      "❌ كلمة السر غير صحيحة"
    );


    input.value =
      "";

  }

}


// =====================================================
// إظهار POS
// =====================================================

function showPOS() {

  const loginScreen =
    document.getElementById(
      "loginScreen"
    );

  const app =
    document.getElementById(
      "app"
    );


  if (loginScreen) {

    loginScreen.style.display =
      "none";

  }


  if (app) {

    app.style.display =
      "block";

  }


  renderCategories();


  if (
    !currentCategory
  ) {

    currentCategory =
      CATEGORIES[0];

  }


  showCategory(
    currentCategory
  );

}


// =====================================================
// تسجيل الخروج
// =====================================================

function logout() {

  localStorage.removeItem(
    "tabbaraLoggedIn"
  );


  location.reload();

}


// =====================================================
// نوع الطلب
// =====================================================

function setOrderType(
  type
) {

  selectedOrderType =
    type;


  const buttons =
    document.querySelectorAll(
      ".order-type-btn"
    );


  buttons.forEach(
    function(button) {

      button.classList.remove(
        "active"
      );

    }
  );


  if (
    type ===
    "Delevery"
  ) {

    const delivery =
      document.getElementById(
        "deliveryBtn"
      );


    if (delivery) {

      delivery.classList.add(
        "active"
      );

    }

  }


  if (
    type ===
    "استلام من المحل"
  ) {

    const pickup =
      document.getElementById(
        "pickupBtn"
      );


    if (pickup) {

      pickup.classList.add(
        "active"
      );

    }

  }

}


// =====================================================
// عرض التصنيفات
// =====================================================

function renderCategories() {

  const container =
    document.getElementById(
      "categories"
    );


  if (!container) {

    return;

  }


  container.innerHTML =
    CATEGORIES
      .map(
        function(category) {

          const active =
            category ===
            currentCategory
              ? "active"
              : "";


          return `
            <button
              class="category-btn ${active}"
              onclick="showCategory('${escapeHtml(category)}')"
            >
              ${escapeHtml(category)}
            </button>
          `;

        }
      )
      .join("");

}


// =====================================================
// عرض أصناف التصنيف
// =====================================================

function showCategory(
  category
) {

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


  const items =
    menu.filter(
      function(item) {

        return (
          item.category ===
          category
        );

      }
    );


  if (!items.length) {

    container.innerHTML = `
      <div class="empty-state">
        لا توجد أصناف في هذا التصنيف.
      </div>
    `;

    return;

  }


  container.innerHTML =
    items
      .map(
        function(item) {

          const disabled =
            item.available === false
              ? "disabled"
              : "";


          const finished =
            item.available === false
              ? "🔴 خلص"
              : "";


          let priceText =
            "";


          if (
            item.type ===
            "weight"
          ) {

            priceText =
              `
                $${money(
                  item.pricing?.base
                )}
                / كغ
              `;

          }

          else if (
            item.type ===
            "sizes"
          ) {

            priceText =
              "حسب الحجم";

          }

          else if (
            item.type ===
            "meal"
          ) {

            priceText =
              "وجبة / ساندويش";

          }

          else {

            priceText =
              `$${money(
                item.price
              )}`;

          }


          return `
            <button
              class="menu-item ${disabled}"
              ${item.available === false
                ? "disabled"
                : ""}
              onclick="chooseItem('${escapeHtml(item.id)}')"
            >

              <strong>
                ${escapeHtml(
                  item.name
                )}
              </strong>

              <span>
                ${priceText}
              </span>

              ${
                finished
                  ? `
                    <small>
                      ${finished}
                    </small>
                  `
                  : ""
              }

            </button>
          `;

        }
      )
      .join("");

}


// =====================================================
// اختيار صنف
// =====================================================

function chooseItem(
  id
) {

  const item =
    menu.find(
      function(menuItem) {

        return (
          menuItem.id ===
          id
        );

      }
    );


  if (!item) {

    return;

  }


  if (
    item.available === false
  ) {

    alert(
      "🔴 هذا الصنف خلص حالياً."
    );

    return;

  }


  // ---------------------------------------------------
  // العرض
  // ---------------------------------------------------

  if (
    item.category ===
    "العروض" ||
    item.category ===
    "🎁 العروض"
  ) {

    addCart(
      item,
      {
        type: "offer",
        price:
          Number(
            item.price || 0
          )
      }
    );

    return;

  }


  // ---------------------------------------------------
  // حسب الوزن
  // ---------------------------------------------------

  if (
    item.type ===
    "weight"
  ) {

    openWeightModal(
      item
    );

    return;

  }


  // ---------------------------------------------------
  // الأحجام
  // ---------------------------------------------------

  if (
    item.type ===
    "sizes"
  ) {

    openSizeModal(
      item
    );

    return;

  }


  // ---------------------------------------------------
  // وجبة / ساندويش
  // ---------------------------------------------------

  if (
    item.type ===
    "meal"
  ) {

    openMealModal(
      item
    );

    return;

  }


  // ---------------------------------------------------
  // سعر ثابت
  // ---------------------------------------------------

  addCart(
    item,
    {
      type: "fixed",
      price:
        Number(
          item.price || 0
        )
    }
  );

}


// =====================================================
// Modal
// =====================================================

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
      class="modal-overlay"
      onclick="closeModal(event)"
    >

      <div
        class="modal-box"
        onclick="event.stopPropagation()"
      >

        <div class="modal-header">

          <h3>
            ${escapeHtml(
              title
            )}
          </h3>

          <button
            class="modal-close"
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


// =====================================================
// إغلاق Modal
// =====================================================

function closeModal(
  event
) {

  if (
    event &&
    event.target &&
    !event.target.classList.contains(
      "modal-overlay"
    )
  ) {

    return;

  }


  const root =
    document.getElementById(
      "modalRoot"
    );


  if (root) {

    root.innerHTML =
      "";

  }


  currentModalItem =
    null;

}
// =====================================================
// Part 3 / 6
// Weight + Sizes + Meals + Cart
// =====================================================


// =====================================================
// نافذة الوزن
// =====================================================

function openWeightModal(item) {

  currentModalItem =
    item;


  const pricing =
    item.pricing || {};


  modal(
    `⚖️ ${item.name}`,
    `

      <div class="form-row">

        <label>
          طريقة التحضير
        </label>

        <select id="weightMethod">

          <option value="ني">
            ني — $${money(
              pricing.base || 0
            )} / كغ
          </option>

          <option value="مشوي">
            مشوي — $${money(
              Number(pricing.base || 0) +
              Number(pricing.grill || 0)
            )} / كغ
          </option>

          <option value="مقلي">
            مقلي — $${money(
              Number(pricing.base || 0) +
              Number(pricing.fry || 0)
            )} / كغ
          </option>

        </select>

      </div>


      <div class="form-row">

        <label>
          الوزن بالكيلو
        </label>

        <input
          id="weightValue"
          type="number"
          min="0.01"
          step="0.01"
          placeholder="مثال: 1.25"
        >

      </div>


      <button
        class="primary"
        onclick="addWeightedItem()"
      >
        ➕ إضافة للسلة
      </button>

    `
  );

}


// =====================================================
// تغيير طريقة التحضير
// =====================================================

function selectWeightMethod(
  method
) {

  const select =
    document.getElementById(
      "weightMethod"
    );


  if (select) {

    select.value =
      method;

  }

}


// =====================================================
// الحصول على الصنف الحالي في Modal
// =====================================================

function getCurrentModalItem() {

  return currentModalItem;

}


// =====================================================
// إضافة صنف بالوزن
// =====================================================

function addWeightedItem() {

  const item =
    getCurrentModalItem();


  if (!item) {

    return;

  }


  const weightInput =
    document.getElementById(
      "weightValue"
    );


  const methodInput =
    document.getElementById(
      "weightMethod"
    );


  const weight =
    Number(
      weightInput?.value || 0
    );


  const method =
    methodInput?.value ||
    "ني";


  if (
    weight <= 0
  ) {

    alert(
      "أدخل الوزن"
    );

    return;

  }


  const pricing =
    item.pricing || {};


  let pricePerKg =
    Number(
      pricing.base || 0
    );


  if (
    method ===
    "مشوي"
  ) {

    pricePerKg +=
      Number(
        pricing.grill || 0
      );

  }


  if (
    method ===
    "مقلي"
  ) {

    pricePerKg +=
      Number(
        pricing.fry || 0
      );

  }


  const total =
    weight *
    pricePerKg;


  addCart(
    item,
    {

      type:
        "weight",

      weight:
        weight,

      cooking:
        method,

      price:
        pricePerKg,

      total:
        total

    }
  );


  closeModal();

}


// =====================================================
// نافذة الأحجام
// =====================================================

function openSizeModal(
  item
) {

  currentModalItem =
    item;


  const sizes =
    item.sizes || {};


  const sizeOptions =
    Object.keys(
      sizes
    )
      .map(
        function(size) {

          return `
            <button
              class="size-option"
              onclick="addSizedItem(
                '${escapeHtml(item.id)}',
                '${escapeHtml(size)}'
              )"
            >

              <strong>
                ${escapeHtml(size)}
              </strong>

              <span>
                $${money(
                  sizes[size]
                )}
              </span>

            </button>
          `;

        }
      )
      .join("");


  modal(
    `📏 ${item.name}`,
    `

      <div class="size-grid">

        ${sizeOptions}

      </div>

    `
  );

}


// =====================================================
// إضافة حسب الحجم
// =====================================================

function addSizedItem(
  id,
  size
) {

  const item =
    menu.find(
      function(menuItem) {

        return (
          menuItem.id ===
          id
        );

      }
    );


  if (!item) {

    return;

  }


  if (
    item.available === false
  ) {

    alert(
      "🔴 هذا الصنف خلص حالياً."
    );

    return;

  }


  const sizes =
    item.sizes || {};


  const price =
    Number(
      sizes[size] || 0
    );


  addCart(
    item,
    {

      type:
        "size",

      size:
        size,

      price:
        price,

      total:
        price

    }
  );


  closeModal();

}


// =====================================================
// نافذة وجبة / ساندويش
// =====================================================

function openMealModal(
  item
) {

  currentModalItem =
    item;


  const prices =
    item.prices || {};


  modal(
    `🍽️ ${item.name}`,
    `

      <div class="size-grid">

        <button
          class="size-option"
          onclick="addMealItem(
            '${escapeHtml(item.id)}',
            'وجبة',
            ${Number(
              prices.وجبة || 0
            )}
          )"
        >

          <strong>
            وجبة
          </strong>

          <span>
            $${money(
              prices.وجبة || 0
            )}
          </span>

        </button>


        <button
          class="size-option"
          onclick="addMealItem(
            '${escapeHtml(item.id)}',
            'ساندويش',
            ${Number(
              prices.ساندويش || 0
            )}
          )"
        >

          <strong>
            ساندويش
          </strong>

          <span>
            $${money(
              prices.ساندويش || 0
            )}
          </span>

        </button>

      </div>

    `
  );

}


// =====================================================
// إضافة وجبة / ساندويش
// =====================================================

function addMealItem(
  id,
  label,
  price
) {

  const item =
    menu.find(
      function(menuItem) {

        return (
          menuItem.id ===
          id
        );

      }
    );


  if (!item) {

    return;

  }


  if (
    item.available === false
  ) {

    alert(
      "🔴 هذا الصنف خلص حالياً."
    );

    return;

  }


  addCart(
    item,
    {

      type:
        "meal",

      choice:
        label,

      price:
        Number(price || 0),

      total:
        Number(price || 0)

    }
  );


  closeModal();

}


// =====================================================
// إضافة للسلة
// =====================================================

function addCart(
  item,
  data = {}
) {

  if (!item) {

    return;

  }


  const type =
    data.type ||
    item.type ||
    "fixed";


  let cartItem = {

    id:
      item.id,

    name:
      item.name,

    type:
      type,

    qty:
      1,

    price:
      Number(
        data.price ??
        item.price ??
        0
      ),

    total:
      Number(
        data.total ??
        data.price ??
        item.price ??
        0
      )

  };


  if (
    type ===
    "weight"
  ) {

    cartItem.weight =
      Number(
        data.weight || 0
      );

    cartItem.cooking =
      data.cooking ||
      "ني";

  }


  if (
    type ===
    "size"
  ) {

    cartItem.size =
      data.size ||
      "";

  }


  if (
    type ===
    "meal"
  ) {

    cartItem.choice =
      data.choice ||
      "";

  }


  if (
    type ===
    "offer"
  ) {

    cartItem.offerItems =
      Array.isArray(
        item.offerItems
      )
        ? [...item.offerItems]
        : [];

  }


  // ---------------------------------------------------
  // الأصناف الثابتة تندمج بالكمية
  // ---------------------------------------------------

  if (
    type ===
    "fixed" ||
    type ===
    "offer"
  ) {

    const existing =
      cart.find(
        function(existingItem) {

          return (
            existingItem.id ===
            cartItem.id &&
            existingItem.type ===
            cartItem.type
          );

        }
      );


    if (existing) {

      existing.qty +=
        1;

      existing.total =
        Number(
          existing.price
        ) *
        existing.qty;

    }

    else {

      cart.push(
        cartItem
      );

    }

  }

  else {

    cart.push(
      cartItem
    );

  }


  updateCart();

}


// =====================================================
// تحديث السلة
// =====================================================

function updateCart() {

  const container =
    document.getElementById(
      "cart"
    );


  const totalElement =
    document.getElementById(
      "cartTotal"
    );


  if (!container) {

    return;

  }


  if (!cart.length) {

    container.innerHTML = `

      <div class="empty-state">

        السلة فارغة

      </div>

    `;


    if (totalElement) {

      totalElement.textContent =
        "$0.00";

    }


    return;

  }


  container.innerHTML =
    cart
      .map(
        function(item,index) {

          let details =
            "";


          if (
            item.type ===
            "weight"
          ) {

            details =
              `
                <small>
                  ${escapeHtml(
                    item.cooking
                  )}
                  ·
                  ${Number(
                    item.weight || 0
                  ).toFixed(2)}
                  كغ
                  ·
                  $${money(
                    item.price
                  )}/كغ
                </small>
              `;

          }


          if (
            item.type ===
            "size"
          ) {

            details =
              `
                <small>
                  ${escapeHtml(
                    item.size
                  )}
                </small>
              `;

          }


          if (
            item.type ===
            "meal"
          ) {

            details =
              `
                <small>
                  ${escapeHtml(
                    item.choice
                  )}
                </small>
              `;

          }


          return `

            <div class="cart-item">

              <div class="cart-item-info">

                <strong>
                  ${escapeHtml(
                    item.name
                  )}
                </strong>

                ${details}

                <div>
                  الكمية:
                  ${item.qty}
                </div>

              </div>


              <div class="cart-item-actions">

                <b>
                  $${money(
                    item.total
                  )}
                </b>

                <button
                  onclick="duplicateCart(${index})"
                >
                  +
                </button>

                <button
                  onclick="removeCart(${index})"
                >
                  ✕
                </button>

              </div>

            </div>

          `;

        }
      )
      .join("");


  const total =
    cart.reduce(
      function(
        sum,
        item
      ) {

        return (
          sum +
          Number(
            item.total || 0
          )
        );

      },
      0
    );


  if (totalElement) {

    totalElement.textContent =
      `$${money(total)}`;

  }

}


// =====================================================
// تكرار صنف
// =====================================================

function duplicateCart(
  index
) {

  const item =
    cart[index];


  if (!item) {

    return;

  }


  if (
    item.type ===
    "weight"
  ) {

    const menuItem =
      menu.find(
        function(menuItem) {

          return (
            menuItem.id ===
            item.id
          );

        }
      );


    if (menuItem) {

      openWeightModal(
        menuItem
      );

    }

    return;

  }


  if (
    item.type ===
    "size"
  ) {

    const menuItem =
      menu.find(
        function(menuItem) {

          return (
            menuItem.id ===
            item.id
          );

        }
      );


    if (menuItem) {

      addSizedItem(
        menuItem.id,
        item.size
      );

    }

    return;

  }


  if (
    item.type ===
    "meal"
  ) {

    const menuItem =
      menu.find(
        function(menuItem) {

          return (
            menuItem.id ===
            item.id
          );

        }
      );


    if (menuItem) {

      addMealItem(
        menuItem.id,
        item.choice,
        item.price
      );

    }

    return;

  }


  item.qty +=
    1;


  item.total =
    Number(
      item.price || 0
    ) *
    item.qty;


  updateCart();

}


// =====================================================
// حذف من السلة
// =====================================================

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


// =====================================================
// تفريغ الطلب
// =====================================================

function clearOrder() {

  cart =
    [];


  selectedOrderType =
    "";


  const nameInput =
    document.getElementById(
      "name"
    );

  const phoneInput =
    document.getElementById(
      "phone"
    );

  const addressInput =
    document.getElementById(
      "address"
    );

  const notesInput =
    document.getElementById(
      "notes"
    );


  if (nameInput) {

    nameInput.value =
      "";

  }


  if (phoneInput) {

    phoneInput.value =
      "";

  }


  if (addressInput) {

    addressInput.value =
      "";

  }


  if (notesInput) {

    notesInput.value =
      "";

  }


  const buttons =
    document.querySelectorAll(
      ".order-type-btn"
    );


  buttons.forEach(
    function(button) {

      button.classList.remove(
        "active"
      );

    }
  );


  showCustomerMessage(
    "أدخل رقم الهاتف للبحث عن الزبون"
  );


  updateCart();

}
// =====================================================
// Part 4 / 6
// Customers + Offline Orders + Sync
// =====================================================


// =====================================================
// مفتاح رقم الهاتف
// =====================================================

function customerPhoneKey(phone) {

  return normalizePhone(phone);

}


// =====================================================
// تحميل الزبائن المحفوظين محلياً
// =====================================================

function getLocalCustomers() {

  try {

    const data =
      JSON.parse(
        localStorage.getItem(
          CUSTOMER_STORAGE_KEY
        ) || "{}"
      );


    if (
      data &&
      typeof data === "object"
    ) {

      return data;

    }

  }

  catch (error) {

    console.error(
      "Local customers error:",
      error
    );

  }


  return {};

}


// =====================================================
// حفظ الزبائن محلياً
// =====================================================

function saveLocalCustomers(
  customers
) {

  localStorage.setItem(
    CUSTOMER_STORAGE_KEY,
    JSON.stringify(
      customers
    )
  );

}


// =====================================================
// البحث عن الزبون
// =====================================================

async function findCustomerByPhone(
  phone
) {

  const normalizedPhone =
    customerPhoneKey(
      phone
    );


  if (
    !normalizedPhone ||
    normalizedPhone.length < 6
  ) {

    return null;

  }


  // ---------------------------------------------------
  // أولاً: البحث محلياً
  // ---------------------------------------------------

  const localCustomers =
    getLocalCustomers();


  if (
    localCustomers[
      normalizedPhone
    ]
  ) {

    return localCustomers[
      normalizedPhone
    ];

  }


  // ---------------------------------------------------
  // ثانياً: البحث على Supabase
  // ---------------------------------------------------

  if (
    !navigator.onLine
  ) {

    return null;

  }


  try {

    const encodedPhone =
      encodeURIComponent(
        normalizedPhone
      );


    const response =
      await fetch(
        `${SUPABASE_URL}/rest/v1/customers` +
        `?select=*` +
        `&phone=eq.${encodedPhone}` +
        `&limit=1`,
        {

          method: "GET",

          headers: {

            "apikey":
              SUPABASE_KEY,

            "Authorization":
              `Bearer ${SUPABASE_KEY}`

          }

        }
      );


    if (!response.ok) {

      throw new Error(
        "Customer lookup failed"
      );

    }


    const rows =
      await response.json();


    if (
      Array.isArray(rows) &&
      rows.length > 0
    ) {

      const customer =
        rows[0];


      // حفظ نسخة محلية
      localCustomers[
        normalizedPhone
      ] =
        customer;


      saveLocalCustomers(
        localCustomers
      );


      return customer;

    }

  }

  catch (error) {

    console.error(
      "Customer lookup error:",
      error
    );

  }


  return null;

}


// =====================================================
// تعبئة بيانات الزبون
// =====================================================

function fillCustomerFields(
  customer
) {

  const nameInput =
    document.getElementById(
      "name"
    );

  const phoneInput =
    document.getElementById(
      "phone"
    );

  const addressInput =
    document.getElementById(
      "address"
    );

  const notesInput =
    document.getElementById(
      "notes"
    );


  if (
    !customer
  ) {

    showCustomerMessage(
      navigator.onLine
        ? "🆕 زبون جديد"
        : "🆕 زبون جديد — سيُحفظ عند تأكيد الطلب"
    );

    return;

  }


  if (nameInput) {

    nameInput.value =
      customer.name || "";

  }


  if (phoneInput) {

    phoneInput.value =
      customer.phone || "";

  }


  if (addressInput) {

    addressInput.value =
      customer.address || "";

  }


  if (notesInput) {

    notesInput.value =
      customer.notes || "";

  }


  showCustomerMessage(
    "✅ زبون معروف — تم جلب بياناته تلقائياً"
  );

}


// =====================================================
// رسالة الزبون
// =====================================================

function showCustomerMessage(
  message
) {

  const box =
    document.getElementById(
      "customerMessage"
    );


  if (!box) {

    return;

  }


  box.textContent =
    message;

}


// =====================================================
// البحث التلقائي برقم الهاتف
// =====================================================

function setupCustomerSearch() {

  const phoneInput =
    document.getElementById(
      "phone"
    );


  if (!phoneInput) {

    return;

  }


  let timer =
    null;


  async function searchCustomer() {

    const phone =
      customerPhoneKey(
        phoneInput.value
      );


    if (
      phone.length < 6
    ) {

      return;

    }


    showCustomerMessage(
      "🔎 البحث عن الزبون..."
    );


    const customer =
      await findCustomerByPhone(
        phone
      );


    if (customer) {

      fillCustomerFields(
        customer
      );

    }

    else {

      showCustomerMessage(
        navigator.onLine
          ? "🆕 زبون جديد"
          : "🆕 زبون جديد — سيُحفظ عند تأكيد الطلب"
      );

    }

  }


  phoneInput.addEventListener(
    "input",
    function() {

      clearTimeout(
        timer
      );


      timer =
        setTimeout(
          searchCustomer,
          500
        );

    }
  );


  phoneInput.addEventListener(
    "blur",
    function() {

      searchCustomer();

    }
  );

}


// =====================================================
// حفظ الزبون
// =====================================================

async function saveCustomer() {

  const phone =
    customerPhoneKey(
      document.getElementById(
        "phone"
      )?.value
    );


  if (!phone) {

    return null;

  }


  const customer = {

    phone:
      phone,

    name:
      document.getElementById(
        "name"
      )?.value.trim() || "",

    address:
      document.getElementById(
        "address"
      )?.value.trim() || "",

    notes:
      document.getElementById(
        "notes"
      )?.value.trim() || ""

  };


  // ---------------------------------------------------
  // حفظ محلي فوراً
  // ---------------------------------------------------

  const localCustomers =
    getLocalCustomers();


  localCustomers[
    phone
  ] =
    customer;


  saveLocalCustomers(
    localCustomers
  );


  // ---------------------------------------------------
  // حفظ Cloud إذا يوجد إنترنت
  // ---------------------------------------------------

  if (
    navigator.onLine
  ) {

    try {

      const response =
        await fetch(
          `${SUPABASE_URL}/rest/v1/customers`,
          {

            method: "POST",

            headers: {

              "Content-Type":
                "application/json",

              "apikey":
                SUPABASE_KEY,

              "Authorization":
                `Bearer ${SUPABASE_KEY}`,

              "Prefer":
                "resolution=merge-duplicates,return=minimal"

            },

            body:
              JSON.stringify(
                customer
              )

          }
        );


      if (!response.ok) {

        console.error(
          "Cloud customer save failed:",
          await response.text()
        );

      }

    }

    catch (error) {

      console.error(
        "Cloud customer save error:",
        error
      );

    }

  }


  return customer;

}


// =====================================================
// الطلبات المحفوظة Offline
// =====================================================

function getPendingOrders() {

  try {

    const orders =
      JSON.parse(
        localStorage.getItem(
          PENDING_ORDERS_KEY
        ) || "[]"
      );


    if (
      Array.isArray(
        orders
      )
    ) {

      return orders;

    }

  }

  catch (error) {

    console.error(
      "Pending orders error:",
      error
    );

  }


  return [];

}


// =====================================================
// حفظ الطلبات Offline
// =====================================================

function savePendingOrders(
  orders
) {

  localStorage.setItem(
    PENDING_ORDERS_KEY,
    JSON.stringify(
      orders
    )
  );

}


// =====================================================
// إضافة طلب إلى Queue
// =====================================================

function queueOrder(
  order
) {

  const orders =
    getPendingOrders();


  orders.push(
    order
  );


  savePendingOrders(
    orders
  );

}


// =====================================================
// إرسال الطلب إلى Supabase
// =====================================================

async function sendOrder(
  order
) {

  const response =
    await fetch(
      `${SUPABASE_URL}/rest/v1/orders`,
      {

        method: "POST",

        headers: {

          "Content-Type":
            "application/json",

          "apikey":
            SUPABASE_KEY,

          "Authorization":
            `Bearer ${SUPABASE_KEY}`,

          "Prefer":
            "return=minimal"

        },

        body:
          JSON.stringify(
            order
          )

      }
    );


  if (!response.ok) {

    throw new Error(
      await response.text()
    );

  }

}


// =====================================================
// مزامنة الطلبات
// =====================================================

async function syncNow() {

  if (
    !navigator.onLine
  ) {

    updateConnectionStatus();

    return;

  }


  const pending =
    getPendingOrders();


  if (
    !pending.length
  ) {

    updateConnectionStatus();

    return;

  }


  const remaining =
    [];


  for (
    const order of pending
  ) {

    try {

      await sendOrder(
        order
      );

    }

    catch (error) {

      console.error(
        "Order sync error:",
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


  updateConnectionStatus();

}


// =====================================================
// حالة الاتصال
// =====================================================

function updateConnectionStatus() {

  const badge =
    document.getElementById(
      "connectionStatus"
    );


  if (!badge) {

    return;

  }


  if (
    navigator.onLine
  ) {

    badge.textContent =
      "🟢 متصل";

    badge.className =
      "status-badge status-online";

  }

  else {

    badge.textContent =
      "🔴 Offline";

    badge.className =
      "status-badge status-offline";

  }

}
// =====================================================
// Part 5 / 6
// Confirm Order + Invoice + Previous Orders
// =====================================================


// =====================================================
// تأكيد الطلب
// =====================================================

async function confirmOrder() {

  if (!selectedOrderType) {

    alert(
      "اختر نوع الطلب"
    );

    return;

  }


  if (!cart.length) {

    alert(
      "أضف صنفاً للطلب"
    );

    return;

  }


  const customerPhone =
    customerPhoneKey(
      document.getElementById(
        "phone"
      )?.value
    );


  const total =
    cart.reduce(
      function(
        sum,
        item
      ) {

        return (
          sum +
          Number(
            item.total || 0
          )
        );

      },
      0
    );


  const order = {

    id:
      crypto.randomUUID(),

    order_type:
      selectedOrderType,

    customer_name:
      document.getElementById(
        "name"
      )?.value.trim() ||
      null,

    customer_phone:
      customerPhone ||
      null,

    customer_address:
      document.getElementById(
        "address"
      )?.value.trim() ||
      null,

    notes:
      document.getElementById(
        "notes"
      )?.value.trim() ||
      null,

    items:
      cart,

    total:
      Number(
        total.toFixed(2)
      ),

    device_id:
      deviceId,

    sync_status:
      navigator.onLine
        ? "synced"
        : "pending",

    created_at:
      new Date().toISOString()

  };


  try {

    // -------------------------------------------------
    // حفظ الزبون
    // -------------------------------------------------

    if (customerPhone) {

      await saveCustomer();

    }


    // -------------------------------------------------
    // حفظ الطلب
    // -------------------------------------------------

    if (navigator.onLine) {

      try {

        await sendOrder(
          order
        );

      }

      catch (orderError) {

        console.error(
          "Online order failed:",
          orderError
        );


        order.sync_status =
          "pending";


        queueOrder(
          order
        );


        alert(
          "⚠️ تعذر إرسال الطلب للسيرفر. تم حفظه وسيتم إرساله تلقائياً عند عودة الاتصال."
        );


        printInvoice(
          order
        );


        clearOrder();

        return;

      }


      alert(
        "✅ تم حفظ الطلب بنجاح"
      );


      printInvoice(
        order
      );

    }

    else {

      order.sync_status =
        "pending";


      queueOrder(
        order
      );


      alert(
        "📴 تم حفظ الطلب Offline وسيتم إرساله عند عودة الإنترنت."
      );


      printInvoice(
        order
      );

    }


    clearOrder();

  }

  catch (error) {

    console.error(
      "Confirm order error:",
      error
    );


    // إذا صار خطأ غير متوقع
    // نحفظ الطلب محلياً

    order.sync_status =
      "pending";


    queueOrder(
      order
    );


    alert(
      "⚠️ حصل خطأ. تم حفظ الطلب محلياً."
    );


    printInvoice(
      order
    );


    clearOrder();

  }

}


// =====================================================
// طباعة الفاتورة
// =====================================================

function printInvoice(
  order
) {

  if (!order) {

    return;

  }


  const items =
    Array.isArray(
      order.items
    )
      ? order.items
      : [];


  const itemsHtml =
    items
      .map(
        function(item) {

          let description =
            item.name || "";


          if (
            item.type ===
            "weight"
          ) {

            description +=
              `
                <br>
                <small>
                  ${escapeHtml(
                    item.cooking || "ني"
                  )}
                  -
                  ${Number(
                    item.weight || 0
                  ).toFixed(2)}
                  كغ
                </small>
              `;

          }


          if (
            item.type ===
            "size"
          ) {

            description +=
              `
                <br>
                <small>
                  ${escapeHtml(
                    item.size || ""
                  )}
                </small>
              `;

          }


          if (
            item.type ===
            "meal"
          ) {

            description +=
              `
                <br>
                <small>
                  ${escapeHtml(
                    item.choice || ""
                  )}
                </small>
              `;

          }


          return `

            <tr>

              <td>
                ${escapeHtml(
                  description
                )}
              </td>

              <td>
                ${Number(
                  item.qty || 1
                )}
              </td>

              <td>
                $${money(
                  item.total || 0
                )}
              </td>

            </tr>

          `;

        }
      )
      .join("");


  const printWindow =
    window.open(
      "",
      "_blank",
      "width=420,height=700"
    );


  if (!printWindow) {

    alert(
      "⚠️ المتصفح منع نافذة الطباعة. اسمح بالنوافذ المنبثقة."
    );

    return;

  }


  const date =
    new Date(
      order.created_at ||
      Date.now()
    ).toLocaleString(
      "ar-LB"
    );


  printWindow.document.open();


  printWindow.document.write(`

    <!DOCTYPE html>

    <html
      lang="ar"
      dir="rtl"
    >

    <head>

      <meta charset="UTF-8">

      <title>
        Tabbara Seafood
      </title>

      <style>

        * {
          box-sizing: border-box;
        }

        body {

          width: 80mm;

          margin: 0 auto;

          padding: 5mm;

          font-family:
            Arial,
            Tahoma,
            sans-serif;

          font-size: 12px;

          color: #000;

          direction: rtl;

        }

        .header {

          text-align: center;

          margin-bottom: 8px;

        }

        .header h1 {

          margin: 0;

          font-size: 20px;

        }

        .header div {

          margin-top: 3px;

          font-size: 11px;

        }

        .line {

          border-top:
            1px dashed #000;

          margin:
            7px 0;

        }

        .info {

          font-size: 11px;

          line-height: 1.7;

        }

        table {

          width: 100%;

          border-collapse:
            collapse;

          margin-top: 5px;

        }

        th,
        td {

          padding:
            4px 1px;

          vertical-align:
            top;

          text-align:
            right;

        }

        th {

          border-bottom:
            1px solid #000;

        }

        td:nth-child(2) {

          text-align:
            center;

          width:
            15%;

        }

        td:nth-child(3) {

          text-align:
            left;

          width:
            25%;

        }

        .total {

          font-size: 18px;

          font-weight: bold;

          text-align: center;

          margin-top: 8px;

        }

        .footer {

          text-align: center;

          margin-top: 12px;

          font-size: 11px;

        }

        .print-button {

          display: block;

          margin: 15px auto;

          padding: 10px 20px;

          font-size: 15px;

          cursor: pointer;

        }

        @media print {

          .print-button {

            display: none;

          }

          body {

            width: 80mm;

            margin: 0;

          }

        }

      </style>

    </head>


    <body>

      <div class="header">

        <h1>
          🐟 Tabbara Seafood
        </h1>

        <div>
          Restaurant POS
        </div>

      </div>


      <div class="line"></div>


      <div class="info">

        <div>
          <b>نوع الطلب:</b>
          ${escapeHtml(
            order.order_type || ""
          )}
        </div>

        <div>
          <b>التاريخ:</b>
          ${escapeHtml(
            date
          )}
        </div>

        ${
          order.customer_name
            ? `
              <div>
                <b>الزبون:</b>
                ${escapeHtml(
                  order.customer_name
                )}
              </div>
            `
            : ""
        }

        ${
          order.customer_phone
            ? `
              <div>
                <b>الهاتف:</b>
                ${escapeHtml(
                  order.customer_phone
                )}
              </div>
            `
            : ""
        }

        ${
          order.customer_address
            ? `
              <div>
                <b>العنوان:</b>
                ${escapeHtml(
                  order.customer_address
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

            <th>
              الصنف
            </th>

            <th>
              ك
            </th>

            <th>
              السعر
            </th>

          </tr>

        </thead>


        <tbody>

          ${itemsHtml}

        </tbody>

      </table>


      <div class="line"></div>


      <div class="total">

        المجموع:
        $${money(
          order.total || 0
        )}

      </div>


      ${
        order.notes
          ? `
            <div class="line"></div>

            <div class="info">

              <b>
                ملاحظات:
              </b>

              ${escapeHtml(
                order.notes
              )}

            </div>
          `
          : ""
      }


      <div class="footer">

        شكراً لزيارتكم ❤️

      </div>


      <button
        class="print-button"
        onclick="window.print()"
      >

        🖨️ طباعة الفاتورة

      </button>


      <script>

        window.onload =
          function() {

            setTimeout(
              function() {

                window.print();

              },
              300
            );

          };

      <\/script>

    </body>

    </html>

  `);


  printWindow.document.close();

}


// =====================================================
// الطلبات السابقة
// =====================================================

async function showPreviousOrders() {

  if (!navigator.onLine) {

    alert(
      "📴 الطلبات السابقة تحتاج إلى الإنترنت حالياً."
    );

    return;

  }


  try {

    const response =
      await fetch(
        `${SUPABASE_URL}/rest/v1/orders` +
        `?select=*` +
        `&order=created_at.desc` +
        `&limit=50`,
        {

          method: "GET",

          headers: {

            "apikey":
              SUPABASE_KEY,

            "Authorization":
              `Bearer ${SUPABASE_KEY}`

          }

        }
      );


    if (!response.ok) {

      throw new Error(
        await response.text()
      );

    }


    const orders =
      await response.json();


    if (
      !orders.length
    ) {

      modal(
        "📋 الطلبات السابقة",
        `
          <div class="empty-state">
            لا توجد طلبات بعد.
          </div>
        `
      );

      return;

    }


    const html =
      orders
        .map(
          function(order) {

            const date =
              new Date(
                order.created_at
              ).toLocaleString(
                "ar-LB"
              );


            const items =
              Array.isArray(
                order.items
              )
                ? order.items
                : [];


            const itemText =
              items
                .map(
                  function(item) {

                    let text =
                      escapeHtml(
                        item.name || ""
                      );


                    if (
                      item.type ===
                      "weight"
                    ) {

                      text +=
                        `
                          - ${escapeHtml(
                            item.cooking || "ني"
                          )}
                          -
                          ${Number(
                            item.weight || 0
                          ).toFixed(2)}
                          كغ
                        `;

                    }


                    if (
                      item.type ===
                      "size"
                    ) {

                      text +=
                        `
                          - ${escapeHtml(
                            item.size || ""
                          )}
                        `;

                    }


                    if (
                      item.type ===
                      "meal"
                    ) {

                      text +=
                        `
                          - ${escapeHtml(
                            item.choice || ""
                          )}
                        `;

                    }


                    return `
                      <div>
                        ${text}
                        ×
                        ${Number(
                          item.qty || 1
                        )}
                      </div>
                    `;

                  }
                )
                .join("");


            return `

              <div
                class="manager-card"
              >

                <h4>
                  🧾 طلب
                </h4>

                <small>
                  ${escapeHtml(
                    date
                  )}
                </small>

                <hr>

                <div>

                  <b>
                    النوع:
                  </b>

                  ${escapeHtml(
                    order.order_type || ""
                  )}

                </div>


                ${
                  order.customer_name
                    ? `
                      <div>
                        <b>
                          الزبون:
                        </b>

                        ${escapeHtml(
                          order.customer_name
                        )}
                      </div>
                    `
                    : ""
                }


                ${
                  order.customer_phone
                    ? `
                      <div>
                        <b>
                          الهاتف:
                        </b>

                        ${escapeHtml(
                          order.customer_phone
                        )}
                      </div>
                    `
                    : ""
                }


                ${
                  order.customer_address
                    ? `
                      <div>
                        <b>
                          العنوان:
                        </b>

                        ${escapeHtml(
                          order.customer_address
                        )}
                      </div>
                    `
                    : ""
                }


                <hr>


                ${itemText}


                <hr>


                <strong>

                  المجموع:
                  $${money(
                    order.total || 0
                  )}

                </strong>


                <br><br>


                <button
                  class="primary"
                  onclick='printInvoice(${JSON.stringify(
                    order
                  ).replace(
                    /'/g,
                    "&#39;"
                  )})'
                >

                  🖨️ طباعة

                </button>

              </div>

            `;

          }
        )
        .join("");


    modal(
      "📋 الطلبات السابقة",
      `
        <div class="manager-grid">
          ${html}
        </div>
      `
    );

  }

  catch (error) {

    console.error(
      "Previous orders error:",
      error
    );


    alert(
      "⚠️ تعذر تحميل الطلبات السابقة."
    );

  }

}


// =====================================================
// توافق اسم زر الطلبات السابقة
// =====================================================

function showOrders() {

  showPreviousOrders();

}
// =====================================================
// Part 6 / 6
// Menu Manager + Offers + Connection + Start
// =====================================================


// =====================================================
// إدارة المنيو
// =====================================================

function showMenuManager() {

  const normalItems =
    menu.filter(
      function(item) {
        return item.category !== "العروض";
      }
    );


  const offers =
    menu.filter(
      function(item) {
        return item.category === "العروض";
      }
    );


  const cards =
    normalItems.map(
      function(item) {

        const index =
          menu.indexOf(item);


        return `
          <div class="manager-card">

            <h4>
              ${escapeHtml(item.name)}
              ${item.available ? "🟢" : "🔴"}
            </h4>

            <small>
              ${escapeHtml(item.category)}
            </small>

            <br><br>

            <button
              class="primary"
              onclick="editMenuItem(${index},false)"
            >
              ✏️ تعديل
            </button>

            <button
              onclick="toggleAvailable(${index})"
            >
              ${
                item.available
                  ? "🔴 خلص"
                  : "🟢 متوفر"
              }
            </button>

          </div>
        `;

      }
    ).join("");


  const offerCards =
    offers.length

      ? offers.map(
          function(offer) {

            const index =
              menu.indexOf(offer);


            const included =
              Array.isArray(
                offer.offerItems
              )

                ? offer.offerItems
                    .map(
                      function(id) {

                        const includedItem =
                          menu.find(
                            function(m) {
                              return m.id === id;
                            }
                          );


                        return includedItem
                          ? escapeHtml(
                              includedItem.name
                            )
                          : "";

                      }
                    )
                    .filter(Boolean)
                    .join("، ")

                : "";


            return `
              <div class="manager-card">

                <h4>
                  🎁 ${escapeHtml(offer.name)}
                  ${offer.available ? "🟢" : "🔴"}
                </h4>

                <div>
                  السعر:
                  <b>
                    $${money(offer.price || 0)}
                  </b>
                </div>

                <br>

                <div>
                  <small>
                    الأصناف:
                    ${
                      included ||
                      "لم يتم تحديد أصناف"
                    }
                  </small>
                </div>

                <br>

                <button
                  class="primary"
                  onclick="editMenuItem(${index},true)"
                >
                  ✏️ تعديل العرض
                </button>

                <button
                  onclick="toggleAvailable(${index})"
                >
                  ${
                    offer.available
                      ? "🔴 إيقاف"
                      : "🟢 تفعيل"
                  }
                </button>

              </div>
            `;

          }
        ).join("")

      : `
          <p>
            لا توجد عروض حالياً.
          </p>
        `;


  modal(
    "⚙️ إدارة المنيو",
    `

      <button
        class="primary"
        onclick="newMenuItem()"
      >
        ➕ إضافة صنف
      </button>

      <button
        onclick="newOffer()"
      >
        🎁 إضافة عرض
      </button>

      <hr>

      <h3>
        🎁 العروض
      </h3>

      <div class="manager-grid">
        ${offerCards}
      </div>

      <hr>

      <h3>
        🍽️ الأصناف
      </h3>

      <div class="manager-grid">
        ${cards}
      </div>

    `
  );

}


// =====================================================
// تغيير توفر الصنف
// =====================================================

function toggleAvailable(index) {

  if (!menu[index]) {
    return;
  }


  menu[index].available =
    !menu[index].available;


  saveMenu();


  renderCategories();


  showCategory(
    currentCategory ||
    CATEGORIES[0]
  );


  showMenuManager();

}


// =====================================================
// صنف جديد
// =====================================================

function newMenuItem() {

  editMenuItem(
    -1,
    false
  );

}


// =====================================================
// عرض جديد
// =====================================================

function newOffer() {

  editMenuItem(
    -1,
    true
  );

}


// =====================================================
// تعديل صنف / عرض
// =====================================================

function editMenuItem(
  index,
  isOffer = false
) {

  const existing =
    index >= 0
      ? menu[index]
      : null;


  const item =
    existing
      ? JSON.parse(
          JSON.stringify(existing)
        )
      : {

          id:
            "item_" +
            Date.now(),

          name:
            "",

          category:
            isOffer
              ? "العروض"
              : "🐟 الأسماك",

          type:
            "fixed",

          price:
            0,

          available:
            true

        };


  const categories =
    CATEGORIES.filter(
      function(category) {

        return category !==
          "🎁 العروض";

      }
    );


  const categoryOptions =
    categories
      .map(
        function(category) {

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

        }
      )
      .join("");


  let offerSection =
    "";


  if (isOffer) {

    const selectableItems =
      menu.filter(
        function(menuItem) {

          return (
            menuItem.category !==
            "🎁 العروض"
          );

        }
      );


    offerSection = `

      <hr>

      <h3>
        🧾 أصناف العرض
      </h3>

      <div class="offer-checklist">

        ${
          selectableItems.length

            ? selectableItems
                .map(
                  function(menuItem) {

                    const checked =
                      Array.isArray(
                        item.offerItems
                      ) &&
                      item.offerItems.includes(
                        menuItem.id
                      );


                    return `
                      <label
                        class="offer-check"
                      >

                        <input
                          type="checkbox"
                          class="offer-item-check"
                          value="${escapeHtml(
                            menuItem.id
                          )}"
                          ${
                            checked
                              ? "checked"
                              : ""
                          }
                        >

                        <span>
                          ${escapeHtml(
                            menuItem.name
                          )}
                        </span>

                      </label>
                    `;

                  }
                )
                .join("")

            : `
                <p>
                  لا توجد أصناف.
                </p>
              `
        }

      </div>

    `;

  }


  modal(
    isOffer
      ? "🎁 تعديل العرض"
      : "✏️ تعديل الصنف",

    `

      <div class="form-row">

        <label>
          الاسم
        </label>

        <input
          id="mName"
          value="${escapeHtml(
            item.name || ""
          )}"
          placeholder="اسم الصنف"
        >

      </div>


      ${
        isOffer
          ? `
              <div class="form-row">

                <label>
                  سعر العرض
                </label>

                <input
                  id="mPrice"
                  type="number"
                  step="0.01"
                  min="0"
                  value="${Number(
                    item.price || 0
                  )}"
                >

              </div>
            `
          : `

              <div class="form-row">

                <label>
                  التصنيف
                </label>

                <select id="mCategory">

                  ${categoryOptions}

                </select>

              </div>


              <div class="form-row">

                <label>
                  نوع التسعير
                </label>

                <select
                  id="mPricing"
                  onchange="renderPricingFields()"
                >

                  <option
                    value="fixed"
                    ${
                      item.type === "fixed"
                        ? "selected"
                        : ""
                    }
                  >
                    سعر ثابت
                  </option>

                  <option
                    value="weight"
                    ${
                      item.type === "weight"
                        ? "selected"
                        : ""
                    }
                  >
                    حسب الوزن
                  </option>

                  <option
                    value="sizes"
                    ${
                      item.type === "sizes"
                        ? "selected"
                        : ""
                    }
                  >
                    أحجام
                  </option>

                  <option
                    value="meal"
                    ${
                      item.type === "meal"
                        ? "selected"
                        : ""
                    }
                  >
                    وجبة / ساندويش
                  </option>

                </select>

              </div>


              <div id="pricingFields"></div>

            `
      }


      ${offerSection}


      <div class="form-row">

        <label>
          الحالة
        </label>

        <select id="mAvailable">

          <option
            value="true"
            ${
              item.available !== false
                ? "selected"
                : ""
            }
          >
            🟢 متوفر
          </option>

          <option
            value="false"
            ${
              item.available === false
                ? "selected"
                : ""
            }
          >
            🔴 خلص
          </option>

        </select>

      </div>


      <br>


      <button
        class="primary"
        onclick="saveMenuForm(${index},${isOffer})"
      >
        💾 حفظ
      </button>


      ${
        index >= 0
          ? `
              <button
                onclick="deleteMenuItem(${index})"
              >
                🗑️ حذف
              </button>
            `
          : ""
      }

    `
  );


  if (!isOffer) {

    setTimeout(
      function() {

        renderPricingFields(
          item
        );

      },
      0
    );

  }

}


// =====================================================
// حقول الأسعار
// =====================================================

function renderPricingFields(
  sourceItem = null
) {

  const box =
    document.getElementById(
      "pricingFields"
    );


  const type =
    document.getElementById(
      "mPricing"
    )?.value;


  if (
    !box ||
    !type
  ) {

    return;

  }


  const name =
    document.getElementById(
      "mName"
    )?.value.trim();


  const current =
    sourceItem ||
    menu.find(
      function(item) {

        return (
          item.name === name
        );

      }
    ) ||
    {};


  if (
    type === "fixed"
  ) {

    box.innerHTML = `

      <div class="form-row">

        <label>
          السعر
        </label>

        <input
          id="mFixedPrice"
          type="number"
          min="0"
          step="0.01"
          value="${Number(
            current.price || 0
          )}"
        >

      </div>

    `;

    return;

  }


  if (
    type === "weight"
  ) {

    const pricing =
      current.pricing ||
      {};


    box.innerHTML = `

      <div class="form-row">

        <label>
          سعر الكيلو
        </label>

        <input
          id="mBasePrice"
          type="number"
          min="0"
          step="0.01"
          value="${Number(
            pricing.base || 0
          )}"
        >

      </div>


      <div class="form-row">

        <label>
          زيادة المشوي
        </label>

        <input
          id="mGrill"
          type="number"
          min="0"
          step="0.01"
          value="${Number(
            pricing.grill || 0
          )}"
        >

      </div>


      <div class="form-row">

        <label>
          زيادة المقلي
        </label>

        <input
          id="mFry"
          type="number"
          min="0"
          step="0.01"
          value="${Number(
            pricing.fry || 0
          )}"
        >

      </div>

    `;

    return;

  }


  if (
    type === "sizes"
  ) {

    const sizes =
      current.sizes ||
      {};


    const thirdKey =
      name ===
      "ثمار البحر"
        ? "سطل"
        : "كبير";


    const thirdLabel =
      thirdKey;


    box.innerHTML = `

      <div class="form-row">

        <label>
          صغير
        </label>

        <input
          id="mSmall"
          type="number"
          min="0"
          step="0.01"
          value="${Number(
            sizes.صغير || 0
          )}"
        >

      </div>


      <div class="form-row">

        <label>
          وسط
        </label>

        <input
          id="mMedium"
          type="number"
          min="0"
          step="0.01"
          value="${Number(
            sizes.وسط || 0
          )}"
        >

      </div>


      <div class="form-row">

        <label>
          ${escapeHtml(
            thirdLabel
          )}
        </label>

        <input
          id="mLarge"
          type="number"
          min="0"
          step="0.01"
          value="${Number(
            sizes[thirdKey] || 0
          )}"
        >

      </div>

    `;

    return;

  }


  if (
    type === "meal"
  ) {

    const prices =
      current.prices ||
      {};


    box.innerHTML = `

      <div class="form-row">

        <label>
          سعر الوجبة
        </label>

        <input
          id="mMeal"
          type="number"
          min="0"
          step="0.01"
          value="${Number(
            prices.وجبة || 0
          )}"
        >

      </div>


      <div class="form-row">

        <label>
          سعر الساندويش
        </label>

        <input
          id="mSandwich"
          type="number"
          min="0"
          step="0.01"
          value="${Number(
            prices.ساندويش || 0
          )}"
        >

      </div>

    `;

  }

}


// =====================================================
// حفظ تعديل المنيو
// =====================================================

function saveMenuForm(
  index,
  isOffer = false
) {

  const name =
    document.getElementById(
      "mName"
    )?.value.trim();


  if (!name) {

    alert(
      "اكتب اسم الصنف"
    );

    return;

  }


  const available =
    document.getElementById(
      "mAvailable"
    )?.value === "true";


  let item;


  if (
    index >= 0 &&
    menu[index]
  ) {

    item =
      menu[index];

  }

  else {

    item = {

      id:
        "item_" +
        Date.now(),

      name:
        name,

      category:
        isOffer
          ? "🎁 العروض"
          : "🐟 الأسماك",

      type:
        "fixed",

      price:
        0,

      available:
        available

    };

  }


  item.name =
    name;


  item.available =
    available;


  if (isOffer) {

    item.category =
      "🎁 العروض";

    item.type =
      "fixed";


    item.price =
      Number(
        document.getElementById(
          "mPrice"
        )?.value || 0
      );


    item.offerItems =
      Array.from(
        document.querySelectorAll(
          ".offer-item-check:checked"
        )
      ).map(
        function(input) {

          return input.value;

        }
      );

  }

  else {

    item.category =
      document.getElementById(
        "mCategory"
      ).value;


    const pricingType =
      document.getElementById(
        "mPricing"
      ).value;


    item.type =
      pricingType;


    if (
      pricingType ===
      "fixed"
    ) {

      item.price =
        Number(
          document.getElementById(
            "mFixedPrice"
          )?.value || 0
        );


      delete item.pricing;
      delete item.sizes;
      delete item.prices;

    }


    if (
      pricingType ===
      "weight"
    ) {

      item.pricing = {

        base:
          Number(
            document.getElementById(
              "mBasePrice"
            )?.value || 0
          ),

        grill:
          Number(
            document.getElementById(
              "mGrill"
            )?.value || 0
          ),

        fry:
          Number(
            document.getElementById(
              "mFry"
            )?.value || 0
          )

      };


      delete item.price;
      delete item.sizes;
      delete item.prices;

    }


    if (
      pricingType ===
      "sizes"
    ) {

      const thirdKey =
        name ===
        "ثمار البحر"
          ? "سطل"
          : "كبير";


      item.sizes = {

        صغير:
          Number(
            document.getElementById(
              "mSmall"
            )?.value || 0
          ),

        وسط:
          Number(
            document.getElementById(
              "mMedium"
            )?.value || 0
          )

      };


      item.sizes[
        thirdKey
      ] =
        Number(
          document.getElementById(
            "mLarge"
          )?.value || 0
        );


      delete item.price;
      delete item.pricing;
      delete item.prices;

    }


    if (
      pricingType ===
      "meal"
    ) {

      item.prices = {

        وجبة:
          Number(
            document.getElementById(
              "mMeal"
            )?.value || 0
          ),

        ساندويش:
          Number(
            document.getElementById(
              "mSandwich"
            )?.value || 0
          )

      };


      delete item.price;
      delete item.pricing;
      delete item.sizes;

    }

  }


  if (
    index < 0
  ) {

    menu.push(
      item
    );

  }


  saveMenu();


  closeModal();


  renderCategories();


  showCategory(
    currentCategory ||
    CATEGORIES[0]
  );


  alert(
    "✅ تم حفظ التعديل"
  );

}


// =====================================================
// حذف صنف
// =====================================================

function deleteMenuItem(
  index
) {

  if (
    !menu[index]
  ) {

    return;

  }


  const item =
    menu[index];


  if (
    !confirm(
      `هل تريد حذف "${item.name}"؟`
    )
  ) {

    return;

  }


  const deletedId =
    item.id;


  menu.splice(
    index,
    1
  );


  // إزالة الصنف المحذوف من العروض
  menu.forEach(
    function(menuItem) {

      if (
        Array.isArray(
          menuItem.offerItems
        )
      ) {

        menuItem.offerItems =
          menuItem.offerItems.filter(
            function(id) {

              return (
                id !==
                deletedId
              );

            }
          );

      }

    }
  );


  saveMenu();


  closeModal();


  renderCategories();


  showCategory(
    currentCategory ||
    CATEGORIES[0]
  );

}


// =====================================================
// زر الطلبات السابقة
// =====================================================

function openPreviousOrders() {

  showPreviousOrders();

}


// =====================================================
// الاتصال
// =====================================================

window.addEventListener(
  "online",
  function() {

    updateConnectionStatus();

    syncNow();

  }
);


window.addEventListener(
  "offline",
  function() {

    updateConnectionStatus();

  }
);


// =====================================================
// بدء التطبيق
// =====================================================

document.addEventListener(
  "DOMContentLoaded",
  function() {

    loadMenu();


    saveMenu();


    checkLogin();


    updateConnectionStatus();


    renderCategories();


    currentCategory =
      CATEGORIES[0];


    showCategory(
      currentCategory
    );


    setupCustomerSearch();


    updateCart();


    syncNow();

  }
);
