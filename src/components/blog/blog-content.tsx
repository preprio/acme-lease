import Prose from '@/components/blog/prose'
import BlogText from '@/components/blog/blog-text'
import BlogAssets from '@/components/blog/blog-assets'
import YoutubeEmbed from '@/components/youtube-embed'
import { cn } from '@/lib/utils'

interface BlogContentProps extends React.HTMLAttributes<HTMLDivElement> {
    content: any 
    className?: string
}

export default function BlogContent({ content, className, ...props }: BlogContentProps) {
    const items = content?.map((item: any, index: any) => {
        if (item.__typename === 'Text') {
            return <BlogText item={item} key={index} />
        } else if (item?.__typename === 'Assets' && item.items) {
            return <BlogAssets item={item} key={index} />
        }  else if (item?.__typename === 'YouTubePost') {
            return (
                <div className='mx-auto max-w-prose' key={index}>
                    <YoutubeEmbed url={item.url} />
                </div>
            )
        }
    })

    return (
        <article>
            <Prose {...props} className={cn("space-y-8 text-xl", className)}>
                {items}
            </Prose>
        </article>
    )
}