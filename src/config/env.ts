import { z } from 'zod'

/**
 * Environment variable schema with validation
 */
const envSchema = z.object({
    // Prepr CMS Configuration
    PREPR_GRAPHQL_URL: z.string().url().optional(),
    PREPR_GRAPHQL_TOKEN: z.string().min(1).optional(),
    PREPR_ENV: z.enum(['preview', 'production']).optional(),

    // HubSpot Configuration
    HUBSPOT_PORTAL_ID: z.string().min(1, 'HubSpot Portal ID is required'),

    // Mailchimp Configuration (all optional)
    MAILCHAMP_API_KEY: z.string().optional(),
    MAILCHIMP_API_SERVER: z.string().optional(),
    MAILCHIMP_AUDIENCE_ID: z.string().optional(),
})

/**
 * Pass-through environment variables (not validated, accessed as-is)
 * These are accessed directly from process.env but typed for convenience
 */
const passthroughEnv = {
    NODE_ENV: process.env.NODE_ENV as 'development' | 'production' | 'test' | undefined,
    APP_ENV: process.env.APP_ENV as 'development' | 'staging' | 'production' | undefined,
}

/**
 * Validated and typed environment variables
 *
 * This function validates environment variables at runtime and provides
 * a typed interface for accessing them throughout the application.
 *
 * @throws {ZodError} If required environment variables are missing or invalid
 */
function getValidatedEnv() {
    const parsed = envSchema.safeParse(process.env)

    if (!parsed.success) {
        console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors)
        throw new Error('Invalid environment variables')
    }

    return { ...parsed.data, ...passthroughEnv }
}

/**
 * Validated environment configuration
 *
 * Use this object instead of accessing process.env directly to ensure
 * type safety and runtime validation.
 *
 * @example
 * ```ts
 * import { env } from '@/config/env'
 *
 * const portalId = env.HUBSPOT_PORTAL_ID
 * ```
 */
export const env = getValidatedEnv()

/**
 * Type-safe environment variables
 */
export type Env = z.infer<typeof envSchema>
