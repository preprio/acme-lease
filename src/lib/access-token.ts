export function getEnvAccessToken(): string | undefined {
    if (process.env.PREPR_GRAPHQL_TOKEN) {
        return process.env.PREPR_GRAPHQL_TOKEN
    }

    const graphqlUrl = process.env.PREPR_GRAPHQL_URL

    if (!graphqlUrl) {
        return undefined
    }

    try {
        const { pathname } = new URL(graphqlUrl)
        const segments = pathname.split('/').filter(Boolean)
        return segments.pop()
    } catch {
        const segments = graphqlUrl.split('/').filter(Boolean)
        const lastSegment = segments.pop()
        return lastSegment?.split('?')[0]
    }
}

export function getEnvGraphqlUrl(): string | undefined {
    return process.env.PREPR_GRAPHQL_URL || buildPreprGraphqlUrl(process.env.PREPR_GRAPHQL_TOKEN!)
}

export function buildPreprGraphqlUrl(accessToken: string): string {
    return `https://graphql.prepr.io/${accessToken}`
}
