import { FaClock } from 'react-icons/fa6'
import { useTranslations } from 'next-intl'

interface ReadTimeProps {
    time?: number
    long?: boolean
}

export default function ReadTime({ time = 0, long = false }: ReadTimeProps) {
    const t = useTranslations('Blog')
    return (
        <div className='text-mb-base flex items-center gap-2 lg:text-base'>
            <FaClock className='text-secondary-400 text-sm' />
            {long ? t('read_time') + ': ' : ''}
            <span className='text-secondary-700'>{time} min</span>
        </div>
    )
}
