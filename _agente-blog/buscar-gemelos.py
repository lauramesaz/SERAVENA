#!/usr/bin/env python3
"""Prueba del gemelo: ¿ya existe un artículo que responde la MISMA búsqueda, aunque use otras palabras?

Por qué existe (20-oct-2026): la regla anticanibalización comparaba palabras clave exactas y se
colaron gemelos ("piernas hinchadas por calor" vs "piernas hinchadas por calor en viajes",
"cuidado de piernas de pie" vs "¿trabajas sentada?"). Google mostraba uno e ignoraba el otro,
y hubo que fusionarlos. Este script no decide por ti: te pone delante los artículos más
parecidos en INTENCIÓN (agrupa sinónimos: calor/caliente/clima, trabajo/jornada/oficina/turno,
cita/consulta/valoración...) para que los leas antes de escribir.

Uso (desde la raíz del repo):
    python3 _agente-blog/buscar-gemelos.py "Celulitis o lipedema: cómo diferenciarlos" "celulitis o lipedema"
    python3 _agente-blog/buscar-gemelos.py --todos      # revisa todos los pares del blog (auditoría semanal)

Cómo leer el resultado: puntaje >= 0.50 = probable gemelo (léelo entero antes de escribir);
0.30-0.50 = pariente cercano (léelo, enlázalo y diferencia el ángulo); < 0.30 = otro tema.
El puntaje solo ordena la lectura: quien decide si es la misma búsqueda eres tú, leyendo.
Las "direcciones fusionadas" del final son artículos que ya se juntaron con otro: nunca se vuelven a crear.
"""
import glob
import html
import os
import re
import sys
import unicodedata

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BLOG = os.path.join(RAIZ, 'blog')

STOP = set('''a al ante con contra de del desde durante e el en entre es esta este esto estos hacia hasta
la las le lo los mas mi mis muy no o para pero por que se si sin sobre su sus te tu tus un una uno unos y ya
como cual cuales cuando cuanto donde quien qué que hay hacer hace puede pueden ser son tiene tienes tener
lo-que guia completa todo toda todos sirve sirven qué cómo cuál cuándo dónde vs bien mal mas menos solo
seravena medellin colombia antioquia poblado
pierna piernas cuidar cuidado cuidados cuidarlas cuidarte hora horas mucha muchas mucho muchos simple vista
alivio aliviar diferenciar diferenciarlos diferenciarlas diferencias elegir elegirlas elegirla dia dias
cosas algo nada siempre nunca debe debes conviene sirve significa realmente real reales
esperar cuidarte cuidarla decidir saber tengo tienes'''.split())

# Familias de palabras que expresan la misma idea. La clave es el "concepto" con el que se compara.
FAMILIAS = {
    'calor': 'calor caliente calurosa caluroso calurosos temperatura verano tierra-caliente',
    'trabajo': 'trabajo trabajar trabajas laboral jornada oficina turno escritorio mostrador',
    'sentada': 'sentada sentado sedentarismo',
    'compresion': 'medias media compresion',
    'vena': 'varices variz venas vena venosa venoso venosas',
    'aranita': 'aranitas aranas arana',
    'cita': 'cita citas consulta valoracion',
    'ejercicio': 'ejercicio ejercicios deporte deportes gimnasio rutina yoga pilates',
    'hinchazon': 'hinchazon hinchadas hinchada hinchados edema inflamadas',
    'retencion': 'retencion liquidos',
    'diagnostico': 'diagnostico diagnosticar confirmar confirma',
    'senal': 'senales senal sintomas signos sospecha',
    'celulitis': 'celulitis naranja',
    'pesadez': 'pesadas pesadez cansadas cansancio',
    'embarazo': 'embarazo embarazada embarazadas gestacion posparto parto',
    'viaje': 'viaje viajes viajar avion volar vuelo',
    'habito': 'habitos habito costumbres',
    'dolor': 'dolor duele dolores',
    'drenaje': 'drenaje linfatico linfatica',
    'masaje': 'masaje automasaje',
    'eco': 'eco doppler ecografia',
    'medico': 'medico medicos especialista',
    'remitir': 'derivar remitir derivacion',
    'precio': 'precio precios cuesta costo',
}
CONCEPTO = {}
for k, ws in FAMILIAS.items():
    for w in ws.split():
        CONCEPTO[w] = k


