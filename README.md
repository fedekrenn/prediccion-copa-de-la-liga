# ⚽ Predicción Liga Profesional de Fútbol Argentino 2026

Proyecto fullstack para la predicción de posiciones finales de la Liga Profesional de Futbol Argentino.

La app obtiene los datos de la tabla y los partidos de la temporada actual, calcula la eficacia de los equipos y predice la posicion final de cada uno en la tabla, tanto para el ingreso a copas internacionales como para el descenso en la tabla de promedios. Además, expone endpoints para consultar el fixture actual y filtrar partidos por fecha, estado o equipo.

## 📊 Obtención de datos

La información en tiempo real se extrae de la web de **[Promiedos](https://www.promiedos.com.ar/league/liga-profesional/hc)**. Se puede revisar su política de uso de datos en el siguiente [enlace](https://www.promiedos.com.ar/legal).

## 🔌 API REST

El proyecto incluye una API REST completa para acceder a los datos de predicciones, consultar el fixture y gestionar la autenticacion de usuarios.

### 📋 Documentación de la API

La documentación completa de la API está disponible en formato OpenAPI/Swagger:

[https://prediccion-copa-liga.vercel.app/docs](https://prediccion-copa-liga.vercel.app/docs)

### 🚪 Endpoints principales

| Método | Endpoint                                      | Descripción                            | Autenticación |
| ------ | --------------------------------------------- | -------------------------------------- | ------------- |
| `POST` | `/api/register`                               | Registrar nuevo usuario                | No            |
| `POST` | `/api/get-token`                              | Obtener token JWT                      | No            |
| `POST` | `/api/revoke-token`                           | Revocar token                          | No            |
| `GET`  | `/api/fixture`                                | Obtener fixture de la fecha actual     | No\*          |
| `GET`  | `/api/fixture/rounds`                         | Obtener fechas disponibles del fixture | No            |
| `GET`  | `/api/fixture?round=10`                       | Obtener fixture de una fecha puntual   | No            |
| `GET`  | `/api/fixture?team=River`                     | Filtrar partidos por equipo            | Si            |
| `GET`  | `/api/fixture?status=finished`                | Filtrar partidos por estado            | Si            |
| `GET`  | `/api/fixture?date=24-02-2026`                | Filtrar partidos por dia               | Si            |
| `GET`  | `/api/prediction`                             | Obtener predicciones completas         | No\*          |
| `GET`  | `/api/prediction?position=1`                  | Obtener predicción por posición        | Si            |
| `GET`  | `/api/prediction?name=Instituto`              | Obtener predicción por equipo          | Si            |
| `GET`  | `/api/prediction?classification=libertadores` | Obtener equipos por clasificación      | Si            |

_\* En general, las consultas con parametros requieren autenticacion. En `/api/fixture`, tanto la consulta base sin parametros como la variante con `round` son publicas._

### 🔑 Autenticación

La API utiliza tokens (JWT) para la autenticación. En este proyecto los tokens se usan como "API tokens":

1. El cliente obtiene un token al registrar un usuario con `POST /api/register` o también llamando con `POST /api/get-token`. En este caso se informa si se devolvió un token existente (junto a la fecha de expiración), se renovó uno vencido o se creó uno nuevo.
2. El token tiene una fecha de expiración de 1 año y debe renovarse cuando venza.
3. Incluye el token en el header `Authorization: Bearer <token>` para acceder a endpoints protegidos.

Campos devueltos por `POST /api/get-token`:

- `token`: string — El JWT/Token para usar en Authorization header.
- `expiration_date`: string (ISO) — Momento exacto en que vencerá el token.
- `status`: string — Indica si el token fue devuelto ("existing_valid_token"), renovado ("token_renewed") o creado ("new_token_created").

Ejemplo de respuesta:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiration_date": "2026-09-16T12:00:00.000Z",
  "status": "new_token_created"
}
```

### 📄 Especificación OpenAPI

La especificacion completa esta disponible en `/api/openapi` en formato JSON e incluye autenticacion, predicciones y endpoints de fixture.

## 🚀 Comenzando

Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas.

### 📋 Pre-requisitos

Qué cosas necesitas para instalar el software y cómo instalarlas

- [Node.js](https://nodejs.org/es/) - Version 21.7 o superior
- [pnpm](https://pnpm.io/) - Gestor de paquetes (opcional pero recomendado)

### 🔧 Instalación

```bash
git clone https://github.com/fedekrenn/prediccion-copa-de-la-liga.git && cd prediccion-copa-de-la-liga
```

Una vez clonado el repositorio, instala las dependencias necesarias, por mejor rendimiento usamos **pnpm** pero puedes usar sin problemas **npm**

```bash
pnpm install
```

o

```bash
npm install
```

### 📦 Despliegue

Para correr el proyecto en modo desarrollo

```bash
pnpm dev
```

o

```bash
npm run dev
```

### 🧪 Tests

Para correr los tests

Actualmente hay cobertura para routes, use-cases y utilidades.

```bash
pnpm test
```

> [!IMPORTANT]
> Para importar el token de la variable de entorno se usa el método nativo `process.loadEnvFile()` de Node > 21.7, si usas una versión inferior, deberás instalar un paquete que te permita hacerlo.

## 🛠️ Construido con

- [Astro](https://astro.build/) - Framework web usado
- [TypeScript](https://www.typescriptlang.org/) - Lenguaje de tipado fuerte para front y back
- [React](https://es.reactjs.org/) - Biblioteca de JavaScript para interfaces del front dinámicas
- [Tailwind CSS](https://tailwindcss.com/) - Framework de CSS
- [Vercel](https://vercel.com/) - Plataforma de deployment

<br>

## 🙋‍♂️ Hola, Soy Federico Krenn

:nerd_face: Software Developer
<br>
👨‍🎓 Técnico Superior en Desarrollo Web y aplicaciones. También me encuentro realizando la Tecnicatura en Software Libre en la UNL.
<br>
📫 Conectemos en Linkedin: https://www.linkedin.com/in/fkrenn/
