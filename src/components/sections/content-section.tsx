import { ContentFragment } from '@/gql/graphql'
import BlogContent from '../blog/blog-content'
import Container from '../layout/container'

interface ContentSectionProps {
    item: ContentFragment
}

export default function ContentSection({ item }: ContentSectionProps) {
    if (!item.main_content?.length) return null

    return (
        <section className='bg-primary-100'>
            <Container className='py-12'>
                <div className='prose prose-lg max-w-none'>
                    <BlogContent
                        content={item.main_content}
                        className='text-secondary-900'
                    />
                </div>
            </Container>
        </section>
    )
}
