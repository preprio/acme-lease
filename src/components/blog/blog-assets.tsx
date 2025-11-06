import { Asset, Assets, Maybe } from '@/gql/graphql'
import Image from 'next/image'

export default function BlogAssets({ assets }: { assets: Assets }) {

    if (!assets || !assets.items) return null
    
    const items = assets.items.map((asset: Maybe<Asset>, index: number) => {
        if (!asset) return null

        if (asset._type === 'Photo') {
            return (
                <Image
                    key={index}
                    src={asset?.url || ''}
                    width={asset.width || 1000}
                    height={asset.height || 500}
                    alt=""
                    className="mx-auto rounded-xl"
                />
            )
        } else if (asset._type === 'Video') {
            return (
                <p>No video support yet!</p>
            )
        } else if (
            asset._type === 'Document' &&
            (asset.mime_type === 'image/gif' || asset.mime_type === 'image/webp')
        ) {
            return (
                <Image
                    key={index}
                    src={asset?.url || ''}
                    width={asset.width || 1000}
                    height={asset.height || 500}
                    alt=""
                    className="mx-auto rounded-xl"
                />
            )
        }
    })

    return <div className="mx-auto max-w-prose">{items}</div>
}
