/**
 * Centralized logging utility
 * Logs are only output in development mode
 */

const isDev = process.env.NODE_ENV === 'development'

export const logger = {
    warn: (message: string, ...args: unknown[]): void => {
        if (isDev) {
            console.warn(`[WARN] ${message}`, ...args)
        }
    },
    error: (message: string, ...args: unknown[]): void => {
        if (isDev) {
            console.error(`[ERROR] ${message}`, ...args)
        }
        // In production, you might want to send to error tracking service
        // Example: Sentry.captureException(new Error(message))
    },
    info: (message: string, ...args: unknown[]): void => {
        if (isDev) {
            console.info(`[INFO] ${message}`, ...args)
        }
    },
    debug: (message: string, ...args: unknown[]): void => {
        if (isDev) {
            console.debug(`[DEBUG] ${message}`, ...args)
        }
    },
}
