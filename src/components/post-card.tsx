'use client'

import AuthorBox from '@/components/author-box'
import { FaChevronRight } from 'react-icons/fa6'
import ImgPlaceholderSmooth from '@/components/img-placeholder-smooth'
import Badge from '@/components/elements/badge'
import ReadTime from '@/components/elements/read-time'
import { useRouter } from '@/i18n/routing'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { PostCardFragment } from '@/gql/graphql';

export default function PostCard(props: { post: PostCardFragment }) {
    const post = props.post;
    const router = useRouter()
    const t = useTranslations('Blog')

    const handleClick = () => {
        router.push(`/blog/${post._slug}`)
    }

    return (
        <div
            data-prepr-item-id={post?._id}
            onClick={handleClick}
            className="h-full flex flex-col rounded-2xl cursor-pointer overflow-hidden group border-2 border-transparent hover:border-blue-600 ease-in-out transition duration-200">
            <div className="bg-primary-100 relative h-[196px] pb-10">
                {!post.cover && <div
                    className="flex items-center justify-center text-primary-200 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <ImgPlaceholderSmooth className="h-[96px]" />
                </div>}
                {post.cover && (
                    <Image src={post.cover?.url || ''} alt="" fill={true} style={{ objectFit: 'cover' }}
                           className="z-0" />
                )}
                <div className="flex justify-end p-4 relative">
                    <div className="flex flex-wrap gap-2">
                        {post.categories.map((category, index) => (
                            <Badge key={index}>{category.name}</Badge>
                        ))}
                    </div>
                </div>
            </div>
            <div className="bg-white p-4 gap-4 flex flex-grow justify-between flex-col">
                <div className="space-y-4">
                    <div className="flex gap-2 flex-wrap justify-between">
                        {post.author && <AuthorBox author={post.author} />}
                        <ReadTime time={post._read_time || 0} />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-secondary-700 font-medium text-mb-2xl lg:text-2xl">{post.title}</h3>
                        <p className="text-secondary-700 opacity-70 text-mb-base lg:text-base">{post.excerpt}</p>
                    </div>
                </div>
                <div
                    className="py-1 flex items-center gap-1 text-primary-600 group-hover:text-primary-700 group-hover:underline justify-self-end">
                    <span>{t('card.cta')}</span>
                    <FaChevronRight className="text-xs leading-none" />
                </div>
            </div>
        </div>
    )
}