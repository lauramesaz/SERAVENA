/* ============================================================
   SERAVENA — Interacciones (multipágina)
   ============================================================ */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];

/* Año en el footer */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ---------- Fade-in de página ---------- */
document.body.classList.add('loaded');

/* ---------- Transición entre páginas ---------- */
/* Al volver con el botón "atrás" el navegador restaura la página tal cual quedó (invisible): se vuelve a mostrar */
window.addEventListener('pageshow', (e) => { if (e.persisted) document.body.classList.remove('leaving'); });
function isInternalLink(a) {
  const href = a.getAttribute('href') || '';
  if (a.target === '_blank' || a.hasAttribute('download')) return false;
  if (/^(mailto:|tel:|https?:\/\/|#|javascript:)/.test(href)) return false;
  // Páginas del sitio: con o sin ".html" (direcciones limpias). Los enlaces con ancla (#) navegan normal.
  const ruta = href.split('?')[0];
  if (ruta.indexOf('#') > -1) return false;
  return /\.html$/.test(ruta) || !/\.[a-z0-9]{2,5}$/i.test(ruta);
}
document.addEventListener('click', (e) => {
  const a = e.target.closest('a');
  if (!a || !isInternalLink(a)) return;
  const href = a.getAttribute('href');
  if (!href || href.startsWith('#')) return;
  e.preventDefault();
  document.body.classList.remove('loaded');
  document.body.classList.add('leaving');
  const delay = reduceMotion ? 0 : 360;
  setTimeout(() => { window.location.href = href; }, delay);
});

/* ---------- Preloader (solo si existe) ---------- */
const preloader = document.getElementById('preloader');
if (preloader) {
  window.addEventListener('load', () => {
    setTimeout(() => preloader.classList.add('done'), 900);
    setTimeout(() => { $('.hero-title')?.classList.add('in'); $('.hero')?.classList.add('go'); }, 1000);
  });
  // respaldo: si la carga tarda, igual mostramos el banner
  setTimeout(() => { preloader.classList.add('done'); $('.hero-title')?.classList.add('in'); $('.hero')?.classList.add('go'); }, 3000);
} else {
  // sin pantalla de carga: el telón del banner arranca apenas la foto está lista (máx. 1,2 s de espera)
  const goHero = () => { $('.hero-title')?.classList.add('in'); $('.hero')?.classList.add('go'); };
  const heroImg = $('.hl-media img');
  if (heroImg && !heroImg.complete) {
    let hecho = false; const una = () => { if (!hecho) { hecho = true; goHero(); } };
    heroImg.addEventListener('load', una, { once: true }); heroImg.addEventListener('error', una, { once: true });
    setTimeout(una, 1200);
  } else goHero();
}

/* ---------- Videos (hero + bandas, con cámara lenta y lazy) ---------- */
/* En móvil (o con ahorro de datos activo) no descargamos los vídeos decorativos:
   pesan varios MB y ahí solo se ve el poster, que es idéntico en la práctica.
   Ahorra la descarga entera justo donde los datos cuestan y la conexión es peor. */
const conexion = navigator.connection || {};
const sinVideoDeFondo = window.matchMedia('(max-width: 767px)').matches
  || conexion.saveData === true
  || ['slow-2g', '2g'].includes(conexion.effectiveType);

function setupVideo(v) {
  const rate = parseFloat(v.dataset.rate) || 1;
  if (sinVideoDeFondo) { v.removeAttribute('autoplay'); return; }   // se queda el poster
  const fuente = v.querySelector('source[data-src]');
  if (fuente) { fuente.src = fuente.dataset.src; v.load(); }
  v.addEventListener('loadedmetadata', () => { v.playbackRate = rate; }, { once: true });
  if (reduceMotion) { v.removeAttribute('autoplay'); v.pause(); return; }
  const tryPlay = () => { v.playbackRate = rate; v.play().catch(() => {}); };
  v.addEventListener('canplay', tryPlay, { once: true });
  tryPlay();
}
const lazyVideoObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const v = entry.target;
    if (!reduceMotion) { v.load(); setupVideo(v); }
    lazyVideoObserver.unobserve(v);
  });
}, { rootMargin: '300px 0px' });
$$('video[data-rate]').forEach(v => {
  if (v.hasAttribute('data-lazy')) lazyVideoObserver.observe(v);
  else setupVideo(v);
});

/* ---------- Scroll progress + navbar + parallax ---------- */
const progress = document.getElementById('scrollProgress');
const navbar = document.getElementById('navbar');
let ticking = false;
const parallaxEls = $$('[data-parallax-bg]');

function updateParallax(scrollTop) {
  const vh = window.innerHeight;
  parallaxEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.bottom < -200 || rect.top > vh + 200) return;
    const elemCenter = rect.top + rect.height / 2;
    const p = (elemCenter - vh / 2) / vh;
    const range = el.hasAttribute('data-parallax-bg') ? 60 : 34;
    el.style.transform = `translate3d(0, ${(-p * range).toFixed(1)}px, 0)`;
  });
}
/* Artículos del blog y política de privacidad (fondo claro arriba): el menú arranca en su versión clara,
   si no el logo y el menú blancos no se ven sobre el fondo blanco. */
const sinPortadaOscura = !!document.querySelector('.post-head, section.legal, main.pa');
if (navbar && sinPortadaOscura) navbar.classList.add('scrolled');
function onScroll() {
  const scrollTop = window.scrollY;
  if (progress) {
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (scrollTop / docH * 100) + '%';
  }
  if (navbar) navbar.classList.toggle('scrolled', scrollTop > 60 || sinPortadaOscura);
  if (!reduceMotion) updateParallax(scrollTop);
}
window.addEventListener('scroll', () => {
  if (!ticking) { requestAnimationFrame(() => { onScroll(); ticking = false; }); ticking = true; }
}, { passive: true });
onScroll();

/* ---------- Reveal (robusto) ---------- */
const revealEls = $$('.reveal, .reveal-media');
const revealObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const delay = +entry.target.dataset.delay || 0;
      setTimeout(() => entry.target.classList.add('in'), delay);
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0, rootMargin: '0px 0px -6% 0px' });
revealEls.forEach(el => {
  const group = el.parentElement;
  const siblings = $$(':scope > .reveal', group);
  if (siblings.length > 1 && el.classList.contains('reveal')) el.dataset.delay = (siblings.indexOf(el) % 4) * 90; // tope: en listas largas (blog) el retraso crecía hasta varios segundos
  revealObserver.observe(el);
});
// Respaldo: revela lo que ya esté en pantalla (por si el observer no dispara)
function revealInView() {
  revealEls.forEach(el => {
    if (el.classList.contains('in')) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.92 && r.bottom > 0) el.classList.add('in');
  });
}
revealInView(); // lo que ya está en pantalla aparece sin esperar a que cargue todo (velocidad: LCP)
window.addEventListener('load', () => setTimeout(revealInView, 250));
window.addEventListener('scroll', () => requestAnimationFrame(revealInView), { passive: true });

