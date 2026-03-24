'use client'

import React from 'react'
import Container from '@/components/layout/container'
import ClearToken from '@/components/clear-token'
import ErrorBoundaryWrapper from '@/components/error-boundary-wrapper'

interface AccessTokenIndicatorProps {
    accessToken: string | null
}

export default function AccessTokenIndicator({
    accessToken,
}: AccessTokenIndicatorProps) {
    if (!accessToken) {
        return null
    }

    return (
        <div className='bg-white'>
            <Container className='text-secondary-700 flex flex-wrap items-center justify-end gap-2 py-2 text-start text-xs'>
                <p>Viewing content with token: {accessToken}</p>
                <ErrorBoundaryWrapper>
                    <ClearToken />
                </ErrorBoundaryWrapper>
            </Container>
        </div>
    )
}
