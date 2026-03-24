import React from 'react'
import Navbar from '@/components/layout/navbar'
import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'
import AccessTokenIndicator from '@/components/access-token-indicator'
import '@preprio/prepr-nextjs/index.css'
import PreprPreviewWrapper from '@/components/prepr-preview-wrapper'
import type { Locale } from '@/types/locale'
import { headers } from 'next/headers'
import { getEnvAccessToken } from '@/lib/access-token'

export const dynamic = 'force-dynamic'

export default async function PagesLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode
    params: Promise<{ locale: string }>
}>) {
    const { locale } = await params

    // Ensure that the incoming `locale` is valid
    if (!routing.locales.includes(locale as Locale)) {
        notFound()
    }

    // Get access token from headers
    const headerStore = await headers()
    const accessTokenHeader = headerStore.get('x-access-token')
    const defaultAccessToken = getEnvAccessToken()
    const displayAccessToken =
        accessTokenHeader && accessTokenHeader !== defaultAccessToken
            ? accessTokenHeader
            : null

    return (
        <PreprPreviewWrapper>
            <div className='flex min-h-screen flex-col'>
                <Navbar locale={locale} />
                <main className='flex-1'>{children}</main>
                <footer className='py-7'>
                    <AccessTokenIndicator accessToken={displayAccessToken} />
                </footer>
            </div>
        </PreprPreviewWrapper>
    )
}
