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
