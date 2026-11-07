# Mapa de palabras · Seravena

> Una búsqueda (o familia de búsquedas parecidas) = **una sola página dueña**. Si dos páginas propias
> responden lo mismo, Google escoge una, ignora la otra y a veces no sube ninguna.
>
> Quién lo lee: el redactor y el juez SEO antes de cada artículo nuevo, el robot en los días de mejora,
> la revisión SEO de los lunes, el analista y el estratega.
> Quién lo cambia: Claude en sesión, o la revisión SEO de los lunes cuando aparece una búsqueda nueva en
> Colombia (anotando la fecha y el dato). Ninguna rutina borra filas: si una página cambia de dueña, se
> tacha la fila vieja y se escribe la nueva con la fecha.
>
> Datos de esta versión: Search Console con el usuario robot, **solo Colombia**, 8-ago a 5-nov-2026
> (90 días), leídos el 7-nov-2026. Para los demás países se usa `registro-seo-semanal.md`.
> Cuando exista `seguimiento-busquedas.py` (tarea SER-01), sus números reemplazan a los de aquí.
> "Apar." = veces que la web apareció en Google para esa búsqueda; "pos." = posición media.

---

## 1. Las 15 búsquedas objetivo y su página dueña

Son las 15 del plan de 90 días (SER-01). Ninguna la puede tomar un artículo del blog.

| # | Búsqueda (y variantes) | Página dueña | Cómo va en Colombia (90 días) |
|---|---|---|---|
| 1 | lipedema Medellín | `/lipedema` | 9 apar. a la página, pos. 45 (casi todas por "lipedema bogota") |
| 2 | clínica de lipedema Medellín | `/clinica-lipedema-medellin` | 11 apar., pos. 20 |
| 3 | precio / cuánto cuesta el tratamiento de lipedema | `/precio-lipedema-medellin` | sin datos todavía (página nueva) |
| 4 | médico para lipedema Medellín | `/dr-jose-david-puerta-rojas` | sin datos en Colombia; "medico vascular lipedema" (2 apar., pos. 5) hoy cae en `/clinica-lipedema-medellin` |
| 5 | cómo saber si tengo lipedema | `blog/como-saber-si-tengo-lipedema` (provisional: lo decide SER-15) | 2 apar. en Colombia, pos. 55, en `senales-lipedema-primer-contacto`; en España más de 600 apar. repartidas |
| 6 | tratamiento de várices Medellín / várices sin cirugía Medellín | `/varices-medellin` | sin datos |
| 7 | escleroterapia Medellín | `/escleroterapia-medellin` | "escleroterapia en medellin" pos. 5 y 68; "escleroterapia medellin" pos. 32 y 69 (la segunda posición de cada una es `/insuficiencia-venosa`: hay que reforzar la dueña) |
| 8 | escleroterapia con espuma (precio, dónde) | `/escleroterapia-medellin#espuma` (la sección la crea SER-26) | sin datos. La duda informativa ("qué es", "qué se siente") es de `blog/escleroterapia-con-espuma` |
| 9 | endoláser / láser endovenoso Medellín | `/endolaser-varices-medellin` (**por crear**, SER-25) | sin datos en Colombia. Mientras no exista, nadie toma esta búsqueda; `blog/escleroterapia-vs-laser` se queda con "escleroterapia o láser" |
| 10 | eco doppler venoso Medellín | `/eco-doppler-venoso-medellin` | 63 apar., pos. 83 ("doppler venoso" 11, "ecografia doppler venoso" 6, "eco doppler" 5, "eco doppler venoso" 5) |
| 11 | precio del eco doppler venoso | `/eco-doppler-venoso-medellin` | "examen doppler venoso precio" 5, "ecografia doppler de vasos venosos de miembros inferiores valor" 4, "doppler venoso precio" 3, "precio doppler venoso" 3, "...costo" 1: unas 16 apar., pos. 50-99 |
| 12 | insuficiencia venosa Medellín | `/insuficiencia-venosa` | 2 apar., pos. 68 (por escleroterapia, no por su búsqueda) |
| 13 | médico vascular Medellín | `/vascular` | "medico vascular" 1 apar., pos. 76, en un artículo |
| 14 | programa para bajar de peso Medellín | `/obesidad-medellin` | sin datos todavía |
| 15 | médico para bajar de peso Medellín | `/obesidad-medellin` | sin datos todavía |

Otras búsquedas comerciales con dueña fija: "precios" de lipedema, várices y peso → `/precios`;
"lipedema en Colombia", "lipedema Bogotá", "si no vives en Medellín" → `/lipedema-colombia` (SER-33);
"Seravena", "Seravena clínica" → portada (`/`) y `/contacto`.

## 2. Frases que un artículo NO puede usar en `<title>`, `<h1>`, `og:title` ni `headline`

