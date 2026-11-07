# Plan de temas del blog · Seravena

Cola de temas para el agente. Formato: `- [estado] Título orientativo — keyword principal — slug sugerido`
Estados: `pendiente`, `publicado`, `descartado`, `fusionado`, `en reserva` (no se escribe solo; ver la Reserva).

## LO PRIMERO (desde el 7-nov-2026): la cola sale de búsquedas reales de Colombia

Hasta octubre, cuando la cola se vaciaba el robot inventaba 10 temas generales. Esos artículos los leían
sobre todo en España y no traían pacientes de Medellín. Por eso, desde hoy:

1. **El artículo nuevo sale SOLO de la sección "Cola con búsquedas reales de Colombia"** (justo debajo).
   Cada tema de esa cola lleva la búsqueda de Search Console que lo respalda: qué buscó la gente en
   Colombia, cuántas veces apareció la web y en qué posición.
2. **Prohibido inventar temas.** Si la cola no tiene pendientes, toma el siguiente de "Búsquedas sin
   página dueña" en `mapa-palabras.md`. Si tampoco hay, ese día es **día de mejora**
   (`INSTRUCCIONES.md` §4b). Nunca añadas temas tú.
3. **Quién puede añadir temas:** Claude en una sesión con Laura, o la revisión SEO de los lunes, y solo
   con una búsqueda de Colombia que salga en Search Console (`gsc.py`, `seguimiento-busquedas.py` o
   `registro-seo-semanal.md`). Se anota la búsqueda, el número de apariciones, la posición y las fechas.
4. **Antes de escribir:** mira en `mapa-palabras.md` que la búsqueda del tema no tenga ya página dueña
   y que el título no use una frase de la lista "Frases que un artículo NO puede usar". Después, la
   prueba del gemelo de siempre (§3b de `INSTRUCCIONES.md`).
5. Los temas de la **Reserva** no los toma la rutina diaria. Entran a la cola cuando aparezca su búsqueda
   en Colombia o cuando Claude los escriba en sesión con el dato que les falta.

## Cola con búsquedas reales de Colombia (armada el 7-nov-2026)

Datos: Search Console con el usuario robot, filtro país = Colombia, 8-ago a 5-nov-2026 (90 días).
"Apar." = veces que la web apareció en Google para esa búsqueda; "pos." = posición media.
Volúmenes pequeños pero reales: en Colombia las búsquedas que no son la marca suman pocas apariciones.
Se escriben en este orden (rota racimos). Cada línea dice qué pariente leer y enlazar en el primer párrafo.

- [pendiente] Exámenes para revisar la circulación de las piernas: cuál pide el médico y para qué sirve cada uno — exámenes para la circulación de las piernas — examenes-circulacion-piernas — racimo: diagnostico · Búsqueda real (Colombia): "estudio de las venas" 4 apar. (pos. 98), "examenes para la circulacion sanguinea" 2 (pos. 80), "eco doppler vascular" 2 (pos. 74), "ecodoppler vascular" 1, "examen doopler" 1 (pos. 11); hoy Google muestra /proceso, que no responde eso · Parientes: `eco-doppler-venoso-que-es`, `guia-diagnostico-problema-venoso`, `pies-frios-circulacion-arterial-venosa` (ya explica el índice tobillo-brazo) · Enlace del primer párrafo: `../eco-doppler-venoso-medellin` · Cuidado: en Seravena solo está confirmado el eco doppler venoso en el consultorio; los demás exámenes se explican en general, sin decir que se hacen allí.
- [pendiente] ¿Qué médico trata el lipedema? Las especialidades que pueden ayudarte — qué médico trata el lipedema — que-medico-trata-el-lipedema — racimo: lipedema · Búsqueda real (Colombia): "especialistas en lipedema" 2 apar. (pos. 44-64), "medico vascular lipedema" 2 (pos. 5, hoy la gana `/clinica-lipedema-medellin`), "especialista en lipedema en bogotá" 3 (pos. 17-53) · Parientes: `diagnostico-lipedema` (qué revisa el médico), `como-elegir-clinica-lipedema-medellin` (qué preguntar antes de elegir) · Enlaces del primer párrafo: `../dr-jose-david-puerta-rojas` y `../clinica-lipedema-medellin` · Cuidado: sin "Medellín" en el título ni en el H1 (esas búsquedas son de la página del médico y de la clínica); del Dr. Puerta solo lo que dice su página (internista con subespecialidad en medicina vascular).
- [pendiente] Flebitis en el brazo: por qué aparece (a veces después de un suero) y cuándo consultar — flebitis en el brazo — flebitis-en-el-brazo — racimo: sintomas · Búsqueda real: Colombia "flebitis en brazo" 2 apar. (pos. 61), "ecografía doppler de vasos venosos de miembros superiores" 1; en todos los países "flebitis brazo" 27 y "flebitis en brazo" 9 (hoy cae en `flebitis-superficial-sintomas`, que habla de las piernas) · Pariente: `flebitis-superficial-sintomas` (enlazarlo en el primer párrafo y que él enlace a este) · Enlace a página: `../vascular` · Cuidado: señales de alarma claras (fiebre, cordón rojo que sube, hinchazón de todo el brazo) en el post-note.
- [pendiente] Varicectomía: qué es, cómo es la recuperación y qué otras opciones existen — varicectomía — varicectomia-que-es — racimo: tratamiento · Búsqueda real (Colombia): "varicectomia" 2 apar. (pos. 51), "cirugia de vena varice" 1 (pos. 63); hoy cae en `varices-cirugia-o-sin-cirugia`, que nunca usa la palabra · Parientes: `varices-cirugia-o-sin-cirugia` (cómo decidir), `flebectomia-ambulatoria-que-es` · Enlace del primer párrafo: `../varices-medellin` · Cuidado: Seravena no opera; el artículo explica la cirugía y dice con honestidad cuándo se indica. Precios solo los publicados en `../precios`.
- [pendiente] ¿Venas marcadas o várices? Cómo saber si las venas que se te notan son un problema — venas o várices — venas-marcadas-o-varices — racimo: sintomas · Búsqueda real (Colombia): "venas o varices" 2 apar. (pos. 77-89, hoy cae en `varices-vs-aranitas`) · Parientes: `varices-vs-aranitas` (várices frente a arañitas), `quitar-varices-para-siempre` · Enlace del primer párrafo: `../varices-medellin`.
- [pendiente] ¿Por qué duelen las piernas por dentro en la noche? Causas que no son calambres — dolor de piernas en la noche — dolor-piernas-noche-por-dentro — racimo: sintomas · Búsqueda real: Colombia "dolor de piernas en la noche" 2 apar. (pos. 52, hoy cae en `calambres-piernas-noche`); en todos los países "porque duelen las piernas por dentro en la noche" 11 y "dolor tobillos por la noche" 4 · Parientes: `calambres-piernas-noche` (calambres) y `lipedema-y-sueno` (solo lipedema; puntaje de gemelo 0,50: el ángulo de este es general y los enlaza a los dos) · Enlace a página: `../insuficiencia-venosa`.

