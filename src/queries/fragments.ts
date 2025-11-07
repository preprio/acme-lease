import { graphql } from '@/gql'

export const STATIC_FRAGMENT = graphql(`
    fragment Static on Static {
        static_type
        title
        _context {
            variant_key
        }
        _id
    }
`)

export const BUTTON_FRAGMENT = graphql(`
    fragment Button on Button {
        button_type
        text
        external_url
        link {
            ... on Category {
                _slug
            }
            ... on Page {
                _slug
            }
            ... on Post {
                _slug
            }
        }
    }
`)

export const FEATURE_SECTION_FRAGMENT = graphql(`
    fragment Feature on Feature {
        _id
        heading
        sub_heading
        button {
            ...Button
        }
        _context {
            variant_key
        }
        image_position
        image {
            url(width: 870, height: 570)
        }
    }
`)

export const CTA_SECTION_FRAGMENT = graphql(`
    fragment CTA on CTA {
        _id
        heading
        _context {
            variant_key
        }
        sub_heading
    }
`)

export const CONTACT_SECTION_FRAGMENT = graphql(`
    fragment Contact on Contact {
        _id
        heading
        sub_heading
        form_title
        _context {
            variant_key
        }
        phone_number
        email
        hubspot_form_id
        hubspot_portal_id
    }
`)

export const HERO_SECTION_FRAGMENT = graphql(`
    fragment Hero on Hero {
        _id
        sub_heading
        image {
            url(preset: "Hero", width: 2000)
            height
            width
        }
        _context {
            variant_key
        }
        heading
        buttons {
            ...Button
        }
    }
`)

export const FAQ_SECTION_FRAGMENT = graphql(`
    fragment FAQ on FAQ {
        _id
        title
        questions {
            question
            answer
        }
        _context {
            variant_key
        }
    }
`)

export const CARDS_SECTION_FRAGMENT = graphql(`
    fragment Cards on Cards {
        _id
        heading
        sub_heading
        _context {
            variant_key
        }
        button {
            ...Button
        }
        variant
        cards {
            __typename
            ... on Post {
                ...PostCard
            }

            ...on Product {
                ...ProductCard
            }
        }
    }
`)

export const PRODUCT_CARD_FRAGMENT = graphql(`
    fragment ProductCard on Product {
        _id
        _slug
        name
        price
        price_suffix
        image {
            url(width: 372, height: 188)
        }
    }
`)

export const AUTHOR_FRAGMENT = graphql(`
    fragment Author on Author {
        _id
        name
        image {
            url
        }
    }
`)

export const POST_CARD_FRAGMENT = graphql(`
    fragment PostCard on Post {
        _slug
        _id
        title
        excerpt
        _read_time
        categories {
            name
            _slug
        }
        cover {
            url(width: 720, height: 360)
        }
        author {
            ...Author
        }
    }
`)

export const SEO_FRAGMENT = graphql(`
    fragment SEO on SEO {
        _id
        meta_description
        meta_title
        meta_image {
            url
        }
    }
`)

export const CONTENT_FRAGMENT = graphql(`
    fragment Content on Content {
        __typename
        _id
        main_content {
            ...DynamicContentField    
        }
    }
`)

export const DYNAMIC_CONTENT_FIELD_FRAGMENT = graphql(`
    fragment DynamicContentField on _prepr_types {
        __typename
        ... on Text {
            _id
            body
            format
            text
        }
        ... on YouTubePost {
            _id
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
`)