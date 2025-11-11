'use client'

import { Text } from '@/gql/graphql'
import { logger } from '@/lib/logger'

interface BlogTextProps {
    item: Text
}

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

const HEADING_FORMATS: readonly string[] = [
    'H1',
    'H2',
    'H3',
    'H4',
    'H5',
    'H6',
] as const

/**
 * Checks if the format is a valid heading format
 */
function isHeadingFormat(
    format: string
): format is 'H1' | 'H2' | 'H3' | 'H4' | 'H5' | 'H6' {
    return HEADING_FORMATS.includes(format)
}

/**
 * Renders text content in blog posts with support for different text formats
 */
export default function BlogText({ item }: BlogTextProps) {
    if (!item?.body) {
        logger.warn('BlogText: Received item without body content')
        return null
    }

    // Handle heading formats (H1-H6)
    if (item.format && isHeadingFormat(item.format)) {
        const HeadingTag = item.format.toLowerCase() as HeadingTag
        const content = item.text || item.body

        return (
            <HeadingTag className='mx-auto flex max-w-prose scroll-mt-6 target:mt-24 md:scroll-mt-8 lg:scroll-mt-12'>
                {content}
            </HeadingTag>
        )
    }

    return (
        <div
            className='mx-auto flex max-w-prose'
            dangerouslySetInnerHTML={{ __html: item.body }}
        />
    )
}
