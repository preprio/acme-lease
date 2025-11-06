import { Link } from '@/i18n/routing'
import Button from '@/components/elements/button'
import Image from 'next/image'

export default function NotFound() {
    return (
        <div className="w-full h-full flex justify-center bg-primary-50 pt-[72px] lg:pt-[120px] pb-[146px]">
            <div className="flex flex-col items-center text-center gap-8 lg:gap-10 py-6">
                <Image alt="404 image" src="/404.svg" width={450} height={240} className="max-h-[450px]" />
                <p className="max-w-md text-secondary-700 text-base font-medium text-balance">
                    Oops! The page you’re looking for doesn’t exist. Let’s get you back on track.
                </p>
                <Link href={'/'}>
                    <Button buttonStyle="primary">Go back home</Button>
                </Link>
            </div>
        </div>
    )
}