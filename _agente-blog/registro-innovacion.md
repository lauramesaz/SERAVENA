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
- **2026-09-14 · 2 propuestas nuevas (W38-1, W38-2).** Repetí las 5 búsquedas objetivo: Seravena
  sigue sin aparecer en ninguna; misma competencia dominante de semanas anteriores (Doctoralia,
  Top Doctors, Franco Vascular, Flebosalud, Cardiovas IPS, Vasculab, Centrolab, CFMEDICINA,
  dopplervenosomedellin.com) más otras vistas hoy por primera vez (Clínica Medellín/QuirónSalud,
  doctoramontenegro.com —con página propia 'Escleroterapia Medellín' a nombre de una médica—,
  Clínica Somos, MDE Care, Clínica CIC, Centro de Medicina Integrativa). Antes de proponer
  comprobé el estado de las 6 propuestas pendientes de W36 y W37 en el código (canonical de
  insuficiencia-venosa.html, enlaces `tel:` fuera de esa página, `openingHours`/mapa en
  contacto.html, autoevaluación venosa): ninguna se ha implementado todavía, así que no las
  repetí. La más antigua (W34, 20-ago) lleva 25 días en `propuesta` — no caduca hasta pasar el
  mes, así que no marqué ninguna caducada esta semana. Encontré dos huecos nuevos y verificables
  en el código, ninguno repetido: (1) los dos artículos del blog construidos para 'eco doppler
  venoso Medellín' y 'escleroterapia Medellín' (2 de las 5 búsquedas objetivo) no mencionan
  'Medellín' ni una sola vez en todo el archivo — ni en title, h1, meta description, cuerpo o
  JSON-LD —, un hueco más grave que el que tenía insuficiencia-venosa.html antes de corregirse
  el 24-ago; (2) el bloque JSON-LD `MedicalClinic`, repetido en las 8 páginas raíz, no tiene
  campo `geo` (latitud/longitud) en ninguna de ellas, pese a sí declarar dirección y teléfono.
  Sobre esta segunda la marqué con impacto bajo y dejé por escrito que es higiene técnica, no
  algo que por sí solo mueva el ranking local. Aviso a Laura: nota en GitHub con etiqueta
  `propuestas`.
- **2026-09-21 · 2 propuestas nuevas (W39-1, W39-2) + 6 propuestas caducadas.** Repetí las 5
  búsquedas objetivo: Seravena sigue sin aparecer en ninguna; misma competencia dominante de
  siempre (Doctoralia, Top Doctors, Franco Vascular, Flebosalud, Vasculab, Centrolab,
  dopplervenosomedellin.com, doctoramontenegro.com, Cardiovas IPS) más otras vistas hoy por
  primera vez (VARICLINIC, Derma Skin Care, Internista Vascular Medellín, Clínica Somos, Angiosur,
  MDE Care). Antes de proponer comprobé el estado de las 6 propuestas pendientes de W36-W38 en el
  código (canonical de insuficiencia-venosa.html, tel:, openingHours/mapa/geo en contacto.html,
  Medellín en los dos artículos del blog, autoevaluación venosa): ninguna se ha implementado
  todavía, así que no las repetí. Encontré dos huecos nuevos y verificables, ninguno repetido:
  (1) de las 8 páginas raíz, solo `insuficiencia-venosa.html` declara sus procedimientos con
  `availableService` en el JSON-LD `MedicalClinic`; `vascular.html` —la página con título literal
  "Várices y salud vascular en Medellín" y que además tiene en su cuerpo las secciones de
  Escleroterapia y eco doppler— no declara ninguno, pese a ser el mismo patrón ya probado en su
  página hermana; (2) leyendo el manual del Agente 6 (analista) confirmé que "Seravena tiene
  Perfil de Empresa en Google" —ya existe, y esta semana el propio agente sugirió una Novedad
  para publicarla ahí (registro.md, 20-sep)— pero ninguna de las 8 páginas raíz enlaza a Google
  Maps ni al perfil en ningún sitio (0 coincidencias de "google.com/maps", "goo.gl/maps" ni
  "maps.app.goo.gl" en todo el código), y el `sameAs` del JSON-LD solo lleva Instagram.
  Revisé también las propuestas antiguas: las 6 de la tanda del 20-ago (W34-1 a W34-6) llevaban
  32 días en `propuesta`, más de un mes, así que las marqué `caducada` con una frase cada una en
  `admin/propuestas.json` (campo `nota_caducidad`) en vez de repetirlas. La más relevante: W34-1
  ("crear el Perfil de Empresa") parece ya hecha —el hallazgo (2) de esta semana lo confirma—,
  así que dejé anotado que Laura la revise y la pase a `hecha` en vez de seguir en `propuesta`.
  También encontré, leyendo `_agente-blog/registro-relaciones.md`, que el trabajo de directorios
  de W34-4 ya lo lleva semana a semana el Agente relacionista público desde el 2-sep (mensajes
  listos para Lipedema Colombia, Asovascular, ACMV, ACHC, Clínica Las Vegas), así que lo marqué
  caducado para no duplicar seguimiento, no porque haya perdido sentido. Aviso a Laura: nota en
  GitHub con etiqueta `propuestas`.
