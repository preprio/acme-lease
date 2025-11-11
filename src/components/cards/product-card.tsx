import { Link } from '@/i18n/routing'
import Image from 'next/image'
import Button from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import { ProductCardFragment } from '@/gql/graphql'

export default function ProductCard(props: { product: ProductCardFragment }) {
    const product = props.product
    const tProduct = useTranslations('Products')
    const hasPriceSuffix =
        product.price_suffix && product.price_suffix !== 'NONE'

    return (
        <Link
            href={`/products/${product._slug}`}
            data-prepr-item-id={product._id}
            className='hover:border-primary-600 flex h-full cursor-pointer flex-col justify-between gap-14 rounded-3xl border-2 border-transparent bg-white p-6 transition duration-200 ease-in select-none'
        >
            <div className='flex flex-wrap items-center justify-between gap-4'>
                <h3 className='text-secondary-700 text-mb-lg font-medium lg:text-lg'>
                    {product.name}
                </h3>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='20'
                    height='18'
                    viewBox='0 0 20 18'
                    fill='none'
                >
                    <path
                        d='M10.62 17.8101C10.28 17.9301 9.72 17.9301 9.38 17.8101C6.48 16.8201 0 12.6901 0 5.6901C0 2.6001 2.49 0.100098 5.56 0.100098C7.38 0.100098 8.99 0.980098 10 2.3401C11.01 0.980098 12.63 0.100098 14.44 0.100098C17.51 0.100098 20 2.6001 20 5.6901C20 12.6901 13.52 16.8201 10.62 17.8101Z'
                        fill='#DBEAFE'
                    />
                </svg>
            </div>
            <div>
                {product.image && (
                    <Image
                        src={product.image?.url || ''}
                        alt='Product image'
                        width='372'
                        height='188'
                        className='object-cover'
                    />
                )}
            </div>
            <div className='flex flex-wrap items-center justify-between gap-4'>
                <p className='text-secondary-700 text-mb-lg font-medium lg:text-lg'>
                    &#8364;{product.price}
                    {hasPriceSuffix && '/'}
                    {hasPriceSuffix && (
                        <span className='text-xs lowercase'>
                            {tProduct('price_suffix.' + product.price_suffix)}
                        </span>
                    )}
                </p>
                <Button buttonStyle='primary'>{tProduct('card.cta')}</Button>
            </div>
        </Link>
    )
}
