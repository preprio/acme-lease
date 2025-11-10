import Image from 'next/image'
import { FaUser } from 'react-icons/fa6'
import { AuthorFragment } from '@/gql/graphql'

export default function AuthorBox(props: { author: AuthorFragment }) {
    const author = props.author

    return (
        <div className='flex flex-wrap items-center gap-2'>
            <div className='bg-primary-100 text-primary-50 relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-full text-sm'>
                {author.image?.url ? (
                    <Image
                        src={author.image?.url}
                        alt='Author image'
                        className='object-cover'
                        fill={true}
                    />
                ) : (
                    <FaUser />
                )}
            </div>
            <p className='text-secondary-700 text-mb-base text-base font-medium'>
                {author.name}
            </p>
        </div>
    )
}
