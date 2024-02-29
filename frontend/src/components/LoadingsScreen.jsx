import React from 'react'
import img from '../img/snipIt.png'

const LoadingsScreen = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-customblack bg-opacity-80 z-50">
            <div className="animate-bounce h-32 w-32 "><img src={img}/></div>
        </div>
    )
}

export default LoadingsScreen