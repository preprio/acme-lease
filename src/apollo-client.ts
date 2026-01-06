import {
    ApolloClient,
    ApolloLink,
    HttpLink,
    InMemoryCache,
} from '@apollo/client'
import { headers } from 'next/headers'
import { onError } from '@apollo/client/link/error'
import { CombinedGraphQLErrors } from '@apollo/client/errors'
import { buildPreprGraphqlUrl, getEnvAccessToken } from '@/lib/access-token'
import { logger } from '@/lib/logger'
import { env } from '@/config/env'

/**
 * Creates and configures an Apollo Client instance for server-side GraphQL requests
 * @returns Configured Apollo Client instance
 * @throws Error if no access token is available
 */
export async function getApolloClient(): Promise<ApolloClient> {
    if (
        env.APP_ENV !== 'production' &&
        env.PREPR_GRAPHQL_URL?.includes('-dev')
    ) {
        logger.warn('USING GQL DEV API, Personalization might not work')
    }

    const headerStore = await headers()
    let accessToken = headerStore.get('x-access-token') ?? undefined

    if (!accessToken) {
        accessToken = getEnvAccessToken()
        if (accessToken) {
            logger.warn(
                'Falling back to env access token; middleware may be misconfigured'
            )
        }
    }

    if (!accessToken) {
        throw new Error(
            'Missing Prepr access token; cannot configure Apollo client'
        )
    }

    const httpLink = new HttpLink({
        uri: buildPreprGraphqlUrl(accessToken),
    })

    return new ApolloClient({
        cache: new InMemoryCache(),
        ssrMode: true,
        link: ApolloLink.from([
            onError(({ error }) => {
                if (CombinedGraphQLErrors.is(error)) {
                    logger.error('GraphQL Error:', error.errors)
                } else {
                    logger.error('Network Error:', error)
                }
            }),
            httpLink,
        ]),
    })
}
