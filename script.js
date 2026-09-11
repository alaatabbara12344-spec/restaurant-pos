// ============================================================
// TABBARA SEAFOOD POS
// COMPLETE FIXED SCRIPT
// ============================================================

const SUPABASE_URL = "https://tpvhxauivmjgfcugpldp.supabase.co";
const SUPABASE_KEY = "sb_publishable_0n__ZztsS8BQtdVn5lhmmA_WWuHjVg7";
const LOGIN_PASSWORD = "1234";

const CUSTOMER_STORAGE_KEY = "tabbaraCustomers";
const PENDING_ORDERS_KEY = "tabbara_pending_orders";
const MENU_STORAGE_KEY = "tabbaraMenu";
const DEVICE_ID_KEY = "tabbaraDeviceId";
const DELIVERY_CHARGE_KEY = "tabbaraDeliveryCharge";
const DEFAULT_DELIVERY_CHARGE = 2;
const CLOUD_MENU_ID = "1";

let deviceId = localStorage.getItem(DEVICE_ID_KEY);
if (!deviceId) {
  deviceId = "device-" + Date.now() + "-" + Math.random().toString(36).substring(2, 10);
  localStorage.setItem(DEVICE_ID_KEY, deviceId);
}

const DEFAULT_MENU = [
  {id:"fish_ajaj",name:"أجاج",category:"🐟 الأسماك",type:"weight",pricing:{base:12,grill:3,fry:4},available:true},
  {id:"fish_boraq",name:"براق",category:"🐟 الأسماك",type:"weight",pricing:{base:14,grill:3,fry:4},available:true},
  {id:"fish_sardine",name:"سردين",category:"🐟 الأسماك",type:"weight",pricing:{base:8,grill:2,fry:3},available:true},
  {id:"fish_laqz_sandy",name:"لقز رملي",category:"🐟 الأسماك",type:"weight",pricing:{base:16,grill:3,fry:4},available:true},
  {id:"fish_laqz_rocky",name:"لقز صخري",category:"🐟 الأسماك",type:"weight",pricing:{base:18,grill:3,fry:4},available:true},
  {id:"fish_sultan",name:"سلطان",category:"🐟 الأسماك",type:"weight",pricing:{base:15,grill:3,fry:4},available:true},
  {id:"fish_masqar",name:"مسقار",category:"🐟 الأسماك",type:"weight",pricing:{base:13,grill:3,fry:4},available:true},
  {id:"fish_malifa",name:"مليفة",category:"🐟 الأسماك",type:"weight",pricing:{base:12,grill:3,fry:4},available:true},
  {id:"fish_jarbidi",name:"جربيدي",category:"🐟 الأسماك",type:"weight",pricing:{base:14,grill:3,fry:4},available:true},
  {id:"fish_armout_blond",name:"عرموط أشقر",category:"🐟 الأسماك",type:"weight",pricing:{base:11,grill:3,fry:4},available:true},
  {id:"fish_armout_cut",name:"عرموط مقطع",category:"🐟 الأسماك",type:"weight",pricing:{base:12,grill:3,fry:4},available:true},

  {id:"seafood_shrimp_medium",name:"قريدس وسط",category:"🦐 ثمار البحر",type:"weight",pricing:{base:16,grill:2,fry:3},available:true},
  {id:"seafood_shrimp_large",name:"قريدس كبير",category:"🦐 ثمار البحر",type:"weight",pricing:{base:20,grill:2,fry:3},available:true},
  {id:"seafood_calamari",name:"كالامار",category:"🦐 ثمار البحر",type:"weight",pricing:{base:14,grill:2,fry:3},available:true},
  {id:"seafood_fillet_fresh",name:"فيليه طازج",category:"🦐 ثمار البحر",type:"weight",pricing:{base:17,grill:3,fry:4},available:true},
  {id:"seafood_fillet_crispy",name:"فيليه مقرمش",category:"🦐 ثمار البحر",type:"weight",pricing:{base:18,grill:2,fry:3},available:true},
  {id:"seafood_mix",name:"ثمار البحر",category:"🦐 ثمار البحر",type:"sizes",sizes:{صغير:15,وسط:22,سطل:35},available:true},

  {id:"meal_free_fish",name:"سمكة حرة",category:"🍽️ الوجبات والساندويش",type:"meal",prices:{وجبة:15,ساندويش:8},available:true},
  {id:"meal_shrimp",name:"قريدس",category:"🍽️ الوجبات والساندويش",type:"meal",prices:{وجبة:15,ساندويش:8},available:true},
  {id:"meal_seafood",name:"ثمار البحر",category:"🍽️ الوجبات والساندويش",type:"meal",prices:{وجبة:16,ساندويش:9},available:true},
  {id:"meal_calamari",name:"كالامار",category:"🍽️ الوجبات والساندويش",type:"meal",prices:{وجبة:14,ساندويش:8},available:true},
  {id:"meal_sardine",name:"سردين",category:"🍽️ الوجبات والساندويش",type:"meal",prices:{وجبة:11,ساندويش:7},available:true},

  {id:"app_sayadieh",name:"صيادية",category:"🥗 المقبلات",type:"sizes",sizes:{صغير:5,وسط:8,كبير:11},available:true},
  {id:"app_mtabbal",name:"متبل",category:"🥗 المقبلات",type:"fixed",price:4,available:true},
  {id:"app_shakshuka",name:"شكشوكة",category:"🥗 المقبلات",type:"fixed",price:5,available:true},
  {id:"app_tarator",name:"طرطور كبير",category:"🥗 المقبلات",type:"fixed",price:4,available:true},
  {id:"app_fries",name:"بطاطا مقلية",category:"🥗 المقبلات",type:"sizes",sizes:{صغير:3,وسط:5,كبير:7},available:true},

  {id:"salad_tabouleh",name:"تبولة",category:"🥬 السلطات",type:"fixed",price:6,available:true},
  {id:"salad_fattoush",name:"فتوش",category:"🥬 السلطات",type:"fixed",price:6,available:true},
  {id:"salad_crab",name:"سلطة كراب",category:"🥬 السلطات",type:"fixed",price:8,available:true},

  {id:"drink_pepsi",name:"Pepsi",category:"🥤 المشروبات",type:"sizes",sizes:{صغير:2,كبير:3},available:true},
  {id:"drink_7up",name:"7up",category:"🥤 المشروبات",type:"sizes",sizes:{صغير:2,كبير:3},available:true},
  {id:"drink_miranda",name:"Miranda",category:"🥤 المشروبات",type:"sizes",sizes:{صغير:2,كبير:3},available:true}
];

const CATEGORIES = [
  "🐟 الأسماك","🦐 ثمار البحر","🍽️ الوجبات والساندويش",
  "🎁 العروض","🥗 المقبلات","🥬 السلطات","🥤 المشروبات"
];

let menu = [];
let cart = [];
let selectedOrderType = "";
let currentCategory = "";
let currentModalItem = null;
let deliveryCharge = DEFAULT_DELIVERY_CHARGE;

