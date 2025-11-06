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
                __typename
                ... on Text {
                    body
                    format
                    text
                }
                ... on YouTubePost {
                    url
                }
                ... on Assets {
                    items {
                        _type
                        url(width: 1000)
                        mime_type
                        caption
                        playback_id
                        width
                        height
                    }
                }
            }
        }
    }
`)
