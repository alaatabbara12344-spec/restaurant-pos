// =====================================================
// Tabbara Seafood POS
// Supabase + Offline Sync + Customer Database
// =====================================================
// =====================================================
// SUPABASE CONFIG
// =====================================================
const SUPABASE_URL =
  "https://tpvhxauivmjgfcugpldp.supabase.co";
const SUPABASE_KEY =
  "sb_publishable_0n__ZztsS8BQtdVn5lhmmA_WWuHjVg7";
const SUPABASE_ORDERS_URL =
  SUPABASE_URL + "/rest/v1/orders";
const SUPABASE_CUSTOMERS_URL =
  SUPABASE_URL + "/rest/v1/customers";
// =====================================================
// LOGIN
// =====================================================
const LOGIN_PASSWORD = "1234";
function login() {
  const password =
    document.getElementById("loginPassword").value;
  const error =
    document.getElementById("loginError");
  if (password === LOGIN_PASSWORD) {
    sessionStorage.setItem(
      "restaurantLoggedIn",
      "true"
    );
    document.getElementById(
      "loginScreen"
    ).style.display = "none";
  } else {
    error.style.display = "block";
  }
}
function logout() {
  sessionStorage.removeItem(
    "restaurantLoggedIn"
  );
  location.reload();
}
function checkLogin() {
  const loggedIn =
    sessionStorage.getItem(
      "restaurantLoggedIn"
    );
  const loginScreen =
    document.getElementById("loginScreen");
  if (loggedIn === "true") {
    loginScreen.style.display = "none";
  } else {
    loginScreen.style.display = "flex";
  }
}
// =====================================================
// DEVICE ID
// =====================================================
function getDeviceId() {
  let deviceId =
    localStorage.getItem(
      "tabbaraDeviceId"
    );
  if (!deviceId) {
    if (
      window.crypto &&
      crypto.randomUUID
    ) {
      deviceId = crypto.randomUUID();
    } else {
      deviceId =
        "device-" +
        Date.now() +
        "-" +
        Math.random()
          .toString(36)
          .substring(2);
    }
    localStorage.setItem(
      "tabbaraDeviceId",
      deviceId
    );
  }
  return deviceId;
}
const DEVICE_ID =
  getDeviceId();
// =====================================================
// MENU
// =====================================================
const defaultMenu = {
  "مقبلات": [
    {
      name: "شكشوكة",
      price: 4
    },
    {
      name: "متبل",
      price: 4
    },
    {
      name: "ورق عنب",
      price: 5
    },
    {
      name: " بطاطا مقلية",
      price: 5
    }
  ],
  "أسماك": [
    {
      name: "براق",
      price: 15
    },
    {
      name:"اجاج",
      price: 16
    },
    {
      name: "سلطان إبراهيم",
      price: 18
    },
    {
      name: "سلمون",
      price: 20
    }
  ],
  "مشاوي": [
    {
      name: "سمك مشوي",
      price: 17
    },
    {
      name: "قريدس مشوي",
      price: 19
    },
    {
      name: "كالامار مشوي",
      price: 16
    }
  ],
  "مقالي": [
    {
      name: "سمك مقلي",
      price: 15
    },
    {
      name: "قريدس مقلي",
      price: 17
    },
    {
      name: "كالامار مقلي",
      price: 14
    }
  ],
  "سلطات": [
    {
      name: "فتوش",
      price: 5
    },
    {
      name: "سلطة خضراء",
      price: 5
    },
    {
      name: "تبولة",
      price: 5
    }
  ],
  "مشروبات": [
    {
      name: "Pepsi",
      price: 2
    },
    {
      name: "7Up",
      price: 2
    },
    {
      name: "مياه",
      price: 1
    }
  ]
};
let menu =
  JSON.parse(
    localStorage.getItem("restaurantMenu")
  ) || defaultMenu;
