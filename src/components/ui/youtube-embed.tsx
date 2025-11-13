import { logger } from '@/lib/logger'

type YoutubeEmbedProps = {
    url: string
}

/**
 * Extracts YouTube video ID from various URL formats
 *
 * Supports:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 *
 * @param url - YouTube video URL
 * @returns Video ID or null if invalid
 */
function extractYoutubeId(url: string): string | null {
    if (!url || typeof url !== 'string') {
        return null
    }

    try {
        // Handle youtube.com/watch?v= format
        if (url.includes('v=')) {
            const params = new URLSearchParams(url.split('?')[1])
            const videoId = params.get('v')
            return videoId && videoId.length > 0 ? videoId : null
        }

        // Handle youtu.be/ short format
        if (url.includes('youtu.be/')) {
            const parts = url.split('youtu.be/')
            if (parts.length < 2) return null

            const idPart = parts[1].split('?')[0].split('/')[0]
            return idPart && idPart.length > 0 ? idPart : null
        }

        // Handle youtube.com/embed/ format
        if (url.includes('/embed/')) {
            const parts = url.split('/embed/')
            if (parts.length < 2) return null

            const idPart = parts[1].split('?')[0].split('/')[0]
            return idPart && idPart.length > 0 ? idPart : null
        }

        return null
    } catch (error) {
        logger.error('Error parsing YouTube URL:', error)
        return null
    }
}

/**
 * YoutubeEmbed component
 *
 * Embeds a YouTube video player with responsive 16:9 aspect ratio.
 * Handles various YouTube URL formats and validates input.
 *
 * @param url - YouTube video URL
 */
export default function YoutubeEmbed({ url }: YoutubeEmbedProps) {
    const youtubeId = extractYoutubeId(url)

    if (!youtubeId) {
        logger.warn('Invalid YouTube URL provided:', url)
        return null
    }

    return (
        <iframe
            width='100%'
            height='100%'
            style={{ aspectRatio: '16/9' }}
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title='YouTube video player'
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            referrerPolicy='strict-origin-when-cross-origin'
            allowFullScreen
        ></iframe>
    )
}
