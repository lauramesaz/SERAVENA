# Plan de trabajo · Blog SEO de Seravena

> Hoja de ruta acordada con Laura. Se marca cada punto al completarlo.
> Estado general: el sistema base y el equipo de 5 agentes ya están construidos (jul 2026).
> Principio rector: **el equipo se auto-retroalimenta** — cada artículo publicado genera datos,
> los datos generan aprendizajes, y los aprendizajes mejoran los manuales de los agentes.
> Cada mes el equipo debe ser mejor que el anterior.

---

## 🔄 El motor de auto-mejora (transversal a todas las fases)

Es el corazón del plan: un circuito cerrado donde el equipo aprende de la realidad.

```
   PUBLICAR → MEDIR → APRENDER → MEJORAR LOS MANUALES → PUBLICAR MEJOR
      ▲                                                        │
      └────────────────────────────────────────────────────────┘
```

**Piezas del motor:**

1. **Bitácora de aprendizajes** (`aprendizajes.md`) — memoria viva del equipo. Cada semana se
   anota QUÉ FUNCIONÓ y QUÉ NO con datos reales: qué títulos consiguen clics, qué keywords
   posicionan rápido, qué temas generan contactos, qué estructura retiene lectores.
2. **Ciclo semanal de retroalimentación** — la rutina de análisis no solo mira números:
   - Lee Search Console (posiciones, clics) + clics de "Agendar"/WhatsApp.
   - Compara los artículos ganadores contra los flojos y extrae el patrón
     ("los títulos-pregunta rinden +40%", "lipedema convierte más que prevención"…).
   - Escribe el aprendizaje en `aprendizajes.md`.
   - **Actualiza los manuales de los agentes** con la lección (el Redactor escribe como los
     ganadores; el Juez SEO endurece su rúbrica donde detecta fallos repetidos).
   - Reordena `temas.md`: los temas parecidos a los ganadores suben de prioridad.
3. **Experimentos controlados** — cada semana el equipo prueba UNA variación deliberada
   (estilo de título, longitud, tipo de FAQ…) y a la semana siguiente mide si ganó o perdió.
   Lo que gana se vuelve regla; lo que pierde se descarta. Mejora con método, no por intuición.
4. **El Entrenador (6º agente, mensual)** — un agente que no escribe artículos: audita al
   propio equipo. Una vez al mes revisa toda la bitácora y responde:
   - ¿Qué agente está fallando más? (¿el médico frena mucho? ¿el juez deja pasar títulos flojos?)
   - ¿Qué regla de los manuales ya quedó obsoleta según los datos?
   - ¿Qué capacidad nueva le falta al equipo? (propone la siguiente mejora del sistema)
   - Entrega un informe con cambios concretos a los manuales.
5. **Niveles de autonomía crecientes** — el equipo gana poderes a medida que demuestra calidad:
   - **Nivel 1 (ahora):** Laura aprueba cada artículo.
   - **Nivel 2:** publica solo; Laura solo revisa el aviso diario.
   - **Nivel 3:** además auto-ajusta sus manuales de estilo y SEO con los aprendizajes.
   - **Nivel 4:** además rediseña su cola de temas y propone experimentos por sí mismo.
   Se sube de nivel solo cuando Laura está conforme con el nivel actual.

**Límite de seguridad (no negociable):** el equipo puede auto-mejorar su estilo, su SEO y sus
temas, pero **NUNCA puede relajar por sí solo las salvaguardas médicas** (§2 de INSTRUCCIONES.md)
ni los gates de verificación. Cualquier cambio a esas reglas lo aprueba Laura en persona.

---

## Fase 1 · Salir a producción (esta semana)

- [ ] **Publicar la sección de blog** + artículo de muestra (con visto bueno de Laura al diseño).
- [ ] **Prueba manual del pipeline completo** con 1 artículo real:
      Investigador → Verificador médico → Juez SEO → aprobación de Laura → Publicador → Auditor.
- [ ] Repetir con 2-3 artículos más, afinando tono y lineamientos con el feedback de Laura.
- [ ] **Crear `aprendizajes.md`** y anotar las primeras lecciones (las correcciones de Laura
      son el primer dato de entrenamiento: cada "no me gusta X" se convierte en regla).