function loadDeliveryCharge(){
  const saved=Number(localStorage.getItem(DELIVERY_CHARGE_KEY));
  deliveryCharge=Number.isFinite(saved)&&saved>=0?saved:DEFAULT_DELIVERY_CHARGE;
}
async function syncDeliveryChargeFromCloud(){
  if(!navigator.onLine)return false;
  try{
    const r=await fetch(`${SUPABASE_URL}/rest/v1/pos_settings?id=eq.delivery_charge&select=id,value,updated_at`,{headers:{apikey:SUPABASE_KEY,Authorization:"Bearer "+SUPABASE_KEY}});
    if(!r.ok)throw new Error("Settings download failed: "+r.status);
    const rows=await r.json();
    if(rows.length){
      const v=Number(rows[0].value);
      if(Number.isFinite(v)&&v>=0){deliveryCharge=v;localStorage.setItem(DELIVERY_CHARGE_KEY,String(v));renderCart();}
    }
    return true;
  }catch(e){console.warn("Cloud delivery charge sync unavailable:",e);return false;}
}
async function saveDeliveryCharge(){
  const input=document.getElementById("deliveryChargeInput");
  const v=Number(input?.value);
  if(!Number.isFinite(v)||v<0)return alert("أدخل رسم توصيل صحيح (0 أو أكثر).");
  deliveryCharge=Number(v.toFixed(2));
  localStorage.setItem(DELIVERY_CHARGE_KEY,String(deliveryCharge));
  try{
    if(navigator.onLine){
      const r=await fetch(`${SUPABASE_URL}/rest/v1/pos_settings?on_conflict=id`,{method:"POST",headers:{apikey:SUPABASE_KEY,Authorization:"Bearer "+SUPABASE_KEY,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates,return=minimal"},body:JSON.stringify({id:"delivery_charge",value:deliveryCharge,updated_at:new Date().toISOString()})});
      if(!r.ok)throw new Error("Settings save failed: "+r.status);
    }
    renderCart();
    showMenuManager();
    alert("تم حفظ رسم التوصيل: $"+money(deliveryCharge));
  }catch(e){
    console.warn(e);
    renderCart();
    showMenuManager();
    alert("تم حفظه على الجهاز، وسيتم مزامنته عند توفر الاتصال.");
  }
}

function cloudRowToLocal(row) {
  const data = row.data && typeof row.data === "object" ? row.data : {};
  const categoryMap = {
    "الأسماك":"🐟 الأسماك",
    "ثمار البحر":"🦐 ثمار البحر",
    "الوجبات والساندويش":"🍽️ الوجبات والساندويش",
    "العروض":"🎁 العروض",
    "المقبلات":"🥗 المقبلات",
    "السلطات":"🥬 السلطات",
    "المشروبات":"🥤 المشروبات"
  };
  const item = {
    id: String(row.id),
    name: row.name || "",
    category: categoryMap[row.category] || row.category || "",
    type: row.type || "fixed",
    available: row.available !== false
  };

  const defaultItem = DEFAULT_MENU.find(x => String(x.id) === String(row.id));
  // Keep size options safe if an older cloud row lost its type/data.
  if (item.type === "fixed" && defaultItem?.type === "sizes" && !data.sizes) {
    item.type = "sizes";
    item.sizes = { ...(defaultItem.sizes || {}) };
  } else if (item.type === "sizes") {
    const cloudSizes = data.sizes || data.prices?.sizes || data.options || {};
    item.sizes = Object.keys(cloudSizes).length ? { ...cloudSizes } : { ...(defaultItem?.sizes || {}) };
  }

  if (item.type === "weight") {
    item.pricing = {
      base: Number(data.base ?? data.basePrice ?? defaultItem?.pricing?.base ?? 0),
      grill: Number(data.grill ?? data.grillSurcharge ?? defaultItem?.pricing?.grill ?? 0),
      fry: Number(data.fry ?? data.frySurcharge ?? defaultItem?.pricing?.fry ?? 0)
    };
  } else if (item.type === "sizes") {
    item.sizes = { ...(item.sizes || {}) };
  } else if (item.type === "meal") {
    item.prices = {
      وجبة: Number(data.meal ?? data.وجبة ?? data.prices?.وجبة ?? 0),
      ساندويش: Number(data.sandwich ?? data.ساندويش ?? data.prices?.ساندويش ?? 0)
    };
  } else if (item.type === "offer") {
    item.price = Number(data.price ?? row.price ?? 0);
    item.includedItems = Array.isArray(data.includedItems) ? data.includedItems.map(x => ({...x})) : [];
  } else {
    item.price = Number(data.price ?? row.price ?? 0);
  }
  return item;
}

function localToCloudRow(item) {
  const data = {};
  if (item.type === "weight") {
    data.base = Number(item.pricing?.base || 0);
    data.grill = Number(item.pricing?.grill || 0);
    data.fry = Number(item.pricing?.fry || 0);
  } else if (item.type === "sizes") {
    data.sizes = {...(item.sizes || {})};
  } else if (item.type === "meal") {
    data.meal = Number(item.prices?.وجبة || 0);
    data.sandwich = Number(item.prices?.ساندويش || 0);
  } else if (item.type === "offer") {
    data.price = Number(item.price || 0);
    data.includedItems = Array.isArray(item.includedItems) ? item.includedItems.map(x => ({...x})) : [];
  } else {
    data.price = Number(item.price || 0);
  }
  return {
    id: String(item.id),
    name: item.name || "",
    category: item.category || "",
    type: item.type || "fixed",
    available: item.available !== false,
    data,
    updated_at: new Date().toISOString()
  };
}

function loadMenu() {
  try {
    const saved = localStorage.getItem(MENU_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length) { menu = parsed; return; }
    }
  } catch(e) { console.error(e); }
  menu = JSON.parse(JSON.stringify(DEFAULT_MENU));
  localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(menu));
}

let menuSaveTimer = null;
function saveMenu() {
  localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(menu));
  clearTimeout(menuSaveTimer);
  menuSaveTimer = setTimeout(() => syncMenuToCloud(), 150);
}

