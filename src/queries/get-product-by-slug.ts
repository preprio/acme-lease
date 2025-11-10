import { graphql } from '@/gql'

export const GET_PRODUCT_BY_SLUG = graphql(`
    query Product($slug: String) {
        Product(slug: $slug) {
            _id
            _slug
            name
            excerpt
            _read_time
            categories {
                name
                _slug
            }
            image {
                url
            }
            rating
            price
            price_suffix
            content {
                __typename
                ... on Component {
                    _id
                }
                ... on Static {
                    ...Static
                }
                ... on CTA {
                    ...CTA
                }
                ... on Contact {
                    ...Contact
                }
                ... on Feature {
                    ...Feature
                }
                ... on FAQ {
                    ...FAQ
                }
                ... on Cards {
                    ...Cards
                }
            }
        }
    }
`)