## Reserva: temas del plan de 90 días sin búsqueda real todavía (la rutina diaria NO los toma)

Vienen del plan del 7-nov-2026. Search Console de Colombia (8-ago a 5-nov) no muestra ninguna búsqueda que
los respalde, o ya hay una página que responde esa búsqueda. Pasan a la cola cuando aparezca la búsqueda en
Colombia, o cuando Claude los escriba en una sesión con el dato que falta (SER-25, SER-26, SER-28, SER-33).

- [en reserva] Por qué vuelve el peso después de la dieta — racimo: lipedema/peso · Sin búsquedas en Colombia: `/obesidad-medellin` todavía no sale en Google. Enlace a `../obesidad-medellin`. Lo puede escribir Claude en sesión (SER-28).
- [en reserva] Si bajo de peso, ¿baja el lipedema? — Ojo: pariente fuerte de `dieta-y-lipedema` ("por qué la dieta sola no basta") y de `lipedema-cirugia-bariatrica`; pasar la prueba del gemelo antes de escribirlo (SER-28).
- [en reserva] Medicamentos para bajar de peso con control médico en Colombia: qué preguntar (sin marcas ni dosis) — sin búsquedas en Colombia (SER-28).
- [en reserva] Qué hace distinto un internista con el peso — sin búsquedas en Colombia (SER-28).
- [en reserva] Endoláser (láser endovenoso): cómo es el día y la recuperación — las búsquedas de láser que trae la web vienen de España ("tratamiento de venas con laser" 16 apar.) y caen en `escleroterapia-vs-laser`. Además falta saber dónde se hace, quién lo hace y cuántos días de incapacidad da (pregunta al Dr. Puerta, SER-39). La búsqueda comercial será de `../endolaser-varices-medellin` (SER-25).
- [en reserva] Dos temas de duda sobre endoláser o espuma — sin búsquedas en Colombia. La espuma ya tiene artículo (`escleroterapia-con-espuma`, que SER-26 retitula) y su precio va en `../escleroterapia-medellin#espuma`.
- [en reserva] Pago por partes y qué incluye el tratamiento (2 temas) — sin búsquedas en Colombia, y esa duda es de `../precios` y `../precio-lipedema-medellin`: un artículo competiría con ellas. Mejor como pregunta frecuente en esas páginas.
- [en reserva] Pacientes de otras ciudades (lipedema en Bogotá) — la búsqueda es real ("lipedema bogota" 30 apar. en Colombia, pos. 60), pero hoy ya la reparten 3 páginas propias (`lipedema-valoracion-particular`, `../lipedema`, `../lipedema-colombia`). Un artículo sería la cuarta. Se responde con la sección "Si no vives en Medellín" de `../lipedema-colombia` (SER-33).
- [en reserva] Muchas horas en el carro por el tráfico de Medellín: cómo cuidar tus piernas — piernas-trafico-medellin-carro — racimo: situaciones · Lo añadió el orquestador el 30-oct sin búsqueda que lo respalde; pariente de `cuidar-piernas-viajes-largos` (0,30) y de `sedentarismo-piernas-venas`.

## ESTRATEGIA: racimos temáticos (leer antes de elegir tema)

