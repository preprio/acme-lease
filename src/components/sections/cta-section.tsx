import Container from '@/components/container'
import CtaCard from '@/components/cta-card'
import { CtaFragment } from '@/gql/graphql'
export default function CtaSection({ item }: { item: CtaFragment }) {
    return (
        <section
            className='bg-primary-50'
            data-prepr-variant-key={item._context?.variant_key}
        >
            <Container className='py-10 lg:py-20'>
                <CtaCard item={item} />
            </Container>
        </section>
    )
}
