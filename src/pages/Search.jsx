import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom'
import axios from 'axios';

const Search = () => {

    const [searchResults, setSearchResults] = useState([]);
    const {query} = useParams();

    const createMarkup = (htmlContent) => {
        return { __html: htmlContent };
    };

    useEffect(() =>{

        const fetchPost = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKENDURL}/search?query=${query}`);
                if (response.status === 200) {
                    setSearchResults(response.data);
                }
            } catch (error) {
                console.log('sorry an error occured');
            }
        }

        fetchPost();
    }, [query])

  return (
    <div className='py-2 px-28 lg:px-5 flex xsm:mt-14 justify-center'>

        <div className=' p-4 bg-slate-50'>
            <p className='text-xs font-semibold'>Search Results for {query}:</p>

            {
                searchResults?.map(result => {
                    return(
                        <div className='my-10 p-2 shadow-lg'>
                            <Link to={`/post/${result?._id}`}  >
                                <h2 className=' line-clamp-1 font-bold text-2xl text-slate-800 sm:text-lg'>{result?.title}</h2>
                                <p className='text-sm sm:text-xs line-clamp-2'>{<div dangerouslySetInnerHTML={createMarkup(result?.content)} />}</p>
                            </Link>
                        </div>
                    )
                })
            }
            
        </div>

    </div>
  )
}

export default Search