interface HubspotForms {
    create: (options: {
        portalId: string
        formId: string
        target: string
    }) => void
}

interface Hubspot {
    forms: HubspotForms
}

declare global {
    interface Window {
        hbspt?: Hubspot
    }
}

export {}

