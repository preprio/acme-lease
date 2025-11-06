import React from 'react'

interface ImgPlaceholderSmoothProps extends React.SVGProps<SVGSVGElement> {
}

export default function ImgPlaceholderSmooth({ ...props }: ImgPlaceholderSmoothProps) {
    return (
        <svg viewBox="0 0 148 96" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M142.277 96H7.11276C4.45863 96 3.11187 92.8069 4.9643 90.9062L28.7919 66.4569C32.647 62.5012 38.9791 62.4202 42.9341 66.276L49.7885 72.9584C54.2053 77.2645 61.4294 76.5839 64.9643 71.5286L89.9592 35.7838C93.9522 30.0734 102.415 30.0951 106.379 35.8257L144.745 91.2934C146.121 93.2832 144.697 96 142.277 96Z"
                fill="currentColor" />
            <ellipse cx="18.3168" cy="18.4615" rx="18.3168" ry="18.4615" fill="currentColor" />
        </svg>

    )
}