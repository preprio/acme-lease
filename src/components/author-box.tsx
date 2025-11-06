import Image from 'next/image'
import {FaUser} from 'react-icons/fa6'
import { AuthorFragment } from '@/gql/graphql';

export default function AuthorBox(props: { author: AuthorFragment }) {
  const author = props.author;
  
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div
        className="rounded-full w-7 h-7 bg-primary-100 flex items-center justify-center text-sm text-primary-50 overflow-hidden relative">
        {author.image?.url ? (
          <Image src={author.image?.url} alt="Author image" className="object-cover"
                 fill={true} />
        ) : (
          <FaUser />
        )}
      </div>
      <p className="text-secondary-700 font-medium text-base text-mb-base">{author.name}</p>
    </div>
  )
}