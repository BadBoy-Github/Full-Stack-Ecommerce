import React from 'react'
import cancelImage from '../assest/cancel.gif'
import { Link } from 'react-router-dom'

const Cancel = () => {
  return (
    <div className='bg-slate-200 rounded-xl w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 mt-20'>
        <img src={cancelImage} width={150} height={150} className='mix-blend-multiply'/>
        <p className='text-red-600 font-bold text-xl'>Payment Canceled</p>
        <Link 
        to={"/cart"} 
        className='font-medium text-red-600 rounded-xl border-2 border-red-600 mt-4 px-4 py-2 hover:bg-red-600 hover:text-white'>
          Go to Cart</Link>
    </div>
  )
}

export default Cancel