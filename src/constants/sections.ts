import dynamic from 'next/dynamic'
import { ComponentType } from 'react'

import { SectionTypename } from '@/types/sections'
import { StaticComponent } from '@/gql/graphql'

// Using any here is acceptable for dynamic component props
// since each section has its own specific fragment type
export const SECTIONS: Record<
    SectionTypename | string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ComponentType<any>
> = {
    Feature: dynamic(() => import('@/components/sections/feature-section')),
    CTA: dynamic(() => import('@/components/sections/cta-section')),
    Hero: dynamic(() => import('@/components/sections/hero-section')),
    FAQ: dynamic(() => import('@/components/sections/faq-section')),
    Cards: dynamic(() => import('@/components/sections/cards-section')),
    Contact: dynamic(() => import('@/components/sections/contact-section')),
    Content: dynamic(() => import('@/components/sections/content-section')),
    Static: dynamic(() => import('@/components/sections/static-section')),
}

export const STATIC_SECTIONS: Record<
    StaticComponent | string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ComponentType<any>
> = {
    TESTIMONIALS: dynamic(
        () => import('@/components/sections/static/testimonial-section')
    ),
    STEPS: dynamic(() => import('@/components/sections/static/steps-section')),
    EXPLANATION: dynamic(
        () => import('@/components/sections/static/explanation-section')
    ),
    BENEFITS: dynamic(
        () => import('@/components/sections/static/benefit-section')
    ),
}
