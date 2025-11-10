import Container from '@/components/container'
import { useTranslations } from 'next-intl'

export default function ExplanationSection({
    title,
    context,
}: {
    title?: string
    context?: string
}) {
    const t = useTranslations('StaticSections.explanation')

    return (
        <section>
            <Container
                className='py-10 lg:py-20'
                data-prepr-variant-key={context}
            >
                <div className='flex flex-col items-center justify-center gap-12 text-center'>
                    <div className='space-y-16'>
                        <h2 className='text-mb-4xl text-secondary-700 font-medium text-balance lg:text-5xl'>
                            {title || t('title')}
                        </h2>
                        <div className='flex flex-wrap items-center justify-center gap-8 gap-y-12 md:gap-14 lg:gap-20'>
                            <Step />
                            <Step />
                            <Step />
                        </div>
                    </div>
                    <div className='flex aspect-video w-full max-w-3xl items-center justify-center rounded-lg bg-blue-100'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-[64px] w-[64px] md:h-[72px] md:w-[72px] lg:h-[86px] lg:w-[86px]'
                            viewBox='0 0 86 86'
                            fill='none'
                        >
                            <circle
                                cx='43'
                                cy='43'
                                r='43'
                                fill='#2563EB'
                            />
                            <path
                                d='M56.5 40.4019C58.5 41.5566 58.5 44.4434 56.5 45.5981L38.5 55.9904C36.5 57.1451 34 55.7017 34 53.3923L34 32.6077C34 30.2983 36.5 28.8549 38.5 30.0096L56.5 40.4019Z'
                                fill='white'
                            />
                        </svg>
                    </div>
                </div>
            </Container>
        </section>
    )
}

function Step() {
    return (
        <div className='flex gap-4'>
            <svg
                xmlns='http://www.w3.org/2000/svg'
                width='80'
                height='80'
                viewBox='0 0 80 80'
                fill='none'
            >
                <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M40 80C62.0914 80 80 62.0914 80 40C80 17.9086 62.0914 0 40 0C17.9086 0 0 17.9086 0 40C0 62.0914 17.9086 80 40 80Z'
                    fill='#EFF6FF'
                />
                <path
                    d='M62.6499 55.9033H18.7727C17.8848 55.9033 17.4373 54.8323 18.0613 54.2005L25.9474 46.2165C27.1009 45.0488 28.9786 45.0247 30.1615 46.1626L32.8247 48.7244C34.1471 49.9963 36.2912 49.7939 37.3521 48.2969L45.8946 36.2433C47.0941 34.5508 49.6081 34.5573 50.7988 36.2559L63.4687 54.3293C63.9333 54.992 63.4592 55.9033 62.6499 55.9033Z'
                    fill='#DBEAFE'
                />
                <circle
                    cx='22.1625'
                    cy='30.8422'
                    r='5.78313'
                    fill='#DBEAFE'
                />
            </svg>
            <div>
                <div className='mb-6 h-4 w-24 rounded-xs bg-neutral-100'></div>
                <div className='space-y-2.5'>
                    <div className='h-3 w-44 rounded-xs bg-neutral-50'></div>
                    <div className='h-3 w-40 rounded-xs bg-neutral-50'></div>
                </div>
            </div>
        </div>
    )
}
