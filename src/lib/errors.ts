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
    NOT_FOUND: 'NOT_FOUND',
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    GRAPHQL_ERROR: 'GRAPHQL_ERROR',
    NETWORK_ERROR: 'NETWORK_ERROR',
    CONFIGURATION_ERROR: 'CONFIGURATION_ERROR',
    UNAUTHORIZED: 'UNAUTHORIZED',
} as const

/**
 * Creates a not found error
 */
export function createNotFoundError(resource: string): AppError {
    return new AppError(
        `${resource} not found`,
        ErrorCodes.NOT_FOUND,
        404
    )
}

/**
 * Creates a validation error
 */
export function createValidationError(message: string): AppError {
    return new AppError(
        message,
        ErrorCodes.VALIDATION_ERROR,
        400
    )
}

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
 * Checks if an error is an AppError
 */
export function isAppError(error: unknown): error is AppError {
    return error instanceof AppError
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