Son de las páginas de la sección 1. Valen también con "en El Poblado", "precio", "cuánto cuesta",
"mejor", "dónde", "cerca de mí" y sin tildes. Un artículo puede nombrarlas dentro del texto y enlazar a
su dueña desde el primer párrafo, pero nunca ponerlas en esos cuatro lugares.

- lipedema en Medellín · tratamiento de lipedema en Medellín · diagnóstico de lipedema en Medellín
- clínica de lipedema (en Medellín) · dónde tratar el lipedema en Medellín · especialista en lipedema en Medellín
- precio / costo / cuánto cuesta el tratamiento de lipedema · programa de lipedema
- médico para lipedema en Medellín · médico vascular en Medellín · flebólogo en Medellín
- tratamiento de várices en Medellín · várices sin cirugía en Medellín · quitar várices en Medellín
- escleroterapia en Medellín · escleroterapia con espuma (precio o Medellín)
- endoláser en Medellín · láser endovenoso en Medellín · precio del endoláser
- eco doppler venoso en Medellín · precio / valor / costo del eco doppler (o doppler venoso, o ecografía doppler de vasos venosos)
- insuficiencia venosa en Medellín
- bajar de peso en Medellín · programa para bajar de peso · médico para bajar de peso · cuánto cuesta un programa para bajar de peso
- precios de Seravena · lipedema en Colombia · lipedema en Bogotá (y otras ciudades)
- especialista(s) en lipedema · médico vascular para lipedema · qué médico trata el lipedema (son de `/clinica-lipedema-medellin`, con o sin Medellín)

## 3. Búsquedas informativas grandes y su artículo dueño

Cuando dos artículos responden lo mismo, el dueño es el de esta tabla: los demás enlazan a él y no
repiten su título. Los datos de Colombia son de 90 días; entre paréntesis, lo que dice el registro de
los demás países.