- **2026-10-05 · 2 propuestas nuevas (W41-1, W41-2) + 2 propuestas caducadas.** Hice
  `git checkout main` + `git pull` (el checkout local estaba en HEAD separado tras el commit
  más reciente del relacionista; se actualizó sin tocar nada en producción). Repetí las 5
  búsquedas objetivo: Seravena sigue sin aparecer en ninguna; misma competencia dominante de
  siempre (Doctoralia, Top Doctors, Franco Vascular, Flebosalud, Internista Vascular Medellín,
  Clínica Somos, Centrolab, Cardiovas IPS, dopplervenosomedellin.com, CFMEDICINA, Angiosur, MDE
  Care, Clínica Bedharma, Clínica Medellín/QuirónSalud, Vasculab) más otras vistas hoy por
  primera vez (Centro Médico Buenos Aires Medellín, Venitas Medellín, Centro de Estéticas
  Medellín, Derma Skin Care). Antes de proponer comprobé en el código el estado de W40-1 (tel:
  en index.html) y W40-2 (MedicalClinic duplicado en insuficiencia-venosa.html): ninguna de las
  dos se ha implementado todavía, así que no las repetí. También comprobé que las 3 páginas
  nuevas de tratamiento creadas el 24-sep (varices-medellin, escleroterapia-medellin,
  eco-doppler-venoso-medellin) ya tienen tel:, geo, sameAs y @id consistentes con el resto del
  sitio, y que el FAQ visible y el JSON-LD `FAQPage` de los 4 artículos publicados esta semana
  coinciden palabra por palabra: nada que proponer ahí. Revisé las propuestas pendientes de más
  de un mes: W36-1 (horario + mapa, 31-ago, 35 días) y W36-2 (autoevaluación venosa, 31-ago, 35
  días) siguen en `propuesta` sin que nadie las apruebe y sin que se hayan implementado (comprobé
  el código: sigue sin existir `openingHours` ni horario visible, y la única autoevaluación que
  hay es de lipedema, no venosa), así que las marqué `caducada` con una nota cada una en vez de
  repetirlas; ambas siguen teniendo sentido, solo caduca el plazo. Encontré dos huecos nuevos y
  verificables, ninguno repetido: (1) de las 19 páginas raíz, `index.html` —la portada— es la
  ÚNICA que declara `<html lang="es">` genérico en vez de `lang="es-CO"` como las otras 18,
  contradiciendo su propio JSON-LD que ya dice `"inLanguage": "es-CO"`; es justo el tipo de señal
  de idioma/región relevante para el problema España-vs-Colombia diagnosticado el 28-sep; (2)
  ninguna página de servicio del sitio menciona un precio (0 coincidencias de '$' o 'COP' en
  vascular, varices-medellin, escleroterapia-medellin, eco-doppler-venoso-medellin,
  insuficiencia-venosa, contacto), mientras que buscando hoy 'eco doppler venoso Medellín'
  encontré que Cardiovas IPS ($275.000) y Centrolab ($316.000) sí publican el precio exacto de
  ese examen puntual de precio fijo —distinto del tratamiento de várices, que el propio blog de
  esta semana explica con razón que no tiene tarifa fija por paciente—. Aviso a Laura: nota en
  GitHub con etiqueta `propuestas`.
