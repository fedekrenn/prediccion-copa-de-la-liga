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

- Titulo del PR: `[<project_name>] Descripcion clara y concisa`.
- Mantener PRs pequenos y enfocados.
- Antes de commitear, ejecutar `pnpm test` y `astro check`.
- Explicar que cambio, por que, como se verifico y cual fue el beneficio.
- Luego de abrir una PR, revisar el deploy disponible y validar que funcione correctamente.
