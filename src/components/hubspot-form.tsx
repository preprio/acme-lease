'use client'
import { vercelStegaClean } from '@vercel/stega'
import { useHubspotScript } from '@/hooks/useHubspotScript'

type HubspotContactFormProps = {
    portalId: string
    formId: string
}

/**
 * HubspotContactForm component
 *
 * Renders a HubSpot contact form with automatic script management.
 * Uses the useHubspotScript hook to handle script loading and cleanup.
 */
const HubspotContactForm = ({ portalId, formId }: HubspotContactFormProps) => {
    const cleanPortalId = vercelStegaClean(portalId)
    const cleanFormId = vercelStegaClean(formId)

    // Use the custom hook for script management (must be called before any early returns)
    useHubspotScript({
        portalId: cleanPortalId || '',
        formId: cleanFormId || '',
        targetId: 'hs-form-wrapper',
    })

    if (!cleanFormId) {
        return <div>No form ID</div>
    }

    if (!cleanPortalId) {
        return <div>No portal ID</div>
    }

    return (
        <div>
            <div
                id='hs-form-wrapper'
                className='hs-form-frame'
                data-region='eu1'
            ></div>
        </div>
    )
}

export default HubspotContactForm
