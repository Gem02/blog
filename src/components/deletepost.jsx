import React from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'


const DeletePost = ({postId}) =>{
    const navigate = useNavigate();

    const deletenow = async (postId) =>{
        try {
            const result = await axios.delete(`${process.env.REACT_APP_BACKENDURL}/delete/${postId}`);
            if (result.status === 200) {
                alert('Post deleted successfully');
                navigate('/news');
            }
            
    } catch (error) {
        console.log('sorry post was not deleted');
    }
    }
    
    return (
        <div>
            <button onClick={() => deletenow(postId)} className='px-2 py-1 text-xs hover:bg-slate-300 bg-slate-200'>Delete Post</button>
        </div>
    )
}

export default DeletePost;