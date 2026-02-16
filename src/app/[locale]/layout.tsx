import { Ubuntu } from 'next/font/google'
import type { Metadata } from 'next'

import './globals.css'
import React from 'react'
import { headers } from 'next/headers'
import ToastProvider from '@/components/providers/toast-provider'
import HubspotTracking from '@/components/tracking/hubspot-tracking'
import { PreprTrackingPixel } from '@preprio/prepr-nextjs/react'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { getMessages } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import type { Locale } from '@/types/locale'
import { getEnvAccessToken } from '@/lib/access-token'

const ubuntu = Ubuntu({ weight: ['400', '500', '700'], subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Acme Lease',
    description: 'Prepr example implementation on how to use personalization',
}

export default async function LocaleLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode
    params: Promise<{ locale: string }>
}>) {
    const { locale } = await params

    if (!routing.locales.includes(locale as Locale)) {
        notFound()
    }

    const messages = await getMessages()

    // Get access token from headers (set by middleware) or fall back to env
    const headerStore = await headers()
    const accessToken = headerStore.get('x-access-token') ?? getEnvAccessToken()

    return (
        <html
            className='h-full'
            lang={locale}
        >
            <head>
                <PreprTrackingPixel accessToken={accessToken!} />
            </head>
            <body
                className={`${ubuntu.className} flex h-screen min-h-screen flex-col`}
            >
                <NextIntlClientProvider messages={messages}>
                    <ToastProvider>
                        <HubspotTracking />
                        <div className='flex flex-1 flex-col'>{children}</div>
                    </ToastProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    )
}
