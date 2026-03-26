# Issue 47 - Como se implementaron los tests de `/api/get-token`

## Que se hizo

En esta tarea agregamos tests para la ruta `POST /api/get-token` y para su `OPTIONS` en `tests/routes/get-token.routes.test.ts`.

El foco no estuvo en probar la logica interna del caso de uso `getToken`, sino en probar el comportamiento del handler HTTP de Astro definido en `src/pages/api/get-token.ts`.

Eso significa que testeamos cosas como:

- que el endpoint valide el body antes de llamar al caso de uso
- que una autenticacion exitosa devuelva `200`
- que un `CustomError` conserve su status HTTP
- que un error inesperado termine en `500`
- que las respuestas mantengan headers CORS

## Que tipo de test es este

Este archivo tiene tests de ruta a nivel handler.

No es un test unitario puro del caso de uso y tampoco es un test end to end real levantando el servidor. Es una capa intermedia:

- importamos directamente los handlers `POST` y `OPTIONS`
- construimos un `Request` manualmente
- mockeamos el caso de uso `getToken`
- verificamos el `Response` que devuelve la ruta

Este enfoque sirve mucho cuando queremos validar la logica HTTP sin depender de base de datos, JWT reales o servicios externos.

## Archivo real que se probo

La ruta que probamos es esta:

```ts
export const POST: APIRoute = async ({ request }) => {
  const { email, password } = await request.json();

  if (!email || !password) {
    return createCorsResponse(
      JSON.stringify({ error: "Email and password are required" }),
      400
    );
  }

  try {
    const token = await getToken(email, password);
    return createCorsResponse(JSON.stringify(token), 200);
  } catch (error: unknown) {
    return handleApiError(error, corsHeaders);
  }
};
```

La estrategia del test sale directamente de leer esa funcion:

1. hay una rama de validacion temprana
2. hay un camino feliz
3. hay manejo de errores
4. hay soporte CORS

## Herramientas usadas en esta tarea

### 1. `Vitest`

Es el framework de testing del proyecto. Se uso para:

- `describe` para agrupar casos
- `it` para definir escenarios
- `expect` para hacer assertions
- `beforeEach` para limpiar mocks
- `vi` para mockear funciones

Ejemplo real:

```ts
import { beforeEach, describe, expect, it, vi } from "vitest";
```

### 2. `vi.mock`

Sirve para reemplazar el modulo real por una version controlada dentro del test.

```ts
vi.mock("@usecases/auth/getToken", () => ({
  getToken: vi.fn(),
}));
```

Esto es clave porque no queremos que el test:

- consulte una base real
- verifique passwords reales
- genere tokens reales

Queremos aislar el handler HTTP.

### 3. `vi.mocked`

Se usa para trabajar comodamente con la funcion mockeada y poder hacer cosas como `mockResolvedValue` o `mockRejectedValue` con buen tipado.

```ts
vi.mocked(getToken).mockResolvedValue(mockToken);
vi.mocked(getToken).mockRejectedValue(new Error("Database connection failed"));
```

### 4. `Request` y `Response` nativos

No levantamos Astro ni hacemos requests por red. Construimos un `Request` manual:

```ts
const createRequest = (body: object): Request => {
  return new Request("http://localhost:4321/api/get-token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
};
```

Eso permite llamar al handler asi:

```ts
const response = await getTokenPost({
  request: createRequest({ email: "test@example.com", password: "secret123" }),
} as any);
```

El handler recibe un contexto de Astro mas grande, pero para este caso solo necesita `request`. Por eso pasamos un objeto minimo y usamos `as any` para no fabricar todo el contexto completo.

### 5. `pnpm`

En este repo todo se ejecuta con `pnpm`.

Comandos usados en esta tarea:

```bash
pnpm test tests/routes/get-token.routes.test.ts
pnpm test
pnpm build
```

## Logica de testing: como se penso cada caso

La mejor forma de diseñar estos tests es recorrer mentalmente cada rama del handler.

## Paso 1: probar `OPTIONS`

La ruta exporta:

```ts
export const OPTIONS: APIRoute = async () => handleOptionsRequest();
```

Entonces hay que verificar:

- status `200`
- header `Access-Control-Allow-Origin`
- que `Access-Control-Allow-Methods` incluya `POST`

Test:

```ts
const response = await getTokenOptions({} as any);

expect(response.status).toBe(200);
expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");
expect(response.headers.get("Access-Control-Allow-Methods")).toContain("POST");
```

Esto confirma que la preflight request del navegador va a funcionar.

## Paso 2: probar validaciones antes del caso de uso

En el handler hay una validacion temprana:

```ts
if (!email || !password) {
  return createCorsResponse(
    JSON.stringify({ error: "Email and password are required" }),
    400
  );
}
```

Esto nos obliga a cubrir al menos estos escenarios:

- falta `email`
- falta `password`
- body vacio

No alcanza con un solo caso porque queremos dejar documentado que cualquier combinacion incompleta cae en la misma regla.

Ademas, en estos tests verificamos algo muy importante:

```ts
expect(getToken).not.toHaveBeenCalled();
```

Esta assertion valida la logica de corte temprano. Si el body es invalido, el handler debe frenar antes de tocar el caso de uso.

Ese detalle hace que el test sea mejor, porque no solo mira el resultado final; tambien mira que el flujo interno haya tomado el camino correcto.

