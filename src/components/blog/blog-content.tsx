/**
 * BlogContent component renders a list of content fragments including text,
 * assets, and embedded media with proper type safety and error handling.
 */
import Prose from '@/components/blog/prose'
import BlogText from '@/components/blog/blog-text'
import BlogAssets from '@/components/blog/blog-assets'
import YoutubeEmbed from '@/components/ui/youtube-embed'
import { cn } from '@/lib/utils'
import { logger } from '@/lib/logger'
import { Assets, DcfFragment, Text, YouTubePost } from '@/gql/graphql'
import { CONTENT_TYPES } from './constants'

interface BlogContentProps extends React.PropsWithChildren {
    content: DcfFragment[]
    className?: string
}

/**
 * Generates a unique key for content items, preferring stable IDs over indices
 */
function getContentKey(item: DcfFragment, index: number): string {
    // Try to use a stable identifier from the item
    if ('_id' in item && item._id) {
        return item._id
    }
    if ('url' in item && item.url) {
        return item.url
    }

    // Fallback to typename + index
    return `${item.__typename}-${index}`
}

/**
 * Renders blog content from an array of content fragments
 */
export default function BlogContent({
    content,
    className,
    ...props
}: BlogContentProps) {
    if (!content?.length) {
        logger.warn('BlogContent: Received empty or invalid content array')
        return null
    }

    const items = content.map((item: DcfFragment, index: number) => {
        if (!item) {
            logger.warn('BlogContent: Encountered null item in content array', { index })
            return null
        }

        const key = getContentKey(item, index)

        switch (item.__typename) {
            case CONTENT_TYPES.TEXT:
                return (
                    <BlogText
                        item={item as Text}
                        key={key}
                    />
                )
            case CONTENT_TYPES.ASSETS:
                return (
                    <BlogAssets
                        assets={item as Assets}
                        key={key}
                    />
                )
            case CONTENT_TYPES.YOUTUBE_POST:
                return (
                    <YoutubeEmbed
                        url={(item as YouTubePost).url}
                        key={key}
                    />
                )
            default:
                logger.warn('BlogContent: Unknown content type', {
                    typename: item.__typename,
                    index,
                })
                return null
        }
    })

    // Filter out null items
    const validItems = items.filter(Boolean)

    if (!validItems.length) {
        logger.warn('BlogContent: No valid items to render after processing')
        return null
    }

    return (
        <article>
            <Prose
                {...props}
                className={cn('space-y-8 text-xl', className)}
            >
                {validItems}
            </Prose>
        </article>
    )
}
