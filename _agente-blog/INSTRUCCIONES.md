# Agente de blog SEO · Seravena

> Este archivo son las instrucciones que el agente sigue **cada día** para escribir y publicar
> un artículo del blog. La carpeta empieza por `_` para que no se publique en la web.
> Repositorio: `lauramesaz/SERAVENA` · La web publica sola al hacer `git push` (GitHub Pages).

---

## 0. Misión del equipo

Este archivo es el **conocimiento compartido** por el equipo de agentes del blog de **Seravena**,
clínica de **lipedema y salud vascular** (Colombia). El flujo de trabajo (quién hace qué y en qué
orden) está en `pipeline.md`, y cada agente tiene su rol en `agentes/`.

**Ritmo del equipo (desde el 7-nov-2026, con el sí de Laura): 3 artículos nuevos por semana
(lunes, miércoles y viernes) y 4 días de mejora (martes, jueves, sábado y domingo).** Los artículos
nuevos atraían sobre todo lectoras de España; mejorar lo que ya sale en Google trae más pacientes de
Medellín. Detalle en §4 y §4b. Todo artículo tiene que ser real, útil para pacientes y bien posicionado.
Todos los agentes de este equipo deben respetar las reglas de marca (§1), las salvaguardas médicas (§2)
y las reglas SEO (§3) de este documento.

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

### 1.1 Que suene a PERSONA, no a IA (obligatorio para todos los agentes)

Google no castiga que un texto se ayude de IA; castiga el contenido **genérico, en serie y sin
experiencia real** ("scaled content"). ChatGPT tampoco cita textos que dicen lo mismo que otros mil.
Lo que nos diferencia es sonar a la clínica de verdad. Por eso:

**Huellas de IA PROHIBIDAS (el Editor las borra, el Juez SEO descuenta si aparecen):**
- Raya larga (—) como muletilla. Máximo 1 por artículo; usa punto, coma o dos puntos.
- Fórmulas de relleno: "Es importante destacar/señalar", "En este artículo te contamos", "En resumen",
  "En conclusión", "juega un papel clave", "no solo… sino también" (máx. 1), "clave" (máx. 2),
  "sumérgete", "descubre", "en el mundo actual", "No estás sola" (máx. 1 cada 5 artículos).
- Meta descriptions en molde "¿Pregunta? Te contamos…". Cada una distinta, con un dato concreto.
- Listas de exactamente 3 adjetivos o 3 ideas por costumbre; todos los párrafos del mismo largo;
  cierres que repiten lo ya dicho.
- Aperturas genéricas ("El lipedema es una condición que afecta a millones…"). Empieza por la
  situación real de la lectora o por la pregunta tal como la hacen en consulta.

**Señales de persona real (buscar al menos 2 por artículo):**
- Algo de `voz-real.md` (pregunta real de consulta, frase del equipo, patrón que vemos). NUNCA inventarlo.
- Contexto local verdadero: Medellín, el clima, El Poblado, cómo es la consulta aquí.
- Una opinión clara de la clínica ("En Seravena no recomendamos X como primer paso porque…"),
  siempre respaldada por el Verificador médico.
- Admitir límites con honestidad ("esto no lo resuelve una media", "no todas las pacientes…").
- Frases de largo variado, algún párrafo de una sola línea, preguntas directas a la lectora.

**Autoría:** el autor es siempre la organización, "Equipo médico de Seravena". La revisión del
Dr. José David Puerta Rojas solo se muestra en los artículos que están en `revisados-medico.md`
(ver §2, regla 5). Nunca inventar un autor ni un revisor.

## 2. Reglas de ORO médicas (imprescindibles — es contenido de salud "YMYL")

