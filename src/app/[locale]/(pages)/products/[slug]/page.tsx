import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import Container from '@/components/layout/container'
import { Link } from '@/i18n/routing'
import { FaChevronLeft } from 'react-icons/fa6'
import Image from 'next/image'
import Button from '@/components/ui/button'
import { getTranslations } from 'next-intl/server'
import Sections from '@/components/sections/sections'
import { Locale } from '@/types/locale'
import { ProductsService } from '@/services/products'
import RatingStars from '@/components/cards/rating-stars'
import Loading from '@/components/loading'

export default async function ProductPage({
    params,
}: {
    params: Promise<{ slug: string; locale: Locale }>
}) {
    const { slug, locale } = await params

    const product = await ProductsService.getProductBySlug({ slug, locale })

    if (!product) {
        return notFound()
    }

    const sections = product?.content && (
        <Sections sections={product?.content} />
    )

    const t = await getTranslations('Products')

    return (
        <div>
            <meta
                property='prepr:id'
                content={product?._id}
            />
            <section>
                <Container className='pt-6'>
                    <Link
                        href='/products'
                        className='text-secondary-700 hover:pointer-cursor flex items-center gap-1 text-sm font-medium hover:underline'
                    >
                        <FaChevronLeft />
                        Back
                    </Link>
                </Container>
            </section>
            <section>
                <Container className='py-10 lg:py-20'>
                    <div className='grid grid-cols-1 items-center justify-center gap-8 md:grid-cols-2 lg:gap-12'>
                        <Image
                            src={product.image?.url || ''}
                            alt='Product image'
                            width={696}
                            height={326}
                            className='w-full'
                        />
                        <div className='space-y-6 lg:space-y-8'>
                            <div className='space-y-3'>
                                <h1 className='text-mb-5xl text-secondary-700 font-medium text-balance wrap-break-word lg:text-7xl'>
                                    {product.name}
                                </h1>
                                <div className='flex gap-2'>
                                    <RatingStars rating={product.rating} />
                                </div>
                            </div>
                            <h2 className='text-secondary-700 text-mb-3xl font-medium lg:text-4xl'>
                                € {product.price}
                                <span className='text-mb-base lowercase lg:text-base'>
                                    {product.price_suffix && ' /'}{' '}
                                    {product.price_suffix}
                                </span>
                            </h2>
                            <Button buttonStyle='primary'>
                                {t('request_quote')}
                            </Button>
                            <p className='text-mb-lg text-secondary-700 font-medium lg:text-lg'>
                                {product.excerpt}
                            </p>
                        </div>
                    </div>
                </Container>
            </section>
            {sections && (
                <Suspense fallback={<Loading />}>{sections}</Suspense>
            )}
        </div>
    )
}

