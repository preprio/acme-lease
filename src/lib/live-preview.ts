import { normalizeQuery } from '@preprio/toolkit/nextjs'
import { env } from '@/config/env'

/**
 * Live preview is on for preview deployments only, the same flag the Prepr
 * middleware gets in `src/proxy.ts`. When the visitor hides the preview bar,
 * the middleware runs without preview and the toolkit ignores live changes.
 */
export const livePreviewEnabled = env.PREPR_ENV === 'preview'

/**
 * Applies the Prepr editor's unsaved changes to a query result, so the page
 * updates while an editor types. Pass the full `data` of the query, not a
 * field of it. Returns the result unchanged outside preview.
 */
export function withLivePreview<T>(
    query: Parameters<typeof normalizeQuery>[0],
    data: T
): Promise<T> {
    return normalizeQuery(query, data, { enabled: livePreviewEnabled })
}
