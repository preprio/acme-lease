import { SECTIONS } from '@/constants/sections'
import { SectionData } from '@/types/sections'
import { logger } from '@/lib/logger'

interface DynamicSectionProps {
    section: SectionData
}

function DynamicSection({ section }: DynamicSectionProps) {
    const typename = section.__typename

    if (!typename) {
        logger.warn(`Unknown section type: ${typename}`)
        return null
    }
    const Component = SECTIONS[typename]

    if (!Component) {
        logger.warn(`Unknown section type: ${typename}`)
        return null
    }

    return <Component item={section} />
}

export default function Sections({ sections }: { sections: SectionData[] }) {
    if (!sections?.length) return null

    return sections.map((section) => {
        return (
            <DynamicSection
                key={section._id}
                section={section}
            />
        )
    })
}
