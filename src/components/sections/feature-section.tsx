import Container from '@/components/container'
import Image from 'next/image'
import PreprButton from '@/components/elements/prepr-button'
import { FeatureFragment } from '@/gql/graphql'

export default function FeatureSection({ item }: { item: FeatureFragment }) {
    const image = (
        <div className='order-first basis-1/2 md:order-0'>
            <Image
                src={item.image?.url || ''}
                alt='Feature image'
                width={870}
                height={570}
                className='aspect-29/19 w-full rounded-2xl object-cover'
            />
        </div>
    )

    return (
        <section
            className='bg-primary-50'
            data-prepr-variant-key={item._context?.variant_key}
        >
            <Container className='py-10 lg:py-10 xl:py-20'>
                <div className='text-secondary-700 flex flex-col items-start gap-8 md:flex-row md:items-center xl:gap-28'>
                    {item.image_position === 'LEFT' && image}
                    <div className='basis-1/2'>
                        {item.heading && (
                            <h2 className='text-mb-4xl text-secondary-700 font-medium text-balance lg:text-5xl'>
                                {item.heading}
                            </h2>
                        )}
                        {item.sub_heading && (
                            <p className='mt-4 text-lg font-medium text-balance text-wrap xl:mt-6'>
                                {item.sub_heading}
                            </p>
                        )}
                        {item.button && (
                            <PreprButton
                                button={item.button}
                                className='mt-8 xl:mt-10'
                            />
                        )}
                    </div>
                    {item.image_position === 'RIGHT' && image}
                </div>
            </Container>
        </section>
    )
}
