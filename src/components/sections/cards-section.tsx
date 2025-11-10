'use client'

import Container from '@/components/container'
import PreprButton from '@/components/elements/prepr-button'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import ProductCard from '@/components/product-card'
import PostCard from '@/components/post-card'
import { cn } from '@/lib/utils'
import { useSwiperReactive } from '@/hooks/useSwiperReactive'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'
import { useEffect, useState } from 'react'
import { CardsFragment } from '@/gql/graphql'

export default function CardsSection({ item }: { item: CardsFragment }) {
    return (
        <section
            className={cn(
                'bg-primary-100',
                item.variant === 'BLOG' && 'bg-primary-50'
            )}
            data-prepr-variant-key={item._context?.variant_key}
        >
            <Container className='space-y-10 py-10 lg:space-y-12 lg:py-20'>
                {/* Default Variant */}
                {(!item.variant || item.variant === 'DEFAULT') && (
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
                )}

                {/* Blog Variant */}
                {item.variant === 'BLOG' && (
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
                )}

                {/* DEFAULT SWIPER */}
                {(!item.variant || item.variant === 'DEFAULT') && (
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
                )}

                {/*  BLOG CARD SWIPER  */}
                {item.variant === 'BLOG' && (
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
                                // @ts-ignore
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
                )}
            </Container>
        </section>
    )
}

function SwiperNavigation() {
    const swiper = useSwiperReactive()

    const [slidesAmount, setSlidesAmount] = useState(1)
    useEffect(() => {
        setTimeout(() => {
            if (swiper && swiper.slides && swiper?.slidesPerViewDynamic()) {
                setSlidesAmount(
                    1 + (swiper.slides?.length - swiper.slidesPerViewDynamic())
                )
            }
        }, 500)
    }, [swiper])

    useEffect(() => {
        // Handler to call on window resize
        function handleResize() {
            // Set window width/height to state
            // setSlidesAmount(1 + (swiper.slides.length - swiper.slidesPerViewDynamic()))
            setTimeout(() => {
                if (swiper && swiper.slides && swiper?.slidesPerViewDynamic())
                    setSlidesAmount(
                        1 +
                            (swiper.slides?.length -
                                swiper.slidesPerViewDynamic())
                    )
            }, 500)
        }

        // Add event listener
        window.addEventListener('resize', handleResize)
        // Call handler right away so state gets updated with initial window size
        handleResize()
        // Remove event listener on cleanup
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [swiper]) // Empty array ensures that effect is only run on mount

    if (slidesAmount <= 1) return null

    return (
        <div className='mt-4 flex items-center justify-center gap-8'>
            <div className='flex items-center justify-center'>
                <button
                    className={cn(
                        'flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white',
                        swiper.isBeginning
                            ? 'text-secondary-300'
                            : 'text-secondary-700'
                    )}
                    disabled={swiper.isBeginning}
                    onClick={() => swiper.slidePrev()}
                >
                    <FaChevronLeft />
                </button>
            </div>
            <div className='flex gap-2'>
                {slidesAmount > 1 &&
                    Array.from({ length: slidesAmount }).map((_, index) => (
                        <button
                            key={index}
                            className={cn(
                                'h-2 w-2 cursor-pointer rounded-full bg-white',
                                swiper.activeIndex === index
                                    ? 'bg-primary-700'
                                    : 'bg-white'
                            )}
                            onClick={() => swiper.slideTo(index)}
                        />
                    ))}
            </div>
            <div>
                <button
                    className={cn(
                        'flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white',
                        swiper.isEnd
                            ? 'text-secondary-300'
                            : 'text-secondary-700'
                    )}
                    disabled={swiper.isEnd}
                    onClick={() => swiper.slideNext()}
                >
                    <FaChevronRight />
                </button>
            </div>
        </div>
    )
}
