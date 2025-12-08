/**
 * Blog component constants for asset types and mime types
 */

export const ASSET_TYPES = {
    PHOTO: 'Photo',
    VIDEO: 'Video',
    DOCUMENT: 'Document',
} as const

export const MIME_TYPES = {
    IMAGE_GIF: 'image/gif',
    IMAGE_WEBP: 'image/webp',
    IMAGE_JPEG: 'image/jpeg',
    IMAGE_PNG: 'image/png',
} as const

export const IMAGE_MIME_TYPES = [
    MIME_TYPES.IMAGE_GIF,
    MIME_TYPES.IMAGE_WEBP,
    MIME_TYPES.IMAGE_JPEG,
    MIME_TYPES.IMAGE_PNG,
] as const
