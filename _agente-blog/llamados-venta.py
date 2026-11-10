#!/usr/bin/env python3
"""Llamados a agendar dentro de los artículos del blog (ventas, nov-2026).

Qué hace en cada blog/<slug>.html que sea un artículo (los que solo redirigen se saltan):
  1. Pone el tema en <article class="post" data-tema="...">: lipedema | venas | peso | medicos.
     Si el artículo ya lo trae, lo respeta (así el redactor puede fijarlo a mano).
  2. Inserta UN llamado a mitad del artículo (aside.post-cta), después de la segunda sección H2.
  3. Cambia el cierre (section.cta) por el que corresponde al tema. Lipedema lleva además
     "Ver precio del tratamiento" (/precio-lipedema-medellin) y venas "Ver precios de várices" (/precios).
     Si aquí se cambian los botones de un tema, al volver a correrlo se actualizan en todos los artículos.
Se puede correr las veces que haga falta: lo que ya está hecho no se repite.

Uso (desde la raíz de la web):  python3 _agente-blog/llamados-venta.py            # todos
                                python3 _agente-blog/llamados-venta.py blog/x.html # uno
script.js mejora después el mensaje de WhatsApp (pone el título del artículo) y arma la barra
fija del celular según data-tema; si el JavaScript falla, los enlaces de aquí funcionan igual.
"""
import glob, os, re, sys
from html.parser import HTMLParser
from urllib.parse import quote

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
WA = 'https://wa.me/573052088204?text='

def wa(texto):
    return WA + quote(texto, safe='')

# Texto y botones por tema. Sin cifras, horarios ni promesas: solo el siguiente paso
# (los precios viven en /precios y /precio-lipedema-medellin; aquí solo se enlazan).
TEMAS = {
    'lipedema': {
        'msg': 'Hola Seravena, estoy leyendo el blog sobre lipedema y quiero agendar mi valoración',
        'medio': '<strong>¿Te reconoces en lo que vas leyendo?</strong> Una valoración de lipedema te dice si lo es y qué puedes hacer.',
        'medio_btn': 'Agendar valoración de lipedema por WhatsApp →',
        'cierre': 'Haz el test de lipedema y, si te reconoces en las señales, agenda tu valoración especializada.',
        'btn1': 'Agendar valoración de lipedema',
        'btn2': ('../test-lipedema', 'Hacer el test'),
        'btn3': ('../precio-lipedema-medellin', 'Ver precio del tratamiento'),
    },
    'venas': {
        'msg': 'Hola Seravena, estoy leyendo el blog sobre várices y circulación y quiero agendar mi valoración vascular',
        'medio': '<strong>¿Te suena lo que vas leyendo?</strong> Una valoración vascular con eco doppler muestra qué pasa en tus venas antes de decidir cualquier tratamiento.',
        'medio_btn': 'Agendar valoración vascular por WhatsApp →',
        'cierre': 'Agenda tu valoración vascular con eco doppler y sal de dudas con acompañamiento profesional.',
        'btn1': 'Agendar valoración vascular',
        'btn2': ('../precios', 'Ver precios de várices'),
    },
    'peso': {
        'msg': 'Hola Seravena, vengo del blog y quiero información del programa para bajar de peso',
        'medio': '<strong>¿Quieres bajar de peso con acompañamiento médico?</strong> Pregunta por el programa de Seravena.',
        'medio_btn': 'Pedir información por WhatsApp →',
        'cierre': 'Conoce el programa médico para bajar de peso de Seravena y resuelve tus dudas por WhatsApp.',
        'btn1': 'Pedir información del programa',
        'btn2': ('../obesidad-medellin', 'Ver el programa'),
    },
    'medicos': {
        'msg': 'Hola Seravena, vengo de la página web y quiero referir un paciente',
        'medio': '<strong>¿Atiendes a una paciente con estas señales?</strong> Escríbenos y coordinamos su valoración.',
        'medio_btn': 'Referir una paciente por WhatsApp →',
        'cierre': 'Si atiendes a una paciente con sospecha de lipedema, escríbenos para referirla o ten a mano la guía rápida para médicos.',
        'btn1': 'Referir una paciente',
        'btn2': ('../guia-lipedema-medicos', 'Ver la guía para médicos'),
    },
}
SOLO_MEDICOS = {'senales-lipedema-primer-contacto'}

def tema_de(slug, html):
    """Tema por slug y categoría (y título, solo para peso). El lipedema manda: hay títulos que lo comparan con la obesidad."""
    if slug in SOLO_MEDICOS:
        return 'medicos'
    cat = re.search(r'<header class="post-head">\s*<span class="blog-tag">([^<]*)', html)
    cat = (cat.group(1) if cat else '').lower()
    h1 = re.search(r'<h1>(.*?)</h1>', html, re.S)
    h1 = (h1.group(1) if h1 else '').lower()
    if 'lipedema' in slug or 'lipedema' in cat:
        return 'lipedema'
    if re.search(r'obesidad|bajar-de-peso|sobrepeso|adelgaz', slug) or re.search(r'obesidad|peso', cat) \
       or re.search(r'obesidad|bajar de peso|sobrepeso', h1):
        return 'peso'
    return 'venas'

