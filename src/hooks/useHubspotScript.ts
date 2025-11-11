import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { ANIMATION_DELAYS } from '@/constants/timing'

type UseHubspotScriptOptions = {
    portalId: string
    formId: string
    targetId: string
}

/**
 * useHubspotScript hook
 *
 * Manages HubSpot form script loading, initialization, and cleanup.
 * Handles script injection, form creation, and proper cleanup on unmount or path changes.
 *
 * @param options - Configuration options for the HubSpot form
 * @returns Object containing loading state
 */
export function useHubspotScript({
    portalId,
    formId,
    targetId,
}: UseHubspotScriptOptions) {
    const pathName = usePathname()
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        // Clear any existing form content
        const formWrapper = document.getElementById(targetId)
        if (formWrapper) {
            formWrapper.innerHTML = ''
        }

        // Remove any existing script
        const existingScript = document.getElementById('hs-script-loader')
        if (existingScript) {
            existingScript.remove()
        }

        // Create and configure new script
        const script = document.createElement('script')
        script.src = 'https://js.hsforms.net/forms/v2.js'
        script.id = 'hs-script-loader'

        // Initialize form when script loads
        script.onload = () => {
            const hbspt = window.hbspt
            if (hbspt && !isLoaded) {
                setTimeout(() => {
                    setIsLoaded(true)
                    hbspt.forms.create({
                        portalId,
                        formId,
                        target: `#${targetId}`,
                    })
                }, ANIMATION_DELAYS.HUBSPOT_FORM_INIT)
            }
        }

        document.body.appendChild(script)

        // Cleanup function
        return () => {
            // Clear form content
            const wrapper = document.getElementById(targetId)
            if (wrapper) {
                wrapper.innerHTML = ''
            }

            // Remove script
            const scriptToRemove = document.getElementById('hs-script-loader')
            if (scriptToRemove) {
                scriptToRemove.remove()
            }
        }
    }, [pathName, portalId, formId, targetId, isLoaded])

    return { isLoaded }
}

/**
 * Global type declaration for HubSpot
 */
declare global {
    interface Window {
        hbspt?: {
            forms: {
                create: (options: {
                    portalId: string
                    formId: string
                    target: string
                }) => void
            }
        }
    }
}