El blog NO es una lista suelta de artículos: es un conjunto de **racimos**. Un racimo es un grupo
de artículos sobre lo mismo que se enlazan entre sí y apuntan a una **guía madre**. Google entiende
mucho mejor "esta clínica sabe de várices" cuando ve 8 artículos conectados que 8 artículos sueltos.

| Racimo | De qué va | Guía madre | Página de servicio |
|--------|-----------|-----------|--------------------|
| `sintomas` | Qué siente la paciente: pesadez, hinchazón, calambres, dolor | Guía completa de síntomas de mala circulación | `../varices-medellin` |
| `tratamiento` | Qué se puede hacer: escleroterapia, láser, compresión | Opciones para tratar las várices (`guia-tratamientos-varices`) | `../varices-medellin`, `../escleroterapia-medellin` o `../insuficiencia-venosa` (costo: `../precios`) |
| `diagnostico` | Cómo se estudia: eco doppler, consulta, señales de alarma | Cómo se diagnostica un problema venoso | `../eco-doppler-venoso-medellin` |
| `situaciones` | Embarazo, trabajo de pie, viajes, calor, menopausia | Tus piernas según tu momento de vida | `../vascular.html` |
| `lipedema` | Todo lo de lipedema | Guía completa del lipedema | `../lipedema`, `../clinica-lipedema-medellin`, `../precio-lipedema-medellin` o `../lipedema-colombia` (peso: `../obesidad-medellin`) |

### Regla de elección del tema (IMPORTANTE — cambió el 6-ago-2026)

> Desde el 7-nov-2026 manda "LO PRIMERO" (arriba): se toma el primer `[pendiente]` de la cola con
> búsquedas reales, que ya viene ordenada para rotar racimos. Si ese tema rompe la regla de "nunca 3 días
> seguidos del mismo racimo", toma el siguiente pendiente de esa misma cola. Las reglas 2 y 3 siguen igual.

Antes se tomaba "el primer pendiente", y eso dejó **10 artículos de venas y CERO de lipedema**,
aunque el lipedema es la mitad del negocio. A partir de ahora:

1. **Rota entre racimos.** Mira `registro.md`: elige el racimo con menos artículos publicados.
   Nunca publiques 3 días seguidos del mismo racimo.
2. **Prioriza las guías madre.** Si al racimo elegido le faltan 3 o más artículos hijos, escribe
   primero los hijos; cuando el racimo tenga 4+ artículos, escribe su guía madre (más larga,
   1500–2000 palabras, enlazando a todos sus hijos).
3. **Anticanibalización por intención (regla de gemelos, cambió el 20-oct-2026).** Comparar
   keywords en `registro.md` NO basta: así se colaron 5 gemelos que Google ignoraba. Antes de
   escribir, aplica la prueba del gemelo de `INSTRUCCIONES.md` §3b: corre
   `python3 _agente-blog/buscar-gemelos.py "<título>" "<keyword>"`, lee título, descripción y primer
   párrafo de los parecidos y pregúntate si la misma persona quedaría satisfecha con lo que ya
   existe, aunque use otras palabras. Si sí, NO escribas otro artículo: **mejora el que ya existe**
   y marca el tema como `[descartado → mejorado <slug>]` explicando por qué.

### Búsquedas que son de una página de servicio (NO escribir artículos para ellas)

Desde el 7-nov-2026. Estas búsquedas comerciales locales las responde una página de servicio. Un
artículo nuevo NO las toma como keyword ni las pone en su título o H1: se queda con una duda alrededor
y enlaza a la página desde el primer párrafo. La tabla completa está en `INSTRUCCIONES.md` §2, punto 8.

- "eco doppler venoso en Medellín" → `eco-doppler-venoso-medellin` (los artículos de eco doppler son de dudas: qué es, cómo prepararse, cómo leer el informe)
- "clínica de lipedema en Medellín", "dónde tratar el lipedema en Medellín" → `clinica-lipedema-medellin`
- "precio / cuánto cuesta el tratamiento de lipedema" → `precio-lipedema-medellin`
- "tratamiento de várices en Medellín", "várices sin cirugía en Medellín" → `varices-medellin`
- "escleroterapia en Medellín" → `escleroterapia-medellin` · "bajar de peso en Medellín" → `obesidad-medellin` · "precios" → `precios`

### Artículos fusionados (NO volver a crearlos)

Eran gemelos: respondían la misma búsqueda y Google ignoraba uno. El 20-oct-2026 cada par se juntó
en el artículo que mejor posicionaba. La dirección vieja sigue viva como redirección al principal.
Lo nuevo sobre estos temas se añade al principal; nunca se vuelve a crear el slug viejo.
Publicado en línea el 28-oct-2026 (el arreglo del 20-oct había quedado sin subir). Estas 4 páginas son
redirecciones, no artículos: no se humanizan, no se auditan y no van en el sitemap ni en `blog/index.html`.

