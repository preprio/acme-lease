'use client'

import { cn } from '@/lib/utils'
import { useSwiperReactive } from '@/hooks/useSwiperReactive'
import { useDebounce } from '@/hooks/useDebounce'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'
import { useEffect, useState, useCallback } from 'react'
import { ANIMATION_DELAYS } from '@/constants/timing'

/**
 * SwiperNavigation component
 *
 * Provides navigation controls (prev/next buttons and pagination dots) for Swiper carousels.
 * Automatically calculates the number of slides based on viewport and slidesPerView.
 * Hides navigation when there's only one slide or fewer.
 * Uses debounced resize handler for better performance.
 */
export default function SwiperNavigation() {
    const swiper = useSwiperReactive()
    const [slidesAmount, setSlidesAmount] = useState(1)

    // Calculate slides amount based on swiper state
    const calculateSlidesAmount = useCallback(() => {
        if (swiper && swiper.slides && swiper?.slidesPerViewDynamic()) {
            setSlidesAmount(
                1 + (swiper.slides?.length - swiper.slidesPerViewDynamic())
            )
        }
    }, [swiper])

    // Initial calculation when swiper changes
    useEffect(() => {
        setTimeout(() => {
            calculateSlidesAmount()
        }, ANIMATION_DELAYS.SWIPER_CALCULATION)
    }, [calculateSlidesAmount])

    // Debounced resize handler for better performance
    const debouncedCalculate = useDebounce(() => {
        setTimeout(() => {
            calculateSlidesAmount()
        }, ANIMATION_DELAYS.SWIPER_CALCULATION)
    }, 150) // 150ms debounce delay

    useEffect(() => {
        // Add debounced resize listener
        window.addEventListener('resize', debouncedCalculate)

        // Initial calculation
        debouncedCalculate()

        // Cleanup
        return () => {
            window.removeEventListener('resize', debouncedCalculate)
        }
    }, [debouncedCalculate])

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
