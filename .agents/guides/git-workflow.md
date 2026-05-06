# Git y pull requests

## Commits

Formato: `<tipo>: descripción`

Tipos:

- `feat`: nueva funcionalidad
- `fix`: corrección de bug
- `refactor`: reorganización sin cambio de comportamiento
- `chore`: tareas de mantenimiento
- `docs`: documentación

Ejemplos:

- `feat: add pino logger`
- `fix: remove invalid CORS credentials header`
- `refactor: use handleApiError with CORS support`
- `docs: document commit style guide`

IMPORTANTE: No usar <tipo>(scope): descripción. El scope no aporta valor en este proyecto y solo complica el proceso de commit.

## Pull requests

- El título del PR debe seguir el estilo real del repo: categorías combinadas en español + descripción breve.
- Formato recomendado del título: `Fix + Refactor + Chore - Descripción corta`.
- Usar solo las categorías que realmente aplican. Ejemplos comunes en este repo: `Fix`, `Refactor`, `Chore`, `Feature`, `Style`, `SEO`, `Accesibilidad`, `Performance`.
- No usar formatos genéricos como `[project] ...` ni títulos en inglés si el resto del repo viene en español.
- El cuerpo del PR debe estar en español y priorizar secciones narrativas, no tablas mecánicas.
- Estructura recomendada del cuerpo:
  - `## Cambios principales`
  - `## Beneficios`
  - `## Verificación`
  - `## Commits incluidos` cuando la PR agrupa varios commits relevantes
- En `Cambios principales`, explicar qué se cambió y por qué, agrupando por temas.
- En `Beneficios`, dejar explícito el impacto técnico o funcional de los cambios.
- En `Verificación`, listar checks concretos ejecutados, por ejemplo `pnpm test`, `pnpm astro check`, `pnpm audit` o la validación puntual que corresponda.
- Si la PR sale de `dev` hacia `main`, revisar primero PRs cerradas recientes para mantener continuidad de tono, idioma y nivel de detalle.
- Antes de commitear o abrir la PR, ejecutar `pnpm test` y `pnpm astro check`.
- Luego de abrir una PR, revisar el deploy disponible y validar que funcione correctamente cuando aplique.