- **2026-09-28 · 2 propuestas nuevas (W40-1, W40-2).** Antes de proponer, hice `git checkout main`
  + `git pull` (el checkout local estaba en HEAD separado, 47 commits detrás de `origin/main`; se
  actualizó sin tocar nada en producción) y repasé todo lo que cambió desde el 21-sep: el sitio dio
  un salto grande esta semana — 3 páginas nuevas por tratamiento (`varices-medellin.html`,
  `escleroterapia-medellin.html`, `eco-doppler-venoso-medellin.html`, creadas el 24-sep), enlazadas
  en el menú, el sitemap y desde `vascular.html` y los 3 artículos del blog hermanos, cada una con
  su propio `MedicalClinic`/`availableService`/FAQ — esto cumple, de hecho, lo que pedía W34-5
  ('una página propia por tratamiento'), marcada caducada el 21-sep; no hacía falta repetirlo.
  También se añadió el enlace `tel:` y un mapa de Google Maps a `contacto.html` (parte de W36-1,
  que sigue abierta porque el horario y el `openingHours` todavía no están). Repetí las 5 búsquedas
  objetivo: Seravena sigue sin aparecer en ninguna; misma competencia dominante de siempre
  (Doctoralia, Top Doctors, Franco Vascular, Flebosalud, Centrolab, Cardiovas IPS, VARICLINIC,
  dopplervenosomedellin.com, doctoramontenegro.com, CFMEDICINA, Clínica Somos, Centro de Medicina
  Integrativa, Clínica Bedharma, MDE Care, Internista Vascular Medellín, Derma Skin Care). Antes de
  proponer comprobé el código de las propuestas abiertas (W37-1, W36-1, W36-2): ninguna se ha
  implementado todavía, así que no las repetí — pero sí hice un hallazgo importante sobre W37-1:
  el commit `25dafec` (24-sep, "Direcciones limpias sin .html en toda la web") migró las 90+
  páginas del sitio, a propósito, a URLs sin extensión (`/insuficiencia-venosa`, no
  `/insuficiencia-venosa.html`) en enlaces, canonical, JSON-LD y sitemap, con un script
  (`_agente-blog/limpiar-enlaces.py`) que corre antes de cada commit del blog. Comprobé que las 76
  URLs del sitemap y los canonical de las 12 páginas raíz están hoy, sin excepción, sin `.html`.
  Eso significa que W37-1 —que pedía justo lo contrario, volver a poner `.html` en el canonical de
  `insuficiencia-venosa.html`— quedó obsoleta: ejecutarla tal como está escrita rompería la
  consistencia que el resto del sitio ya tiene. No pude confirmar en vivo que `/insuficiencia-venosa`
  responda 200 (mismo bloqueo de red de siempre hacia clinicaseravena.com, confirmado de nuevo hoy
  con `curl`: `connect_rejected`), pero es un cambio deliberado, de sitio completo, ya en producción
  4 días sin reversión. Sigue teniendo menos de un mes (21 días), así que por la regla del manual no
  la marqué caducada yo misma — se lo dejo dicho aquí y en el aviso de GitHub para que Laura no la
  apruebe tal cual. Buscando huecos nuevos y verificables encontré dos, ninguno repetido: (1) de las
  12 páginas raíz, `index.html` —la portada— es la única sin ningún enlace `tel:` (tiene 4 botones
  de WhatsApp, cero de llamada), un vacío que quedó de W37-2 (ya marcada `hecha` el 22-sep, que
  nombraba `index.html` explícitamente entre las páginas a corregir); (2) `insuficiencia-venosa.html`
  es la única página con 2 bloques `MedicalClinic` en su JSON-LD en vez de 1 (uno incompleto, anidado
  como `publisher` sin `address`/`geo`/`availableService`/`@id`, y un segundo completo pero también
  sin `@id`), mientras las otras 11 páginas raíz usan un único bloque con
  `"@id": "https://www.clinicaseravena.com/#clinica"` referenciado desde `MedicalWebPage` — quedó
  sin migrar al patrón que sí llegó al resto del sitio. Aviso a Laura: nota en GitHub con etiqueta
  `propuestas`, incluyendo el aviso sobre W37-1.