| Dirección vieja (redirige) | Artículo principal (el que se mejora) |
|---|---|
| `varices-tratamiento-sin-cirugia` | `guia-tratamientos-varices` |
| `medias-de-compresion-guia` | `medias-compresion-colombia-comprar` |
| `piernas-hinchadas-calor` | `piernas-viaje-tierra-caliente` (ahora cubre calor en Medellín y viajes) |
| `cuidar-piernas-trabajo-de-pie` | `sedentarismo-piernas-venas` (ahora cubre trabajo sentada y de pie) |

### Ángulos ya repartidos (parientes: no pisarse)

Grupos del mismo tema donde cada artículo tiene su propia búsqueda. Un tema nuevo cerca de estos
debe tener un ángulo distinto a los tres, o mejorar el que corresponda.

- **¿Tengo lipedema?** `como-saber-si-tengo-lipedema` = la paciente, en casa, antes de la cita ·
  `diagnostico-lipedema` = qué revisa el médico en la consulta · `senales-lipedema-primer-contacto`
  = para médicos generales (y `../guia-lipedema-medicos` es la hoja rápida para médicos).
- **Primera cita:** `preparar-valoracion-vascular` = qué pasa dentro de la consulta, paso a paso ·
  `primera-cita-varices-medellin` = lo práctico en Seravena (qué llevar, cómo agendar, dónde) ·
  `preguntas-primera-cita-piernas` = la lista de preguntas para llevar en el celular.
- **Movimiento:** `ejercicio-para-varices` = deporte y gimnasio si ya tienes várices ·
  `ejercicios-circulacion-casa` = rutina corta sin equipo · `habitos-mejorar-circulacion` =
  costumbres del día, no ejercicios.
- **Trabajo:** `sedentarismo-piernas-venas` = venas y jornada (sentada o de pie) ·
  `lipedema-y-trabajo` = la jornada cuando hay lipedema (ajustes, talento humano).

### Regla 4 (desde 28-sep-2026): foco LOCAL

**Al menos 1 de cada 2 artículos sale de la lista "Temas LOCALES" de abajo**, hasta agotarla.
Todos los demás siguen las reglas de §2b de `INSTRUCCIONES.md` (Medellín/Colombia en el texto).

## Temas LOCALES prioritarios (añadidos el 28-sep-2026 tras la revisión de Search Console)

⚠️ Datos de EPS, precios y normas: SOLO si el Verificador médico los puede respaldar con una fuente
colombiana real (Minsalud, Supersalud, INVIMA). Si no, el artículo explica "de qué depende" sin cifras.

- [publicado] Várices por EPS o consulta particular: diferencias reales en Colombia (Seravena es solo particular; no afirmar coberturas) — várices eps o particular — varices-eps-o-particular — racimo: tratamiento
- [publicado] Lipedema en Colombia: por qué muchas pacientes buscan valoración particular (Seravena es solo particular; no afirmar coberturas) — lipedema valoración particular — lipedema-valoracion-particular — racimo: lipedema
- [publicado] Cuánto cuesta tratar las várices en Colombia y de qué depende — precio tratamiento várices colombia — precio-tratamiento-varices-colombia — racimo: tratamiento
- [descartado] Lipedema en Colombia: por qué tarda tanto el diagnóstico y cómo conseguirlo — lipedema colombia — lipedema-en-colombia-diagnostico — racimo: lipedema (anticanibalización, hallada por el orquestador el 5-oct-2026 antes de escribir: "lipedema-valoracion-particular.html", publicado el 2-oct-2026, ya cubre a fondo esta misma intención de búsqueda -explica que el tiempo promedio hasta el diagnóstico ronda los 20 años, que en Colombia hay pocos especialistas formados, y por qué muchas pacientes optan por una valoración particular- e incluye textualmente la pregunta frecuente "¿Por qué tarda tanto el diagnóstico de lipedema?" en su JSON-LD FAQPage. Un artículo nuevo centrado en lo mismo competiría por la misma intención de búsqueda que ya cubre su hermano reciente. Se elige en su lugar el siguiente tema LOCAL pendiente de la lista.)
- [publicado] Medias de compresión en Colombia: cómo elegirlas, tallas y dónde comprarlas — medias de compresión colombia — medias-compresion-colombia-comprar — racimo: tratamiento
- [publicado] Viajes a tierra caliente: cómo cuidar las piernas si sales de Medellín a la costa — piernas hinchadas viaje calor — piernas-viaje-tierra-caliente — racimo: situaciones
- [publicado] Drenaje linfático en Medellín: cuándo sirve y cómo elegir dónde hacerlo — drenaje linfático medellín — drenaje-linfatico-medellin — racimo: lipedema
- [publicado] Médico vascular o cirujano vascular: a quién consultar por várices en Colombia — médico vascular colombia — medico-vascular-o-cirujano-colombia — racimo: diagnostico
- [publicado] Primera cita por várices en Medellín: qué llevar y qué te van a preguntar — cita várices medellín — primera-cita-varices-medellin — racimo: diagnostico
- [publicado] Caminar las lomas de Medellín: ¿es bueno para las venas y el lipedema? — caminar y circulación — caminar-lomas-medellin-circulacion — racimo: situaciones

---

## Guías madre (escribir cuando su racimo tenga 4+ artículos hijos)

