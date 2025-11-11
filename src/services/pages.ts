import { getApolloClient } from '@/apollo-client'
import { PageDocument, PageQuery } from '@/gql/graphql'
import { getHeaders } from '@/lib/server'
import { createGraphQLError, getErrorMessage } from '@/lib/errors'
import { logger } from '@/lib/logger'

export type GetPageBySlugOptions = {
    locale: string
    slug: string
}

/**
 * Pages Service
 *
 * Data access layer for CMS pages. Encapsulates all page-related GraphQL queries
 * and provides a clean API for fetching page data.
 */
export class PagesService {
    /**
     * Fetch a single page by slug
     *
     * @param options - Query options including locale and slug
     * @returns Single page or null if not found
     * @throws {AppError} If the GraphQL query fails
     */
    static async getPageBySlug(options: GetPageBySlugOptions) {
        const { locale, slug } = options

        try {
            const client = await getApolloClient()
            const headers = await getHeaders()

            const { data } = await client.query<PageQuery>({
                query: PageDocument,
                variables: {
                    slug,
                },
                context: {
                    headers: {
                        ...headers,
                        'Prepr-Locale': locale,
                    },
                },
                fetchPolicy: 'no-cache',
            })

            return data?.Page || null
        } catch (error) {
            logger.error(`Error fetching page with slug "${slug}":`, error)
            throw createGraphQLError(getErrorMessage(error))
        }
    }
}
