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
function isInternalLink(a) {
  const href = a.getAttribute('href') || '';
  if (a.target === '_blank' || a.hasAttribute('download')) return false;
  if (/^(mailto:|tel:|https?:\/\/|#)/.test(href)) return false;
  return /\.html(\?.*)?$/.test(href) || href === '' || href === './';
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
    setTimeout(() => preloader.classList.add('done'), 1500);
    setTimeout(() => $('.hero-title')?.classList.add('in'), 1600);
  });
} else {
  $('.hero-title')?.classList.add('in');
}

/* ---------- Videos (hero + bandas, con cámara lenta y lazy) ---------- */
function setupVideo(v) {
  const rate = parseFloat(v.dataset.rate) || 1;
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
function onScroll() {
  const scrollTop = window.scrollY;
  if (progress) {
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (scrollTop / docH * 100) + '%';
  }
  if (navbar) navbar.classList.toggle('scrolled', scrollTop > 60);
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
  if (siblings.length > 1 && el.classList.contains('reveal')) el.dataset.delay = siblings.indexOf(el) * 90;
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
window.addEventListener('load', () => setTimeout(revealInView, 250));
window.addEventListener('scroll', () => requestAnimationFrame(revealInView), { passive: true });

/* ---------- Inclinación 3D + brillo en imágenes ---------- */
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && !reduceMotion) {
  $$('.media-frame, .area-card').forEach(frame => {
    const max = frame.classList.contains('area-card') ? 4 : 6;
    frame.addEventListener('mousemove', e => {
      const r = frame.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      frame.style.transform = `perspective(900px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg)`;
    });
    frame.addEventListener('mouseleave', () => { frame.style.transform = ''; });
  });
}

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
    document.body.style.overflow = open ? 'hidden' : '';
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open'); navToggle.classList.remove('open'); document.body.style.overflow = '';
  }));
}

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
  }
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

/* ---------- Hero reactivo al mouse ---------- */
const heroEl = document.querySelector('.hero');
const heroInner = document.querySelector('.hero .hero-inner');
if (heroEl && heroInner && window.matchMedia('(hover: hover) and (pointer: fine)').matches && !reduceMotion) {
  heroEl.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth - 0.5);
    const y = (e.clientY / window.innerHeight - 0.5);
    heroInner.style.transform = `translate(${(x * 16).toFixed(1)}px, ${(y * 10).toFixed(1)}px)`;
  });
  heroEl.addEventListener('mouseleave', () => { heroInner.style.transform = ''; });
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
   {t:'Superficie lisa',d:'La grasa aumenta de forma pareja. La piel se ve normal, aunque ya hay desproporción.'},
   {t:'Aparecen nódulos',d:'Se palpan bolitas de grasa y la superficie se vuelve irregular, tipo colchón.'},
   {t:'Lóbulos grandes',d:'Se forman acumulaciones que deforman el contorno y la piel se endurece.'},
   {t:'Lipo-linfedema',d:'Se suma retención de líquido (linfedema): aumentan el volumen y la pesadez.'}
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
const form = document.getElementById('contactForm');
if (form) {
  const formNote = document.getElementById('formNote');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = form.nombre.value.trim(), email = form.email.value.trim();
    const perfil = form.perfil.value, mensaje = form.mensaje.value.trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!nombre || !emailOk || !perfil || !mensaje) {
      formNote.textContent = 'Por favor completa los campos requeridos con datos válidos.';
      formNote.classList.add('error'); return;
    }
    formNote.classList.remove('error');
    formNote.textContent = '¡Gracias, ' + nombre.split(' ')[0] + '! Hemos recibido tu mensaje. Te contactaremos muy pronto.';
    form.reset();
  });
}

if (!reduceMotion) updateParallax(window.scrollY);
