'use server'
import { z } from 'zod'

const schema = z.object({
    email: z
        .string()
        .min(1, { message: 'Email is required' })
        .email({ message: 'Invalid email' }),
})

type FormState = {
    message: string
    errors: Record<string, string[] | undefined>;
    status: 'UNSET' | 'SUCCESS' | 'ERROR';
    email: string | undefined | null;
}

export default async function newsletterSubscribe(formState: any, formData: FormData) {
    const validatedFields = schema.safeParse({
        email: formData.get('email'),
    })

    if (!validatedFields.success) {
        return {
            message: 'Invalid form data',
            errors: validatedFields.error.flatten().fieldErrors,
            status: 'ERROR',
        }
    }

    const MailchimpKey = process.env.MAILCHAMP_API_KEY
    const MailchimpServer = process.env.MAILCHIMP_API_SERVER
    const MailchimpAudience = process.env.MAILCHIMP_AUDIENCE_ID

    if (!MailchimpKey || !MailchimpServer || !MailchimpAudience) {
        return {
            message: 'Subscription failed',
            errors: { email: ['Something went wrong! Please try again!'] },
            status: 'ERROR',
        }
    }

    const customUrl = `https://${MailchimpServer}.api.mailchimp.com/3.0/lists/${MailchimpAudience}/members`

    const response = await fetch(customUrl, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${Buffer.from(`anystring:${MailchimpKey}`).toString('base64')}`,
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
        }
    }


    return { message: 'Subscription successful', errors: { email: []
        }, status: 'SUCCESS', email: validatedFields.data.email }
}