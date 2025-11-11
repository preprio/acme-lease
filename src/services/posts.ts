import { getApolloClient } from '@/apollo-client'
import {
    PostsDocument,
    PostsQuery,
    PostWhereInput,
    PostDocument,
    PostQuery,
} from '@/gql/graphql'
import { getHeaders } from '@/lib/server'
import { createGraphQLError, getErrorMessage } from '@/lib/errors'
import { logger } from '@/lib/logger'

export type GetPostsOptions = {
    locale: string
    skip?: number
    limit?: number
    category?: string
}

export type GetPostBySlugOptions = {
    locale: string
    slug: string
}

/**
 * Posts Service
 *
 * Data access layer for blog posts. Encapsulates all post-related GraphQL queries
 * and provides a clean API for fetching post data.
 */
export class PostsService {
    /**
     * Fetch a paginated list of posts
     *
     * @param options - Query options including locale, pagination, and filtering
     * @returns Posts collection with items and total count
     * @throws {AppError} If the GraphQL query fails
     */
    static async getPosts(options: GetPostsOptions) {
        const { locale, skip = 0, limit = 9, category } = options

        try {
            const client = await getApolloClient()
            const headers = await getHeaders()

            // Build where clause
            const where: PostWhereInput = {}
            if (category && category !== 'all') {
                where.categories = {
                    _slug_any: [category],
                }
            }

            const { data } = await client.query<PostsQuery>({
                query: PostsDocument,
                variables: {
                    skip,
                    limit,
                    where,
                },
                context: {
                    headers: {
                        ...headers,
                        'Prepr-Locale': locale,
                    },
                },
            })

            return data?.Posts || null
        } catch (error) {
            logger.error('Error fetching posts:', error)
            throw createGraphQLError(getErrorMessage(error))
        }
    }

    /**
     * Fetch a single post by slug
     *
     * @param options - Query options including locale and slug
     * @returns Single post or null if not found
     * @throws {AppError} If the GraphQL query fails
     */
    static async getPostBySlug(options: GetPostBySlugOptions) {
        const { locale, slug } = options

        try {
            const client = await getApolloClient()
            const headers = await getHeaders()

            const { data } = await client.query<PostQuery>({
                query: PostDocument,
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

            return data?.Post || null
        } catch (error) {
            logger.error(`Error fetching post with slug "${slug}":`, error)
            throw createGraphQLError(getErrorMessage(error))
        }
    }
}
