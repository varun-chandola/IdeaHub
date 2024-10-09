import React from 'react'

const Loader = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" style={{ width: '100px', height: '100px' }}>
                <radialGradient id="a8" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)">
                    <stop offset="0" stopColor="#FFFFFF" />
                    <stop offset=".3" stopColor="#FFFFFF" stopOpacity=".9" />
                    <stop offset=".6" stopColor="#FFFFFF" stopOpacity=".6" />
                    <stop offset=".8" stopColor="#FFFFFF" stopOpacity=".3" />
                    <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
                </radialGradient>
                <circle
                    transform-origin="center"
                    fill="none"
                    stroke="url(#a8)"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray="100 500"
                    strokeDashoffset="0"
                    cx="50"
                    cy="50"
                    r="35"
                >
                    <animateTransform
                        type="rotate"
                        attributeName="transform"
                        calcMode="spline"
                        dur="2"
                        values="360;0"
                        keyTimes="0;1"
                        keySplines="0 0 1 1"
                        repeatCount="indefinite"
                    />
                </circle>
                <circle
                    transform-origin="center"
                    fill="none"
                    opacity=".2"
                    stroke="#FFFFFF"
                    strokeWidth="5"
                    strokeLinecap="round"
                    cx="50"
                    cy="50"
                    r="35"
                />
            </svg>
        </div>
    )
}

export default Loader