-- ============================================================
-- RED DE ALIADOS SERAVENA (portal aliados.html + admin/aliados.html)
-- Solo agrega tablas y funciones nuevas con prefijo red_. No toca nada existente.
-- Las tablas NO se pueden leer directo desde la web pública: todo pasa por
-- funciones que devuelven solo lo necesario (nunca la lista de cédulas).
-- ============================================================
create extension if not exists pgcrypto with schema extensions;

create table if not exists public.red_empresas (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  usuario text unique not null,
  clave_hash text,
  activa boolean not null default true,
  actualizada date,
  creada timestamptz not null default now()
);
create table if not exists public.red_miembros (
  empresa_id uuid not null references public.red_empresas(id) on delete cascade,
  cc text not null,
  nombre text not null,
  creado timestamptz not null default now(),
  primary key (empresa_id, cc)
);
create index if not exists red_miembros_cc on public.red_miembros(cc);
create table if not exists public.red_aliados (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  usuario text unique,
  clave_hash text,
  principal boolean not null default false,
  como text,
  orden int not null default 100,
  activo boolean not null default true,
  creado timestamptz not null default now()
);
create table if not exists public.red_beneficios (
  id uuid primary key default gen_random_uuid(),
  aliado_id uuid not null references public.red_aliados(id) on delete cascade,
  titulo text not null,
  detalle text not null,
  orden int not null default 100
);
create table if not exists public.red_solicitudes (
  id uuid primary key default gen_random_uuid(),
  empresa_id uuid not null references public.red_empresas(id) on delete cascade,
  cc text not null,
  nombre text not null,
  cel text,
  creada timestamptz not null default now()
);
create table if not exists public.red_sesiones (
  token uuid primary key default gen_random_uuid(),
  tipo text not null check (tipo in ('empresa','aliado')),
  ref_id uuid not null,
  expira timestamptz not null default now() + interval '12 hours'
);
create table if not exists public.red_registro (
  id bigserial primary key,
  ip text,
  accion text,
  ok boolean,
  creado timestamptz not null default now()
);
create index if not exists red_registro_ip on public.red_registro(ip, creado);

-- Seguridad: nadie anónimo lee las tablas. El equipo de Seravena (usuarios del /admin) sí las administra.
do $$ declare t text; begin
  foreach t in array array['red_empresas','red_miembros','red_aliados','red_beneficios','red_solicitudes','red_sesiones','red_registro'] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists "admin seravena" on public.%I', t);
    if t not in ('red_sesiones','red_registro') then
      execute format('create policy "admin seravena" on public.%I for all to authenticated using (true) with check (true)', t);
    end if;
    execute format('revoke all on public.%I from anon', t);
  end loop;
end $$;

-- ---------- utilidades internas ----------
create or replace function public.red_ip() returns text language sql stable as $$
  select coalesce(split_part(current_setting('request.headers', true)::json->>'x-forwarded-for', ',', 1), 'desconocida')
$$;

-- Límite de intentos por IP (evita que alguien pruebe cédulas al azar)
create or replace function public.red_limite(p_accion text, p_max int, p_minutos int) returns void
language plpgsql security definer set search_path = public as $$
declare n int;
begin
  select count(*) into n from red_registro
   where ip = red_ip() and accion = p_accion and creado > now() - make_interval(mins => p_minutos);
  if n >= p_max then raise exception 'Demasiados intentos. Espera unos minutos e inténtalo de nuevo.'; end if;
  insert into red_registro(ip, accion) values (red_ip(), p_accion);
  delete from red_registro where creado < now() - interval '2 days';
end $$;

create or replace function public.red_sesion(p_token uuid, p_tipo text) returns uuid
language plpgsql security definer set search_path = public as $$
declare r uuid;
begin
  select ref_id into r from red_sesiones where token = p_token and tipo = p_tipo and expira > now();
  if r is null then raise exception 'Tu sesión terminó. Vuelve a entrar.'; end if;
  return r;
end $$;

create or replace function public.red_solo_digitos(v text) returns text language sql immutable as $$
  select regexp_replace(coalesce(v,''), '\D', '', 'g')
$$;

-- Beneficios de toda la red en JSON
create or replace function public.red_json_beneficios() returns jsonb
language sql stable security definer set search_path = public as $$
  select coalesce(jsonb_agg(jsonb_build_object(
    'nombre', a.nombre, 'principal', a.principal, 'como', a.como,
    'beneficios', coalesce((select jsonb_agg(jsonb_build_object('t', b.titulo, 'd', b.detalle) order by b.orden, b.titulo)
                            from red_beneficios b where b.aliado_id = a.id), '[]'::jsonb)
  ) order by a.principal desc, a.orden, a.nombre), '[]'::jsonb)
  from red_aliados a where a.activo
$$;

