'use client'

import React from 'react'
import { usePathname, useRouter } from '@/i18n/routing'

export default function ClearToken() {
    const router = useRouter()
    const pathname = usePathname()

    const handleClear = async () => {
        await fetch('/clear-token', { cache: 'no-store' })
        router.replace(pathname)
        router.refresh()
    }

    return (
        <button onClick={handleClear} className='rounded-md px-4 py-1 text-xs text-white bg-primary-600 hover:bg-primary-700'>Clear token</button>

    )
}
