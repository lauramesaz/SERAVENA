// Función de servidor (Edge Function): envía por correo las propuestas nuevas
// del agente estratega (agente 7).
//
// Quién la llama: la rutina semanal del estratega, al terminar de escribir
// admin/propuestas.json. No la llama el navegador ni ninguna página pública.
//
// Variables de entorno que hay que configurar en Supabase:
//   RESEND_API_KEY  -> clave de la cuenta de Resend (el servicio que envía)
//   CLAVE_ENVIO     -> contraseña compartida; sin ella la función no responde
//   DESTINO         -> info@clinicaseravena.com
//   REMITENTE       -> p. ej. "Seravena <propuestas@clinicaseravena.com>"
//                      (o el remitente de pruebas de Resend hasta verificar el dominio)

const FUENTE = 'https://www.clinicaseravena.com/admin/propuestas.json'
const PANEL  = 'https://www.clinicaseravena.com/admin/ideas.html'

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, content-type, x-clave',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}
const json = (obj: unknown, status = 200) =>
  new Response(JSON.stringify(obj), { status, headers: { ...cors, 'Content-Type': 'application/json' } })

function esc(s: unknown): string {
  return String(s ?? '').replace(/[&<>"]/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c] as string))
}

function fmtFecha(iso: string): string {
  const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre']
  const [a, m, d] = (iso || '').split('-')
  if (!a || !m || !d) return iso || ''
  return `${parseInt(d, 10)} de ${meses[parseInt(m, 10) - 1]} de ${a}`
}

// Colores de marca, en línea: los clientes de correo ignoran las hojas de estilo.
const C = { choc: '#4B412D', camel: '#9D8051', arena: '#EDE2D0', piedra: '#F9F9F8', gris: '#6b6357', texto: '#3d382e' }

function tarjeta(p: Record<string, unknown>): string {
  const fila = (k: string, v: unknown) => !v ? '' : `
    <tr><td style="padding:0 0 12px">
      <div style="font:700 10px/1 -apple-system,Segoe UI,Roboto,sans-serif;letter-spacing:.09em;text-transform:uppercase;color:${C.camel};padding-bottom:5px">${esc(k)}</div>
      <div style="font:400 15px/1.6 -apple-system,Segoe UI,Roboto,sans-serif;color:${C.texto}">${esc(v)}</div>
    </td></tr>`
  const chip = (t: string) => `<span style="display:inline-block;font:600 12px/1 -apple-system,Segoe UI,Roboto,sans-serif;background:${C.arena};color:${C.choc};padding:6px 11px;border-radius:20px;margin:0 6px 6px 0">${esc(t)}</span>`
  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fff;border:1px solid #e0d4c0;border-radius:14px;margin:0 0 16px">
    <tr><td style="padding:22px 24px">
      <div style="font:700 10px/1 -apple-system,Segoe UI,Roboto,sans-serif;letter-spacing:.09em;text-transform:uppercase;color:${C.camel};padding-bottom:8px">${esc(p.categoria)}</div>
      <div style="font:600 18px/1.35 -apple-system,Segoe UI,Roboto,sans-serif;color:${C.choc};padding-bottom:16px">${esc(p.titulo)}</div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        ${fila('Qué', p.que)}
        ${fila('Por qué', p.porque)}
        ${fila('Cómo sabremos si funcionó', p.como_se_mide)}
      </table>
      <div style="padding-top:10px;border-top:1px solid ${C.arena};margin-top:6px">
        ${chip('Impacto ' + String(p.impacto ?? '—'))}${chip('Esfuerzo ' + String(p.esfuerzo ?? '—'))}${chip('Lo hace: ' + String(p.quien ?? '—'))}
      </div>
    </td></tr>
  </table>`
}

function cuerpo(props: Record<string, unknown>[]): string {
  const n = props.length
  // El <meta charset> es obligatorio: sin él, muchos clientes de correo
  // adivinan la codificación y los acentos y las eñes salen rotos.
  return `<!doctype html><html lang="es"><head><meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1"></head>
  <body style="margin:0;padding:0;background:${C.piedra}">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.piedra};padding:28px 14px">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:620px">
        <tr><td style="padding:0 4px 22px">
          <div style="font:700 22px/1.25 -apple-system,Segoe UI,Roboto,sans-serif;color:${C.choc}">${n} propuesta${n === 1 ? '' : 's'} para revisar</div>
          <div style="font:400 15px/1.6 -apple-system,Segoe UI,Roboto,sans-serif;color:${C.gris};padding-top:7px">
            Del estratega de innovación. <strong style="color:${C.choc}">Nada de esto se ha hecho todavía</strong>: espera tu visto bueno.
          </div>
        </td></tr>
        <tr><td>${props.map(tarjeta).join('')}</td></tr>
        <tr><td align="center" style="padding:10px 0 6px">
          <a href="${PANEL}" style="display:inline-block;background:${C.choc};color:#fff;text-decoration:none;font:600 15px/1 -apple-system,Segoe UI,Roboto,sans-serif;padding:14px 26px;border-radius:26px">Ver el panel completo</a>
        </td></tr>
        <tr><td align="center" style="padding:20px 8px 0;font:400 12px/1.6 -apple-system,Segoe UI,Roboto,sans-serif;color:${C.gris}">
          Para aprobar o descartar, respóndele a Claude indicando cuáles quieres.<br>Misión del agente: ser el primer resultado en Google en Medellín para salud vascular.
        </td></tr>
      </table>
    </td></tr>
  </table></body></html>`
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors })
  try {
    // 1. Solo responde a quien conoce la clave compartida
    const clave = Deno.env.get('CLAVE_ENVIO')
    if (!clave || req.headers.get('x-clave') !== clave) {
      return json({ ok: false, error: 'no autorizado' }, 401)
    }

    const apiKey = Deno.env.get('RESEND_API_KEY')
    const destino = Deno.env.get('DESTINO') || 'info@clinicaseravena.com'
    const remitente = Deno.env.get('REMITENTE') || 'Seravena <onboarding@resend.dev>'
    if (!apiKey) return json({ ok: false, error: 'falta RESEND_API_KEY' }, 500)

    // 2. Leer las propuestas publicadas
    const r = await fetch(`${FUENTE}?t=${Date.now()}`)
    if (!r.ok) return json({ ok: false, error: `no se pudo leer propuestas.json (${r.status})` }, 502)
    const data = await r.json()
    const todas: Record<string, unknown>[] = data.propuestas || []

    // 3. Quedarse solo con las pendientes de los últimos 8 días
    const corte = new Date(Date.now() - 8 * 864e5).toISOString().slice(0, 10)
    const nuevas = todas.filter(p => (p.estado ?? 'propuesta') === 'propuesta' && String(p.fecha ?? '') >= corte)

    // Semana sin novedades: no se envía nada. Un correo vacío cada lunes
    // enseña a ignorar el remitente.
    if (!nuevas.length) return json({ ok: true, enviado: false, motivo: 'sin propuestas nuevas esta semana' })

    // 4. Enviar
    const asunto = `${nuevas.length} propuesta${nuevas.length === 1 ? '' : 's'} de innovación · ${fmtFecha(data.actualizado)}`
    const envio = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: remitente, to: [destino], subject: asunto, html: cuerpo(nuevas) }),
    })
    const resp = await envio.json()
    if (!envio.ok) return json({ ok: false, error: 'Resend rechazó el envío', detalle: resp }, 502)

    return json({ ok: true, enviado: true, cuantas: nuevas.length, destino, id: resp.id })
  } catch (e) {
    return json({ ok: false, error: String(e) }, 500)
  }
})