-- ---------- EMPLEADO (público) ----------
create or replace function public.red_consultar(p_cc text) returns jsonb
language plpgsql security definer set search_path = public as $$
declare v_cc text := red_solo_digitos(p_cc); m record;
begin
  perform red_limite('consultar', 15, 10);
  select mi.nombre, e.nombre as empresa into m
    from red_miembros mi join red_empresas e on e.id = mi.empresa_id
   where mi.cc = v_cc and e.activa limit 1;
  if m is null then return jsonb_build_object('encontrado', false); end if;
  return jsonb_build_object('encontrado', true, 'nombre', m.nombre, 'empresa', m.empresa,
                            'cc4', right(v_cc, 4), 'aliados', red_json_beneficios());
end $$;

create or replace function public.red_empresas_publicas() returns jsonb
language sql stable security definer set search_path = public as $$
  select coalesce(jsonb_agg(jsonb_build_object('id', id, 'nombre', nombre) order by nombre), '[]'::jsonb)
  from red_empresas where activa
$$;

create or replace function public.red_solicitar(p_cc text, p_nombre text, p_empresa uuid, p_cel text) returns jsonb
language plpgsql security definer set search_path = public as $$
begin
  perform red_limite('solicitar', 5, 60);
  if red_solo_digitos(p_cc) = '' or coalesce(trim(p_nombre),'') = '' then raise exception 'Completa nombre y cédula.'; end if;
  if not exists (select 1 from red_empresas where id = p_empresa and activa) then raise exception 'Empresa no válida.'; end if;
  if not exists (select 1 from red_solicitudes where empresa_id = p_empresa and cc = red_solo_digitos(p_cc)) then
    insert into red_solicitudes(empresa_id, cc, nombre, cel)
    values (p_empresa, red_solo_digitos(p_cc), left(trim(p_nombre), 120), left(red_solo_digitos(p_cel), 20));
  end if;
  return jsonb_build_object('ok', true);
end $$;

-- ---------- INGRESO (empresa / aliado) ----------
create or replace function public.red_login(p_tipo text, p_usuario text, p_clave text) returns jsonb
language plpgsql security definer set search_path = public, extensions as $$
declare v_id uuid; v_nombre text; v_hash text; v_token uuid;
begin
  perform red_limite('login', 10, 15);
  if p_tipo = 'empresa' then
    select id, nombre, clave_hash into v_id, v_nombre, v_hash from red_empresas where usuario = lower(trim(p_usuario)) and activa;
  elsif p_tipo = 'aliado' then
    select id, nombre, clave_hash into v_id, v_nombre, v_hash from red_aliados where usuario = lower(trim(p_usuario)) and activo;
  end if;
  if v_id is null or v_hash is null or crypt(p_clave, v_hash) <> v_hash then
    raise exception 'Usuario o clave incorrectos.';
  end if;
  delete from red_sesiones where expira < now();
  insert into red_sesiones(tipo, ref_id) values (p_tipo, v_id) returning token into v_token;
  return jsonb_build_object('token', v_token, 'nombre', v_nombre);
end $$;

create or replace function public.red_salir(p_token uuid) returns void
language sql security definer set search_path = public as $$ delete from red_sesiones where token = p_token $$;

-- ---------- PORTAL EMPRESA (Recursos Humanos) ----------
create or replace function public.red_empresa_datos(p_token uuid) returns jsonb
language plpgsql security definer set search_path = public as $$
declare v uuid := red_sesion(p_token, 'empresa');
begin
  return (select jsonb_build_object(
    'nombre', e.nombre, 'actualizada', e.actualizada,
    'miembros', coalesce((select jsonb_agg(jsonb_build_object('cc', cc, 'nombre', nombre) order by nombre) from red_miembros where empresa_id = v), '[]'::jsonb),
    'solicitudes', coalesce((select jsonb_agg(jsonb_build_object('id', id, 'cc', cc, 'nombre', nombre, 'cel', cel) order by creada) from red_solicitudes where empresa_id = v), '[]'::jsonb)
  ) from red_empresas e where e.id = v);
end $$;

create or replace function public.red_empresa_agregar(p_token uuid, p_cc text, p_nombre text) returns void
language plpgsql security definer set search_path = public as $$
declare v uuid := red_sesion(p_token, 'empresa');
begin
  if red_solo_digitos(p_cc) = '' or coalesce(trim(p_nombre),'') = '' then raise exception 'Completa nombre y cédula.'; end if;
  insert into red_miembros(empresa_id, cc, nombre) values (v, red_solo_digitos(p_cc), left(trim(p_nombre),120))
  on conflict (empresa_id, cc) do update set nombre = excluded.nombre;
  delete from red_solicitudes where empresa_id = v and cc = red_solo_digitos(p_cc);
end $$;

create or replace function public.red_empresa_quitar(p_token uuid, p_cc text) returns void
language plpgsql security definer set search_path = public as $$
declare v uuid := red_sesion(p_token, 'empresa');
begin delete from red_miembros where empresa_id = v and cc = red_solo_digitos(p_cc); end $$;

