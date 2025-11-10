import Container from '@/components/container'
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from '@headlessui/react'
import { FaChevronUp } from 'react-icons/fa6'
import { FaqFragment } from '@/gql/graphql'

export default function FaqSection({ item }: { item: FaqFragment }) {
    return (
        <section
            className='bg-primary-100'
            data-prepr-variant-key={item._context?.variant_key}
        >
            <Container className='flex flex-col items-center py-10 lg:py-20'>
                <div className='max-w-[810px] space-y-8 lg:space-y-12'>
                    <h2 className='text-mb-4xl text-secondary-700 text-center font-medium text-balance lg:text-5xl'>
                        {item.title}
                    </h2>
                    <div className='space-y-4'>
                        {item.questions.map((faq, index) => (
                            <FAQItem
                                key={index}
                                question={faq.question!}
                                answer={faq.answer!}
                            />
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    )
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
    return (
        <Disclosure>
            <div className='w-full space-y-6 rounded-lg bg-white p-6'>
                <DisclosureButton className='group text-mb-2xl text-secondary-700 flex w-full items-center justify-between gap-2 text-left font-medium lg:text-2xl'>
                    {question}
                    <div className='bg-secondary-100 flex h-9 w-9 items-center justify-center rounded-full'>
                        <FaChevronUp className='w-3 justify-self-end text-balance group-data-open:rotate-180' />
                    </div>
                </DisclosureButton>
                <DisclosurePanel>
                    <p className='text-mb-base text-secondary-700 text-balance lg:text-base'>
                        {answer}
                    </p>
                </DisclosurePanel>
            </div>
        </Disclosure>
    )
}
