import React from 'react';
import {Heading} from '../components/reuse/Reuse';
import {useParams} from 'react-router-dom'

const Category = () => {
    const {category} = useParams();
  return (
    <div className='px-20 lg:px-5 mt-5 xsm:mt-14'>
        <Heading Name={category}/>
        <div className='h-52 w-full mt-10 bg-slate-100 flex justify-center items-center'>
            <p className='text-slate-600'> Sorry Category is empty</p>
        </div>
       
    </div>
  )
}

export default Category