import { NextRequest, NextResponse } from 'next/server'

import createIntlMiddleware from 'next-intl/middleware'
import createPreprMiddleware from '@preprio/prepr-nextjs/middleware'
import { getEnvAccessToken } from '@/lib/access-token'
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from '@/constants/locales'
import { env } from '@/config/env'

const handleI18nRouting = createIntlMiddleware({
    locales: SUPPORTED_LOCALES,
    defaultLocale: DEFAULT_LOCALE,
    localePrefix: 'always',
    localeDetection: false,
})

export async function proxy(request: NextRequest) {
    // First run internationalization middleware
    const i18nResponse = handleI18nRouting(request)

    // If it's a redirect, return it immediately
    if (
        i18nResponse &&
        i18nResponse.status >= 300 &&
        i18nResponse.status < 400
    ) {
        return i18nResponse
    }

    // Create a new response or use the existing one
    const newResponse = i18nResponse || NextResponse.next()

    const accessTokenFromQuery = request.nextUrl.searchParams
        .get('access_token')
        ?.trim()
    const accessTokenFromCookie = request.cookies.get('access_token')?.value
    const accessTokenFromEnv = getEnvAccessToken()

    let activeAccessToken: string | undefined

    if (accessTokenFromQuery) {
        activeAccessToken = accessTokenFromQuery
        newResponse.cookies.set('access_token', accessTokenFromQuery, {
            httpOnly: true,
            sameSite: 'lax',
            secure: env.NODE_ENV === 'production',
            path: '/',
        })
    } else if (accessTokenFromCookie) {
        activeAccessToken = accessTokenFromCookie
    } else {
        activeAccessToken = accessTokenFromEnv
    }

    if (activeAccessToken) {
        newResponse.headers.set('x-access-token', activeAccessToken)
        newResponse.headers.set(
            'x-middleware-request-x-access-token',
            activeAccessToken
        )
    }

    // Check if preview bar is toggled off via cookie
    const showPreviewbar = request.cookies.get('show-previewbar')?.value
    const isPreviewEnabled =
        env.PREPR_ENV === 'preview' && showPreviewbar !== 'false'

    // Then chain with Prepr middleware
    return createPreprMiddleware(request, newResponse, {
        preview: isPreviewEnabled,
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
