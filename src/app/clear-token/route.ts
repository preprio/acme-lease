import { cookies } from 'next/headers'

export async function GET() {
    const cookieStore = await cookies()
    cookieStore.delete('access_token')

    return new Response('Token deleted', { status: 200 })
}
