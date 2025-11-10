import Container from '@/components/container'
import { useTranslations } from 'next-intl'

export default function BenefitSection({
    title,
    context,
}: {
    title?: string
    context?: string
}) {
    const t = useTranslations('StaticSections.benefits')

    return (
        <section>
            <Container
                className='py-10 lg:py-20'
                data-prepr-variant-key={context}
            >
                <div className='flex flex-col justify-center space-y-14 p-0 text-left md:p-12 md:text-center lg:p-20'>
                    <div className='space-y-10'>
                        <h2 className='text-mb-4xl text-secondary-700 font-medium text-balance lg:text-5xl'>
                            {title || t('title')}
                        </h2>
                        <div className='flex flex-col items-center space-y-2.5'>
                            <div className='bg-secondary-300 h-4 w-full max-w-136 rounded-xs'></div>
                            <div className='bg-secondary-300 h-4 w-full max-w-96 rounded-xs'></div>
                            <div className='bg-secondary-300 h-4 w-full max-w-80 rounded-xs'></div>
                        </div>
                    </div>
                    {/* Benefits */}
                    <div
                        className='grid grid-cols-1 flex-wrap gap-8 sm:grid-cols-2 md:grid-cols-3 md:gap-14'
                        data-prepr-variant-event={'Click'}
                    >
                        <BenefitCard />
                        <BenefitCard />
                        <BenefitCard />
                        <BenefitCard />
                        <BenefitCard />
                        <BenefitCard />
                    </div>
                </div>
            </Container>
        </section>
    )
}

function BenefitCard() {
    return (
        <div className='space-y-8'>
            <div className='space-y-4'>
                <div className='flex h-20 w-20 flex-0 rounded-full'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='80'
                        height='80'
                        viewBox='0 0 80 80'
                        fill='none'
                    >
                        <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M40 80C62.0914 80 80 62.0914 80 40C80 17.9086 62.0914 0 40 0C17.9086 0 0 17.9086 0 40C0 62.0914 17.9086 80 40 80Z'
                            fill='#EFF6FF'
                        />
                        <path
                            d='M62.65 55.9032H18.7728C17.8849 55.9032 17.4374 54.8321 18.0614 54.2004L25.9475 46.2164C27.101 45.0486 28.9787 45.0246 30.1617 46.1625L32.8249 48.7243C34.1472 49.9962 36.2913 49.7938 37.3523 48.2968L45.8948 36.2432C47.0942 34.5507 49.6082 34.5572 50.7989 36.2557L63.4689 54.3291C63.9334 54.9918 63.4594 55.9032 62.65 55.9032Z'
                            fill='#DBEAFE'
                        />
                        <circle
                            cx='22.1626'
                            cy='30.8423'
                            r='5.78313'
                            fill='#DBEAFE'
                        />
                    </svg>
                </div>
                <div className='h-4 w-full max-w-24 rounded-xs bg-neutral-100'></div>
            </div>
            <div className='space-y-2.5'>
                <div className='h-3 w-full max-w-52 rounded-xs bg-neutral-50'></div>
                <div className='h-3 w-full max-w-48 rounded-xs bg-neutral-50'></div>
            </div>
        </div>
    )
}