async function syncMenuFromCloud() {
  if (!navigator.onLine) return false;
  try {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/pos_menu?select=id,name,category,type,available,data,updated_at&order=updated_at.asc`, {
      headers:{apikey:SUPABASE_KEY,Authorization:"Bearer "+SUPABASE_KEY}
    });
    if (!r.ok) throw new Error("Menu download failed: "+r.status);
    const rows = await r.json();
    if (!Array.isArray(rows) || !rows.length) return false;

    menu = rows.map(cloudRowToLocal);
    localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(menu));
    renderCategories(); renderItems(); renderCart();
    return true;
  } catch(e) {
    console.warn("Cloud menu sync unavailable:",e);
    return false;
  }
}

async function syncMenuToCloud() {
  if (!navigator.onLine || !Array.isArray(menu) || !menu.length) return false;
  try {
    const headers={apikey:SUPABASE_KEY,Authorization:"Bearer "+SUPABASE_KEY};
    const rows = menu.map(localToCloudRow);
    const r = await fetch(`${SUPABASE_URL}/rest/v1/pos_menu?on_conflict=id`, {
      method:"POST",
      headers:{...headers,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates,return=minimal"},
      body:JSON.stringify(rows)
    });
    if (!r.ok) throw new Error("Menu sync failed: "+r.status);

    // Remove cloud menu items that were deliberately deleted on this device.
    const currentIds = new Set(menu.map(i=>String(i.id)));
    const all = await fetch(`${SUPABASE_URL}/rest/v1/pos_menu?select=id`, {headers});
    if (all.ok) {
      const cloudRows = await all.json();
      const deletedIds = cloudRows.map(x=>String(x.id)).filter(id=>!currentIds.has(id));
      for (const id of deletedIds) {
        await fetch(`${SUPABASE_URL}/rest/v1/pos_menu?id=eq.${encodeURIComponent(id)}`, {method:"DELETE",headers});
      }
    }
    return true;
  } catch(e) {
    console.warn("Menu cloud save failed:",e);
    return false;
  }
}

let menuSyncInterval = null;
function startMenuAutoSync() {
  if (menuSyncInterval) clearInterval(menuSyncInterval);
  menuSyncInterval = setInterval(() => {
    if (navigator.onLine) {
      syncMenuFromCloud();
      syncDeliveryChargeFromCloud();
    }
  }, 10000);
}

function money(v) { return Number(v || 0).toFixed(2); }
function escapeHtml(v) {
  return String(v ?? "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;");
}
function generateId(prefix="id") {
  if (prefix === "order") {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(c){
      const r=Math.random()*16|0, v=c==="x"?r:(r&0x3|0x8);
      return v.toString(16);
    });
  }
  return prefix+"-"+Date.now()+"-"+Math.random().toString(36).substring(2,9);
}
function getItemById(id) { return menu.find(i => i.id === id); }
function getSubtotal() { return cart.reduce((s,i)=>s+Number(i.total||0),0); }
function getDeliveryCharge() { return selectedOrderType === "Delivery" || selectedOrderType === "Delevery" ? Number(deliveryCharge||0) : 0; }
function getTotal() { return getSubtotal() + getDeliveryCharge(); }
function getDeviceId() { return deviceId; }

function normalizePhone(phone) {
  if (phone == null) return "";
  let value = String(phone).trim().replace(/[\s\-().]/g,"");
  if (!value) return "";
  if (value.startsWith("00")) value = "+" + value.substring(2);
  if (value.startsWith("+961")) value = value.substring(4);
  else if (value.startsWith("961")) value = value.substring(3);
  // Lebanese mobile numbers: 03, 70, 71, 76, 78, 79, 81...
  if (value.startsWith("0")) value = value.substring(1);
  if (/^(3|70|71|76|78|79|81)\d{6}$/.test(value)) return "+961" + value;
  return value.startsWith("+") ? value : "+" + value;
}

function phoneVariants(phone) {
  const n = normalizePhone(phone);
  if (!n) return [];
  const local = n.startsWith("+961") ? n.substring(4) : n.replace(/^\+/,"");
  const compact = local.startsWith("0") ? local : "0" + local;
  return [...new Set([n, "961" + local, local, compact, "+961" + local])];
}

function formatOrderDateTime(value) {
  if (!value) return "";
  try {
    return new Date(value).toLocaleString("ar-LB", {
      year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", hour12: true
    });
  } catch(e) { return String(value); }
}

function login() {
  const p=document.getElementById("loginPassword"), e=document.getElementById("loginError");
  if (!p) return;
  if (p.value === LOGIN_PASSWORD) {
    localStorage.setItem("tabbaraLoggedIn","true");
    if(e)e.textContent="";
    showApp();
  } else if(e) e.textContent="كلمة المرور غير صحيحة";
}
function logout(){localStorage.removeItem("tabbaraLoggedIn");location.reload();}
function showApp(){
  const l=document.getElementById("loginScreen"); if(l)l.style.display="none";
  const a=document.querySelector(".app"); if(a)a.style.display="block";
  updateConnectionStatus(); renderCategories(); showPOS();
}
function updateConnectionStatus(){
  const e=document.getElementById("connectionStatus"); if(!e)return;
  e.textContent=navigator.onLine?"🟢 متصل":"🔴 بدون إنترنت";
  e.style.color=navigator.onLine?"#16a34a":"#dc2626";
}
window.addEventListener("online",async()=>{updateConnectionStatus();await syncMenuFromCloud();await syncPendingOrders();});
window.addEventListener("offline",updateConnectionStatus);

function modal(title,content){
  const root=document.getElementById("modalRoot"); if(!root)return;
  root.innerHTML=`<div class="modal-backdrop" onclick="closeModal(event)">
    <div class="modal-box" onclick="event.stopPropagation()">
      <div class="modal-header"><h3>${escapeHtml(title)}</h3><button onclick="closeModal()">✕</button></div>
      <div class="modal-body">${content}</div>
    </div></div>`;
}
function closeModal(){const r=document.getElementById("modalRoot");if(r)r.innerHTML="";currentModalItem=null;}

function setOrderType(type){
  selectedOrderType=type;
  const e=document.getElementById("orderType");if(e)e.textContent=type;
  document.getElementById("deliveryBtn")?.classList.toggle("active",type==="Delivery" || type==="Delevery");
  document.getElementById("pickupBtn")?.classList.toggle("active",type==="استلام من المحل");
  showPOS();
}
function renderCategories(){
  const c=document.getElementById("categories");if(!c)return;
  c.innerHTML=CATEGORIES.map(x=>`<button class="category-btn ${currentCategory===x?"active":""}" onclick='selectCategory(${JSON.stringify(x)})'>${escapeHtml(x)}</button>`).join("");
}
function selectCategory(c){currentCategory=c;renderCategories();renderItems();}
function showPOS(){renderCategories();renderItems();renderCart();}
function renderItems(){
  const c=document.getElementById("items");if(!c)return;
  if(!selectedOrderType){c.innerHTML='<div class="empty-state">اختر نوع الطلب أولاً</div>';return;}
  if(!currentCategory){c.innerHTML='<div class="empty-state">اختر القسم</div>';return;}
  const items=menu.filter(i=>i.category===currentCategory);
  if(!items.length){c.innerHTML='<div class="empty-state">لا يوجد أصناف حالياً</div>';return;}
  c.innerHTML=items.map(item=>{
    const disabled=item.available===false;
    return `<button class="menu-item ${disabled?"disabled":""}" ${disabled?"disabled":`onclick='openItem(${JSON.stringify(item.id)})'`}>
      <div class="menu-item-name">${escapeHtml(item.name)}</div>
      <div class="menu-item-price">${disabled?"منتهي":getDisplayPrice(item)}</div>
    </button>`;
  }).join("");
}
function getDisplayPrice(item){
  if(item.type==="fixed")return money(item.price);
  if(item.type==="weight")return "ابتداءً من "+money(item.pricing?.base)+" / كغ";
  if(item.type==="sizes"){const v=Object.values(item.sizes||{});return v.length?"ابتداءً من "+money(Math.min(...v)):"";}
  if(item.type==="meal")return "وجبة "+money(item.prices?.وجبة)+" | ساندويش "+money(item.prices?.ساندويش);
  if(item.type==="offer")return money(item.price);
  return "";
}

function openItem(id){
  const item=getItemById(id);if(!item)return;
  if(item.available===false){alert("هذا الصنف منتهي حالياً");return;}
  currentModalItem=item;
  if(item.type==="weight")return openWeightModal(item);
  if(item.type==="sizes")return openSizesModal(item);
  if(item.type==="meal")return openMealModal(item);
  if(item.type==="offer")return addOfferToCart(item);
  addToCart({id:generateId("cart"),menuItemId:item.id,name:item.name,quantity:1,unitPrice:Number(item.price||0),total:Number(item.price||0)});
  renderCart();
}

function openWeightModal(item){
  const p=item.pricing||{};
  modal(item.name,`<div class="option-group"><label>الوزن بالكيلو</label><input id="weightInput" type="number" min="0.01" step="0.01" value="1" class="modal-input"></div>
  <div class="option-group"><label>طريقة التحضير</label><div class="option-buttons">
  <button type="button" onclick="selectPreparation('ني')" id="prep-raw" class="option-btn active">ني</button>
  <button type="button" onclick="selectPreparation('مشوي')" id="prep-grill" class="option-btn">مشوي (+${money(p.grill)})</button>
  <button type="button" onclick="selectPreparation('مقلي')" id="prep-fry" class="option-btn">مقلي (+${money(p.fry)})</button>
  </div></div><input type="hidden" id="preparationInput" value="ني">
  <button type="button" class="modal-confirm-btn" onclick="confirmWeightItem()">إضافة للطلب</button>`);
}
function selectPreparation(v){
  const i=document.getElementById("preparationInput");if(i)i.value=v;
  document.querySelectorAll(".option-btn").forEach(b=>b.classList.remove("active"));
  document.getElementById(v==="ني"?"prep-raw":v==="مشوي"?"prep-grill":"prep-fry")?.classList.add("active");
}
function confirmWeightItem(){
  const item=currentModalItem;if(!item)return;
  const w=Number(document.getElementById("weightInput")?.value);
  if(!w||w<=0)return alert("أدخل وزن صحيح");
  const prep=document.getElementById("preparationInput")?.value||"ني";
  const p=item.pricing||{};
  const base=Number(p.base||0);
  const grill=Number(p.grill||0);
  const fry=Number(p.fry||0);
  const preparationCost=prep==="مشوي"?grill:prep==="مقلي"?fry:0;
  const unitPrice=base+preparationCost;
  const total=(base+preparationCost)*w;
  addToCart({id:generateId("cart"),menuItemId:item.id,name:item.name,preparation:prep,weight:w,quantity:1,unitPrice,total});
  closeModal();renderCart();
}
function openSizesModal(item){
  const buttons=Object.entries(item.sizes||{}).map(([s,p],n)=>`<button type="button" class="size-option ${n===0?"active":""}" onclick="selectSizeOption(this)" data-size="${escapeHtml(s)}" data-price="${Number(p)}"><strong>${escapeHtml(s)}</strong><span>${money(p)}</span></button>`).join("");
  modal(item.name,`<div id="sizeOptions" class="size-options">${buttons}</div><button type="button" class="modal-confirm-btn" onclick="confirmSizeItem()">إضافة للطلب</button>`);
}
function selectSizeOption(b){document.querySelectorAll(".size-option").forEach(x=>x.classList.remove("active"));b.classList.add("active");}
function confirmSizeItem(){
  const item=currentModalItem,s=document.querySelector(".size-option.active");if(!item||!s)return;
  const p=Number(s.dataset.price);
  addToCart({id:generateId("cart"),menuItemId:item.id,name:item.name,size:s.dataset.size,quantity:1,unitPrice:p,total:p});
  closeModal();renderCart();
}
function openMealModal(item){
  const p=item.prices||{};
  modal(item.name,`<div class="option-buttons">
    <button type="button" class="option-btn active" onclick="confirmMealItem('وجبة')">وجبة<strong>${money(p.وجبة)}</strong></button>
    <button type="button" class="option-btn" onclick="confirmMealItem('ساندويش')">ساندويش<strong>${money(p.ساندويش)}</strong></button>
  </div>`);
}
function confirmMealItem(type){
  const item=currentModalItem;if(!item)return;
  const p=Number(item.prices?.[type]||0);if(p<=0)return alert("السعر غير محدد");
  addToCart({id:generateId("cart"),menuItemId:item.id,name:item.name,option:type,quantity:1,unitPrice:p,total:p});
  closeModal();renderCart();
}

function addOfferToCart(item){
  const details=(item.includedItems||[]).map(x=>{
    const mi=getItemById(x.menuItemId);
    return {name:mi?.name||"",weight:x.weight||null,size:x.size||null,quantity:x.quantity||1};
  });
  addToCart({id:generateId("cart"),menuItemId:item.id,name:item.name,quantity:1,unitPrice:Number(item.price||0),total:Number(item.price||0),offerDetails:details});
}

function addToCart(item){cart.push(item);renderCart();}
function removeFromCart(id){cart=cart.filter(i=>i.id!==id);renderCart();}
function changeCartQuantity(id,amount){
  const i=cart.find(x=>x.id===id);if(!i)return;
  i.quantity=Math.max(1,Number(i.quantity||1)+amount);
  i.total=i.weight?Number(i.unitPrice||0)*Number(i.weight||0)*i.quantity:Number(i.unitPrice||0)*i.quantity;
  renderCart();
}
function renderCart(){
  const c=document.getElementById("cartItems"),t=document.getElementById("total");if(!c)return;
  if(!cart.length)c.innerHTML='<div class="empty-cart">السلة فارغة</div>';
  else c.innerHTML=cart.map(i=>{
    let d=i.weight?`${Number(i.weight).toFixed(2)} كغ • ${escapeHtml(i.preparation||"ني")}`:i.size?escapeHtml(i.size):i.option?escapeHtml(i.option):"";
    const offerDetails=i.offerDetails&&i.offerDetails.length?`<small style="display:block;margin-top:4px">${i.offerDetails.map(x=>escapeHtml([x.name,x.weight?`${Number(x.weight).toFixed(2)} كغ`:"",x.size||"",x.quantity>1?`× ${x.quantity}`:""].filter(Boolean).join(" - "))).join(" + ")}</small>`:"";
    return `<div class="cart-item"><div class="cart-item-info"><strong>${escapeHtml(i.name)}</strong>${d?`<small>${d}</small>`:""}${offerDetails}</div>
    <div class="cart-item-controls"><span>${i.quantity||1}</span><button class="remove-btn" onclick="removeFromCart('${i.id}')" aria-label="حذف الصنف">🗑 حذف</button></div>
    <div class="cart-item-total">${money(i.total)}</div></div>`;
  }).join("");
  if(t){
    const subtotal=getSubtotal(),charge=getDeliveryCharge(),total=subtotal+charge;
    t.innerHTML=selectedOrderType==="Delivery" || selectedOrderType==="Delevery"
      ? `<div style="font-size:15px;font-weight:normal;margin-bottom:5px">المجموع الفرعي: $${money(subtotal)}</div><div style="font-size:15px;font-weight:normal;margin-bottom:5px">delivery charge: $${money(charge)}</div><div>المجموع: $${money(total)}</div>`
      : `المجموع: $${money(total)}`;
  }
}

function loadCustomers(){try{return JSON.parse(localStorage.getItem(CUSTOMER_STORAGE_KEY)||"[]")}catch(e){return[]}}
function saveCustomers(c){localStorage.setItem(CUSTOMER_STORAGE_KEY,JSON.stringify(c))}
function cacheCustomer(customer){
  const phone=normalizePhone(customer?.phone);if(!phone)return;
  const cs=loadCustomers(),idx=cs.findIndex(x=>normalizePhone(x.phone)===phone);
  const r={phone,name:customer.name||"",address:customer.address||"",notes:customer.notes||"",updated_at:new Date().toISOString()};
  if(idx>=0)cs[idx]={...cs[idx],...r};else cs.push(r);saveCustomers(cs);
}
function fillCustomerFields(c){
  ["phone","name","address","notes"].forEach(id=>{const e=document.getElementById(id);if(e)e.value=c?.[id]||""});
}
async function findCustomer(phone){
  const n=normalizePhone(phone);if(!n)return null;
  const local=loadCustomers().find(x=>normalizePhone(x.phone)===n);
  if(local){fillCustomerFields(local);return local;}
  if(!navigator.onLine)return null;
  try{
    // Search all stored formats and normalize them locally, so 70xxxxxx, 03xxxxxx, 961..., and +961... match the same customer.
    const r=await fetch(`${SUPABASE_URL}/rest/v1/customers?select=*&limit=1000`,{headers:{apikey:SUPABASE_KEY,Authorization:"Bearer "+SUPABASE_KEY}});
    if(!r.ok)return null;
    const d=await r.json();
    const found=(Array.isArray(d)?d:[]).find(x=>normalizePhone(x.phone)===n);
    if(found){cacheCustomer(found);fillCustomerFields(found);return found;}
  }catch(e){console.error(e)}
  return null;
}
async function handlePhoneChange(){
  const p=document.getElementById("phone")?.value;
  const n=normalizePhone(p);
  if(n && n.replace(/\D/g,"").length>=8) await findCustomer(p);
}
async function saveCustomer(c){
  const n=normalizePhone(c?.phone);if(!n)return null;
  const r={phone:n,name:c.name||"",address:c.address||"",notes:c.notes||"",updated_at:new Date().toISOString()};
  cacheCustomer(r);
  if(!navigator.onLine)return r;
  try{
    await fetch(`${SUPABASE_URL}/rest/v1/customers?on_conflict=phone`,{method:"POST",headers:{apikey:SUPABASE_KEY,Authorization:"Bearer "+SUPABASE_KEY,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates,return=minimal"},body:JSON.stringify(r)});
  }catch(e){console.error(e)}
  return r;
}

function loadPendingOrders(){try{return JSON.parse(localStorage.getItem(PENDING_ORDERS_KEY)||"[]")}catch(e){return[]}}
function savePendingOrders(o){localStorage.setItem(PENDING_ORDERS_KEY,JSON.stringify(o))}
function addPendingOrder(o){const p=loadPendingOrders();p.push(o);savePendingOrders(p)}
async function sendOrder(order){
  const r=await fetch(`${SUPABASE_URL}/rest/v1/orders`,{method:"POST",headers:{apikey:SUPABASE_KEY,Authorization:"Bearer "+SUPABASE_KEY,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify({...order,sync_status:"synced"})});
  if(!r.ok)throw new Error("Order save failed: "+r.status);
  return true;
}
async function syncPendingOrders(){
  if(!navigator.onLine)return;
  const p=loadPendingOrders(),remaining=[];
  for(const o of p){try{await sendOrder(o)}catch(e){console.error(e);remaining.push(o)}}
  savePendingOrders(remaining);
}

function clearOrder(){
  cart=[];
  ["name","phone","address","notes"].forEach(id=>{const e=document.getElementById(id);if(e)e.value=""});
  const m=document.getElementById("customerMessage");if(m)m.textContent="";
  selectedOrderType="";currentCategory="";
  const ot=document.getElementById("orderType");if(ot)ot.textContent="لم يتم الاختيار";
  document.querySelectorAll("#deliveryBtn,#pickupBtn").forEach(b=>b.classList.remove("active"));
  renderCategories();renderItems();renderCart();
}

async function confirmOrder(){
  if(!selectedOrderType)return alert("اختار نوع الطلب أولاً.");
  if(!cart.length)return alert("السلة فارغة.");
  const name=document.getElementById("name")?.value.trim()||"";
  const phoneInput=document.getElementById("phone")?.value.trim()||"";
  const phone=normalizePhone(phoneInput);
  const address=document.getElementById("address")?.value.trim()||"";
  const notes=document.getElementById("notes")?.value.trim()||"";
  if(selectedOrderType==="Delivery" || selectedOrderType==="Delevery"){
    if(!name)return alert("اكتب اسم الزبون.");
    if(!phone)return alert("اكتب رقم الهاتف.");
    if(!address)return alert("اكتب عنوان التوصيل.");
  }
  const order={
    id:generateId("order"),
    order_type:selectedOrderType,
    customer_name:name||null,customer_phone:phone||null,customer_address:address||null,notes:notes||null,
    items:cart.map(i=>({id:i.id,menu_item_id:i.menuItemId||null,name:i.name,category:getItemById(i.menuItemId)?.category||null,quantity:Number(i.quantity||1),unit_price:Number(i.unitPrice||0),total:Number(i.total||0),weight:i.weight||null,preparation:i.preparation||null,size:i.size||null,option:i.option||null,offerDetails:i.offerDetails||null})),
    delivery_charge:Number(getDeliveryCharge().toFixed(2)),
    total:Number(getTotal().toFixed(2)),device_id:getDeviceId(),sync_status:navigator.onLine?"synced":"pending",created_at:new Date().toISOString()
  };
  if(phone){try{await saveCustomer({phone,name,address,notes})}catch(e){console.warn(e)}}
  let sent=false;
  if(navigator.onLine){try{await sendOrder(order);sent=true}catch(e){console.warn(e)}}
  if(!sent)addPendingOrder({...order,sync_status:"pending"});
  window.lastCompletedOrder=order;
  const invoiceItems=(order.items||[]).map(i=>{
    const details=[i.weight?`${Number(i.weight).toFixed(2)} كغ`:"",i.preparation||"",i.size||"",i.option||"",i.quantity>1?`× ${i.quantity}`:""].filter(Boolean).join(" • ");
    return `<div class="confirm-invoice-row">
      <div class="confirm-invoice-item"><strong>${escapeHtml(i.name||"")}</strong>${details?`<small>${escapeHtml(details)}</small>`:""}</div>
      <div class="confirm-invoice-qty">${Number(i.quantity||1)}</div>
      <div class="confirm-invoice-price">${money(i.total)}</div>
    </div>`;
  }).join("");

  modal("تم تأكيد الطلب",`<div class="confirm-order-screen">
    <div class="confirm-success">
      <div class="confirm-check">✓</div>
      <div class="confirm-success-title">${sent?"تم حفظ الطلب بنجاح.":"تم حفظ الطلب على الجهاز وسيتم مزامنته عند عودة الإنترنت."}</div>
    </div>

    <div class="invoice-preview-wrap">
      <div class="invoice-preview-title">معاينة الفاتورة — كما ستُطبع 80mm</div>
      <div class="invoice-preview">
        <h4>Tabbara Fish</h4>
        <div class="invoice-preview-center">${escapeHtml((order.order_type||"")==="Delevery"?"Delivery":(order.order_type||""))}</div>
        <div class="invoice-preview-date">${escapeHtml(formatOrderDateTime(order.created_at))}</div>
        ${order.customer_name?`<div>الزبون: ${escapeHtml(order.customer_name)}</div>`:""}
        ${order.customer_phone?`<div>الهاتف: ${escapeHtml(order.customer_phone)}</div>`:""}
        ${order.customer_address?`<div>العنوان: ${escapeHtml(order.customer_address)}</div>`:""}
        <div class="confirm-invoice-head"><span>الصنف</span><span>العدد</span><span>السعر</span></div>
        ${invoiceItems||'<div class="invoice-preview-empty">لا يوجد أصناف</div>'}
        ${Number(order.delivery_charge||0)>0?`<div class="confirm-invoice-subtotal"><span>delivery charge</span><strong>${money(order.delivery_charge)}</strong></div>`:""}
        <div class="confirm-invoice-total"><span>المجموع</span><strong>${money(order.total)}</strong></div>
        ${order.notes?`<div class="confirm-invoice-notes">ملاحظات: ${escapeHtml(order.notes)}</div>`:""}
        <div class="invoice-preview-thanks">شكراً لزيارتكم ❤️</div>
      </div>
    </div>

    <div class="confirm-action-buttons">
      <button class="primary confirm-print-btn" onclick="printInvoice(window.lastCompletedOrder)">🖨️ طباعة الفاتورة</button>
      <button class="secondary confirm-new-btn" onclick="closeModal();clearOrder()">طلب جديد</button>
    </div>
  </div>`);
}

async function deletePreviousOrder(orderId){
  if(!orderId)return alert("رقم الطلب غير موجود.");
  if(!navigator.onLine)return alert("لا يمكن حذف الطلب بدون إنترنت.");
  if(!confirm("أكيد بدك تحذف هالطلب؟\nالحذف من الطلبات فقط، وبيانات الزبون ما بتنحذف."))return;
  try{
    const r=await fetch(`${SUPABASE_URL}/rest/v1/orders?id=eq.${encodeURIComponent(orderId)}`,{
      method:"DELETE",
      headers:{apikey:SUPABASE_KEY,Authorization:`Bearer ${SUPABASE_KEY}`,Prefer:"return=minimal"}
    });
    if(!r.ok)throw new Error("Delete failed: "+r.status);
    await showOrders();
  }catch(e){console.error(e);alert("تعذر حذف الطلب. تأكد من صلاحية الحذف في Supabase.")}
}

function getOrderItemsHtml(order){
  return (order.items||[]).map(i=>{
    const details=[i.weight?`${Number(i.weight).toFixed(2)} كغ`:"",i.preparation||"",i.size||"",i.option||"",i.quantity>1?`× ${i.quantity}`:""].filter(Boolean).join(" • ");
    return `<div style="padding:8px 0;border-bottom:1px dashed #ddd"><strong>${escapeHtml(i.name||"")}</strong>${details?`<div style="font-size:12px;color:#666;margin-top:3px">${escapeHtml(details)}</div>`:""}<div style="font-size:13px;margin-top:3px">${money(i.total)}</div></div>`;
  }).join("");
}

async function showOrders(){
  if(!navigator.onLine){return modal("الطلبات السابقة",'<div style="padding:15px;text-align:center"><p>أنت حالياً بدون إنترنت.</p><p>الطلبات الموجودة على السيرفر غير متاحة حالياً.</p></div>')}
  try{
    const r=await fetch(`${SUPABASE_URL}/rest/v1/orders?select=*&order=created_at.desc&limit=100`,{headers:{apikey:SUPABASE_KEY,Authorization:`Bearer ${SUPABASE_KEY}`}});
    if(!r.ok)throw new Error("Failed");
    const orders=await r.json();
    if(!orders.length)return modal("الطلبات السابقة",'<div style="text-align:center;padding:20px">لا يوجد طلبات محفوظة بعد.</div>');
    const html=orders.map((o,i)=>`<div style="border:1px solid #ddd;border-radius:12px;padding:12px;margin-bottom:10px;background:#fff">
      <div style="font-weight:bold;font-size:17px">طلب #${orders.length-i}</div>
      <div style="font-size:13px;color:#666;margin-top:4px">${escapeHtml(o.created_at?formatOrderDateTime(o.created_at):"")}</div>
      <div style="margin-top:8px">النوع: <strong>${escapeHtml((o.order_type||"")==="Delevery"?"Delivery":(o.order_type||""))}</strong></div>
      ${o.customer_name?`<div>الزبون: ${escapeHtml(o.customer_name)}</div>`:""}
      ${o.customer_phone?`<div>الهاتف: ${escapeHtml(o.customer_phone)}</div>`:""}
      <div style="margin-top:8px;font-weight:bold">المجموع: ${money(o.total)}</div>
      <div style="display:flex;gap:7px;flex-wrap:wrap;margin-top:12px">
        <button class="primary" onclick='printInvoice(${JSON.stringify(o).replace(/'/g,"&#39;")})' style="flex:1;min-width:120px;padding:10px;border:0;border-radius:10px">🖨️ إعادة طباعة</button>
        <button onclick='showOrderDetails(${JSON.stringify(o).replace(/'/g,"&#39;")})' style="flex:1;min-width:120px;padding:10px;border:1px solid #ddd;border-radius:10px;background:#fff">👁️ التفاصيل</button>
        <button onclick='deletePreviousOrder(${JSON.stringify(o.id)})' style="flex:1;min-width:100px;padding:10px;border:1px solid #dc2626;color:#b91c1c;background:#fff;border-radius:10px">🗑️ حذف</button>
      </div>
    </div>`).join("");
    modal("الطلبات السابقة",`<div style="max-height:70vh;overflow:auto">${html}</div>`);
  }catch(e){console.error(e);modal("الطلبات السابقة",'<div style="text-align:center;padding:20px">تعذر تحميل الطلبات.</div>')}
}

function showOrderDetails(order){
  if(!order)return;
  const items=getOrderItemsHtml(order);
  modal("تفاصيل الطلب",`<div>
    <div style="margin-bottom:8px"><strong>نوع الطلب:</strong> ${escapeHtml((order.order_type||"")==="Delevery"?"Delivery":(order.order_type||""))}</div>
    <div style="margin-bottom:8px"><strong>التاريخ والساعة:</strong> ${escapeHtml(formatOrderDateTime(order.created_at))}</div>
    ${order.customer_name?`<div><strong>الزبون:</strong> ${escapeHtml(order.customer_name)}</div>`:""}
    ${order.customer_phone?`<div><strong>الهاتف:</strong> ${escapeHtml(order.customer_phone)}</div>`:""}
    ${order.customer_address?`<div><strong>العنوان:</strong> ${escapeHtml(order.customer_address)}</div>`:""}
    <div style="margin-top:12px">${items||"لا يوجد أصناف"}</div>
    ${Number(order.delivery_charge||0)>0?`<div style="padding:8px 0;border-bottom:1px dashed #ddd">delivery charge: <strong>${money(order.delivery_charge)}</strong></div>`:""}
    <div style="font-size:20px;font-weight:bold;text-align:center;margin:15px 0">المجموع: ${money(order.total)}</div>
    ${order.notes?`<div style="padding:8px;background:#f7f7f7;border-radius:8px">ملاحظات: ${escapeHtml(order.notes)}</div>`:""}
    <button class="primary" onclick='printInvoice(${JSON.stringify(order).replace(/'/g,"&#39;")})' style="width:100%;margin-top:12px;padding:12px;border:0;border-radius:10px">🖨️ إعادة طباعة</button>
  </div>`);
}

// ---------------- MENU MANAGER ----------------

function getManagerPriceText(item){
  if(item.type==="weight"){
    const p=item.pricing||{};
    return `<strong>${money(p.base)} / كغ</strong><div style="font-size:12px;color:#666;margin-top:4px">مشوي +${money(p.grill)} | مقلي +${money(p.fry)}</div>`;
  }
  if(item.type==="sizes")return Object.entries(item.sizes||{}).map(([s,p])=>`${escapeHtml(s)}: ${money(p)}`).join(" | ");
  if(item.type==="meal")return `وجبة: ${money(item.prices?.وجبة)} | ساندويش: ${money(item.prices?.ساندويش)}`;
  if(item.type==="offer")return `العرض: ${money(item.price)}`;
  return money(item.price);
}
function showMenuManager(){
  const rows=menu.map(item=>`<div style="border:1px solid #ddd;border-radius:14px;padding:14px;margin-bottom:10px;background:#fff">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px">
      <div class="manager-item-info" style="flex:1">
        <div class="manager-item-name" style="font-size:18px;font-weight:bold">${escapeHtml(item.name)}</div>
        <div class="manager-item-category" style="font-size:13px;color:#777;margin-top:3px">${escapeHtml(item.category||"")}</div>
        <div class="manager-item-details" style="margin-top:7px">${getManagerPriceText(item)}</div>
        <div class="manager-item-availability" style="margin-top:7px;font-weight:bold;color:${item.available!==false?"#16803c":"#a21d1d"}">${item.available!==false?"✓ متوفر":"✕ منتهي"}</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:6px;min-width:92px">
        <button onclick="toggleAvailability('${item.id}')">${item.available!==false?"خلص":"متوفر"}</button>
        <button onclick="editMenuItem('${item.id}')">تعديل</button>
        <button onclick="deleteMenuItem('${item.id}')" style="color:#b00020">حذف</button>
      </div>
    </div></div>`).join("");
  modal("إدارة المنيو",`<div>
    <div style="border:1px solid #ddd;border-radius:12px;padding:12px;margin-bottom:15px;background:#f8fafb">
      <div style="font-weight:bold;margin-bottom:8px">🛵 delivery charge</div>
      <div style="font-size:12px;color:#666;margin-bottom:7px">تُضاف تلقائياً فقط على طلبات Delevery ويمكن تعديلها بأي وقت.</div>
      <div style="display:flex;gap:8px;align-items:center">
        <input id="deliveryChargeInput" type="number" min="0" step="0.01" value="${money(deliveryCharge)}" style="flex:1;padding:12px;border:1px solid #cfd5da;border-radius:9px;font-size:16px">
        <span style="font-weight:bold">$</span>
        <button class="primary" onclick="saveDeliveryCharge()" style="padding:11px 14px;border:0;border-radius:9px">حفظ</button>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:15px">
      <button class="primary" onclick="openAddMenuItem()" style="padding:12px;border:0;border-radius:10px">➕ إضافة صنف</button>
      <button onclick="openAddOffer()" style="padding:12px;border:0;border-radius:10px">🎁 إضافة عرض</button>
    </div>
    <div style="max-height:65vh;overflow:auto">${rows||'<div style="text-align:center;padding:20px">لا يوجد أصناف.</div>'}</div>
  </div>`);
}
function updateManagerTypeFields(item=null){
  const type=document.getElementById("managerType")?.value,c=document.getElementById("managerTypeFields");if(!c)return;
  if(type==="fixed")return c.innerHTML=`<label>السعر</label><input id="managerPrice" type="number" step="0.01" value="${item?.price??""}">`;
  if(type==="weight"){const p=item?.pricing||{};return c.innerHTML=`<label>السعر الأساسي / كغ</label><input id="managerBasePrice" type="number" step="0.01" value="${p.base??""}"><label>زيادة المشوي</label><input id="managerGrill" type="number" step="0.01" value="${p.grill??0}"><label>زيادة المقلي</label><input id="managerFry" type="number" step="0.01" value="${p.fry??0}">`;}
  if(type==="sizes"){const s=item?.sizes||{};return c.innerHTML=`<label>الأحجام والأسعار</label><textarea id="managerSizes" rows="6" placeholder="صغير=5\nوسط=8\nكبير=11">${Object.entries(s).map(([k,v])=>`${k}=${v}`).join("\n")}</textarea>`;}
  if(type==="meal"){const p=item?.prices||{};return c.innerHTML=`<label>سعر الوجبة</label><input id="managerMealPrice" type="number" step="0.01" value="${p.وجبة??""}"><label>سعر الساندويش</label><input id="managerSandwichPrice" type="number" step="0.01" value="${p.ساندويش??""}">`;}
}
function parseManagerSizes(v){
  const r={};String(v||"").split("\n").forEach(line=>{const p=line.split("=");if(p.length<2)return;const n=p[0].trim(),v=Number(p.slice(1).join("=").trim());if(n&&Number.isFinite(v))r[n]=v});return r;
}
function openAddMenuItem(){
  modal("إضافة صنف",`<label>اسم الصنف</label><input id="managerName" type="text">
    <label>التصنيف</label><select id="managerCategory">${CATEGORIES.map(c=>`<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join("")}</select>
    <label>نوع الصنف</label><select id="managerType" onchange="updateManagerTypeFields()">
    <option value="fixed">سعر ثابت</option><option value="weight">بالوزن</option><option value="sizes">أحجام</option><option value="meal">وجبة / ساندويش</option></select>
    <div id="managerTypeFields"></div><button class="primary" onclick="saveNewMenuItem()" style="width:100%;margin-top:15px">حفظ الصنف</button>`);
  setTimeout(updateManagerTypeFields,0);
}
function saveNewMenuItem(){
  const name=document.getElementById("managerName")?.value.trim(),category=document.getElementById("managerCategory")?.value,type=document.getElementById("managerType")?.value;
  if(!name)return alert("اكتب اسم الصنف.");
  const item={id:generateId("menu"),name,category,type,available:true};
  if(type==="fixed"){const p=Number(document.getElementById("managerPrice")?.value);if(!Number.isFinite(p))return alert("اكتب السعر.");item.price=p;}
  if(type==="weight"){const base=Number(document.getElementById("managerBasePrice")?.value),grill=Number(document.getElementById("managerGrill")?.value||0),fry=Number(document.getElementById("managerFry")?.value||0);if(!Number.isFinite(base))return alert("اكتب السعر الأساسي.");item.pricing={base,grill,fry};}
  if(type==="sizes"){const s=parseManagerSizes(document.getElementById("managerSizes")?.value);if(!Object.keys(s).length)return alert("أدخل الأحجام والأسعار.");item.sizes=s;}
  if(type==="meal"){const meal=Number(document.getElementById("managerMealPrice")?.value),sand=Number(document.getElementById("managerSandwichPrice")?.value);if(!Number.isFinite(meal)||!Number.isFinite(sand))return alert("أدخل سعر الوجبة والساندويش.");item.prices={وجبة:meal,ساندويش:sand};}
  menu.push(item);saveMenu();showMenuManager();renderItems();
}
function editMenuItem(id){
  const item=getItemById(id);if(!item)return alert("الصنف غير موجود.");
  if(item.type==="offer") return editOfferItem(item);
  modal("تعديل الصنف",`<label>اسم الصنف</label><input id="managerName" type="text" value="${escapeHtml(item.name)}">
    <label>التصنيف</label><select id="managerCategory">${CATEGORIES.filter(c=>c!=="🎁 العروض").map(c=>`<option value="${escapeHtml(c)}" ${c===item.category?"selected":""}>${escapeHtml(c)}</option>`).join("")}</select>
    <label>نوع الصنف</label><select id="managerType" onchange="updateManagerTypeFields()">
    <option value="fixed" ${item.type==="fixed"?"selected":""}>سعر ثابت</option><option value="weight" ${item.type==="weight"?"selected":""}>بالوزن</option>
    <option value="sizes" ${item.type==="sizes"?"selected":""}>أحجام</option><option value="meal" ${item.type==="meal"?"selected":""}>وجبة / ساندويش</option></select>
    <div id="managerTypeFields"></div><button class="primary" onclick="saveEditedMenuItem('${item.id}')" style="width:100%;margin-top:15px">حفظ التعديل</button>`);
  setTimeout(()=>updateManagerTypeFields(item),0);
}
function saveEditedMenuItem(id){
  const item=getItemById(id);if(!item)return;
  const name=document.getElementById("managerName")?.value.trim(),category=document.getElementById("managerCategory")?.value,type=document.getElementById("managerType")?.value;
  if(!name)return alert("اكتب اسم الصنف.");
  item.name=name;item.category=category;item.type=type;delete item.price;delete item.pricing;delete item.sizes;delete item.prices;
  if(type==="fixed"){const p=Number(document.getElementById("managerPrice")?.value);if(!Number.isFinite(p))return alert("اكتب السعر.");item.price=p;}
  if(type==="weight"){const base=Number(document.getElementById("managerBasePrice")?.value),grill=Number(document.getElementById("managerGrill")?.value||0),fry=Number(document.getElementById("managerFry")?.value||0);if(!Number.isFinite(base))return alert("اكتب السعر الأساسي.");item.pricing={base,grill,fry};}
  if(type==="sizes"){const s=parseManagerSizes(document.getElementById("managerSizes")?.value);if(!Object.keys(s).length)return alert("أدخل الأحجام والأسعار.");item.sizes=s;}
  if(type==="meal"){const meal=Number(document.getElementById("managerMealPrice")?.value),sand=Number(document.getElementById("managerSandwichPrice")?.value);if(!Number.isFinite(meal)||!Number.isFinite(sand))return alert("أدخل سعر الوجبة والساندويش.");item.prices={وجبة:meal,ساندويش:sand};}
  saveMenu();showMenuManager();renderItems();
}
function toggleAvailability(id){const i=getItemById(id);if(!i)return;i.available=i.available===false;saveMenu();showMenuManager();renderItems();}
function deleteMenuItem(id){const i=getItemById(id);if(!i)return;if(!confirm(`حذف "${i.name}" من المنيو؟`))return;menu=menu.filter(x=>x.id!==id);saveMenu();showMenuManager();renderItems();}

