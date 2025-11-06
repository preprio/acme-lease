'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { usePathname, useRouter } from '@/i18n/routing'
import { useSearchParams } from 'next/navigation'

interface CategoryButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode
    _slug?: string
}

export default function CategoryButton({
                                           children,
                                           className,
                                           _slug = '',
                                           ...props
                                       }: CategoryButtonProps) {
    const classes = cn(
        'text-secondary-700 text-sm text-mb-sm font-medium border-2 border-primary-200 hover:bg-primary-100 transition eas-in duration-200',
        'rounded-full py-2 px-6 [&.active]:bg-primary-200',
        className,
    )
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()

    const handleClick = () => {
        if (!_slug) {
            return
        }

        const params = new URLSearchParams(searchParams)

        if (params.get('page')) {
            params.delete('page')
        }

        if (_slug === 'all') {
            params.delete('category')
        } else if (_slug === params.get('category')) {
            params.delete('category')
        } else {
            params.set('category', _slug)
        }
        replace(`${pathname}?${params.toString()}`)
    }

    return (
        <button className={classes} onClick={handleClick} {...props}>
            {children}
        </button>
    )
}