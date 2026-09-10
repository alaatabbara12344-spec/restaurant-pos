// =====================================================
// Tabbara Seafood POS
// Menu + Weight + Cooking + Sizes + Meals + Offers
// =====================================================

const SUPABASE_URL =
  "https://tpvhxauivmjgfcugpldp.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_0n__ZztsS8BQtdVn5lhmmA_WWuHjVg7";

const LOGIN_PASSWORD = "1234";


// =====================================================
// القائمة الأساسية
// =====================================================

const DEFAULT_MENU = [

  // -------------------------
  // الأسماك
  // -------------------------

  {
    id: "fish_ajag",
    name: "أجاج",
    category: "أسماك",
    pricing: "weight",
    base: 12,
    grill: 3,
    fry: 4,
    available: true
  },

  {
    id: "fish_boraq",
    name: "براق",
    category: "أسماك",
    pricing: "weight",
    base: 14,
    grill: 3,
    fry: 4,
    available: true
  },

  {
    id: "fish_sardine",
    name: "سردين",
    category: "أسماك",
    pricing: "weight",
    base: 8,
    grill: 2,
    fry: 3,
    available: true
  },

  {
    id: "fish_laqz_sandy",
    name: "لقز رملي",
    category: "أسماك",
    pricing: "weight",
    base: 16,
    grill: 3,
    fry: 4,
    available: true
  },

  {
    id: "fish_laqz_rock",
    name: "لقز صخري",
    category: "أسماك",
    pricing: "weight",
    base: 18,
    grill: 3,
    fry: 4,
    available: true
  },

  {
    id: "fish_sultan",
    name: "سلطان",
    category: "أسماك",
    pricing: "weight",
    base: 15,
    grill: 3,
    fry: 4,
    available: true
  },

  {
    id: "fish_misqar",
    name: "مسقار",
    category: "أسماك",
    pricing: "weight",
    base: 13,
    grill: 3,
    fry: 4,
    available: true
  },

  {
    id: "fish_malifa",
    name: "مليفة",
    category: "أسماك",
    pricing: "weight",
    base: 12,
    grill: 3,
    fry: 4,
    available: true
  },

  {
    id: "fish_jarbidi",
    name: "جربيدي",
    category: "أسماك",
    pricing: "weight",
    base: 14,
    grill: 3,
    fry: 4,
    available: true
  },

  {
    id: "fish_armout_blond",
    name: "عرموط أشقر",
    category: "أسماك",
    pricing: "weight",
    base: 11,
    grill: 3,
    fry: 4,
    available: true
  },

  {
    id: "fish_armout_cut",
    name: "عرموط مقطع",
    category: "أسماك",
    pricing: "weight",
    base: 12,
    grill: 3,
    fry: 4,
    available: true
  },


  // -------------------------
  // ثمار البحر
  // -------------------------

  {
    id: "sea_shrimp_mid",
    name: "قريدس وسط",
    category: "ثمار البحر",
    pricing: "weight",
    base: 16,
    grill: 2,
    fry: 3,
    available: true
  },

  {
    id: "sea_shrimp_big",
    name: "قريدس كبير",
    category: "ثمار البحر",
    pricing: "weight",
    base: 20,
    grill: 2,
    fry: 3,
    available: true
  },

  {
    id: "sea_calamar",
    name: "كالامار",
    category: "ثمار البحر",
    pricing: "weight",
    base: 14,
    grill: 2,
    fry: 3,
    available: true
  },

  {
    id: "sea_fillet_fresh",
    name: "فيليه طازج",
    category: "ثمار البحر",
    pricing: "weight",
    base: 17,
    grill: 3,
    fry: 4,
    available: true
  },

  {
    id: "sea_fillet_crispy",
    name: "فيليه مقرمش",
    category: "ثمار البحر",
    pricing: "weight",
    base: 18,
    grill: 2,
    fry: 3,
    available: true
  },

  {
    id: "sea_mix",
    name: "ثمار البحر",
    category: "ثمار البحر",
    pricing: "sizes",

    sizes: {
      "صغير": 15,
      "وسط": 22,
      "سطل": 35
    },

    available: true
  },


  // -------------------------
  // الوجبات والساندويش
  // -------------------------

  {
    id: "meal_fish",
    name: "سمكة حرة",
    category: "الوجبات والساندويش",
    pricing: "meal",
    meal: 15,
    sandwich: 8,
    available: true
  },

  {
    id: "meal_shrimp",
    name: "قريدس",
    category: "الوجبات والساندويش",
    pricing: "meal",
    meal: 15,
    sandwich: 8,
    available: true
  },

  {
    id: "meal_sea_mix",
    name: "ثمار البحر",
    category: "الوجبات والساندويش",
    pricing: "meal",
    meal: 16,
    sandwich: 9,
    available: true
  },

  {
    id: "meal_calamar",
    name: "كالامار",
    category: "الوجبات والساندويش",
    pricing: "meal",
    meal: 14,
    sandwich: 8,
    available: true
  },

  {
    id: "meal_sardine",
    name: "سردين",
    category: "الوجبات والساندويش",
    pricing: "meal",
    meal: 11,
    sandwich: 7,
    available: true
  },


  // -------------------------
  // المقبلات
  // -------------------------

  {
    id: "app_sayadieh",
    name: "صيادية",
    category: "مقبلات",
    pricing: "sizes",

    sizes: {
      "صغير": 5,
      "وسط": 8,
      "كبير": 11
    },

    available: true
  },

  {
    id: "app_mtabbal",
    name: "متبل",
    category: "مقبلات",
    pricing: "fixed",
    price: 4,
    available: true
  },

  {
    id: "app_shakshouka",
    name: "شكشوكة",
    category: "مقبلات",
    pricing: "fixed",
    price: 5,
    available: true
  },

  {
    id: "app_tartour",
    name: "طرطور كبير",
    category: "مقبلات",
    pricing: "fixed",
    price: 4,
    available: true
  },

  {
    id: "app_fries",
    name: "بطاطا مقلية",
    category: "مقبلات",
    pricing: "sizes",

    sizes: {
      "صغير": 3,
      "وسط": 5,
      "كبير": 7
    },

    available: true
  },


  // -------------------------
  // السلطات
  // -------------------------

  {
    id: "sal_tabouleh",
    name: "تبولة",
    category: "سلطات",
    pricing: "fixed",
    price: 6,
    available: true
  },

  {
    id: "sal_fattoush",
    name: "فتوش",
    category: "سلطات",
    pricing: "fixed",
    price: 6,
    available: true
  },

  {
    id: "sal_crab",
    name: "سلطة كراب",
    category: "سلطات",
    pricing: "fixed",
    price: 8,
    available: true
  },


  // -------------------------
  // المشروبات
  // -------------------------

  {
    id: "drink_pepsi",
    name: "Pepsi",
    category: "مشروبات",
    pricing: "sizes",

    sizes: {
      "صغير": 2,
      "كبير": 3
    },

    available: true
  },

  {
    id: "drink_7up",
    name: "7up",
    category: "مشروبات",
    pricing: "sizes",

    sizes: {
      "صغير": 2,
      "كبير": 3
    },

    available: true
  },

  {
    id: "drink_miranda",
    name: "Miranda",
    category: "مشروبات",
    pricing: "sizes",

    sizes: {
      "صغير": 2,
      "كبير": 3
    },

    available: true
  }

];


