'use client'

import Container from '@/components/container'
import PreprButton from '@/components/elements/prepr-button'
import ProductCard from '@/components/product-card'
import SwiperNavigation from '@/components/swiper-navigation'
import { CardsFragment } from '@/gql/graphql'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

type CardsSectionDefaultProps = {
    item: CardsFragment
}

/**
 * CardsSectionDefault component
 *
 * Displays a section with product cards in a horizontal scrollable carousel.
 * Used for showcasing multiple products with navigation controls.
 */
export default function CardsSectionDefault({
    item,
}: CardsSectionDefaultProps) {
    return (
        <section
            className='bg-primary-100'
            data-prepr-variant-key={item._context?.variant_key}
        >
            <Container className='space-y-10 py-10 lg:space-y-12 lg:py-20'>
                <div className='flex w-full flex-wrap justify-between gap-4 sm:flex-nowrap'>
                    <div className='space-y-6'>
                        <h2 className='text-mb-4xl text-secondary-700 font-medium text-balance lg:text-5xl'>
                            {item.heading}
                        </h2>
                        <p className='text-mb-base text-secondary-500 max-w-2xl lg:text-base'>
                            {item.sub_heading}
                        </p>
                    </div>
                    {item.button && (
                        <div
                            className='justify-self-end'
                            data-prepr-variant-event={'Click'}
                        >
                            <PreprButton button={item.button} />
                        </div>
                    )}
                </div>

                <Swiper
                    className='h-auto!'
                    slidesPerView={1}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 24,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 32,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 32,
                        },
                    }}
                    spaceBetween={16}
                >
                    {item.cards?.map((card, index) => {
                        if (card.__typename === 'Product') {
                            return (
                                <SwiperSlide
                                    key={index}
                                    className='h-auto! self-stretch!'
                                    data-prepr-variant-event={'Click'}
                                >
                                    <ProductCard product={card} />
                                </SwiperSlide>
                            )
                        }
                    })}
                    <SwiperNavigation />
                </Swiper>
            </Container>
        </section>
    )
}
