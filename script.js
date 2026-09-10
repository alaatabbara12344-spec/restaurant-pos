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

function loadMenu() {
  try {
    const saved = localStorage.getItem(MENU_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length) { menu = parsed; return; }
    }
  } catch(e) { console.error(e); }
  menu = JSON.parse(JSON.stringify(DEFAULT_MENU));
  saveMenu();
}
function saveMenu() {
  localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(menu));
  syncMenuToCloud();
}
async function syncMenuFromCloud() {
  if (!navigator.onLine) return false;
  try {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/pos_menu?id=eq.${CLOUD_MENU_ID}&select=menu`, {
      headers:{apikey:SUPABASE_KEY,Authorization:"Bearer "+SUPABASE_KEY}
    });
    if (!r.ok) return false;
    const rows = await r.json();
    if (rows[0] && Array.isArray(rows[0].menu) && rows[0].menu.length) {
      menu = rows[0].menu;
      localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(menu));
      renderCategories(); renderItems();
      return true;
    }
    await syncMenuToCloud();
  } catch(e) { console.warn("Cloud menu sync unavailable:",e); }
  return false;
}
async function syncMenuToCloud() {
  if (!navigator.onLine || !Array.isArray(menu) || !menu.length) return false;
  try {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/pos_menu?on_conflict=id`, {
      method:"POST",
      headers:{apikey:SUPABASE_KEY,Authorization:"Bearer "+SUPABASE_KEY,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates,return=minimal"},
      body:JSON.stringify({id:CLOUD_MENU_ID,menu,updated_at:new Date().toISOString()})
    });
    if (!r.ok) throw new Error("Menu sync failed: "+r.status);
    return true;
  } catch(e) { console.warn("Menu cloud save failed:",e); return false; }
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
function getTotal() { return cart.reduce((s,i)=>s+Number(i.total||0),0); }
function getDeviceId() { return deviceId; }

function normalizePhone(phone) {
  if (phone == null) return "";
  let value = String(phone).trim().replace(/[\s\-().]/g,"");
  if (value.startsWith("00")) value = "+" + value.substring(2);
  if (value.startsWith("+961")) return "+961" + value.substring(4).replace(/^0/,"");
  if (value.startsWith("961")) return "+961" + value.substring(3).replace(/^0/,"");
  if (/^(03|70|71|76|78|79|81)/.test(value)) value = "+961" + value.substring(1);
  return value;
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
  document.getElementById("deliveryBtn")?.classList.toggle("active",type==="Delevery");
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
  let unit=Number(p.base||0);
  if(prep==="مشوي")unit+=Number(p.grill||0);
  if(prep==="مقلي")unit+=Number(p.fry||0);
  addToCart({id:generateId("cart"),menuItemId:item.id,name:item.name,preparation:prep,weight:w,quantity:1,unitPrice:unit,total:unit*w});
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
    return `<div class="cart-item"><div class="cart-item-info"><strong>${escapeHtml(i.name)}</strong>${d?`<small>${d}</small>`:""}</div>
    <div class="cart-item-controls"><button onclick="changeCartQuantity('${i.id}',-1)">−</button><span>${i.quantity||1}</span><button onclick="changeCartQuantity('${i.id}',1)">+</button><button class="remove-btn" onclick="removeFromCart('${i.id}')">🗑</button></div>
    <div class="cart-item-total">${money(i.total)}</div></div>`;
  }).join("");
  if(t)t.textContent=money(getTotal());
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
    const r=await fetch(`${SUPABASE_URL}/rest/v1/customers?phone=eq.${encodeURIComponent(n)}&select=*`,{headers:{apikey:SUPABASE_KEY,Authorization:"Bearer "+SUPABASE_KEY}});
    if(!r.ok)return null;const d=await r.json();
    if(d[0]){cacheCustomer(d[0]);fillCustomerFields(d[0]);return d[0];}
  }catch(e){console.error(e)}
  return null;
}
async function handlePhoneChange(){const p=document.getElementById("phone")?.value;if(p&&normalizePhone(p).length>=8)await findCustomer(p)}
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
  const phone=document.getElementById("phone")?.value.trim()||"";
  const address=document.getElementById("address")?.value.trim()||"";
  const notes=document.getElementById("notes")?.value.trim()||"";
  if(selectedOrderType==="Delevery"){
    if(!name)return alert("اكتب اسم الزبون.");
    if(!phone)return alert("اكتب رقم الهاتف.");
    if(!address)return alert("اكتب عنوان التوصيل.");
  }
  const order={
    id:generateId("order"),
    order_type:selectedOrderType,
    customer_name:name||null,customer_phone:phone||null,customer_address:address||null,notes:notes||null,
    items:cart.map(i=>({id:i.id,menu_item_id:i.menuItemId||null,name:i.name,category:getItemById(i.menuItemId)?.category||null,quantity:Number(i.quantity||1),unit_price:Number(i.unitPrice||0),total:Number(i.total||0),weight:i.weight||null,preparation:i.preparation||null,size:i.size||null,option:i.option||null})),
    total:Number(getTotal().toFixed(2)),device_id:getDeviceId(),sync_status:navigator.onLine?"synced":"pending",created_at:new Date().toISOString()
  };
  if(phone){try{await saveCustomer({phone,name,address,notes})}catch(e){console.warn(e)}}
  let sent=false;
  if(navigator.onLine){try{await sendOrder(order);sent=true}catch(e){console.warn(e)}}
  if(!sent)addPendingOrder({...order,sync_status:"pending"});
  window.lastCompletedOrder=order;
  modal("تم تأكيد الطلب",`<div style="text-align:center;padding:12px">
    <div style="font-size:48px;margin-bottom:8px">✓</div>
    <h3 style="margin:8px 0 14px">${sent?"تم حفظ الطلب بنجاح.":"تم حفظ الطلب على الجهاز وسيتم مزامنته عند عودة الإنترنت."}</h3>
    <div style="font-size:22px;font-weight:bold;margin:15px 0">المجموع: $${money(order.total)}</div>
    <button class="primary" onclick="printInvoice(window.lastCompletedOrder)" style="width:100%;margin-bottom:8px">🖨️ طباعة الفاتورة</button>
    <button class="secondary" onclick="closeModal();clearOrder()" style="width:100%">طلب جديد</button>
  </div>`);
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
      <div style="font-size:13px;color:#666;margin-top:4px">${escapeHtml(o.created_at?new Date(o.created_at).toLocaleString("ar-LB"):"")}</div>
      <div style="margin-top:8px">النوع: <strong>${escapeHtml(o.order_type||"")}</strong></div>
      ${o.customer_name?`<div>الزبون: ${escapeHtml(o.customer_name)}</div>`:""}
      ${o.customer_phone?`<div>الهاتف: ${escapeHtml(o.customer_phone)}</div>`:""}
      <div style="margin-top:8px;font-weight:bold">المجموع: ${money(o.total)}</div>
    </div>`).join("");
    modal("الطلبات السابقة",`<div style="max-height:70vh;overflow:auto">${html}</div>`);
  }catch(e){console.error(e);modal("الطلبات السابقة",'<div style="text-align:center;padding:20px">تعذر تحميل الطلبات.</div>')}
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
      <div style="flex:1"><div style="font-size:18px;font-weight:bold">${escapeHtml(item.name)}</div>
      <div style="font-size:13px;color:#777;margin-top:3px">${escapeHtml(item.category||"")}</div>
      <div style="margin-top:7px">${getManagerPriceText(item)}</div>
      <div style="margin-top:7px;font-weight:bold;color:${item.available!==false?"#16803c":"#a21d1d"}">${item.available!==false?"✓ متوفر":"✕ منتهي"}</div></div>
      <div style="display:flex;flex-direction:column;gap:6px;min-width:92px">
        <button onclick="toggleAvailability('${item.id}')">${item.available!==false?"خلص":"متوفر"}</button>
        <button onclick="editMenuItem('${item.id}')">تعديل</button>
        <button onclick="deleteMenuItem('${item.id}')" style="color:#b00020">حذف</button>
      </div>
    </div></div>`).join("");
  modal("إدارة المنيو",`<div>
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

function openAddOffer(){
  const items=menu.filter(i=>i.available!==false);
  modal("إضافة عرض",`<label>اسم العرض</label><input id="offerName" type="text">
    <label>سعر العرض النهائي</label><input id="offerPrice" type="number" step="0.01">
    <label>الأصناف داخل العرض</label><div style="max-height:45vh;overflow:auto;border:1px solid #ddd;padding:8px;border-radius:10px">
    ${items.map(i=>`<label style="display:flex;gap:8px;align-items:center;padding:7px"><input type="checkbox" class="offerItemCheck" value="${i.id}"><span>${escapeHtml(i.name)}</span></label>`).join("")}</div>
    <button class="primary" onclick="saveOffer()" style="width:100%;margin-top:15px">حفظ العرض</button>`);
}
function saveOffer(){
  const name=document.getElementById("offerName")?.value.trim(),price=Number(document.getElementById("offerPrice")?.value),checks=[...document.querySelectorAll(".offerItemCheck:checked")];
  if(!name)return alert("اكتب اسم العرض.");if(!Number.isFinite(price))return alert("اكتب سعر العرض.");if(!checks.length)return alert("اختار أصناف العرض.");
  menu.push({id:generateId("offer"),name,category:"🎁 العروض",type:"offer",price,includedItems:checks.map(c=>({menuItemId:c.value,quantity:1})),available:true});
  saveMenu();showMenuManager();renderItems();
}
function editOfferItem(item){
  const availableItems=menu.filter(i=>i.id!==item.id && i.available!==false);
  const selected=new Set((item.includedItems||[]).map(x=>x.menuItemId));
  modal("تعديل العرض",`<label>اسم العرض</label><input id="offerName" type="text" value="${escapeHtml(item.name)}">
    <label>سعر العرض النهائي</label><input id="offerPrice" type="number" step="0.01" value="${Number(item.price||0)}">
    <label>الأصناف داخل العرض</label><div style="max-height:45vh;overflow:auto;border:1px solid #ddd;padding:8px;border-radius:10px">
    ${availableItems.map(i=>`<label style="display:flex;gap:8px;align-items:center;padding:7px"><input type="checkbox" class="offerItemCheck" value="${i.id}" ${selected.has(i.id)?"checked":""}><span>${escapeHtml(i.name)}</span></label>`).join("")}</div>
    <button class="primary" onclick="saveEditedOffer('${item.id}')" style="width:100%;margin-top:15px">حفظ التعديل</button>`);
}
function saveEditedOffer(id){
  const item=getItemById(id);if(!item)return;
  const name=document.getElementById("offerName")?.value.trim();
  const price=Number(document.getElementById("offerPrice")?.value);
  const checks=[...document.querySelectorAll(".offerItemCheck:checked")];
  if(!name)return alert("اكتب اسم العرض.");
  if(!Number.isFinite(price)||price<0)return alert("اكتب سعر العرض.");
  if(!checks.length)return alert("اختار أصناف العرض.");
  item.name=name;item.category="🎁 العروض";item.type="offer";item.price=price;
  item.includedItems=checks.map(c=>({menuItemId:c.value,quantity:1}));
  saveMenu();showMenuManager();renderItems();
}

function getStructuredMenu(){
  return menu.map(i=>{
    const r={id:i.id,name:i.name,category:i.category,type:i.type,available:i.available!==false};
    if(i.type==="fixed"||i.type==="offer")r.price=Number(i.price||0);
    if(i.type==="weight"){r.basePrice=Number(i.pricing?.base||0);r.grillSurcharge=Number(i.pricing?.grill||0);r.frySurcharge=Number(i.pricing?.fry||0);r.unit="kg";}
    if(i.type==="sizes")r.sizes={...(i.sizes||{})};
    if(i.type==="meal"){r.mealPrice=Number(i.prices?.وجبة||0);r.sandwichPrice=Number(i.prices?.ساندويش||0);}
    if(i.type==="offer")r.includedItems=(i.includedItems||[]).map(x=>({id:x.menuItemId,name:getItemById(x.menuItemId)?.name||"",quantity:x.quantity||1}));
    return r;
  });
}
function exportStructuredMenu(){
  const blob=new Blob([JSON.stringify(getStructuredMenu(),null,2)],{type:"application/json"}),url=URL.createObjectURL(blob),a=document.createElement("a");
  a.href=url;a.download="tabbara-seafood-menu.json";document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(url);
}

function printInvoice(order){
  if(!order)return alert("لا يوجد طلب للطباعة.");
  const rows=(order.items||[]).map(i=>`<tr><td>${escapeHtml([i.name,i.weight?`${i.weight} كغ`:"",i.preparation||"",i.size||"",i.option||""].filter(Boolean).join(" - "))}</td><td style="text-align:center">${i.quantity}</td><td>${money(i.total)}</td></tr>`).join("");
  const p=window.open("","_blank","width=400,height=700");if(!p)return alert("المتصفح منع نافذة الطباعة.");
  p.document.write(`<!doctype html><html dir="rtl"><head><meta charset="UTF-8"><title>Tabbara Seafood</title><style>body{font-family:Arial;width:80mm;margin:auto;padding:10px}h2{text-align:center}table{width:100%;border-collapse:collapse}td,th{border-bottom:1px dashed #999;padding:5px;font-size:12px}.total{text-align:center;font-size:18px;font-weight:bold;margin-top:15px}</style></head><body>
  <h2>Tabbara Seafood</h2><div style="text-align:center">${escapeHtml(order.order_type||"")}</div>
  ${order.customer_name?`<div>الزبون: ${escapeHtml(order.customer_name)}</div>`:""}${order.customer_phone?`<div>الهاتف: ${escapeHtml(order.customer_phone)}</div>`:""}${order.customer_address?`<div>العنوان: ${escapeHtml(order.customer_address)}</div>`:""}
  <table><thead><tr><th>الصنف</th><th>العدد</th><th>السعر</th></tr></thead><tbody>${rows}</tbody></table>
  <div class="total">المجموع: ${money(order.total)}</div>${order.notes?`<div style="margin-top:15px">ملاحظات: ${escapeHtml(order.notes)}</div>`:""}<div style="text-align:center;margin-top:20px">شكراً لزيارتكم ❤️</div>
  <script>window.onload=function(){window.print()}<\/script></body></html>`);p.document.close();
}

document.addEventListener("keydown",e=>{if(e.key!=="Enter")return;const l=document.getElementById("loginScreen");if(l&&getComputedStyle(l).display!=="none")login()});
document.addEventListener("DOMContentLoaded",()=>{
  const p=document.getElementById("phone");if(p){p.addEventListener("change",handlePhoneChange);p.addEventListener("blur",handlePhoneChange)}
});

async function initPOS(){
  try{
    loadMenu();loadCustomers();loadPendingOrders();getDeviceId();updateConnectionStatus();renderCategories();renderCart();
    if(localStorage.getItem("tabbaraLoggedIn")==="true")showApp();
    else {const l=document.getElementById("loginScreen");if(l)l.style.display="flex";}
    if(navigator.onLine){
      setTimeout(async()=>{await syncMenuFromCloud();await syncPendingOrders();},700);
    }
  }catch(e){console.error("POS initialization error:",e)}
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",initPOS);else initPOS();

window.TABBARA_POS={
  getMenu:()=>menu,getStructuredMenu:()=>getStructuredMenu(),saveMenu:()=>saveMenu(),
  findCustomer:phone=>findCustomer(phone),saveCustomer:c=>saveCustomer(c),
  confirmOrder:()=>confirmOrder(),syncPendingOrders:()=>syncPendingOrders(),getPendingOrders:()=>loadPendingOrders(),
  getDeviceId:()=>getDeviceId()
};
window.getTabbaraMenu=()=>getStructuredMenu();
window.getTabbaraDeviceId=()=>getDeviceId();
window.syncTabbaraOrders=()=>syncPendingOrders();
console.log("Tabbara Seafood POS loaded successfully.");
