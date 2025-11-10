import Script from 'next/script'

export default function HubspotTracking() {
    return (
        <Script
            strategy='beforeInteractive'
            type='text/javascript'
            id='hs-script-loader'
            src={`https://js.hs-scripts.com/${process.env.HUBSPOT_PORTAL_ID}.js`}
        />
    )
}