class Hijos(HTMLParser):
    """Anota dónde empieza cada hijo directo de div.post-body (para insertar sin romper nada)."""
    VACIOS = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr'}
    def __init__(self, texto):
        super().__init__(convert_charrefs=True)
        self.lineas = [0]
        for l in texto.splitlines(keepends=True):
            self.lineas.append(self.lineas[-1] + len(l))
        self.pila, self.prof, self.hijos = [], None, []
        self.feed(texto)
    def pos(self):
        l, c = self.getpos()
        return self.lineas[l - 1] + c
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if self.prof is not None and len(self.pila) == self.prof:
            self.hijos.append((tag, a.get('class') or '', self.pos()))
        if tag in self.VACIOS:
            return
        self.pila.append(tag)
        if self.prof is None and tag == 'div' and 'post-body' in (a.get('class') or '').split():
            self.prof = len(self.pila)
    def handle_endtag(self, tag):
        if tag in self.VACIOS or tag not in self.pila:
            return
        while self.pila and self.pila.pop() != tag:
            pass
        if self.prof is not None and len(self.pila) < self.prof:
            self.prof = -1   # se cerró el cuerpo: no anotar nada más

def llamado_medio(tema):
    t = TEMAS[tema]
    return ('<!-- Llamado a mitad del artículo (lo pone _agente-blog/llamados-venta.py; no duplicar) -->\n'
            '      <aside class="post-service post-cta">\n'
            '        <p data-c="blog_medio_%s_txt">%s</p>\n'
            '        <a data-c="blog_medio_%s_btn" data-wa="pagina" href="%s" target="_blank" rel="noopener">%s</a>\n'
            '      </aside>\n\n      ') % (tema, t['medio'], tema, wa(t['msg']), t['medio_btn'])

def botones_cierre(tema):
    t = TEMAS[tema]
    b = ('<div class="cta-actions reveal">\n'
         '      <a href="%s" data-wa="pagina" target="_blank" rel="noopener" class="btn btn-primary">%s</a>\n'
         '      <a href="%s" class="btn btn-ghost">%s</a>\n') % (wa(t['msg']), t['btn1'], t['btn2'][0], t['btn2'][1])
    if t.get('btn3'):   # botón añadido después: lleva data-c para no depender de la posición (contenido.js)
        b += '      <a href="%s" class="btn btn-ghost" data-c="blog_cierre_%s_btn3">%s</a>\n' % (t['btn3'][0], tema, t['btn3'][1])
    return b + '    </div>'

def procesar(ruta):
    html = open(ruta, encoding='utf-8').read()
    m = re.search(r'<article class="post"([^>]*)>', html)
    if not m:
        return None                                   # redirección u otra cosa: no es artículo
    slug = os.path.basename(ruta)[:-5]
    hecho = []
    mt = re.search(r'data-tema="([a-z]+)"', m.group(1))
    tema = mt.group(1) if mt and mt.group(1) in TEMAS else tema_de(slug, html)
    if not mt:
        html = html.replace(m.group(0), '<article class="post" data-tema="%s">' % tema, 1)
        hecho.append('tema')

    if 'post-cta' not in html:
        hijos = Hijos(html).hijos
        h2 = [i for i, h in enumerate(hijos) if h[0] == 'h2']
        donde = None
        for i in h2[2:]:                              # antes del 3.er H2 = después de la 2.ª sección
            if hijos[i - 1][0] not in ('aside', 'section'):   # no pegarlo a otra caja (servicio, test)
                donde = hijos[i][2]
                break
        if donde is None:                             # artículo corto: antes del aviso médico
            nota = [h for h in hijos if h[0] == 'div' and 'post-note' in h[1]]
            if nota:
                donde = nota[0][2]
        if donde is not None:
            html = html[:donde] + llamado_medio(tema) + html[donde:]
            hecho.append('medio')
        else:
            hecho.append('SIN-LUGAR-PARA-EL-LLAMADO')

    c = re.search(r'<section class="cta">.*?</section>', html, re.S)
    if c:
        t = TEMAS[tema]
        sec = c.group(0)
        botones = botones_cierre(tema)
        if 'data-wa="pagina"' not in sec:             # cierre original de la plantilla
            sec = re.sub(r'<p class="reveal">Agenda tu valoración con eco [^<]*</p>',
                         '<p class="reveal">%s</p>' % t['cierre'], sec, count=1)
        if botones not in sec:                        # nuevo, o los botones del tema cambiaron
            sec = re.sub(r'<div class="cta-actions reveal">.*?</div>', lambda _: botones, sec, count=1, flags=re.S)
        if sec != c.group(0):
            html = html.replace(c.group(0), sec, 1)
            hecho.append('cierre')

    if hecho:
        open(ruta, 'w', encoding='utf-8').write(html)
    return tema, hecho

if __name__ == '__main__':
    rutas = sys.argv[1:] or sorted(glob.glob(os.path.join(RAIZ, 'blog', '*.html')))
    for r in rutas:
        if os.path.basename(r) == 'index.html':
            continue
        res = procesar(r)
        if res is None:
            continue
        print('%-52s %-9s %s' % (os.path.basename(r), res[0], ', '.join(res[1]) or 'ya estaba'))