/* ---------- Contadores ---------- */
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = +el.dataset.count, suffix = el.dataset.suffix || '', dur = 1600, start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      const val = Math.floor((1 - Math.pow(1 - p, 3)) * target);
      el.textContent = val.toLocaleString('es') + suffix;
      if (p < 1) requestAnimationFrame(tick); else el.textContent = target.toLocaleString('es') + suffix;
    }
    requestAnimationFrame(tick);
    countObserver.unobserve(el);
  });
}, { threshold: 0.5 });
$$('.stat-num').forEach(el => countObserver.observe(el));

/* ---------- Menú móvil ---------- */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    document.getElementById('navbar')?.classList.toggle('menu-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open'); navToggle.classList.remove('open'); document.getElementById('navbar')?.classList.remove('menu-open'); document.body.style.overflow = '';
  }));
}

/* Menú "Tratamientos" (computador): se abre con clic o teclado además de al pasar el ratón */
$$('.nav-group-btn').forEach(btn => {
  const grupo = btn.parentElement;
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const abierto = grupo.classList.toggle('open');
    btn.setAttribute('aria-expanded', abierto ? 'true' : 'false');
  });
  document.addEventListener('click', (e) => {
    if (!grupo.contains(e.target)) { grupo.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }
  });
});

/* ---------- Testimonios ---------- */
const testis = $$('.testi');
const dotsWrap = document.getElementById('testiDots');
if (testis.length && dotsWrap) {
  let testiIdx = 0;
  testis.forEach((_, i) => {
    const b = document.createElement('button');
    b.setAttribute('aria-label', 'Testimonio ' + (i + 1));
    if (i === 0) b.classList.add('active');
    b.addEventListener('click', () => goTesti(i, true));
    dotsWrap.appendChild(b);
  });
  const dots = [...dotsWrap.children];
  function goTesti(i, manual) {
    testis[testiIdx].classList.remove('active'); dots[testiIdx].classList.remove('active');
    testiIdx = i;
    testis[testiIdx].classList.add('active'); dots[testiIdx].classList.add('active');
    if (manual) { clearInterval(testiTimer); testiTimer = setInterval(nextTesti, 6000); }
  }
  function nextTesti() { goTesti((testiIdx + 1) % testis.length); }
  let testiTimer = setInterval(nextTesti, 6000);
}

/* ---------- FAQ ---------- */
const faqItems = $$('.faq-item');
faqItems.forEach(item => item.addEventListener('toggle', () => {
  if (item.open) faqItems.forEach(o => { if (o !== item) o.open = false; });
}));

/* ---------- Botones magnéticos ---------- */
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && !reduceMotion) {
  $$('.btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.16}px, ${y * 0.26}px) translateY(-3px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });
}

/* ---------- Autoevaluación interactiva ---------- */
const quizGrid = document.getElementById('quizGrid');
if (quizGrid) {
  const chips = $$('.quiz-chip', quizGrid);
  const fill = document.getElementById('quizBarFill');
  const msg = document.getElementById('quizMsg');
  const cta = document.getElementById('quizCta');
  function updateQuiz() {
    const n = chips.filter(c => c.classList.contains('on')).length;
    fill.style.width = (n / chips.length * 100) + '%';
    if (n === 0) {
      msg.textContent = 'Marca las señales que reconozcas en ti.';
      cta.hidden = true;
    } else if (n <= 2) {
      msg.innerHTML = 'Marcaste <strong>' + n + '</strong> señal' + (n > 1 ? 'es' : '') + '. Algunas coinciden — una valoración puede darte claridad.';
      cta.hidden = false;
    } else {
      msg.innerHTML = 'Marcaste <strong>' + n + '</strong> señales. Varias coinciden con el lipedema; te recomendamos una valoración especializada.';
      cta.hidden = false;
    }
    // El resultado viaja en el mensaje de WhatsApp. Aquí no hay "final" del test: se mide una sola vez,
    // cuando la persona deja de marcar por unos segundos (ver svTestResultado, más abajo).
    clearTimeout(quizAviso);
    if (n > 0 && window.svTestResultado) {
      const r = { nivel: n <= 1 ? 'baja' : (n <= 3 ? 'moderada' : 'alta'), si: n, total: chips.length,
        senales: chips.filter(c => c.classList.contains('on')).map(c => c.textContent.replace(/\s+/g, ' ').trim()) };
      window.svTestResultado(Object.assign({ medir: false }, r));
      if (!quizMedido) quizAviso = setTimeout(() => { quizMedido = true; window.svTestResultado(r); }, 4000);
    }
  }
  let quizAviso = null, quizMedido = false;
  chips.forEach(c => c.addEventListener('click', () => { c.classList.toggle('on'); updateQuiz(); }));
}

/* ---------- Scroll cinematográfico: iluminar palabras ---------- */
const introText = document.getElementById('introText');
if (introText && !reduceMotion) {
  (function wrapWords(node) {
    [...node.childNodes].forEach(child => {
      if (child.nodeType === 3) {
        const frag = document.createDocumentFragment();
        child.textContent.split(/(\s+)/).forEach(part => {
          if (part === '' ) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); }
          else { const s = document.createElement('span'); s.className = 'word'; s.textContent = part; frag.appendChild(s); }
        });
        node.replaceChild(frag, child);
      } else if (child.nodeType === 1) {
        wrapWords(child);
      }
    });
  })(introText);
  const words = $$('.word', introText);
  function lightWords() {
    const line = window.innerHeight * 0.72;
    words.forEach(w => { w.classList.toggle('lit', w.getBoundingClientRect().top < line); });
  }
  window.addEventListener('scroll', () => requestAnimationFrame(lightWords), { passive: true });
  window.addEventListener('resize', lightWords);
  lightWords();
}

/* ---------- Mapa del cuerpo (Lipedema) ---------- */
const bmPanel = document.getElementById('bmPanel');
if (bmPanel) {
  const Z = {
    brazos:{t:'Brazos',d:'En muchos casos la grasa también se acumula en los brazos, sensible al tacto y con la misma desproporción que en las piernas.'},
    caderas:{t:'Caderas y glúteos',d:'Suelen ser de las primeras zonas: la grasa da una forma desproporcionada respecto al torso, sin relación con lo que comes.'},
    muslos:{t:'Muslos',d:'Se ven gruesos y la grasa es nodular y dolorosa, aunque el resto del cuerpo no cambie con dieta ni ejercicio.'},
    pantorrillas:{t:'Pantorrillas',d:'El engrosamiento avanza por la pierna y se detiene de forma marcada al llegar al tobillo.'},
    tobillos:{t:'Tobillos y pies',d:'El lipedema respeta los pies: se ve un corte o "brazalete" justo en el tobillo. Es clave para diferenciarlo de otras causas de hinchazón.'}
  };
  const order=['brazos','caderas','muslos','pantorrillas','tobillos'];
  const labels={brazos:'Brazos',caderas:'Caderas',muslos:'Muslos',pantorrillas:'Pantorrillas',tobillos:'Tobillos'};
  const bmMap=document.querySelector('.bm-map');
  const bmChips=document.getElementById('bmChips');
  order.forEach(z=>{const b=document.createElement('button');b.className='bm-chip';b.dataset.z=z;b.textContent=labels[z];b.addEventListener('click',()=>bmSelect(z));bmChips.appendChild(b);});
  // etiqueta de zona en cada punto
  $$('.bm-hot').forEach(h=>{ const s=document.createElement('span'); s.className='bm-hot-lbl'; s.textContent=h.getAttribute('aria-label'); h.appendChild(s); });
  function bmSelect(z){
    $$('.bm-hot,.bm-chip').forEach(e=>{ const on=e.dataset.z===z; e.classList.toggle('on',on); if(e.classList.contains('bm-hot')) e.setAttribute('aria-pressed',on?'true':'false'); });
    bmPanel.classList.remove('is-empty');
    if(bmMap) bmMap.classList.add('has-selected');
    bmPanel.querySelector('.bm-title').textContent=Z[z].t;
    bmPanel.querySelector('.bm-desc').textContent=Z[z].d;
  }
  $$('.bm-hot').forEach(h=>h.addEventListener('click',()=>bmSelect(h.dataset.z)));
}

