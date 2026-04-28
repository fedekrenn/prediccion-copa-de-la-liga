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

- El titulo del PR debe seguir el estilo real del repo: categorias combinadas en espanol + descripcion breve.
- Formato recomendado del titulo: `Fix + Refactor + Chore - Descripcion corta`.
- Usar solo las categorias que realmente aplican. Ejemplos comunes en este repo: `Fix`, `Refactor`, `Chore`, `Feature`, `Style`, `SEO`, `Accesibilidad`, `Performance`.
- No usar formatos genericos como `[project] ...` ni titulos en ingles si el resto del repo viene en espanol.
- El cuerpo del PR debe estar en espanol y priorizar secciones narrativas, no tablas mecanicas.
- Estructura recomendada del cuerpo:
  - `## Cambios principales`
  - `## Beneficios`
  - `## Verificacion`
  - `## Commits incluidos` cuando la PR agrupa varios commits relevantes
- En `Cambios principales`, explicar que se cambio y por que, agrupando por temas.
- En `Beneficios`, dejar explicito el impacto tecnico o funcional de los cambios.
- En `Verificacion`, listar checks concretos ejecutados, por ejemplo `pnpm test`, `pnpm astro check`, `pnpm audit` o la validacion puntual que corresponda.
- Si la PR sale de `dev` hacia `main`, revisar primero PRs cerradas recientes para mantener continuidad de tono, idioma y nivel de detalle.
- Antes de commitear o abrir la PR, ejecutar `pnpm test` y `pnpm astro check`.
- Luego de abrir una PR, revisar el deploy disponible y validar que funcione correctamente cuando aplique.