function getOfferItemRow(item,index){
  if(item.type==="weight")return `<div class="offer-builder-row" style="border:1px solid #ddd;border-radius:10px;padding:9px;margin:7px 0">
    <label style="display:flex;align-items:center;gap:8px"><input type="checkbox" class="offerItemCheck" value="${item.id}" onchange="toggleOfferRow(this)"><strong>${escapeHtml(item.name)}</strong></label>
    <div class="offer-extra" data-for="${item.id}" style="display:none;margin-top:8px"><label>الوزن بالكيلو</label><input class="offerWeight" data-item-id="${item.id}" type="number" min="0.01" step="0.01" value="1"></div>
  </div>`;
  if(item.type==="sizes")return `<div class="offer-builder-row" style="border:1px solid #ddd;border-radius:10px;padding:9px;margin:7px 0">
    <label style="display:flex;align-items:center;gap:8px"><input type="checkbox" class="offerItemCheck" value="${item.id}" onchange="toggleOfferRow(this)"><strong>${escapeHtml(item.name)}</strong></label>
    <div class="offer-extra" data-for="${item.id}" style="display:none;margin-top:8px"><label>الحجم</label><select class="offerSize" data-item-id="${item.id}">${Object.keys(item.sizes||{}).map(s=>`<option value="${escapeHtml(s)}">${escapeHtml(s)}</option>`).join("")}</select></div>
  </div>`;
  return `<div class="offer-builder-row" style="border:1px solid #ddd;border-radius:10px;padding:9px;margin:7px 0">
    <label style="display:flex;align-items:center;gap:8px"><input type="checkbox" class="offerItemCheck" value="${item.id}" onchange="toggleOfferRow(this)"><strong>${escapeHtml(item.name)}</strong></label>
    <div class="offer-extra" data-for="${item.id}" style="display:none;margin-top:8px"><label>الكمية</label><input class="offerQuantity" data-item-id="${item.id}" type="number" min="1" step="1" value="1"></div>
  </div>`;
}
function toggleOfferRow(check){
  const row=check.closest(".offer-builder-row");
  const extra=row?.querySelector(".offer-extra");
  if(extra)extra.style.display=check.checked?"block":"none";
}
function openAddOffer(){
  const items=menu.filter(i=>i.category!=="🎁 العروض"&&i.available!==false);
  modal("إضافة عرض",`<label>اسم العرض</label><input id="offerName" type="text" placeholder="مثلاً: عرض العائلة">
    <label>سعر العرض النهائي</label><input id="offerPrice" type="number" step="0.01" placeholder="مثلاً 25">
    <div style="margin:12px 0 6px;font-weight:bold">مكونات العرض</div>
    <div style="font-size:12px;color:#666;margin-bottom:8px">إذا اخترت صنفاً بالوزن، حدد وزنه. التفاصيل ستظهر على الفاتورة.</div>
    <div style="max-height:45vh;overflow:auto">${items.map((i,n)=>getOfferItemRow(i,n)).join("")}</div>
    <button class="primary" onclick="saveOffer()" style="width:100%;margin-top:15px">حفظ العرض</button>`);
}
function saveOffer(){
  const name=document.getElementById("offerName")?.value.trim(),price=Number(document.getElementById("offerPrice")?.value),checks=[...document.querySelectorAll(".offerItemCheck:checked")];
  if(!name)return alert("اكتب اسم العرض.");
  if(!Number.isFinite(price)||price<0)return alert("اكتب سعر العرض.");
  if(!checks.length)return alert("اختار أصناف العرض.");
  const includedItems=checks.map(c=>{
    const item=getItemById(c.value);
    const r={menuItemId:c.value,quantity:1};
    if(item?.type==="weight"){
      const w=Number(document.querySelector(`.offerWeight[data-item-id="${CSS.escape(c.value)}"]`)?.value||1);
      if(!w||w<=0)throw new Error(`وزن ${item.name} غير صحيح`);
      r.weight=w;
    }else if(item?.type==="sizes"){
      r.size=document.querySelector(`.offerSize[data-item-id="${CSS.escape(c.value)}"]`)?.value||null;
    }else{
      r.quantity=Math.max(1,Number(document.querySelector(`.offerQuantity[data-item-id="${CSS.escape(c.value)}"]`)?.value||1));
    }
    return r;
  });
  menu.push({id:generateId("offer"),name,category:"🎁 العروض",type:"offer",price,includedItems,available:true});
  saveMenu();showMenuManager();renderItems();
}

