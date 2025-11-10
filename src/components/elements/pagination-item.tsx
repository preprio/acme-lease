'use client'

import { cn } from '@/lib/utils'
import React from 'react'
import { usePathname, useRouter } from '@/i18n/routing'
import { useSearchParams } from 'next/navigation'

interface PaginationItemProps extends React.HTMLAttributes<HTMLButtonElement> {
    pageNumber: number
}

export default function PaginationItem({
    className,
    pageNumber,
    ...props
}: PaginationItemProps) {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()

    const handleClick = () => {
        const params = new URLSearchParams(searchParams)

        params.set('page', pageNumber.toString())
        replace(`${pathname}?${params.toString()}`)
    }

    return (
        <button
            className={cn(
                'text-secondary-700 [&.active]:bg-primary-100 flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium',
                className
            )}
            onClick={handleClick}
            {...props}
        >
            {pageNumber}
        </button>
    )
}
