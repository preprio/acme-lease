import { graphql } from '@/gql'

export const GET_NAVIGATION = graphql(`
    query Navigation {
        Navigation {
            top_navigation {
                ...Button
            }
        }
    }
`)
