/**
 * BlogAssets component renders various types of media assets (images, videos, documents)
 * in blog content with proper accessibility and error handling.
 */
import { Asset, Assets, Maybe } from '@/gql/graphql'
import Image from 'next/image'
import { logger } from '@/lib/logger'
import { ASSET_TYPES, IMAGE_MIME_TYPES } from './constants'

interface BlogAssetsProps {
    assets: Assets
}

/**
 * Generates accessible alt text from asset caption or provides meaningful fallback
 */
function getAltText(asset: Asset, index: number): string {
    if (asset.caption) {
        return asset.caption
    }

    // Provide descriptive fallback based on asset type
    if (asset._type === ASSET_TYPES.PHOTO) {
        return `Blog image ${index + 1}`
    }

    return `Blog media ${index + 1}`
}

/**
 * Checks if the asset is an image type (including documents with image mime types)
 */
function isImageAsset(asset: Asset): boolean {
    if (asset._type === ASSET_TYPES.PHOTO) {
        return true
    }

    if (asset._type === ASSET_TYPES.DOCUMENT && asset.mime_type) {
        return IMAGE_MIME_TYPES.includes(asset.mime_type as any)
    }

    return false
}

export default function BlogAssets({ assets }: BlogAssetsProps) {
    if (!assets?.items?.length) {
        return null
    }

    const items = assets.items.map((asset: Maybe<Asset>, index: number) => {
        if (!asset) {
            logger.warn('BlogAssets: Encountered null asset in items array')
            return null
        }

        // Use asset._id as key if available, fallback to index
        const key = asset._id || `asset-${index}`

        // Handle image assets (Photo or Document with image mime type)
        if (isImageAsset(asset)) {
            if (!asset.url) {
                logger.error('BlogAssets: Image asset missing URL', { asset })
                return null
            }

            return (
                <Image
                    key={key}
                    src={asset.url}
                    width={asset.width || 1000}
                    height={asset.height || 500}
                    alt={getAltText(asset, index)}
                    className='mx-auto rounded-xl'
                />
            )
        }

        // Handle video assets
        if (asset._type === ASSET_TYPES.VIDEO) {
            if (!asset.playback_id) {
                logger.warn('BlogAssets: Video asset missing playback_id', { asset })
                return null
            }

            return (
                <div
                    key={key}
                    className='mx-auto max-w-prose'
                >
                    <video
                        src={`https://stream.mux.com/${asset.playback_id}.m3u8`}
                        controls
                        className='w-full rounded-xl'
                        aria-label={getAltText(asset, index)}
                    >
                        Your browser does not support the video tag.
                    </video>
                </div>
            )
        }

        // Log unknown asset types for debugging
        logger.warn('BlogAssets: Unsupported asset type', {
            type: asset._type,
            mimeType: asset.mime_type,
        })
        return null
    })

    return <div className='mx-auto max-w-prose'>{items}</div>
}
