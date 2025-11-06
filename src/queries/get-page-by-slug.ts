import { graphql } from '@/gql'

export const GET_PAGE_BY_SLUG = graphql(`
    query Page($slug: String) {
        Page(slug: $slug) {
            title
            _id
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
                ... on Hero {
                    ...Hero
                }
                ... on Feature {
                    ...Feature
                }
                ...on FAQ {
                    ...FAQ
                }
                ... on Cards {
                    ...Cards
                }
                ... on Content {
                    ...Content
                }
            }
        }
    }
`)