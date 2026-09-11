const CACHE_NAME="tabbara-fish-pos-v8";
const FILES_TO_CACHE=["./","./index.html","./style.css","./script.js"];
self.addEventListener("install",event=>{event.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(FILES_TO_CACHE)));self.skipWaiting()});
self.addEventListener("activate",event=>{event.waitUntil(caches.keys().then(names=>Promise.all(names.filter(n=>n!==CACHE_NAME).map(n=>caches.delete(n)))));self.clients.claim()});
self.addEventListener("fetch",event=>{
  if(event.request.method!=="GET")return;
  const u=new URL(event.request.url);if(u.origin!==self.location.origin)return;
  if(event.request.mode==="navigate"){event.respondWith(fetch(event.request).then(r=>{const c=r.clone();caches.open(CACHE_NAME).then(x=>x.put("./index.html",c));return r}).catch(()=>caches.match("./index.html")));return}
  event.respondWith(caches.match(event.request).then(c=>c||fetch(event.request).then(r=>{if(r&&r.status===200){const q=r.clone();caches.open(CACHE_NAME).then(x=>x.put(event.request,q))}return r})));
});