- [publicado] Cómo se diagnostica un problema venoso — cómo se diagnostica un problema venoso — guia-diagnostico-problema-venoso — racimo: diagnostico
- [publicado] Guía completa del lipedema: qué es, etapas, diagnóstico y tratamiento — lipedema — guia-completa-lipedema — racimo: lipedema
- [publicado] Mala circulación en las piernas: guía completa de síntomas — mala circulación piernas — guia-sintomas-mala-circulacion — racimo: sintomas
- [publicado] Tratamientos de várices sin cirugía: guía completa — tratamiento de várices — guia-tratamientos-varices — racimo: tratamiento
- [publicado] Cuidar las piernas en cada etapa de la vida — cuidar las piernas en cada etapa de la vida — guia-piernas-cada-etapa-de-vida — racimo: situaciones


## Salud vascular / venas / várices  ·  racimos: `sintomas`, `tratamiento`, `diagnostico`

- [publicado] Piernas hinchadas al final del día: cuándo preocuparse — piernas hinchadas — piernas-hinchadas-cuando-preocuparse
- [fusionado 2026-10-20 en guia-tratamientos-varices] Várices: por qué aparecen y cómo se tratan hoy sin cirugía — tratamiento de várices sin cirugía — varices-tratamiento-sin-cirugia
- [publicado] Arañitas vasculares en las piernas: causas y soluciones — arañas vasculares — aranitas-vasculares-piernas
- [publicado] Qué es el eco doppler venoso y por qué es clave — eco doppler venoso — eco-doppler-venoso-que-es
- [publicado] Piernas cansadas y pesadas: causas frecuentes — piernas cansadas — piernas-cansadas-causas
- [publicado] Várices en el embarazo: por qué salen y qué hacer — várices en el embarazo — varices-en-el-embarazo
- [fusionado 2026-10-20 en medias-compresion-colombia-comprar] Medias de compresión: para qué sirven y cómo elegirlas — medias de compresión — medias-de-compresion-guia
- [publicado] Insuficiencia venosa crónica: síntomas que no debes ignorar — insuficiencia venosa síntomas — insuficiencia-venosa-sintomas
- [publicado] Calambres nocturnos en las piernas: posibles causas — calambres en las piernas — calambres-piernas-noche
- [publicado] Trombosis venosa: señales de alarma que debes conocer — trombosis venosa síntomas — trombosis-venosa-senales
- [fusionado 2026-10-20 en sedentarismo-piernas-venas] Cómo cuidar tus piernas si trabajas muchas horas de pie — cuidado de piernas de pie — cuidar-piernas-trabajo-de-pie
- [publicado] Escleroterapia: en qué consiste el tratamiento de várices — escleroterapia — escleroterapia-que-es
- [publicado] Hormigueo y picor en las piernas: cuándo es circulatorio — picor en las piernas — picor-piernas-circulacion
- [publicado] Manchas oscuras en tobillos: qué pueden indicar — manchas en los tobillos — manchas-tobillos-causas

## Lipedema  ·  racimo: `lipedema`  ⚠️ PRIORIDAD: 0 artículos publicados

- [publicado] Qué es el lipedema y en qué se diferencia de la obesidad — qué es el lipedema — que-es-el-lipedema
- [publicado] Lipedema o retención de líquidos: cómo distinguirlos — lipedema o retención de líquidos — lipedema-o-retencion-liquidos
- [publicado] Etapas del lipedema: cómo evoluciona — etapas del lipedema — etapas-del-lipedema
- [publicado] Lipedema: por qué la dieta sola no basta — dieta y lipedema — dieta-y-lipedema
- [publicado] Dolor en las piernas por lipedema: cómo se maneja — dolor por lipedema — dolor-lipedema-manejo
- [publicado] Lipedema vs linfedema: diferencias claras — lipedema vs linfedema — lipedema-vs-linfedema
- [publicado] Ejercicio recomendado cuando tienes lipedema — ejercicio y lipedema — ejercicio-lipedema
- [publicado] Diagnóstico del lipedema: cómo se confirma — diagnóstico de lipedema — diagnostico-lipedema
- [publicado] Lipedema y menopausia: por qué se relaciona — lipedema y menopausia — lipedema-y-menopausia
- [publicado] Drenaje linfático en el lipedema: qué esperar — drenaje linfático lipedema — drenaje-linfatico-lipedema

## Bienestar / prevención / estilo de vida  ·  racimo: `situaciones`

- [publicado] 7 hábitos diarios para mejorar la circulación de tus piernas — mejorar circulación piernas — habitos-mejorar-circulacion
- [publicado] Alimentación que favorece la salud vascular — alimentación circulación — alimentacion-salud-vascular
- [publicado] Viajes largos: cómo cuidar tus piernas en avión o carro — piernas en viajes largos — cuidar-piernas-viajes-largos
- [fusionado 2026-10-20 en piernas-viaje-tierra-caliente] Calor y piernas hinchadas: por qué empeora en verano — piernas hinchadas por calor — piernas-hinchadas-calor
- [publicado] Ejercicios sencillos para activar la circulación en casa — ejercicios circulación piernas — ejercicios-circulacion-casa

