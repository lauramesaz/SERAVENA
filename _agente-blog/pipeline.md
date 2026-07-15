# Pipeline del blog · Equipo de agentes de Seravena

Este documento explica **cómo trabaja en cadena el equipo de agentes** para crear y publicar
un artículo. Cada agente tiene su propio archivo de lineamientos en `_agente-blog/agentes/`.
Conocimiento compartido por todos: `INSTRUCCIONES.md` (marca, SEO base, salvaguardas médicas),
`temas.md`, `plantilla-post.html`, `registro.md`.

## El equipo

| # | Agente | Archivo | Misión en una frase |
|---|--------|---------|----------------------|
| 1 | Investigador-Redactor | `agentes/1-investigador-redactor.md` | Investiga el tema con fuentes reales y escribe el borrador |
| 2 | Verificador médico | `agentes/2-verificador-medico.md` | Comprueba que cada afirmación de salud sea real y prudente |
| 3 | Juez SEO | `agentes/3-juez-seo.md` | Puntúa y corrige el SEO según lineamientos |
| 4 | Publicador / indexación | `agentes/4-publicador.md` | Optimiza indexación, integra en la web y publica |
| 5 | Auditor de implementación | `agentes/5-auditor.md` | Verifica que todo quedó bien montado antes y después de publicar |

## Orden de trabajo (cadena con controles de calidad)

```
        ┌─────────────────────────────────────────────────────────┐
        │  1. INVESTIGADOR-REDACTOR  → borrador + fuentes          │
        └─────────────────────────────────────────────────────────┘
                              │
             ┌────────────────┴────────────────┐
             ▼                                 ▼
   ┌───────────────────┐             ┌───────────────────┐
   │ 2. VERIF. MÉDICO  │             │   3. JUEZ SEO     │   (revisan en paralelo)
   │  aprueba / corrige│             │  nota 0-100 + fixes│
   └───────────────────┘             └───────────────────┘
             │                                 │
             └────────────────┬────────────────┘
                              ▼
             ¿Ambos aprueban (médico OK y SEO ≥ 85)?
                    │ no → vuelve al Redactor con las correcciones
                    │ sí ▼
        ┌─────────────────────────────────────────────────────────┐
        │  🔔 APROBACIÓN DE LAURA (durante la fase "a mano")       │
        │  Se le muestra el borrador final + nota SEO + visto médico│
        └─────────────────────────────────────────────────────────┘
                              │ Laura dice "publícalo"
                              ▼
        ┌─────────────────────────────────────────────────────────┐
        │  4. PUBLICADOR  → indexación, tarjeta, sitemap, git push │
        └─────────────────────────────────────────────────────────┘
                              ▼
        ┌─────────────────────────────────────────────────────────┐
        │  5. AUDITOR  → verifica que todo quedó bien implementado │
        │     (si algo falla, corrige y vuelve a auditar)          │
        └─────────────────────────────────────────────────────────┘
                              ▼
                    Registro + aviso a Laura
```

## Controles de aprobación (gates)

- **Gate médico:** el artículo NO avanza si el Verificador médico marca algo como falso,
  arriesgado o no verificable. Devuelve al Redactor.
- **Gate SEO:** el artículo NO avanza si la nota del Juez SEO es < 85/100. Devuelve al Redactor.
- **Gate Laura (fase manual):** durante los primeros días, nada se publica sin tu visto bueno.
  Cuando estés conforme con la calidad, este gate se puede quitar para que sea automático
  con red de seguridad (publica + avisa).
- **Gate implementación:** si el Auditor encuentra fallos (enlaces rotos, plantilla mal,
  datos estructurados inválidos), se corrige antes de dar por cerrado.

## Cómo se ejecuta

- **Fase manual (ahora):** se corre el pipeline artículo a artículo; Laura aprueba antes de publicar.
- **Fase automática (después):** una rutina en la nube ejecuta este mismo pipeline 1 vez/día,
  publica y avisa. Una rutina semanal ejecuta el análisis SEO (ver `INSTRUCCIONES.md` §Análisis)
  y manda a ACTUALIZAR (no borrar) los artículos flojos.

## "Actualizado en la vida real"

El Investigador-Redactor debe usar **búsqueda web** para partir de información actual y de
fuentes fiables, no solo de memoria. El Verificador médico también consulta fuentes al validar.
Así el contenido refleja el consenso actual y no queda desactualizado.
