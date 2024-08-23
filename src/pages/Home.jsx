import React, {useState, useEffect} from 'react'
import {CgArrowLeftR, CgArrowRightR} from 'react-icons/cg'
import {Link} from 'react-router-dom'
import { blueBanner, newsImage12} from '../assests/images/exports'
import {Mainbanner, Heading, FullCard, SmPost, HeadingCard, SideCard, TrendingBox} from '../components/reuse/Reuse'
import { RotatingLines } from 'react-loader-spinner';
import axios from 'axios';


const Home = () => {

    const [posts, setPosts] = useState([]);
    const [featuredPost, setFeaturedPosts] = useState([]);
    const [sponsordPost, setsponsordPost] = useState([])
    const [loader, setLoader] = useState(true);
    const [num, setNum] = useState(0)
    const [newsletterEmail, setNewsletterEmail] = useState('');


    const fetchSponsordPost = async () =>{
        try {
            const result = await axios.get(`${process.env.REACT_APP_BACKENDURL}/sponsordPost`);
            setsponsordPost(result.data);
           setLoader(false);
        } catch (error) {
            console.log('error fetching data');
            setLoader(false);
        }
    }

    const fetchFeaturedPost = async () =>{
        try {
            const result = await axios.get(`${process.env.REACT_APP_BACKENDURL}/featuresPost`);
            setFeaturedPosts(result.data);
           setLoader(false);
        } catch (error) {
            console.log('error fetching data');
           setLoader(false);
        }
    }

    const fetchpost = async () =>{
        try {
            const result = await axios.get(`${process.env.REACT_APP_BACKENDURL}/getPosts`);
            if (result.status === 200) {
                setPosts(result.data.posts);
            }
        } catch (error) {
            console.log('error fetching post');
        }
    }

    useEffect(() =>{


    fetchFeaturedPost(); 
    fetchSponsordPost();
    fetchpost();


    }, [])


    
      const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      };

      const truncateContent = (text) => {
        return text?.length > 100 ? text?.substring(0, 100) + '...' : text;
      };
    
      const createMarkup = (htmlContent) => {
        return { __html: htmlContent };
      };

      const reduce = () =>{
        if (num > 0 ){
            setNum(val => val -1);
        }else {
            setNum(5)
        }
      }

      const increase = () =>{
        if (num < 5 ){
            setNum(val => val + 1);
        }else {
            setNum(0)
        }
      }

      const handleNewsletter = (e) =>{
        e.preventDefault();
        alert('Email submitted successfully');
        setNewsletterEmail('');
      }
  return (

    <div className='py-2 px-28 lg:px-5 overflow-hidden'>
        {
            loader?

            <div className='w-full flex items-center justify-center h-dvh'>
        
                <RotatingLines
                    visible={loader}
                    height="50"
                    width="50"
                    color="red"
                    strokeWidth="5"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                />

            </div>

        :
            <div>
                <div className='flex  w-full mt-2 justify-between items-center xsm:mt-14'>
                    <div className='flex items-center gap-6 sm:gap-2'>
                        <p className='bg-orange-600 p-2 font-bold text-white sm:text-xs sm:p-1'>TRENDING</p>
                        {
                        
                            <Link to={`/post/${posts[num]?._id}`} className='font-bold hover:text-orange-600 hover:underline sm:text-xs line-clamp-1'>{posts[num]?.title}</Link>
                            
                        }
                        
                    </div>
                
                    <div className='flex gap-2'>
                        <CgArrowLeftR  color='gray' className='cursor-pointer size-7 sm:size-5' onClick={reduce} />
                        <CgArrowRightR color='gray' className='cursor-pointer size-7 sm:size-5' onClick={increase}/>
                    </div>
                </div>
                <div className='grid grid-cols-3 gap-5 mt-4 md:block'>
                    <div className='col-span-2'>
                        <div>
                            <Link to={`/post/${sponsordPost[0]?._id}`}> <Mainbanner 
                            Image={sponsordPost[0]?.imageUrl} 
                            Tagname={sponsordPost[0]?.category}
                            Text={sponsordPost[0]?.title}
                            Author={`By ${sponsordPost[0]?.posterDetails?.author}`}
                            Date={formatDate(sponsordPost[0]?.datePosted)}   /> 
                            </Link>
                        </div>

                        <div className='w-full mt-7 mb-7'>
                            <img src={blueBanner} alt="" className='object-cover'/>
                        </div>

                        <Heading Name={'Featured'}/>

                        <div className='flex gap-4 flex-wrap mt-6'>
                            <FullCard
                                key={featuredPost[0]?._id}
                                CardImage={featuredPost[0]?.imageUrl} 
                                CardAuthor={featuredPost[0]?.posterDetails.author}
                                CardDate={formatDate(featuredPost[0]?.datePosted)}
                                CardHeading={featuredPost[0]?.title}
                                CardTagName={featuredPost[0]?.category}
                                redirect={featuredPost[0]?._id}
                                CardText={<div dangerouslySetInnerHTML={createMarkup(truncateContent(featuredPost[0]?.content))} />}
                            />

                            <FullCard
                                key={featuredPost[1]?._id}
                                CardImage={featuredPost[1]?.imageUrl} 
                                CardAuthor={featuredPost[1]?.posterDetails.author}
                                CardDate={formatDate(featuredPost[1]?.datePosted)}
                                CardHeading={featuredPost[1]?.title}
                                CardTagName={featuredPost[1]?.category}
                                redirect={featuredPost[1]?._id}
                                CardText={<div dangerouslySetInnerHTML={createMarkup(truncateContent(featuredPost[0]?.content))} />}
                            />  
                        </div>

                        <div>
                            <div className='mt-8 flex flex-wrap gap-4 mb-12'>

                            {
                                featuredPost?.map(post =>{
                                    return(
                                        <FullCard
                                            key={post?._id}
                                            CardImage={post?.imageUrl} 
                                            CardAuthor={post?.posterDetails.author}
                                            CardDate={formatDate(post?.datePosted)}
                                            CardHeading={post?.title}
                                            CardTagName={post?.category}
                                            redirect={post?._id}
                                        />
                                    )
                                })
                            }
                            </div>
                        </div>

                        <div className=' mt-10'>
                            <Heading Name={'All'}/>
                        </div>

                        <div className='mt-5'>

                        {
                            posts?.map(post =>{
                                return(
                                    <SideCard 
                                        key={post?._id}
                                        SideImage={post?.imageUrl} 
                                        SideTagName={post?.category} 
                                        SideAuthor={post?.posterDetails.Author} 
                                        SideDate={formatDate(post?.datePosted)} 
                                        SideHeading={post?.title} 
                                        redirect={post?._id}
                                        SideText={<div dangerouslySetInnerHTML={createMarkup(truncateContent(post?.content))} />}
                                    />
                                )
                            })
                            }
                        </div>

                    </div>







                    <div className='col-span-1 sm:mt-10'>

                    <div className=' flex-grow flex-shrink border-2 break-inside-avoid border-slate-200 mb-3 bg-slate-100 p-2 w-full'>
                        <div className='mb-2'><img src={posts[0]?.imageUrl} alt='' className='h-full w-full object-cover' /></div>
                        <span className='px-2 py-1 bg-orange-600 text-white text-xs'>{posts[0]?.category}</span>
                        <p className='font-semibold text-xs text-orange-700 mt-1'> By {posts[0]?.posterDetails.Author}<span className='text-black'>16th June, 2024</span></p>
                        <p className='font-bold text-xl line-clamp-2'>{posts[0]?.title}</p>
                        <div className='text-gray-700 line-clamp-3'>{<div dangerouslySetInnerHTML={createMarkup(truncateContent(posts[0]?.content))} />}</div>
                        <button className='mt-5 mb-5'><Link to={`/post/${posts[0]?._id}`} className='p-3 border-2 border-orange-500 text-orange-700 font-semibold'>Read More</Link></button>

                    </div>
                            
                        <div className='flex flex-col gap-4 mt-10'>

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

                        <div className='mt-10'><Heading Name={'Newsletter'}/></div>

                            <div className='mt-9 shadow-lg px-5 py-7 md:max-w-96 md:mx-auto'>
                                <p className=' text-xl font-bold'>The most important world news and events of the day</p>
                                <p className=' text-slate-600 mt-3 text-sm'>Get magazine daily newsletter on your inbox</p>
                                <form onSubmit={handleNewsletter} className='mt-7 flex items-center border-2 justify-between h-12'>
                                    <input value={newsletterEmail} onChange={val => setNewsletterEmail(val.target.value)} required type="text" placeholder='Your email address' className='p-2 w-full h-full' />
                                    <button type='submit' className='bg-orange-600 border-2 border-orange-600 hover:bg-orange-800 text-white font-bold h-full w-3/6 lg:w-10/12' >SIGN UP</button>
                                </form>
                            </div>

                        <div className='mt-10'><Heading Name={'Trending News'}/></div>

                            <div className='mt-8'>
                                {
                                    posts.map(post =>{
                                        return(
                                            <TrendingBox 
                                                key={post?._id}
                                                redirect={post?._id}
                                                TrendingAuthor={post?.posterDetails.author} 
                                                TrendTag={post?.category} 
                                                TrendingDate={formatDate(post?.datePosted)} 
                                                TrendingHead={post?.title} 
                                            />
                                        )
                                    })
                                }

                            </div>

                            <div className='mt-10'><Heading Name={'Tags'}/></div>
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

                            <div className='mt-10'><Heading Name={'Category'}/></div>

                            <div className='mt-8'>
                                <Link to={'/category/Lifestyle'} className='px-5 py-4 flex justify-between bg-slate-50 border-2  hover:text-white hover:bg-orange-600'>
                                    <p className='text-xs font-semibold'>LIFE STYLE</p>
                                </Link>
                                <Link to={'/category/Photos'} className='px-5 py-4 flex justify-between bg-slate-50 border-2  hover:text-white hover:bg-orange-600'>
                                    <p className='text-xs font-semibold'>PHOTOS</p>
                                </Link>
                                <Link to={'/category/Videos'} className='px-5 py-4 flex justify-between bg-slate-50 border-2  hover:text-white hover:bg-orange-600'>
                                    <p className='text-xs font-semibold'>VIDEOS</p>
                                </Link>
                                <Link to={'/category/Terrorist'} className='px-5 py-4 flex justify-between bg-slate-50 border-2  hover:text-white hover:bg-orange-600'>
                                    <p className='text-xs font-semibold'>TERRORIST</p>
                                </Link>
                                <Link to={'/category/Trending'} className='px-5 py-4 flex justify-between bg-slate-50 border-2  hover:text-white hover:bg-orange-600'>
                                    <p className='text-xs font-semibold'>TRENDING</p>
                                </Link>
                                <Link to={'/category/Travel'} className='px-5 py-4 flex justify-between bg-slate-50 border-2  hover:text-white hover:bg-orange-600'>
                                    <p className='text-xs font-semibold'>TRAVEL</p>
                                </Link>
                                <Link to={'/category/Health'} className='p-5 flex justify-between bg-slate-50 border-2  hover:text-white hover:bg-orange-600'>
                                    <p className='text-xs font-semibold'>HEALTH</p>
                                </Link>
                            </div>

                            <div className='mt-10'><Heading Name={'Adverts'}/></div>

                            <div className='mt-5'>
                                <div>
                                    <img src={newsImage12} alt="" className='w-full md:w-96' />
                                </div>
                            </div>


                    </div>
                </div>
            </div>

        }
    </div>
  )
}

export default Home