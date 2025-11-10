import { FaStar, FaUser } from 'react-icons/fa6'

export default function TestimonialCard() {
    return (
        <div className='flex items-start justify-start'>
            <div className='flex gap-4 rounded-lg bg-white p-6'>
                <div className='bg-primary-50 text-primary-100! flex aspect-square h-[60px] w-[60px] flex-0 items-center justify-center rounded-full'>
                    <FaUser className='text-primary-100 text-2xl' />
                </div>
                <div className='flex-initial grow-0 space-y-6 pt-4'>
                    <div className='h-4 w-36 rounded-xs bg-neutral-100'></div>
                    <div className='space-y-2.5'>
                        <div className='h-3 w-64 rounded-xs bg-neutral-50'></div>
                        <div className='h-3 w-56 rounded-xs bg-neutral-50'></div>
                        <div className='h-3 w-60 rounded-xs bg-neutral-50'></div>
                    </div>
                    <div className='flex gap-1'>
                        <FaStar className='text-primary-100 text-2xl' />
                        <FaStar className='text-primary-100 text-2xl' />
                        <FaStar className='text-primary-100 text-2xl' />
                        <FaStar className='text-primary-100 text-2xl' />
                        <FaStar className='text-primary-100 text-2xl' />
                    </div>
                </div>
            </div>
        </div>
    )
}
