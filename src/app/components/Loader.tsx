import React from 'react'
import { ScaleLoader } from 'react-spinners'

const Loader = () => {
    return (
        <div className='h-[calc(100vh-330px)] py-6 flex justify-center items-center'>
            <ScaleLoader color="black" />
        </div>
    )
}

export default Loader