function saveMenu() {
  localStorage.setItem(
    "restaurantMenu",
    JSON.stringify(menu)
  );
}
// =====================================================
// CURRENT ORDER
// =====================================================
let cart = [];
let currentOrderType = "";
// =====================================================
// ORDER NUMBER
// =====================================================
function getNextOrderNumber() {
  let number =
    parseInt(
      localStorage.getItem(
        "restaurantOrderNumber"
      ) || "1000"
    );
  number++;
  localStorage.setItem(
    "restaurantOrderNumber",
    number.toString()
  );
  return number;
}
// =====================================================
// ORDER TYPE
// =====================================================
function setOrderType(type) {
  currentOrderType = type;
  const element =
    document.getElementById(
      "orderType"
    );
  if (element) {
    element.textContent = type;
  }
}
// =====================================================
// SHOW CATEGORY
// =====================================================
function showCategory(category) {
  const itemsContainer =
    document.getElementById("items");
  if (!itemsContainer) return;
  itemsContainer.innerHTML = "";
  const items =
    menu[category] || [];
  items.forEach(function(item, index) {
    const div =
      document.createElement("div");
    div.className = "item";
    div.onclick = function() {
      addItem(
        category,
        index
      );
    };
    div.innerHTML = `
      <strong>
        ${escapeHtml(item.name)}
      </strong>
      <div class="price">
        $${Number(item.price).toFixed(2)}
      </div>
    `;
    itemsContainer.appendChild(div);
  });
}
// =====================================================
// ADD ITEM
// =====================================================
function addItem(category, index) {
  const item =
    menu[category][index];
  const existing =
    cart.find(function(cartItem) {
      return (
        cartItem.name === item.name &&
        cartItem.price === item.price
      );
    });
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      name:
        item.name,
      price:
        Number(item.price),
      quantity:
        1
    });
  }
  updateCart();
}
// =====================================================
// CHANGE QUANTITY
// =====================================================
function changeQuantity(index, amount) {
  if (!cart[index]) return;
  cart[index].quantity += amount;
  if (
    cart[index].quantity <= 0
  ) {
    cart.splice(index, 1);
  }
  updateCart();
}
// =====================================================
// UPDATE CART
// =====================================================
function updateCart() {
  const container =
    document.getElementById(
      "cartItems"
    );
  const totalElement =
    document.getElementById(
      "total"
    );
  if (!container) return;
  if (cart.length === 0) {
    container.innerHTML =
      "<p>لا يوجد أصناف</p>";
    if (totalElement) {
      totalElement.textContent =
        "0.00";
    }
    return;
  }
  let total = 0;
  container.innerHTML = "";
  cart.forEach(function(item, index) {
    const itemTotal =
      item.price *
      item.quantity;
    total += itemTotal;
    const div =
      document.createElement("div");
    div.className =
      "cart-item";
    div.innerHTML = `
      <div>
        <strong>
          ${escapeHtml(item.name)}
        </strong>
        <div>
          $${item.price.toFixed(2)}
        </div>
      </div>
      <div class="quantity">
        <button
          type="button"
          onclick="changeQuantity(${index}, 1)">
          +
        </button>
        <strong>
          ${item.quantity}
        </strong>
        <button
          type="button"
          onclick="changeQuantity(${index}, -1)">
          -
        </button>
      </div>
      <strong>
        $${itemTotal.toFixed(2)}
      </strong>
    `;
    container.appendChild(div);
  });
  if (totalElement) {
    totalElement.textContent =
      total.toFixed(2);
  }
}
// =====================================================
// LOCAL ORDERS
// =====================================================
function getLocalOrders() {
  try {
    return (
      JSON.parse(
        localStorage.getItem(
          "restaurantOrders"
        )
      ) || []
    );
  } catch (error) {
    return [];
  }
}
function saveLocalOrder(order) {
  const orders =
    getLocalOrders();
  const index =
    orders.findIndex(function(existing) {
      return existing.id === order.id;
    });
  if (index >= 0) {
    orders[index] = {
      ...orders[index],
      ...order
    };
  } else {
    orders.unshift(order);
  }
  localStorage.setItem(
    "restaurantOrders",
    JSON.stringify(orders)
  );
}
function markOrderSynced(orderId) {
  const orders =
    getLocalOrders();
  const index =
    orders.findIndex(function(order) {
      return order.id === orderId;
    });
  if (index >= 0) {
    orders[index].syncStatus =
      "synced";
    localStorage.setItem(
      "restaurantOrders",
      JSON.stringify(orders)
    );
  }
}
function markOrderPending(orderId) {
  const orders =
    getLocalOrders();
  const index =
    orders.findIndex(function(order) {
      return order.id === orderId;
    });
  if (index >= 0) {
    orders[index].syncStatus =
      "pending";
    localStorage.setItem(
      "restaurantOrders",
      JSON.stringify(orders)
    );
  }
}
// =====================================================
// CREATE ORDER ID
// =====================================================
function createOrderId() {
  if (
    window.crypto &&
    crypto.randomUUID
  ) {
    return crypto.randomUUID();
  }
  return (
    DEVICE_ID +
    "-" +
    Date.now() +
    "-" +
    Math.random()
      .toString(36)
      .substring(2)
  );
}
// =====================================================
// CUSTOMER FUNCTIONS
// =====================================================
// تنظيف رقم الهاتف
function normalizePhone(phone) {
  return String(phone || "")
    .replace(/\s+/g, "")
    .replace(/-/g, "")
    .replace(/\(/g, "")
    .replace(/\)/g, "");
}
// البحث عن الزبون
async function findCustomerByPhone(phone) {
  const cleanPhone =
    normalizePhone(phone);
  if (!cleanPhone) {
    return null;
  }
  try {
    const url =
      SUPABASE_CUSTOMERS_URL +
      "?select=*&phone=eq." +
      encodeURIComponent(cleanPhone) +
      "&limit=1";
    const response =
      await fetch(
        url,
        {
          method: "GET",
          headers:
            supabaseHeaders()
        }
      );
    if (!response.ok) {
      console.error(
        "Customer search error:",
        await response.text()
      );
      return null;
    }
    const customers =
      await response.json();
    if (
      Array.isArray(customers) &&
      customers.length > 0
    ) {
      return customers[0];
    }
    return null;
  } catch (error) {
    console.error(
      "Customer search failed:",
      error
    );
    return null;
  }
}
// تعبئة بيانات الزبون
function fillCustomerFields(customer) {
  if (!customer) return;
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
  if (phone) {
    phone.value =
      customer.phone || "";
  }
  if (name) {
    name.value =
      customer.name || "";
  }
  if (address) {
    address.value =
      customer.address || "";
  }
  // إظهار رسالة بسيطة
  showCustomerMessage(
    "🟢 تم العثور على بيانات الزبون"
  );
}
// رسالة حالة الزبون
function showCustomerMessage(message) {
  let element =
    document.getElementById(
      "customerStatus"
    );
  if (!element) {
    element =
      document.createElement(
        "div"
      );
    element.id =
      "customerStatus";
    element.style.cssText = `
      margin:5px 0 8px;
      padding:8px;
      border-radius:8px;
      background:#eef7f0;
      color:#16803c;
      font-size:13px;
      text-align:center;
    `;
    const phoneInput =
      document.getElementById(
        "phone"
      );
    if (
      phoneInput &&
      phoneInput.parentNode
    ) {
      phoneInput.parentNode.insertBefore(
        element,
        phoneInput.nextSibling
      );
    }
  }
  element.textContent =
    message;
  element.style.display =
    "block";
  clearTimeout(
    window.customerMessageTimer
  );
  window.customerMessageTimer =
    setTimeout(
      function() {
        if (element) {
          element.style.display =
            "none";
        }
      },
      3000
    );
}
// البحث تلقائياً عند تغيير رقم الهاتف
let customerSearchTimer = null;
function setupCustomerSearch() {
  const phoneInput =
    document.getElementById(
      "phone"
    );
  if (!phoneInput) return;
  phoneInput.addEventListener(
    "input",
    function() {
      clearTimeout(
        customerSearchTimer
      );
      const phone =
        normalizePhone(
          phoneInput.value
        );
      if (phone.length < 6) {
        return;
      }
      customerSearchTimer =
        setTimeout(
          async function() {
            const customer =
              await findCustomerByPhone(
                phone
              );
            if (customer) {
              fillCustomerFields(
                customer
              );
            } else {
              showCustomerMessage(
                "🆕 زبون جديد"
              );
            }
          },
          500
        );
    }
  );
  phoneInput.addEventListener(
    "blur",
    async function() {
      const phone =
        normalizePhone(
          phoneInput.value
        );
      if (phone.length < 6) {
        return;
      }
      const customer =
        await findCustomerByPhone(
          phone
        );
      if (customer) {
        fillCustomerFields(
          customer
        );
      }
    }
  );
}
// حفظ أو تحديث الزبون
async function saveCustomer(customer) {
  if (!customer) {
    return false;
  }
  const phone =
    normalizePhone(
      customer.phone
    );
  if (!phone) {
    return false;
  }
  const row = {
    phone:
      phone,
    name:
      customer.name || "",
    address:
      customer.address || "",
    notes:
      customer.notes || "",
    updated_at:
      new Date().toISOString()
  };
  try {
    const response =
      await fetch(
        SUPABASE_CUSTOMERS_URL,
        {
          method: "POST",
          headers: {
            ...supabaseHeaders(),
            "Prefer":
              "resolution=merge-duplicates,return=minimal"
          },
          body:
            JSON.stringify(row)
        }
      );
    if (!response.ok) {
      console.error(
        "Save customer error:",
        await response.text()
      );
      return false;
    }
    return true;
  } catch (error) {
    console.error(
      "Save customer failed:",
      error
    );
    return false;
  }
}
// =====================================================
// ORDER → SUPABASE
// =====================================================
function orderToSupabaseRow(order) {
  return {
    id:
      order.id,
    order_type:
      order.type || "",
    customer_name:
      order.customer
        ? order.customer.name || ""
        : "",
    customer_phone:
      order.customer
        ? normalizePhone(
            order.customer.phone || ""
          )
        : "",
    customer_address:
      order.customer
        ? order.customer.address || ""
        : "",
    notes:
      order.customer
        ? order.customer.notes || ""
        : "",
    items:
      order.items || [],
    total:
      Number(order.total || 0),
    device_id:
      order.deviceId || DEVICE_ID,
    sync_status:
      "synced",
    created_at:
      order.createdAt ||
      new Date().toISOString()
  };
}
// =====================================================
// SUPABASE → LOCAL ORDER
// =====================================================
function supabaseRowToOrder(row) {
  const createdAt =
    row.created_at ||
    new Date().toISOString();
  return {
    id:
      row.id,
    number:
      row.number ||
      row.order_number ||
      null,
    type:
      row.order_type,
    customer: {
      name:
        row.customer_name || "",
      phone:
        row.customer_phone || "",
      address:
        row.customer_address || "",
      notes:
        row.notes || ""
    },
    items:
      Array.isArray(row.items)
        ? row.items
        : [],
    total:
      Number(row.total || 0),
    deviceId:
      row.device_id || "",
    createdAt:
      createdAt,
    date:
      formatDate(createdAt),
    syncStatus:
      "synced"
  };
}
// =====================================================
// SUPABASE HEADERS
// =====================================================
function supabaseHeaders() {
  return {
    "apikey":
      SUPABASE_KEY,
    "Authorization":
      "Bearer " +
      SUPABASE_KEY,
    "Content-Type":
      "application/json"
  };
}
// =====================================================
// SYNC ONE ORDER
// =====================================================
async function syncOrder(order) {
  if (!order || !order.id) {
    return false;
  }
  if (!navigator.onLine) {
    markOrderPending(
      order.id
    );
    return false;
  }
  try {
    const response =
      await fetch(
        SUPABASE_ORDERS_URL,
        {
          method: "POST",
          headers: {
            ...supabaseHeaders(),
            "Prefer":
              "resolution=ignore-duplicates,return=minimal"
          },
          body:
            JSON.stringify(
              orderToSupabaseRow(order)
            )
        }
      );
    if (!response.ok) {
      console.error(
        "Order sync error:",
        response.status,
        await response.text()
      );
      markOrderPending(
        order.id
      );
      return false;
    }
    markOrderSynced(
      order.id
    );
    return true;
  } catch (error) {
    console.error(
      "Order sync failed:",
      error
    );
    markOrderPending(
      order.id
    );
    return false;
  }
}
// =====================================================
// SYNC PENDING ORDERS
// =====================================================
async function syncPendingOrders() {
  if (!navigator.onLine) {
    updateConnectionStatus();
    return;
  }
  const orders =
    getLocalOrders();
  const pendingOrders =
    orders.filter(function(order) {
      return (
        order.syncStatus !== "synced"
      );
    });
  for (
    const order of pendingOrders
  ) {
    await syncOrder(
      order
    );
  }
  updateConnectionStatus();
}
// =====================================================
// PULL ORDERS FROM SUPABASE
// =====================================================
async function pullOrdersFromSupabase() {
  if (!navigator.onLine) {
    return;
  }
  try {
    const response =
      await fetch(
        SUPABASE_ORDERS_URL +
        "?select=*&order=created_at.desc&limit=500",
        {
          method: "GET",
          headers:
            supabaseHeaders()
        }
      );
    if (!response.ok) {
      console.error(
        "Pull orders error:",
        await response.text()
      );
      return;
    }
    const rows =
      await response.json();
    const localOrders =
      getLocalOrders();
    const localMap =
      new Map();
    localOrders.forEach(
      function(order) {
        if (order.id) {
          localMap.set(
            order.id,
            order
          );
        }
      }
    );
    rows.forEach(
      function(row) {
        const remoteOrder =
          supabaseRowToOrder(
            row
          );
        const localOrder =
          localMap.get(
            remoteOrder.id
          );
        if (
          localOrder &&
          localOrder.syncStatus !==
            "synced"
        ) {
          localMap.set(
            remoteOrder.id,
            localOrder
          );
        } else {
          localMap.set(
            remoteOrder.id,
            remoteOrder
          );
        }
      }
    );
    const merged =
      Array.from(
        localMap.values()
      );
    merged.sort(
      function(a, b) {
        return (
          new Date(
            b.createdAt || 0
          ) -
          new Date(
            a.createdAt || 0
          )
        );
      }
    );
    localStorage.setItem(
      "restaurantOrders",
      JSON.stringify(merged)
    );
    updateConnectionStatus();
  } catch (error) {
    console.error(
      "Pull orders failed:",
      error
    );
  }
}
// =====================================================
// FULL SYNC
// =====================================================
async function syncNow() {
  if (!navigator.onLine) {
    updateConnectionStatus();
    return;
  }
  await syncPendingOrders();
  await pullOrdersFromSupabase();
  updateConnectionStatus();
}
// =====================================================
// SAVE ORDER
// =====================================================
function saveOrder(order) {
  // الحفظ المحلي أولاً
  saveLocalOrder(
    order
  );
  updateConnectionStatus();
  // مزامنة الطلب بالخلفية
  syncOrder(
    order
  );
}
// =====================================================
// CLEAR ORDER
// =====================================================
function clearOrder() {
  cart = [];
  currentOrderType = "";
  const orderType =
    document.getElementById(
      "orderType"
    );
  if (orderType) {
    orderType.textContent =
      "لم يتم الاختيار";
  }
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
  const customerStatus =
    document.getElementById(
      "customerStatus"
    );
  if (customerStatus) {
    customerStatus.style.display =
      "none";
  }
  updateCart();
}
// =====================================================
// CONFIRM ORDER
// =====================================================
function confirmOrder() {
  if (!currentOrderType) {
    alert(
      "الرجاء اختيار نوع الطلب أولاً"
    );
    return;
  }
  if (cart.length === 0) {
    alert(
      "الطلب فارغ"
    );
    return;
  }
  let total = 0;
  cart.forEach(
    function(item) {
      total +=
        item.price *
        item.quantity;
    }
  );
  const orderNumber =
    getNextOrderNumber();
  const now =
    new Date();
  const customer = {
    name:
      document.getElementById(
        "name"
      ).value.trim(),
    phone:
      normalizePhone(
        document.getElementById(
          "phone"
        ).value
      ),
    address:
      document.getElementById(
        "address"
      ).value.trim(),
    notes:
      document.getElementById(
        "notes"
      ).value.trim()
  };
  const order = {
    id:
      createOrderId(),
    number:
      orderNumber,
    type:
      currentOrderType,
    customer:
      customer,
    items:
      JSON.parse(
        JSON.stringify(cart)
      ),
    total:
      Number(
        total.toFixed(2)
      ),
    deviceId:
      DEVICE_ID,
    createdAt:
      now.toISOString(),
    date:
      now.toLocaleString(
        "ar-LB"
      ),
    syncStatus:
      "pending"
  };
  // =================================================
  // حفظ الزبون
  // =================================================
  if (
    customer.phone
  ) {
    if (navigator.onLine) {
      saveCustomer(
        customer
      );
    }
  }
  // =================================================
  // حفظ الطلب
  // =================================================
  saveOrder(
    order
  );
  // =================================================
  // طباعة
  // =================================================
  printReceipt(
    order
  );
  // =================================================
  // تنظيف
  // =================================================
  clearOrder();
  if (navigator.onLine) {
    setTimeout(
      syncNow,
      300
    );
  } else {
    alert(
      "تم حفظ الطلب والزبون على الجهاز.\nسيتم رفع البيانات تلقائياً عند عودة الإنترنت."
    );
  }
}
// =====================================================
// PRINT RECEIPT
// =====================================================
function printReceipt(order) {
  const printWindow =
    window.open(
      "",
      "_blank",
      "width=400,height=700"
    );
  if (!printWindow) {
    alert(
      "المتصفح منع نافذة الطباعة. اسمح بالنوافذ المنبثقة."
    );
    return;
  }
  const itemsHtml =
    order.items
      .map(
        function(item) {
          const total =
            item.price *
            item.quantity;
          return `
            <tr>
              <td>
                ${escapeHtml(
                  item.name
                )}
              </td>
              <td>
                ${item.quantity}
              </td>
              <td>
                $${total.toFixed(2)}
              </td>
            </tr>
          `;
        }
      )
      .join("");
  printWindow.document.write(`
    <!DOCTYPE html>
    <html
      lang="ar"
      dir="rtl">
    <head>
      <meta
        charset="UTF-8">
      <title>
        Tabbara Seafood
      </title>
      <style>
        body {
          font-family: Arial;
          width: 80mm;
          margin: auto;
          padding: 10px;
        }
        h2 {
          text-align: center;
          margin-bottom: 5px;
        }
        p {
          margin: 4px 0;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 15px;
        }
        th,
        td {
          padding: 5px 2px;
          border-bottom: 1px dashed #999;
          text-align: right;
        }
        .total {
          font-size: 20px;
          font-weight: bold;
          margin-top: 15px;
        }
        .center {
          text-align: center;
        }
      </style>
    </head>
    <body>
      <h2>
        🐟 Tabbara Seafood
      </h2>
      <p class="center">
        POS Receipt
      </p>
      <hr>
      <p>
        <strong>
          رقم الطلب:
        </strong>
        ${order.number}
      </p>
      <p>
        <strong>
          نوع الطلب:
        </strong>
        ${escapeHtml(
          order.type
        )}
      </p>
      <p>
        <strong>
          التاريخ:
        </strong>
        ${escapeHtml(
          order.date
        )}
      </p>
      ${
        order.customer.name
          ? `
            <p>
              <strong>
                الزبون:
              </strong>
              ${escapeHtml(
                order.customer.name
              )}
            </p>
          `
          : ""
      }
      ${
        order.customer.phone
          ? `
            <p>
              <strong>
                الهاتف:
              </strong>
              ${escapeHtml(
                order.customer.phone
              )}
            </p>
          `
          : ""
      }
      ${
        order.customer.address
          ? `
            <p>
              <strong>
                العنوان:
              </strong>
              ${escapeHtml(
                order.customer.address
              )}
            </p>
          `
          : ""
      }
      <table>
        <thead>
          <tr>
            <th>
              الصنف
            </th>
            <th>
              الكمية
            </th>
            <th>
              المجموع
            </th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>
      <div class="total">
        المجموع:
        $${order.total.toFixed(2)}
      </div>
      ${
        order.customer.notes
          ? `
            <p>
              <strong>
                ملاحظات:
              </strong>
              ${escapeHtml(
                order.customer.notes
              )}
            </p>
          `
          : ""
      }
      <hr>
      <p class="center">
        شكراً لزيارتكم ❤️
      </p>
      <script>
        window.onload = function() {
          window.print();
          setTimeout(
            function() {
              window.close();
            },
            500
          );
        };
      <\/script>
    </body>
    </html>
  `);
  printWindow.document.close();
}
// =====================================================
// PREVIOUS ORDERS
// =====================================================
async function showOrders() {
  if (navigator.onLine) {
    await syncNow();
  }
  const orders =
    getLocalOrders();
  let overlay =
    document.getElementById(
      "ordersOverlay"
    );
  if (!overlay) {
    overlay =
      document.createElement(
        "div"
      );
    overlay.id =
      "ordersOverlay";
    overlay.style.cssText = `
      position:fixed;
      inset:0;
      background:rgba(0,0,0,0.6);
      z-index:99998;
      padding:20px;
      overflow:auto;
    `;
    document.body.appendChild(
      overlay
    );
  }
  let html = `
    <div style="
      background:white;
      max-width:900px;
      margin:auto;
      border-radius:15px;
      padding:20px;
      direction:rtl;
    ">
      <div style="
        display:flex;
        justify-content:space-between;
        align-items:center;
        gap:10px;
      ">
        <h2>
          📋 الطلبات السابقة
        </h2>
        <button
          type="button"
          onclick="closeOrders()"
          style="
            border:none;
            background:#c62828;
            color:white;
            padding:10px 15px;
            border-radius:8px;
            font-size:16px;
            cursor:pointer;
          "
        >
          ✕ إغلاق
        </button>
      </div>
      <hr>
  `;
  if (orders.length === 0) {
    html +=
      "<p>لا يوجد طلبات سابقة.</p>";
  } else {
    orders.forEach(
      function(order) {
        const status =
          order.syncStatus ===
          "synced"
            ? "🟢 متزامن"
            : "🟠 بانتظار المزامنة";
        html += `
          <div style="
            border:1px solid #ddd;
            border-radius:10px;
            padding:15px;
            margin-bottom:12px;
          ">
            <div style="
              display:flex;
              justify-content:space-between;
              gap:10px;
              flex-wrap:wrap;
            ">
              <strong>
                الطلب #${
                  order.number || "-"
                }
              </strong>
              <span>
                ${status}
              </span>
            </div>
            <p>
              النوع:
              ${escapeHtml(
                order.type || ""
              )}
            </p>
            <p>
              التاريخ:
              ${escapeHtml(
                order.date ||
                formatDate(
                  order.createdAt
                )
              )}
            </p>
            ${
              order.customer &&
              order.customer.name
                ? `
                  <p>
                    الزبون:
                    ${escapeHtml(
                      order.customer.name
                    )}
                  </p>
                `
                : ""
            }
            ${
              order.customer &&
              order.customer.phone
                ? `
                  <p>
                    الهاتف:
                    ${escapeHtml(
                      order.customer.phone
                    )}
                  </p>
                `
                : ""
            }
            <p>
              المجموع:
              <strong>
                $${Number(
                  order.total || 0
                ).toFixed(2)}
              </strong>
            </p>
            <button
              type="button"
              onclick="printReceiptById('${order.id}')"
              style="
                background:#16803c;
                color:white;
                border:none;
                padding:9px 14px;
                border-radius:7px;
                cursor:pointer;
              "
            >
              🖨️ طباعة
            </button>
          </div>
        `;
      }
    );
  }
  html += `
    </div>
  `;
  overlay.innerHTML =
    html;
  overlay.style.display =
    "block";
}
function printReceiptById(id) {
  const orders =
    getLocalOrders();
  const order =
    orders.find(
      function(item) {
        return item.id === id;
      }
    );
  if (order) {
    printReceipt(
      order
    );
  }
}
function closeOrders() {
  const overlay =
    document.getElementById(
      "ordersOverlay"
    );
  if (overlay) {
    overlay.remove();
  }
}
// =====================================================
// MENU MANAGER
// =====================================================
function showMenuManager() {
  let overlay =
    document.getElementById(
      "menuManagerOverlay"
    );
  if (!overlay) {
    overlay =
      document.createElement(
        "div"
      );
    overlay.id =
      "menuManagerOverlay";
    overlay.style.cssText = `
      position:fixed;
      inset:0;
      background:rgba(0,0,0,0.6);
      z-index:99998;
      padding:20px;
      overflow:auto;
    `;
    document.body.appendChild(
      overlay
    );
  }
  renderMenuManager();
}
function renderMenuManager() {
  const overlay =
    document.getElementById(
      "menuManagerOverlay"
    );
  if (!overlay) return;
  let html = `
    <div style="
      background:white;
      max-width:900px;
      margin:auto;
      border-radius:15px;
      padding:20px;
      direction:rtl;
    ">
      <div style="
        display:flex;
        justify-content:space-between;
        align-items:center;
      ">
        <h2>
          ⚙️ إدارة المنيو
        </h2>
        <button
          type="button"
          onclick="closeMenuManager()"
          style="
            border:none;
            background:#c62828;
            color:white;
            padding:10px 15px;
            border-radius:8px;
            cursor:pointer;
          "
        >
          ✕ إغلاق
        </button>
      </div>
      <hr>
  `;
  Object.keys(menu).forEach(
    function(category) {
      html += `
        <h3>
          ${escapeHtml(
            category
          )}
        </h3>
      `;
      menu[category].forEach(
        function(item, index) {
          html += `
            <div style="
              display:flex;
              gap:8px;
              margin-bottom:8px;
              align-items:center;
              flex-wrap:wrap;
            ">
              <input
                id="menuName-${category}-${index}"
                value="${escapeAttribute(
                  item.name
                )}"
                style="
                  flex:2;
                  min-width:150px;
                "
              >
              <input
                id="menuPrice-${category}-${index}"
                type="number"
                step="0.01"
                value="${Number(
                  item.price
                )}"
                style="
                  flex:1;
                  min-width:100px;
                "
              >
              <button
                type="button"
                onclick="updateMenuItem('${escapeAttribute(category)}', ${index})"
                style="
                  background:#16803c;
                  color:white;
                  border:none;
                  padding:10px;
                  border-radius:7px;
                  cursor:pointer;
                "
              >
                حفظ
              </button>
              <button
                type="button"
                onclick="deleteMenuItem('${escapeAttribute(category)}', ${index})"
                style="
                  background:#c62828;
                  color:white;
                  border:none;
                  padding:10px;
                  border-radius:7px;
                  cursor:pointer;
                "
              >
                حذف
              </button>
            </div>
          `;
        }
      );
    }
  );
  html += `
      <hr>
      <h3>
        ➕ إضافة صنف جديد
      </h3>
      <input
        id="newMenuCategory"
        placeholder="التصنيف"
      >
      <input
        id="newMenuName"
        placeholder="اسم الصنف"
      >
      <input
        id="newMenuPrice"
        type="number"
        step="0.01"
        placeholder="السعر"
      >
      <button
        type="button"
        onclick="addNewMenuItem()"
        style="
          width:100%;
          background:#16803c;
          color:white;
          border:none;
          padding:14px;
          border-radius:8px;
          font-size:16px;
          font-weight:bold;
          cursor:pointer;
        "
      >
        ➕ إضافة الصنف
      </button>
    </div>
  `;
  overlay.innerHTML =
    html;
  overlay.style.display =
    "block";
}
function updateMenuItem(
  category,
  index
) {
  const nameInput =
    document.getElementById(
      `menuName-${category}-${index}`
    );
  const priceInput =
    document.getElementById(
      `menuPrice-${category}-${index}`
    );
  if (
    !nameInput ||
    !priceInput
  ) {
    return;
  }
  const name =
    nameInput.value.trim();
  const price =
    Number(
      priceInput.value
    );
  if (!name) {
    alert(
      "اكتب اسم الصنف"
    );
    return;
  }
  if (
    !Number.isFinite(price) ||
    price < 0
  ) {
    alert(
      "السعر غير صحيح"
    );
    return;
  }
  menu[category][index] = {
    name:
      name,
    price:
      price
  };
  saveMenu();
  renderMenuManager();
  showCategory(
    category
  );
}
function addNewMenuItem() {
  const category =
    document.getElementById(
      "newMenuCategory"
    ).value.trim();
  const name =
    document.getElementById(
      "newMenuName"
    ).value.trim();
  const price =
    Number(
      document.getElementById(
        "newMenuPrice"
      ).value
    );
  if (!category) {
    alert(
      "اكتب التصنيف"
    );
    return;
  }
  if (!name) {
    alert(
      "اكتب اسم الصنف"
    );
    return;
  }
  if (
    !Number.isFinite(price) ||
    price < 0
  ) {
    alert(
      "السعر غير صحيح"
    );
    return;
  }
  if (!menu[category]) {
    menu[category] = [];
  }
  menu[category].push({
    name:
      name,
    price:
      price
  });
  saveMenu();
  renderMenuManager();
}
function deleteMenuItem(
  category,
  index
) {
  const item =
    menu[category][index];
  if (!item) return;
  const confirmed =
    confirm(
      `هل تريد حذف "${item.name}"؟`
    );
  if (!confirmed) {
    return;
  }
  menu[category].splice(
    index,
    1
  );
  saveMenu();
  renderMenuManager();
  showCategory(
    category
  );
}
function closeMenuManager() {
  const overlay =
    document.getElementById(
      "menuManagerOverlay"
    );
  if (overlay) {
    overlay.remove();
  }
}
// =====================================================
// CONNECTION STATUS
// =====================================================
function updateConnectionStatus() {
  let status =
    document.getElementById(
      "connectionStatus"
    );
  if (!status) {
    status =
      document.createElement(
        "div"
      );
    status.id =
      "connectionStatus";
    status.style.cssText = `
      position:fixed;
      bottom:15px;
      left:15px;
      z-index:99999;
      padding:8px 13px;
      border-radius:20px;
      background:#ffffff;
      box-shadow:0 2px 10px rgba(0,0,0,0.18);
      font-size:13px;
      font-weight:bold;
    `;
    document.body.appendChild(
      status
    );
  }
  const pending =
    getLocalOrders()
      .filter(
        function(order) {
          return (
            order.syncStatus !==
            "synced"
          );
        }
      )
      .length;
  if (navigator.onLine) {
    if (pending > 0) {
      status.textContent =
        `🟢 Online • ${pending} بانتظار المزامنة`;
    } else {
      status.textContent =
        "🟢 Online • متزامن";
    }
  } else {
    status.textContent =
      `🔴 Offline • ${pending} محفوظ محلياً`;
  }
}
// =====================================================
// SECURITY HELPERS
// =====================================================
function escapeHtml(value) {
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
function escapeAttribute(value) {
  return escapeHtml(
    value
  );
}
function formatDate(value) {
  if (!value) {
    return "";
  }
  try {
    return new Date(
      value
    ).toLocaleString(
      "ar-LB"
    );
  } catch (error) {
    return String(
      value
    );
  }
}
// =====================================================
// INTERNET EVENTS
// =====================================================
window.addEventListener(
  "online",
  function() {
    console.log(
      "Internet connection restored."
    );
    updateConnectionStatus();
    syncNow();
  }
);
window.addEventListener(
  "offline",
  function() {
    console.log(
      "Device is offline."
    );
    updateConnectionStatus();
  }
);
document.addEventListener(
  "visibilitychange",
  function() {
    if (
      document.visibilityState ===
      "visible"
    ) {
      updateConnectionStatus();
      if (navigator.onLine) {
        syncNow();
      }
    }
  }
);
// =====================================================
// PERIODIC SYNC
// =====================================================
setInterval(
  function() {
    if (navigator.onLine) {
      syncNow();
    }
  },
  15000
);
// =====================================================
// START
// =====================================================
document.addEventListener(
  "DOMContentLoaded",
  function() {
    checkLogin();
    showCategory(
      "أسماك"
    );
    updateCart();
    setupCustomerSearch();
    updateConnectionStatus();
    if (navigator.onLine) {
      setTimeout(
        syncNow,
        1000
      );
    }
  }
);
