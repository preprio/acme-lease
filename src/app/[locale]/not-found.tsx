import { Link } from '@/i18n/routing'
import Button from '@/components/elements/button'
import Image from 'next/image'

export default function NotFound() {
    return (
        <div className='bg-primary-50 flex h-full w-full justify-center pt-[72px] pb-[146px] lg:pt-[120px]'>
            <div className='flex flex-col items-center gap-8 py-6 text-center lg:gap-10'>
                <Image
                    alt='404 image'
                    src='/404.svg'
                    width={450}
                    height={240}
                    className='max-h-[450px]'
                />
                <p className='text-secondary-700 max-w-md text-base font-medium text-balance'>
                    Oops! The page you’re looking for doesn’t exist. Let’s get
                    you back on track.
                </p>
                <Link href={'/'}>
                    <Button buttonStyle='primary'>Go back home</Button>
                </Link>
            </div>
        </div>
    )
}
