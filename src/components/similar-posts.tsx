import { getApolloClient } from '@/apollo-client'
import {
    CardsFragment,
    Similar_PostsDocument,
    Similar_PostsQuery,
} from '@/gql/graphql'
import CardsSection from '@/components/sections/cards-section'

interface SimilarPostsProps {
    id: string
}

async function getSimilarPosts(id: string) {
    const client = await getApolloClient()

    const { data } = await client.query<Similar_PostsQuery>({
        query: Similar_PostsDocument,
        variables: {
            similarPostsId: id,
        },
    })

    return data?.Similar_Posts
}

export default async function SimilarPosts({ id }: SimilarPostsProps) {
    const posts = await getSimilarPosts(id)

    if (!posts?.items?.length) {
        return null
    }

    const item = {
        heading: 'Read more from our blog',
        variant: 'BLOG',
        cards: posts.items,
    } as CardsFragment

    return <CardsSection item={item} />
}