1. **Nunca inventes datos, cifras, estudios ni nombres de médicos.** Si no estás seguro, no lo pongas.
2. **No prometas curas ni resultados garantizados.** Habla de "puede ayudar", "en muchos casos".
3. **No des dosis, medicamentos concretos ni indicaciones de tratamiento personalizadas.**
4. Incluye SIEMPRE el bloque `<div class="post-note">` con el aviso de señales de alarma + que
   el artículo es informativo y no sustituye consulta médica.
5. **Autoría y revisión (desde el 7-nov-2026).** El autor sigue siendo la organización: en el JSON-LD
   `"author": { "@type": "Organization", "name": "Equipo médico de Seravena" }` y la firma visible "Por
   Equipo médico de Seravena". `reviewedBy` también es la organización, **salvo** que el artículo esté en
   `_agente-blog/revisados-medico.md`: solo entonces `reviewedBy` lleva al Dr. José David Puerta Rojas
   (`{ "@type": "Person", "@id": "https://www.clinicaseravena.com/dr-jose-david-puerta-rojas#medico",
   "name": "José David Puerta Rojas" }`), se añade `lastReviewed` con la fecha de esa lista y la línea visible
   "Revisado por el Dr. José David Puerta Rojas, médico internista con subespecialidad en medicina vascular
   · <fecha>" con enlace a `../dr-jose-david-puerta-rojas`. Nunca pongas su nombre en un artículo que no
   está en esa lista, aunque te parezca que él estaría de acuerdo. No inventes nombres de médicos.
6. Ante cualquier duda de seguridad médica, elige la redacción más prudente.
7. **Sección "Fuentes" obligatoria (desde el 7-nov-2026).** Todo artículo nuevo, y todo artículo que se
   mejore, termina el cuerpo con el bloque `<section class="post-sources">` de la plantilla: de 2 a 5
   referencias reales (guías clínicas, sociedades médicas, Minsalud, INVIMA, revisiones con DOI o PubMed),
   con título, entidad o revista, año y enlace. Reglas:
   - El Verificador médico **abre cada enlace** y confirma que existe y que dice lo que el artículo afirma.
     Si no abre, o no dice eso, la fuente sale (y la afirmación que dependía de ella también).
   - Nada de fuentes inventadas, enlaces adivinados ni DOI de memoria. Mejor 2 fuentes comprobadas que 5 dudosas.
   - No sirven como fuente: blogs de otras clínicas, foros, Wikipedia, ni páginas de la propia Seravena.
   - Las mismas fuentes van en el JSON-LD `MedicalWebPage` como `"citation"` (lista de objetos
     `CreativeWork` con `name` y `url`).
8. **Si el tema es plata** (precio, cuánto cuesta, pago, qué incluye): enlaza a `../precios` (o a
   `../precio-lipedema-medellin` en lipedema) y usa solo las cifras que esas páginas publican, copiadas
   tal cual, con la aclaración de que el valor exacto sale después de la valoración. Nunca escribas que
   "no damos precios" ni inventes descuentos, cuotas o coberturas.
9. **Enlaces internos que existan.** Antes de publicar corre `python3 _agente-blog/revisar-enlaces.py`
   (lo crea la tarea SER-05). Mientras ese archivo no exista, comprueba a mano que cada enlace interno
   nuevo apunte a un archivo que está en el repositorio (`../x` → `x.html`, `y` → `blog/y.html`).

## 2b. Enfoque LOCAL: Medellín y Colombia (obligatorio desde 28-sep-2026)

**Por qué:** en la revisión de Search Console del 28-sep-2026, de 1.410 apariciones en Google en
3 meses, **868 fueron en España** y solo 242 en Colombia. Los 26 clics llegaron todos de Colombia.
Un artículo genérico ("qué es la escleroterapia") compite con todo el mundo hispano y atrae
lectoras que nunca van a venir a la clínica. **Seravena solo atiende en Medellín: escribimos para
pacientes de Medellín, del Valle de Aburrá, de Antioquia y del resto de Colombia que viajarían.**


