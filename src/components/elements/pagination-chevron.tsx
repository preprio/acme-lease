'use client'

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'
import { usePathname, useRouter } from '@/i18n/routing'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { cn } from '@/lib/utils'

interface PaginationChevronProps extends React.HTMLAttributes<HTMLButtonElement> {
    disabled?: boolean
    direction?: 'left' | 'right'
}

export default function PaginationChevron({ disabled, className, direction = 'left' }: PaginationChevronProps) {
    const searchParams = useSearchParams()
    const { replace } = useRouter()
    const pathname = usePathname()

    const handleClick = () => {
        const params = new URLSearchParams(searchParams)

        const pageNumber = parseInt(params.get('page') || '1')

        if (direction === 'left' && pageNumber === 1) {
            return
        }

        if (direction === 'right') {
            params.set('page', (pageNumber + 1).toString())
        } else {
            params.set('page', (pageNumber - 1).toString())
        }

        replace(`${pathname}?${params.toString()}`)
    }


    return (
        <button
            onClick={handleClick}
            disabled={disabled}
            className={cn(
                'rounded-full bg-white flex justify-center items-center text-xs w-9 h-9 ',
                disabled ? 'text-secondary-300' : 'text-secondary-700',
                className,
            )}>
            {direction === 'right' ? <FaChevronRight /> : <FaChevronLeft />}</button>
    )
}