/* ---------- Deslizador de etapas (Lipedema) ---------- */
const etSlider = document.getElementById('etSlider');
if (etSlider) {
  const ET=[null,
   {t:'Superficie lisa',d:'La piel se ve lisa y de aspecto normal, pero al palpar se sienten pequeños nódulos bajo la superficie. Ya puede haber dolor al tacto y facilidad para los moretones.'},
   {t:'Aparecen nódulos',d:'La superficie se vuelve irregular, tipo colchón. Los nódulos se palpan con más claridad y la desproporción entre piernas y torso se hace evidente.'},
   {t:'Lóbulos grandes',d:'Se forman acumulaciones que deforman el contorno, sobre todo en muslos y rodillas, y la piel se endurece. Puede empezar a dificultar el movimiento.'},
   {t:'Lipo-linfedema',d:'Al componente de grasa se suma retención de líquido, porque el sistema linfático drena peor. Aumentan el volumen y la pesadez, y puede aparecer hinchazón en el pie.'}
  ];
  const etImgs=$$('.et-stage img');
  const etTicksEl=document.getElementById('etTicks');
  for(let i=1;i<=4;i++){const b=document.createElement('button');b.className='et-tick';b.textContent='Etapa '+i;b.addEventListener('click',()=>{etSlider.value=i;etRender(i);});etTicksEl.appendChild(b);}
  const etTicks=[...etTicksEl.children];
  function etRender(v){
    etImgs.forEach((im,idx)=>{im.style.opacity=Math.max(0,1-Math.abs(v-(idx+1))).toFixed(3);});
    const pct=((v-1)/3*100).toFixed(1);
    etSlider.style.background='linear-gradient(90deg, var(--camel) '+pct+'%, var(--arena-deep) '+pct+'%)';
    const s=Math.round(v);
    document.getElementById('etNum').textContent='Etapa '+s+' de 4';
    document.getElementById('etTitle').textContent=ET[s].t;
    document.getElementById('etDesc').textContent=ET[s].d;
    document.getElementById('etTag').textContent='Etapa '+s;
    etTicks.forEach((t,i)=>t.classList.toggle('on',i+1===s));
  }
  etSlider.addEventListener('input',e=>etRender(+e.target.value));
  etRender(1);
}

/* ---------- Autoevaluación una-pregunta-a-la-vez ---------- */
const quiz2 = document.getElementById('quiz2');
if (quiz2) {
  const Q=[
   '¿Tus piernas o brazos se ven desproporcionados respecto al resto del cuerpo?',
   '¿Sientes dolor o sensibilidad al tacto en las extremidades?',
   '¿La pesadez en las piernas no mejora con dieta ni ejercicio?',
   '¿Te salen moretones con facilidad y sin causa clara?',
   '¿Hay antecedentes familiares de lipedema?',
   '¿La grasa no baja en las piernas aunque adelgaces en otras zonas?'
  ];
  let idx=0, yes=0;
  const bar=document.getElementById('q2bar'), count=document.getElementById('q2count'), qEl=document.getElementById('q2q');
  const card=document.getElementById('q2card'), result=document.getElementById('q2result');
  function q2show(){ count.textContent='Pregunta '+(idx+1)+' de '+Q.length; qEl.textContent=Q[idx]; bar.style.width=(idx/Q.length*100)+'%'; }
  function q2answer(v){ if(v)yes++; idx++; if(idx<Q.length){q2show();} else q2finish(); }
  function q2finish(){
    bar.style.width='100%'; card.hidden=true; result.hidden=false;
    document.getElementById('q2rcount').textContent='Marcaste '+yes+' de '+Q.length+' señales';
    let m; if(yes<=1)m='Pocas señales coinciden. Aun así, si tienes dudas, una valoración puede darte tranquilidad.';
    else if(yes<=3)m='Algunas señales coinciden. Vale la pena una valoración para tener claridad.';
    else m='Varias señales coinciden con el lipedema. Te recomendamos una valoración especializada.';
    document.getElementById('q2rmsg').textContent=m;
    // El resultado viaja en el mensaje de WhatsApp y se mide "test_terminado" (ver svTestResultado, más abajo)
    if (window.svTestResultado) window.svTestResultado({ nivel: yes<=1 ? 'baja' : (yes<=3 ? 'moderada' : 'alta'), si: yes, total: Q.length });
  }
  document.getElementById('q2si').addEventListener('click',()=>q2answer(1));
  document.getElementById('q2no').addEventListener('click',()=>q2answer(0));
  document.getElementById('q2restart').addEventListener('click',()=>{idx=0;yes=0;result.hidden=true;card.hidden=false;q2show();});
  q2show();
}

/* ---------- Recorrido venoso: línea que se dibuja con el scroll ---------- */
const veScroll = document.getElementById('recorrido');
if (veScroll && veScroll.querySelector('.ve-field')) {
  const SVGNS = 'http://www.w3.org/2000/svg';
  const field = veScroll.querySelector('.ve-field');
  const scatterG = field.querySelector('#veScatter');
  const dotsG = field.querySelector('#veDots');
  const paths = $$('.ve-h[data-range]', field);
  let sc = '';
  for (let i = 0; i < 150; i++) {
    sc += '<circle cx="' + (Math.random()*1440|0) + '" cy="' + (Math.random()*900|0) + '" r="' + (1.2+Math.random()*1.3).toFixed(1) + '" fill="#9D8051" opacity="' + (0.05+Math.random()*0.10).toFixed(2) + '"/>';
  }
  scatterG.innerHTML = sc;
  const veinDots = [];
  paths.forEach(path => {
    const [rs, re] = path.dataset.range.split(' ').map(Number);
    const total = path.getTotalLength();
    for (let d = 0; d <= total; d += 9) {
      const pt = path.getPointAtLength(d);
      const c = document.createElementNS(SVGNS, 'circle');
      c.setAttribute('cx', (pt.x + (Math.random()*4-2)).toFixed(1));
      c.setAttribute('cy', (pt.y + (Math.random()*4-2)).toFixed(1));
      c.setAttribute('r', (1.7 + Math.random()*1.3).toFixed(1));
      c.setAttribute('fill', '#9D8051');
      c.style.opacity = '0';
      c.dataset.order = (rs + (d/total)*(re-rs)).toFixed(3);
      dotsG.appendChild(c); veinDots.push(c);
    }
  });
  const capEl = document.getElementById('veCap'), h2El = document.getElementById('veH2'), pEl = document.getElementById('veP');
  const prog = $$('.ve-progress i', veScroll);
  const CAPS = [
    { h: 'La sangre <strong>sube</strong>', p: 'De tus piernas al corazón, contra la gravedad, todo el día.' },
    { h: 'Las <strong>válvulas</strong> la sostienen', p: 'Pequeñas compuertas que impiden que la sangre se devuelva.' },
    { h: 'Si <strong>fallan</strong>, se estanca', p: 'Ahí aparecen las várices, la pesadez y la hinchazón. Eso es lo que tratamos.' }
  ];
  let curIdx = 0;
  const cl = v => Math.max(0, Math.min(1, v));
  function veDraw() {
    const r = veScroll.getBoundingClientRect();
    const p = cl((-r.top) / (veScroll.offsetHeight - window.innerHeight));
    veinDots.forEach(d => { d.style.opacity = (+d.dataset.order <= p) ? '0.9' : '0'; });
    const idx = p < 0.4 ? 0 : (p < 0.72 ? 1 : 2);
    if (idx !== curIdx) {
      curIdx = idx;
      capEl.classList.remove('on');
      setTimeout(() => { h2El.innerHTML = CAPS[idx].h; pEl.textContent = CAPS[idx].p; capEl.classList.add('on'); }, 180);
    }
    prog.forEach((c, i) => c.classList.toggle('on', i <= idx));
    veScroll.classList.toggle('scrolled', p > 0.06);
  }
  if (reduceMotion) { veinDots.forEach(d => d.style.opacity = '0.9'); }
  else { window.addEventListener('scroll', () => requestAnimationFrame(veDraw), { passive: true }); veDraw(); }
}

