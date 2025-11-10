import {
    ApolloClient,
    ApolloLink,
    HttpLink,
    InMemoryCache,
} from '@apollo/client'
import { headers } from 'next/headers'
import { onError } from '@apollo/client/link/error'
import { buildPreprGraphqlUrl, getEnvAccessToken } from '@/lib/access-token'

export async function getApolloClient() {
    if (
        process.env.APP_ENV !== 'production' &&
        process.env.PREPR_GRAPHQL_URL?.includes('-dev')
    ) {
        console.warn('USING GQL DEV API, Personalization might not work')
    }

    const headerStore = await headers()
    let accessToken = headerStore.get('x-access-token') ?? undefined

    if (!accessToken) {
        accessToken = getEnvAccessToken()
        if (accessToken) {
            console.warn(
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
            onError((error) => {
                console.log(error.graphQLErrors)
            }),
            httpLink,
        ]),
    })
}
