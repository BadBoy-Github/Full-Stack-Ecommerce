import React from 'react'

const ForgotPassword = () => {
  return (
    <div>
      <div className='flex flex-col justify-center items-center gap-8'>
        <img
          src='https://img.freepik.com/premium-vector/worker-cartoon-site-construction_24877-12593.jpg'
          alt='page under construction'
          className=' h-full w-full max-w-[300px] max-h-[300px] mt-20 rounded-xl mix-blend-multiply shadow-xl' />
      </div>
      <div className='flex flex-col justify-center items-center gap-1 mt-4'>
        <h2 className='text-lg font-semibold text-gray-600'>This page is under construction at this moment. </h2>
        <h2 className='text-lg font-semibold text-gray-600'>Feel free to create a new account if you forgot your password.</h2>
      </div>
    </div>
  )
}

export default ForgotPassword