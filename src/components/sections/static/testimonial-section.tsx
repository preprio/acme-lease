import Container from '@/components/layout/container'
import TestimonialCard from '@/components/cards/testimonial-card'
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards'

export default function TestimonialSection({
    title,
    context,
}: {
    title?: string
    context?: string
}) {
    return (
        <section
            className='bg-primary-100'
            data-prepr-variant-key={context}
        >
            <Container className='space-y-10 py-10 text-center lg:space-y-14 lg:py-20'>
                <div className='flex flex-col items-center justify-center gap-8'>
                    <h2 className='text-mb-4xl text-secondary-700 font-medium text-balance lg:text-5xl'>
                        {title || 'Testimonials about Acme'}
                    </h2>
                    <div className='flex w-full flex-col items-center space-y-2.5'>
                        <div className='h-3 w-full max-w-136 rounded-xs bg-white'></div>
                        <div className='h-3 w-full max-w-96 rounded-xs bg-white'></div>
                        <div className='h-3 w-full max-w-80 rounded-xs bg-white'></div>
                    </div>
                </div>
                <div className='flex gap-8'>
                    <InfiniteMovingCards
                        items={[
                            <TestimonialCard key={1} />,
                            <TestimonialCard key={2} />,
                            <TestimonialCard key={3} />,
                            <TestimonialCard key={4} />,
                        ]}
                        speed='slow'
                    />
                </div>
            </Container>
        </section>
    )
}
