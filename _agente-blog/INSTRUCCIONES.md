# Agente de blog SEO · Seravena

> Este archivo son las instrucciones que el agente sigue **cada día** para escribir y publicar
> un artículo del blog. La carpeta empieza por `_` para que no se publique en la web.
> Repositorio: `lauramesaz/SERAVENA` · La web publica sola al hacer `git push` (GitHub Pages).

---

## 0. Misión del equipo

Este archivo es el **conocimiento compartido** por el equipo de agentes del blog de **Seravena**,
clínica de **lipedema y salud vascular** (Colombia). El flujo de trabajo (quién hace qué y en qué
orden) está en `pipeline.md`, y cada agente tiene su rol en `agentes/`.

**Objetivo del equipo: mínimo 1 artículo nuevo al día**, real, útil para pacientes y bien
posicionado en Google. Todos los agentes de este equipo deben respetar las reglas de marca (§1),
las salvaguardas médicas (§2) y las reglas SEO (§3) de este documento.

En fase manual se publica con aprobación de Laura; después, de forma automática con red de
seguridad (se publica y se avisa, y todo queda registrado para poder revertir).

---

## 1. Reglas de marca (tono y estilo)

- **Público:** personas (sobre todo mujeres) preocupadas por sus piernas: hinchazón, várices, pesadez,
  lipedema, dolor. También profesionales de la salud en algunos temas.
- **Tono:** cálido, cercano, claro y tranquilizador. Nunca alarmista ni frío. Tuteo ("tú").
- **Promesa de marca:** "las piernas pesadas/hinchadas no son normales y tienen solución sin cirugía".
- **Idioma:** español de Colombia, natural, sin tecnicismos innecesarios (y si usas uno, lo explicas).
- **Longitud:** 700–1100 palabras. Frases cortas. Párrafos de 2–4 líneas.
- **Colores/diseño:** NO tocar. El artículo usa `../styles.css` + `blog.css` que ya definen todo.

## 2. Reglas de ORO médicas (imprescindibles — es contenido de salud "YMYL")

1. **Nunca inventes datos, cifras, estudios ni nombres de médicos.** Si no estás seguro, no lo pongas.
2. **No prometas curas ni resultados garantizados.** Habla de "puede ayudar", "en muchos casos".
3. **No des dosis, medicamentos concretos ni indicaciones de tratamiento personalizadas.**
4. Incluye SIEMPRE el bloque `<div class="post-note">` con el aviso de señales de alarma + que
   el artículo es informativo y no sustituye consulta médica.
5. Autoría = **"Equipo médico de Seravena"** (no inventes un nombre propio de doctor).
6. Ante cualquier duda de seguridad médica, elige la redacción más prudente.

## 3. Reglas SEO (cómo posicionar)

- **1 palabra clave principal** por artículo (mira `temas.md`), + 3–5 secundarias relacionadas.
- La keyword principal debe aparecer en: `<title>`, `<h1>`, primer párrafo, un `<h2>`, y la meta description.
- **Título SEO** (`<title>`): atractivo, con la keyword, **≤ 60 caracteres** + " | Seravena".
- **Meta description:** 140–160 caracteres, con gancho + llamada a la acción.
- **Estructura:** un solo `<h1>`, y `<h2>`/`<h3>` para las secciones. Usa listas `<ul>`.
- **Racimo temático:** todo artículo pertenece a un racimo (ver la tabla al inicio de `temas.md`).
  El racimo decide a qué artículos enlaza y con qué guía madre se conecta.
- **Enlaces internos (regla ampliada 6-ago-2026):** cada artículo debe llevar
  **2–3 enlaces a artículos hermanos del mismo racimo** dentro del texto (con el título real como
  texto del enlace, no "haz clic aquí") **+ 1 enlace a la página de servicio** del racimo
  (`../lipedema.html`, `../vascular.html`, `../insuficiencia-venosa`) **+ 1 a `../contacto.html`**.
  Un artículo suelto, sin nada que lo enlace, no posiciona: Google mide qué tan conectado está.
- **Bloque "Sigue leyendo" obligatorio** (`<nav class="post-related">`, ya viene en la plantilla):
  3 artículos del mismo racimo. Y **hay que editar esos 3 artículos** para que también enlacen al
  nuevo: los enlaces valen en los dos sentidos y así ningún artículo queda huérfano.
