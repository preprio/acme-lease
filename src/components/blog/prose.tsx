/**
 * Prose component provides consistent typography styling for blog content
 * using Tailwind's Typography plugin with custom overrides.
 */
import { cn } from '@/lib/utils'
import React from 'react'

interface ProseProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode
    className?: string
}

/**
 * Wrapper component that applies prose typography styles to its children.
 * Includes custom styling for headings, paragraphs, links, and lists.
 */
export default function Prose({ children, className, ...props }: ProseProps) {
    return (
        <div
            {...props}
            className={cn(
                `prose prose-headings:m-0 prose-p:m-0 prose-li:list-disc prose-p:leading-normal prose-headings:text-balance prose-headings:leading-tight! prose-a:text-primary-600 prose-a:no-underline prose-a:hover:text-primary-700 prose-a:hover:underline font-medium`,
                'prose-headings:text-secondary-700',
                'prose-headings:font-medium',
                'prose-h2:text-mb-3xl lg:prose-h2:text-4xl',
                'prose-h3:text-mb-2xl lg:prose-h3:text-3xl',
                'prose-h4:text-mb-xl lg:prose-h4:text-2xl',
                'prose-p:text-mb-lg lg:prose-p:text-lg',
                className
            )}
        >
            {children}
        </div>
    )
}
