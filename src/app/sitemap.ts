import { getApolloClient } from '@/apollo-client'
import { SeoFragment, SitemapDocument, SitemapQuery } from '@/gql/graphql'

type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'

type SitemapEntry = {
    url: string
    changeFrequency: ChangeFrequency
    priority: number
    lastModified: string
} & Partial<Pick<SeoFragment, 'meta_description' | 'meta_title' | 'meta_image'>>

const SITE_URL = process.env.SITE_URL + '/'

export default async function sitemap(): Promise<SitemapEntry[]> {
    return [
        ...(await getPages()),
    ]
}

async function getPages(): Promise<SitemapEntry[]> {
    const client = await getApolloClient()
    const { data } = await client.query<SitemapQuery>({
        query: SitemapDocument,
    })

    const pages: SitemapEntry[] = []

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

