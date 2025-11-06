'use client'

import { cn } from '@/lib/utils'
import newsletterSubscribe from '@/actions/newsletter-subscribe'
import { Input } from '@headlessui/react'
import Button from '@/components/elements/button'
import React, { useActionState, useEffect } from 'react'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { FaXmark } from 'react-icons/fa6'
import { useTranslations } from 'next-intl'
import { CtaFragment } from '@/gql/graphql'

export const emailSchema = z.object({
    email: z.string().email().min(3).max(255),
})

const INITIAL_STATE = {
    message: '',
    email: '',
    errors: {
        email: [],
    },
    status: 'UNSET',
}

declare global {
    interface Window {
        prepr: any
    }
}

export default function CtaCard({ item, color = 'white' }: { item: CtaFragment, color?: 'white' | 'primary' }) {
    const [formState, action] = useActionState(newsletterSubscribe, INITIAL_STATE)

    const translation = useTranslations('CTA')

    useEffect(() => {
        if (formState.message) {
            if (formState.status === 'SUCCESS') {
                window.prepr('event', 'Email', formState.email);
                toast.custom((t: any) => (
                    <div className="rounded-2xl p-5 flex items-start justify-between max-w-[420px] w-full bg-white">
                        <div className="flex gap-4 flex-wrap">
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <rect width="30" height="30" rx="6" fill="#2563EB" />
                                <path d="M10.625 15.625L13.125 18.125L19.375 11.875" stroke="white" strokeWidth="2.5"
                                      strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <div className="space-y-1">
                                <p className="text-mb-2xl lg:text-2xl font-medium text-secondary-700">{translation('subscribe_success.title')}</p>
                                <p className="mb-text-base lg:text-base">{translation('subscribe_success.text')}</p>
                            </div>
                        </div>
                        <button onClick={() => toast.dismiss(t.id)} className="cursor-pointer text-base">
                            <FaXmark className="text-secondary-300" />
                        </button>
                    </div>
                ))
            }
        }
    }, [formState?.status, formState?.message])

    return (
        <div
            className={cn(
                color === 'white' ? 'bg-white' : 'bg-primary-50',
                'rounded-3xl py-8 lg:py-10 p-6 lg:px-8 flex flex-col gap-4 items-center text-center')}>
            <h3 className="text-mb-3xl lg:text-4xl text-secondary-700 font-medium text-balance">{item.heading}</h3>
            <p className={cn(
                color === 'primary' && 'opacity-70',
                'text-mb-lg lg:text-lg text-secondary-500 font-medium text-balance')}>{item.sub_heading}</p>
            <form action={action} className="flex flex-col gap-4 w-full items-center">
                <div className="text-start flex flex-col w-full max-w-2xl mx-auto">
                    <Input name="email" type="email" placeholder="Email*"
                           className={cn(
                               color === 'white' ? 'bg-secondary-100' : 'bg-white',
                               'px-4 w-full max-w-2xl border border-secondary-300 rounded-lg h-12 hover:border-primary-600 focus:border-primary-600',
                               formState && formState.errors && formState.errors.email && formState.errors.email[0] && 'border-red-600',
                           )} />
                    {formState.errors.email && formState.errors.email[0] &&
                        <p className="mt-1 text-red-600 text-sm font-medium">{formState.errors.email[0]}</p>}
                </div>
                <Button buttonStyle="primary" className="normal-case" type="submit">{translation('subscribe')}</Button>
            </form>
        </div>
    )
}