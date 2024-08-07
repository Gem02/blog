import React from 'react';
import {Link} from 'react-router-dom'

const Page404 = () => {
  return (
    <div className='absolute bg-white h-full w-full top-0 left-0 flex items-center justify-center flex-col'>
      
      <h1 className='font-bold text-5xl text-red-600'>404</h1>
      <p className=' text-xs'>Page not found</p>
      <p>The page you are looking for does not exist.</p>
      <button className='mt-5'><Link to={'/'} className=' px-6 py-2 rounded-sm bg-orange-600 text-white text-xs hover:bg-orange-700'>HOME</Link></button>
    </div>
  )
}

export default Page404