function editOfferItem(item){
  const items=menu.filter(i=>i.category!=="🎁 العروض"&&i.available!==false);
  const selected=new Map((item.includedItems||[]).map(x=>[x.menuItemId,x]));
  modal("تعديل العرض",`<label>اسم العرض</label><input id="offerName" type="text" value="${escapeHtml(item.name)}">
    <label>سعر العرض النهائي</label><input id="offerPrice" type="number" step="0.01" value="${Number(item.price||0)}">
    <div style="margin:12px 0 6px;font-weight:bold">مكونات العرض</div>
    <div style="font-size:12px;color:#666;margin-bottom:8px">الوزن/الحجم والكمية محفوظة ضمن العرض وتظهر على الفاتورة.</div>
    <div style="max-height:45vh;overflow:auto">${items.map((i,n)=>{
      const x=selected.get(i.id);
      const checked=x?"checked":"";
      const extra=i.type==="weight"?`<div class="offer-extra" data-for="${i.id}" style="display:${x?"block":"none"};margin-top:8px"><label>الوزن بالكيلو</label><input class="offerWeight" data-item-id="${i.id}" type="number" min="0.01" step="0.01" value="${x?.weight??1}"></div>`:i.type==="sizes"?`<div class="offer-extra" data-for="${i.id}" style="display:${x?"block":"none"};margin-top:8px"><label>الحجم</label><select class="offerSize" data-item-id="${i.id}">${Object.keys(i.sizes||{}).map(s=>`<option value="${escapeHtml(s)}" ${x?.size===s?"selected":""}>${escapeHtml(s)}</option>`).join("")}</select></div>`:`<div class="offer-extra" data-for="${i.id}" style="display:${x?"block":"none"};margin-top:8px"><label>الكمية</label><input class="offerQuantity" data-item-id="${i.id}" type="number" min="1" step="1" value="${x?.quantity??1}"></div>`;
      return `<div class="offer-builder-row" style="border:1px solid #ddd;border-radius:10px;padding:9px;margin:7px 0"><label style="display:flex;align-items:center;gap:8px"><input type="checkbox" class="offerItemCheck" value="${i.id}" ${checked} onchange="toggleOfferRow(this)"><strong>${escapeHtml(i.name)}</strong></label>${extra}</div>`;
    }).join("")}</div>
    <button class="primary" onclick="saveEditedOffer('${item.id}')" style="width:100%;margin-top:15px">حفظ التعديل</button>`);
}
function saveEditedOffer(id){
  const item=getItemById(id);if(!item)return;
  const name=document.getElementById("offerName")?.value.trim(),price=Number(document.getElementById("offerPrice")?.value),checks=[...document.querySelectorAll(".offerItemCheck:checked")];
  if(!name)return alert("اكتب اسم العرض.");
  if(!Number.isFinite(price)||price<0)return alert("اكتب سعر العرض.");
  if(!checks.length)return alert("اختار أصناف العرض.");
  try{
    item.name=name;item.price=price;
    item.includedItems=checks.map(c=>{
      const mi=getItemById(c.value),r={menuItemId:c.value,quantity:1};
      if(mi?.type==="weight")r.weight=Number(document.querySelector(`.offerWeight[data-item-id="${CSS.escape(c.value)}"]`)?.value||1);
      else if(mi?.type==="sizes")r.size=document.querySelector(`.offerSize[data-item-id="${CSS.escape(c.value)}"]`)?.value||null;
      else r.quantity=Math.max(1,Number(document.querySelector(`.offerQuantity[data-item-id="${CSS.escape(c.value)}"]`)?.value||1));
      return r;
    });
    saveMenu();showMenuManager();renderItems();
  }catch(e){alert(e.message||"تعذر حفظ العرض.")}
}

