import React from 'react'
import Navbar from '@/components/navbar'
import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'
import AccessTokenIndicator from '@/components/access-token-indicator'
import '@preprio/prepr-nextjs/index.css'
import PreprPreviewWrapper from '@/components/prepr-preview-wrapper'
import type { Locale } from '@/types/locale'

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

    return (
        <PreprPreviewWrapper>
            <div className='flex min-h-screen flex-col'>
                <Navbar locale={locale} />
                <main className='flex-1'>{children}</main>
                <footer className='py-7'>
                    <AccessTokenIndicator />
                </footer>
            </div>
        </PreprPreviewWrapper>
    )
}
