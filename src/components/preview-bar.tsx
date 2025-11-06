import { PreprToolbar } from '@preprio/prepr-nextjs/react'
import { cookies } from 'next/headers'

export default async function PreviewBar() {
    if (!process.env.PREPR_GRAPHQL_URL) {
        return null
    }

    const cookieStore = await cookies()
    const showPreviewbar = cookieStore.get('show-previewbar')?.value

    // Only show if we're in preview mode and the toggle is not set to false
    if (process.env.PREPR_ENV !== 'preview' || showPreviewbar === 'false') {
        return null
    }

    return <PreprToolbar />
}