## Para profesionales de la salud

- [publicado] Cuándo derivar a un paciente al especialista vascular — derivación vascular — cuando-derivar-especialista-vascular
- [publicado] Señales de lipedema que el médico de primer contacto debe reconocer — sospecha de lipedema — senales-lipedema-primer-contacto

---

## Banco de ángulos de contenido (para dar variedad, no solo "explicativos")

Seravena = clínica **vascular + lipedema**. Combinar formatos mantiene el blog fresco y capta
distintos tipos de búsqueda. Ideas por formato:

**Mitos y verdades**
- [publicado] Mitos sobre las várices que conviene desmentir — mitos varices — mitos-varices
- [publicado] Lipedema: 5 mitos que retrasan el diagnóstico — mitos lipedema — mitos-lipedema
- [publicado] "Las medias de compresión curan las várices" y otros mitos — mitos medias compresion — mitos-medias-compresion

**Comparativas (muy buscadas)**
- [publicado] Várices vs arañitas vasculares: ¿son lo mismo? — varices vs aranitas — varices-vs-aranitas
- [publicado] Escleroterapia vs láser para várices: diferencias — escleroterapia vs laser — escleroterapia-vs-laser
- [descartado] Lipedema, obesidad y linfedema: cómo diferenciarlos — lipedema obesidad linfedema — lipedema-obesidad-linfedema (anticanibalización, hallada por el orquestador el 11-sep-2026 antes de escribir: dos de los tres ejes que proponía este tema ya están cubiertos con la misma intención de búsqueda por artículos existentes — la diferencia con la obesidad la explica a fondo "que-es-el-lipedema.html" y la diferencia con el linfedema la explica a fondo "lipedema-vs-linfedema.html" — y además "mitos-lipedema.html", publicado el 10-sep-2026 (el día anterior), desmiente explícitamente como mitos "que es lo mismo que la obesidad" y "que es lo mismo que el linfedema"; un tercer artículo sobre las tres diferenciaciones juntas no aportaría intención de búsqueda nueva y competiría por posicionamiento con sus propios hermanos. Se elige en su lugar el siguiente tema pendiente de temas.md.)

**Guías prácticas / "cómo"**
- [publicado] Cómo saber si tienes lipedema: señales para autoevaluarte — cómo saber si tengo lipedema — como-saber-si-tengo-lipedema
- [publicado] Cómo prepararte para tu primera valoración vascular — primera valoración vascular — preparar-valoracion-vascular
- [publicado] Qué esperar de un eco doppler venoso, paso a paso — eco doppler paso a paso — eco-doppler-paso-a-paso

**Estacional / momento de vida**
- [descartado] Cuidado de las piernas en época de calor — piernas calor — cuidado-piernas-calor (anticanibalización: solapa casi por completo con "piernas-hinchadas-calor", publicado el 28-ago-2026 con la keyword "piernas hinchadas por calor")
- [descartado] Várices y embarazo: antes, durante y después — varices embarazo — varices-embarazo-guia (anticanibalización: solapa casi por completo con "varices-en-el-embarazo", publicado el 2-ago-2026 con la keyword "várices en el embarazo" y la misma intención de búsqueda)
- [descartado] Lipedema en la menopausia: qué cambia — lipedema menopausia — lipedema-menopausia-cambios (anticanibalización, hallada en la revisión semanal del 6-sep-2026: solapa casi por completo con "lipedema-y-menopausia.html", publicado el 19-ago-2026 con la keyword "lipedema y menopausia" y la misma intención de búsqueda; esta semana se amplió y mejoró ese mismo artículo en vez de crear uno nuevo)

**Emocional / calidad de vida (conecta con la marca)**
- [publicado] Vivir con lipedema: cómo cuidar también la salud emocional — lipedema salud emocional — lipedema-salud-emocional
- [publicado] Cuando te dicen "es solo estético": por qué tus piernas importan — piernas no es estético — piernas-no-solo-estetico

**Preguntas frecuentes reales de pacientes**
- [publicado] ¿Las várices se pueden quitar para siempre? — quitar varices para siempre — quitar-varices-para-siempre
- [publicado] ¿El lipedema se puede curar? Lo que sí se puede hacer — lipedema tiene cura — lipedema-tiene-cura

> Nota para el equipo: mantener equilibrio entre los dos pilares (vascular y lipedema) y
> alternar formatos. Confirmar siempre con la clínica qué tratamientos ofrece Seravena antes de
> describirlos como disponibles.

---

## Temas nuevos (añadidos por el orquestador el 12-sep-2026 — quedaba solo 1 pendiente)