/* ---------- Índice lateral: sección activa (scrollspy) ---------- */
const dotnav = document.getElementById('dotnav');
if (dotnav) {
  const links = $$('a', dotnav);
  const ids = links.map(a => a.getAttribute('href').slice(1)).filter(id => document.getElementById(id));
  function updateDotnav() {
    const mid = window.scrollY + window.innerHeight * 0.4;
    let current = null;
    ids.forEach(id => { if (document.getElementById(id).offsetTop <= mid) current = id; });
    links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + current));
  }
  window.addEventListener('scroll', () => requestAnimationFrame(updateDotnav), { passive: true });
  window.addEventListener('resize', updateDotnav);
  updateDotnav();
}

/* ---------- Formulario ---------- */
/* El formulario abre WhatsApp con el mensaje ya escrito.
   La web es estática (no hay servidor que reciba nada), así que este es el
   único camino por el que el mensaje llega de verdad a la clínica.
   Antes se mostraba un "hemos recibido tu mensaje" y el envío se perdía. */
const form = document.getElementById('contactForm');
if (form) {
  const formNote = document.getElementById('formNote');

  /* El número lo manda el panel de administración: contenido.js reescribe todos
     los enlaces wa.me al cargar la página. Lo leemos de ahí en vez de fijarlo,
     para que cambiar el número en el panel lo cambie TAMBIÉN en el formulario.
     El valor de reserva solo actúa si no hubiera ningún enlace en la página. */
  function esc(t) {
    const d = document.createElement('div');
    d.textContent = t == null ? '' : t;
    return d.innerHTML;
  }

  function numeroWhatsApp() {
    const enlace = document.querySelector('a[href*="wa.me/"]');
    const m = enlace && enlace.getAttribute('href').match(/wa\.me\/(\d{8,15})/);
    return (m && m[1]) || '573052088204';
  }
  const PERFILES = {
    paciente: 'Paciente',
    medico: 'Profesional de la salud (referido)',
    otro: 'Otro'
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = form.nombre.value.trim(), email = form.email.value.trim();
    const telefono = form.telefono.value.trim();
    const perfil = form.perfil.value, mensaje = form.mensaje.value.trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!nombre || !emailOk || !perfil || !mensaje) {
      formNote.textContent = 'Por favor completa los campos requeridos con datos válidos.';
      formNote.classList.add('error');
      return;
    }
    formNote.classList.remove('error');

    // Si la visita llegó desde el anuncio de Google, el formulario saluda igual que los botones
    // (marca y texto: ver MSG_ANUNCIO en el bloque de medición, más abajo).
    let deGoogle = false, temaGoogle = 'venas';
    try {
      deGoogle = sessionStorage.getItem('seravena_anuncio') === '1';
      temaGoogle = sessionStorage.getItem('seravena_anuncio_tema') || 'venas';
    } catch (err) {}
    const texto =
      (deGoogle ? 'Hola Seravena, vengo de Google (' + temaGoogle + ') y quiero agendar una valoración.\n\n'
                : 'Hola Seravena, vengo de la página web y quiero agendar una cita.\n\n') +
      'Nombre: ' + nombre + '\n' +
      'Correo: ' + email + '\n' +
      (telefono ? 'Teléfono: ' + telefono + '\n' : '') +
      'Soy: ' + (PERFILES[perfil] || perfil) + '\n\n' +
      mensaje;

    if (typeof window.gtag === 'function') {
      try {
        window.gtag('event', 'clic_whatsapp', { boton: 'Formulario de contacto', pagina: location.pathname });
        window.gtag('event', 'generate_lead', { metodo: 'formulario', pagina: location.pathname });
      } catch (err) {}
    }

    const url = 'https://wa.me/' + numeroWhatsApp() + '?text=' + encodeURIComponent(texto);
    const ventana = window.open(url, '_blank', 'noopener');

    /* Alternativa por correo: desde computador, WhatsApp abre su versión web y
       quien no la tenga configurada se quedaría a medias. Se le deja siempre un
       segundo camino con el mismo mensaje ya escrito. */
    const correo = 'mailto:info@clinicaseravena.com'
      + '?subject=' + encodeURIComponent('Consulta desde la web · ' + nombre)
      + '&body=' + encodeURIComponent(texto);

    if (ventana) {
      formNote.innerHTML = 'Listo, ' + esc(nombre.split(' ')[0]) +
        '. Se abrió WhatsApp con tu mensaje escrito: solo tienes que pulsar enviar.' +
        '<br><span class="form-note-alt">¿No se abrió o prefieres el correo? ' +
        '<a href="' + correo + '">Envíanoslo por correo</a>.</span>';
      form.reset();
    } else {
      // Si el navegador bloquea la ventana, no mentimos: damos los dos caminos.
      formNote.innerHTML = 'Tu navegador bloqueó la ventana. ' +
        '<a href="' + url + '" target="_blank" rel="noopener">Abre WhatsApp aquí</a> ' +
        'o <a href="' + correo + '">envíanoslo por correo</a>.';
    }
  });
}

if (!reduceMotion) updateParallax(window.scrollY);

