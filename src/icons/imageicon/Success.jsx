import React from 'react'

export default function Success({className}) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            version="1.1"
            viewBox="-1 -1 130 130"
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
                    style={{opacity: '0.931'}}
                    fill="#26bd6c"
                    d="M 52.5,-0.5 C 59.8333,-0.5 67.1667,-0.5 74.5,-0.5C 103.176,6.17555 120.842,23.8422 127.5,52.5C 127.5,59.8333 127.5,67.1667 127.5,74.5C 120.824,103.176 103.158,120.842 74.5,127.5C 67.1667,127.5 59.8333,127.5 52.5,127.5C 23.8245,120.824 6.15779,103.158 -0.5,74.5C -0.5,67.1667 -0.5,59.8333 -0.5,52.5C 6.17555,23.8245 23.8422,6.15779 52.5,-0.5 Z M 61.5,7.5 C 96.2244,10.2244 115.558,28.8911 119.5,63.5C 115.837,97.1627 97.1706,115.829 63.5,119.5C 29.8294,115.829 11.1627,97.1627 7.5,63.5C 11.0158,30.6538 29.0158,11.9871 61.5,7.5 Z"
                />
            </g>
            <g>
                <path
                    style={{opacity: '0.906'}}
                    fill="#26bd6c"
                    d="M 89.5,38.5 C 95.5562,38.2811 97.3895,40.9477 95,46.5C 80.9557,61.0456 66.4557,75.0456 51.5,88.5C 43.2145,81.7166 35.3811,74.3833 28,66.5C 26.8333,61 29,58.8333 34.5,60C 40.0146,65.6816 45.6813,71.1816 51.5,76.5C 64.521,64.1457 77.1877,51.479 89.5,38.5 Z"
                />
            </g>
        </svg>
    )
}