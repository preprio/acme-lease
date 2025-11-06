import CategoryButton from '@/components/elements/category-button'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import { getApolloClient } from '@/apollo-client'
import { CategoriesDocument, CategoriesQuery } from '@/gql/graphql'

export const revalidate = 0

async function getCategories(locale: string) {
    const client = await getApolloClient()
    const { data } = await client.query<CategoriesQuery>({
        query: CategoriesDocument,
        context: {
            headers: {
                'Prepr-Locale': locale,
            },
        },
    })

    return data?.Categories
}

function DefaultFilter({ pageCategory }: { pageCategory?: string }) {
    const t = useTranslations('Blog')

    return (
        <CategoryButton className={cn(!pageCategory && 'active')}
                        _slug="all">{t('Filter.all')}</CategoryButton>
    )
}

export default async function CategoryButtons({ locale, pageCategory }: { locale: string, pageCategory?: string }) {

    const categories = await getCategories(locale)
    return (
        <>
            <DefaultFilter pageCategory={pageCategory} />
            {categories?.items?.map((category) => (
                <CategoryButton key={category._id}
                                className={cn(pageCategory === category._slug && 'active')}
                                _slug={category._slug!}>{category.name}</CategoryButton>
            ))}
        </>
    )
}