// =====================================================
// الأقسام
// =====================================================

const CATEGORIES = [
  "أسماك",
  "ثمار البحر",
  "الوجبات والساندويش",
  "العروض",
  "مقبلات",
  "سلطات",
  "مشروبات"
];


// =====================================================
// المتغيرات
// =====================================================

let menu = loadMenu();

let cart = [];

let selectedCategory = "أسماك";

let selectedOrderType = "";

let pendingWeightMethod = null;

let editingMenuIndex = -1;

let editingMenuData = null;

let editingIsOffer = false;

let deviceId =
  localStorage.getItem("tabbaraDeviceId");

if (!deviceId) {

  deviceId = crypto.randomUUID();

  localStorage.setItem(
    "tabbaraDeviceId",
    deviceId
  );

}


// =====================================================
// تحميل وحفظ المنيو
// =====================================================

function loadMenu() {

  try {

    const saved =
      JSON.parse(
        localStorage.getItem(
          "tabbaraMenu"
        )
      );

    if (Array.isArray(saved)) {
      return saved;
    }

  } catch (error) {

    console.error(
      "Menu loading error:",
      error
    );

  }

  return structuredClone(
    DEFAULT_MENU
  );

}


function saveMenu() {

  localStorage.setItem(
    "tabbaraMenu",
    JSON.stringify(menu)
  );

}


// =====================================================
// أدوات مساعدة
// =====================================================

function money(value) {

  return Number(
    value || 0
  ).toFixed(2);

}


function normalizePhone(value) {

  return String(
    value || ""
  )
    .replace(
      /[\s\-()]/g,
      ""
    );

}


