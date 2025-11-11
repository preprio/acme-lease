import React from 'react'
import { getToolbarProps } from '@preprio/prepr-nextjs/server'
import { PreprToolbarProps } from '@preprio/prepr-nextjs/types'
import { PreprToolbarProvider, PreprToolbar } from '@preprio/prepr-nextjs/react'
import { cookies } from 'next/headers'
import { logger } from '@/lib/logger'
import { getEnvGraphqlUrl } from '@/lib/access-token'

export default async function PreprPreviewWrapper({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    let previewBarProps: PreprToolbarProps | null = null

    const graphqlUrl = getEnvGraphqlUrl()

    const failedJsx = <>{children}</>

    if (!graphqlUrl) {
        return failedJsx
    }

    try {
        previewBarProps = await getToolbarProps(graphqlUrl)
    } catch (error) {
        logger.error('Error getting preview bar props', error)
        logger.error(
            'Make sure that environment variable PREPR_GRAPHQL_URL is set correctly and that the token has edit mode enabled'
        )
        return failedJsx
    }

    // Check if preview bar should be shown
    const cookieStore = await cookies()
    const showPreviewbar = cookieStore.get('show-previewbar')?.value
    const shouldShowPreviewBar =
        (process.env.PREPR_ENV === 'preview' || showPreviewbar === 'true') &&
        previewBarProps !== null &&
        graphqlUrl !== undefined

    if (shouldShowPreviewBar && previewBarProps) {
        return (
            <PreprToolbarProvider
                props={previewBarProps}
                options={{
                    debug: true,
                    locale: 'en',
                }}
            >
                <PreprToolbar />
                {children}
            </PreprToolbarProvider>
        )
    }

    return failedJsx
}
