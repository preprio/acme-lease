/**
 * Error Handling Utilities
 *
 * Provides consistent error handling patterns across the application.
 */

/**
 * Custom error class for application-specific errors
 */
export class AppError extends Error {
    constructor(
        message: string,
        public code: string,
        public statusCode: number = 500
    ) {
        super(message)
        this.name = 'AppError'
    }
}

/**
 * Error codes for common error scenarios
 */
export const ErrorCodes = {
    GRAPHQL_ERROR: 'GRAPHQL_ERROR',
} as const

/**
 * Creates a GraphQL error
 */
export function createGraphQLError(message: string): AppError {
    return new AppError(
        message,
        ErrorCodes.GRAPHQL_ERROR,
        500
    )
}
/**
 * Safely extracts error message from unknown error
 */
export function getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
        return error.message
    }
    if (typeof error === 'string') {
        return error
    }
    return 'An unknown error occurred'
}