function escapeHtml(value) {

  return String(
    value ?? ""
  ).replace(
    /[&<>"']/g,
    function (character) {

      const map = {

        "&": "&amp;",

        "<": "&lt;",

        ">": "&gt;",

        '"': "&quot;",

        "'": "&#039;"

      };

      return map[character];

    }
  );

}
// =====================================================
// تسجيل الدخول
// =====================================================

function checkLogin() {

  const loggedIn =
    localStorage.getItem(
      "tabbaraLoggedIn"
    ) === "yes";

  document.getElementById(
    "loginScreen"
  ).style.display =
    loggedIn
      ? "none"
      : "flex";

}


function login() {

  const password =
    document.getElementById(
      "loginPassword"
    ).value;

  const error =
    document.getElementById(
      "loginError"
    );

  if (
    password ===
    LOGIN_PASSWORD
  ) {

    localStorage.setItem(
      "tabbaraLoggedIn",
      "yes"
    );

    error.style.display =
      "none";

    document.getElementById(
      "loginScreen"
    ).style.display =
      "none";

  } else {

    error.style.display =
      "block";

  }

}


function logout() {

  localStorage.removeItem(
    "tabbaraLoggedIn"
  );

  location.reload();

}


// =====================================================
// نوع الطلب
// =====================================================

function setOrderType(type) {

  selectedOrderType =
    type;

  document.getElementById(
    "orderType"
  ).textContent =
    type;

  document.getElementById(
    "deliveryBtn"
  ).classList.toggle(
    "active",
    type === "Delevery"
  );

  document.getElementById(
    "pickupBtn"
  ).classList.toggle(
    "active",
    type === "استلام من المحل"
  );

}


// =====================================================
// عرض الأقسام
// =====================================================

function renderCategories() {

  const box =
    document.getElementById(
      "categories"
    );

  box.innerHTML =
    CATEGORIES.map(
      function (category) {

        let icon = "🍽️";

        if (
          category === "أسماك"
        ) {
          icon = "🐟";
        }

        else if (
          category === "ثمار البحر"
        ) {
          icon = "🦐";
        }

        else if (
          category === "العروض"
        ) {
          icon = "🎁";
        }

        else if (
          category === "مقبلات"
        ) {
          icon = "🥗";
        }

        else if (
          category === "سلطات"
        ) {
          icon = "🥬";
        }

        else if (
          category === "مشروبات"
        ) {
          icon = "🥤";
        }

        return `
          <button
            type="button"
            class="${
              selectedCategory === category
                ? "active"
                : ""
            }"
            onclick="showCategory('${category}')"
          >
            ${icon} ${category}
          </button>
        `;

      }
    ).join("");

}


function showCategory(category) {

  selectedCategory =
    category;

  renderCategories();

  const list =
    menu.filter(
      function (item) {

        return (
          item.category ===
          category
        );

      }
    );

  const box =
    document.getElementById(
      "items"
    );

  if (!list.length) {

    box.innerHTML =
      "<p>لا توجد أصناف حالياً.</p>";

    return;

  }

  box.innerHTML =
    list.map(
      function (item) {

        const disabled =
          !item.available;

        let priceText = "";

        if (
          item.category ===
          "العروض"
        ) {

          priceText =
            `🎁 $${money(
              item.price
            )}`;

        }

        else if (
          item.pricing ===
          "weight"
        ) {

          priceText =
            `من $${money(
              item.base
            )} / kg`;

        }

        else if (
          item.pricing ===
          "sizes"
        ) {

          priceText =
            "أحجام متعددة";

        }

        else if (
          item.pricing ===
          "meal"
        ) {

          priceText =
            `وجبة $${money(
              item.meal
            )} | ساندويش $${money(
              item.sandwich
            )}`;

        }

        else {

          priceText =
            `$${money(
              item.price
            )}`;

        }

        return `
          <div
            class="item ${
              disabled
                ? "sold-out"
                : ""
            }"
            onclick="${
              disabled
                ? ""
                : `chooseItem('${item.id}')`
            }"
          >

            <strong>
              ${escapeHtml(
                item.name
              )}
            </strong>

            <div class="price">
              ${priceText}
            </div>

            ${
              disabled
                ? `
                  <div class="badge">
                    خلص
                  </div>
                `
                : ""
            }

          </div>
        `;

      }
    ).join("");

}


// =====================================================
// اختيار صنف
// =====================================================

function chooseItem(id) {

  const item =
    menu.find(
      function (x) {

        return x.id === id;

      }
    );

  if (
    !item ||
    !item.available
  ) {

    return;

  }

  if (
    item.category ===
    "العروض"
  ) {

    addCart(
      item,
      {
        label: "عرض",
        unitPrice:
          item.price,
        qty: 1,
        total:
          item.price
      }
    );

    return;

  }

  if (
    item.pricing ===
    "weight"
  ) {

    openWeightModal(
      item
    );

  }

  else if (
    item.pricing ===
    "sizes"
  ) {

    openSizeModal(
      item
    );

  }

  else if (
    item.pricing ===
    "meal"
  ) {

    openMealModal(
      item
    );

  }

  else {

    addCart(
      item,
      {
        label: "",
        unitPrice:
          item.price,
        qty: 1,
        total:
          item.price
      }
    );

  }

}


// =====================================================
// النوافذ المنبثقة
// =====================================================

function modal(
  title,
  body
) {

  document.getElementById(
    "modalRoot"
  ).innerHTML = `

    <div
      class="overlay"
      onclick="
        if(event.target === this)
          closeModal()
      "
    >

      <div class="modal">

        <div class="modal-header">

          <h2>
            ${title}
          </h2>

          <button
            type="button"
            class="close-btn"
            onclick="closeModal()"
          >
            ✕
          </button>

        </div>

        ${body}

      </div>

    </div>

  `;

}


function closeModal() {

  document.getElementById(
    "modalRoot"
  ).innerHTML = "";

}
// =====================================================
// الأصناف التي تعتمد على الوزن
// =====================================================

function openWeightModal(item) {

  pendingWeightMethod = null;

  modal(
    `⚖️ ${escapeHtml(item.name)}`,

    `
      <p>
        السعر الأساسي:
        <strong>
          $${money(item.base)} / kg
        </strong>
      </p>

      <div class="choice-row">

        <button
          type="button"
          onclick="selectWeightMethod('none')"
        >
          ني —
          $${money(item.base)}/kg
        </button>

        <button
          type="button"
          onclick="selectWeightMethod('grill')"
        >
          مشوي —
          $${money(
            Number(item.base) +
            Number(item.grill || 0)
          )}/kg
        </button>

        <button
          type="button"
          onclick="selectWeightMethod('fry')"
        >
          مقلي —
          $${money(
            Number(item.base) +
            Number(item.fry || 0)
          )}/kg
        </button>

      </div>

      <div id="weightArea">
        <p>
          اختر طريقة التحضير أولاً.
        </p>
      </div>
    `
  );

}


function selectWeightMethod(method) {

  pendingWeightMethod =
    method;

  const item =
    getCurrentModalItem();

  if (!item) {
    return;
  }

  let extra = 0;

  if (
    method === "grill"
  ) {

    extra =
      Number(item.grill || 0);

  }

  else if (
    method === "fry"
  ) {

    extra =
      Number(item.fry || 0);

  }

  const finalPrice =
    Number(item.base || 0) +
    extra;

  document.getElementById(
    "weightArea"
  ).innerHTML = `

    <p>
      السعر النهائي:
      <strong>
        $${money(finalPrice)} / kg
      </strong>
    </p>

    <input
      id="weightInput"
      type="number"
      min="0.001"
      step="0.001"
      placeholder="الوزن بالكيلو، مثال 1.250"
    >

    <button
      type="button"
      class="confirm"
      onclick="addWeightedItem()"
    >
      ➕ إضافة للطلب
    </button>

  `;

}


function getCurrentModalItem() {

  const title =
    document.querySelector(
      ".modal h2"
    );

  if (!title) {
    return null;
  }

  const itemName =
    title.textContent
      .replace("⚖️", "")
      .trim();

  return menu.find(
    function (item) {

      return (
        item.name ===
        itemName
      );

    }
  ) || null;

}


function addWeightedItem() {

  const item =
    getCurrentModalItem();

  if (!item) {
    return;
  }

  const input =
    document.getElementById(
      "weightInput"
    );

  const weight =
    Number(
      input.value
    );

  if (
    !weight ||
    weight <= 0
  ) {

    alert(
      "أدخل وزناً صحيحاً"
    );

    return;

  }

  let extra = 0;

  if (
    pendingWeightMethod ===
    "grill"
  ) {

    extra =
      Number(
        item.grill || 0
      );

  }

  else if (
    pendingWeightMethod ===
    "fry"
  ) {

    extra =
      Number(
        item.fry || 0
      );

  }

  const unitPrice =
    Number(
      item.base || 0
    ) + extra;

  const total =
    unitPrice *
    weight;

  let cookingName =
    "ني";

  if (
    pendingWeightMethod ===
    "grill"
  ) {

    cookingName =
      "مشوي";

  }

  else if (
    pendingWeightMethod ===
    "fry"
  ) {

    cookingName =
      "مقلي";

  }

  addCart(
    item,
    {
      label:
        `${cookingName} — ${weight.toFixed(3)} kg`,

      unitPrice:
        unitPrice,

      qty:
        weight,

      total:
        total
    }
  );

  pendingWeightMethod =
    null;

  closeModal();

}


// =====================================================
// الأصناف ذات الأحجام
// =====================================================

function openSizeModal(item) {

  const sizes =
    item.sizes || {};

  const buttons =
    Object.entries(
      sizes
    )
      .map(
        function (
          [size, price]
        ) {

          return `

            <button
              type="button"
              onclick="
                addSizedItem(
                  '${item.id}',
                  '${size}'
                )
              "
            >
              ${escapeHtml(size)}
              —
              $${money(price)}
            </button>

          `;

        }
      )
      .join("");

  modal(
    escapeHtml(item.name),

    `
      <p>
        اختر الحجم:
      </p>

      <div class="choice-row">

        ${buttons}

      </div>
    `
  );

}


function addSizedItem(
  id,
  size
) {

  const item =
    menu.find(
      function (x) {

        return x.id === id;

      }
    );

  if (!item) {
    return;
  }

  const price =
    Number(
      item.sizes?.[size] ||
      0
    );

  addCart(
    item,
    {
      label:
        size,

      unitPrice:
        price,

      qty:
        1,

      total:
        price
    }
  );

  closeModal();

}


// =====================================================
// الوجبة والساندويش
// =====================================================

function openMealModal(item) {

  modal(
    escapeHtml(item.name),

    `
      <p>
        اختر النوع:
      </p>

      <div class="choice-row">

        <button
          type="button"
          onclick="
            addMealItem(
              '${item.id}',
              'وجبة',
              ${Number(item.meal || 0)}
            )
          "
        >
          🍽️ وجبة —
          $${money(item.meal)}
        </button>

        <button
          type="button"
          onclick="
            addMealItem(
              '${item.id}',
              'ساندويش',
              ${Number(item.sandwich || 0)}
            )
          "
        >
          🥪 ساندويش —
          $${money(item.sandwich)}
        </button>

      </div>
    `
  );

}


function addMealItem(
  id,
  label,
  price
) {

  const item =
    menu.find(
      function (x) {

        return x.id === id;

      }
    );

  if (!item) {
    return;
  }

  addCart(
    item,
    {
      label:
        label,

      unitPrice:
        Number(price),

      qty:
        1,

      total:
        Number(price)
    }
  );

  closeModal();

}


// =====================================================
// إضافة الصنف إلى الطلب
// =====================================================

function addCart(
  item,
  data
) {

  cart.push({

    id:
      crypto.randomUUID(),

    itemId:
      item.id,

    name:
      item.name,

    label:
      data.label || "",

    unitPrice:
      Number(
        data.unitPrice || 0
      ),

    qty:
      Number(
        data.qty || 1
      ),

    total:
      Number(
        data.total || 0
      )

  });

  updateCart();

}


// =====================================================
// عرض الطلب الحالي
// =====================================================

function updateCart() {

  const box =
    document.getElementById(
      "cartItems"
    );

  if (!cart.length) {

    box.innerHTML =
      "<p>لا يوجد أصناف</p>";

    document.getElementById(
      "total"
    ).textContent =
      "0.00";

    return;

  }

  box.innerHTML =
    cart.map(
      function (
        item,
        index
      ) {

        return `

          <div
            class="cart-item"
          >

            <div>

              <strong>
                ${escapeHtml(
                  item.name
                )}
              </strong>

              ${
                item.label
                  ? `
                    <br>
                    <small>
                      ${escapeHtml(
                        item.label
                      )}
                    </small>
                  `
                  : ""
              }

              <br>

              <strong>
                $${money(
                  item.total
                )}
              </strong>

            </div>


            <div
              class="quantity"
            >

              <button
                type="button"
                onclick="
                  removeCart(
                    ${index}
                  )
                "
              >
                −
              </button>

              <span>
                ${
                  item.label.includes("kg")
                    ? item.qty.toFixed(3) + " kg"
                    : item.qty
                }
              </span>

              <button
                type="button"
                onclick="
                  duplicateCart(
                    ${index}
                  )
                "
              >
                +
              </button>

            </div>

          </div>

        `;

      }
    ).join("");


  const total =
    cart.reduce(
      function (
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


  document.getElementById(
    "total"
  ).textContent =
    money(total);

}


// =====================================================
// زيادة / حذف من الطلب
// =====================================================

function duplicateCart(
  index
) {

  const item =
    cart[index];

  if (!item) {
    return;
  }

  // صنف بالوزن:
  // الضغط + لا يضاعف الوزن.
  // يطلب إضافة وزن جديد من نفس الصنف.

  if (
    item.label &&
    item.label.includes("kg")
  ) {

    const original =
      menu.find(
        function (x) {

          return x.id ===
            item.itemId;

        }
      );

    if (original) {

      openWeightModal(
        original
      );

    }

    return;

  }


  item.qty += 1;

  item.total =
    item.unitPrice *
    item.qty;

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


// =====================================================
// مسح الطلب
// =====================================================

function clearOrder() {

  cart = [];

  selectedOrderType =
    "";

  pendingWeightMethod =
    null;

  document.getElementById(
    "orderType"
  ).textContent =
    "لم يتم الاختيار";

  document.getElementById(
    "deliveryBtn"
  ).classList.remove(
    "active"
  );

  document.getElementById(
    "pickupBtn"
  ).classList.remove(
    "active"
  );

  [
    "name",
    "phone",
    "address",
    "notes"
  ].forEach(
    function (id) {

      document.getElementById(
        id
      ).value = "";

    }
  );

  document.getElementById(
    "customerMessage"
  ).textContent =
    "";

  updateCart();

}
// =====================================================
// البحث عن الزبون
// =====================================================

async function findCustomerByPhone(phone) {

  const normalizedPhone =
    normalizePhone(phone);

  if (
    !normalizedPhone ||
    normalizedPhone.length < 6
  ) {

    return null;

  }

  const encodedPhone =
    encodeURIComponent(
      normalizedPhone
    );

  const url =
    `${SUPABASE_URL}` +
    `/rest/v1/customers` +
    `?select=*` +
    `&phone=eq.${encodedPhone}` +
    `&limit=1`;


  const response =
    await fetch(
      url,
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

    return rows[0];

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


  if (customer) {

    nameInput.value =
      customer.name || "";

    addressInput.value =
      customer.address || "";

    if (
      customer.phone
    ) {

      phoneInput.value =
        customer.phone;

    }


    showCustomerMessage(
      "✅ زبون معروف — تم جلب البيانات"
    );

  }

  else {

    showCustomerMessage(
      "🆕 زبون جديد"
    );

  }

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
// البحث التلقائي بالهاتف
// =====================================================

function setupCustomerSearch() {

  const phoneInput =
    document.getElementById(
      "phone"
    );

  if (!phoneInput) {
    return;
  }


  let timer = null;


  async function searchCustomer() {

    const phone =
      normalizePhone(
        phoneInput.value
      );


    if (
      phone.length < 6
    ) {

      return;

    }


    if (
      !navigator.onLine
    ) {

      showCustomerMessage(
        "📴 لا يوجد إنترنت — البحث غير متاح حالياً"
      );

      return;

    }


    showCustomerMessage(
      "🔎 البحث عن الزبون..."
    );


    try {

      const customer =
        await findCustomerByPhone(
          phone
        );


      fillCustomerFields(
        customer
      );


    }

    catch (error) {

      console.error(
        error
      );

      showCustomerMessage(
        "⚠️ تعذر البحث عن الزبون"
      );

    }

  }


  phoneInput.addEventListener(
    "input",
    function () {

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
    function () {

      searchCustomer();

    }
  );

}


// =====================================================
// حفظ الزبون
// =====================================================

async function saveCustomer() {

  const phone =
    normalizePhone(
      document.getElementById(
        "phone"
      ).value
    );


  if (!phone) {

    return;

  }


  const customer = {

    phone:
      phone,

    name:
      document.getElementById(
        "name"
      ).value.trim(),

    address:
      document.getElementById(
        "address"
      ).value.trim(),

    notes:
      document.getElementById(
        "notes"
      ).value.trim()

  };


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

    const errorText =
      await response.text();

    console.error(
      "Customer save error:",
      errorText
    );

    throw new Error(
      "Customer save failed"
    );

  }

}


// =====================================================
// الطلبات Offline
// =====================================================

function getPendingOrders() {

  try {

    const orders =
      JSON.parse(
        localStorage.getItem(
          "tabbaraPendingOrders"
        ) || "[]"
      );

    return Array.isArray(
      orders
    )
      ? orders
      : [];

  }

  catch (error) {

    return [];

  }

}


function savePendingOrders(
  orders
) {

  localStorage.setItem(
    "tabbaraPendingOrders",
    JSON.stringify(
      orders
    )
  );

}


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
// إرسال طلب إلى Supabase
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
            "resolution=ignore-duplicates,return=minimal"

        },

        body:
          JSON.stringify(
            order
          )

      }
    );


  if (!response.ok) {

    const errorText =
      await response.text();

    console.error(
      "Order save error:",
      errorText
    );

    throw new Error(
      "Order save failed"
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


  if (!pending.length) {

    updateConnectionStatus();

    return;

  }


  const remaining = [];


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
        "Sync error:",
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
// حالة الإنترنت
// =====================================================

function updateConnectionStatus() {

  const badge =
    document.getElementById(
      "connectionStatus"
    );


  if (!badge) {
    return;
  }


  const online =
    navigator.onLine;


  if (online) {

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
// تأكيد الطلب
// =====================================================

async function confirmOrder() {

  if (
    !selectedOrderType
  ) {

    alert(
      "اختر نوع الطلب"
    );

    return;

  }


  if (
    !cart.length
  ) {

    alert(
      "أضف صنفاً للطلب"
    );

    return;

  }


  const customerPhone =
    normalizePhone(
      document.getElementById(
        "phone"
      ).value
    );


  const total =
    cart.reduce(
      function (
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
      ).value.trim() ||
      null,

    customer_phone:
      customerPhone ||
      null,

    customer_address:
      document.getElementById(
        "address"
      ).value.trim() ||
      null,

    notes:
      document.getElementById(
        "notes"
      ).value.trim() ||
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
        : "pending"

  };


  try {

    if (
      navigator.onLine &&
      customerPhone
    ) {

      await saveCustomer();

    }


    if (
      navigator.onLine
    ) {

      await sendOrder(
        order
      );

      alert(
        "✅ تم حفظ الطلب بنجاح"
      );

    }

    else {

      queueOrder(
        order
      );

      alert(
        "📴 تم حفظ الطلب Offline وسيتم إرساله عند عودة الإنترنت"
      );

    }


    clearOrder();

  }

  catch (error) {

    console.error(
      error
    );


    queueOrder(
      order
    );


    alert(
      "⚠️ تعذر الاتصال. تم حفظ الطلب محلياً وسيتم إرساله عند عودة الإنترنت."
    );


    clearOrder();

  }

}
// =====================================================
// الطلبات السابقة
// =====================================================

async function showPreviousOrders() {

  if (!navigator.onLine) {

    alert(
      "📴 الطلبات السابقة تحتاج إلى اتصال بالإنترنت حالياً."
    );

    return;

  }


  try {

    const response =
      await fetch(
        `${SUPABASE_URL}/rest/v1/orders?select=*&order=created_at.desc&limit=50`,
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
        "Failed to load orders"
      );

    }


    const orders =
      await response.json();


    if (!orders.length) {

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
      orders.map(
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
            items.map(
              function(item) {

                return `
                  <div>
                    ${escapeHtml(
                      item.name || ""
                    )}
                    ×
                    ${item.qty || 1}
                  </div>
                `;

              }
            ).join("");


          return `
            <div class="manager-card">

              <h4>
                🧾 طلب
              </h4>

              <small>
                ${escapeHtml(date)}
              </small>

              <hr>

              <div>
                <b>النوع:</b>
                ${escapeHtml(
                  order.order_type || ""
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

              <hr>

              ${itemText}

              <hr>

              <strong>
                المجموع:
                $${money(
                  order.total || 0
                )}
              </strong>

            </div>
          `;

        }
      ).join("");


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
      error
    );

    alert(
      "⚠️ تعذر تحميل الطلبات السابقة."
    );

  }

}


// =====================================================
// إدارة المنيو
// =====================================================

function showMenuManager() {

  const cards =
    menu
      .map(
        function(item,index) {

          if (
            item.category === "العروض"
          ) {
            return "";
          }


          return `
            <div class="manager-card">

              <h4>
                ${escapeHtml(
                  item.name
                )}
                ${item.available
                  ? "🟢"
                  : "🔴"}
              </h4>

              <small>
                ${escapeHtml(
                  item.category
                )}
              </small>

              <br><br>

              <button
                class="primary"
                onclick="editMenuItem(${index})"
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
      )
      .join("");


  const offers =
    menu.filter(
      function(item) {

        return (
          item.category ===
          "العروض"
        );

      }
    );


  const offerCards =
    offers.length
      ? offers
          .map(
            function(
              offer
            ) {

              const index =
                menu.indexOf(
                  offer
                );


              const included =
                (
                  offer.offerItems ||
                  []
                )
                  .map(
                    function(id) {

                      const item =
                        menu.find(
                          function(m) {

                            return (
                              m.id === id
                            );

                          }
                        );


                      return item
                        ? escapeHtml(
                            item.name
                          )
                        : "";

                    }
                  )
                  .filter(Boolean)
                  .join("، ");


              return `
                <div class="manager-card">

                  <h4>
                    🎁
                    ${escapeHtml(
                      offer.name
                    )}
                    ${
                      offer.available
                        ? "🟢"
                        : "🔴"
                    }
                  </h4>

                  <div>
                    السعر:
                    <b>
                      $${money(
                        offer.price || 0
                      )}
                    </b>
                  </div>

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
          )
          .join("")
      : `
          <p>
            لا توجد عروض بعد.
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
// تغيير حالة الصنف
// =====================================================

function toggleAvailable(
  index
) {

  if (
    !menu[index]
  ) {
    return;
  }


  menu[index].available =
    !menu[index].available;


  saveMenu();


  showMenuManager();


  renderCategories();


  if (
    currentCategory
  ) {

    showCategory(
      currentCategory
    );

  }

}


// =====================================================
// إضافة صنف جديد
// =====================================================

function newMenuItem() {

  editMenuItem(
    -1,
    false
  );

}


// =====================================================
// إضافة عرض جديد
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
    existing ||
    {
      id:
        "item_" +
        Date.now(),

      name: "",

      category:
        isOffer
          ? "العروض"
          : "الأسماك",

      type:
        isOffer
          ? "fixed"
          : "fixed",

      price: 0,

      available: true

    };


  const categoryOptions =
    CATEGORIES
      .filter(
        function(category) {

          return (
            category !==
            "العروض"
          );

        }
      )
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


  let offerSection = "";


  if (isOffer) {

    const offerItems =
      menu
        .filter(
          function(m) {

            return (
              m.category !==
              "العروض"
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
          offerItems.length
            ? offerItems
                .map(
                  function(menuItem) {

                    const checked =
                      (
                        item.offerItems ||
                        []
                      ).includes(
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
                  لا توجد أصناف متاحة.
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
          ? ""
          : `

            <div class="form-row">

              <label>
                التصنيف
              </label>

              <select id="mCategory">

                ${categoryOptions}

              </select>

            </div>

          `
      }


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
                value="${Number(
                  item.price || 0
                )}"
              >

            </div>

          `
          : `
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

            <div
              id="pricingFields"
            ></div>
          `
      }


      ${
        isOffer
          ? offerSection
          : ""
      }


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
      renderPricingFields,
      0
    );

  }

}


// =====================================================
// حقول الأسعار
// =====================================================

function renderPricingFields() {

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


  const current =
    menu.find(
      function(item) {

        return (
          item.name ===
          document.getElementById(
            "mName"
          )?.value
        );

      }
    ) || {};


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


    let thirdLabel =
      "كبير";


    let thirdKey =
      "كبير";


    const name =
      document.getElementById(
        "mName"
      )?.value.trim();


    if (
      name ===
      "ثمار البحر"
    ) {

      thirdLabel =
        "سطل";

      thirdKey =
        "سطل";

    }


    box.innerHTML = `

      <div class="form-row">

        <label>
          صغير
        </label>

        <input
          id="mSmall"
          type="number"
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
          step="0.01"
          value="${Number(
            sizes.وسط || 0
          )}"
        >

      </div>


      <div class="form-row">

        <label>
          ${thirdLabel}
        </label>

        <input
          id="mLarge"
          type="number"
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
// حفظ المنيو
// =====================================================

function saveMenuForm(
  index,
  isOffer = false
) {

  const name =
    document.getElementById(
      "mName"
    ).value.trim();


  if (!name) {

    alert(
      "اكتب اسم الصنف"
    );

    return;

  }


  const available =
    document.getElementById(
      "mAvailable"
    ).value === "true";


  let item;


  if (
    index >= 0
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
          ? "العروض"
          : "الأسماك",

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
      "العروض";

    item.type =
      "fixed";


    item.price =
      Number(
        document.getElementById(
          "mPrice"
        ).value || 0
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

    const category =
      document.getElementById(
        "mCategory"
      ).value;


    const pricingType =
      document.getElementById(
        "mPricing"
      ).value;


    item.category =
      category;


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
          ).value || 0
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
            ).value || 0
          ),

        grill:
          Number(
            document.getElementById(
              "mGrill"
            ).value || 0
          ),

        fry:
          Number(
            document.getElementById(
              "mFry"
            ).value || 0
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
            ).value || 0
          ),

        وسط:
          Number(
            document.getElementById(
              "mMedium"
            ).value || 0
          )

      };


      item.sizes[
        thirdKey
      ] =
        Number(
          document.getElementById(
            "mLarge"
          ).value || 0
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
            ).value || 0
          ),

        ساندويش:
          Number(
            document.getElementById(
              "mSandwich"
            ).value || 0
          )

      };


      delete item.price;
      delete item.pricing;
      delete item.sizes;

    }

  }


  if (
    index >= 0
  ) {

    menu[index] =
      item;

  }

  else {

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


  const confirmed =
    confirm(
      `هل تريد حذف "${item.name}"؟`
    );


  if (!confirmed) {

    return;

  }


  const deletedId =
    item.id;


  menu.splice(
    index,
    1
  );


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
// مراقبة الاتصال
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
// تشغيل التطبيق
// =====================================================

document.addEventListener(
  "DOMContentLoaded",
  function() {

    checkLogin();

    updateConnectionStatus();

    renderCategories();

    showCategory(
      CATEGORIES[0]
    );

    setupCustomerSearch();

    syncNow();

  }
);