/* ============================================================
   WHATSAPP CON CONTEXTO (ventas, nov-2026)
   ------------------------------------------------------------
   Antes casi todos los botones (y todos los artículos) escribían "vengo de la página web y quiero
   agendar una cita": quien responde el chat no sabía qué estaba mirando la persona. Ahora:
   1. Cada enlace a nuestro WhatsApp con ese mensaje genérico (o marcado data-wa="pagina") dice de
      qué página viene; en el blog, qué artículo leyó. Los mensajes que ya eran específicos
      (precios, obesidad, test, Instagram, referir paciente…) no se tocan.
   2. "Agendar cita" del menú y los enlaces marcados data-wa-directo abren WhatsApp directo;
      si el JavaScript falla siguen llevando al formulario de /contacto, como antes.
   3. Las páginas de servicio de SV_BARRA_EN tienen en celular la misma barra fija "Llamar / WhatsApp"
      que ya usan las páginas de pauta (.lp-sticky).
   El número no se fija aquí: contenido.js reescribe después todos los wa.me con el del panel.
   Para una página nueva de servicio: añádela a SV_PAGINAS (y a SV_BARRA_EN si debe llevar barra).
   ============================================================ */
const SV_PAGINAS = {
  'index': 'su página web',
  'lipedema': 'la página de lipedema',
  'clinica-lipedema-medellin': 'la página de la clínica de lipedema',
  'lipedema-colombia': 'la página de lipedema en Colombia',
  'test-lipedema': 'la página del test de lipedema',
  'vascular': 'la página de salud vascular',
  'varices-medellin': 'la página de várices',
  'insuficiencia-venosa': 'la página de insuficiencia venosa',
  'escleroterapia-medellin': 'la página de escleroterapia',
  'eco-doppler-venoso-medellin': 'la página de eco doppler venoso',
  'obesidad-medellin': 'la página del programa para bajar de peso',
  'precios': 'la página de precios',
  'precio-lipedema-medellin': 'la página del precio del tratamiento de lipedema',
  'proceso': 'la página de cómo es el proceso',
  'preguntas': 'la página de preguntas frecuentes',
  'sobre': 'la página sobre Seravena',
  'dr-jose-david-puerta-rojas': 'la página del Dr. José David Puerta',
  'profesionales': 'la página para profesionales',
  'guia-lipedema-medicos': 'la guía de lipedema para médicos',
  'contacto': 'la página de contacto'
};
const SV_BARRA_EN = ['lipedema', 'vascular', 'varices-medellin', 'escleroterapia-medellin', 'eco-doppler-venoso-medellin'];
const svArchivo = (location.pathname.replace(/\/+$/, '').split('/').pop() || 'index').replace(/\.html$/, '') || 'index';
const svEnBlog = /\/blog(\/|$)/.test(location.pathname);
const svArticulo = svEnBlog ? document.querySelector('article.post') : null;
// Páginas privadas o de trabajo: aquí no se cambia nada.
const svPrivada = /^(cotizador|aliados|alianza-cali|alianza-cali-plan|resena)$/.test(svArchivo) || /\/(equipo|admin)\//.test(location.pathname);

/* Tema del artículo: lo trae <article data-tema> (lo pone _agente-blog/llamados-venta.py).
   Si un artículo no lo trae, se deduce igual que allá: por dirección y categoría. */
function svTema() {
  if (!svArticulo) return '';
  const t = svArticulo.getAttribute('data-tema');
  if (t) return t;
  const cat = (svArticulo.querySelector('.post-head .blog-tag')?.textContent || '').toLowerCase();
  if (svArchivo.indexOf('lipedema') > -1 || cat.indexOf('lipedema') > -1) return 'lipedema';
  if (/obesidad|bajar-de-peso|sobrepeso|adelgaz/.test(svArchivo) || /obesidad|peso/.test(cat)) return 'peso';
  return 'venas';
}
function svMensajePagina() {
  if (svArticulo) {
    const titulo = (svArticulo.querySelector('.post-head h1')?.textContent || '').replace(/\s+/g, ' ').trim();
    const leyo = titulo ? 'leí «' + titulo + '»' : 'estoy leyendo el blog';
    const cola = { lipedema: 'quiero agendar mi valoración de lipedema', venas: 'quiero agendar mi valoración vascular',
      peso: 'quiero información del programa para bajar de peso', medicos: 'quiero referir una paciente' }[svTema()] || 'quiero agendar mi valoración';
    return 'Hola Seravena, ' + leyo + ' y ' + cola;
  }
  if (svEnBlog) return 'Hola Seravena, estoy viendo el blog y quiero agendar mi valoración';
  return 'Hola Seravena, estoy viendo ' + (SV_PAGINAS[svArchivo] || SV_PAGINAS.index) + ' y quiero agendar mi valoración';
}
function svNumeroWa() {
  const enlace = document.querySelector('a[href*="wa.me/"]');
  const m = enlace && (enlace.getAttribute('href') || '').match(/wa\.me\/(\d{8,15})/);
  return (m && m[1]) || '573052088204';
}
function svTextoWa(a) {
  const m = (a.getAttribute('href') || '').match(/[?&]text=([^&]*)/);
  try { return m ? decodeURIComponent(m[1].replace(/\+/g, ' ')) : ''; } catch (e) { return ''; }
}
function svPonTextoWa(a, texto) {
  const h = a.getAttribute('href') || '', t = 'text=' + encodeURIComponent(texto);
  a.setAttribute('href', /[?&]text=/.test(h) ? h.replace(/([?&])text=[^&]*/, '$1' + t) : h + (h.indexOf('?') > -1 ? '&' : '?') + t);
}
const SV_GENERICO = /^Hola Seravena, vengo (de la página web|del blog) y quiero agendar una (cita|valoración)\.?$/i;
/* Un enlace a nuestro WhatsApp con el mensaje genérico pasa a decir de qué página viene.
   Se llama al cargar y otra vez en el clic (por si el enlace se armó después, como la tarjeta del blog). */
function svContextoWa(a) {
  if (svPrivada || !a || !/wa\.me\/\d/.test(a.getAttribute('href') || '')) return;
  if (a.hasAttribute('data-test-wa')) return;                       // los del test llevan su propio mensaje
  if (a.getAttribute('data-wa') === 'pagina' || SV_GENERICO.test(svTextoWa(a))) svPonTextoWa(a, svMensajePagina());
}
if (!svPrivada) {
  // 2. Menú y portada: directo a WhatsApp (el formulario sigue en /contacto y en el pie de página)
  $$('a.nav-cta, a[data-wa-directo]').forEach(a => {
    if (!/(^|\/)contacto(\.html)?$/.test(a.getAttribute('href') || '')) return;
    a.setAttribute('href', 'https://wa.me/' + svNumeroWa() + '?text=' + encodeURIComponent(svMensajePagina()));
    a.setAttribute('target', '_blank'); a.setAttribute('rel', 'noopener');
  });
  // 1. Mensaje con contexto en todos los enlaces genéricos
  $$('a[href*="wa.me/"]').forEach(svContextoWa);
  // 3. Barra fija "Llamar / WhatsApp" en celular (mismo componente .lp-sticky de las páginas de pauta).
  //    Los estilos van aquí para que la barra nunca aparezca sin ellos por caché (igual que la del blog).
  if (!svEnBlog && SV_BARRA_EN.indexOf(svArchivo) > -1 && !document.querySelector('.lp-sticky')) {
    const css = document.createElement('style');
    css.textContent =
      '.btn-wa{background:#25D366;color:#0b3d24;border:none}.btn-wa:hover{background:#1fbe5a;color:#0b3d24}' +
      '.lp-sticky{position:fixed;left:0;right:0;bottom:0;z-index:70;display:none;gap:10px;padding:10px 12px calc(10px + env(safe-area-inset-bottom));' +
        'background:rgba(249,249,248,.96);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border-top:1px solid rgba(75,65,45,.12)}' +
      '.lp-sticky .btn{flex:1;padding:14px 8px;font-size:.98rem;text-align:center;justify-content:center;display:flex;align-items:center;gap:8px}' +
      '.lp-sticky .btn-ghost{color:var(--chocolate);border:1px solid rgba(75,65,45,.28);background:transparent}' +
      '@media(max-width:760px){.lp-sticky{display:flex}body{padding-bottom:76px}.wa-float{display:none}}';
    document.head.appendChild(css);
    const barra = document.createElement('div');
    barra.className = 'lp-sticky';
    barra.innerHTML =
      '<a href="tel:+573052088204" class="btn btn-ghost" data-c="barra_llamar">Llamar</a>' +
      '<a href="https://wa.me/' + svNumeroWa() + '?text=' + encodeURIComponent(svMensajePagina()) + '" target="_blank" rel="noopener" class="btn btn-wa" data-c="barra_whatsapp">WhatsApp</a>';
    document.body.appendChild(barra);   // al final del body: no mueve las claves por posición de contenido.js
  }
}

