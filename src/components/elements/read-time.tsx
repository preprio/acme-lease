import { FaClock } from 'react-icons/fa6'
import { useTranslations } from 'next-intl'

interface ReadTimeProps {
    time?: number
    long?: boolean
}

export default function ReadTime({ time = 0, long = false }: ReadTimeProps) {
    const t = useTranslations('Blog')
    return (
        <div className="flex gap-2 text-mb-base lg:text-base items-center">
            <FaClock className="text-secondary-400 text-sm" />
            {long ? t('read_time') + ': ' : ''}
            <span className="text-secondary-700">{time} min</span>
        </div>
    )
}