function getStructuredMenu(){
  return menu.map(i=>{
    const r={id:i.id,name:i.name,category:i.category,type:i.type,available:i.available!==false};
    if(i.type==="fixed"||i.type==="offer")r.price=Number(i.price||0);
    if(i.type==="weight"){r.basePrice=Number(i.pricing?.base||0);r.grillSurcharge=Number(i.pricing?.grill||0);r.frySurcharge=Number(i.pricing?.fry||0);r.unit="kg";}
    if(i.type==="sizes")r.sizes={...(i.sizes||{})};
    if(i.type==="meal"){r.mealPrice=Number(i.prices?.وجبة||0);r.sandwichPrice=Number(i.prices?.ساندويش||0);}
    if(i.type==="offer")r.includedItems=(i.includedItems||[]).map(x=>({id:x.menuItemId,name:getItemById(x.menuItemId)?.name||"",quantity:x.quantity||1,weight:x.weight||null,size:x.size||null}));
    return r;
  });
}
function exportStructuredMenu(){
  const blob=new Blob([JSON.stringify(getStructuredMenu(),null,2)],{type:"application/json"}),url=URL.createObjectURL(blob),a=document.createElement("a");
  a.href=url;a.download="tabbara-seafood-menu.json";document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(url);
}

function buildInvoiceHtml(order){
  const rows=(order.items||[]).map(i=>{
    const title=[i.name,i.weight?`${Number(i.weight).toFixed(2)} كغ`:"",i.preparation||"",i.size||"",i.option||""].filter(Boolean).join(" - ");
    const offerDetails=i.offerDetails&&i.offerDetails.length?`<div style="font-size:10px;margin-top:3px">${i.offerDetails.map(x=>escapeHtml([x.name,x.weight?`${Number(x.weight).toFixed(2)} كغ`:"",x.size||"",x.quantity>1?`× ${x.quantity}`:""].filter(Boolean).join(" - "))).join("<br>")}</div>`:"";
    return `<tr><td>${escapeHtml(title)}${offerDetails}</td><td style="text-align:center">${i.quantity}</td><td>${money(i.total)}</td></tr>`;
  }).join("");
  return `<!doctype html><html dir="rtl"><head><meta charset="UTF-8"><title>Tabbara Seafood</title><style>body{font-family:Arial;width:80mm;margin:auto;padding:10px}h2{text-align:center}table{width:100%;border-collapse:collapse}td,th{border-bottom:1px dashed #999;padding:5px;font-size:12px}.total{text-align:center;font-size:18px;font-weight:bold;margin-top:15px}</style></head><body>
  <h2>Tabbara Seafood</h2><div style="text-align:center">${escapeHtml((order.order_type||"")==="Delevery"?"Delivery":(order.order_type||""))}</div>
  <div style="text-align:center;font-size:11px;margin:4px 0 8px">${escapeHtml(formatOrderDateTime(order.created_at))}</div>
  ${order.customer_name?`<div>الزبون: ${escapeHtml(order.customer_name)}</div>`:""}${order.customer_phone?`<div>الهاتف: ${escapeHtml(order.customer_phone)}</div>`:""}${order.customer_address?`<div>العنوان: ${escapeHtml(order.customer_address)}</div>`:""}
  <table><thead><tr><th>الصنف</th><th>العدد</th><th>السعر</th></tr></thead><tbody>${rows}</tbody></table>
  ${Number(order.delivery_charge||0)>0?`<div style="margin-top:10px;text-align:right">delivery charge: ${money(order.delivery_charge)}</div>`:""}
  <div class="total">المجموع: ${money(order.total)}</div>${order.notes?`<div style="margin-top:15px">ملاحظات: ${escapeHtml(order.notes)}</div>`:""}<div style="text-align:center;margin-top:20px">شكراً لزيارتكم ❤️</div>
  </body></html>`;
}

