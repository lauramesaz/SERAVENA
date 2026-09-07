# Bitácora del estratega de innovación

Una línea por semana: qué se propuso y en qué se basó.
Las propuestas vivas están en `../admin/propuestas.json` y se leen en
`clinicaseravena.com/admin/ideas.html`.

---

- **2026-08-20 · Tanda inicial (6 propuestas).** Redactadas a mano por Claude a partir de la
  auditoría del 19-20 de agosto, para que el panel no arranque vacío. Base: el diagnóstico de
  Search Console del 6 de agosto (2 de 11 páginas indexadas, falta de autoridad de dominio),
  la ausencia de Perfil de Empresa en Google, la ausencia de una página de equipo médico con
  nombres reales, y el recuento de palabras de las páginas de servicio. A partir de la semana
  que viene las genera el agente 7 según su manual.
- **2026-08-24 · 2 propuestas nuevas (W35-1, W35-2).** Búsqueda web hoy de las 5 consultas
  objetivo ('várices Medellín', 'flebólogo Medellín', 'eco doppler venoso Medellín',
  'escleroterapia Medellín', 'insuficiencia venosa Medellín'): Seravena no aparece en ninguna;
  dominan directorios (Doctoralia, Top Doctors) y clínicas competidoras (Franco Vascular,
  VARICLINIC, Flebosalud, Cardiovas IPS, entre otras). Revisando el propio código fuente del
  sitio encontré dos huecos concretos y verificables: (1) `insuficiencia-venosa.html` — la
  página construida para 'insuficiencia venosa Medellín' — no tiene 'Medellín' ni en el
  `<title>`, ni en el H1, ni en la meta description (solo 3 menciones técnicas de Medellín en
  todo el archivo, frente a 10 en `vascular.html` y `lipedema.html`); (2) la palabra 'flebólogo'
  —una de las 5 búsquedas objetivo— aparece una sola vez en todo el sitio y nunca en un título,
  H1 o meta description. Las 6 propuestas del 20-ago siguen en `propuesta` (4 días, no caducan
  todavía). Aviso a Laura: nota en GitHub con etiqueta `propuestas`.
- **2026-08-31 · 2 propuestas nuevas (W36-1, W36-2).** Repetí las 5 búsquedas objetivo: Seravena
  sigue sin aparecer en ninguna; misma competencia dominante que el 24-ago (Doctoralia, Top
  Doctors, Franco Vascular, Flebosalud, Cardiovas IPS) más otras nuevas vistas hoy (Vasculab, CF
  Medicina, Clínica Bedharma, y un sitio dedicado solo a "eco doppler venoso Medellín":
  dopplervenosomedellin.com). Las dos propuestas de la semana pasada (W35-1 y W35-2) ya están
  `hecha` desde el 27-ago. Revisando hoy el código fuente encontré dos huecos nuevos y
  verificables, ninguno repetido con las 6 propuestas del 20-ago que siguen en `propuesta` (11
  días, no caducan todavía): (1) ninguna de las 8 páginas del sitio raíz menciona un horario de
  atención — ni en el texto visible ni en el JSON-LD `MedicalClinic`, que no tiene el campo
  `openingHours` en ningún sitio — y `contacto.html` no tiene mapa embebido; (2) ninguna de las
  páginas de la competencia revisadas hoy ofrece una autoevaluación interactiva de síntomas,
  formato que el propio manual señala como no probado. Aviso a Laura: nota en GitHub con
  etiqueta `propuestas`.
- **2026-09-07 · 2 propuestas nuevas (W37-1, W37-2).** Repetí las 5 búsquedas objetivo: Seravena
  sigue sin aparecer en ninguna; misma competencia dominante que semanas anteriores (Doctoralia,
  Top Doctors, Franco Vascular, Flebosalud, Cardiovas IPS) más otras vistas hoy por primera vez
  (Vasculab, Centrolab, CFMEDICINA, Centro de Medicina Integrativa, dopplervenosomedellin.com,
  y AgendaPro Colombia como plataforma de reservas con página propia para 'escleroterapia
  Medellín'). Las propuestas del 20-ago (W34, 6) y del 31-ago (W36-1, W36-2) siguen en
  `propuesta`: ninguna lleva más de un mes, así que no marqué caducada ninguna. Antes de proponer
  comprobé que la 'Autoevaluación' que ya existe en `index.html` y `lipedema.html` es solo sobre
  lipedema, no sobre insuficiencia venosa/várices — así que W36-2 (autoevaluación venosa) sigue
  siendo un hueco real, no una propuesta ya cumplida por otro cambio. Revisando hoy el código
  encontré dos huecos nuevos y verificables, ninguno repetido: (1) de las 8 páginas raíz,
  `insuficiencia-venosa.html` es la única cuyo `<link rel="canonical">`, el `"url"` de su JSON-LD
  y su entrada en `sitemap.xml` apuntan a `/insuficiencia-venosa` sin extensión — y 3 enlaces
  internos del blog repiten el mismo error —, mientras el archivo real es `insuficiencia-venosa.html`;
  sin `_config.yml`, `.nojekyll` ni redirect en el repositorio, esa URL probablemente da 404 en
  GitHub Pages, justo en la página que se optimizó el 24-ago para 'insuficiencia venosa Medellín'.
  No pude confirmar el 404 en vivo (mismo bloqueo de red hacia clinicaseravena.com que ya
  registró el analista semanas anteriores), lo dejé anotado en la propuesta; (2) de las 8 páginas
  raíz, solo `insuficiencia-venosa.html` tiene enlaces `tel:+573052088204` — ni siquiera
  `contacto.html`, la página hecha para que te contacten, tiene botón de llamada directa, solo
  WhatsApp y correo. Aviso a Laura: nota en GitHub con etiqueta `propuestas`.
