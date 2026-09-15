const SUPABASE_URL='https://tpvhxauivmjgfcugpldp.supabase.co';
const SUPABASE_KEY='sb_publishable_0n__ZztsS8BQtdVn5lhmmA_WWuHjVg7';
const LOGIN_PASSWORD='1234';
const CUSTOMER_STORAGE_KEY='tabbaraCustomers',PENDING_ORDERS_KEY='tabbara_pending_orders',MENU_STORAGE_KEY='tabbaraMenu',DEVICE_ID_KEY='tabbaraDeviceId',DELIVERY_CHARGE_KEY='tabbaraDeliveryCharge';
const GLOBAL_GRILL_KEY='tabbaraGrillSurcharge',GLOBAL_FRY_KEY='tabbaraFrySurcharge';
const DEFAULT_DELIVERY_CHARGE=2,DEFAULT_GRILL_SURCHARGE=3,DEFAULT_FRY_SURCHARGE=3;
const CATEGORIES=['🐟 الأسماك','🦐 ثمار البحر','🍽️ الوجبات والساندويش','🎁 العروض','🥗 المقبلات','🥬 السلطات','🥤 المشروبات'];
const DEFAULT_MENU=[
{id:'fish_ajaj',name:'أجاج',category:'🐟 الأسماك',type:'weight',pricing:{base:12},available:true},
{id:'fish_boraq',name:'براق',category:'🐟 الأسماك',type:'weight',pricing:{base:14},available:true},
{id:'fish_sardine',name:'سردين',category:'🐟 الأسماك',type:'weight',pricing:{base:8},available:true},
{id:'fish_laqz_sandy',name:'لقز رملي',category:'🐟 الأسماك',type:'weight',pricing:{base:16},available:true},
{id:'fish_laqz_rocky',name:'لقز صخري',category:'🐟 الأسماك',type:'weight',pricing:{base:18},available:true},
{id:'fish_sultan',name:'سلطان',category:'🐟 الأسماك',type:'weight',pricing:{base:15},available:true},
{id:'fish_masqar',name:'مسقار',category:'🐟 الأسماك',type:'weight',pricing:{base:13},available:true},
{id:'fish_malifa',name:'مليفة',category:'🐟 الأسماك',type:'weight',pricing:{base:12},available:true},
{id:'fish_jarbidi',name:'جربيدي',category:'🐟 الأسماك',type:'weight',pricing:{base:14},available:true},
{id:'fish_armout_blond',name:'عرموط أشقر',category:'🐟 الأسماك',type:'weight',pricing:{base:11},available:true},
{id:'fish_armout_cut',name:'عرموط مقطع',category:'🐟 الأسماك',type:'weight',pricing:{base:12},available:true},
{id:'seafood_shrimp_medium',name:'قريدس وسط',category:'🦐 ثمار البحر',type:'weight',pricing:{base:16},available:true},
{id:'seafood_shrimp_large',name:'قريدس كبير',category:'🦐 ثمار البحر',type:'weight',pricing:{base:20},available:true},
{id:'seafood_calamari',name:'كالامار',category:'🦐 ثمار البحر',type:'weight',pricing:{base:14},available:true},
{id:'seafood_fillet_fresh',name:'فيليه طازج',category:'🦐 ثمار البحر',type:'weight',pricing:{base:17},available:true},
{id:'seafood_fillet_crispy',name:'فيليه مقرمش',category:'🦐 ثمار البحر',type:'weight',pricing:{base:18},available:true},
{id:'seafood_mix',name:'ثمار البحر',category:'🦐 ثمار البحر',type:'sizes',sizes:{صغير:15,وسط:22,سطل:35},available:true},
{id:'meal_free_fish',name:'سمكة حرة',category:'🍽️ الوجبات والساندويش',type:'meal',prices:{وجبة:15,ساندويش:8},available:true},
{id:'meal_shrimp',name:'قريدس',category:'🍽️ الوجبات والساندويش',type:'meal',prices:{وجبة:15,ساندويش:8},available:true},
{id:'meal_seafood',name:'ثمار البحر',category:'🍽️ الوجبات والساندويش',type:'meal',prices:{وجبة:16,ساندويش:9},available:true},
{id:'meal_calamari',name:'كالامار',category:'🍽️ الوجبات والساندويش',type:'meal',prices:{وجبة:14,ساندويش:8},available:true},
{id:'meal_sardine',name:'سردين',category:'🍽️ الوجبات والساندويش',type:'meal',prices:{وجبة:11,ساندويش:7},available:true},
{id:'app_sayadieh',name:'صيادية',category:'🥗 المقبلات',type:'sizes',sizes:{صغير:5,وسط:8,كبير:11},available:true},
{id:'app_mtabbal',name:'متبل',category:'🥗 المقبلات',type:'fixed',price:4,available:true},
{id:'app_shakshuka',name:'شكشوكة',category:'🥗 المقبلات',type:'fixed',price:5,available:true},
{id:'app_tarator',name:'طرطور كبير',category:'🥗 المقبلات',type:'fixed',price:4,available:true},
{id:'app_fries',name:'بطاطا مقلية',category:'🥗 المقبلات',type:'sizes',sizes:{صغير:3,وسط:5,كبير:7},available:true},
{id:'salad_tabouleh',name:'تبولة',category:'🥬 السلطات',type:'fixed',price:6,available:true},
{id:'salad_fattoush',name:'فتوش',category:'🥬 السلطات',type:'fixed',price:6,available:true},
{id:'salad_crab',name:'سلطة كراب',category:'🥬 السلطات',type:'fixed',price:8,available:true},
{id:'drink_pepsi',name:'Pepsi',category:'🥤 المشروبات',type:'sizes',sizes:{صغير:2,كبير:3},available:true},
{id:'drink_7up',name:'7up',category:'🥤 المشروبات',type:'sizes',sizes:{صغير:2,كبير:3},available:true},
{id:'drink_miranda',name:'Miranda',category:'🥤 المشروبات',type:'sizes',sizes:{صغير:2,كبير:3},available:true}
];
let deviceId=localStorage.getItem(DEVICE_ID_KEY);if(!deviceId){deviceId='device-'+Date.now()+'-'+Math.random().toString(36).slice(2,10);localStorage.setItem(DEVICE_ID_KEY,deviceId)}
let menu=[],cart=[],selectedOrderType='',currentCategory='',currentModalItem=null,deliveryCharge=DEFAULT_DELIVERY_CHARGE,grillSurcharge=DEFAULT_GRILL_SURCHARGE,frySurcharge=DEFAULT_FRY_SURCHARGE;
let managerCategory=CATEGORIES[0];
const esc=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const money=n=>Number(n||0).toFixed(2);
const normalizePhone=p=>{let s=String(p||'').replace(/\D/g,'');if(s.startsWith('00961'))s=s.slice(5);if(s.startsWith('961'))s=s.slice(3);if(s.startsWith('0'))s=s.slice(1);return s?'0'+s:''};
function loadSettings(){deliveryCharge=Number(localStorage.getItem(DELIVERY_CHARGE_KEY));if(!Number.isFinite(deliveryCharge))deliveryCharge=DEFAULT_DELIVERY_CHARGE;grillSurcharge=Number(localStorage.getItem(GLOBAL_GRILL_KEY));if(!Number.isFinite(grillSurcharge))grillSurcharge=DEFAULT_GRILL_SURCHARGE;frySurcharge=Number(localStorage.getItem(GLOBAL_FRY_KEY));if(!Number.isFinite(frySurcharge))frySurcharge=DEFAULT_FRY_SURCHARGE}
function loadMenu(){try{const x=JSON.parse(localStorage.getItem(MENU_STORAGE_KEY)||'null');if(Array.isArray(x)&&x.length){menu=x;return}}catch{}menu=JSON.parse(JSON.stringify(DEFAULT_MENU));localStorage.setItem(MENU_STORAGE_KEY,JSON.stringify(menu))}
function cloudRowToLocal(r){const d=r.data&&typeof r.data==='object'?r.data:{};const cat={'الأسماك':'🐟 الأسماك','ثمار البحر':'🦐 ثمار البحر','الوجبات والساندويش':'🍽️ الوجبات والساندويش','العروض':'🎁 العروض','المقبلات':'🥗 المقبلات','السلطات':'🥬 السلطات','المشروبات':'🥤 المشروبات'};const def=DEFAULT_MENU.find(x=>String(x.id)===String(r.id));const item={id:String(r.id),name:r.name||'',category:cat[r.category]||r.category||'',type:r.type||def?.type||'fixed',available:r.available!==false};if(item.type==='weight'){item.pricing={base:Number(d.base??d.basePrice??def?.pricing?.base??0)}}else if(item.type==='sizes'){item.sizes={...(d.sizes||def?.sizes||{})}}else if(item.type==='meal')item.prices={وجبة:Number(d.meal??d.وجبة??d.prices?.وجبة??0),ساندويش:Number(d.sandwich??d.ساندويش??d.prices?.ساندويش??0)};else if(item.type==='offer'){item.price=Number(d.price??r.price??0);item.details=d.details||'';item.items=Array.isArray(d.items)?d.items:[]}else item.price=Number(d.price??r.price??def?.price??0);return item}
function localToCloudRow(i){let data={};if(i.type==='weight'){data.base=Number(i.pricing?.base||0)}else if(i.type==='sizes'){data.sizes={...(i.sizes||{})}}else if(i.type==='meal'){data.meal=Number(i.prices?.وجبة||0);data.sandwich=Number(i.prices?.ساندويش||0)}else if(i.type==='offer'){data.price=Number(i.price||0);data.details=i.details||'';data.items=Array.isArray(i.items)?i.items:[]}else data.price=Number(i.price||0);return{id:String(i.id),name:i.name||'',category:i.category||'',type:i.type||'fixed',available:i.available!==false,data,updated_at:new Date().toISOString()}}
async function syncMenuFromCloud(){if(!navigator.onLine)return;try{const r=await api('/rest/v1/pos_menu?select=*&limit=1000');if(r.ok){const rows=await r.json();if(rows.length){menu=rows.map(cloudRowToLocal);saveMenuLocal();renderCategories();renderItems()}}}catch(e){console.warn(e)}}
async function syncMenuToCloud(){if(!navigator.onLine)return;try{for(const i of menu)await api('/rest/v1/pos_menu',{method:'POST',headers:{Prefer:'resolution=merge-duplicates,return=minimal'},body:JSON.stringify(localToCloudRow(i))})}catch(e){console.warn(e)}}
async function syncOneMenuItem(i){if(!navigator.onLine||!i)return;try{await api('/rest/v1/pos_menu',{method:'POST',headers:{Prefer:'resolution=merge-duplicates,return=minimal'},body:JSON.stringify(localToCloudRow(i))})}catch(e){console.warn(e)}}
function openModal(title,body){document.getElementById('modalRoot').innerHTML=`<div class="modal-backdrop" onclick="if(event.target===this)closeModal()"><div class="modal-box"><div class="modal-header"><h3>${title}</h3><button type="button" onclick="closeModal()">✕</button></div><div class="modal-body">${body}</div></div></div>`;document.body.style.overflow='hidden'}
function closeModal(){const root=document.getElementById('modalRoot');if(root)root.innerHTML='';document.body.style.overflow='';}
function refreshManagerKeepScroll(){
 const b=document.querySelector('#modalRoot .modal-body');
 const y=b?b.scrollTop:0;
 renderMenuManagerContent();
 requestAnimationFrame(()=>{const nb=document.querySelector('#modalRoot .modal-body');if(nb)nb.scrollTop=y});
}
function setManagerCategory(category){managerCategory=category;renderMenuManagerContent();}
function renderMenuManagerContent(){
 const host=document.getElementById('managerContent'); if(!host)return;
 const list=menu.filter(i=>i.category===managerCategory);
 host.innerHTML=`<div class="manager-section-title"><h3>${esc(managerCategory)}</h3><span class="muted">${list.length} صنف</span></div><div class="manager-grid">${list.map(managerCard).join('')||'<p class="muted">لا توجد أصناف بهذا التصنيف.</p>'}</div>`;
}
function showMenuManager(){
 managerCategory=CATEGORIES.includes(managerCategory)?managerCategory:CATEGORIES[0];
 const body=`<div class="manager-settings"><h3>⚙️ إعدادات عامة</h3><div class="form-grid"><div><label>كلفة التوصيل ($)</label><input id="managerDelivery" type="number" step="0.01" min="0" value="${money(deliveryCharge)}"></div><div><label>إضافة القلي والشوي لكل كغ ($)</label><input id="managerCooking" type="number" step="0.01" min="0" value="${money((Number(frySurcharge)+Number(grillSurcharge))/2)}"></div><div class="full"><button class="primary" onclick="saveManagerSettings()">💾 حفظ الإعدادات</button></div></div></div><hr><div class="manager-toolbar"><h3>🍽️ إدارة المنيو</h3><div><button class="primary" onclick="openAddItemEditor()">➕ إضافة صنف</button> <button class="primary" onclick="openAddOfferEditor()">🎁 إضافة عرض</button></div></div><p class="muted">اختار التصنيف أولاً، وبعدها بتشوف أصنافه وحدها. فيك تعدّل، تغيّر السعر، تخفي/تظهر، أو تلغي الصنف.</p><div class="manager-category-tabs">${CATEGORIES.map(c=>`<button class="manager-tab ${c===managerCategory?'active':''}" onclick="setManagerCategory('${esc(c).replace(/'/g,"\\'")}')">${esc(c)}</button>`).join('')}</div><div id="managerContent"></div>`;
 openModal('⚙️ إدارة المنيو',body);renderMenuManagerContent();
}
function managerCard(i){const id=esc(i.id).replace(/'/g,"\\'");const sold=i.available===false;let editor='';if(i.type==='offer')editor=`<div class="offer-manager-details"><b>💰 السعر: $${money(i.price)}</b><p>${esc(i.details||'لا توجد تفاصيل')}</p><div class="muted">${(i.items||[]).map(x=>esc(x.name)+(x.quantity>1?' × '+x.quantity:'')).join('، ')||'لا توجد أصناف ضمن العرض'}</div></div>`;else if(i.type==='weight')editor=`<div class="price-editor"><label>السعر الأساسي / كغ ($)</label><input id="price-${esc(i.id)}" type="number" step="0.01" min="0" value="${money(i.pricing?.base)}"><button class="primary" onclick="saveItemPrice('${id}')">💾 حفظ السعر</button></div>`;else if(i.type==='sizes')editor=`<div class="price-editor sizes-editor">${Object.entries(i.sizes||{}).map(([size,p])=>`<div><label>${esc(size)} ($)</label><input id="price-${esc(i.id)}-${esc(size)}" type="number" step="0.01" min="0" value="${money(p)}"></div>`).join('')}<button class="primary" onclick="saveItemPrice('${id}')">💾 حفظ الأسعار</button></div>`;else if(i.type==='meal')editor=`<div class="price-editor"><div><label>وجبة ($)</label><input id="price-${esc(i.id)}-meal" type="number" step="0.01" min="0" value="${money(i.prices?.وجبة)}"></div><div><label>ساندويش ($)</label><input id="price-${esc(i.id)}-sandwich" type="number" step="0.01" min="0" value="${money(i.prices?.ساندويش)}"></div><button class="primary" onclick="saveItemPrice('${id}')">💾 حفظ الأسعار</button></div>`;else editor=`<div class="price-editor"><label>السعر ($)</label><input id="price-${esc(i.id)}" type="number" step="0.01" min="0" value="${money(i.price)}"><button class="primary" onclick="saveItemPrice('${id}')">💾 حفظ السعر</button></div>`;return `<div class="manager-card ${sold?'manager-sold':''}"><h4>${i.type==='offer'?'🎁 ':''}${esc(i.name)}</h4><div class="muted">${esc(i.category)}</div>${editor}<div class="manager-actions"><button class="${sold?'primary':'danger'}" onclick="toggleAvailability('${id}')">${sold?'✅ إعادة متوفر':'⛔ إخفاء/منتهي'}</button>${i.type==='offer'?`<button class="primary" onclick="openEditOffer('${id}')">✏️ تعديل العرض</button>`:`<button class="primary" onclick="openEditItem('${id}')">✏️ تعديل الصنف</button>`}<button class="danger" onclick="deleteMenuItem('${id}')">🗑️ إلغاء الصنف</button></div></div>`}
function categoryOptions(selected){return CATEGORIES.map(c=>`<option value="${esc(c)}" ${c===selected?'selected':''}>${esc(c)}</option>`).join('')}
function openAddItemEditor(){openItemEditor(null)}
function openEditItem(id){const i=menu.find(x=>x.id===id);if(i)openItemEditor(i)}
function openItemEditor(item){const i=item||{id:'',name:'',category:CATEGORIES[0],type:'fixed',price:0,available:true};openModal(item?'✏️ تعديل صنف':'➕ إضافة صنف',`<div class="form-grid"><div><label>اسم الصنف</label><input id="editName" class="modal-input" value="${esc(i.name)}"></div><div><label>التصنيف</label><select id="editCategory" class="modal-input">${categoryOptions(i.category)}</select></div><div><label>نوع الصنف</label><select id="editType" class="modal-input" onchange="refreshItemEditor()"><option value="fixed" ${i.type==='fixed'?'selected':''}>سعر عادي</option><option value="weight" ${i.type==='weight'?'selected':''}>بالكيلو</option><option value="sizes" ${i.type==='sizes'?'selected':''}>أحجام</option><option value="meal" ${i.type==='meal'?'selected':''}>وجبة/ساندويش</option></select></div><div id="itemEditorFields"></div><div class="full"><button class="primary" onclick="saveItemEditor('${esc(i.id).replace(/'/g,"\\'")}')">💾 حفظ</button></div></div>`);window.__editingItem=i;refreshItemEditor()}
function refreshItemEditor(){const i=window.__editingItem||{};const type=document.getElementById('editType').value;let html='';if(type==='weight')html=`<label>السعر الأساسي / كغ</label><input id="editBase" class="modal-input" type="number" step="0.01" value="${money(i.pricing?.base)}">`;else if(type==='sizes'){const sizes=i.sizes||{صغير:0,وسط:0,كبير:0};html=`<label>الأحجام والأسعار (مثال: صغير:5,وسط:8,كبير:11)</label><input id="editSizes" class="modal-input" value="${esc(Object.entries(sizes).map(([k,v])=>k+':'+v).join(','))}">`;}else if(type==='meal')html=`<label>وجبة ($)</label><input id="editMeal" class="modal-input" type="number" step="0.01" value="${money(i.prices?.وجبة)}"><label>ساندويش ($)</label><input id="editSandwich" class="modal-input" type="number" step="0.01" value="${money(i.prices?.ساندويش)}>`;else html=`<label>السعر ($)</label><input id="editPrice" class="modal-input" type="number" step="0.01" value="${money(i.price)}">`;document.getElementById('itemEditorFields').innerHTML=html}
async function saveItemEditor(oldId){const name=document.getElementById('editName').value.trim();if(!name)return alert('اكتب اسم الصنف.');const type=document.getElementById('editType').value;let i=oldId?menu.find(x=>x.id===oldId):null;if(!i){i={id:'item_'+Date.now(),name,category:'',type,available:true};menu.push(i)}i.name=name;i.category=document.getElementById('editCategory').value;i.type=type;if(type==='weight'){i.pricing={base:Number(document.getElementById('editBase').value)||0};delete i.stock;delete i.price;delete i.sizes;delete i.prices}else if(type==='sizes'){const obj={};for(const part of document.getElementById('editSizes').value.split(',')){const [k,v]=part.split(':');if(k&&Number.isFinite(Number(v)))obj[k.trim()]=Number(v)}if(!Object.keys(obj).length)return alert('أدخل الأحجام والأسعار.');i.sizes=obj;delete i.price;delete i.pricing;delete i.prices}else if(type==='meal'){i.prices={وجبة:Number(document.getElementById('editMeal').value)||0,ساندويش:Number(document.getElementById('editSandwich').value)||0};delete i.price;delete i.sizes;delete i.pricing}else{i.price=Number(document.getElementById('editPrice').value)||0;delete i.sizes;delete i.pricing;delete i.prices}saveMenuLocal();syncOneMenuItem(i);renderCategories();renderItems();refreshManagerKeepScroll()}
function openAddOfferEditor(){openOfferEditor(null)}
function openEditOffer(id){const i=menu.find(x=>x.id===id);if(i)openOfferEditor(i)}
function offerItemOptions(selected){return menu.filter(x=>x.type!=='offer').map(x=>`<label class="offer-item-row"><input type="checkbox" value="${esc(x.id)}" ${(selected||[]).some(s=>s.id===x.id)?'checked':''}> ${esc(x.name)} <input class="offer-item-qty" data-id="${esc(x.id)}" type="number" min="1" step="1" value="${Number((selected||[]).find(s=>s.id===x.id)?.quantity||1)}"></label>`).join('')}
function openOfferEditor(item){const i=item||{id:'',name:'',category:'🎁 العروض',type:'offer',price:0,details:'',items:[],available:true};window.__editingOffer=i;openModal(item?'✏️ تعديل العرض':'🎁 إضافة عرض',`<div class="form-grid"><div><label>اسم العرض</label><input id="offerName" class="modal-input" value="${esc(i.name)}"></div><div><label>سعر العرض ($)</label><input id="offerPrice" class="modal-input" type="number" step="0.01" value="${money(i.price)}"></div><div class="full"><label>تفاصيل العرض</label><textarea id="offerDetails" class="modal-input" rows="3">${esc(i.details||'')}</textarea></div><div class="full"><label>الأصناف الموجودة ضمن العرض</label><div class="offer-items-picker">${offerItemOptions(i.items)}</div></div><div class="full"><button class="primary" onclick="saveOfferEditor('${esc(i.id).replace(/'/g,"\\'")}')">💾 حفظ العرض</button></div></div>`)}
async function saveOfferEditor(oldId){const name=document.getElementById('offerName').value.trim(),price=Number(document.getElementById('offerPrice').value);if(!name||!Number.isFinite(price)||price<0)return alert('تأكد من اسم العرض والسعر.');let i=oldId?menu.find(x=>x.id===oldId):null;if(!i){i={id:'offer_'+Date.now(),type:'offer',available:true,category:'🎁 العروض'};menu.push(i)}i.name=name;i.price=price;i.details=document.getElementById('offerDetails').value.trim();i.items=[...document.querySelectorAll('.offer-items-picker input[type=checkbox]:checked')].map(cb=>{const src=menu.find(x=>x.id===cb.value);const q=Number(document.querySelector(`.offer-item-qty[data-id="${cb.value}"]`)?.value||1);return{id:src.id,name:src.name,quantity:q}});saveMenuLocal();syncOneMenuItem(i);renderCategories();renderItems();refreshManagerKeepScroll()}
async function deleteMenuItem(id){const i=menu.find(x=>x.id===id);if(!i)return;if(!confirm(`هل تريد إلغاء الصنف «${i.name}» نهائياً من إدارة المنيو؟`))return;menu=menu.filter(x=>x.id!==id);saveMenuLocal();if(navigator.onLine){api(`/rest/v1/pos_menu?id=eq.${encodeURIComponent(id)}`,{method:'DELETE'}).catch(e=>console.warn(e))}renderCategories();renderItems();refreshManagerKeepScroll()}
async function saveManagerSettings(){
 const d=Number(document.getElementById('managerDelivery').value),c=Number(document.getElementById('managerCooking').value);
 if(!Number.isFinite(d)||d<0||!Number.isFinite(c)||c<0)return alert('أدخل قيم صحيحة.');
 deliveryCharge=d;frySurcharge=c;grillSurcharge=c;
 localStorage.setItem(DELIVERY_CHARGE_KEY,String(d));localStorage.setItem(GLOBAL_FRY_KEY,String(c));localStorage.setItem(GLOBAL_GRILL_KEY,String(c));
 Promise.all([saveSetting('delivery_charge',d),saveSetting('fish_fry_surcharge',c),saveSetting('fish_grill_surcharge',c)]);
 renderCart();refreshManagerKeepScroll();alert('✅ تم حفظ كلفة التوصيل وإضافة القلي والشوي.');
}
async function saveItemPrice(id){
 const i=menu.find(x=>x.id===id);if(!i)return;
 if(i.type==='weight'){
  const n=Number(document.getElementById('price-'+id).value);if(!Number.isFinite(n)||n<0)return alert('السعر غير صحيح.');i.pricing=i.pricing||{};i.pricing.base=n;
 }else if(i.type==='sizes'){
  const next={};for(const size of Object.keys(i.sizes||{})){const el=document.getElementById('price-'+id+'-'+size);const n=Number(el?.value);if(!Number.isFinite(n)||n<0)return alert('السعر غير صحيح.');next[size]=n}i.sizes=next;
 }else if(i.type==='meal'){
  const a=Number(document.getElementById('price-'+id+'-meal').value),b=Number(document.getElementById('price-'+id+'-sandwich').value);if(!Number.isFinite(a)||a<0||!Number.isFinite(b)||b<0)return alert('السعر غير صحيح.');i.prices={وجبة:a,ساندويش:b};
 }else{
  const n=Number(document.getElementById('price-'+id).value);if(!Number.isFinite(n)||n<0)return alert('السعر غير صحيح.');i.price=n;
 }
 saveMenuLocal();syncOneMenuItem(i);renderItems();refreshManagerKeepScroll();
}
async function saveGlobalSurcharges(){
 const c=Number(document.getElementById('globalCooking')?.value ?? document.getElementById('globalFry')?.value);
 if(!Number.isFinite(c)||c<0)return alert('أدخل سعراً صحيحاً.');frySurcharge=c;grillSurcharge=c;localStorage.setItem(GLOBAL_FRY_KEY,String(c));localStorage.setItem(GLOBAL_GRILL_KEY,String(c));saveSetting('fish_fry_surcharge',c);saveSetting('fish_grill_surcharge',c);renderItems();alert('✅ تم توحيد إضافة القلي والشوي.');
}
async function saveSetting(id,value){try{const r=await api('/rest/v1/pos_settings?on_conflict=id',{method:'POST',headers:{Prefer:'resolution=merge-duplicates,return=minimal'},body:JSON.stringify({id,value,updated_at:new Date().toISOString()})});if(!r.ok)console.warn(await r.text())}catch(e){console.warn(e)}}
function toggleAvailability(id){const i=menu.find(x=>x.id===id);if(!i)return;i.available=!i.available;saveMenuLocal();syncOneMenuItem(i);renderItems();refreshManagerKeepScroll()}
document.getElementById('phone')?.addEventListener('blur',findCustomer);
window.addEventListener('online',()=>{setStatus();syncPendingOrders();syncMenuFromCloud()});window.addEventListener('offline',setStatus);
window.addEventListener('load',async()=>{loadSettings();loadMenu();setStatus();if(sessionStorage.getItem('tabbaraLoggedIn')==='1')document.getElementById('loginScreen').style.display='none';renderCategories();renderCart();await syncMenuFromCloud()});
