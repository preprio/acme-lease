import React from 'react'
import Navbar from '@/components/navbar'
import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'
import AccessTokenIndicator from '@/components/access-token-indicator'
import '@preprio/prepr-nextjs/index.css'
import { getToolbarProps } from '@preprio/prepr-nextjs/server'
import { PreprToolbarProps } from '@preprio/prepr-nextjs/types'
import {
  PreprToolbarProvider,
} from '@preprio/prepr-nextjs/react'
import PreviewBar from '@/components/preview-bar'
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

    let previewBarProps: PreprToolbarProps | null = null;

    try {
        previewBarProps = await getToolbarProps(process.env.PREPR_GRAPHQL_URL!)
    } catch (error) {
        console.error('Error getting preview bar props', error)
        console.error('Make sure that environment variable PREPR_GRAPHQL_URL is set correctly and that the token has edit mode enabled')
    }

    if (!previewBarProps) {
        return (
            <div className="flex min-h-screen flex-col">
                <Navbar locale={locale} />
                <main className="flex-1">{children}</main>
            </div>
        )
    }

    return (
        <PreprToolbarProvider props={previewBarProps} options={{
            debug: true,
            locale: 'en'
        }}>
            <PreviewBar />
            <div className="flex min-h-screen flex-col">
                <Navbar locale={locale} />
                <main className="flex-1">{children}</main>
                <footer className="py-7">
                    <AccessTokenIndicator />
                </footer>
            </div>
        </PreprToolbarProvider>
    )
}
