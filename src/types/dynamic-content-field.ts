import { _Prepr_Types } from '@/gql/graphql'

export type DynamicContentField = _Prepr_Types

export type DynamicContentFieldTypename = Exclude<
    DynamicContentField['__typename'],
    'undefined'
>
