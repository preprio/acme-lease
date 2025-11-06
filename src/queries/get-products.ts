import { graphql } from '@/gql'

export const GET_PRODUCTS = graphql(`
    query Products($skip: Int, $limit: Int, $where: ProductWhereInput) {
        Products(limit: $limit, skip: $skip, sort: publish_on_DESC, where: $where) {
            total
            items {
                ...ProductCard
            }
        }
    }
`)