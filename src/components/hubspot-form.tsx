'use client'
import { vercelStegaClean } from '@vercel/stega'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

const HubspotContactForm = (props: { portalId: string; formId: string }) => {
    const portalId = vercelStegaClean(props.portalId)
    const formId = vercelStegaClean(props.formId)
    const pathName = usePathname()
    const [hubspotLoaded, setHubspotLoaded] = useState(false)

    if (!formId) {
        return <div>No form ID</div>
    }

    if (!portalId) {
        return <div>No portal ID</div>
    }

    useEffect(() => {
        const formWrapper = document.getElementById('hs-form-wrapper')
        if (formWrapper) {
            formWrapper.innerHTML = '' // Clear any existing children
        }

        const existingScript = document.getElementById('hs-script-loader')
        if (existingScript) {
            existingScript.remove()
        }

        const script = document.createElement('script')
        script.src = `https://js.hsforms.net/forms/v2.js`
        script.id = 'hs-script-loader'

        script.onload = () => {
            // @ts-ignore
            if (window.hbspt && !hubspotLoaded) {
                setTimeout(async () => {
                    setHubspotLoaded(true)
                    // @ts-ignore
                    window.hbspt.forms.create({
                        portalId,
                        formId,
                        target: '#hs-form-wrapper',
                    })
                }, 100)
            }
        }

        document.body.appendChild(script)

        return () => {
            if (formWrapper) {
                formWrapper.innerHTML = '' // Cleanup on unmount
            }
        }
    }, [pathName])

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
