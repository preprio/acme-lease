import { NextRequest, NextResponse } from 'next/server'

import createIntlMiddleware from 'next-intl/middleware'
import createPreprMiddleware from '@preprio/prepr-nextjs/middleware'
import { getEnvAccessToken } from '@/lib/access-token'

const handleI18nRouting = createIntlMiddleware({
        locales: ['af-ZA', 'ar-AE', 'ar-BH', 'ar-DJ', 'ar-DZ', 'ar-EG', 'ar-EH', 'ar-ER', 'ar-IL', 'ar-IQ',
            'ar-JO', 'ar-KM', 'ar-KW', 'ar-LB', 'ar-LY', 'ar-MA', 'ar-MR', 'ar-OM', 'ar-PS', 'ar-QA',
            'ar-SA', 'ar-SD', 'ar-SO', 'ar-SS', 'ar-SY', 'ar-TD', 'ar-TN', 'ar-YE', 'az-AZ', 'be-BY',
            'bg-BG', 'br-FR', 'ca-AD', 'ca-ES', 'ca-FR', 'ca-IT', 'cs-CZ', 'da-DK', 'da-GL', 'de-AT',
            'de-BE', 'de-CH', 'de-IT', 'de-DE', 'de-LI', 'de-LU', 'el-CY', 'el-GR', 'en-AT', 'en-AU',
            'en-CA', 'en-IE', 'en-IN', 'en-NA', 'en-NZ', 'en-SG', 'en-US', 'en-ZA', 'es-CL', 'es-CO',
            'es-EC', 'es-ES', 'es-LA', 'es-MX', 'es-US', 'et-EE', 'eu-ES', 'fi-FI', 'fo-DK', 'fo-FO',
            'fr-BE', 'fr-CA', 'fr-CH', 'fr-FR', 'fr-LU', 'fy-NL', 'ga-IE', 'gl-ES', 'hi-IN', 'hr-BA',
            'hr-HR', 'hu-HU', 'hy-AM', 'is-IS', 'it-CH', 'it-IT', 'it-SM', 'it-VA', 'ja-JP', 'kl-GL',
            'ko-KR', 'lb-LU', 'lv-LV', 'mk-MK', 'mt-MT', 'nb-NO', 'nl-BE', 'nl-NL', 'nn-NO', 'pl-PL',
            'pt-BR', 'pt-LU', 'pt-PT', 'ro-MD', 'ro-RO', 'ru-RU', 'se-FI', 'se-NO', 'se-SE', 'sk-SK',
            'si-SI', 'sq-AL', 'sq-MK', 'sq-XK', 'sr-SP', 'sv-AX', 'sv-FI', 'sv-SE', 'tr-TR', 'uk-UA',
            'va-ES', 'vi-VN', 'zh-CN', 'zh-HK', 'zh-MO', 'zh-SG', 'zh-TW', 'en-GB'],
        defaultLocale: 'en-US',
        localePrefix: 'always',
        localeDetection: false, 
    })

export async function middleware(request: NextRequest) {
    // First run internationalization middleware
    const i18nResponse = handleI18nRouting(request)
    
    // If it's a redirect, return it immediately
    if (i18nResponse && i18nResponse.status >= 300 && i18nResponse.status < 400) {
        return i18nResponse
    }

    // Create a new response or use the existing one
    const newResponse = i18nResponse || NextResponse.next()

    const accessTokenFromQuery = request.nextUrl.searchParams.get('access_token')?.trim()
    const accessTokenFromCookie = request.cookies.get('access_token')?.value
    const accessTokenFromEnv = getEnvAccessToken()

    let activeAccessToken: string | undefined

    if (accessTokenFromQuery) {
        activeAccessToken = accessTokenFromQuery
        newResponse.cookies.set('access_token', accessTokenFromQuery, {
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
            path: '/',
        })
    } else if (accessTokenFromCookie) {
        activeAccessToken = accessTokenFromCookie
    } else {
        activeAccessToken = accessTokenFromEnv
    }

    if (activeAccessToken) {
        newResponse.headers.set('x-access-token', activeAccessToken)
        newResponse.headers.set('x-middleware-request-x-access-token', activeAccessToken)
    }

    // Check if preview bar is toggled off via cookie
    const showPreviewbar = request.cookies.get('show-previewbar')?.value
    const isPreviewEnabled = process.env.PREPR_ENV === 'preview' && showPreviewbar !== 'false'

    // Then chain with Prepr middleware
    return createPreprMiddleware(request, newResponse, {
        preview: isPreviewEnabled
    })
}


export const config = {
    // Match only internationalized pathnames
    matcher: [
        // Match root
        '/',
        // Match all paths except api routes, static files, and specific routes
        '/((?!api|sitemap\\.xml$|clear-cookie$|clear-token$|_next|_vercel|favicon\\.ico|.*\\..*).*)',
    ],
}
