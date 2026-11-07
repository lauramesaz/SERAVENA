# Agente 5 · Auditor de implementación

**Misión:** verificar que **todo quedó bien montado**, antes y después de publicar. Eres el último
control: nada se da por cerrado si tú encuentras un fallo. Lee `../pipeline.md`.

## Checklist técnico (marca cada punto)

**Archivos e integración**
- [ ] Existe `blog/<slug>.html` y abre sin errores.
- [ ] El slug no es uno de "Artículos fusionados" de `temas.md` (esas direcciones son redirecciones
      a su artículo principal y no se reescriben). Al revisar el blog completo, las páginas con
      `http-equiv="refresh"` son redirecciones, no artículos: no les exijas FAQ, JSON-LD ni tarjeta.
- [ ] La tarjeta del post aparece en `blog/index.html` y su enlace apunta al slug correcto.
- [ ] El post está en `sitemap.xml` con `lastmod` de hoy; `/blog/` también actualizado.
- [ ] Fila añadida en `registro.md` y tema marcado `publicado` en `temas.md`.

**Enlaces y recursos**
- [ ] Todos los enlaces internos (`../lipedema`, `../contacto`, etc.) existen y funcionan. Corre
      `python3 _agente-blog/revisar-enlaces.py` (lo crea SER-05); mientras no exista, comprueba a mano
      que cada enlace nuevo apunte a un archivo del repositorio.
- [ ] El primer párrafo enlaza a la página dueña que indica la línea del tema en `temas.md`.
- [ ] La imagen de portada y el `alt` existen y cargan; rutas `../assets/...` correctas.
- [ ] Los CSS (`../styles.css`, `blog.css`) cargan; el post se ve en marca.

**SEO técnico**
- [ ] Un solo `<h1>`; jerarquía de encabezados correcta.
- [ ] `<title>` ≤ 60 y meta description 140–160.
- [ ] JSON-LD `MedicalWebPage` y `BreadcrumbList` presentes y sin errores de sintaxis.
- [ ] `canonical` correcto y `robots` = index,follow.

**Publicación real (OBLIGATORIO — no basta con que el push salga bien)**
- [ ] `https://www.clinicaseravena.com/blog/<slug>` responde **200** (no 404).
- [ ] Ningún enlace, canonical ni `<loc>` del sitemap termina en `.html` (si alguno sí: `python3 _agente-blog/limpiar-enlaces.py`).
- [ ] `https://www.clinicaseravena.com/blog/` ya muestra la tarjeta del post nuevo.
- [ ] `https://www.clinicaseravena.com/sitemap.xml` ya contiene la URL del post.
- Si algo de esto da 404 o no aparece, **el sitio no se ha reconstruido**: GitHub Pages puede tardar
  1–3 min, pero también puede **fallar el build** (ya pasó el 6-ago-2026 y el artículo del día quedó
  invisible varias horas sin que nadie se enterara). Espera ~3 min y reintenta; si sigue fallando,
  revisa el estado del build y **vuelve a lanzarlo**:
  ```
  # estado (últimos builds)
  curl -s -H "Authorization: token $TOKEN" https://api.github.com/repos/lauramesaz/SERAVENA/pages/builds
  # relanzar
  curl -s -X POST -H "Authorization: token $TOKEN" https://api.github.com/repos/lauramesaz/SERAVENA/pages/builds
  ```
  Si tras relanzar sigue en `errored`, **avisa a Laura explícitamente** en el reporte del día.
  Si no tienes token para la API de GitHub (pasa en la nube), haz lo que funcionó el 6-nov-2026: un
  commit vacío `git commit --allow-empty -m "Volver a publicar (la entrega de GitHub Pages falló)"`,
  `git pull --rebase`, `git push origin HEAD:main`, espera 3 minutos y vuelve a comprobar el 200.

**Contenido**
- [ ] Bloque `post-note` de aviso médico presente.
- [ ] Firma "Equipo médico de Seravena" presente.
- [ ] Llamada a la acción presente.
- [ ] Sección "Fuentes" (`post-sources`) con 2 a 5 referencias, las mismas que `citation` del JSON-LD, y
      el veredicto del Verificador dice que abrió cada una.
- [ ] `reviewedBy` = la organización, salvo que el slug esté en `revisados-medico.md`. Si aparece el
      nombre del Dr. Puerta en un artículo que no está en esa lista → INCIDENCIA.
- [ ] El tema salió de la cola con búsquedas reales de `temas.md` (o de la sección 4 de
      `mapa-palabras.md`) y el `<title>`/`<h1>` no usa una frase prohibida de ese mapa.

**Commit**
- [ ] El commit solo trae archivos de la cadena (`git show --stat HEAD`). Si entró algo ajeno
      (`equipo/`, `_finanzas/`, `.github/`, páginas que nadie tocó), es una INCIDENCIA: se revierte ese
      archivo con un commit nuevo y se avisa en el resumen.

## Cómo verificar

- Revisa el HTML directamente y, cuando sea posible, **carga la página** (servidor local o la URL
  pública ya publicada) para comprobar que renderiza bien y sin errores de consola.
- Comprueba los enlaces (que el archivo destino exista).

## Entregable

- **Reporte APROBADO** (todo ✔) o **INCIDENCIAS** con la lista concreta de fallos.
- Si hay incidencias, se corrigen (Publicador/Redactor según toque) y se vuelve a auditar hasta
  quedar en APROBADO. Solo entonces se cierra y se avisa a Laura.
