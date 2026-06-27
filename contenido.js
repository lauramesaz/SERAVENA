/* contenido.js — Aplica el contenido editable (Supabase) a la web pública.
   - Textos: detecta los elementos de texto automáticamente y les pone una
     "clave" estable según su posición (o su data-c si lo tienen).
   - Contacto: WhatsApp y correo (aparecen en varios lugares).
   Si Supabase no responde, la página conserva su contenido original. */
(function () {
  var SB_URL = "https://ppxrwyzqtsvwhyfjwgjg.supabase.co";
  var SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBweHJ3eXpxdHN2d2h5Zmp3Z2pnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzMjkxOTEsImV4cCI6MjA5NzkwNTE5MX0.0fi-LnkGmofWEsxTsj9mWVOqgTjZMilEtwzNWtaKEWc";

  /* ===== Funciones compartidas con el panel (deben ser IDÉNTICAS) ===== */
  function svEditable(doc) {
    var sel = 'h1,h2,h3,h4,h5,p,li,summary,blockquote,figcaption,.eyebrow,.stat-label,.lead,.btn,.quiz-chip span:not(.quiz-check),.area-link';
    var list = Array.prototype.slice.call(doc.querySelectorAll(sel)).filter(function (el) {
      if (el.closest('header,nav,script,style,.marquee')) return false;     // no tocar menú/marquesina
      if (el.classList.contains('hero-title')) return false;                 // el H1 completo no, pero sus líneas sí (abajo)
      if (el.querySelector('h1,h2,h3,h4,h5,p,li,ul,ol,section,div,img,video,svg')) return false; // solo "hojas" de texto
      return el.textContent.replace(/\s+/g, '').length > 0;
    });
    // líneas internas del título animado del hero (editables sin romper la animación)
    Array.prototype.slice.call(doc.querySelectorAll('.hero-title .line > span')).forEach(function (el) {
      if (list.indexOf(el) === -1 && el.textContent.replace(/\s+/g, '').length > 0) list.push(el);
    });
    return list;
  }
  function svKey(page, el) {
    var dc = el.getAttribute('data-c');
    if (dc) return dc;
    var parts = [], n = el;
    while (n && n.nodeType === 1 && n.tagName !== 'BODY' && n.tagName !== 'HTML') {
      var tag = n.tagName.toLowerCase(), i = 1, s = n;
      while ((s = s.previousElementSibling)) { if (s.tagName === n.tagName) i++; }
      parts.unshift(tag + i);
      n = n.parentElement;
    }
    return page + '|' + parts.join('>');
  }
  function svPage() {
    var f = (location.pathname.split('/').pop() || 'index.html');
    if (!f) f = 'index.html';
    return f.replace('.html', '');
  }
  function svImages(doc) {
    return Array.prototype.slice.call(doc.querySelectorAll('img')).filter(function (img) {
      if (img.closest('header,nav,footer,.marquee')) return false;   // logos / footer
      if (img.classList.contains('logo-img') || img.classList.contains('footer-logo')) return false;
      var src = img.getAttribute('src') || '';
      if (/isotype|wordmark|mark/i.test(src)) return false;          // marcas/íconos
      return true;
    });
  }
  function svVideos(doc) { return Array.prototype.slice.call(doc.querySelectorAll('video')); }

  fetch(SB_URL + "/rest/v1/contenido?select=clave,valor", { headers: { apikey: SB_KEY, Authorization: "Bearer " + SB_KEY } })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (rows) {
      if (!rows) return;
      var c = {};
      rows.forEach(function (x) { c[x.clave] = x.valor; });

      // ---- Textos (clave por data-c o por posición) ----
      try {
        var page = svPage();
        svEditable(document).forEach(function (el) {
          var k = svKey(page, el);
          if (c[k] != null && c[k] !== "") el.textContent = c[k];
        });
      } catch (e) {}

      // ---- Imágenes ----
      try {
        var pageI = svPage();
        svImages(document).forEach(function (img) {
          var k = 'img::' + svKey(pageI, img);
          if (c[k]) img.src = c[k];
        });
      } catch (e) {}

      // ---- Videos ----
      try {
        var pageV = svPage();
        svVideos(document).forEach(function (v) {
          var k = 'vid::' + svKey(pageV, v);
          if (c[k]) { v.src = c[k]; try { v.load(); } catch (e) {} }
        });
      } catch (e) {}

      // ---- WhatsApp ----
      if (c.whatsapp) {
        var digits = c.whatsapp.replace(/\D/g, "");
        document.querySelectorAll('a[href*="wa.me/"]').forEach(function (a) { a.href = a.href.replace(/wa\.me\/\d+/, "wa.me/" + digits); });
        document.querySelectorAll('.footer-contact a[href*="wa.me"]').forEach(function (a) { a.textContent = "WhatsApp · " + c.whatsapp; });
        document.querySelectorAll('.contact-method[href*="wa.me"] .contact-method-value').forEach(function (el) { el.textContent = c.whatsapp; });
      }
      // ---- Correo ----
      if (c.email) {
        document.querySelectorAll('a[href^="mailto:"]').forEach(function (a) { a.href = "mailto:" + c.email; });
        document.querySelectorAll('.footer-contact a[href^="mailto:"]').forEach(function (a) { a.textContent = c.email; });
        document.querySelectorAll('.contact-method[href^="mailto:"] .contact-method-value').forEach(function (el) { el.textContent = c.email; });
      }
    })
    .catch(function () {});
})();
