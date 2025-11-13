/**
 * Loading component for Suspense fallbacks
 */
export default function Loading() {
    return (
        <div className='flex items-center justify-center p-8'>
            <div className='text-secondary-700 text-center'>
                <div className='mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]' />
                <p className='text-sm'>Loading...</p>
            </div>
        </div>
    )
}