## Fase 2 · Ver resultados reales (semana 1-2)

- [ ] **Conectar Google Search Console** (gratis, ~10 min, guiado). Sin datos no hay aprendizaje:
      es el combustible del motor de auto-mejora.
- [ ] Enviar el sitemap y **solicitar indexación** de los primeros artículos.
- [ ] **Medir contactos, no solo visitas:** registrar clics en "Agendar valoración" y WhatsApp
      desde los artículos (evento de Google Analytics ya instalado en la web).
- [ ] **Fijar la línea base:** guardar en `aprendizajes.md` los números de partida
      (impresiones, clics, contactos) para poder demostrar la mejora mes a mes.

## Fase 3 · Mejoras de calidad y SEO (semana 2-3)

Por orden de impacto:

- [ ] **Firma/revisión médica real** — hablar con el médico de Seravena para que aparezca como
      revisor con nombre y credenciales (mejora #1 para contenido de salud en Google).
- [ ] **Artículos relacionados** — bloque "Lee también" al final de cada post (enlaces entre
      artículos del mismo tema). Añadirlo a la plantilla y a las reglas del Publicador.
- [ ] **Preguntas frecuentes con schema FAQ** — 3-4 preguntas al final de cada post con datos
      estructurados, para optar a los resultados enriquecidos de Google.
- [ ] **Imágenes propias por artículo** — generar imagen de portada en estilo Seravena para cada
      post (evitar que todos usen las mismas 3 fotos).
- [ ] **Anti-canibalización** — el Juez SEO comprueba contra `registro.md` que la keyword del
      artículo nuevo no compita con uno ya publicado.
- [ ] **Calendario equilibrado** — regla para alternar categorías (lipedema / vascular / prevención).
- [ ] **Primer experimento controlado** — probar 2 estilos de título durante una semana y
      quedarse con el ganador (estreno del método de experimentos).

## Fase 4 · Automatizar el circuito completo (cuando Laura apruebe la calidad → Nivel 2)

- [ ] **Rutina diaria en la nube**: ejecuta el pipeline completo 1 vez/día, publica y avisa a
      Laura (se quita el gate manual; queda la red de seguridad: aviso diario + fácil revertir).
- [ ] **Rutina semanal de retroalimentación**: lee Search Console, actualiza `registro.md`,
      extrae aprendizajes, **actualiza los manuales de los agentes** y reordena `temas.md`.
      Manda a ACTUALIZAR (no borrar) los artículos flojos.
- [ ] **Rutina mensual del Entrenador**: audita el desempeño del equipo, propone cambios a los
      manuales y una mejora nueva del sistema. Su informe llega a Laura.
- [ ] **RSS y paginación del listado** cuando haya ~20+ artículos.

## Fase 5 · El equipo evoluciona solo (mensual → Niveles 3-4)

- [ ] Revisión mensual con Laura: informe del Entrenador + qué posiciona + qué genera contactos.
- [ ] **Subida de nivel de autonomía** si Laura está conforme (Nivel 3: auto-ajusta manuales;
      Nivel 4: auto-genera temas y experimentos).
- [ ] **Decisión de cadencia** (al cumplir ~30 artículos): mantener 1/día o pasar a 3-4/semana
      de mayor profundidad. Se decide con los datos, no por intuición.
- [ ] Refrescar artículos con +3 meses y bajo rendimiento aplicando los aprendizajes nuevos
      (los posts viejos se reescriben con las técnicas que hoy ya sabemos que ganan).
- [ ] Renovar la cola de `temas.md` según lo que la gente realmente busca (datos de GSC:
      las búsquedas donde ya aparecemos en posición 8-20 son oro — un empujón las sube a top 5).

---

## Reglas permanentes (no cambian nunca, ni con auto-mejora)

- Contenido médico siempre verificado con fuentes; sin promesas de cura.
- Bajo rendimiento = **actualizar**, no borrar.
- Nada se publica sin pasar los gates: médico ✔, SEO ≥ 85 ✔, auditoría ✔.
- Las salvaguardas médicas y los gates solo los cambia Laura, jamás el equipo por sí solo.
- Todo queda registrado en `registro.md`, `aprendizajes.md` y en git (reversible).