function printInvoice(order){
  if(!order){ alert("لا يوجد طلب للطباعة."); return; }

  // iPhone/iPad-safe printing: print from the current POS page instead of
  // opening a popup/new window (which can be blocked in Safari/PWA mode).
  let area=document.getElementById("posPrintArea");
  if(!area){
    area=document.createElement("div");
    area.id="posPrintArea";
    document.body.appendChild(area);
  }

  const invoiceDoc=document.createElement("div");
  invoiceDoc.innerHTML=buildInvoiceHtml(order);
  const invoiceBody=invoiceDoc.querySelector("body");
  area.innerHTML=invoiceBody ? invoiceBody.innerHTML : invoiceDoc.innerHTML;
  document.body.classList.add("printing-invoice");

  const cleanup=()=>{
    document.body.classList.remove("printing-invoice");
    if(area) area.innerHTML="";
    window.removeEventListener("afterprint",cleanup);
  };

  window.addEventListener("afterprint",cleanup);

  // Call print directly from the button click. This is important on iOS.
  try{
    window.print();
    // Fallback cleanup for browsers that don't fire afterprint.
    setTimeout(()=>{
      if(document.body.classList.contains("printing-invoice")){
        document.body.classList.remove("printing-invoice");
        if(area) area.innerHTML="";
        window.removeEventListener("afterprint",cleanup);
      }
    },15000);
  }catch(e){
    cleanup();
    alert("تعذّرت الطباعة على هذا الجهاز. جرّب فتح الموقع مباشرة من Safari.");
  }
}


