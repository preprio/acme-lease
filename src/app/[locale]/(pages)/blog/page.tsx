import Container from '@/components/container'
import PostCard from '@/components/post-card'
import { cn } from '@/lib/utils'
import PaginationItem from '@/components/elements/pagination-item'
import PaginationChevron from '@/components/elements/pagination-chevron'
import CategoryButtons from '@/components/category-buttons'
import { notFound } from 'next/navigation'
import { Locale } from '@/types/locale'
import { PostsService } from '@/services/posts'
import { PagesService } from '@/services/pages'

export const revalidate = 0

const POSTS_PER_PAGE = 9

export default async function BlogPage({
    searchParams,
    params,
}: {
    searchParams: Promise<{ page?: string; category?: string }>
    params: Promise<{ locale: Locale }>
}) {
    const { page, category: pageCategory } = await searchParams
    const { locale } = await params
    const pageNumber = page ? parseInt(page) : 1

    const skip = (pageNumber - 1) * POSTS_PER_PAGE

    // Use services for data fetching
    const posts = await PostsService.getPosts({
        locale,
        skip,
        limit: POSTS_PER_PAGE,
        category: pageCategory,
    })

    const blogPage = await PagesService.getPageBySlug({
        locale,
        slug: 'blog',
    })

    if (!blogPage) {
        return notFound()
    }

    const totalPages = Math.ceil((posts?.total || 0) / POSTS_PER_PAGE)

    return (
        <section className='bg-primary-50 h-full w-full'>
            <meta
                property='prepr:id'
                content={blogPage._id}
            />
            <Container className='space-y-6 py-10 lg:space-y-14 lg:py-20'>
                <div className='space-y-6'>
                    <h1 className='text-mb-5xl text-secondary-700 font-medium text-balance wrap-break-word lg:text-7xl'>
                        Blog
                    </h1>
                    <div className='flex flex-wrap gap-3'>
                        <CategoryButtons
                            locale={locale}
                            pageCategory={pageCategory}
                        />
                    </div>
                </div>
                <div className='grid h-auto! grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3'>
                    {posts?.items?.map((post, index) => (
                        <div
                            className='h-auto! self-stretch!'
                            key={index}
                        >
                            <PostCard post={post} />
                        </div>
                    ))}
                </div>
                {/* Pagination */}

                {totalPages > 1 && (
                    <div className='flex flex-wrap justify-center gap-8'>
                        <PaginationChevron
                            direction='left'
                            disabled={pageNumber === 1}
                        />
                        <div className='flex items-center gap-3'>
                            {Array.from({ length: totalPages }).map(
                                (_, index) => (
                                    <PaginationItem
                                        pageNumber={index + 1}
                                        key={index}
                                        className={cn(
                                            pageNumber === index + 1 && 'active'
                                        )}
                                    />
                                )
                            )}
                        </div>
                        <PaginationChevron
                            direction='right'
                            disabled={pageNumber === totalPages}
                        />
                    </div>
                )}
            </Container>
        </section>
    )
}
