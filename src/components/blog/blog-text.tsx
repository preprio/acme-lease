import { slugify } from '@/lib/utils'

export default function BlogText({ item }: { item: any }) {
    if (item.format === 'Code') {
        return (
            <div className="mx-auto max-w-prose flex" dangerouslySetInnerHTML={{__html: item.body}}></div>
        )
    } else if (item.format && item.format.includes('H')) {
        return (
            <div
                className="mx-auto max-w-prose scroll-mt-6 target:mt-24 md:scroll-mt-8 lg:scroll-mt-12 flex"
                id={slugify(item.body)}
                dangerouslySetInnerHTML={{
                    __html: item.body || '',
                }}></div>
        )
    } else {
        return (
            <div
                className="mx-auto max-w-prose flex"
                dangerouslySetInnerHTML={{
                    __html: item.body || '',
                }}></div>
        )
    }
}
