import { useEffect, useRef, useCallback } from 'react'

/**
 * useDebounce hook
 *
 * Creates a debounced version of a callback function that delays invoking
 * until after the specified delay has elapsed since the last time it was invoked.
 *
 * @param callback - The function to debounce
 * @param delay - The delay in milliseconds
 * @returns Debounced version of the callback
 *
 * @example
 * ```tsx
 * const debouncedResize = useDebounce(() => {
 *   console.log('Window resized')
 * }, 300)
 *
 * useEffect(() => {
 *   window.addEventListener('resize', debouncedResize)
 *   return () => window.removeEventListener('resize', debouncedResize)
 * }, [debouncedResize])
 * ```
 */
export function useDebounce<T extends (...args: unknown[]) => void>(
    callback: T,
    delay: number
): (...args: Parameters<T>) => void {
    const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)
    const callbackRef = useRef(callback)

    // Update callback ref when callback changes
    useEffect(() => {
        callbackRef.current = callback
    }, [callback])

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [])

    return useCallback(
        (...args: Parameters<T>) => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }

            timeoutRef.current = setTimeout(() => {
                callbackRef.current(...args)
            }, delay)
        },
        [delay]
    )
}
