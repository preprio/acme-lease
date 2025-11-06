import Container from '@/components/container'
import { FaChevronLeft } from 'react-icons/fa6'
import { Link } from '@/i18n/routing'
import { CtaFragment, PostDocument, PostQuery } from '@/gql/graphql'
import Badge from '@/components/elements/badge'
import AuthorBox from '@/components/author-box'
import ReadTime from '@/components/elements/read-time'
import Image from 'next/image'
import ImgPlaceholderSmooth from '@/components/img-placeholder-smooth'
import { getApolloClient } from '@/apollo-client'
import { notFound } from 'next/navigation'
import Prose from '@/components/blog/prose'
import BlogContent from '@/components/blog/blog-content'
import CtaCard from '@/components/cta-card'
import SimilarPosts from '@/components/similar-posts'
import { getHeaders } from '@/lib/server'
import { useTranslations } from 'next-intl'
import { Locale } from '@/types/locale'

const getPostData = async (slug: string, locale: Locale) => {
    const client = await getApolloClient()

    const { data } = await client.query<PostQuery>({
        query: PostDocument,
        variables: {
            slug: slug,
        },
        context: {
            headers: await getHeaders(),
            'Prepr-Locale': locale || '',
        },
    })

    if (!data || !data.Post) {
        return notFound()
    }

    return data.Post
}

export default async function BlogDetailPage({
                                                 params,
                                             }: {
    params: Promise<{ slug: string, locale: Locale }>
}) {
    let { slug, locale } = await params
    const post = await getPostData(slug, locale)

    return (
        <div>
            <meta property="prepr:id" content={post?._id} />
            <section>
                <Container className="pt-6">
                    <Link href="/blog"
                          className="flex items-center gap-1 text-sm text-secondary-700 font-medium hover:pointer-cursor hover:underline">
                        <FaChevronLeft />Back
                    </Link>

                    <div className="mx-auto w-full max-w-prose space-y-6 py-10 text-secondary-700">
                        <div className="flex flex-wrap gap-2">
                            {post.categories && post.categories.map((category, index) => (
                                <Badge key={index}>{category.name}</Badge>
                            ))}
                        </div>
                        <h1 className="text-balance text-secondary-700 font-medium text-mb-5xl lg:text-6xl">
                            {post.title}
                        </h1>

                        <div className="flex justify-between flex-wrap gap-8">
                            {post.author && <AuthorBox author={post.author} />}
                            <ReadTime time={post._read_time || 0} long={true} />
                        </div>

                        <div className="w-full">
                            {post.cover ? (
                                <Image src={post.cover?.detail || ''} alt="Post cover image" width={1200} height={600}
                                       className="w-full h-auto rounded-3xl" />
                            ) : (
                                <div
                                    className="w-full h-[180px] lg:h-[280px] flex items-center justify-center rounded-3xl bg-primary-100 text-primary-200">
                                    <ImgPlaceholderSmooth className="w-[148px]" />
                                </div>
                            )}
                        </div>

                        <Prose className="max-w-prose mx-auto">
                            <p>
                                <strong>{post.excerpt}</strong>
                            </p>
                        </Prose>

                        <BlogContent content={post?.content} />

                        <div className="py-10 max-w-prose mx-auto">
                            <CustomCTACard />
                        </div>
                    </div>
                </Container>
            </section>
            <SimilarPosts id={post._id} />
        </div>
    )
}

function CustomCTACard() {
    const t = useTranslations('CTA')

    return (
        <CtaCard item={
            {
                heading: t('title'),
                sub_heading: t('text'),
            } as CtaFragment
        } color="primary" />
    )
}