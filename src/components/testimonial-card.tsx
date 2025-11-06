import { FaStar, FaUser } from 'react-icons/fa6'


export default function TestimonialCard() {
    return (
        <div className="flex items-start justify-start">
            <div className="flex gap-4 rounded-lg bg-white p-6">
                <div
                    className="flex-0 flex h-[60px] w-[60px] items-center justify-center rounded-full bg-primary-50 !text-primary-100">
                    <FaUser className="text-2xl text-primary-100" />
                </div>
                <div className="flex-initial flex-grow-0 space-y-6 pt-4">
                    <div className="h-4 w-36 rounded-sm bg-neutral-100"></div>
                    <div className="space-y-2.5">
                        <div className="h-3 w-64 rounded-sm bg-neutral-50"></div>
                        <div className="h-3 w-56 rounded-sm bg-neutral-50"></div>
                        <div className="h-3 w-60 rounded-sm bg-neutral-50"></div>
                    </div>
                    <div className="flex gap-1">
                        <FaStar className="text-2xl text-primary-100" />
                        <FaStar className="text-2xl text-primary-100" />
                        <FaStar className="text-2xl text-primary-100" />
                        <FaStar className="text-2xl text-primary-100" />
                        <FaStar className="text-2xl text-primary-100" />
                    </div>
                </div>
            </div>
        </div>
    )
}