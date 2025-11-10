import React from 'react'
import Container from '@/components/container'
import { headers } from 'next/headers'
import ClearToken from '@/components/clear-token'
import { getEnvAccessToken } from '@/lib/access-token'

export default async function AccessTokenIndicator() {
    const headerStore = await headers()
    const accessTokenHeader = headerStore.get('x-access-token')
    const defaultAccessToken = getEnvAccessToken()

    if (!accessTokenHeader || accessTokenHeader === defaultAccessToken) {
        return null
    }

    return (
        <div className='bg-white'>
            <Container className='text-secondary-700 flex flex-wrap items-center justify-end gap-2 py-2 text-start text-xs'>
                <p>Viewing content with token: {accessTokenHeader}</p>
                <ClearToken />
            </Container>
        </div>
    )
}
