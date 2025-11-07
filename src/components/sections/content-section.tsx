import { ContentFragment, DcfFragment } from '@/gql/graphql'
import BlogContent from '../blog/blog-content'
import Container from '../container'

interface ContentSectionProps {
    item: ContentFragment
}

export default function ContentSection({ item }: ContentSectionProps) {    
 const content = item.main_content as DcfFragment[]
 if (!content) return null

 return (
  <section className='bg-primary-100'>
    <Container className='py-12'>
      <div className="prose prose-lg max-w-none">
        <BlogContent content={content} className='text-secondary-900' />
      </div>
    </Container>
  </section>
 )
}
