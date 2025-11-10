import Container from '@/components/container'
import { getApolloClient } from '@/apollo-client'
import {
    PageDocument,
    PageQuery,
    ProductsDocument,
    ProductsQuery,
    ProductWhereInput,
} from '@/gql/graphql'
import ProductCard from '@/components/product-card'
import { getHeaders } from '@/lib/server'
import PaginationChevron from '@/components/elements/pagination-chevron'
import PaginationItem from '@/components/elements/pagination-item'
import { cn } from '@/lib/utils'
import { notFound } from 'next/navigation'
import { useTranslations } from 'next-intl'
import CategoryButtons from '@/components/category-buttons'
import { Locale } from '@/types/locale'

const PRODUCTS_PER_PAGE = 9

async function getProducts(
    locale: string,
    skip: number = 0,
    category?: string
) {
    let cat = category !== 'all' ? category : undefined

    const client = await getApolloClient()
    const headers = await getHeaders()

    const query = {
        query: ProductsDocument,
        variables: {
            skip,
            limit: PRODUCTS_PER_PAGE,
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
        } as unknown as ProductWhereInput
    }

    const { data } = await client.query<ProductsQuery>(query)

    if (!data.Products) {
        return notFound()
    }

    return data?.Products
}

async function getProductsPage(locale: string) {
    const headers = await getHeaders()
    const client = await getApolloClient()

    const { data } = await client.query<PageQuery>({
        query: PageDocument,
        variables: {
            slug: 'products',
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

function ProductTitle() {
    const t = useTranslations('Products')

    return (
        <h1 className='text-mb-5xl text-secondary-700 font-medium text-balance wrap-break-word lg:text-7xl'>
            {t('title')}
        </h1>
    )
}

export default async function ProductOverviewPage({
    searchParams,
    params,
}: {
    searchParams: Promise<{ page?: string; category?: string }>
    params: Promise<{ locale: Locale }>
}) {
    const { page, category: pageCategory } = await searchParams
    const { locale } = await params
    const pageNumber = page ? parseInt(page) : 1

    const skip = (pageNumber - 1) * PRODUCTS_PER_PAGE

    const products = await getProducts(locale, skip, pageCategory)
    const productPage = await getProductsPage(locale)

    const totalPages = Math.ceil((products?.total || 0) / PRODUCTS_PER_PAGE)

    return (
        <section className='bg-primary-50 h-full w-full'>
            <meta
                property='prepr:id'
                content={productPage?.Page?._id}
            />
            <Container className='space-y-6 py-10 lg:space-y-14 lg:py-20'>
                <div className='space-y-6'>
                    <ProductTitle />
                    <div className='flex flex-wrap gap-3'>
                        <CategoryButtons
                            locale={locale}
                            pageCategory={pageCategory}
                        />
                    </div>
                </div>
                <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                    {products?.items?.map((product, index) => (
                        // @ts-ignore
                        <ProductCard
                            product={product}
                            key={index}
                        />
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