- [publicado] Úlceras venosas en las piernas: por qué aparecen y cómo se cuidan — úlceras venosas piernas — ulceras-venosas-piernas
- [publicado] Flebitis superficial: síntomas y qué hacer — flebitis superficial síntomas — flebitis-superficial-sintomas
- [publicado] Cómo elegir un buen especialista vascular — elegir especialista vascular — como-elegir-especialista-vascular
- [publicado] Anticonceptivos hormonales y várices: lo que dice la evidencia — anticonceptivos y várices — anticonceptivos-y-varices
- [publicado] ¿Las várices se heredan? Lo que influye la genética — várices hereditarias — varices-hereditarias-genetica
- [publicado] Ropa cómoda para el lipedema: cómo vestir con confianza — ropa para lipedema — ropa-comoda-lipedema
- [publicado] Lipedema y embarazo: qué cambia y qué cuidar — lipedema y embarazo — lipedema-y-embarazo
- [publicado] Compresión para lipedema: en qué se diferencia de la de várices — compresión para lipedema — compresion-para-lipedema
- [publicado] Piel y lipedema: cuidados básicos que ayudan — piel y lipedema — piel-y-cuidados-lipedema
- [publicado] Lipedema y vida laboral: adaptaciones que marcan la diferencia — lipedema y trabajo — lipedema-y-trabajo

## Temas nuevos (añadidos por el orquestador el 19-sep-2026 — quedaban solo 4 pendientes)

- [publicado] Sedentarismo y salud venosa: cómo el trabajo sentado afecta tus piernas — sedentarismo y venas — sedentarismo-piernas-venas
- [publicado] Ejercicio de bajo impacto recomendado si tienes várices — ejercicio para várices — ejercicio-para-varices
- [publicado] Tabaco, alcohol y salud vascular: qué relación existe — tabaco y circulación — tabaco-alcohol-circulacion
- [publicado] Diabetes y salud vascular de las piernas: qué vigilar — diabetes y circulación piernas — diabetes-circulacion-piernas
- [publicado] Lipedema y sueño: por qué el dolor nocturno interrumpe el descanso — lipedema y sueño — lipedema-y-sueno
- [descartado] Actividades acuáticas y lipedema: por qué pueden ayudar — natación y lipedema — natacion-y-lipedema (anticanibalización, hallada por el orquestador el 30-sep-2026 antes de escribir: "ejercicio-lipedema.html", publicado el 17-ago-2026, ya dedica una sección H3 completa a "El agua, tu gran aliada" -natación y aquagym como opción principal- y su meta `keywords` incluye explícitamente "natación lipedema" y "ejercicio en agua para lipedema"; un artículo nuevo centrado solo en natación competiría por la misma intención de búsqueda que ya cubre ese hermano. Se elige en su lugar el siguiente tema pendiente de temas.md.)
- [publicado] Cómo hablar con tu familia sobre el lipedema — hablar en familia sobre lipedema — hablar-en-familia-lipedema
- [descartado] Alimentación antiinflamatoria y lipedema: qué dice la evidencia — alimentación antiinflamatoria lipedema — alimentacion-antiinflamatoria-lipedema (anticanibalización, hallada por el orquestador el 9-oct-2026 antes de escribir: "dieta-y-lipedema.html", publicado y vivo, ya dedica un punto completo a "patrones de alimentación de tipo antiinflamatorio —ricos en verduras, frutas, pescado, aceite de oliva y frutos secos, con menos ultraprocesados, azúcar refinada y sal—" asociados a menos dolor e inflamación, con la misma evidencia que cubriría este tema. Un artículo nuevo centrado solo en eso competiría por la misma intención de búsqueda que ya cubre ese hermano. Se elige en su lugar el siguiente tema pendiente de temas.md.)
- [publicado] Preguntas para hacerle a tu médico en tu primera cita por piernas hinchadas — preguntas primera cita piernas — preguntas-primera-cita-piernas — racimo: diagnostico
- [descartado] Antecedentes familiares y salud vascular: qué preguntar en casa — antecedentes familiares várices — antecedentes-familiares-varices (anticanibalización, hallada por el orquestador el 10-oct-2026 antes de escribir: "varices-hereditarias-genetica.html", publicado el 18-sep-2026, ya cubre a fondo esta misma intención de búsqueda -su propia meta `keywords` incluye textualmente "antecedentes familiares de várices" y el post-lead ya pregunta y responde "qué puedes hacer si tienes antecedentes familiares"-. Un artículo nuevo centrado en qué preguntar en casa sobre antecedentes familiares competiría por la misma intención de búsqueda que ya cubre ese hermano. Como no quedaba ningún tema más pendiente, el orquestador añadió 10 temas nuevos a continuación y tomó el primero de ellos.)

## Temas nuevos (añadidos por el orquestador el 10-oct-2026 — no quedaba ningún tema pendiente)

- [publicado] Várices y menopausia: qué cambia en esta etapa — várices y menopausia — varices-y-menopausia — racimo: situaciones
- [publicado] Cirugía de várices o tratamiento sin cirugía: cómo decidir — cirugía de várices o sin cirugía — varices-cirugia-o-sin-cirugia — racimo: tratamiento
- [publicado] Lipedema en los brazos: no solo son las piernas — lipedema en los brazos — lipedema-en-los-brazos — racimo: lipedema
- [publicado] Lipedema en la adolescencia: señales tempranas que no hay que ignorar — lipedema en adolescentes — lipedema-en-adolescentes — racimo: lipedema
- [publicado] ¿Se puede prevenir el lipedema? Lo que sí está en tus manos — prevención del lipedema — prevencion-del-lipedema — racimo: lipedema
- [publicado] Cuidados después de la escleroterapia: qué hacer los primeros días — cuidados después de escleroterapia — cuidados-despues-escleroterapia — racimo: tratamiento
- [publicado] Automasaje para piernas pesadas: qué puedes hacer en casa — automasaje piernas pesadas — automasaje-piernas-pesadas — racimo: situaciones
- [publicado] Zapatos y tacones: ¿empeoran las várices? — tacones y várices — tacones-y-varices — racimo: sintomas
- [publicado] ¿Qué es la "piel de naranja" y qué tiene que ver con el lipedema? — piel de naranja lipedema — piel-de-naranja-lipedema — racimo: lipedema
- [publicado] Medias de compresión en el embarazo: cuándo empezar a usarlas — medias de compresión embarazo — medias-compresion-embarazo — racimo: tratamiento

