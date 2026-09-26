const CACHE="tabbara-pos-v73";
const ASSETS=["./","./index.html","./style.css?v=73","./script.js?v=73","./qz-integration.js?v=73","./html2canvas.min.js"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{
 const req=e.request; const url=new URL(req.url);
 // NEVER cache Supabase/API traffic: the POS must always see new WhatsApp orders immediately.
 if(url.hostname.endsWith("supabase.co") || url.pathname.startsWith("/rest/") || url.pathname.startsWith("/api/")) return;
 const isAppAsset=req.mode==="navigate"||url.origin===location.origin&&(url.pathname.endsWith("/index.html")||url.pathname.endsWith("/script.js")||url.pathname.endsWith("/style.css")||url.pathname.endsWith("/sw.js")||url.pathname.endsWith("/qz-integration.js")||url.pathname.endsWith("/html2canvas.min.js"));
 if(isAppAsset){
   e.respondWith(fetch(req,{cache:"no-store"}).then(res=>{if(res&&res.ok){caches.open(CACHE).then(c=>c.put(req,res.clone()));}return res;}).catch(()=>caches.match(req).then(r=>r||caches.match("./index.html"))));
 }
});
