const CACHE="tabbara-pos-v61";
const ASSETS=["./","./index.html","./style.css?v=61","./script.js?v=61","./qz-integration.js?v=61","./html2canvas.min.js"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{
  const req=e.request;
  const url=new URL(req.url);
  const isAppAsset=req.mode==="navigate"||url.pathname.endsWith("/index.html")||url.pathname.endsWith("/script.js")||url.pathname.endsWith("/style.css")||url.pathname.endsWith("/sw.js")||url.pathname.endsWith("/qz-integration.js")||url.pathname.endsWith("/html2canvas.min.js");
  if(isAppAsset){
    e.respondWith(fetch(req,{cache:"no-store"}).then(res=>{
      if(res&&res.ok){const copy=res.clone();caches.open(CACHE).then(c=>c.put(req,copy));}
      return res;
    }).catch(()=>caches.match(req).then(r=>r||caches.match("./index.html"))));
    return;
  }
  e.respondWith(caches.match(req).then(r=>r||fetch(req).then(res=>{
    const copy=res.clone();caches.open(CACHE).then(c=>c.put(req,copy));return res
  }).catch(()=>caches.match("./index.html"))));
});