document.addEventListener("keydown",e=>{if(e.key!=="Enter")return;const l=document.getElementById("loginScreen");if(l&&getComputedStyle(l).display!=="none")login()});
document.addEventListener("DOMContentLoaded",()=>{
  const p=document.getElementById("phone");if(p){p.addEventListener("change",handlePhoneChange);p.addEventListener("blur",handlePhoneChange)}
});

async function initPOS(){
  try{
    loadMenu();loadDeliveryCharge();loadCustomers();loadPendingOrders();getDeviceId();updateConnectionStatus();renderCategories();renderCart();
    if(localStorage.getItem("tabbaraLoggedIn")==="true")showApp();
    else {const l=document.getElementById("loginScreen");if(l)l.style.display="flex";}
    if(navigator.onLine){
      setTimeout(async()=>{
        await syncMenuFromCloud();
        await syncDeliveryChargeFromCloud();
        await syncPendingOrders();
        startMenuAutoSync();
      },300);
    } else {
      startMenuAutoSync();
    }
  }catch(e){console.error("POS initialization error:",e)}
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",initPOS);else initPOS();

window.TABBARA_POS={
  getMenu:()=>menu,getStructuredMenu:()=>getStructuredMenu(),saveMenu:()=>saveMenu(),getDeliveryCharge:()=>deliveryCharge,
  findCustomer:phone=>findCustomer(phone),saveCustomer:c=>saveCustomer(c),
  confirmOrder:()=>confirmOrder(),syncPendingOrders:()=>syncPendingOrders(),getPendingOrders:()=>loadPendingOrders(),
  getDeviceId:()=>getDeviceId()
};
window.getTabbaraMenu=()=>getStructuredMenu();
window.getTabbaraDeviceId=()=>getDeviceId();
window.syncTabbaraOrders=()=>syncPendingOrders();
console.log("Tabbara Seafood POS loaded successfully.");
