/* contenido.js — Lee los datos editables desde Supabase y los aplica a la web.
   Si Supabase no responde, la página conserva los valores que ya trae en el
   HTML (así nunca se rompe ni se ve vacía). */
(function () {
  var URL = "https://ppxrwyzqtsvwhyfjwgjg.supabase.co";
  var KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBweHJ3eXpxdHN2d2h5Zmp3Z2pnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzMjkxOTEsImV4cCI6MjA5NzkwNTE5MX0.0fi-LnkGmofWEsxTsj9mWVOqgTjZMilEtwzNWtaKEWc";

  fetch(URL + "/rest/v1/contenido?select=clave,valor", {
    headers: { apikey: KEY, Authorization: "Bearer " + KEY }
  })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (rows) {
      if (!rows) return;
      var c = {};
      rows.forEach(function (x) { c[x.clave] = x.valor; });

      // ---- WhatsApp ----
      if (c.whatsapp) {
        var digits = c.whatsapp.replace(/\D/g, "");
        // Todos los enlaces wa.me (conserva el ?text=...)
        document.querySelectorAll('a[href*="wa.me/"]').forEach(function (a) {
          a.href = a.href.replace(/wa\.me\/\d+/, "wa.me/" + digits);
        });
        // Texto visible en el footer
        document.querySelectorAll('.footer-contact a[href*="wa.me"]').forEach(function (a) {
          a.textContent = "WhatsApp · " + c.whatsapp;
        });
        // Texto visible en la tarjeta de contacto
        document.querySelectorAll('.contact-method[href*="wa.me"] .contact-method-value').forEach(function (el) {
          el.textContent = c.whatsapp;
        });
      }

      // ---- Correo ----
      if (c.email) {
        document.querySelectorAll('a[href^="mailto:"]').forEach(function (a) {
          a.href = "mailto:" + c.email;
        });
        document.querySelectorAll('.footer-contact a[href^="mailto:"]').forEach(function (a) {
          a.textContent = c.email;
        });
        document.querySelectorAll('.contact-method[href^="mailto:"] .contact-method-value').forEach(function (el) {
          el.textContent = c.email;
        });
      }
    })
    .catch(function () { /* silencio: la web queda con sus valores actuales */ });
})();
