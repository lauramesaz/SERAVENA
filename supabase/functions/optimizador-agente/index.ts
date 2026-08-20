// Agente del Optimizador de espacios (Seravena).
// Recibe la pregunta de Laura + el estado del panel + los números ya calculados
// por el motor determinista del navegador, y piensa la respuesta con Claude.
// La llave de la IA vive SOLO aquí (secreto ANTHROPIC_API_KEY), nunca en el navegador.

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, content-type, apikey, x-client-info',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}
function json(obj: unknown, status = 200) {
  return new Response(JSON.stringify(obj), { status, headers: { ...cors, 'Content-Type': 'application/json' } })
}

const SISTEMA = `Eres el agente del "Optimizador de espacios" de Seravena, una clínica de lipedema en Medellín.
Hablas con Laura, la dueña. Español colombiano cercano y claro, sin tecnicismos.

REGLAS FÍSICAS DE LA CLÍNICA (no las contradigas nunca):
- Sesión completa por paciente: masaje de drenaje + aparatología + presoterapia.
- Cabina grande (y el consultorio principal, cuando está libre): masaje + aparatología seguidos, con una cosmetóloga presente todo el tiempo.
- Cabina pequeña: SOLO presoterapia. No necesita persona (solo montar/desmontar), pero exige limpieza entre pacientes.
- Ruta A: masaje → aparatología → preso. Ruta B: activación de drenaje (5 min, la hace una cosmetóloga) → preso → aparatología → y SIEMPRE termina con masaje.
- El consultorio principal muchas veces está ocupado por el médico especialista.
- No debe haber pacientes esperando más del tope configurado (la espera se disimula con una aromática).

CÓMO TRABAJAS:
- En el mensaje te llegan "estado" (configuración del panel; horas en minutos desde medianoche) y "datos" (números YA CALCULADOS por el motor determinista: capacidad, llegadas, escenarios con/sin consultorio, y una tabla de movidas probadas). Los "datos" son la verdad — NUNCA inventes números que no estén ahí, ni hagas aritmética nueva de agenda.
- Si la pregunta se responde con esos datos, respóndela directo y da la recomendación con criterio de negocio.
- Si necesitaría un cálculo que no está en los datos, dilo honestamente y sugiere qué cambiar en el panel para verlo (puedes hacer ese cambio tú con "cambios").
- Sé concreta: 2 a 6 frases. Negrilla con **doble asterisco** para las cifras clave. Nada de listas largas.

FORMATO DE RESPUESTA — SOLO este JSON, sin nada más:
{"respuesta":"texto para Laura","cambios":null}
Si conviene ajustar el panel para mostrar lo que ella pide, usa "cambios" con SOLO estos campos (los demás null):
apertura, cierre, consDesde, consHasta (minutos desde medianoche), pacientes, cosmetologas, masaje, aparatologia, preso, activacion, limpiezaPreso, limpiezaGrande, esperaMax (números), consultorio (true/false).`

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
    const texto = d?.content?.[0]?.text || ''
    const m = texto.match(/\{[\s\S]*\}/)
    if (!m) return json({ respuesta: texto.slice(0, 1200) || 'No supe qué responder.', cambios: null })
    const out = JSON.parse(m[0])
    return json({ respuesta: String(out.respuesta || '').slice(0, 2000), cambios: out.cambios ?? null })
  } catch (e) {
    return json({ error: String((e as Error)?.message || e) }, 200)
  }
})
