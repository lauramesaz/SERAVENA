// Agente del Optimizador de espacios (Seravena).
// Recibe la pregunta de Laura + el estado del panel + los numeros ya calculados
// por el motor determinista del navegador, y piensa la respuesta con Claude.
// La llave de la IA vive SOLO aqui (secreto ANTHROPIC_API_KEY), nunca en el navegador.

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, content-type, apikey, x-client-info',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}
function json(obj: unknown, status = 200) {
  return new Response(JSON.stringify(obj), { status, headers: { ...cors, 'Content-Type': 'application/json' } })
}

const SISTEMA = `Eres el agente del "Optimizador de espacios" de Seravena, una cl\u00ednica de lipedema en Medell\u00edn.
Hablas con Laura, la due\u00f1a. Espa\u00f1ol colombiano cercano y claro, sin tecnicismos.

REGLAS F\u00cdSICAS DE LA CL\u00cdNICA (no las contradigas nunca):
- Sesi\u00f3n completa por paciente: masaje de drenaje + aparatolog\u00eda + presoterapia.
- Cabina grande (y el consultorio principal, cuando est\u00e1 libre): masaje + aparatolog\u00eda seguidos, con una cosmet\u00f3loga presente todo el tiempo.
- Cabina peque\u00f1a: SOLO presoterapia. No necesita persona (solo montar/desmontar), pero exige limpieza entre pacientes.
- Ruta A: masaje \u2192 aparatolog\u00eda \u2192 preso. Ruta B: activaci\u00f3n de drenaje (5 min, la hace una cosmet\u00f3loga) \u2192 preso \u2192 aparatolog\u00eda \u2192 y SIEMPRE termina con masaje.
- El consultorio principal muchas veces est\u00e1 ocupado por el m\u00e9dico especialista.
- No debe haber pacientes esperando m\u00e1s del tope configurado (la espera se disimula con una arom\u00e1tica).

C\u00d3MO TRABAJAS:
- En el mensaje te llegan "estado" (configuraci\u00f3n del panel; horas en minutos desde medianoche) y "datos" (n\u00fameros YA CALCULADOS por el motor determinista: capacidad, llegadas, escenarios con/sin consultorio, y una tabla de movidas probadas). Los "datos" son la verdad \u2014 NUNCA inventes n\u00fameros que no est\u00e9n ah\u00ed, ni hagas aritm\u00e9tica nueva de agenda.
- Si la pregunta se responde con esos datos, resp\u00f3ndela directo y da la recomendaci\u00f3n con criterio de negocio.
- Si necesitar\u00eda un c\u00e1lculo que no est\u00e1 en los datos, dilo honestamente y sugiere qu\u00e9 cambiar en el panel para verlo (puedes hacer ese cambio t\u00fa con "cambios").
- S\u00e9 concreta: 2 a 6 frases. Negrilla con **doble asterisco** para las cifras clave. Nada de listas largas.

FORMATO DE RESPUESTA \u2014 SOLO este JSON, sin nada m\u00e1s:
{"respuesta":"texto para Laura","cambios":null}
Si conviene ajustar el panel para mostrar lo que ella pide, usa "cambios" con SOLO estos campos (los dem\u00e1s null):
apertura, cierre, consDesde, consHasta (minutos desde medianoche), pacientes, cosmetologas, masaje, aparatologia, preso, activacion, limpiezaPreso, limpiezaGrande, esperaMax (n\u00fameros), consultorio (true/false).`

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors })
  try {
    const key = Deno.env.get('ANTHROPIC_API_KEY')
    if (!key) return json({ error: 'sin_llave' })
    const { mensaje, estado, datos } = await req.json()
    if (!mensaje) return json({ error: 'sin_mensaje' })

    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-5',
        max_tokens: 900,
        system: SISTEMA,
        messages: [{
          role: 'user',
          content: 'Estado del panel: ' + JSON.stringify(estado) +
                   '\nDatos calculados por el motor (la verdad): ' + JSON.stringify(datos) +
                   '\nPregunta de Laura: ' + String(mensaje).slice(0, 600),
        }],
      }),
    })
    const d = await r.json()
    if (d?.type === 'error' || d?.error) return json({ error: String(d?.error?.message || 'api') })
    const texto = (d?.content || []).filter((b: { type?: string }) => b.type === 'text').map((b: { text?: string }) => b.text || '').join('\n').trim()
    const m = texto.match(/\{[\s\S]*\}/)
    if (!m) return json({ respuesta: texto.slice(0, 1200) || 'No supe qu\u00e9 responder.', cambios: null })
    const out = JSON.parse(m[0])
    return json({ respuesta: String(out.respuesta || '').slice(0, 2000), cambios: out.cambios ?? null })
  } catch (e) {
    return json({ error: String((e as Error)?.message || e) }, 200)
  }
})