## Paso 3: probar el camino feliz

Cuando `email` y `password` existen, el handler llama a `getToken` y devuelve `200`.

Para eso mockeamos una respuesta exitosa:

```ts
const mockToken = {
  token: "jwt.token.here",
  expiration_date: new Date("2026-04-26T00:00:00Z"),
  status: "new_token_created",
};

vi.mocked(getToken).mockResolvedValue(mockToken);
```

Despues verificamos dos cosas:

1. la respuesta HTTP
2. la llamada al caso de uso con los parametros correctos

```ts
expect(response.status).toBe(200);
expect(await response.json()).toEqual({
  ...mockToken,
  expiration_date: mockToken.expiration_date.toISOString(),
});
expect(getToken).toHaveBeenCalledWith("test@example.com", "secret123");
```

### Por que convertimos la fecha a ISO en el assertion

Este detalle es importante para trainees.

El caso de uso devuelve un objeto con `expiration_date` como `Date`. Pero la ruta hace esto:

```ts
return createCorsResponse(JSON.stringify(token), 200);
```

`JSON.stringify` convierte un `Date` a string ISO. Entonces el body HTTP ya no tiene un `Date`, sino un string.

Si no tenemos en cuenta esa serializacion, el test falla aunque el handler este bien implementado.

## Paso 4: probar errores esperados del dominio

La ruta usa `handleApiError(error, corsHeaders)`. Ese helper preserva el status si recibe un `CustomError`.

Por eso agregamos casos como:

- `404` para usuario inexistente
- `401` para password invalido
- `400` para email invalido

Ejemplo:

```ts
vi.mocked(getToken).mockRejectedValue(
  new CustomError("Invalid password", 401, "Unauthorized"),
);
```

Y luego:

```ts
expect(response.status).toBe(401);
expect(await response.json()).toEqual({
  error: "Invalid password",
});
```

La logica detras de esto es muy importante:

- el caso de uso decide que tipo de error de negocio ocurrio
- el handler no reinventa ese status
- el helper HTTP lo transforma en una respuesta consistente

Este tipo de test protege el contrato entre capas.

## Paso 5: probar errores inesperados

No todo error va a ser un `CustomError`. Puede haber errores inesperados, por ejemplo:

- una excepcion comun de JavaScript
- un bug
- una falla de infraestructura

Para eso usamos:

```ts
vi.mocked(getToken).mockRejectedValue(new Error("Database connection failed"));
```

Y esperamos:

```ts
expect(response.status).toBe(500);
expect(await response.json()).toEqual({
  error: "Internal server error",
});
```

Esto verifica que la API no filtre mensajes internos al cliente y mantenga una respuesta segura.

## Paso 6: probar headers CORS tambien en error

No alcanza con que el caso feliz tenga headers correctos. Los errores tambien tienen que incluir CORS; si no, un frontend puede recibir bloqueo del navegador antes de leer el body.

Por eso agregamos este test:

```ts
expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");
```

El objetivo es comprobar que `handleApiError` recibio `corsHeaders` y los aplico bien.

## Estructura mental para crear tests parecidos

Cuando tengas que testear otra ruta, pensa asi:

1. que entradas acepta
2. que valida antes de llamar a otras capas
3. cual es el camino feliz
4. que errores de negocio deberian conservar status
5. que errores inesperados deberian transformarse en `500`
6. que headers o detalles de protocolo no se pueden perder

Si recorres esas preguntas, normalmente aparece casi toda la matriz de tests necesaria.

## Por que este enfoque es util para juniors

Porque separa responsabilidades de forma muy clara:

- el test de ruta prueba HTTP y orquestacion
- el caso de uso se puede testear aparte
- los repositorios o servicios externos no participan aca

Eso hace que los tests sean:

- mas rapidos
- mas estables
- mas faciles de leer
- mas faciles de debuggear

## Errores comunes que habia que evitar

### Mockear demasiado tarde

Primero se define `vi.mock(...)` y despues se importan los modulos que lo usan. Si se hace al reves, el modulo real puede quedar cargado y el mock no aplicar correctamente.

### Comparar un `Date` con el JSON parseado

El body de una respuesta JSON no conserva objetos `Date`. Se vuelve string.

### Ver solo el status y no el flujo

En las validaciones tempranas fue importante comprobar tambien que `getToken` no se llamara.

### Probar solo el caso feliz

En APIs, muchas veces lo mas valioso no es el `200`, sino el manejo correcto de errores.

## Comandos de verificacion usados

```bash
pnpm test tests/routes/get-token.routes.test.ts
pnpm test
pnpm build
```

En esta tarea puntual:

- el test nuevo paso correctamente
- la suite completa de tests paso correctamente
- `astro check` dentro de `pnpm build` paso sin errores
- `astro build` fallo al final del proceso por un problema del entorno al reorganizar assets del servidor

## Resumen corto para recordar

Si mañana tuvieras que repetir este trabajo en otra ruta, la receta seria:

1. importar el handler
2. mockear el caso de uso
3. construir un `Request` manual
4. cubrir validaciones, exito, errores esperados y errores inesperados
5. verificar body, status, headers y llamadas al caso de uso

Con esa base ya podes escribir tests de rutas bastante solidos sin levantar todo el sistema.
