import Container from '@/components/container'
import Image from 'next/image'
import PreprButton from '@/components/elements/prepr-button'
import { FeatureFragment } from '@/gql/graphql'

export default function FeatureSection({ item }: { item: FeatureFragment }) {
    const image = (<div className="order-first md:order-none basis-1/2 ">
        <Image src={item.image?.url || ''} alt="Feature image" width={870} height={570} className='rounded-2xl w-full aspect-[29/19] object-cover'/>
    </div>)

    return (
        <section className="bg-primary-50" data-prepr-variant-key={item._context?.variant_key}>
            <Container className="py-10 lg:py-10 xl:py-20">
                <div
                    className="flex flex-col items-start md:items-center md:flex-row gap-8 xl:gap-28 text-secondary-700">
                    {item.image_position === 'LEFT' && image}
                    <div className="basis-1/2">
                        {item.heading &&
                            <h2 className="text-mb-4xl lg:text-5xl font-medium text-secondary-700 text-balance">{item.heading}</h2>}
                        {item.sub_heading &&
                            <p className="text-lg mt-4 xl:mt-6 font-medium text-wrap text-balance">{item.sub_heading}</p>}
                        {item.button && <PreprButton button={item.button} className="mt-8 xl:mt-10" />}
                    </div>
                    {item.image_position === 'RIGHT' && image}
                </div>
            </Container>
        </section>
    )
}