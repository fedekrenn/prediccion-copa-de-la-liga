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
  } catch (error) {
    return new Response('Ha ocurrido un error obteniendo los datos'), {
      status: 500,
      headers: {
        'content-type': 'application/json',
      },
    }
  }
}