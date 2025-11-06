import Container from '@/components/container'
import { getApolloClient } from '@/apollo-client'
import {
    PageDocument,
    PageQuery,
    PostsDocument,
    PostsQuery,
    PostWhereInput,
} from '@/gql/graphql'
import PostCard from '@/components/post-card'
import { getHeaders } from '@/lib/server'
import { cn } from '@/lib/utils'
import PaginationItem from '@/components/elements/pagination-item'
import PaginationChevron from '@/components/elements/pagination-chevron'
import CategoryButtons from '@/components/category-buttons'
import { notFound } from 'next/navigation'
import { Locale } from '@/types/locale'

export const revalidate = 0

const POSTS_PER_PAGE = 9

async function getPosts(locale: string, skip: number = 0, category?: string) {
    let cat = category !== 'all' ? category : undefined

    const client = await getApolloClient()
    const headers = await getHeaders()

    const query = {
        query: PostsDocument,
        variables: {
            skip,
            limit: POSTS_PER_PAGE,
            where: {},
        },
        context: {
            headers: {
                ...headers,
                'Prepr-Locale': locale,
            },
        },
    }

    if (cat) {
        query.variables.where = {
            categories: {
                _slug_any: cat,
            },
        } as unknown as PostWhereInput
    }

    const { data } = await client.query<PostsQuery>(query)

    return data?.Posts
}

async function getBlogPage(locale: string) {
    const headers = await getHeaders()
    const client = await getApolloClient()

    const { data } = await client.query<PageQuery>({
        query: PageDocument,
        variables: {
            slug: 'blog',
        },
        context: {
            headers: {
                ...headers,
            },
        },
        fetchPolicy: 'no-cache',
    })

    if (!data.Page) {
        return notFound()
    }

    return data
}

export default async function BlogPage({ searchParams, params }: {
    searchParams: Promise<{ page?: string, category?: string }>,
    params: Promise<{ locale: Locale }>
}) {
    const { page, category: pageCategory } = await searchParams
    const { locale } = await params
    const pageNumber = page ? parseInt(page) : 1

    const skip = ((pageNumber - 1) * POSTS_PER_PAGE)
    const posts = await getPosts(locale, skip, pageCategory)
    const blog = await getBlogPage(locale)

    const totalPages = Math.ceil((posts?.total || 0) / POSTS_PER_PAGE)

    return (
        <section className="bg-primary-50 w-full h-full">
            <meta property="prepr:id" content={blog.Page?._id} />
            <Container className="py-10 lg:py-20 space-y-6 lg:space-y-14">
                <div className="space-y-6">
                    <h1 className="text-mb-5xl lg:text-7xl text-secondary-700 font-medium break-words text-balance">Blog</h1>
                    <div className="flex flex-wrap gap-3">
                        <CategoryButtons locale={locale} pageCategory={pageCategory} />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 !h-auto">
                    {posts?.items?.map((post, index) => (
                        <div className="!self-stretch !h-auto" key={index}><PostCard post={post} /></div>
                    ))}
                </div>
                {/* Pagination */}

                {totalPages > 1 && (
                    <div className="flex flex-wrap gap-8 justify-center">
                        <PaginationChevron direction="left" disabled={pageNumber === 1} />
                        <div className="flex items-center gap-3">
                            {Array.from({ length: totalPages }).map((_, index) => (
                                <PaginationItem pageNumber={index + 1} key={index}
                                                className={cn(pageNumber === index + 1 && 'active')} />
                            ))}
                        </div>
                        <PaginationChevron direction="right" disabled={pageNumber === totalPages} />
                    </div>
                )}
            </Container>
        </section>
    )
}