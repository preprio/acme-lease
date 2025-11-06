import { getApolloClient } from '@/apollo-client'
import { ProductDocument, ProductQuery, Rating } from '@/gql/graphql'
import { notFound } from 'next/navigation'
import Container from '@/components/container'
import { Link } from '@/i18n/routing'
import { FaChevronLeft, FaStar } from 'react-icons/fa6'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import Button from '@/components/elements/button'
import { getHeaders } from '@/lib/server'
import { getTranslations } from 'next-intl/server'
import Sections from '@/components/sections/sections'

const getProductData = async (slug: string) => {
    const client = await getApolloClient()

    const { data } = await client.query<ProductQuery>({
        query: ProductDocument,
        variables: {
            slug: slug,
        },
        context: {
            headers: await getHeaders(),
        },
    })

    if (!data || !data.Product) {
        return notFound()
    }

    return data.Product
}


export default async function ProductPage({
                                              params,
                                          }: {
    params: Promise<{ slug: string }>
}) {
    let { slug } = await params
    const product = await getProductData(slug)

    const sections = product?.content && <Sections sections={product?.content} />

    const t = await getTranslations('Products')

    return (
        <div>
            <meta property="prepr:id" content={product?._id} />
            <section>
                <Container className="pt-6">
                    <Link href="/products"
                          className="flex items-center gap-1 text-sm text-secondary-700 font-medium hover:pointer-cursor hover:underline">
                        <FaChevronLeft />Back
                    </Link>
                </Container>
            </section>
            <section>
                <Container className="py-10 lg:py-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center justify-center">
                        <Image src={product.image?.url || ''} alt="Product image" width={696} height={326}
                               className="w-full" />
                        <div className="space-y-6 lg:space-y-8">
                            <div className="space-y-3">
                                <h1 className="text-mb-5xl lg:text-7xl text-secondary-700 font-medium break-words text-balance">{product.name}</h1>
                                <div className="flex gap-2">
                                    <Ratings rating={product.rating} />
                                </div>
                            </div>
                            <h2 className="text-secondary-700 text-mb-3xl lg:text-4xl font-medium">
                                € {product.price}
                                <span
                                    className="text-mb-base lg:text-base lowercase">{product.price_suffix && ' /'} {product.price_suffix}</span>
                            </h2>
                            <Button buttonStyle="primary">{t('request_quote')}</Button>
                            <p className="text-mb-lg lg:text-lg font-medium text-secondary-700 ">{product.excerpt}</p>
                        </div>
                    </div>
                </Container>
            </section>
            {sections}
        </div>
    )
}

function Ratings({ rating }: { rating?: Rating | null }) {
    let ratingValue = 0

    switch (rating) {
        case 'ONE':
            ratingValue = 1
            break
        case 'TWO':
            ratingValue = 2
            break
        case 'THREE':
            ratingValue = 3
            break
        case 'FOUR':
            ratingValue = 4
            break
        case 'FIVE':
            ratingValue = 5
            break
    }

    // Create an array of 5 elements, where each element is a star, the first n elements are filled, the rest are empty
    const stars = Array.from({ length: 5 })

    return (
        <div className="flex gap-1 text-2xl">
            {stars.map((star, index) => (
                <FaStar key={index} className={cn(
                    (index + 1) <= ratingValue ? 'text-primary-600' : 'text-primary-200',
                )} />
            ))}
        </div>
    )
}