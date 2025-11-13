'use client'

import { Component, type ReactNode, type ErrorInfo } from 'react'
import { logger } from '@/lib/logger'
import Button from '@/components/ui/button'
import { Link } from '@/i18n/routing'

interface ErrorBoundaryProps {
    children: ReactNode
    fallback?: ReactNode
    onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface ErrorBoundaryState {
    hasError: boolean
    error: Error | null
}

/**
 * Error Boundary Component
 *
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI instead of crashing.
 *
 * @example
 * ```tsx
 * <ErrorBoundary fallback={<CustomErrorUI />}>
 *   <YourComponent />
 * </ErrorBoundary>
 * ```
 */
export class ErrorBoundary extends Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = {
            hasError: false,
            error: null,
        }
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return {
            hasError: true,
            error,
        }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        logger.error('Error caught by ErrorBoundary:', {
            error: error.message,
            stack: error.stack,
            componentStack: errorInfo.componentStack,
        })

        // Call optional error handler
        this.props.onError?.(error, errorInfo)
    }

    render(): ReactNode {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback
            }

            return (
                <div className='bg-primary-50 flex min-h-screen w-full items-center justify-center p-4'>
                    <div className='text-secondary-700 flex max-w-md flex-col items-center gap-6 text-center'>
                        <h1 className='text-2xl font-bold'>Something went wrong</h1>
                        <p className='text-base'>
                            We encountered an unexpected error. Please try again
                            later.
                        </p>
                        {process.env.NODE_ENV === 'development' &&
                            this.state.error && (
                                <details className='w-full text-left'>
                                    <summary className='cursor-pointer text-sm font-medium'>
                                        Error details
                                    </summary>
                                    <pre className='mt-2 overflow-auto rounded bg-gray-100 p-2 text-xs'>
                                        {this.state.error.toString()}
                                        {this.state.error.stack && (
                                            <>
                                                {'\n\n'}
                                                {this.state.error.stack}
                                            </>
                                        )}
                                    </pre>
                                </details>
                            )}
                        <Link href='/'>
                            <Button buttonStyle='primary'>Go back home</Button>
                        </Link>
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}