## Temas nuevos (añadidos por el orquestador el 19-oct-2026 — no quedaba ningún tema pendiente)

- [publicado] Medias de compresión para volar: qué cambia frente a las de uso diario — medias de compresión avión — medias-compresion-para-volar — racimo: tratamiento
- [publicado] Insuficiencia venosa en hombres: por qué se consulta menos — insuficiencia venosa en hombres — insuficiencia-venosa-en-hombres — racimo: diagnostico
- [publicado] Piernas hinchadas antes de la menstruación: por qué pasa cada mes — piernas hinchadas menstruación — piernas-hinchadas-menstruacion — racimo: sintomas
- [publicado] Lipedema y resistencia a la insulina: qué dice la evidencia — lipedema resistencia a la insulina — lipedema-resistencia-insulina — racimo: lipedema
- [publicado] Lipedema en cadera y glúteos: cómo se reconoce — lipedema en cadera y glúteos — lipedema-cadera-gluteos — racimo: lipedema
- [publicado] Celulitis o lipedema: cómo diferenciarlos a simple vista — celulitis o lipedema — celulitis-o-lipedema — racimo: lipedema
- [publicado] Yoga y pilates si tienes piernas pesadas o várices: qué considerar — yoga para la circulación — yoga-pilates-circulacion-piernas — racimo: situaciones
- [publicado] Dolor de espalda baja y piernas pesadas: ¿están relacionados? — dolor de espalda y piernas pesadas — dolor-espalda-piernas-pesadas — racimo: sintomas
- [publicado] Lipedema después de una cirugía bariátrica: qué cambia y qué no — lipedema cirugía bariátrica — lipedema-cirugia-bariatrica — racimo: lipedema
- [publicado] Medias de compresión en el posparto: cuánto tiempo seguir usándolas — medias de compresión posparto — medias-compresion-posparto — racimo: tratamiento

## Tema fijado por Laura (22-sep-2026)

- [publicado] Antes de elegir dónde tratar tu lipedema: qué preguntar y qué revisar (antes "Cómo elegir una clínica de lipedema en Medellín"; retitulado el 7-nov-2026 porque esa búsqueda es de `clinica-lipedema-medellin`) — dónde tratar el lipedema — como-elegir-clinica-lipedema-medellin

## Temas nuevos (añadidos por el orquestador el 30-oct-2026 — no quedaba ningún tema pendiente; racimo más flojo según registro.md: `diagnostico`)

- [publicado] Cómo leer el informe de tu eco doppler venoso: qué significan sus términos — informe eco doppler venoso — leer-informe-eco-doppler-venoso — racimo: diagnostico
- [publicado] Qué preguntar antes de hacerte un eco doppler venoso en Medellín — eco doppler venoso dudas — dudas-antes-eco-doppler-venoso — racimo: diagnostico
- [publicado] Flebectomía ambulatoria: en qué consiste y cuándo se recomienda — flebectomía ambulatoria — flebectomia-ambulatoria-que-es — racimo: tratamiento
- [publicado] Escleroterapia con espuma: en qué se diferencia de la tradicional — escleroterapia con espuma — escleroterapia-con-espuma — racimo: tratamiento
- [publicado] Tipos de lipedema según la zona afectada: I, II, III, IV y V — tipos de lipedema — tipos-de-lipedema-zonas — racimo: lipedema
- [publicado] Vendaje multicapa para lipedema: cuándo usarlo — vendaje multicapa lipedema — vendaje-multicapa-lipedema — racimo: lipedema
- [publicado] Lipedema y los días de más calor en Medellín: por qué se siente peor la pierna — lipedema calor Medellín — lipedema-dias-calor-medellin — racimo: lipedema
- [publicado] Pies fríos y piernas pesadas: ¿circulación arterial o venosa? — pies fríos circulación piernas — pies-frios-circulacion-arterial-venosa — racimo: sintomas
- [publicado] Piel brillante y tensa en las piernas: qué puede significar — piel tensa y brillante piernas — piel-tensa-brillante-piernas — racimo: sintomas
- [en reserva desde el 7-nov-2026: sin búsqueda real que lo respalde; ver "Reserva" arriba] Muchas horas en el carro por el tráfico de Medellín: cómo cuidar tus piernas — piernas hinchadas tráfico Medellín — piernas-trafico-medellin-carro — racimo: situaciones
