import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import Sections from '@/components/sections/sections'
import { Locale } from '@/types/locale'
import { PagesService } from '@/services/pages'
import Loading from '@/components/loading'

export const revalidate = 0
export const dynamic = 'force-dynamic'

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string | string[]; locale: Locale }>
}) {
    let { slug } = await params
    const { locale } = await params

    if (!slug) {
        slug = '/'
    }

    if (slug instanceof Array) {
        slug = slug.join('/')
    }

    const page = await PagesService.getPageBySlug({ slug, locale })

    if (!page) {
        return notFound()
    }

    return (
        <main>
            <meta
                property='prepr:id'
                content={page._id}
            />
            {page.content && (
                <Suspense fallback={<Loading />}>
                    <Sections sections={page.content} />
                </Suspense>
            )}
        </main>
    )
}
