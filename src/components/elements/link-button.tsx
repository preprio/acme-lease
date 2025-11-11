import React from 'react'
import { cn } from '@/lib/utils'
import { Link } from '@/i18n/routing'

interface LinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
    children?: React.ReactNode
    href?: string
}

export default function LinkButton({
    children,
    href = '/',
    className,
    ...additionalProps
}: LinkProps) {
    const classes = cn(
        'text-base text-neutral-700 pb-0.5 border-b-transparent border-b hover:border-secondary-700  border-box',
        className
    )

    const { popover: _popover, ...restProps } = additionalProps

    return (
        <Link
            href={href}
            className={classes}
            {...restProps}
        >
            {children}
        </Link>
    )
}
