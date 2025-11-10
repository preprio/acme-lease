import { FaEnvelope, FaPhone } from 'react-icons/fa6'
import Container from '@/components/container'
import HubspotContactForm from '@/components/hubspot-form'
import { ContactFragment } from '@/gql/graphql'

export default function ContactSection({ item }: { item: ContactFragment }) {
    return (
        <section
            className='bg-primary-100'
            data-prepr-variant-key={item._context?.variant_key}
        >
            <Container className='py-10 lg:py-26'>
                <div className='inline justify-between gap-16 space-y-8 md:flex md:space-y-0'>
                    <div className='flex basis-6/12 flex-col flex-wrap space-y-10'>
                        <div className='space-y-6'>
                            <h2 className='text-mb-4xl text-secondary-700 font-medium text-balance lg:text-5xl'>
                                {item.heading}
                            </h2>
                            <p className='text-mb-lg text-secondary-700 font-medium opacity-70 lg:text-lg'>
                                {item.sub_heading}
                            </p>
                        </div>

                        <div className='w-full space-y-6'>
                            <div className='flex items-center gap-5'>
                                <div className='flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full bg-white'>
                                    <FaPhone className='text-primary-600 text-2xl' />
                                </div>
                                <p className='text-mb-lg text-secondary-700 font-medium lg:text-lg'>
                                    {item.phone_number}
                                </p>
                            </div>
                            <div className='flex items-center gap-5'>
                                <div className='flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full bg-white'>
                                    <FaEnvelope className='text-primary-600 text-2xl' />
                                </div>
                                <p className='text-mb-lg text-secondary-700 font-medium lg:text-lg'>
                                    {item.email}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div
                        className='basis-1/2 justify-start space-y-8 self-start rounded-xl bg-white px-0 py-10 lg:px-10 lg:py-20'
                        data-prepr-variant-event={'Click'}
                    >
                        <h3 className='text-mb-3xl text-secondary-700 px-10 font-medium lg:text-4xl'>
                            {item.form_title || 'Contact us'}
                        </h3>
                        {item?.hubspot_form_id && (
                            <HubspotContactForm
                                formId={item.hubspot_form_id}
                                portalId={process.env.HUBSPOT_PORTAL_ID!}
                            />
                        )}
                    </div>
                </div>
            </Container>
        </section>
    )
}
