# ⚽ Prediccion Copa de la Liga Profesional 2024

Proyecto fullstack para la predicción de resultados de la Copa de la Liga Profesional de Argentina.

La app obtiene los datos de la tabla y los partidos de la temporada actual, se calcula la eficacia de los equipos y se predice la posición final de cada uno en la tabla de posiciones, tanto para ingreso a copas internacionales como para el descenso en la tabla de promedios.

## 📊 Obtención de datos

La información en tiempo real se extrae de la web de **[Promiedos](https://www.promiedos.com.ar/league/liga-profesional/hc)**. Se puede revisar su política de uso de datos en el siguiente [enlace](https://www.promiedos.com.ar/legal).

## 🔌 API REST

El proyecto incluye una API REST completa para acceder a los datos de predicciones y gestionar la autenticación de usuarios.

### 📋 Documentación de la API

La documentación completa de la API está disponible en formato OpenAPI/Swagger:

[https://prediccion-copa-liga.vercel.app/docs](https://prediccion-copa-liga.vercel.app/docs)

### 🚪 Endpoints principales

| Método | Endpoint                                      | Descripción                       | Autenticación |
| ------ | --------------------------------------------- | --------------------------------- | ------------- |
| `POST` | `/api/register`                               | Registrar nuevo usuario           | No            |
| `POST` | `/api/get-token`                              | Obtener token JWT                 | No            |
| `POST` | `/api/revoke-token`                           | Revocar token                     | No            |
| `GET`  | `/api/prediction`                             | Obtener predicciones completas    | No\*          |
| `GET`  | `/api/prediction?position=1`                  | Obtener predicción por posición   | Sí            |
| `GET`  | `/api/prediction?name=Instituto`              | Obtener predicción por equipo     | Sí            |
| `GET`  | `/api/prediction?classification=libertadores` | Obtener equipos por clasificación | Sí            |

_\* Las consultas con parámetros requieren autenticación_

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

La especificación completa está disponible en `/api/openapi` en formato JSON.

## 🚀 Comenzando

Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas.

### 📋 Pre-requisitos

Qué cosas necesitas para instalar el software y cómo instalarlas

- [Node.js](https://nodejs.org/es/) - Versión 16.x o superior
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
npm dev
```

### 🧪 Tests

Para correr los tests

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
