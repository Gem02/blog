import React from 'react';
import { Link } from 'react-router-dom';

const Mainbanner = ({Image, Tagname, Text, Author, Date}) => {
  return (
    <div className=' relative z-20'>
        <div className=' z-10 w-full sm:h-96'><img src={Image} alt="" className=' w-full object-cover sm:h-full' /></div>
        <div className='mainbanner absolute bottom-0 w-full sm:bottom-1 p-4'>
            <span className='bg-orange-600 text-white px-2 py-1 text-xs font-semibold'>{Tagname}</span>
            <h3 className='text-3xl sm:text-lg font-bold text-white line-clamp-2'>{Text}</h3>
            <span className='text-xs text-white'>{Author} <strong className='ml-3'>{Date}</strong></span>
        </div>
    </div>
  )
}



const Heading = ({Name}) =>{
    return (
        <div>
            <p className='text-2xl font-bold pb-2'>{Name}</p>
            <div className='headingLine'></div>
        </div>
        
    )
}

const FullCard = ({CardImage, CardTagName, CardAuthor, CardDate, CardHeading, CardText, redirect}) =>{
    return (
        <Link to={`/post/${redirect}`} className=' flex-grow flex-shrink border-2 break-inside-avoid border-slate-200 mb-3 bg-slate-100 p-2 w-60'>
            <div className='mb-2'><img src={CardImage} alt='' className='h-full w-full object-cover' /></div>
            <span className='px-2 py-1 bg-orange-600 text-white text-xs'>{CardTagName}</span>
            <p className='font-semibold text-xs text-orange-700 mt-1'> {CardAuthor} <span className='text-black'>{CardDate}</span></p>
            <p className='font-bold text-xl line-clamp-2'>{CardHeading}</p>
            <p className='text-gray-700 line-clamp-3'> {CardText} </p>

            <button className='mt-5 mb-5'><Link to={`/post/${redirect}`} className='p-3 border-2 border-orange-500 text-orange-700 font-semibold'>Read More</Link></button>
        </Link>
    )
}

const SmPost = ({SmImage, SmAurthor, SmDate, SmHeading, redirect}) =>{
    return (
        <Link to={`/post/${redirect}`} className='flex h-20 gap-3 flex-shrink-0 flex-grow basis-5/12'>
            <div className='w-52'><img src={SmImage} alt="" className=' h-full w-full object-cover'/></div>
            <div>
                <p className='font-bold text-xs text-orange-700 mt-1'> {SmAurthor}<span className='text-black'>{SmDate}</span></p>
                <p className='font-bold text-base line-clamp-2'>{SmHeading}</p>
            </div>
        </Link>
    )
}

const HeadingCard = ({HImage, HAuthor, HDate, HHeading, redirect}) =>{
    return (
        <Link to={`/post/${redirect}`}>
            <div className='mb-2'><img src={HImage} alt="" className='h-full w-full object-cover' /></div>
            <p className='font-bold text-xs text-orange-700 mt-1'>{HAuthor} <span className='text-black'>{HDate}</span></p>
            <p className='font-bold text-xl line-clamp-2'>{HHeading}</p>
        </Link>
    )
}

const SideCard = ({SideImage, SideTagName, SideAuthor, SideDate, SideHeading, SideText, redirect}) =>{
    return (
        <Link to={`/post/${redirect}`} className='flex items-center gap-4 mt-6 sm:block'>
            <div className='w-full max-w-sm'><img src={SideImage} alt="news" className='object-cover w-full' /></div>
            <div className='w-fit'>
                <span className='bg-orange-600 text-white px-2 py-1 text-xs font-semibold'>{SideTagName}</span>
                <p className='font-bold text-xs text-orange-700 mt-1'> {SideAuthor} <span className='text-black'>{SideDate}</span></p>
                <p className='font-bold text-xl line-clamp-2'>{SideHeading}</p>
                <p className='text-gray-700'>{SideText}</p>
            </div>
        </Link>
    )
}

const TrendingBox = ({TrendTag, TrendingAuthor, TrendingDate, TrendingHead, redirect}) => {
    return(
        <div className='border-2 p-4'>
            <Link to={`/post/${redirect}`}>
                <span className='bg-orange-600 text-white font-semibold text-xs px-2 py-1'>{TrendTag}</span>
                <p className='mt-3 font-bold text-xs text-orange-600'> {TrendingAuthor} <span className='ml-3 text-black'>{TrendingDate}</span></p>
                <p className='font-bold mt-1 line-clamp-2'>{TrendingHead}</p>
            </Link>
        </div>
    )
}


const Avater = ({avaImage, avaName, avaData}) =>{
    return(
        <div className='flex mt-10 items-center gap-4 sm:gap-2'>
            <div className='h-12 md:h-10 rounded-full'><img src={avaImage} alt="" className='h-full object-cover' /></div>
            <p className='font-bold text-orange-600 sm:text-sm'>By {avaName} <span className=' text-black'>{avaData}</span></p>
        </div>
    )
}

export {Mainbanner, Heading, FullCard, SmPost, HeadingCard, SideCard, TrendingBox, Avater}