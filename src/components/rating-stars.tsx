import { FaStar } from 'react-icons/fa6'
import { cn } from '@/lib/utils'
import { Rating } from '@/gql/graphql'

type RatingStarsProps = {
    rating?: Rating | null
    className?: string
}

/**
 * Maps Rating enum to numeric value
 */
function ratingToNumber(rating?: Rating | null): number {
    switch (rating) {
        case 'ONE':
            return 1
        case 'TWO':
            return 2
        case 'THREE':
            return 3
        case 'FOUR':
            return 4
        case 'FIVE':
            return 5
        default:
            return 0
    }
}

/**
 * RatingStars component
 *
 * Displays a visual rating using star icons.
 * Filled stars represent the rating value, empty stars complete the 5-star scale.
 *
 * @param rating - Rating enum value (ONE, TWO, THREE, FOUR, FIVE)
 * @param className - Optional additional CSS classes
 */
export default function RatingStars({ rating, className }: RatingStarsProps) {
    const ratingValue = ratingToNumber(rating)
    const stars = Array.from({ length: 5 })

    return (
        <div className={cn('flex gap-1 text-2xl', className)}>
            {stars.map((_, index) => (
                <FaStar
                    key={index}
                    className={cn(
                        index + 1 <= ratingValue
                            ? 'text-primary-600'
                            : 'text-primary-200'
                    )}
                />
            ))}
        </div>
    )
}
