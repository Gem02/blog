import React, {useEffect, useState} from 'react'
import {profilepic} from '../assests/images/exports'
import {FaQuoteLeft, FaTag} from 'react-icons/fa'
import {HeadingCard, SmPost, Heading, Avater} from '../components/reuse/Reuse'
import {bannerAds} from '../assests/images/exports'
import axios from 'axios';
import { useUserContext } from '../context/user';
import { useParams, Link } from 'react-router-dom';
import DeletePost from '../components/deletepost';
import { RotatingLines } from 'react-loader-spinner';

const Fullnews = () => {
    const [post, setPost] = useState([]);
    const [featuredPost, setFeaturedPosts] = useState([]);
    const [randomPosts, setRandomPost] = useState([]);
    const [quote, setquote] = useState([]);
    const {userEmail, login} = useUserContext();
    const [loader, setLoader] = useState(false);

    const { postId } = useParams();

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const createMarkup = (htmlContent) => {
    return { __html: htmlContent };
    };

    const fetchFeaturedPost = async () =>{
        try {
            const result = await axios.get(`${process.env.REACT_APP_BACKENDURL}/featuresPost`);
            setFeaturedPosts(result.data);
        } catch (error) {
            console.log('error fetching data');
        }
    }

    const fetchRandomPost = async () =>{
        try {
            const result = await axios.get(`${process.env.REACT_APP_BACKENDURL}/randomPost`);
            setRandomPost(result.data);
        } catch (error) {
            console.log('error fetching data');
        }
    }

    const truncateContent = (text) => {
        return text?.length > 100 ? text?.substring(0, 100) + '...' : text;
    };

    const randomquote = async () => {
        try {
            const response = await fetch('http://api.quotable.io/random');
            const result = await response.json();
            setquote(result);
        } catch (error) {
            console.log('Error fetching quotes:');
        }
    };
    

    useEffect(() => {
        setLoader(true)
        const fetchPost = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKENDURL}/fullpost/${postId}`);
                setPost(response.data.post);
            } catch (error) {
                console.error('Error fetching the post:');
            }
        };

        fetchPost();
        randomquote();
        fetchFeaturedPost();
        fetchRandomPost();
        setLoader(false)
    }, [postId])

  return (
    <div>
        <div className='grid grid-cols-3 px-20 lg:px-5 mt-5 xsm:mt-14 overflow-x-hidden gap-6 md:block'>
            <div className='col-span-2'>
                <RotatingLines
                    visible={loader}
                    height="50"
                    width="50"
                    color="red"
                    strokeWidth="5"
                    animationDuration="0.75"
                    className= "mt-20"
                    ariaLabel="rotating-lines-loading"
                />
                <p className='font-bold text-3xl xsm:text-2xl'>{post?.title}</p>
                <p className=' text-slate-600 mb-2 xsm:text-xs'> Posted on - { formatDate(post?.datePosted) } <br /> Enjoy the read and always remember to come back for more update </p>
                <hr />
                <div>
                    <Avater 
                        avaName={post.posterDetails?.author}
                        avaData={ formatDate(post?.datePosted) } 
                        avaImage={profilepic} 
                    />
                    {
                        login && userEmail === post.posterDetails?.email ?

                        <div className='flex gap-3 mt-2'>
                            <Link to={`/Edit/${post?._id}`} className='px-2 py-1 text-xs hover:bg-slate-300 bg-slate-200'>Edit Post</Link>
                            <DeletePost postId={post?._id}/>
                        </div>
                        :
                        null
                    }
                    
                </div>

                <div className='mt-5 w-full'><img src={post?.imageUrl} alt="" className='w-full object-cover' /></div>
                <div>
                    {/* <p className='font-bold text-4xl'>15k</p> 
                    <p className='font-bold text-xl'>views</p> */}
                </div>
                <p className='text-slate-700 first-letter:text-2xl first-letter:font-bold text-justify'>
                {<div dangerouslySetInnerHTML={createMarkup(post.content)} />}
                </p>
                <div className='bg-orange-50 py-5 px-10 m-8'>
                    <FaQuoteLeft className='text-orange-600 size-7 sm:size-3'/>
                    <p className='text-slate-900'>{quote?.content}</p>
                    <p className='text-orange-600 font-semibold mt-6'>- {quote?.author}</p>
                </div>

                <div className='flex items-center gap-2 mt-8 flex-wrap'>
                    <FaTag size={20} className='text-orange-600'/> 

                    {
                        post.tags?.map((tag, index) => {
                            return(
                                <span key={index} className='px-2 py-1 text-sm border-2 hover:bg-orange-600 hover:text-white cursor-pointer'>#{tag}</span>
                            )
                        })
                    }
                </div>

                

                <div className='mt-10'>
                    <p className='font-bold text-3xl'>Suggested Post</p>
                    <div className='flex gap-6 mt-4 md:flex-wrap '>

                    {
                        randomPosts.map(post => {
                            return(
                                <HeadingCard 
                                    key={post?._id}
                                    HAuthor={post?.posterDetails.author} 
                                    HDate={formatDate(post?.datePosted)} 
                                    HImage={post?.imageUrl} 
                                    HHeading={post?.title} 
                                    redirect={post?._id}
                                />
                            )
                        })
                    }

                </div>
                </div>
            </div>


            <div className='col-span-1 relative'>

                <div>

                    <div className='flex flex-col gap-4 mt-10 mb-12'>

                    {
                    featuredPost?.map(post =>{
                        return(

                            <SmPost 
                                key={post?._id}
                                SmAurthor={post?.posterDetails.author} 
                                SmDate={formatDate(post?.datePosted)} 
                                SmHeading={post?.title} 
                                SmImage={post?.imageUrl} 
                                redirect={post?._id}
                            />
                        )
                    })
                }
                    
                    </div>

                    <div className=' flex-grow flex-shrink border-2 break-inside-avoid border-slate-200 mb-3 bg-slate-100 p-2 w-full'>
                        <div className='mb-2'><img src={randomPosts[0]?.imageUrl} alt='' className='h-full w-full object-cover' /></div>
                        <span className='px-2 py-1 bg-orange-600 text-white text-xs'>{randomPosts[0]?.category}</span>
                        <p className='font-semibold text-xs text-orange-700 mt-1'> By {randomPosts[0]?.posterDetails.Author}<span className='text-black'>16th June, 2024</span></p>
                        <p className='font-bold text-xl line-clamp-2'>{randomPosts[0]?.title}</p>
                        <div className='text-gray-700'>{<div dangerouslySetInnerHTML={createMarkup(truncateContent(randomPosts[0]?.content))} />}</div>
                        <button className='mt-5 mb-5'><Link to={`/post/${randomPosts[0]?._id}`} className='p-3 border-2 border-orange-500 text-orange-700 font-semibold'>Read More</Link></button>

                    </div>

                    <div className='mt-10'><Heading Name={'Newsletter'}/></div>

                    <div className='mt-9 shadow-lg px-5 py-7 md:max-w-96 md:mx-auto'>
                        <p className=' text-xl font-bold'>The most important world news and events of the day</p>
                        <p className=' text-slate-600 mt-3 text-sm'>Get magazine daily newsletter on your inbox</p>
                        <div className='mt-7 flex items-center border-2 justify-between h-12'>
                            <input type="text" placeholder='Your email address' className='p-2 w-full h-full' />
                            <button type='submit' className='bg-orange-600 border-2 border-orange-600 hover:bg-orange-800 text-white font-bold h-full w-3/6 lg:w-10/12' >SIGN UP</button>
                        </div>
                    </div>
                </div>
                
                <div className='sticky top-0'>
                    <div className=''>
                        <div className='mt-10 sticky'><Heading Name={'Tags'}/></div>
                        <div className='mt-10'>
                            <div className='flex gap-1 flex-wrap'>
                                <span className='px-2 py-1 text-sm border-2 hover:bg-orange-600 hover:text-white cursor-pointer'>#PROPERTY</span>
                                <span className='px-2 py-1 text-sm border-2 hover:bg-orange-600 hover:text-white cursor-pointer'>#SEA</span>
                                <span className='px-2 py-1 text-sm border-2 hover:bg-orange-600 hover:text-white cursor-pointer'>#PROGRAMMING</span>
                                <span className='px-2 py-1 text-sm border-2 hover:bg-orange-600 hover:text-white cursor-pointer'>#GAME</span>
                                <span className='px-2 py-1 text-sm border-2 hover:bg-orange-600 hover:text-white cursor-pointer'>#LIFESTYLE</span>
                                <span className='px-2 py-1 text-sm border-2 hover:bg-orange-600 hover:text-white cursor-pointer'>#TRAVEL</span>
                                <span className='px-2 py-1 text-sm border-2 hover:bg-orange-600 hover:text-white cursor-pointer'>#FRAMEWORK</span>
                                <span className='px-2 py-1 text-sm border-2 hover:bg-orange-600 hover:text-white cursor-pointer'>#TECHNOLOGY</span>
                                <span className='px-2 py-1 text-sm border-2 hover:bg-orange-600 hover:text-white cursor-pointer'>#CRYPTO</span>
                                <span className='px-2 py-1 text-sm border-2 hover:bg-orange-600 hover:text-white cursor-pointer'>#SPORTS</span>
                                <span className='px-2 py-1 text-sm border-2 hover:bg-orange-600 hover:text-white cursor-pointer'>#SEA</span>
                                <span className='px-2 py-1 text-sm border-2 hover:bg-orange-600 hover:text-white cursor-pointer'>#PROGRAMMING</span>
                                <span className='px-2 py-1 text-sm border-2 hover:bg-orange-600 hover:text-white cursor-pointer'>#GAME</span>
                                <span className='px-2 py-1 text-sm border-2 hover:bg-orange-600 hover:text-white cursor-pointer'>#LIFESTYLE</span>
                                <span className='px-2 py-1 text-sm border-2 hover:bg-orange-600 hover:text-white cursor-pointer'>#TRAVEL</span>
                                <span className='px-2 py-1 text-sm border-2 hover:bg-orange-600 hover:text-white cursor-pointer'>#FRAMEWORK</span>
                            </div>
                        </div>

                        <div className='mt-10'><Heading Name={'Adverts'}/></div>

                        <div className='mt-5'>
                            <div>
                                <img src={bannerAds} alt="" className='w-full md:w-96' />
                            </div>
                        </div>
                    </div>
                </div>
                


            </div>
        </div>
    </div>
  )
}

export default Fullnews