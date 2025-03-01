import React from 'react'

export default function SuccessIcon({className}) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            version="1.1"
            viewBox="-1 -1 202 202"
            preserveAspectRatio="xMidYMid meet"
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
                    style={{opacity: '0.122'}}
                    fill="#219c6b"
                    d="M 85.5,-0.5 C 94.8333,-0.5 104.167,-0.5 113.5,-0.5C 161.167,9.16667 189.833,37.8333 199.5,85.5C 199.5,94.8333 199.5,104.167 199.5,113.5C 189.833,161.167 161.167,189.833 113.5,199.5C 104.167,199.5 94.8333,199.5 85.5,199.5C 37.8333,189.833 9.16667,161.167 -0.5,113.5C -0.5,104.167 -0.5,94.8333 -0.5,85.5C 9.16667,37.8333 37.8333,9.16667 85.5,-0.5 Z"
                />
            </g>
            <g>
                <path
                    style={{opacity: '0.975'}}
                    fill="#22a16c"
                    d="M 90.5,51.5 C 119.17,50.0243 137.337,63.0243 145,90.5C 147.719,120.592 134.553,139.425 105.5,147C 75.0643,149.04 56.5643,135.207 50,105.5C 48.9013,76.4447 62.4013,58.4447 90.5,51.5 Z"
                />
            </g>
        </svg>
    )
}