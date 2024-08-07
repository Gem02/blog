import React from 'react'
import {TiSocialFacebook, TiSocialTwitter, TiSocialInstagram} from 'react-icons/ti'
import {Link} from 'react-router-dom'

const Footer = () => {
  return (
    <div>
         <div className='mt-20 md:mt-10  w-full p-10 md:p-7 flex md:block justify-between gap-12 bg-blue-950'>
            <div className='w-2/5 md:w-full'>
                <div><p className='text-4xl h-full text-white sm:xl'><strong className='text-orange-600'>GEM</strong>TECH</p></div>
                <p className='text-slate-300 text-sm'>Our focus here is to bring you the latest and updated newa around the world
                    we tell you about the happingings around you just as it is.
                </p>
                <hr className=' opacity-30' />
                <div className=' md:flex gap-3 items-center'>
                    <p className='font-bold text-2xl mt-5 md:mt-2 text-white'>Follow us:</p>
                    <div className='flex mt-2'>
                        <Link to={'/'} ><TiSocialFacebook  color='white' size={30} className='cursor-pointer hover:bg-orange-600'/></Link>
                        <Link to={'/'} ><TiSocialTwitter color='white' size={30}  className='cursor-pointer hover:bg-orange-600'/></Link>
                        <Link to={'/'} ><TiSocialInstagram  color='white' size={30} className='cursor-pointer hover:bg-orange-600'/></Link>
                    </div>
                </div>
            </div>

            <div>
                <p className='text-white text-2xl font-bold md:mt-5'>Categories</p>
                <div className='flex mt-4 md:mt-1 gap-4 md:gap-10 md:flex-wrap'>
                    <ul>    
                        <li className='text-white font-semibold hover:text-orange-600 cursor-pointer'>App</li>
                        <li className='text-white font-semibold hover:text-orange-600 cursor-pointer'>Business</li>
                        <li className='text-white font-semibold hover:text-orange-600 cursor-pointer'>Entertainment</li>
                        <li className='text-white font-semibold hover:text-orange-600 cursor-pointer'>Fashion</li>
                        <li className='text-white font-semibold hover:text-orange-600 cursor-pointer'>Food</li>
                    </ul>
                    <ul>
                        <li className='text-white font-semibold hover:text-orange-600 cursor-pointer'>Gadget</li>
                        <li className='text-white font-semibold hover:text-orange-600 cursor-pointer'>Gaming</li>
                        <li className='text-white font-semibold hover:text-orange-600 cursor-pointer'>Health</li>
                        <li className='text-white font-semibold hover:text-orange-600 cursor-pointer'>Lifestyle</li>
                        <li className='text-white font-semibold hover:text-orange-600 cursor-pointer'>Science</li>
                    </ul>
                    <ul>
                        <li className='text-white font-semibold hover:text-orange-600 cursor-pointer'>Travel</li>
                        <li className='text-white font-semibold hover:text-orange-600 cursor-pointer'>Startups</li>
                        <li className='text-white font-semibold hover:text-orange-600 cursor-pointer'>Sports</li>
                    </ul>
                </div>
            </div>

            <div className='w-1/4 md:w-full md:mt-8 '>
                <p className='text-white text-xl font-bold'>Newsletter</p>
                <p className='text-slate-300 text-sm mb-4'>Get latest news and updates directly to your inbox at no cost. input your email below</p>
                <form>
                    <input type="text" placeholder='Enter email address' className='p-3 w-full text-xs'/>
                    <button className='w-full bg-orange-600 text-xs py-3 text-white font-bold'>SUBSCRIBE</button>
                </form>
            </div>
        </div>
        <div className='bg-slate-800 flex justify-between p-4 sm:flex-col-reverse'>
            <Link to={'/'} className='text-slate-200 text-sm font-bold'>&copy; 2024 <span>GEMTECH Services</span></Link>
            <div className='flex gap-2'>
                <Link to={'/'} className='text-slate-100 font-bold text-sm hover:text-orange-600'>Privacy</Link>
                <p className='text-slate-100 font-bold text-sm'>/</p>
                <Link to={'/about'} className='text-slate-100 font-bold text-sm hover:text-orange-600'>About</Link>
                <p className='text-slate-100 font-bold text-sm'>/</p>
                <Link to={'/contact'} className='text-slate-100 font-bold text-sm hover:text-orange-600'>Contact</Link>
            </div>
        </div>
    </div>
  )
}

export default Footer