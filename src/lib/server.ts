import { getPreprHeaders } from '@preprio/toolkit/nextjs'
import { cookies } from 'next/headers'

export async function getHeaders() {
    const cookieStore = await cookies()
    const headers: Record<string, string | undefined> = {
        ...(await getPreprHeaders()),
    }

    if (cookieStore.get('NEXT_LOCALE')?.value) {
        headers['Prepr-Locale'] = cookieStore.get('NEXT_LOCALE')?.value
    }

    return headers
}