- **Preguntas frecuentes obligatorias:** 3–4 preguntas reales que la gente escribe en Google,
  al final del artículo (`<div class="post-faq">`) **y repetidas palabra por palabra** en el bloque
  JSON-LD `FAQPage` del `<head>`. Es lo que hace que Google muestre las preguntas desplegables
  debajo de tu resultado: ocupas más pantalla y le quitas espacio a la competencia.
- **Slug (nombre de archivo):** en minúsculas, con guiones, descriptivo y con la keyword.
  Ej: `varices-en-el-embarazo.html`. Sin acentos ni ñ en el nombre de archivo.
- Rellena bien el `alt` de las imágenes (describe la imagen, con contexto).
- Mantén el JSON-LD (`MedicalWebPage` + `BreadcrumbList`) con la fecha y título correctos.

## 4. Pasos EXACTOS para publicar un artículo

Trabaja siempre dentro de `web/` (donde está el repositorio git).

1. **Elige el tema:** abre `_agente-blog/temas.md`, toma el primer tema con estado `pendiente`
   que NO se repita con algo ya publicado (revisa `_agente-blog/registro.md`).
2. **Crea el archivo** `blog/<slug>.html` copiando la estructura de
   `_agente-blog/plantilla-post.html` y rellenando TODOS los `{{...}}`.
   - Elige una imagen de portada existente en `../assets/media/` (ej. `band-veins.webp`,
     `care-hands.webp`, `hero-poster.webp`). No inventes rutas de imágenes que no existan.
3. **Añade la tarjeta** al listado: en `blog/index.html`, justo **debajo** del comentario
   `<!-- INICIO_POSTS ... -->`, inserta el bloque `<a class="blog-card reveal" ...>` del nuevo post
   (para que el más nuevo quede primero). Usa el mismo formato que las tarjetas existentes.
4. **Actualiza el sitemap** `sitemap.xml`: añade un `<url>` para el nuevo post (priority 0.7,
   changefreq monthly, lastmod = hoy) y actualiza el `lastmod` de `/blog/` a hoy.
5. **Registra** en `_agente-blog/registro.md` una línea nueva: fecha, slug, título, keyword.
   Marca el tema como `publicado` en `temas.md`.
6. **Publica:** haz commit y push:
   ```
   git add -A
   git commit -m "blog: <título del artículo>"
   git push
   ```
7. **Verifica que quedó EN VIVO de verdad** (paso obligatorio, no opcional): espera 1–3 min y
   comprueba que `https://www.clinicaseravena.com/blog/<slug>.html` responde **200**. Un push
   correcto NO garantiza publicación: el build de GitHub Pages puede fallar (pasó el 6-ago-2026 y
   el artículo estuvo invisible ~6 horas). Si da 404, sigue el procedimiento del Auditor
   (`agentes/5-auditor.md`, sección "Publicación real") para relanzar el build.
8. **Avisa a Laura** (ver sección 6) con el título y el enlace
   `https://www.clinicaseravena.com/blog/<slug>.html`.

Si `temas.md` se queda con menos de 5 temas pendientes, **genera 10 temas nuevos** relevantes
(basados en dudas reales de pacientes de lipedema y salud vascular) y añádelos al final.

## 5. Calidad antes de publicar (checklist mental)

- [ ] ¿La keyword está en title, h1, primer párrafo, un h2 y la meta description?
- [ ] ¿Title ≤ 60 caracteres? ¿Meta description 140–160?
- [ ] ¿Hay bloque de aviso médico (`post-note`) y autoría del equipo?
- [ ] ¿1–2 enlaces internos y 1 llamada a la acción (agendar valoración / WhatsApp)?
- [ ] ¿Nada inventado, ninguna promesa de cura, tono cálido?
- [ ] ¿El slug no choca con uno ya publicado?

## 6. Cómo avisar a Laura

Deja un aviso claro con: título, enlace público, keyword objetivo y un resumen de 1 línea.
(El canal concreto —notificación, correo o mensaje— se configura al programar la rutina.)

---

## Notas para el análisis SEO (rutina semanal aparte)

- Cuando **Google Search Console** esté conectado, la rutina semanal revisará impresiones,
  clics y posición de cada post, y actualizará `registro.md` con esos datos.
- **Política de bajo rendimiento = ACTUALIZAR, no borrar.** Si un post lleva ~3 meses con muy
  pocas visitas/impresiones, se **reescribe y mejora** (mejor título, más profundidad, nuevos
  enlaces internos) y se actualiza `dateModified` + `lastmod`. Solo se plantea retirar algo si,
  tras actualizarlo, sigue sin rendir tras otro periodo largo — y siempre avisando a Laura antes.
