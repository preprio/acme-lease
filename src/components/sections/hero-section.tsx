import Container from '@/components/layout/container'
import Image from 'next/image'
import PreprButton from '@/components/ui/prepr-button'
import { HeroFragment } from '@/gql/graphql'

export default function HeroSection({ item }: { item: HeroFragment }) {
    const image = item.image

    return (
        <section
            className='bg-primary-50'
            data-prepr-variant-key={item._context?.variant_key}
        >
            <Container className='flex flex-col items-center gap-8 py-10 md:flex-row lg:py-20'>
                <div className='basis-6/12'>
                    <h1 className='text-mb-5xl text-secondary-700 font-medium text-balance wrap-break-word lg:text-7xl'>
                        {item.heading}
                    </h1>
                    <p className='text-mb-lg text-secondary-500 mt-4 text-balance lg:mt-6 lg:text-lg'>
                        {item.sub_heading}
                    </p>
                    <div className='mt-8 flex gap-4 xl:mt-10'>
                        {item.buttons.map((button, idx) => (
                            <PreprButton
                                button={button}
                                key={button.text || `hero-btn-${idx}`}
                            />
                        ))}
                    </div>
                </div>
                <div className='relative flex basis-6/12 items-center justify-end'>
                    <div className='absolute top-1/2 left-1/2 z-10 flex aspect-[20/17] w-9/12 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center overflow-hidden'>
                        {image && (
                            <Image
                                src={image?.url || ''}
                                alt='Hero Image'
                                width={720}
                                height={360}
                                className='rounded-2xl object-cover'
                            />
                        )}
                    </div>
                    <div className='bg-primary-100 top-0 right-0 z-0 aspect-[20/17] w-9/12 rounded-3xl'></div>
                </div>
            </Container>
        </section>
    )
}
