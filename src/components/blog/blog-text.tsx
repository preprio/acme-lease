"use client"

import { Text } from '@/gql/graphql'

export default function BlogText({ item }: { item: Text }) {
    if (!item.body) return null

    if (item.format) {
        if (item.format === 'H1' || item.format === 'H2' || item.format === 'H3' || item.format === 'H4' || item.format === 'H5' || item.format === 'H6') {
            const HeadingTag = item.format.toLowerCase() as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
            return (
                <HeadingTag 
                    className="mx-auto max-w-prose scroll-mt-6 target:mt-24 md:scroll-mt-8 lg:scroll-mt-12 flex" 
                >
                    {item.text || item.body}
                </HeadingTag>
            )
        } 
        else if (item.format === 'HTML') {
            return (
                <div className="mx-auto max-w-prose flex" dangerouslySetInnerHTML={{__html: item.body}}></div>
            )
        } 
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
