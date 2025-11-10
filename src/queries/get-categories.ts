import { graphql } from '@/gql'

export const GET_CATEGORIES = graphql(`
    query Categories {
        Categories(limit: 50, sort: name_ASC) {
            items {
                _slug
                _id
                name
            }
        }
    }
`)
