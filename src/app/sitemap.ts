import { getApolloClient } from '@/apollo-client'
import { SitemapDocument, SitemapQuery } from '@/gql/graphql'
import { SEO_FRAGMENT } from '@/queries/fragments'

const SITE_URL = process.env.SITE_URL + '/'

export default async function sitemap() {
    return [
        ...(await getPages()),
    ]
}

async function getPages() {
    const client = await getApolloClient()
    const { data } = await client.query<SitemapQuery>({
        query: SitemapDocument,
    })

    let pages: any = []

    // Add pages to sitemap
    data?.Pages?.items.map((item) => {
        item._localizations.map((localization) => {
            const seo = localization.seo
            const locale = localization._locale

            pages.push({
                url: SITE_URL + locale + (localization._slug?.startsWith('/') ? '' : '/') + localization._slug,
                changeFrequency: 'monthly',
                priority: 0.7,
                lastModified: new Date().toISOString(),
                ...seo,
            })
        })
    })

    // Add posts to sitemap
    data?.Posts?.items.map((item) => {
        item._localizations.map((localization) => {
            const seo = localization.seo
            const locale = localization._locale

            pages.push({
                url: SITE_URL + locale + '/' +'blog/' + localization._slug,
                changeFrequency: 'monthly',
                priority: 0.7,
                lastModified: new Date().toISOString(),
                ...seo,
            })
        })
    })

    // Add products to sitemap
    data?.Products?.items.map((item) => {
        item._localizations.map((localization) => {
            const seo = localization.seo
            const locale = localization._locale

            let prefix = 'products'
            if (localization._locale !== 'nl-NL') {
                prefix = 'producten'
            }

            pages.push({
                url: SITE_URL + locale + '/' + prefix + '/' + localization._slug,
                changeFrequency: 'monthly',
                priority: 0.7,
                lastModified: new Date().toISOString(),
                ...seo,
            })
        })
    })

    return pages
}

