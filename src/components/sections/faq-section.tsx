import Container from '@/components/container'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { FaChevronUp } from 'react-icons/fa6'
import { FaqFragment } from '@/gql/graphql'

export default function FaqSection({ item }: { item: FaqFragment }) {
    return (
        <section className="bg-primary-100" data-prepr-variant-key={item._context?.variant_key}>
            <Container className="py-10 lg:py-20 flex flex-col items-center">
                <div className="max-w-[810px] space-y-8 lg:space-y-12">
                    <h2 className="text-mb-4xl lg:text-5xl text-secondary-700 font-medium text-center text-balance">
                        {item.title}
                    </h2>
                    <div className="space-y-4">
                        {item.questions.map((faq, index) => (
                            <FAQItem key={index} question={faq.question!} answer={faq.answer!} />
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    )
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
    return (
        <Disclosure>
            <div className="w-full bg-white rounded-lg p-6 space-y-6">
                <DisclosureButton
                    className="group text-mb-2xl lg:text-2xl font-medium text-secondary-700 flex text-left items-center gap-2 justify-between w-full">
                    {question}
                    <div className="rounded-full bg-secondary-100 w-9 h-9 items-center justify-center flex">
                        <FaChevronUp className="w-3 group-data-[open]:rotate-180 justify-self-end text-balance" />
                    </div>
                </DisclosureButton>
                <DisclosurePanel><p className="text-mb-base lg:text-base text-secondary-700 text-balance">{answer}</p>
                </DisclosurePanel>
            </div>
        </Disclosure>
    )
}