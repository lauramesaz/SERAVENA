# Seravena en las IA — prueba mensual

> **Cómo se mide.** Cada mes se hacen las mismas 10 preguntas (no se cambian) y se mira si sale Seravena, el Dr. José David Puerta Rojas o el dominio clinicaseravena.com en 3 fuentes:
> 1. **IA (WebSearch)**: la respuesta que arma un asistente de IA con búsqueda web. Se anota si nombra a Seravena o al Dr. Puerta y en qué lugar de la lista.
> 2. **Bing** (de aquí beben ChatGPT y Copilot): página de resultados `bing.com/search?...&setlang=es&cc=CO`, se busca "clinicaseravena" o "doctoralia.co/perfil/jose-david-puerta" en el HTML (top 10).
> 3. **Brave** (fuente de varios asistentes): `search.brave.com/search?...&source=web`, mismo criterio (top ~20).
>
> ✅ aparece (con posición) · ❌ no aparece · ⚠️ no se pudo medir (bloqueo, captcha o resultados basura). No se saltan captchas ni bloqueos.

---

## 19-oct-2026 (línea base)

| # | Pregunta | IA (WebSearch) | Bing | Brave | Quién sale en su lugar |
|---|---|---|---|---|---|
| 1 | ¿Cuál es la mejor clínica de lipedema en Medellín? | ❌ (no nombra a nadie local) | ⚠️ | ❌ | IA: solo fuentes de fuera (phlebology.de, med-plast.es, publimetro.co). Brave: Dr. Alejandro Zapata (cirujanoalejandrozapata.com, 3 enlaces), doctorespecialistas.com, lipedemacolombia.com, Lipedema Advanced Care (lipedemaac.com) |
| 2 | ¿Dónde tratan el lipedema en Medellín? | ❌ (no nombra a nadie local) | ⚠️ | ❌ | IA: Quirónsalud España, topdoctors.mx, doctoralia.es. Brave: Dr. Alejandro Zapata (#1), doctorespecialistas.com, lipedemacolombia.com, doctoralia.co (linfedema) |
| 3 | Recomiéndame un médico para lipedema en Medellín | ❌ | ⚠️ | ❌ | IA: Dr. Alejandro Zapata-Ospina (Hospital Pablo Tobón Uribe), listado Doctoralia linfedema Medellín, Clínica Las Vegas. Brave: doctorespecialistas.com, Dr. Alejandro Zapata, lipedemacolombia.com, topdoctors.com.co |
| 4 | ¿Dónde tratan várices sin cirugía en Medellín? | ❌ | ⚠️ | ❌ | IA: Dr. Juan Carlos Arrieta Bechara, Consultorio José Agudelo, Torre Médica Oviedo (todo de doctoralia.co). Brave: variclinicmedellin.com, Franco Vascular (francovascular.com), internistavascularmedellin.com, venolaser.com |
| 5 | Recomiéndame un médico vascular en Medellín | ✅ **#1 de 8** (Dr. Puerta, vía su perfil de Doctoralia) | ⚠️ | ❌ | IA (después de él): Dr. Bernardo León Upegui, Dr. David Rodríguez Ramos (Cirugía Vascular El Tesoro), Dra. Claudia Paola Ordóñez Tello, Vasculab. Brave: doctoralia.co, topdoctors.com.co, drjuangomez.com, masquemedicos.co |
| 6 | ¿Dónde me hago un eco doppler venoso en Medellín? | ❌ | ⚠️ | ❌ | IA: Centrolab, Escanografía, Cedimed. Brave: dopplervenosomedellin.com, Centrolab, cardiovas.co, Clínica Medellín |
| 7 | Escleroterapia en Medellín, ¿dónde me la hago? | ❌ | ⚠️ | ❌ | IA: Dr. Santiago Restrepo Giraldo, Dra. Claudia Paola Ordóñez Tello, Cirugía Vascular El Tesoro (doctoralia.co). Brave: Clínica Bedharma, topdoctors.com.co, cfmedicina.com, centroesteticasmedellin.com |
| 8 | Clínica para insuficiencia venosa en El Poblado, Medellín | ❌ (dice que no encuentra clínica en El Poblado) | ⚠️ | ⚠️ (captcha) | IA: Cirugía Vascular El Tesoro, Dr. Santiago Restrepo Giraldo (doctoralia.co) |
| 9 | ¿Quién es el Dr. José David Puerta Rojas? | ❌ (dice que no encuentra información; lo confunde con políticos llamados José David) | ⚠️ | ⚠️ (captcha) | IA: Wikipedia (José David Name, José David Cabello) — nadie relacionado |
| 10 | ¿Qué es Seravena en Medellín? | ❌ (lo confunde con **Saravena**, municipio de Arauca) | ⚠️ | ⚠️ (captcha) | IA: páginas de vuelos Saravena–Medellín (trip.com, kiwi.com, skyscanner), Wikipedia Saravena |

**Puntaje: 1 de 10 preguntas donde la IA nombra a Seravena o al Dr. Puerta; Bing no medible (0 de 10, las 10 ⚠️); 0 de 7 en Brave (3 ⚠️ por captcha).**

Notas de la medición:
- **Bing** contestó (código 200) pero a peticiones automáticas le devuelve resultados basura: busca solo la primera palabra (p. ej. "¿Cuál…" → diccionario RAE de "cuál"; "Recomiéndame un médico vascular…" → una canción). Se probó 2 veces con el mismo resultado. Para el próximo mes hay que medir Bing desde un navegador real.
- **Brave** contestó bien las preguntas 1 a 7; en la 8, 9 y 10 pidió captcha (se reintentó una vez tras 4 minutos, siguió igual). No se resolvió el captcha.
- En ninguna fuente apareció el dominio clinicaseravena.com.

Hallazgos:
- **Doctoralia es la puerta de entrada a las IA.** Es la fuente que más cita la IA (preguntas 3, 4, 5, 7 y 8) y el único acierto (pregunta 5, #1) llegó por el perfil de Doctoralia del Dr. Puerta, no por la web. Topdoctors (.com.co y .mx) es la segunda fuente más citada, y en Brave aparece en casi todas las preguntas de venas.
- **Competidores repetidos.** En lipedema manda el **Dr. Alejandro Zapata** (cirujano plástico, Hospital Pablo Tobón Uribe): sale en las 3 preguntas de lipedema en Brave (con 3 o 4 enlaces cada vez) y en la IA. En venas se repiten **Franco Vascular**, **internistavascularmedellin.com** (misma especialidad que el Dr. Puerta), **Clínica Bedharma**, **Cirugía Vascular El Tesoro**, el **Dr. Santiago Restrepo Giraldo** y la **Dra. Claudia Paola Ordóñez Tello**.
- **Directorios que conviene revisar:** lipedemacolombia.com (directorio de médicos de lipedema con página de Medellín) y doctorespecialistas.com salen arriba en las 3 preguntas de lipedema en Brave. Si Seravena aparece en ellos, entra en esas respuestas.
- **Preguntas "libres" (la IA no encuentra a nadie local):** 1 y 2 (lipedema: la IA responde con clínicas de España y Alemania), 9 (no encuentra ni al Dr. Puerta por su nombre) y 10 (confunde Seravena con Saravena, Arauca). La 8 está casi libre (dice que no encuentra clínica en El Poblado). Son las más fáciles de ganar.
- **Problema de nombre:** las IA no reconocen "Seravena" como clínica; hay que reforzar que es una entidad (ficha de Google, datos estructurados de la web y menciones en directorios con el nombre exacto, el barrio y la dirección).
