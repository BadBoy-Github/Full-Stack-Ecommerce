import React from 'react'
import successImage from '../assest/success.gif'
import { Link } from 'react-router-dom'

const Success = () => {
  return (
    <div className='bg-slate-200 rounded-xl w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 mt-20'>
        <img src={successImage} width={150} height={150}/>
        <p className='text-green-600 font-bold text-xl'>Payment Successfully</p>
        <Link to={"/order"} className='font-medium text-green-600 rounded-xl border-2 border-green-600 mt-4 px-4 py-2 hover:bg-green-600 hover:text-white'>See Orders</Link>
    </div>
  )
}

export default Success