| Búsqueda o familia | Artículo dueño | Los parientes y su ángulo | Colombia (90 días) |
|---|---|---|---|
| cómo saber si tengo lipedema · lipedema cómo identificar · cómo diagnosticar lipedema · test de lipedema | `como-saber-si-tengo-lipedema` (provisional hasta SER-15) | `/test-lipedema` = el test de 10 preguntas · `diagnostico-lipedema` = cómo lo confirma el médico · `senales-lipedema-primer-contacto` = para médicos | 2 apar. (España: más de 600, posición 51-73) |
| etapas · fases · grados del lipedema | `etapas-del-lipedema` | `tipos-de-lipedema-zonas` = tipos según la zona | sin datos (España "fases del lipedema" 15, pos. 65) |
| medias de compresión (cuáles, tallas, dónde comprar en Colombia) · medias médicas · medias ortopédicas | `medias-compresion-colombia-comprar` | embarazo = `medias-compresion-embarazo` · lipedema = `compresion-para-lipedema` · avión = `medias-compresion-para-volar` · posparto = `medias-compresion-posparto` · mitos = `mitos-medias-compresion` | **la búsqueda no de marca más grande de Colombia**: "medias de compresion" 21 (pos. 20) + "medias de compresión" 21 (pos. 14); "medias medicas" 2 (pos. 9); "medias de compresión colombia" 1 (pos. 17) |
| flebitis · síntomas de flebitis · flebitis en la pierna · tromboflebitis superficial | `flebitis-superficial-sintomas` | flebitis en el brazo = artículo nuevo de la cola (`flebitis-en-el-brazo`) | "flebitis pierna" 2, "síntomas de flebitis" 1, "flebitis consecuencias" 1 (España "flebitis" 42, pos. 34) |
| picor · rasquiña · picazón en las piernas | `picor-piernas-circulacion` | — | "rasquiña en las piernas" 2 (pos. 65), "picazon en las piernas" 1 (España: cerca de 300 apar. en variantes de "picor") |
| calambres en las piernas (de noche, en la pantorrilla, causas) · dolor de piernas en la noche | `calambres-piernas-noche` | lipedema y dolor nocturno = `lipedema-y-sueno` (va en posición 16 para "porque duelen las piernas por dentro en la noche"). El dolor nocturno que no es calambre se responde dentro de `calambres-piernas-noche` (banco de mejoras), no en un artículo nuevo: `dolor-piernas-noche-por-dentro` se descartó el 7-nov por gemelo (0,52) | unas 10 apar. en 9 variantes ("calambres en las piernas causas" pos. 8) |
| especialidad vascular · angiología · cirugía vascular · angiólogo o flebólogo · cómo se llama el médico de las venas | `medico-vascular-o-cirujano-colombia` | `como-elegir-especialista-vascular` (gemelo posible, 0,64 en buscar-gemelos del 28-oct: lo revisa el analista) | unas 65 apar. ("especialidad vascular" 24, "cirugía vascular especialidad" 11, "angiología especialidad" 8, "cirugía vascular y angiología" 8), pos. 35-84 |
| qué es el doppler venoso · ecografía doppler de vasos venosos de miembros inferiores (el nombre de la orden) | `eco-doppler-venoso-que-es` | con precio, valor o Medellín = `/eco-doppler-venoso-medellin` | unas 40 apar. a este artículo en 20 variantes (pos. 25-92); el nombre de la orden, unas 10 |
| cómo se hace / cómo se realiza el doppler venoso de miembros inferiores · eco doppler piernas | `eco-doppler-paso-a-paso` | preparación, ayuno, medicamentos = `dudas-antes-eco-doppler-venoso` · el informe = `leer-informe-eco-doppler-venoso` | unas 13 apar., pos. 44-74 |
| exámenes para la circulación · estudio de las venas | **sin dueño**: artículo nuevo de la cola (`examenes-circulacion-piernas`) | hoy lo muestra `/proceso`, que no responde eso | 6 apar. (pos. 80-98) |
| drenaje linfático en Medellín · quién hace drenaje linfático | `drenaje-linfatico-medellin` (no tocar antes del 23-nov) | drenaje en el lipedema = `drenaje-linfatico-lipedema` | 5 apar. (pos. 24) + "quien hace drenaje linfatico" 2 (pos. 9,5) |
| ¿la EPS cubre las várices / la escleroterapia? | `varices-eps-o-particular` | lipedema = `lipedema-valoracion-particular` | 3 apar. (pos. 3-14) |
| úlceras venosas | `ulceras-venosas-piernas` | — | 5 apar. (pos. 68-86) |
| trombosis venosa (síntomas, cómo empieza) | `trombosis-venosa-senales` | — | 3 apar. (pos. 65-77) |
| ejercicios para la circulación de las piernas | `ejercicios-circulacion-casa` | deporte con várices = `ejercicio-para-varices` · hábitos = `habitos-mejorar-circulacion` | unas 8 apar. (pos. 20-57) |
| cirugía de várices · varicectomía | `varices-cirugia-o-sin-cirugia` = cómo decidir · **varicectomía = artículo nuevo de la cola** (`varicectomia-que-es`) | `flebectomia-ambulatoria-que-es` | "varicectomia" 2 (pos. 51), "cirugia de vena varice" 1 |
| venas o várices (venas que se notan) | **sin dueño**: artículo nuevo de la cola (`venas-marcadas-o-varices`) | `varices-vs-aranitas` = várices frente a arañitas | 2 apar. (pos. 77-89) |
| especialistas en lipedema · médico vascular para lipedema · qué médico trata el lipedema | `/clinica-lipedema-medellin` (página que vende; ningún artículo la toma) | el médico = `/dr-jose-david-puerta-rojas` · la guía para médicos de primer contacto = `/guia-lipedema-medicos` (recibe "lipedema que medico lo trata", solo España) | "especialistas en lipedema" 2 y "medico vascular lipedema" 2 (posición 5, con la página de la clínica). Nadie en Colombia buscó "qué médico trata el lipedema" tal cual. `que-medico-trata-el-lipedema` salió de la cola el 7-nov |

## 4. Búsquedas sin página dueña (de aquí sale el artículo nuevo cuando la cola se vacía)

Cada fila es una búsqueda real de Colombia que ninguna página responde todavía. Cuando se escribe el
artículo, la fila pasa a la sección 3 con su dueño.

| Búsqueda | Dato (Colombia, 90 días) | Estado |
|---|---|---|
| exámenes para la circulación de las piernas | 6 apar. | en la cola: `examenes-circulacion-piernas` |
| flebitis en el brazo | 2 apar. (36 en todos los países) | en la cola: `flebitis-en-el-brazo` |
| varicectomía | 3 apar. | en la cola: `varicectomia-que-es` |
| venas o várices | 2 apar. | en la cola: `venas-marcadas-o-varices` |

Si todas están "en la cola" o "publicado" y la cola no tiene pendientes, el día es de mejora.

Salieron de esta tabla en la revisión del 7-nov-2026 y **no se escriben**: "qué médico trata el lipedema" (sus búsquedas en Colombia, "especialistas en lipedema" y "medico vascular lipedema", son de `/clinica-lipedema-medellin`, sección 3) y "dolor de piernas en la noche" (gemelo de `calambres-piernas-noche`; es una mejora del banco, sección 5).

## 5. Banco de mejoras con búsquedas de Colombia (para los días de mejora)

Ordenado por apariciones en Colombia. Antes de tocar un artículo:
- mira su `dateModified` en el JSON-LD: si es de hace menos de 21 días, salta al siguiente (no uses
  `git log`: los cambios del pie tocan todos los archivos a la vez);
