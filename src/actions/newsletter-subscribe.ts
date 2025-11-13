'use server'
import { z } from 'zod'
import { env } from '@/config/env'

const schema = z.object({
    email: z
        .string()
        .min(1, { message: 'Email is required' })
        .email({ message: 'Invalid email' }),
})

type FormState = {
    message: string
    errors: Record<string, string[] | undefined>
    status: 'UNSET' | 'SUCCESS' | 'ERROR'
    email: string | undefined | null
}

export default async function newsletterSubscribe(
    formState: FormState,
    formData: FormData
): Promise<FormState> {
    const validatedFields = schema.safeParse({
        email: formData.get('email'),
    })

    if (!validatedFields.success) {
        return {
            message: 'Invalid form data',
            errors: validatedFields.error.flatten().fieldErrors,
            status: 'ERROR',
            email: null,
        }
    }

    // Check if Mailchimp is configured
    if (
        !env.MAILCHIMP_API_KEY ||
        !env.MAILCHIMP_API_SERVER ||
        !env.MAILCHIMP_AUDIENCE_ID
    ) {
        return {
            message: 'Subscription failed',
            errors: { email: ['Newsletter subscription is not configured'] },
            status: 'ERROR',
            email: null,
        }
    }

    const customUrl = `https://${env.MAILCHIMP_API_SERVER}.api.mailchimp.com/3.0/lists/${env.MAILCHIMP_AUDIENCE_ID}/members`

    const response = await fetch(customUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${Buffer.from(`anystring:${env.MAILCHIMP_API_KEY}`).toString('base64')}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email_address: validatedFields.data.email,
            status: 'subscribed',
        }),
    })

    if (!response.ok) {
        return {
            message: 'Subscription failed',
            errors: { email: ['Subscription failed, please try again'] },
            status: 'ERROR',
            email: null,
        }
    }

    return {
        message: 'Subscription successful',
        errors: { email: [] },
        status: 'SUCCESS',
        email: validatedFields.data.email,
    }
}
