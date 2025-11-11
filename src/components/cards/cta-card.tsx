'use client'

import { cn } from '@/lib/utils'
import newsletterSubscribe from '@/actions/newsletter-subscribe'
import { Input } from '@headlessui/react'
import Button from '@/components/ui/button'
import React, { useActionState, useEffect } from 'react'
import { z } from 'zod'
import toast, { Toast } from 'react-hot-toast'
import { FaXmark } from 'react-icons/fa6'
import { useTranslations } from 'next-intl'
import { CtaFragment } from '@/gql/graphql'

export const emailSchema = z.object({
    email: z.string().email().min(3).max(255),
})

const INITIAL_STATE = {
    message: '',
    email: null,
    errors: {
        email: [],
    },
    status: 'UNSET' as const,
}

declare global {
    interface Window {
        prepr: (event: string, type: string, data: string | null | undefined) => void
    }
}

export default function CtaCard({
    item,
    color = 'white',
}: {
    item: CtaFragment
    color?: 'white' | 'primary'
}) {
    const [formState, action] = useActionState(
        newsletterSubscribe,
        INITIAL_STATE
    )

    const translation = useTranslations('CTA')

    useEffect(() => {
        if (formState.message) {
            if (formState.status === 'SUCCESS') {
                window.prepr('event', 'Email', formState.email)
                toast.custom((t: Toast) => (
                    <div className='flex w-full max-w-[420px] items-start justify-between rounded-2xl bg-white p-5'>
                        <div className='flex flex-wrap gap-4'>
                            <svg
                                width='30'
                                height='30'
                                viewBox='0 0 30 30'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <rect
                                    width='30'
                                    height='30'
                                    rx='6'
                                    fill='#2563EB'
                                />
                                <path
                                    d='M10.625 15.625L13.125 18.125L19.375 11.875'
                                    stroke='white'
                                    strokeWidth='2.5'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                />
                            </svg>
                            <div className='space-y-1'>
                                <p className='text-mb-2xl text-secondary-700 font-medium lg:text-2xl'>
                                    {translation('subscribe_success.title')}
                                </p>
                                <p className='mb-text-base lg:text-base'>
                                    {translation('subscribe_success.text')}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => toast.dismiss(t.id)}
                            className='cursor-pointer text-base'
                        >
                            <FaXmark className='text-secondary-300' />
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
                'flex flex-col items-center gap-4 rounded-3xl p-6 py-8 text-center lg:px-8 lg:py-10'
            )}
        >
            <h3 className='text-mb-3xl text-secondary-700 font-medium text-balance lg:text-4xl'>
                {item.heading}
            </h3>
            <p
                className={cn(
                    color === 'primary' && 'opacity-70',
                    'text-mb-lg text-secondary-500 font-medium text-balance lg:text-lg'
                )}
            >
                {item.sub_heading}
            </p>
            <form
                action={action}
                className='flex w-full flex-col items-center gap-4'
            >
                <div className='mx-auto flex w-full max-w-2xl flex-col text-start'>
                    <Input
                        name='email'
                        type='email'
                        placeholder='Email*'
                        className={cn(
                            color === 'white' ? 'bg-secondary-100' : 'bg-white',
                            'border-secondary-300 hover:border-primary-600 focus:border-primary-600 h-12 w-full max-w-2xl rounded-lg border px-4',
                            formState &&
                                formState.errors &&
                                formState.errors.email &&
                                formState.errors.email[0] &&
                                'border-red-600'
                        )}
                    />
                    {formState.errors.email && formState.errors.email[0] && (
                        <p className='mt-1 text-sm font-medium text-red-600'>
                            {formState.errors.email[0]}
                        </p>
                    )}
                </div>
                <Button
                    buttonStyle='primary'
                    className='normal-case'
                    type='submit'
                >
                    {translation('subscribe')}
                </Button>
            </form>
        </div>
    )
}
