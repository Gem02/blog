import React, {useState, useEffect} from 'react'
import { FullCard} from '../components/reuse/Reuse'
import {Heading} from '../components/reuse/Reuse';
import axios from 'axios';
import { RotatingLines } from 'react-loader-spinner';


const News = () => {

  const [posts, setPosts] = useState([]);
  const [page, setPages] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loader, setLoader] = useState(true);

  const handlePreviousPage = () =>{
    if(page > 1){
        setPages(page - 1)
    }else {
        alert(`hmmm why... there's no any previous page again`  )
    }
  }

  const handleNextPage = () =>{
      if(page < totalPages){
          setPages(page + 1)
      }else {
          alert(`come on... this is the last page`  )
      }
  }

  useEffect(() =>{
      const fetchPost = async () =>{
          try {
              const response = await axios.get(`${process.env.REACT_APP_BACKENDURL}/getPosts?page=${page}&limit=6`);
              setLoader(false)
              setTotalPages(response.data.totalPages)
                setPosts(response.data.posts);
          } catch (error) {
            setLoader(false)
              console.log('error fetching data');
          }
      }

      fetchPost();

  }, [page]);

  const truncateContent = (content) => {
    return content.length > 100 ? content.substring(0, 100) + '...' : content;
  };

  const createMarkup = (htmlContent) => {
    return { __html: htmlContent };
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className='px-20 lg:px-5 mt-5 xsm:mt-14 overflow-y-hidden'>
        <Heading Name={'News'} />
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
        <div className='flex flex-wrap gap-5 m-5 xsm:mx-0'>
        {posts.map((post) => {
          return (
              <FullCard
                key={post._id}
                CardImage={post.imageUrl}
                CardAuthor={`By ${post.posterDetails.author}`}
                CardDate={formatDate(post.datePosted)}
                CardHeading={post.title}
                CardTagName={post.category}
                CardText={<div dangerouslySetInnerHTML={createMarkup(truncateContent(post.content))} />}
                redirect={post._id}
              />
          );
        })}
        
        </div>
        <div className='w-full flex mt-10 justify-center'>
            <div className="flex gap-3">
                <button onClick={handlePreviousPage} className='bg-slate-200 px-4 font-semibold hover:bg-slate-300 pb-1 leading-6 rounded-sm'>Prev</button>
                <span>Page {page} of {totalPages}</span>
                <button onClick={handleNextPage} className='bg-slate-200 px-4 font-semibold hover:bg-slate-300 pb-1 leading-6 rounded-sm'>Next</button>
            </div>
        </div>
    </div>
  )
}

export default News