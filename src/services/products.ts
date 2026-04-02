import { getApolloClient } from '@/apollo-client'
import {
    ProductsDocument,
    ProductsQuery,
    ProductWhereInput,
    ProductDocument,
    ProductQuery,
} from '@/gql/graphql'
import { getHeaders } from '@/lib/server'
import { createGraphQLError, getErrorMessage } from '@/lib/errors'
import { logger } from '@/lib/logger'

export type GetProductsOptions = {
    locale: string
    skip?: number
    limit?: number
    category?: string
}

export type GetProductBySlugOptions = {
    locale: string
    slug: string
}

/**
 * Products Service
 *
 * Data access layer for products. Encapsulates all product-related GraphQL queries
 * and provides a clean API for fetching product data.
 */
export class ProductsService {
    /**
     * Fetch a paginated list of products
     *
     * @param options - Query options including locale, pagination, and filtering
     * @returns Products collection with items and total count
     */
    static async getProducts(options: GetProductsOptions) {
        const { locale, skip = 0, limit = 9, category } = options

        const client = await getApolloClient()
        const headers = await getHeaders()

        // Build where clause
        const where: ProductWhereInput = {}
        if (category && category !== 'all') {
            where.categories = {
                _slug_any: [category],
            }
        }

        const { data } = await client.query<ProductsQuery>({
            query: ProductsDocument,
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

        return data?.Products || null
    }

    /**
     * Fetch a single product by slug
     *
     * @param options - Query options including locale and slug
     * @returns Single product or null if not found
     */
    static async getProductBySlug(options: GetProductBySlugOptions) {
        const { locale, slug } = options

        try {
            const client = await getApolloClient()
            const headers = await getHeaders()

            const queryContext = {
                headers: {
                    ...headers,
                    'Prepr-Locale': locale,
                },
            }

            const { data } = await client.query<ProductQuery>({
                query: ProductDocument,
                variables: { slug },
                context: queryContext,
                fetchPolicy: 'no-cache',
            })

            if (data?.Product) return data.Product

            // Retry with products/ prefix if slug doesn't already contain it
            if (!slug.includes('products/')) {
                const prefixedSlug = `products/${slug}`
                const { data: retryData } = await client.query<ProductQuery>({
                    query: ProductDocument,
                    variables: { slug: prefixedSlug },
                    context: queryContext,
                    fetchPolicy: 'no-cache',
                })
                return retryData?.Product || null
            }

            return null
        } catch (error) {
            logger.error(`Error fetching product with slug "${slug}":`, error)
            throw createGraphQLError(getErrorMessage(error))
        }
    }
}
