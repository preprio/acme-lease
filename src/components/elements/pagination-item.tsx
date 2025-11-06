'use client'

import { cn } from '@/lib/utils'
import React from 'react'
import { usePathname, useRouter } from '@/i18n/routing'
import { useSearchParams } from 'next/navigation'

interface PaginationItemProps extends React.HTMLAttributes<HTMLButtonElement> {
    pageNumber: number
}

export default function PaginationItem({ className, pageNumber, ...props }: PaginationItemProps) {
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
                'h-8 w-8 rounded-lg items-center flex justify-center  text-secondary-700 font-medium text-sm [&.active]:bg-primary-100',
                className,
            )}
            onClick={handleClick}
            {...props}
        >
            {pageNumber}
        </button>
    )
}