import Script from 'next/script'
import { env } from '@/config/env'

export default function HubspotTracking() {
    return (
        <Script
            strategy='beforeInteractive'
            type='text/javascript'
            id='hs-script-loader'
            src={`https://js.hs-scripts.com/${env.HUBSPOT_PORTAL_ID}.js`}
        />
    )
}
