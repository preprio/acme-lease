'use client'

import { cn } from '@/lib/utils'
import React, { ReactElement, useCallback, useEffect, useState } from 'react'

export const InfiniteMovingCards = ({
    items,
    direction = 'left',
    speed = 'fast',
    pauseOnHover = true,
    className,
}: {
    items: ReactElement[]
    direction?: 'left' | 'right'
    speed?: 'fast' | 'normal' | 'slow'
    pauseOnHover?: boolean
    className?: string
}) => {
    const containerRef = React.useRef<HTMLDivElement>(null)
    const scrollerRef = React.useRef<HTMLUListElement>(null)
    const [start, setStart] = useState(false)

    const getDirection = useCallback(() => {
        if (containerRef.current) {
            if (direction === 'left') {
                containerRef.current.style.setProperty(
                    '--animation-direction',
                    'forwards'
                )
            } else {
                containerRef.current.style.setProperty(
                    '--animation-direction',
                    'reverse'
                )
            }
        }
    }, [direction])

    const getSpeed = useCallback(() => {
        if (containerRef.current) {
            if (speed === 'fast') {
                containerRef.current.style.setProperty(
                    '--animation-duration',
                    '20s'
                )
            } else if (speed === 'normal') {
                containerRef.current.style.setProperty(
                    '--animation-duration',
                    '40s'
                )
            } else {
                containerRef.current.style.setProperty(
                    '--animation-duration',
                    '120s'
                )
            }
        }
    }, [speed])

    const addAnimation = useCallback(() => {
        if (containerRef.current && scrollerRef.current) {
            const scrollerContent = Array.from(scrollerRef.current.children)

            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true)
                if (scrollerRef.current) {
                    scrollerRef.current.appendChild(duplicatedItem)
                }
            })

            getDirection()
            getSpeed()
            setStart(true)
        }
    }, [getDirection, getSpeed])

    useEffect(() => {
        addAnimation()
    }, [addAnimation])
    return (
        <div
            ref={containerRef}
            className={cn(
                'scroller relative z-20 mx-auto max-w-7xl overflow-hidden mask-[linear-gradient(to_right,transparent,white_05%,white_95%,transparent)]',
                className
            )}
        >
            <ul
                ref={scrollerRef}
                className={cn(
                    'flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4',
                    start && 'animate-scroll',
                    pauseOnHover && 'hover:[animation-play-state:paused]'
                )}
            >
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    )
}
