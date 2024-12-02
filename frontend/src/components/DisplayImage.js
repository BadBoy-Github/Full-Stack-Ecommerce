import React from 'react'
import { IoClose } from "react-icons/io5";


const DisplayImage = ({
    imgUrl,
    onClose
}) => {
    return (
        <div>
            <div className='fixed bottom-0 top-0 right-0 left-0 flex justify-center items-center'>

                <div className='bg-white shadow rounded max-w-5xl mx-auto p-4'>

                    <div className='placeCloseProductFullScreen'>
                        <button className='p-1 bg-red-600 rounded-full hover:bg-red-800 absolute text-white'
                            onClick={onClose}>
                            <IoClose />
                        </button>
                    </div>

                    <div className='flex justify-center p-4 max-h-[80vh] max-w-[80vh]'>
                        <img src={imgUrl} alt='' className='w-full h-full' />
                    </div>
                </div>
            </div>

        </div>

    )
}

export default DisplayImage