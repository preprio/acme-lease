import React, { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

interface ContainerProps extends ComponentProps<'div'> {
    children?: React.ReactNode
}

export default function Container({
    children,
    className,
    ...props
}: ContainerProps) {
    return (
        <div
            className={cn('max-w-8xl p-spacing mx-auto', className)}
            {...props}
        >
            {children}
        </div>
    )
}
