'use client'

import { Radio, RadioGroup } from '@headlessui/react'
import { useEffect, useState } from 'react'
import { redirect, usePathname, useRouter } from '@/i18n/routing'

const getCookie = (name: string) => {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop()?.split(';').shift()
}

type Locale = {
    name: string,
    code: string,
}

export default function LocaleSwitch() {
    const locales: Locale[] = [{
        name: 'en',
        code: 'en-US',
    }, {
        name: 'nl',
        code: 'nl-NL',
    }]
    const [selectedLocale, setSelectedLocale] = useState<Locale>(locales[0])

    const router = useRouter()

    useEffect(() => {
        const locale = getCookie('NEXT_LOCALE')
        const pathNameLocale = window.location.pathname.split('/')[1]

        if (locale) {
            setSelectedLocale(locales.find((l) => l.code === locale) || locales[0])
        } else if (pathNameLocale) {
            setSelectedLocale(locales.find((l) => l.code === pathNameLocale) || locales[0])
        } else {
            setSelectedLocale(locales[0])
        }
    }, [])

    const handleUpdateLocale = (locale: Locale) => {
        const foundLocale = locales.find((l) => l.code === locale.code)
        if (!foundLocale) return

        setSelectedLocale(foundLocale)
        document.cookie = `NEXT_LOCALE=${foundLocale.code}; path=/`

        router.replace('/', { locale: foundLocale.code })
        router.refresh()
    }

    return (
        <RadioGroup
            className="rounded-full p-1.5 flex flex-grow-0 bg-blue-200 select-none"
            value={selectedLocale.code}
            onChange={(code) => {
                const locale = locales.find((l) => l.code === code)
                handleUpdateLocale(locale || locales[0])
            }}
        >
            {locales.map((locale) => (
                <Radio
                    key={locale.code}
                    value={locale.code}
                    className="rounded-full px-3 py-2 text-sm font-medium text-secondary-600 leading-none
                        data-[checked]:text-secondary-700 data-[checked]:bg-white data-[checked]:hover:cursor-default hover:cursor-pointer
                    "
                >
                    {locale.name}
                </Radio>
            ))}
        </RadioGroup>
    )
}