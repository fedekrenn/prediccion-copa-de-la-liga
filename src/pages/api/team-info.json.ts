import main from '@services/main'

export async function GET() {
  try {
    const data = await main()

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    })
  } catch (error: any) {
    const message = error.stack.split('\n')[0]
    return new Response(null, {
      status: 500,
      statusText: 'Error al obtener la información del servidor: ' + message,
    })
  }
}