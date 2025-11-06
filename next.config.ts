import type { NextConfig } from 'next'
import { vercelStegaSplit } from '@vercel/stega'
import createNextIntlPlugin from 'next-intl/plugin'

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
    const fetched = await fetch(
        'https://graphql.prepr.io/ac_c610fb5be36fffe3e886b38a72a56aeb25f32f70fdee43c3b79dc48e5ba08320',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: query,
            }),
        },
    )

    const { data } = await fetched.json()

    let redirects = data?.Redirects?.items.map((item: any) => {
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

    return redirects.filter((item: any) => item.destination !== '')
}

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                hostname: 'demo-patterns.stream.prepr.io',
            },
            {
                hostname: '*.prepr.io'
            }
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
