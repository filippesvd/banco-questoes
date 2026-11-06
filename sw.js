const CACHE = "bq-cloud-v21";
const ARQUIVOS = [
  "./detalhe_01.webp",
  "./detalhe_02.webp",
  "./detalhe_03.webp",
  "./detalhe_04.webp",
  "./detalhe_05.webp",
  "./detalhe_06.webp",
  "./detalhe_07.webp",
  "./detalhe_08.webp",
  "./detalhe_09.webp",
  "./detalhe_10.webp",
  "./elemento_01.webp",
  "./elemento_02.webp",
  "./elemento_03.webp",
  "./elemento_04.webp",
  "./elemento_05.webp",
  "./elemento_06.webp",
  "./elemento_07.webp",
  "./elemento_08.webp",
  "./elemento_09.webp",
  "./elemento_10.webp",
  "./elemento_11.webp",
  "./elemento_12.webp",
  "./fundo_01.webp",
  "./fundo_02.webp",
  "./fundo_03.webp",
  "./fundo_04.webp",
  "./fundo_05.webp",
  "./fundo_06.webp",
  "./fundo_07.webp",
  "./fundo_08.webp",
  "./fundo_09.webp",
  "./fundo_10.webp",
  "./fundo_11.webp",
  "./icone_01.webp",
  "./icone_02.webp",
  "./icone_03.webp",
  "./icone_04.webp",
  "./icone_05.webp",
  "./icone_06.webp",
  "./icone_07.webp",
  "./icone_08.webp",
  "./icone_09.webp",
  "./icone_10.webp",
  "./icone_11.webp",
  "./icone_12.webp",
  "./icone_13.webp",
  "./icone_14.webp",
  "./icone_15.webp",
  "./icone_16.webp",
  "./padrao_01.webp",
  "./padrao_02.webp",
  "./padrao_03.webp",
  "./padrao_04.webp",
  "./padrao_05.webp",
  "./padrao_06.webp",
  "./padrao_07.webp",
  "./padrao_08.webp",
  "./padrao_09.webp",
  "./padrao_10.webp",
  "./padrao_leve.webp"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ARQUIVOS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const u = new URL(e.request.url);
  if (e.request.method !== "GET" || u.hostname.endsWith("supabase.co")) return;
  e.respondWith(
    fetch(e.request).then(res => {
      if (res.ok && (u.origin === self.location.origin || u.hostname === "cdn.jsdelivr.net")) {
        const copia = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copia));
      }
      return res;
    }).catch(() => caches.match(e.request).then(r => r || caches.match("./index.html")))
  );
});
