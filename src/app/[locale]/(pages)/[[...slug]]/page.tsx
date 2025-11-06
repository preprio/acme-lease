import { notFound } from 'next/navigation'
import { PageDocument, PageQuery } from '@/gql/graphql'
import { getApolloClient } from '@/apollo-client'
import { getHeaders } from '@/lib/server'
import Sections from '@/components/sections/sections'
import { Locale } from '@/types/locale'

export const revalidate = 0
export const dynamic = 'force-dynamic'

async function getData(slug: string, locale: Locale) {
    const headers = await getHeaders()

    const client = await getApolloClient()

    const { data } = await client.query<PageQuery>({
        query: PageDocument,
        variables: {
            slug: slug,
        },
        context: {
            headers: {
                ...headers,
                'Prepr-Locale': locale || '',
            },
        },
        fetchPolicy: 'no-cache',
    })

    if (!data.Page) {
        return notFound()
    }

    return data
}

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string | string[], locale: Locale }>
}) {
    let { slug, locale } = await params

    if (!slug) {
        slug = '/'
    }

    if (slug instanceof Array) {
        slug = slug.join('/')
    }

    const data = await getData(slug, locale)
    const page = data.Page

    return (
        <main>
            <meta property="prepr:id" content={page?._id} />
            {page?.content && <Sections sections={page?.content} />}
        </main>
    )
}
