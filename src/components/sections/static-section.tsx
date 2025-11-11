import { STATIC_SECTIONS } from '@/constants/sections'
import { StaticComponent, StaticFragment } from '@/gql/graphql'
import { logger } from '@/lib/logger'

export default function StaticSection({ item }: { item: StaticFragment }) {
    const staticTypes = Object.values(StaticComponent)
    if (!staticTypes.includes(item.static_type as StaticComponent)) {
        logger.warn(`Unknown section type: ${item.static_type}`)
        return null
    }

    const SectionComponent =
        STATIC_SECTIONS[item.static_type as StaticComponent]

    if (!SectionComponent) {
        logger.warn(`Unknown section type: ${item.static_type}`)
        return null
    }

    return (
        <SectionComponent
            key={item._id}
            item={item}
        />
    )
}
