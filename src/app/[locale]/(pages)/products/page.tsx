import Container from '@/components/layout/container'
import ProductCard from '@/components/cards/product-card'
import Pagination from '@/components/layout/pagination'
import { notFound } from 'next/navigation'
import { useTranslations } from 'next-intl'
import CategoryButtons from '@/components/category-buttons'
import { Locale } from '@/types/locale'
import { ProductsService } from '@/services/products'
import { PagesService } from '@/services/pages'
import { PRODUCTS_PER_PAGE } from '@/constants/pagination'

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

    // Use services for data fetching
    const products = await ProductsService.getProducts({
        locale,
        skip,
        limit: PRODUCTS_PER_PAGE,
        category: pageCategory,
    })

    const productPage = await PagesService.getPageBySlug({
        locale,
        slug: 'products',
    })

    if (!products) {
        return notFound()
    }

    if (!productPage) {
        return notFound()
    }

    const totalPages = Math.ceil((products?.total || 0) / PRODUCTS_PER_PAGE)

    return (
        <section className='bg-primary-50 h-full w-full'>
            <meta
                property='prepr:id'
                content={productPage._id}
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
                        <ProductCard
                            product={product}
                            key={index}
                        />
                    ))}
                </div>

                <Pagination
                    currentPage={pageNumber}
                    totalPages={totalPages}
                />
            </Container>
        </section>
    )
}
