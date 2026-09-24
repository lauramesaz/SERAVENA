/* ===== Listado del blog: filtros por tema + "ver más" + invitación a agendar =====
   Solo lo usa blog/index.html. Lee las tarjetas que ya están en el HTML
   (las que añade el agente entre INICIO_POSTS y FIN_POSTS), así que no hay
   que tocar nada aquí al publicar un artículo nuevo: si aparece una etiqueta
   nueva, su filtro sale solo. Sin JavaScript la página se ve completa, como antes. */
(function () {
  var grid = document.getElementById('blogGrid');
  var filtros = document.getElementById('blogFilters');
  var masWrap = document.getElementById('blogMoreWrap');
  var masBtn = document.getElementById('blogMore');
  if (!grid || !filtros || !masWrap || !masBtn) return;

  var POR_TANDA = 12;          // artículos visibles antes de pedir "ver más"
  var CTA_TRAS = 3;            // la invitación a agendar va después de esta tarjeta (antes 6: solo 1 de 3 llegaba)
  var ORDEN = ['Lipedema', 'Salud vascular', 'Diagnóstico', 'Bienestar'];

  var cards = Array.prototype.slice.call(grid.querySelectorAll('.blog-card'));
  if (!cards.length) return;

  function temaDe(card) {
    var t = card.querySelector('.blog-tag');
    return t ? t.textContent.replace(/\s+/g, ' ').trim() : '';
  }

  // Temas presentes, en el orden preferido y luego los nuevos que aparezcan
  var temas = [];
  cards.forEach(function (c) { var t = temaDe(c); if (t && temas.indexOf(t) < 0) temas.push(t); });
  temas.sort(function (a, b) {
    var ia = ORDEN.indexOf(a), ib = ORDEN.indexOf(b);
    return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
  });

  var temaActivo = '';
  var limite = POR_TANDA;

  // Invitación a agendar, intercalada en la lista (se reubica al filtrar)
  var cta = document.createElement('aside');
  cta.className = 'blog-cta-card';
  cta.innerHTML =
    '<div class="blog-cta-text">' +
      '<strong>¿Algo de esto te suena?</strong>' +
      '<span>Una valoración con eco doppler aclara qué pasa con tus piernas.</span>' +
    '</div>' +
    '<a class="blog-cta-btn" target="_blank" rel="noopener" ' +
      'href="https://wa.me/573052088204?text=Hola%20Seravena%2C%20vengo%20de%20la%20p%C3%A1gina%20web%20y%20quiero%20agendar%20una%20cita">' +
      'Agendar por WhatsApp</a>';

  function pintar() {
    var visibles = cards.filter(function (c) { return !temaActivo || temaDe(c) === temaActivo; });
    cards.forEach(function (c) { c.hidden = true; c.classList.remove('is-featured'); });
    visibles.slice(0, limite).forEach(function (c, i) {
      c.hidden = false;
      if (i === 0) c.classList.add('is-featured');
      c.classList.add('in'); // ya visible: que no dependa de la animación de entrada
    });

    var mostradas = Math.min(limite, visibles.length);
    if (mostradas >= CTA_TRAS) {
      grid.insertBefore(cta, visibles[CTA_TRAS - 1].nextSibling);
    } else if (mostradas > 0) {
      grid.insertBefore(cta, visibles[mostradas - 1].nextSibling);
    }

    var faltan = visibles.length - mostradas;
    masWrap.hidden = faltan <= 0;
    masBtn.textContent = 'Ver más artículos (' + faltan + ')';
  }

  function boton(texto, tema) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'blog-filter' + (tema === temaActivo ? ' is-active' : '');
    b.textContent = texto;
    b.setAttribute('aria-pressed', tema === temaActivo ? 'true' : 'false');
    b.addEventListener('click', function () {
      temaActivo = tema;
      limite = POR_TANDA;
      Array.prototype.forEach.call(filtros.children, function (x) {
        var on = x === b;
        x.classList.toggle('is-active', on);
        x.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      pintar();
    });
    return b;
  }

  filtros.appendChild(boton('Todos', ''));
  temas.forEach(function (t) { filtros.appendChild(boton(t, t)); });
  filtros.hidden = false;

  masBtn.addEventListener('click', function () {
    limite += POR_TANDA;
    pintar();
  });

  pintar();
})();
