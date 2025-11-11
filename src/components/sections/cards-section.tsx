import { CardsFragment } from '@/gql/graphql'
import CardsSectionDefault from './cards-section-default'
import CardsSectionBlog from './cards-section-blog'

/**
 * CardsSection component
 *
 * Router component that delegates to variant-specific implementations.
 * Supports DEFAULT (products) and BLOG (posts) variants.
 */
export default function CardsSection({ item }: { item: CardsFragment }) {
    if (item.variant === 'BLOG') {
        return <CardsSectionBlog item={item} />
    }

    // Default variant
    return <CardsSectionDefault item={item} />
}
