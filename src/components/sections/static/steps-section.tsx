import { Fa1, Fa2, Fa3 } from 'react-icons/fa6'
import Container from '@/components/container'
import Button from '@/components/elements/button'
import { useTranslations } from 'next-intl'

export default function StepsSection({ title, context }: { title?: string, context?: string }) {
    const t = useTranslations('StaticSections.steps')

    return (
        <section>
            <Container className="py-10 lg:py-20" data-prepr-variant-key={context}>
                <div className="space-y-8">
                    <h2 className="text-mb-4xl lg:text-5xl text-secondary-700 font-medium text-balance">{title || t('title')}</h2>
                    <div className="flex flex-wrap justify-between gap-8 gap-y-16">
                        <div className="w-full max-w-[468px] space-y-8">
                            <div className="w-full flex-grow space-y-2.5">
                                <div className="h-3 w-full max-w-[468px] rounded-sm bg-neutral-100"></div>
                                <div className="h-3 w-full max-w-[396px] rounded-sm bg-neutral-100"></div>
                                <div className="h-3 w-full max-w-[432px] rounded-sm bg-neutral-100"></div>
                            </div>
                            <Button buttonStyle={'primary'} className="uppercase">
                                {t('button')}
                            </Button>
                        </div>
                        <div>
                            <ul>
                                <li className="w-full max-w-[600px]">
                                    <div className="relative pb-[65px]">
                                    <span
                                        className="absolute left-7 top-4 -ml-px h-full w-0.5 bg-blue-50"
                                        aria-hidden="true"></span>
                                        <div className="relative flex w-full gap-8">
                                            <div
                                                className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-blue-50">
                                                <Fa1 className="text-lg text-blue-100" />
                                            </div>
                                            <div className="w-full min-w-0 max-w-72 flex-col space-y-6 pt-6">
                                                <div className="h-4 w-full max-w-40 rounded-sm bg-neutral-100"></div>

                                                <div className="w-52 space-y-2.5 md:w-60 lg:w-72">
                                                    <div className="h-3 w-full max-w-72 rounded-sm bg-neutral-50"></div>
                                                    <div className="h-3 w-full max-w-64 rounded-sm bg-neutral-50"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="w-full max-w-[600px]">
                                    <div className="relative pb-[65px]">
                                    <span
                                        className="absolute left-7 top-4 -ml-px h-full w-0.5 bg-blue-50"
                                        aria-hidden="true"></span>
                                        <div className="relative flex w-full gap-8">
                                            <div
                                                className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-blue-50">
                                                <Fa2 className="text-lg text-blue-100" />
                                            </div>
                                            <div className="w-full min-w-0 max-w-72 flex-col space-y-6 pt-6">
                                                <div className="h-4 w-full max-w-40 rounded-sm bg-neutral-100"></div>

                                                <div className="w-52 space-y-2.5 md:w-60 lg:w-72">
                                                    <div className="h-3 w-full max-w-72 rounded-sm bg-neutral-50"></div>
                                                    <div className="h-3 w-full max-w-64 rounded-sm bg-neutral-50"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="w-full max-w-[600px]">
                                    <div className="relative pb-[65px]">
                                        <div className="relative flex w-full gap-8">
                                            <div
                                                className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-blue-50">
                                                <Fa3 className="text-lg text-blue-100" />
                                            </div>
                                            <div className="w-full min-w-0 max-w-72 flex-col space-y-6 pt-6">
                                                <div className="h-4 w-full max-w-40 rounded-sm bg-neutral-100"></div>

                                                <div className="w-52 space-y-2.5 md:w-60 lg:w-72">
                                                    <div className="h-3 w-full max-w-72 rounded-sm bg-neutral-50"></div>
                                                    <div className="h-3 w-full max-w-64 rounded-sm bg-neutral-50"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}
