import { graphql } from '@/gql'

export const GET_POST_BY_SLUG = graphql(`
    query Post($slug: String) {
        Post(slug: $slug) {
            _id
            _slug
            title
            excerpt
            _read_time
            categories {
                name
                _slug
            }
            cover {
                url(width: 480, height: 240)
                detail: url(width: 1200, height: 600)
            }
            author {
                ...Author
            }
            content {
                ...DynamicContentField
            }
        }
    }
`)
