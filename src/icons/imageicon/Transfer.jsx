import React from 'react'

export default function Transfer({className}) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="-1 -1 12 12"
            preserveAspectRatio="xMidYMid meet"
            className={className}
            style={{
                shapeRendering: 'geometricPrecision',
                textRendering: 'geometricPrecision',
                imageRendering: 'optimizeQuality',
                fillRule: 'evenodd',
                clipRule: 'evenodd'
            }}
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >
            <g>
                <path
                    style={{opacity: '0.539'}}
                    fill="#16171b"
                    d="M 5.5,-0.5 C 6.16667,-0.5 6.83333,-0.5 7.5,-0.5C 7.83333,0.5 8.5,1.16667 9.5,1.5C 9.5,1.83333 9.5,2.16667 9.5,2.5C 7.44328,4.04329 7.44328,5.04329 9.5,5.5C 9.5,6.16667 9.5,6.83333 9.5,7.5C 6.91791,7.02539 4.91791,7.69206 3.5,9.5C 2.83333,9.5 2.16667,9.5 1.5,9.5C 1.16667,8.5 0.5,7.83333 -0.5,7.5C -0.5,7.16667 -0.5,6.83333 -0.5,6.5C 1.78132,4.96778 1.78132,3.63445 -0.5,2.5C -0.5,2.16667 -0.5,1.83333 -0.5,1.5C 2.08209,1.97461 4.08209,1.30794 5.5,-0.5 Z M 3.5,3.5 C 5.33702,3.63945 5.67036,4.30612 4.5,5.5C 3.70245,5.04311 3.36912,4.37644 3.5,3.5 Z"
                />
            </g>
        </svg>
    )
}