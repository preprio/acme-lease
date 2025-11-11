import { getPreprHeaders } from '@preprio/prepr-nextjs/server'
import { cookies } from 'next/headers'

export async function getHeaders() {
    const cookieStore = await cookies()

    const headers = await getPreprHeaders()

    if (cookieStore.get('NEXT_LOCALE')?.value) {
        headers['Prepr-Locale'] = <string>cookieStore.get('NEXT_LOCALE')?.value
    }

    return headers
}