- mira las fechas de "no tocar" de `registro-seo-semanal.md` (esas fechas protegen título y descripción;
  el cuerpo se puede mejorar si el `dateModified` lo permite);
- si está entre los 3 primeros `[pendiente]` de `humanizados.md`, déjalo para cuando lo humanicen.

Qué se hace en una mejora (siempre igual): sección "Fuentes" con 2 a 5 referencias reales que el
verificador médico abre; un enlace desde el primer párrafo a su página que vende; usar con naturalidad
la búsqueda de Colombia que no está atendiendo (en un H2, una pregunta frecuente o el cuerpo, nunca
forzada); revisar los enlaces internos; si el artículo está en `revisados-medico.md`, la firma del médico.

| Artículo | Búsqueda de Colombia que no atiende bien | Qué le falta | Se puede desde |
|---|---|---|---|
| `medico-vascular-o-cirujano-colombia` | "especialidad vascular" y familia: unas 65 apar., pos. 35-84 | sección corta sobre la especialidad (angiología y cirugía vascular en Colombia) y la pregunta "¿cómo se llama el médico de las venas?"; enlaces a `/vascular` y `/dr-jose-david-puerta-rojas` | ya |
| `medias-compresion-colombia-comprar` | "medias de compresión" 42 apar. (pos. 14-20), "medias medicas" (pos. 9), "medias ortopedicas", "medias compresivas" | sección "Medias médicas, ortopédicas o antiembólicas: ¿son lo mismo?" | 22-nov |
| `eco-doppler-venoso-que-es` | el nombre de la orden "ecografía doppler de vasos venosos de miembros inferiores": unas 10 apar. (más 5 con "valor" o "costo", que son de la página de servicio) | explicar ese nombre y la pregunta "¿es lo mismo que el eco doppler venoso?"; nada de precio (es de la página de servicio) | 28-nov (título y descripción cambiados el 7-nov) |
| `eco-doppler-paso-a-paso` | "cómo se realiza un doppler venoso de miembros inferiores" 4, "eco doppler piernas" 4, "cómo se hace un doppler venoso" 2 | usar esas palabras en un H2 o una pregunta frecuente | 20-nov |
| `calambres-piernas-noche` | "porque dan calambres en la pantorrilla" 2, "calambres en las piernas causas" (pos. 8), "dolor de piernas en la noche" 2 (pos. 52) y, en otros países, "porque duelen las piernas por dentro en la noche" | causas generales en la pantorrilla, sin perder el foco nocturno, y una sección corta "¿Y si no es un calambre?" para el dolor nocturno por dentro, que enlace a `lipedema-y-sueno` sin repetir su título | ya |
| `ejercicios-circulacion-casa` | "ejercicios para la circulación de las piernas" y variantes: unas 8 apar. | usar esa frase en un H2 | 18-nov |
| `picor-piernas-circulacion` | "rasquiña en las piernas" 2, "picazon en las piernas" 1 | la palabra colombiana "rasquiña" en el texto y en una pregunta | ya |
| `flebitis-superficial-sintomas` | "flebitis pierna" 2, "síntomas de flebitis" 1 | enlace a `flebitis-en-el-brazo` cuando exista | después de que lo humanicen (está `[pendiente]`) |
| `ulceras-venosas-piernas` | "ulceras venosas" 3, "caracteristicas ulcera venosa" 1 | Fuentes y una pregunta "¿cómo es una úlcera venosa?" | después de que lo humanicen |
| `varices-eps-o-particular` | "la escleroterapia la cubre la eps" (pos. 14), "la eps lo cubre" (pos. 4) | pregunta frecuente sobre escleroterapia y EPS, sin afirmar coberturas | 9-nov |
| `trombosis-venosa-senales` | "trombosis venosa profunda sintomas" 2, "como empieza una trombosis" 1 | Fuentes y la pregunta "¿cómo empieza una trombosis?" | ya |
| `medias-compresion-embarazo` | "medias de compresion para embarazadas" 3 | usar esa frase en un H2 o una pregunta | 9-nov |
| `cuidados-despues-escleroterapia` | "hematomas despues de escleroterapia" (pos. 34) | reforzar la parte de moretones | 22-nov (título protegido hasta el 16-nov) |
| `varices-cirugia-o-sin-cirugia` | "cirugia de vena varice" 1 | enlace a `varicectomia-que-es` cuando exista | 22-nov |
| `drenaje-linfatico-medellin` | "quien hace drenaje linfatico" (pos. 9,5), "especialista en drenaje linfático" (pos. 12) | responder quién lo hace, con una fuente que el verificador abra | 23-nov |

Las páginas que venden (sección 1) no se mejoran en los días de mejora del blog: las trabaja Claude y,
como máximo, la revisión SEO de los lunes (título, descripción, una pregunta frecuente al final o un
enlace interno, sin mover las claves de `contenido.js`).