/* ============================================================
   MICROSOFT CLARITY — mapas de calor y grabaciones (toda la web)
   ------------------------------------------------------------
   Proyecto "Seravena" en clarity.microsoft.com (gratis, sin límite).
   Carga en todas las páginas públicas porque todas incluyen este
   archivo; el panel /admin y el dashboard /equipo NO lo incluyen, así
   que quedan fuera a propósito. Clarity enmascara por defecto todo lo
   que la gente escribe en formularios. Con CLARITY_ID vacío no carga
   nada. Los clics a WhatsApp/llamar/correo se marcan también en Clarity
   (ver track() más abajo) para filtrar grabaciones por acción.
   ============================================================ */
var CLARITY_ID = 'yjrylwviw2';
// En vista previa local (localhost / archivo) no se graba: ensuciaría los datos reales.
var ES_LOCAL = /^(localhost|127\.|0\.0\.0\.0|\[::1\])/.test(location.hostname) || location.protocol === 'file:';
if (CLARITY_ID && !ES_LOCAL) {
  (function (c, l, a, r, i, t, y) {
    c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
    t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i;
    y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
  })(window, document, 'clarity', 'script', CLARITY_ID);
}

/* ============================================================
   Medición de clics y conversiones (Google Analytics GA4 + Ads)
   - clic_whatsapp / clic_llamar / clic_correo: eventos descriptivos.
   - generate_lead: señal estándar de "contacto/lead" que Google Ads
     puede usar como conversión para optimizar la pauta.
   - interes_alto: la persona llegó al bloque final (alta intención).
   ============================================================ */
(function () {
  // Etiqueta de la acción de conversión en Google Ads (cuenta AW-18314027421).
  // Vacía = no se envía conversión a Ads (los eventos GA4 sí se envían siempre).
  var ADS_CONVERSION = 'JdAhCKWLhOkcEJ3D55xE';
  function track(name, params) {
    // Marca el evento en Clarity (si está activo) para filtrar grabaciones por acción.
    if (typeof window.clarity === 'function') {
      try { window.clarity('event', name); window.clarity('set', 'accion', name); } catch (e) {}
    }
    if (typeof window.gtag !== 'function') return;
    try { window.gtag('event', name, params || {}); } catch (e) {}
  }
  function trackAdsConversion() {
    if (!ADS_CONVERSION || typeof window.gtag !== 'function') return;
    try { window.gtag('event', 'conversion', { send_to: 'AW-18314027421/' + ADS_CONVERSION }); } catch (e) {}
  }
  // Quien llega desde el anuncio de Google (la URL trae gclid/gbraid/wbraid/gad_source) escribe a
  // WhatsApp con un saludo propio, para que el equipo pueda contar cuántos chats vienen de la pauta.
  // Se recuerda durante la visita aunque la persona pase a otras páginas de la web. El texto cambia
  // al cargar y otra vez en el clic (por si un enlace se arma o se cambia después). El número no se toca.
  // Solo los enlaces de agendar a nuestro número: "referir un paciente", "sugerir un recurso" y el
  // botón de compartir el test (wa.me sin número) se quedan como están. Sin la marca, nada cambia.
  // Tema del anuncio: lo marca la campaña con ?tema=lipedema (sufijo de URL final en Google Ads).
  // Si no viene, se deduce de la página donde aterrizó el clic ("lipedema" en la dirección → lipedema).
  // Todo lo demás sigue siendo "venas". Se guarda en la visita: si pasa a otras páginas, el saludo no cambia.
  var deAnuncio = /[?&](gclid|gbraid|wbraid|gad_source)=/.test(location.search);
  var TEMA_ANUNCIO = 'venas';
  if (deAnuncio) {
    var temaUrl = ((location.search.match(/[?&]tema=([a-z]+)/i) || [])[1] || '').toLowerCase();
    TEMA_ANUNCIO = (temaUrl === 'lipedema' || temaUrl === 'venas') ? temaUrl
                 : (/lipedema/i.test(location.pathname) ? 'lipedema' : 'venas');
  }
  try {
    if (deAnuncio) {
      sessionStorage.setItem('seravena_anuncio', '1');
      sessionStorage.setItem('seravena_anuncio_tema', TEMA_ANUNCIO);
    }
    deAnuncio = deAnuncio || sessionStorage.getItem('seravena_anuncio') === '1';
    TEMA_ANUNCIO = sessionStorage.getItem('seravena_anuncio_tema') || TEMA_ANUNCIO;
  } catch (e) {}
  var MSG_ANUNCIO = 'Hola Seravena, vengo de Google (' + TEMA_ANUNCIO + ') y quiero agendar una valoración';
  function saludoAnuncio(a) {
    var h = a.getAttribute('href') || '';
    if (!/wa\.me\/\d/.test(h)) return;
    var m = h.match(/[?&]text=([^&]*)/), actual = '';
    try { actual = m ? decodeURIComponent(m[1].replace(/\+/g, ' ')) : ''; } catch (e) {}
    if (m && actual.indexOf('agendar') < 0) return;
    // Si la persona hizo el test, su resultado va después del saludo del anuncio (data-wa-extra)
    var extra = a.getAttribute('data-wa-extra');
    var txt = 'text=' + encodeURIComponent(MSG_ANUNCIO + (extra ? '. ' + extra : ''));
    a.setAttribute('href', m ? h.replace(/([?&])text=[^&]*/, '$1' + txt) : h + (h.indexOf('?') > -1 ? '&' : '?') + txt);
  }
  if (deAnuncio) {
    var saludoEnTodos = function () { document.querySelectorAll('a[href*="wa.me/"]').forEach(saludoAnuncio); };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', saludoEnTodos);
    else saludoEnTodos();
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a') : null;
    if (!a) return;
    var href = (a.getAttribute('href') || '').toLowerCase();
    var label = (a.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 60);
    if (href.indexOf('wa.me') > -1 || href.indexOf('api.whatsapp') > -1) {
      svContextoWa(a);                 // mensaje con la página o el artículo (si era el genérico)
      if (deAnuncio) saludoAnuncio(a);
      track('clic_whatsapp', { boton: label, pagina: location.pathname });
      track('generate_lead', { metodo: 'whatsapp', pagina: location.pathname });
      trackAdsConversion();
    } else if (href.indexOf('tel:') === 0) {
      track('clic_llamar', { pagina: location.pathname });
      track('generate_lead', { metodo: 'llamada', pagina: location.pathname });
      trackAdsConversion();
    } else if (href.indexOf('mailto:') === 0) {
      track('clic_correo', { pagina: location.pathname });
    }
  }, true);

  /* Test de lipedema (los cuatro: inicio, /lipedema, /test-lipedema y el artículo del blog).
     Cuando la persona termina, el resultado viaja en el mensaje de WhatsApp de los enlaces marcados
     data-test-wa ("agendar" o "guia") y se mide el evento test_terminado con el nivel, igual que
     clic_whatsapp (GA4 + Clarity). r = { nivel: 'baja'|'moderada'|'alta', si, total,
     etiqueta: 'probabilidad alta' (solo el test largo), senales: [...], medir: false para no medir }. */
  window.svTestResultado = function (r) {
    if (!r) return;
    var resumen = 'Hice el test de lipedema en la web: ' +
      (r.etiqueta ? 'me salió ' + r.etiqueta + ', ' : '') + 'marqué ' + r.si + ' de ' + r.total + ' señales';
    var lista = (r.senales && r.senales.length) ? ' (' + r.senales.join(', ').toLowerCase() + ')' : '';
    var num = svNumeroWa();
    document.querySelectorAll('a[data-test-wa]').forEach(function (a) {
      var guia = a.getAttribute('data-test-wa') === 'guia';
      var texto = guia ? 'Hola Seravena. ' + resumen + lista + '. ¿Me envían mi resultado por WhatsApp?'
                       : 'Hola Seravena. ' + resumen + '. Quiero agendar mi valoración';
      a.setAttribute('href', 'https://wa.me/' + num + '?text=' + encodeURIComponent(texto));
      a.setAttribute('target', '_blank'); a.setAttribute('rel', 'noopener');
      if (!guia) a.setAttribute('data-wa-extra', resumen);
    });
    if (r.medir !== false) track('test_terminado', { nivel: r.nivel, senales: r.si, de: r.total, pagina: location.pathname });
  };

  // Interés alto: la persona llegó al bloque final de contacto (una sola vez por visita)
  try {
    var target = document.querySelector('section.cta, .lp-rupture, .contact-page');
    if (target && 'IntersectionObserver' in window) {
      var fired = false;
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting && !fired) {
            fired = true;
            track('interes_alto', { pagina: location.pathname });
            io.disconnect();
          }
        });
      }, { threshold: 0.5 });
      io.observe(target);
    }
  } catch (e) {}
})();

