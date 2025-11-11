import React from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode
    buttonStyle?: 'primary' | 'secondary'
}

export default function Button(props: ButtonProps) {
    const {
        children,
        buttonStyle: _buttonStyle = 'primary',
        className,
        ...additionalProps
    } = props
    const classes = cn(
        'flex rounded-full text-sm px-6 py-2.5 font-medium',
        {
            'bg-primary-600 hover:bg-primary-700 text-white':
                props.buttonStyle === 'primary',
            'bg-white hover:bg-gray-50 text-secondary-700':
                props.buttonStyle === 'secondary',
        },
        className
    )

    return (
        <button
            className={classes}
            {...additionalProps}
        >
            {children}
        </button>
    )
}
