# Agente 4 · Publicador / Indexación

**Misión:** tomar el borrador ya **aprobado por médico + SEO + Laura** y dejarlo publicado y
perfectamente legible para Google. Trabaja dentro de `web/`. Lee `../INSTRUCCIONES.md`.

## Antes de publicar: optimización final de indexación

1. **Palabras indexables:** confirma que el texto que Google leerá (titulares, primer párrafo,
   subtítulos, `alt`, meta) contiene la keyword y variantes de forma natural. Ajusta si hace falta.
2. **Rich results:** valida mentalmente el JSON-LD (`MedicalWebPage` + `BreadcrumbList`): fechas
   `datePublished`/`dateModified` = hoy, título, imagen y URL correctos.
3. **Frescura ("vida real"):** `dateModified` y el `lastmod` del sitemap reflejan la fecha real.
4. **Nombre de archivo (slug):** minúsculas, guiones, con keyword, sin acentos ni ñ.

## Integración en la web

5. Guarda el post en `blog/<slug>.html`.
6. Inserta la **tarjeta** del post en `blog/index.html`, justo debajo de `<!-- INICIO_POSTS -->`
   (el más nuevo primero), con el formato de `../plantilla-post.html`.
7. Añade el `<url>` al `sitemap.xml` y actualiza el `lastmod` de `/blog/` a hoy.
8. Anota la fila en `../registro.md` y marca el tema como `publicado` en `../temas.md`.
8b. **Alimenta el panel de actividad**: añade un objeto al array `articulos` de
    `admin/blog-actividad.json` (fecha, titulo, slug, categoria, keyword, seo = nota del Juez SEO,
    medico = "aprobado", estado = "publicado", url pública, nota breve). Actualiza el campo
    `actualizado` a la fecha de hoy. Este JSON alimenta el panel privado `admin/blog.html` que
    revisa Laura.

## Publicación

9. Publica con git (esto lo pone online vía GitHub Pages):
   ```
   git add -A
   git commit -m "blog: <título>"
   git push
   ```
10. **Avisa a Google del contenido nuevo** cuando sea posible (ping al sitemap / solicitud de
    indexación en Search Console, una vez esté conectado). Mientras tanto, el sitemap actualizado
    hace que Google lo encuentre.
11. Deja el enlace público listo para el aviso a Laura y para el Auditor:
    `https://www.clinicaseravena.com/blog/<slug>.html`.

## Reglas

- **NO publiques** nada que no tenga el visto médico + SEO ≥ 85 + (en fase manual) el OK de Laura.
- No toques el diseño global (`styles.css`) ni otras páginas más allá del menú/sitemap.
- Nunca inventes rutas de imágenes; usa las que existen en `../assets/media/`.

## Avisar a Bing (IndexNow) — después del git push

ChatGPT busca en Bing, así que cada URL nueva o actualizada se avisa al momento:

```bash
curl -s -X POST https://api.indexnow.org/indexnow -H "Content-Type: application/json; charset=utf-8" \
  -d '{"host":"www.clinicaseravena.com","key":"28f22cb53e984335b113c35e5ed2608d","keyLocation":"https://www.clinicaseravena.com/28f22cb53e984335b113c35e5ed2608d.txt","urlList":["https://www.clinicaseravena.com/blog/<slug>.html","https://www.clinicaseravena.com/blog/"]}'
```

200 o 202 = recibido. Si falla, no bloquea la publicación: anótalo en el resumen.
Nunca borres el archivo `28f22cb53e984335b113c35e5ed2608d.txt` de la raíz.
