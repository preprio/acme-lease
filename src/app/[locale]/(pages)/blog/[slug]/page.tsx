import Container from '@/components/layout/container'
import { FaChevronLeft } from 'react-icons/fa6'
import { Link } from '@/i18n/routing'
import { CtaFragment } from '@/gql/graphql'
import Badge from '@/components/ui/badge'
import AuthorBox from '@/components/author-box'
import ReadTime from '@/components/ui/read-time'
import Image from 'next/image'
import ImgPlaceholderSmooth from '@/components/ui/img-placeholder-smooth'
import { notFound } from 'next/navigation'
import Prose from '@/components/blog/prose'
import BlogContent from '@/components/blog/blog-content'
import CtaCard from '@/components/cards/cta-card'
import SimilarPosts from '@/components/similar-posts'
import { Locale } from '@/types/locale'
import { PostsService } from '@/services/posts'
import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'
import Loading from '@/components/loading'

export default async function BlogDetailPage({
    params,
}: {
    params: Promise<{ slug: string; locale: Locale }>
}) {
    const { slug, locale } = await params

    const post = await PostsService.getPostBySlug({ slug, locale })

    if (!post) {
        return notFound()
    }

    return (
        <div>
            <meta
                property='prepr:id'
                content={post?._id}
            />
            <section>
                <Container className='pt-6'>
                    <Link
                        href='/blog'
                        className='text-secondary-700 hover:pointer-cursor flex items-center gap-1 text-sm font-medium hover:underline'
                    >
                        <FaChevronLeft />
                        Back
                    </Link>

                    <div className='text-secondary-700 mx-auto w-full max-w-prose space-y-6 py-10'>
                        <div className='flex flex-wrap gap-2'>
                            {post.categories &&
                                post.categories.map((category, index) => (
                                    <Badge key={index}>{category.name}</Badge>
                                ))}
                        </div>
                        <h1 className='text-secondary-700 text-mb-5xl font-medium text-balance lg:text-6xl'>
                            {post.title}
                        </h1>

                        <div className='flex flex-wrap justify-between gap-8'>
                            {post.author && <AuthorBox author={post.author} />}
                            <ReadTime
                                time={post._read_time || 0}
                                long={true}
                            />
                        </div>

                        <div className='w-full'>
                            {post.cover ? (
                                <Image
                                    src={post.cover?.detail || ''}
                                    alt='Post cover image'
                                    width={1200}
                                    height={600}
                                    className='h-auto w-full rounded-3xl'
                                />
                            ) : (
                                <div className='bg-primary-100 text-primary-200 flex h-[180px] w-full items-center justify-center rounded-3xl lg:h-[280px]'>
                                    <ImgPlaceholderSmooth className='w-[148px]' />
                                </div>
                            )}
                        </div>

                        <Prose className='mx-auto max-w-prose'>
                            <p>
                                <strong>{post.excerpt}</strong>
                            </p>
                        </Prose>

                        <BlogContent
                            content={
                                post.content
                            }
                        />

                        <div className='mx-auto max-w-prose py-10'>
                            <Suspense fallback={<Loading />}>
                                <CustomCTACard />
                            </Suspense>
                        </div>
                    </div>
                </Container>
            </section> 
            <Suspense fallback={<Loading />}>
                <SimilarPosts id={post._id} />
            </Suspense>
        </div>
    )
}

async function CustomCTACard() {
    const t = await getTranslations('CTA')

    return (
        <CtaCard
            item={
                {
                    heading: t('title'),
                    sub_heading: t('text'),
                } as CtaFragment
            }
            color='primary'
        />
    )
}
