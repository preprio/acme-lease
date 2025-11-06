import React from 'react'
import Navbar from '@/components/navbar'
import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'
import AccessTokenIndicator from '@/components/access-token-indicator'
import '@preprio/prepr-nextjs/index.css'
import { getToolbarProps } from '@preprio/prepr-nextjs/server'
import {
  PreprToolbarProvider,
} from '@preprio/prepr-nextjs/react'
import PreviewBar from '@/components/preview-bar'

export default async function PagesLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode
    params: Promise<{ locale: string }>
}>) {
    const { locale } = await params

    // Ensure that the incoming `locale` is valid
    if (!routing.locales.includes(locale as any)) {
        notFound()
    }

    const previewBarProps = await getToolbarProps(process.env.PREPR_GRAPHQL_URL!)

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
