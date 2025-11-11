'use client'

import AuthorBox from '@/components/author-box'
import { FaChevronRight } from 'react-icons/fa6'
import ImgPlaceholderSmooth from '@/components/ui/img-placeholder-smooth'
import Badge from '@/components/elements/badge'
import ReadTime from '@/components/elements/read-time'
import { useRouter } from '@/i18n/routing'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { PostCardFragment } from '@/gql/graphql'

export default function PostCard(props: { post: PostCardFragment }) {
    const post = props.post
    const router = useRouter()
    const t = useTranslations('Blog')

    const handleClick = () => {
        router.push(`/blog/${post._slug}`)
    }

    return (
        <div
            data-prepr-item-id={post?._id}
            onClick={handleClick}
            className='group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border-2 border-transparent transition duration-200 ease-in-out hover:border-blue-600'
        >
            <div className='bg-primary-100 relative h-[196px] pb-10'>
                {!post.cover && (
                    <div className='text-primary-200 absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 transform items-center justify-center'>
                        <ImgPlaceholderSmooth className='h-[96px]' />
                    </div>
                )}
                {post.cover && (
                    <Image
                        src={post.cover?.url || ''}
                        alt=''
                        fill={true}
                        style={{ objectFit: 'cover' }}
                        className='z-0'
                    />
                )}
                <div className='relative flex justify-end p-4'>
                    <div className='flex flex-wrap gap-2'>
                        {post.categories.map((category, index) => (
                            <Badge key={index}>{category.name}</Badge>
                        ))}
                    </div>
                </div>
            </div>
            <div className='flex grow flex-col justify-between gap-4 bg-white p-4'>
                <div className='space-y-4'>
                    <div className='flex flex-wrap justify-between gap-2'>
                        {post.author && <AuthorBox author={post.author} />}
                        <ReadTime time={post._read_time || 0} />
                    </div>
                    <div className='space-y-2'>
                        <h3 className='text-secondary-700 text-mb-2xl font-medium lg:text-2xl'>
                            {post.title}
                        </h3>
                        <p className='text-secondary-700 text-mb-base opacity-70 lg:text-base'>
                            {post.excerpt}
                        </p>
                    </div>
                </div>
                <div className='text-primary-600 group-hover:text-primary-700 flex items-center gap-1 justify-self-end py-1 group-hover:underline'>
                    <span>{t('card.cta')}</span>
                    <FaChevronRight className='text-xs leading-none' />
                </div>
            </div>
        </div>
    )
}
