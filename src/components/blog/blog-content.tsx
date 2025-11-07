import Prose from '@/components/blog/prose'
import BlogText from '@/components/blog/blog-text'
import BlogAssets from '@/components/blog/blog-assets'
import YoutubeEmbed from '@/components/youtube-embed'
import { cn } from '@/lib/utils'
import { Assets, DynamicContentFieldFragment } from '@/gql/graphql'

interface BlogContentProps extends React.PropsWithChildren {
    content: DynamicContentFieldFragment[]
    className?: string
}

export default function BlogContent({ content, className, ...props }: BlogContentProps) {
    if (!content) return null

    const items = content.map((item: DynamicContentFieldFragment, index: number) => {
        if (!item) return null

        switch (item.__typename) {
            case 'Text':
                return <BlogText item={item} key={index} />
            case 'Assets':
                return <BlogAssets assets={item as Assets} key={index} />
            case 'YouTubePost':
                return <YoutubeEmbed url={item.url} key={index} />
            default:
                return null
        }
    })

    if (!items) return null

    return (
        <article>
            <Prose {...props} className={cn("space-y-8 text-xl", className)}>
                {items}
            </Prose>
        </article>
    )
}