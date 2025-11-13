'use client'

import { ErrorBoundary } from '@/components/error-boundary'

interface ErrorBoundaryWrapperProps {
    children: React.ReactNode
}

/**
 * Client-side wrapper for Error Boundary
 * Use this to wrap client components that might throw errors
 */
export default function ErrorBoundaryWrapper({
    children,
}: ErrorBoundaryWrapperProps) {
    return <ErrorBoundary>{children}</ErrorBoundary>
}

