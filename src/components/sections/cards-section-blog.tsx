'use client'

import Container from '@/components/layout/container'
import PreprButton from '@/components/ui/prepr-button'
import PostCard from '@/components/cards/post-card'
import SwiperNavigation from '@/components/layout/swiper-navigation'
import { CardsFragment } from '@/gql/graphql'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

type CardsSectionBlogProps = {
    item: CardsFragment
}

/**
 * CardsSectionBlog component
 *
 * Displays a section with blog post cards in a horizontal scrollable carousel.
 * Features centered heading and different breakpoints optimized for blog content.
 */
export default function CardsSectionBlog({ item }: CardsSectionBlogProps) {
    return (
        <section
            className='bg-primary-50'
            data-prepr-variant-key={item._context?.variant_key}
        >
            <Container className='space-y-10 py-10 lg:space-y-12 lg:py-20'>
                <div className='flex flex-col justify-center text-center'>
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
                    slidesPerView={1}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 24,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 32,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 32,
                        },
                    }}
                    spaceBetween={16}
                >
                    {item.cards?.map((card, index) => {
                        if (card.__typename === 'Post') {
                            return (
                                <SwiperSlide
                                    key={index}
                                    className='h-auto! self-stretch!'
                                    data-prepr-variant-event={'Click'}
                                >
                                    <PostCard post={card} />
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
