'use client'

import { cn } from '@/lib/utils'
import { useSwiperReactive } from '@/hooks/useSwiperReactive'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'
import { useEffect, useState } from 'react'
import { ANIMATION_DELAYS } from '@/constants/timing'

/**
 * SwiperNavigation component
 *
 * Provides navigation controls (prev/next buttons and pagination dots) for Swiper carousels.
 * Automatically calculates the number of slides based on viewport and slidesPerView.
 * Hides navigation when there's only one slide or fewer.
 */
export default function SwiperNavigation() {
    const swiper = useSwiperReactive()

    const [slidesAmount, setSlidesAmount] = useState(1)

    useEffect(() => {
        setTimeout(() => {
            if (swiper && swiper.slides && swiper?.slidesPerViewDynamic()) {
                setSlidesAmount(
                    1 + (swiper.slides?.length - swiper.slidesPerViewDynamic())
                )
            }
        }, ANIMATION_DELAYS.SWIPER_CALCULATION)
    }, [swiper])

    useEffect(() => {
        // Handler to call on window resize
        function handleResize() {
            setTimeout(() => {
                if (swiper && swiper.slides && swiper?.slidesPerViewDynamic())
                    setSlidesAmount(
                        1 +
                            (swiper.slides?.length -
                                swiper.slidesPerViewDynamic())
                    )
            }, ANIMATION_DELAYS.SWIPER_CALCULATION)
        }

        // Add event listener
        window.addEventListener('resize', handleResize)
        // Call handler right away so state gets updated with initial window size
        handleResize()
        // Remove event listener on cleanup
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [swiper])

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
