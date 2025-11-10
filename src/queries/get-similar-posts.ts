import { graphql } from '@/gql'

export const GET_SIMILAR_POSTS = graphql(`
    query Similar_Posts($similarPostsId: String!) {
        Similar_Posts(id: $similarPostsId, limit: 3) {
            items {
                ...PostCard
            }
        }
    }
`)
