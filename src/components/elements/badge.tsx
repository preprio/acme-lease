import React from 'react'

interface BadgeProps {
    children?: React.ReactNode
}

export default function Badge({ children }: BadgeProps) {
    return (
        <div className="bg-primary-50 rounded-full py-1 px-3 text-sm text-secondary-700 font-medium">
            {children}
        </div>
    )
}