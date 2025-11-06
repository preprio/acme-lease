import { FaEnvelope, FaPhone } from 'react-icons/fa6'
import Container from '@/components/container'
import HubspotContactForm from '@/components/hubspot-form'
import { ContactFragment } from '@/gql/graphql'

export default function ContactSection({ item }: { item: ContactFragment }) {

    return (
        <section className="bg-primary-100" data-prepr-variant-key={item._context?.variant_key}>
            <Container className="py-10 lg:py-26">
                <div className="inline justify-between gap-16 space-y-8 md:flex md:space-y-0">
                    <div className="flex flex-col basis-6/12 flex-wrap space-y-10">
                        <div className="space-y-6">
                            <h2 className="text-mb-4xl lg:text-5xl text-secondary-700 font-medium text-balance">{item.heading}</h2>
                            <p className="text-mb-lg lg:text-lg font-medium text-secondary-700 opacity-70">{item.sub_heading}</p>
                        </div>

                        <div className="w-full space-y-6">
                            <div className="flex items-center gap-5">
                                <div
                                    className="flex h-[60px] w-[60px] flex-shrink-0 items-center justify-center rounded-full bg-white">
                                    <FaPhone className="text-2xl text-primary-600" />
                                </div>
                                <p className="text-mb-lg lg:text-lg font-medium text-secondary-700">{item.phone_number}</p>
                            </div>
                            <div className="flex items-center gap-5">
                                <div
                                    className="flex h-[60px] w-[60px] flex-shrink-0 items-center justify-center rounded-full bg-white">
                                    <FaEnvelope className="text-2xl text-primary-600" />
                                </div>
                                <p className="text-mb-lg lg:text-lg font-medium text-secondary-700">{item.email}</p>
                            </div>
                        </div>
                    </div>

                    <div
                        className="basis-1/2 justify-start space-y-8 self-start rounded-xl bg-white py-10 lg:py-20 px-0 lg:px-10" data-prepr-variant-event={'Click'}>
                        <h3 className="text-mb-3xl lg:text-4xl text-secondary-700 font-medium px-10">{item.form_title || 'Contact us'}</h3>
                        {item?.hubspot_form_id && (
                            <HubspotContactForm formId={item.hubspot_form_id} portalId={process.env.HUBSPOT_PORTAL_ID!} />
                        )}
                    </div>
                </div>
            </Container>
        </section>
    )
}