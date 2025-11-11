import React from 'react'

interface ImgPlaceholderProps extends React.SVGProps<SVGSVGElement> {}

export default function ImgPlaceholder({ ...props }: ImgPlaceholderProps) {
    return (
        <svg
            viewBox='0 0 340 220'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            {...props}
        >
            <path
                d='M335.151 220H6.02881C3.78152 220 2.64261 217.295 4.21307 215.688L76.2805 141.921C79.5409 138.584 84.8875 138.515 88.2323 141.768L126.62 179.101C130.356 182.734 136.457 182.159 139.448 177.892L218.626 64.9384C222.005 60.1173 229.153 60.1355 232.508 64.9739L337.237 216.015C338.404 217.699 337.199 220 335.151 220Z'
                fill='currentColor'
            />
            <ellipse
                cx='42.0792'
                cy='42.3077'
                rx='42.0792'
                ry='42.3077'
                fill='currentColor'
            />
        </svg>
    )
}