def norm(t):
    t = unicodedata.normalize('NFD', t.lower())
    t = ''.join(c for c in t if unicodedata.category(c) != 'Mn')
    t = t.replace('tierra caliente', 'tierra-caliente').replace('primer contacto', 'primer-contacto')
    return t


def conceptos(texto):
    out = set()
    for w in re.findall(r'[a-z0-9-]+', norm(texto)):
        if w in STOP or len(w) < 3:
            continue
        if w in CONCEPTO:
            out.add(CONCEPTO[w])
            continue
        if w.endswith('es') and w[:-2] in CONCEPTO:
            out.add(CONCEPTO[w[:-2]])
            continue
        if w.endswith('s') and w[:-1] in CONCEPTO:
            out.add(CONCEPTO[w[:-1]])
            continue
        out.add(w[:-1] if w.endswith('s') and len(w) > 4 else w)
    return out


def leer(path):
    s = open(path, encoding='utf-8').read()
    g = lambda p: html.unescape(re.sub(r'<[^>]+>', '', (re.search(p, s, re.S) or [None, ''])[1] or ''))
    redir = re.search(r'http-equiv="refresh" content="0; url=([^"]+)"', s)
    return {
        'slug': os.path.basename(path)[:-5],
        'title': g(r'<title>(.*?)(?: \| Seravena)?</title>'),
        'h1': g(r'<h1>(.*?)</h1>'),
        'desc': g(r'name="description" content="([^"]*)"'),
        'kw': g(r'name="keywords" content="([^"]*)"'),
        'redirige_a': redir.group(1) if redir else None,
    }


def articulos():
    arts = [leer(p) for p in sorted(glob.glob(os.path.join(BLOG, '*.html'))) if not p.endswith('index.html')]
    return [a for a in arts if not a['redirige_a']], [a for a in arts if a['redirige_a']]


def huella(a):
    # título y h1 pesan doble: son la intención declarada del artículo
    fuerte = conceptos(a['title'] + ' ' + a['h1'] + ' ' + a['slug'].replace('-', ' '))
    debil = conceptos(a['desc'] + ' ' + a['kw'])
    return fuerte, debil


def parecido(h1, h2):
    """0 a 1. Mezcla cuánto de la intención del primero cubre el título del segundo y cuánto se parecen."""
    f1, d1 = h1
    f2, d2 = h2
    if not f1 or not f2:
        return 0.0
    cubre = len(f1 & f2) / min(len(f1), len(f2))
    jaccard = len(f1 & f2) / len(f1 | f2)
    todo1, todo2 = f1 | d1, f2 | d2
    cubre_todo = len(f1 & todo2) / len(f1)
    return round(0.6 * jaccard + 0.25 * cubre + 0.15 * cubre_todo, 2)


def main():
    vivos, fusionados = articulos()
    if len(sys.argv) > 1 and sys.argv[1] == '--todos':
        pares = []
        hs = {a['slug']: huella(a) for a in vivos}
        for i, a in enumerate(vivos):
            for b in vivos[i + 1:]:
                p = parecido(hs[a['slug']], hs[b['slug']])
                if p >= 0.5:
                    pares.append((p, a, b))
        print(f'Pares con puntaje >= 0.50 (posibles gemelos), de {len(vivos)} artículos vivos:\n')
        for p, a, b in sorted(pares, key=lambda x: -x[0]):
            print(f'{p:.2f}  {a["slug"]}  <->  {b["slug"]}\n      "{a["title"]}"\n      "{b["title"]}"')
        return
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    tema = ' '.join(sys.argv[1:])
    q = (conceptos(tema), set())
    ranking = sorted(((parecido(q, huella(a)), a) for a in vivos), key=lambda x: -x[0])
    print(f'Tema propuesto: {tema}\nConceptos: {", ".join(sorted(q[0]))}\n')
    for p, a in ranking[:10]:
        marca = 'PROBABLE GEMELO' if p >= 0.5 else ('pariente' if p >= 0.3 else '')
        print(f'{p:.2f} {marca:15} blog/{a["slug"]}.html\n      título: {a["title"]}\n      desc:   {a["desc"]}')
    if fusionados:
        print('\nDirecciones fusionadas (NO volver a crearlas; lo nuevo va al principal):')
        for a in fusionados:
            print(f'  {a["slug"]}  ->  {a["redirige_a"]}')


if __name__ == '__main__':
    main()
