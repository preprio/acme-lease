import React from 'react'

interface BadgeProps {
    children?: React.ReactNode
}

export default function Badge({ children }: BadgeProps) {
    return (
        <div className='bg-primary-50 text-secondary-700 rounded-full px-3 py-1 text-sm font-medium'>
            {children}
        </div>
    )
}
