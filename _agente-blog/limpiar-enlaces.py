#!/usr/bin/env python3
"""Direcciones limpias: quita el ".html" de los enlaces de toda la web pública.

   clinicaseravena.com/lipedema.html  ->  clinicaseravena.com/lipedema
   blog/index.html                    ->  blog/

Los archivos siguen llamándose .html (GitHub Pages los sirve igual sin la
terminación); solo cambian los enlaces, los canonical, el JSON-LD y el sitemap.
Es seguro correrlo las veces que haga falta (si no hay nada que limpiar, no toca nada).

Uso (desde la raíz del repo):  python3 _agente-blog/limpiar-enlaces.py
El publicador lo corre antes de cada commit para que los artículos nuevos
salgan con direcciones limpias aunque se hayan escrito con ".html".
"""
import glob
import os
import re
import sys

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOMINIO = 'https://www.clinicaseravena.com/'

# Páginas públicas + plantilla del agente. Los paneles internos (/admin, /equipo) no se tocan.
ARCHIVOS = (glob.glob(os.path.join(RAIZ, '*.html')) +
            glob.glob(os.path.join(RAIZ, 'blog', '*.html')) +
            [os.path.join(RAIZ, '_agente-blog', 'plantilla-post.html')])
OTROS = [os.path.join(RAIZ, 'sitemap.xml'), os.path.join(RAIZ, 'llms.txt'),
         os.path.join(RAIZ, 'script.js'), os.path.join(RAIZ, 'blog', 'blog.js')]


def limpiar_ruta(ruta):
    """'../lipedema.html#x' -> '../lipedema#x' ; 'index.html' -> './' ; '../index.html' -> '../'"""
    m = re.match(r'^([^?#]*?)\.html([?#].*)?$', ruta)
    if not m:
        return ruta
    base, resto = m.group(1), m.group(2) or ''
    if base == 'index' or base.endswith('/index'):
        base = base[:-len('index')] or './'
    return base + resto


def limpiar_url_absoluta(url):
    return DOMINIO + limpiar_ruta(url[len(DOMINIO):]).replace('./', '', 1) if url.startswith(DOMINIO) else url


def es_interna(h):
    return not re.match(r'^(https?:|mailto:|tel:|#|javascript:|data:|//)', h)


def procesar_html(txt):
    # href="..." relativos a páginas .html
    def rel(m):
        h = m.group(2)
        return m.group(1) + (limpiar_ruta(h) if es_interna(h) else h) + m.group(3)
    txt = re.sub(r'(href=")([^"]+)(")', rel, txt)
    # Cualquier URL absoluta del sitio (canonical, og:url, JSON-LD, enlaces absolutos)
    txt = re.sub(re.escape(DOMINIO) + r'[^"\s<>]*?\.html(?:#[^"\s<>]*)?(?=["\s<>])',
                 lambda m: limpiar_url_absoluta(m.group(0)), txt)
    return txt


def procesar_js(txt):
    # Solo enlaces dentro de atributos href escritos en cadenas de JS
    return re.sub(r'(href=\\?")([^"\\]+)(\\?")',
                  lambda m: m.group(1) + (limpiar_ruta(m.group(2)) if es_interna(m.group(2)) else m.group(2)) + m.group(3), txt)


def main():
    cambiados = []
    for f in ARCHIVOS + OTROS:
        if not os.path.exists(f):
            continue
        txt = open(f, encoding='utf-8').read()
        if f.endswith('.js'):
            nuevo = procesar_js(txt)
        elif f.endswith('.html'):
            nuevo = procesar_html(txt)
        else:  # sitemap.xml / llms.txt
            nuevo = re.sub(re.escape(DOMINIO) + r'[^\s<>)"]*?\.html', lambda m: limpiar_url_absoluta(m.group(0)), txt)
        if nuevo != txt:
            open(f, 'w', encoding='utf-8').write(nuevo)
            cambiados.append(os.path.relpath(f, RAIZ))
    print('Direcciones limpias: %d archivo(s) actualizados' % len(cambiados))
    for c in cambiados:
        print('  -', c)
    return 0


if __name__ == '__main__':
    sys.exit(main())
