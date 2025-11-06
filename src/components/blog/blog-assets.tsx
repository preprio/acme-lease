import Image from 'next/image'

export default function BlogAssets({ item }: { item: any }) {
    const items = item.items.map((item: any, index: any) => {
        if (!item) return null

        if (item._type === 'Photo') {
            return (
                <Image
                    key={index}
                    src={item?.url || ''}
                    width={item.width || 1000}
                    height={item.height || 500}
                    alt=""
                    className="mx-auto rounded-xl"
                />
            )
        } else if (item._type === 'Video') {
            return (
                <p>No video support yet!</p>
            )
        } else if (
            item._type === 'Document' &&
            (item.mime_type === 'image/gif' || item.mime_type === 'image/webp')
        ) {
            return (
                <Image
                    key={index}
                    src={item?.url || ''}
                    width={item.width || 1000}
                    height={item.height || 500}
                    alt=""
                    className="mx-auto rounded-xl"
                />
            )
        }
    })

    return <div className="mx-auto max-w-prose">{items}</div>
}