**Datos confirmados por Laura (28-sep-2026), úsalos tal cual:**
- Seravena atiende **solo pacientes particulares**: no trabaja con EPS ni con medicina prepagada. No se necesita remisión ni autorización: se agenda directo por WhatsApp. Nunca escribas que "la EPS cubre" o que "puedes venir por tu EPS/prepagada".
- El **eco doppler se hace en el mismo consultorio de El Poblado** (Calle 2 Sur #46-159, Torre Médica Salud Vegas, consultorio 1316).
- Hablar de EPS sí está permitido como contexto para la lectora (p. ej. "si por tu EPS la cita tarda meses, una valoración particular es otra opción"), sin afirmar coberturas ni tiempos concretos.

**Reglas para TODOS los artículos (nuevos y los que se actualicen):**
1. **Elige keywords con intención local o colombiana** cuando existan: "en Medellín", "en Colombia",
   "EPS", "precio en Colombia", "dónde hacerse…", "especialista en…". Si la keyword es general,
   el artículo igual debe ser inconfundiblemente colombiano (puntos 2 a 5). **Excepción:** las
   búsquedas de la tabla del punto 8 son de una página de servicio; el artículo no las usa como keyword.
2. **Medellín o Colombia aparece de forma natural** en el primer párrafo, en al menos un `<h2>` y en
   la meta description. Nunca a la fuerza ni repetido (máx. 3–4 veces en todo el texto).
   **Excepción:** en los artículos que giran alrededor de una búsqueda de la tabla del punto 8 (por ejemplo
   `eco-doppler-venoso-que-es`, `dudas-antes-eco-doppler-venoso`, `como-elegir-clinica-lipedema-medellin`
   y `guia-tratamientos-varices`), Medellín basta en el primer párrafo, dentro del enlace a la página de
   servicio, y en el cuerpo. Al actualizarlos o humanizarlos no se vuelve a poner en el `<title>`, el `<h1>`,
   los `<h2>` ni la meta description.
3. **Contexto colombiano real:** EPS y medicina prepagada, INVIMA, pesos colombianos (COP), el clima
   de Medellín (primavera todo el año, calor de tierra caliente en viajes a la costa o a Santa Fe de
   Antioquia), subir lomas, el Metro, trabajos de pie en comercio y salud. Solo datos verdaderos;
   **nunca inventes precios, coberturas de EPS ni normas**: si no está verificado, no va.
4. **Español de Colombia:** "celular", "cita", "EPS", "consultorio", "medias de compresión".
   Prohibido vocabulario de España: "vosotros", "ordenador", "móvil", "coger", "ambulatorio", "euros".
5. **Cada artículo enlaza a UNA página de servicio local** del racimo (además de lo de §3):
   `../varices-medellin`, `../escleroterapia-medellin`, `../eco-doppler-venoso-medellin`,
   `../lipedema`, `../clinica-lipedema-medellin`, `../precio-lipedema-medellin`, `../lipedema-colombia`,
   `../insuficiencia-venosa`, `../obesidad-medellin`, `../precios`. Con texto de enlace descriptivo y local
   (ej. "tratamiento de várices en Medellín"), no "haz clic aquí". Si el tema es el costo, el enlace va a
   `../precios` (o a `../precio-lipedema-medellin` en lipedema) y las cifras se copian tal cual de esa página:
   nunca escribas que "no damos precios". Si el tema es peso, obesidad o metabolismo, enlaza `../obesidad-medellin`.
6. **Título:** si la búsqueda tiene intención local, "Medellín" o "Colombia" va en el `<title>`,
   salvo que esa búsqueda sea de una página de servicio (tabla del punto 8): entonces el título va con
   enfoque de duda o informativo, sin "en Medellín".
   Si es informativa pura (ej. "mitos de las medias"), no se fuerza en el título, pero sí en la
   meta description.
7. **JSON-LD:** `"inLanguage": "es-CO"`.
8. **Anticanibalización con las páginas de servicio:** un artículo NUNCA ataca la misma keyword
   que una página de servicio (ej. "escleroterapia en Medellín" es de `escleroterapia-medellin`).
   El artículo responde una duda alrededor y enlaza a esa página **desde el primer párrafo**.
   Estas búsquedas (y sus variantes con "Medellín", "El Poblado", "precio", "mejor", "dónde") son de la
   página de servicio y ningún `<title>`, `<h1>`, `og:title` ni `headline` de un artículo las lleva
   (actualizado el 7-nov-2026, tras arreglar 4 artículos que les quitaban la búsqueda):

   | Búsqueda comercial local | Es de la página |
   |---|---|
   | eco doppler venoso en Medellín | `../eco-doppler-venoso-medellin` |
   | clínica de lipedema en Medellín / dónde tratar el lipedema en Medellín | `../clinica-lipedema-medellin` |
   | precio del tratamiento de lipedema / cuánto cuesta el lipedema en Medellín | `../precio-lipedema-medellin` |
   | lipedema en Medellín (diagnóstico y tratamiento) | `../lipedema` |
   | lipedema en Colombia (recursos, apoyo) | `../lipedema-colombia` |
   | tratamiento de várices en Medellín / várices sin cirugía en Medellín | `../varices-medellin` |
   | escleroterapia en Medellín | `../escleroterapia-medellin` |
   | insuficiencia venosa en Medellín | `../insuficiencia-venosa` |
   | bajar de peso / programa de obesidad en Medellín | `../obesidad-medellin` |
   | precios de lipedema, várices y peso en Medellín | `../precios` |

   Ejemplos de cómo quedaron los artículos que competían: `eco-doppler-venoso-que-es` = "Qué es el eco
   doppler venoso y para qué sirve"; `dudas-antes-eco-doppler-venoso` = "Dudas antes de tu eco doppler
   venoso"; `como-elegir-clinica-lipedema-medellin` = "Antes de elegir dónde tratar tu lipedema";
   `guia-tratamientos-varices` = "Opciones para tratar las várices: cómo se elige". No se cambian sus URLs.

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
- **Sitemap:** al añadir el artículo pon su `<lastmod>` con la fecha real de publicación,
  y **si editas un artículo antiguo, actualiza también su `<lastmod>`**. Google usa esa fecha
  para decidir si vuelve a rastrear la página: si la dejas vieja, no vuelve.
- **Slug (nombre de archivo):** en minúsculas, con guiones, descriptivo y con la keyword.
  Ej: `varices-en-el-embarazo.html`. Sin acentos ni ñ en el nombre de archivo.
- Rellena bien el `alt` de las imágenes (describe la imagen, con contexto).
- Mantén el JSON-LD (`MedicalWebPage` + `BreadcrumbList`) con la fecha y título correctos.

## 3b. Regla de gemelos: una búsqueda = un artículo (desde 20-oct-2026)

**Por qué:** en la revisión de Search Console del 19-oct-2026, 5 artículos estaban casi invisibles
porque tenían un "gemelo": otro artículo nuestro que respondía **la misma búsqueda con otras
palabras** ("piernas hinchadas por calor en Medellín" y "piernas hinchadas por calor en viajes a
tierra caliente"; "cuidado de piernas de pie" y "¿trabajas sentada?"; dos guías de "tratamiento de
várices sin cirugía"; dos de "cómo elegir medias de compresión"). Google escoge uno, ignora al otro
y a veces no sube ninguno. La regla vieja solo comparaba la keyword exacta en `registro.md`, y por
eso se colaron. El 20-oct-2026 se fusionaron (lista en `temas.md`, "Artículos fusionados").

**Antes de escribir un artículo nuevo (obligatorio; lo hace el Redactor y lo confirma el Juez SEO):**
1. Escribe en una frase **la pregunta que la lectora teclea en Google**, no la keyword.
   Ej.: "¿por qué se me hinchan las piernas con el calor y qué hago?".
2. Corre `python3 _agente-blog/buscar-gemelos.py "<título propuesto>" "<keyword>"` y **lee el
   título, la descripción y el primer párrafo** de cada artículo con puntaje ≥ 0,30. Mirar solo
   `registro.md` no basta. El puntaje ordena la lectura; quien decide eres tú, leyendo.
3. Hazte la pregunta del gemelo: **si esa misma persona cae en el artículo que ya existe, ¿queda
   satisfecha?** Son gemelos aunque cambien las palabras: sinónimos (calor / tierra caliente;
   trabajo / jornada / turno; cita / consulta / valoración), la misma situación en otro lugar o
   momento ("calor en Medellín" / "calor al viajar"), "guía" / "guía completa", el mismo consejo
   para otra postura (sentada / de pie).
4. **Si es gemelo, NO escribas uno nuevo:** mejora el que existe (la sección que faltaba, una
   pregunta frecuente, el ángulo nuevo), actualiza su `dateModified` y su `lastmod`, pásalo por el
   Verificador médico y marca el tema en `temas.md` como `[descartado → mejorado <slug>]` con una
   línea de por qué. Eso cuenta como el trabajo del día.
5. **Si es pariente (mismo racimo, otra intención):** sí se escribe, pero con un ángulo que no se
   pise. Título, H1, descripción y primer párrafo dicen para quién y para qué es (en casa / en la
   consulta / para médicos; deporte / rutina en casa / hábitos del día), y el primer párrafo enlaza
   al pariente ("si lo que buscas es X, está en …").
6. **Nunca** vuelvas a crear un slug de "Artículos fusionados" (`temas.md`): esas direcciones ya
   llevan al artículo principal. Lo nuevo sobre ese tema se añade al principal.

**Fusionar dos artículos que ya existen** (lo propone el Analista semanal en su informe; se hace
con el visto bueno de Laura): el que mejor posiciona queda como principal y absorbe lo bueno del
otro (sin inventar nada: solo se mueve texto ya verificado). El absorbido **no se borra**: su archivo
se reemplaza por una página de redirección (copiar el modelo de `blog/piernas-hinchadas-calor.html`:
`meta refresh` + `canonical` al principal), se quita su tarjeta de `blog/index.html` y su `<url>`
del `sitemap.xml`, se cambian los enlaces internos que apuntaban a él y se añade a la lista de
"Artículos fusionados" de `temas.md`. Las páginas de redirección no son artículos: no se humanizan,
no se auditan como artículos y no cuentan en el total.

## 4. Pasos EXACTOS para publicar un artículo

Trabaja siempre dentro de `web/` (donde está el repositorio git).

0. **¿Toca artículo nuevo hoy?** Solo lunes, miércoles y viernes (hora de Colombia). Martes, jueves,
   sábado y domingo son días de mejora: sigue §4b y no escribas un artículo nuevo.
1. **Elige el tema:** abre `_agente-blog/temas.md` y toma el primer `[pendiente]` de la sección
   **"Cola con búsquedas reales de Colombia"** (no de las secciones viejas ni de la Reserva). Confirma
   en `_agente-blog/mapa-palabras.md` que su búsqueda no tiene ya página dueña y que el título no usa
   una frase de la lista prohibida (sección 2 del mapa). Después pásale la **prueba del gemelo (§3b)**:
   `buscar-gemelos.py` + leer los parecidos. Si ya existe un artículo que responde la misma búsqueda,
   mejora ese en vez de crear uno nuevo.
   **Si la cola no tiene pendientes:** toma la primera búsqueda de la sección 4 del mapa ("Búsquedas sin
   página dueña") que no esté en la cola ni publicada. Si no hay ninguna, hoy es día de mejora (§4b).
   **Prohibido inventar temas** o añadirlos a `temas.md` por tu cuenta.
2. **Crea el archivo** `blog/<slug>.html` copiando la estructura de
   `_agente-blog/plantilla-post.html` y rellenando TODOS los `{{...}}`.
   - **Imagen de portada — regla nueva, sustituye a la anterior:** abre
     `../_agente-blog/imagenes.json`, que lleva el registro de qué imagen usa cada artículo.
     **Elige una que NO esté ya usada por otro artículo de tu mismo racimo.** Si todas las de
     tu racimo están cogidas, usa una del fondo común antes que repetir una del racimo.
     Añade tu artículo al registro con la imagen y su `alt`.
     Si no queda ninguna libre razonable, **dilo en el aviso del día**: significa que hay que
     ampliar el banco de imágenes, y es mejor avisar que repetir en silencio.
     Nunca inventes rutas que no existan en `../assets/media/`.
     (Durante meses el manual decía "elige una imagen existente" sin más, y el resultado fue
     que una misma foto acabó en 9 artículos. Por eso ahora hay registro.)
3. **Añade la tarjeta** al listado: en `blog/index.html`, justo **debajo** del comentario
   `<!-- INICIO_POSTS ... -->`, inserta el bloque `<a class="blog-card reveal" ...>` del nuevo post
   (para que el más nuevo quede primero). Usa el mismo formato que las tarjetas existentes.
4. **Actualiza el sitemap** `sitemap.xml`: añade un `<url>` para el nuevo post (priority 0.7,
   changefreq monthly, lastmod = hoy) y actualiza el `lastmod` de `/blog/` a hoy.
5. **Registra** en `_agente-blog/registro.md` una línea nueva: fecha, slug, título, keyword.
   Marca el tema como `publicado` en `temas.md`.
6. **Publica:** haz commit y push:
   > **Direcciones limpias (desde 24-sep-2026):** los enlaces NUNCA terminan en `.html` (`../lipedema`, `otro-articulo`, `https://www.clinicaseravena.com/blog/<slug>`). El archivo sí se llama `<slug>.html`. Antes del commit corre SIEMPRE `python3 _agente-blog/limpiar-enlaces.py` (corrige cualquier `.html` que se haya colado en enlaces, canonical, JSON-LD y sitemap).

   Haz `git add` **solo de los archivos que tocaste** (nunca `git add -A` ni `git add .`: el repositorio
   puede tener cosas de otras sesiones que no se deben subir). Normalmente son: `blog/<slug>.html`,
   `blog/index.html`, `sitemap.xml`, `admin/blog-actividad.json`, los 3 artículos de "Sigue leyendo" que
   editaste y los archivos de `_agente-blog/` que cambiaste (`temas.md`, `registro.md`, `imagenes.json`,
   `notas-humanizador.md`, `humanizados.md`).

   ```
   python3 _agente-blog/limpiar-enlaces.py
   git status --short          # revisa que solo aparezca lo tuyo
   git add blog/<slug>.html blog/index.html sitemap.xml admin/blog-actividad.json <los demás que tocaste>
   git commit -m "blog: <título del artículo>"
   git pull --rebase
   git push origin HEAD:main
   ```
7. **Verifica que quedó EN VIVO de verdad** (paso obligatorio, no opcional): espera 1–3 min y
   comprueba que `https://www.clinicaseravena.com/blog/<slug>` responde **200**. Un push
   correcto NO garantiza publicación: el build de GitHub Pages puede fallar (pasó el 6-ago-2026 y
   el artículo estuvo invisible ~6 horas). Si da 404, sigue el procedimiento del Auditor
   (`agentes/5-auditor.md`, sección "Publicación real") para relanzar el build.
8. **Avisa a Laura** (ver sección 6) con el título y el enlace
   `https://www.clinicaseravena.com/blog/<slug>`.

**Si la cola se acaba, NO generes temas nuevos** (regla cambiada el 7-nov-2026; antes decía "genera 10
temas nuevos" y así salieron decenas de artículos generales que se leían en España). El orden es: cola de
`temas.md` → sección 4 de `mapa-palabras.md` → día de mejora. Si la cola queda con menos de 3 pendientes,
dilo en el aviso del día para que Claude o la revisión de los lunes la llenen con búsquedas reales.

## 4b. Día de mejora (martes, jueves, sábado y domingo; o cuando no hay tema)

Un artículo que ya sale en Google suele rendir más con un empujón que uno nuevo desde cero. Ese día:

1. **Elige UN artículo** de la sección 5 de `mapa-palabras.md` ("Banco de mejoras"), de arriba abajo, el
   primero que cumpla todo esto:
   - su `dateModified` (JSON-LD) es de hace 21 días o más. No uses `git log`: los cambios del pie de página
     tocan todos los archivos a la vez;
   - no tiene fecha de "no tocar" vigente en `registro-seo-semanal.md` (si la tiene, puedes mejorar el
     cuerpo, pero no el `<title>`, la descripción ni el H1);
   - no está entre los 3 primeros `[pendiente]` de `humanizados.md`;
   - no es una redirección de "Artículos fusionados".
   Si el banco no tiene ninguno que cumpla, toma el artículo con más apariciones en Colombia según el
   último registro de `registro-seo-semanal.md` (o `seguimiento-busquedas.py` si existe) que cumpla lo mismo.
2. **Qué le haces** (fondo real, no cosmética):
   - la sección "Fuentes" (§2, regla 7) si no la tiene, con 2 a 5 referencias que el verificador abre;
   - un enlace desde el primer párrafo a su página que vende (la de su racimo en `temas.md`), con texto
     descriptivo;
   - la búsqueda de Colombia que el banco dice que no atiende, usada con naturalidad en un H2, una pregunta
     frecuente (repetida palabra por palabra en el FAQPage) o el cuerpo;
   - `revisar-enlaces.py` (§2, regla 9);
   - si el artículo está en `revisados-medico.md`, la firma del médico (§2, regla 5). Si no está, no.
3. Actualiza `dateModified` y el `lastmod` del sitemap; `datePublished` no se toca.
4. Pasa los cambios por el Policía humanizador y el Verificador médico (subagentes). Sin APROBADO del
   médico no se publica: se descarta el cambio y se anota.
5. Publica igual que en §4 paso 6 (solo tus archivos, `git pull --rebase`, `git push origin HEAD:main`),
   comprueba el 200 y anota en `registro.md` una línea "mejora: <slug> · qué se hizo · búsqueda de Colombia".
6. Los días de mejora también se humaniza 1 artículo viejo, igual que siempre.

## 5. Calidad antes de publicar (checklist mental)

- [ ] ¿La keyword está en title, h1, primer párrafo, un h2 y la meta description?
- [ ] ¿Title ≤ 60 caracteres? ¿Meta description 140–160?
- [ ] ¿Hay bloque de aviso médico (`post-note`) y autoría del equipo?
- [ ] ¿1–2 enlaces internos y 1 llamada a la acción (agendar valoración / WhatsApp)?
- [ ] ¿Nada inventado, ninguna promesa de cura, tono cálido?
- [ ] ¿El slug no choca con uno ya publicado ni con uno de "Artículos fusionados"?
- [ ] ¿Pasó la prueba del gemelo (§3b)? Ningún artículo vivo responde ya la misma búsqueda.
- [ ] ¿El tema salió de la cola con búsquedas reales (o de la sección 4 del mapa) y el título no usa una
      frase prohibida de `mapa-palabras.md`?
- [ ] ¿Tiene la sección "Fuentes" con 2 a 5 referencias que el verificador abrió, y las mismas en `citation`?
- [ ] ¿`reviewedBy` es la organización, salvo que el artículo esté en `revisados-medico.md`?
- [ ] Si habla de plata, ¿enlaza a `../precios` y usa solo cifras publicadas?

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