create or replace function public.red_empresa_rechazar(p_token uuid, p_id uuid) returns void
language plpgsql security definer set search_path = public as $$
declare v uuid := red_sesion(p_token, 'empresa');
begin delete from red_solicitudes where empresa_id = v and id = p_id; end $$;

-- Reemplaza la lista completa (Excel de nómina). p_lista = [{"cc":"..","nombre":".."}, ...]
create or replace function public.red_empresa_reemplazar(p_token uuid, p_lista jsonb) returns jsonb
language plpgsql security definer set search_path = public as $$
declare v uuid := red_sesion(p_token, 'empresa'); n int;
begin
  if jsonb_array_length(p_lista) = 0 then raise exception 'La lista está vacía.'; end if;
  if jsonb_array_length(p_lista) > 20000 then raise exception 'La lista es demasiado grande.'; end if;
  delete from red_miembros where empresa_id = v;
  insert into red_miembros(empresa_id, cc, nombre)
  select distinct on (red_solo_digitos(x->>'cc')) v, red_solo_digitos(x->>'cc'), left(trim(x->>'nombre'),120)
    from jsonb_array_elements(p_lista) x
   where red_solo_digitos(x->>'cc') <> '' and coalesce(trim(x->>'nombre'),'') <> '';
  get diagnostics n = row_count;
  delete from red_solicitudes s where s.empresa_id = v and exists (select 1 from red_miembros m where m.empresa_id = v and m.cc = s.cc);
  update red_empresas set actualizada = current_date where id = v;
  return jsonb_build_object('total', n);
end $$;

-- ---------- PORTAL ALIADO ----------
create or replace function public.red_aliado_datos(p_token uuid) returns jsonb
language plpgsql security definer set search_path = public as $$
declare v uuid := red_sesion(p_token, 'aliado');
begin
  return (select jsonb_build_object('nombre', a.nombre, 'como', a.como,
    'beneficios', coalesce((select jsonb_agg(jsonb_build_object('t', titulo, 'd', detalle) order by orden, titulo) from red_beneficios where aliado_id = v), '[]'::jsonb))
    from red_aliados a where a.id = v);
end $$;

create or replace function public.red_aliado_verificar(p_token uuid, p_cc text) returns jsonb
language plpgsql security definer set search_path = public as $$
declare v uuid := red_sesion(p_token, 'aliado'); m record;
begin
  select mi.nombre, e.nombre as empresa into m
    from red_miembros mi join red_empresas e on e.id = mi.empresa_id
   where mi.cc = red_solo_digitos(p_cc) and e.activa limit 1;
  if m is null then return jsonb_build_object('activo', false); end if;
  return jsonb_build_object('activo', true, 'nombre', m.nombre, 'empresa', m.empresa);
end $$;

-- ---------- ADMIN SERAVENA: poner clave a una empresa o aliado ----------
create or replace function public.red_admin_clave(p_tipo text, p_id uuid, p_clave text) returns void
language plpgsql security definer set search_path = public, extensions as $$
begin
  if auth.role() <> 'authenticated' then raise exception 'Solo el equipo de Seravena.'; end if;
  if length(coalesce(p_clave,'')) < 4 then raise exception 'La clave debe tener al menos 4 caracteres.'; end if;
  if p_tipo = 'empresa' then update red_empresas set clave_hash = crypt(p_clave, gen_salt('bf')) where id = p_id;
  elsif p_tipo = 'aliado' then update red_aliados set clave_hash = crypt(p_clave, gen_salt('bf')) where id = p_id; end if;
  delete from red_sesiones where ref_id = p_id;
end $$;

-- Permisos: la web pública solo puede llamar estas funciones
revoke all on function public.red_limite(text,int,int), public.red_sesion(uuid,text), public.red_json_beneficios() from public, anon, authenticated;
grant execute on function public.red_consultar(text), public.red_empresas_publicas(), public.red_solicitar(text,text,uuid,text),
  public.red_login(text,text,text), public.red_salir(uuid),
  public.red_empresa_datos(uuid), public.red_empresa_agregar(uuid,text,text), public.red_empresa_quitar(uuid,text),
  public.red_empresa_rechazar(uuid,uuid), public.red_empresa_reemplazar(uuid,jsonb),
  public.red_aliado_datos(uuid), public.red_aliado_verificar(uuid,text) to anon, authenticated;
grant execute on function public.red_admin_clave(text,uuid,text) to authenticated;
revoke execute on function public.red_admin_clave(text,uuid,text) from anon;

-- Seravena como aliado principal (sus beneficios se editan en /admin/aliados.html)
insert into public.red_aliados (nombre, principal, como, orden)
select 'Seravena', true, 'Agenda por WhatsApp y muestra tu carné al llegar.', 0
where not exists (select 1 from public.red_aliados where principal);