/* Home: los 3 artículos más recientes del blog (se actualiza solo cuando el agente publica) */
const homeBlog = document.getElementById('homeBlog');
if (homeBlog && window.fetch) {
  fetch('blog/', { cache: 'no-cache' }).then(r => r.ok ? r.text() : '').then(html => {
    if (!html) return;
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const cards = [...doc.querySelectorAll('#blogGrid .blog-card')].slice(0, 3);
    if (cards.length < 3) return;
    homeBlog.innerHTML = cards.map(c => {
      const href = 'blog/' + c.getAttribute('href');
      const img = (c.querySelector('img')?.getAttribute('src') || '').replace(/^\.\.\//, '');
      const tag = c.querySelector('.blog-tag')?.textContent || '';
      const t = c.querySelector('h3')?.textContent || '';
      return `<a class="h-post reveal in" href="${href}"><div class="h-post-media"><img loading="lazy" decoding="async" src="${img}" alt=""></div><span class="h-post-tag">${tag}</span><h3>${t}</h3></a>`;
    }).join('');
  }).catch(() => {});
}

/* Home: al bajar, el título del banner sube y se desvanece más rápido que la foto */
const hl = document.querySelector('.hero-luz');
if (hl && !reduceMotion) {
  const hlInner = hl.querySelector('.hl-inner'), hlImg = hl.querySelector('.hl-media img');
  let hlListo = false;   // esperamos a que termine la entrada (telón + zoom) para no pelear con ella
  hlImg.addEventListener('transitionend', e => { if (e.propertyName === 'transform' && !hlListo) { hlListo = true; hlImg.style.transition = 'none'; hlInner.style.transition = 'none'; hlScroll(); } });
  const hlScroll = () => {
    const y = Math.min(window.scrollY, window.innerHeight);
    if (!hlListo) return;
    hlInner.style.transform = `translateY(${(-y * 0.35).toFixed(1)}px)`;
    hlInner.style.opacity = (1 - y / (window.innerHeight * 0.7)).toFixed(3);
    hlImg.style.transform = `scale(${(1 + y / window.innerHeight * 0.08).toFixed(4)}) translateY(${(y * 0.12).toFixed(1)}px)`;
  };
  window.addEventListener('scroll', () => requestAnimationFrame(hlScroll), { passive: true });
}

/* Blog y artículos en celular: barra fija abajo con el siguiente paso según el tema + WhatsApp.
   Lipedema (y el listado): "¿Tengo lipedema?" · venas: "Ver precios de várices" · peso: el programa ·
   artículos para médicos: la guía. El tema sale de <article data-tema> (ver svTema).
   Casi todo el tráfico del blog viene de Instagram en celular y se va tras ver una sola página
   (Clarity, sep-2026): así el siguiente paso queda siempre a la vista. Reemplaza el botón redondo.
   Los estilos van aquí mismo para que la barra nunca aparezca sin ellos por caché. */
(function () {
  if (!/\/blog\//.test(location.pathname)) return;
  var css = document.createElement('style');
  css.textContent =
    '.blog-bar{display:none}' +
    '@media (max-width:760px){' +
      '.blog-bar{position:fixed;left:0;right:0;bottom:0;z-index:900;display:flex;gap:8px;' +
        'padding:10px 12px calc(10px + env(safe-area-inset-bottom));background:rgba(249,249,248,.96);' +
        '-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border-top:1px solid rgba(75,65,45,.12);' +
        'transform:translateY(0);transition:transform .35s cubic-bezier(0.16,1,0.3,1)}' +
      '.blog-bar a{flex:1;display:flex;align-items:center;justify-content:center;gap:7px;padding:13px 8px;border-radius:999px;' +
        'font-weight:600;font-size:.92rem;text-decoration:none;line-height:1.2;text-align:center}' +
      '.blog-bar .bb-test{border:1.5px solid #4B412D;color:#4B412D;background:transparent}' +
      '.blog-bar .bb-wa{background:#4B412D;color:#fff;flex:1.25}' +
      '.blog-bar .bb-wa svg{width:18px;height:18px;fill:currentColor;flex:none}' +
      'body.has-blog-bar{padding-bottom:76px}' +
      'body.has-blog-bar .wa-float{display:none}' +
      'body.menu-abierto .blog-bar{transform:translateY(110%)}' +
    '}';
  document.head.appendChild(css);
  var bar = document.createElement('div');
  bar.className = 'blog-bar';
  var paso = {
    venas: ['../precios', 'Ver precios de várices', 'Agendar valoración'],
    peso: ['../obesidad-medellin', 'Ver el programa', 'Pedir información'],
    medicos: ['../guia-lipedema-medicos', 'Guía para médicos', 'Referir paciente']
  }[svTema()] || ['como-saber-si-tengo-lipedema#test', '¿Tengo lipedema?', 'Agendar valoración'];
  bar.innerHTML =
    '<a class="bb-test" href="' + paso[0] + '">' + paso[1] + '</a>' +
    '<a class="bb-wa" target="_blank" rel="noopener" href="https://wa.me/' + svNumeroWa() + '?text=' + encodeURIComponent(svMensajePagina()) + '">' +
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>' +
      paso[2] + '</a>';
  document.body.appendChild(bar);
  document.body.classList.add('has-blog-bar');
  // Con el menú abierto la barra se esconde para no tapar los enlaces
  var t = document.getElementById('navToggle');
  if (t) t.addEventListener('click', function () {
    setTimeout(function () { document.body.classList.toggle('menu-abierto', t.classList.contains('open')); }, 0);
  });
})();

/* Inicio: banner con movimiento (.hero-mov) — video de las manos, conteo del sello y parallax del nombre */
(function () {
  var hero = document.querySelector('.hero-mov');
  if (!hero) return;
  var v = hero.querySelector('.hm-video');
  var con = navigator.connection || {};
  var ahorro = con.saveData === true || ['slow-2g', '2g'].indexOf(con.effectiveType) > -1;
  // En celular también hay movimiento, pero con un video liviano. Con ahorro de datos o "menos movimiento" se queda la foto.
  var movil = window.matchMedia('(max-width: 767px)').matches;
  if (v && movil && v.dataset.posterMovil) v.poster = v.dataset.posterMovil;   // foto vertical, igual al primer cuadro del video
  if (v && !ahorro && !reduceMotion) {
    v.autoplay = true; v.muted = true;
    v.src = (movil && v.dataset.srcMovil) ? v.dataset.srcMovil : v.dataset.src;
    var arranca = function () { if (v.paused) v.play().catch(function () {}); };
    ['loadeddata', 'canplay', 'canplaythrough'].forEach(function (ev) { v.addEventListener(ev, arranca); });
    // si el navegador lo pausó (pestaña en segundo plano, ahorro de batería), retoma al volver o al tocar
    document.addEventListener('visibilitychange', function () { if (!document.hidden) arranca(); });
    ['touchstart', 'scroll'].forEach(function (ev) { window.addEventListener(ev, arranca, { once: true, passive: true }); });
    v.load();
  }
  // Banner de fotos de la sede: la primera carga con prioridad; las otras 3 se piden cuando la página
  // termina de cargar (o a los 3 s, lo que pase primero) para no quitarle velocidad a la primera.
  // La rotación (CSS) no cambia. Con "menos movimiento" solo se ve la primera, así que no se piden.
  var resto = hero.querySelectorAll('.hm-slide[data-src]');
  if (resto.length && !reduceMotion) {
    var cargadas = false;
    var cargaResto = function () {
      if (cargadas) return; cargadas = true;
      Array.prototype.forEach.call(resto, function (img) {
        if (!img.dataset.src || (img.getAttribute('src') || '').indexOf('data:') !== 0) return; // ya la cambió el CMS
        img.setAttribute('fetchpriority', 'low'); // no compiten con lo que aún esté cargando
        if (img.dataset.srcset) img.srcset = img.dataset.srcset;
        img.src = img.dataset.src;
        img.removeAttribute('data-src'); img.removeAttribute('data-srcset');
      });
    };
    if (document.readyState === 'complete') cargaResto();
    else window.addEventListener('load', cargaResto);
    setTimeout(cargaResto, 3000);
  }
  // Sello: la nota sube de 0,0 a 4,9 cuando arranca la entrada. En el HTML va la cifra real (4,9),
  // para buscadores y lectores sin JavaScript; aquí se pone en 0,0 antes de que el sello aparezca y se anima.
  var num = hero.querySelector('.hm-badge-num');
  if (num) {
    var hasta = parseFloat(num.dataset.hasta) || 0;
    var pinta = function (x) { num.textContent = x.toFixed(1).replace('.', ','); };
    if (reduceMotion) pinta(hasta);
    else { pinta(0); setTimeout(function () {
      var t0 = null;
      (function paso(t) {
        if (!t0) t0 = t;
        var k = Math.min(1, (t - t0) / 2000), e = 1 - Math.pow(1 - k, 3);
        pinta(hasta * e);
        if (k < 1) requestAnimationFrame(paso);
      })(performance.now());
    }, 1900); }
  }
  // Círculos de "ruido": cientos de puntitos granulados a lo largo de cada círculo, con leve
  // desorden (como grano de película). Aparecen en orden, como si se dibujaran, y algunos titilan.
  var ruido = hero.querySelector('.hm-noise');
  if (ruido) {
    var NS = 'http://www.w3.org/2000/svg', frag = document.createDocumentFragment();
    ruido.dataset.circulos.split(';').forEach(function (c, ci) {
      var p = c.split(',').map(Number), cx = p[0], cy = p[1], r = p[2];
      var n = Math.round(2 * Math.PI * r / 3.2), giro = Math.random() * Math.PI * 2;
      for (var i = 0; i < n; i++) {
        var a = giro + i / n * Math.PI * 2;
        var rr = r + (Math.random() + Math.random() - 1) * 5;           // se abre y cierra un poco: trazo "vivo"
        var d = document.createElementNS(NS, 'circle');
        d.setAttribute('cx', (cx + Math.cos(a) * rr + (Math.random() * 2 - 1)).toFixed(1));
        d.setAttribute('cy', (cy + Math.sin(a) * rr + (Math.random() * 2 - 1)).toFixed(1));
        d.setAttribute('r', (0.7 + Math.random() * 1.3).toFixed(2));
        d.setAttribute('class', 'hm-n' + (Math.random() < 0.28 ? ' tw' : ''));
        d.style.setProperty('--o', (0.125 + Math.random() * 0.3).toFixed(3));   // a la mitad de opacidad (pedido de Laura 25-sep)
        d.style.setProperty('--d', (0.4 + ci * 0.35 + i / n * 2.6).toFixed(2) + 's');
        d.style.setProperty('--t', (1.6 + Math.random() * 3).toFixed(2) + 's');
        frag.appendChild(d);
      }
    });
    ruido.appendChild(frag);
    // un cuadro después, para que la aparición sí se anime
    requestAnimationFrame(function () { requestAnimationFrame(function () { ruido.classList.add('on'); }); });
  }
  // Al bajar, el texto sube más rápido que el fondo y se desvanece
  var inner = hero.querySelector('.hm-inner');
  if (!reduceMotion) window.addEventListener('scroll', function () {
    requestAnimationFrame(function () {
      var y = Math.min(window.scrollY, window.innerHeight);
      if (inner) { inner.style.transform = 'translateY(' + (-y * 0.2).toFixed(1) + 'px)'; inner.style.opacity = (1 - y / (window.innerHeight * 0.8)).toFixed(3); }
    });
  }, { passive: true });
})();
