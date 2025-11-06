import { cn } from '@/lib/utils'
import React from 'react'

interface ProseProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode
    className?: string
}

export default function Prose({ children, className, ...props }: ProseProps) {
    return (
        <div
            {...props}
            className={cn(
                `prose font-medium prose-headings:m-0 prose-p:m-0 prose-li:list-disc prose-p:leading-normal prose-headings:text-balance prose-headings:!leading-tight prose-a:text-primary-600 prose-a:no-underline hover:prose-a:text-primary-700 hover:prose-a:underline`,
                'prose-headings:text-secondary-700',
                'prose-headings:font-medium',
                'prose-h2:text-mb-3xl lg:prose-h2:text-4xl',
                'prose-h3:text-mb-2xl lg:prose-h2:text-3xl',
                'prose-h4:text-mb-xl lg:prose-h2:text-2xl',
                'prose-p:text-mb-lg lg:prose-p:text-lg',
                className,
            )}>
            {children}
        </div>
    )
}
