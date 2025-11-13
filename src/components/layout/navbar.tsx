import { getApolloClient } from '@/apollo-client'
import { NavigationDocument, NavigationQuery } from '@/gql/graphql'
import { getPreprHeaders } from '@preprio/prepr-nextjs/server'
import NavbarClient from '@/components/layout/navbar-client'
import ErrorBoundaryWrapper from '@/components/error-boundary-wrapper'

export const revalidate = 0

async function getNavbar(locale: string) {
    const headers = await getPreprHeaders()
    const client = await getApolloClient()

    const { data } = await client.query<NavigationQuery>({
        query: NavigationDocument,
        context: {
            headers: {
                ...headers,
                'Prepr-Locale': locale,
            },
        },
        fetchPolicy: 'no-cache',
    })

    if (!data.Navigation) {
        return null
    }

    return data.Navigation
}

export default async function Navbar({ locale }: { locale: string }) {
    const navbar = await getNavbar(locale)

    if (!navbar) {
        return null
    }

    return (
        <ErrorBoundaryWrapper>
            <NavbarClient items={navbar.top_navigation} />
        </ErrorBoundaryWrapper>
    )
}
