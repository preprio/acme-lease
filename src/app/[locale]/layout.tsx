import { Ubuntu } from 'next/font/google'

import './globals.css'
import React from 'react'
import { extractAccessToken } from '@preprio/prepr-nextjs/server'
import ToastProvider from '@/components/providers/toast-provider'
import HubspotTracking from '@/components/tracking/hubspot-tracking'
import { PreprTrackingPixel } from '@preprio/prepr-nextjs/react'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { getMessages } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import type { Locale } from '@/types/locale'

const ubuntu = Ubuntu({ weight: ['400', '500', '700'], subsets: ['latin'] })

export const metadata = {
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

    const accessToken = extractAccessToken(process.env.PREPR_GRAPHQL_URL!)

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
