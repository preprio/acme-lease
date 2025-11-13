import type { NextConfig } from 'next'
import { vercelStegaSplit } from '@vercel/stega'
import createNextIntlPlugin from 'next-intl/plugin'
import { buildPreprGraphqlUrl } from '@/lib/access-token'

interface RedirectItem {
    _slug: string
    destination: Array<{
        __typename: 'Page' | 'Post' | 'Product'
        _slug: string
    } | null>
    redirect_type: 'PERMANENT' | 'TEMPORARY'
}

interface RedirectsResponse {
    Redirects: {
        items: RedirectItem[]
        total: number
    }
}

const query = `query GetRedirects {
        Redirects(limit: 100) {
            items {
                _slug
                destination {
                    __typename
                    ... on Page {
                        _slug
                    }
                    ... on Post {
                        _slug
                    }
                    ... on Product {
                        _slug
                    }
                }
                redirect_type
            }
            total
        }
    }
        `

async function fetchPreprRedirects() {
    const graphqlUrl =
        process.env.PREPR_GRAPHQL_URL ||
        buildPreprGraphqlUrl(process.env.PREPR_GRAPHQL_TOKEN!)

    const fetched = await fetch(graphqlUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: query,
        }),
    })

    const { data } = (await fetched.json()) as { data: RedirectsResponse }

    const redirects = data?.Redirects?.items.map((item: RedirectItem) => {
        let url = ''

        if (item.destination[0] === null) return null

        if (item.destination[0]) {
            switch (item.destination[0].__typename) {
                case 'Post':
                    url = `/blog/${item.destination[0]._slug}`
                    break
                case 'Page':
                    url = `/${item.destination[0]._slug === '/' ? '' : item.destination[0]._slug}`
                    break
                case 'Product':
                    url = `/products/${item.destination[0]._slug}`
                    break
                default:
                    break
            }
        }

        if (item.redirect_type === 'PERMANENT')
            return {
                source: item._slug.toString().startsWith('/')
                    ? item._slug
                    : `/${vercelStegaSplit(item._slug).cleaned}`,
                destination: url,
                statusCode: 301,
            }

        return {
            source: item._slug.toString().startsWith('/')
                ? item._slug
                : `/${vercelStegaSplit(item._slug).cleaned}`,
            destination: url,
            permanent: false,
        }
    })

    return redirects.filter(
        (item): item is Exclude<typeof item, null> =>
            item !== null && item.destination !== ''
    )
}

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                hostname: 'demo-patterns.stream.prepr.io',
            },
            {
                hostname: '*.prepr.io',
            },
        ],
    },
    async rewrites() {
        return [
            {
                source: '/nl-NL/producten',
                destination: '/nl-NL/products',
            },
            {
                source: '/nl-NL/producten/:slug',
                destination: '/nl-NL/products/:slug',
            },
        ]
    },
    async redirects() {
        return (await fetchPreprRedirects()) || []
    },
}

const withNextIntl = createNextIntlPlugin()
export default withNextIntl(nextConfig)
