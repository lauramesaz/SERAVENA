// Función de servidor (Edge Function) para gestionar usuarios del equipo.
// Usa la llave maestra (service_role) SOLO en el servidor, nunca en el navegador.
// Solo responde a personas con sesión iniciada en el panel.
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, content-type, apikey, x-client-info',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}
function json(obj: unknown) {
  return new Response(JSON.stringify(obj), { status: 200, headers: { ...cors, 'Content-Type': 'application/json' } })
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors })
  try {
    const url = Deno.env.get('SUPABASE_URL')!
    const anon = Deno.env.get('SUPABASE_ANON_KEY')!
    const service = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const authHeader = req.headers.get('Authorization') || ''

    // Verificar que quien llama tiene sesión iniciada (es del equipo)
    const caller = createClient(url, anon, { global: { headers: { Authorization: authHeader } } })
    const { data: { user }, error: uerr } = await caller.auth.getUser()
    if (uerr || !user) return json({ error: 'No autorizado. Inicia sesión de nuevo.' })

    const admin = createClient(url, service)
    const body = await req.json()

    if (body.action === 'list') {
      const { data, error } = await admin.auth.admin.listUsers()
      if (error) throw error
      return json({ users: data.users.map((u) => ({ id: u.id, email: u.email })) })
    }
    if (body.action === 'create') {
      if (!body.email || !body.password) return json({ error: 'Falta correo o contraseña.' })
      const { data, error } = await admin.auth.admin.createUser({ email: body.email, password: body.password, email_confirm: true })
      if (error) return json({ error: error.message })
      return json({ ok: true, id: data.user?.id })
    }
    if (body.action === 'password') {
      const { error } = await admin.auth.admin.updateUserById(body.id, { password: body.password })
      if (error) return json({ error: error.message })
      return json({ ok: true })
    }
    if (body.action === 'delete') {
      if (body.id === user.id) return json({ error: 'No puedes eliminar tu propio usuario aquí.' })
      const { error } = await admin.auth.admin.deleteUser(body.id)
      if (error) return json({ error: error.message })
      return json({ ok: true })
    }
    return json({ error: 'Acción desconocida.' })
  } catch (e) {
    return json({ error: String((e as Error).message || e) })
  }
})
