import { cn } from '@/lib/utils'
import PaginationChevron from '@/components/elements/pagination-chevron'
import PaginationItem from '@/components/elements/pagination-item'

type PaginationProps = {
    currentPage: number
    totalPages: number
    className?: string
}

/**
 * Pagination component
 *
 * Displays pagination controls with previous/next chevrons and page number buttons.
 * Automatically hides when there's only one page.
 *
 * @param currentPage - Current active page number (1-indexed)
 * @param totalPages - Total number of pages
 * @param className - Optional additional CSS classes
 */
export default function Pagination({
    currentPage,
    totalPages,
    className,
}: PaginationProps) {
    // Don't render if only one page or no pages
    if (totalPages <= 1) {
        return null
    }

    return (
        <div className={cn('flex flex-wrap justify-center gap-8', className)}>
            <PaginationChevron
                direction='left'
                disabled={currentPage === 1}
            />
            <div className='flex items-center gap-3'>
                {Array.from({ length: totalPages }).map((_, index) => (
                    <PaginationItem
                        pageNumber={index + 1}
                        key={index}
                        className={cn(currentPage === index + 1 && 'active')}
                    />
                ))}
            </div>
            <PaginationChevron
                direction='right'
                disabled={currentPage === totalPages}
            />
        </div>
    )
}
