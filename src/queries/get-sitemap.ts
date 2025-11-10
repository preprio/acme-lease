import { graphql } from '@/gql'

export const GET_SITEMAP = graphql(`
    query Sitemap {
        Posts(limit: 100) {
            total
            items {
                _localizations {
                    _slug
                    _changed_on
                    _locale
                    seo {
                        ...SEO
                    }
                }
                _slug
                _changed_on
                seo {
                    ...SEO
                }
            }
        }
        Pages(limit: 100) {
            total
            items {
                _localizations {
                    _slug
                    _changed_on
                    _locale
                    seo {
                        ...SEO
                    }
                }
                _slug
                _changed_on
                seo {
                    ...SEO
                }
            }
        }
        Products(limit: 100) {
            total
            items {
                _localizations {
                    _slug
                    _locale
                    _changed_on
                    seo {
                        ...SEO
                    }
                }
                _slug
                _changed_on
                seo {
                    ...SEO
                }
            }
        }
    }
`)
