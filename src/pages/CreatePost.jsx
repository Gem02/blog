import React, { useState, useEffect } from 'react';
import { Heading } from '../components/reuse/Reuse';
import axios from 'axios';
import { RotatingLines } from 'react-loader-spinner';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useUserContext } from '../context/user';
import { useNavigate } from 'react-router-dom';
import { Multiselect } from 'multiselect-react-dropdown';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState([]);
    const [content, setContent] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [isFeatured, setIsFeatured] = useState(false);
    const [image, setImage] = useState(null);
    const [isSpecial, setIsSpecial] = useState(false);
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState('');
    const maincategory = category[0]?.value;
    const { usernames, userEmail, setLogin } = useUserContext();
    const navigate = useNavigate();

    const tagsOption = [
        { value: 'Sports', key: 1 },
        { value: 'Programming', key: 2 },
        { value: 'Frameworks', key: 3 },
        { value: 'Travel', key: 4 },
        { value: 'Politics', key: 5 },
        { value: 'Health', key: 6 },
        { value: 'Web3', key: 7 },
        { value: 'Games', key: 8 },
        { value: 'Music', key: 9 },
        { value: 'Awards', key: 10 }
    ];

    const categoryOption = [
        { value: 'Sports', key: 1 },
        { value: 'Programming', key: 2 },
        { value: 'Technology', key: 3 },
        { value: 'Politics', key: 4 },
        { value: 'Health', key: 5 }
    ];

    const onSelect = (selectedList, selectedItem) => {
        setSelectedTags(selectedList);
    };

    const onRemove = (selectedList, removedItem) => {
        setSelectedTags(selectedList);
    };

    const onSelectCategory = (selectedList, selectedItem) => {
        setCategory(selectedList);
    };

    const handleCheckSponsored = (e) => {
        setIsSpecial(e.target.checked);
    };

    const handleCheckFeatured = (e) => {
        setIsFeatured(e.target.checked);
    };

    axios.defaults.withCredentials = true;

     useEffect(() => {
        
        const fetchUser = async () =>{
          try {
            const response = await axios.get(`${process.env.REACT_APP_BACKENDURL}/userInfo`);
            if (response.status !== 200) {
                setLogin(false);
              navigate('/login');
            }
          } catch (error) {
            console.log('error an error occured');
            navigate('/login');

          }
        }
        
        fetchUser()
        
    
    }, [])
 
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (content.replace(/<(.|\n)*?>/g, '').trim().length < 50) {
        setError('Content must be at least 50 characters long.');
        return;
        }
        setLoader(true);

        let imageUrl = '';

        if (image) {
            const formData = new FormData();
            formData.append('image', image);

            try {
                const res = await axios.post(`${process.env.REACT_APP_BACKENDURL}/upload`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    withCredentials: true,
                });
                imageUrl = res.data.url;
            } catch (error) {
                
                console.log('Failed to upload image', error);
                setLoader(false);
                alert('Sorry post was not created')
                return;
            }
        }

        try {
            const result = await axios.post(`${process.env.REACT_APP_BACKENDURL}/createPost`, {
                title,
                maincategory,
                content,
                imageUrl,
                author: usernames,
                email: userEmail,
                tags: selectedTags.map(tag => tag.value),
                isSpecial,
                isFeatured
            });

            if (result) {
                setLoader(false);
                alert('post created successfully');
                navigate('/');
                
            }
        } catch (error) {
            setLoader(false);
            console.log('Error creating post');
            
        }
    };

    return (
        <div className="px-20 lg:px-5">
            <Heading Name={'Create post here'} />
            <div className="grid grid-cols-5 md:block">
                <div className="col-span-3">

                    <div className='mt-10 flex gap-1 items-center'>
                        <p className='text-sm font-semibold'>Created by</p>
                        <p className='text-lg text-orange-600 font-bold'>{usernames}</p>
                    </div>

                    <form className="flex flex-col gap-5" onSubmit={handleFormSubmit}>
                        <div className="mt-3 flex flex-col">
                            <label className="text-orange-600 text-sm font-semibold" htmlFor="title">Post Title</label>
                            <input
                                id="title"
                                type="text"
                                placeholder="Enter Post title"
                                onChange={(e) => setTitle(e.target.value)}
                                className="text-sm border-2 border-slate-300 p-1"
                                required
                            />
                        </div>

                        <div className="flex items-start gap-4 md:flex-col">
                            <div>
                                <label className="text-orange-600 text-sm font-semibold" htmlFor="category">Post category</label>
                                <Multiselect 
                                    options={categoryOption}
                                    displayValue='value'
                                    singleSelect={true}
                                    selectedValues={category}
                                    onSelect={onSelectCategory}
                                    style={{
                                        option: {
                                            background: 'rgb(243 244 246)',
                                            padding: '5px 10px',
                                            fontSize: '15px'
                                        }
                                    }}
                                />
                            </div>

                            <div>
                                <label className="text-orange-600 text-sm font-semibold" htmlFor="tags">Post tags</label>
                                <Multiselect 
                                    options={tagsOption} 
                                    displayValue={'value'}
                                    selectedValues={selectedTags}
                                    onSelect={onSelect}
                                    onRemove={onRemove}
                                    style={{
                                        multiselectContainer: {
                                            fontFamily: 'Arial, sans-serif',
                                            width: '100%',
                                        },
                                        chips: {
                                            background: 'rgb(234 88 12)',
                                        },
                                        option: {
                                            background: 'rgb(243 244 246)',
                                            padding: '5px 10px',
                                            fontSize: '15px'
                                        },
                                    }}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-orange-600 text-sm font-semibold" htmlFor="image">Post image</label>
                            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                            <p className='bg-orange-100 text-orange-600 p-2 text-xs mt-2'><strong className='mr-2'>Note:</strong>Please add an image of less then 4mb </p>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-orange-600 text-sm font-semibold" htmlFor="content">Post Content</label>
                            <ReactQuill onChange={(newValue) => setContent(newValue)} required />
                            {error && <p className="text-red-600 text-xs mt-2">{error}</p>}
                        </div>
                        <div className='flex flex-wrap gap-5'>
                            <div className='flex gap-3 items-center'>
                                <label className="text-orange-600 text-sm font-semibold" htmlFor="sponsored">Set as Sponsored Post:</label>
                                <input type="radio" onChange={handleCheckSponsored} name='check' id='sponsored'/>
                            </div>
                            <div className='flex gap-3 items-center'>
                                <label className="text-orange-600 text-sm font-semibold" htmlFor="featured">Set as Featured Post:</label>
                                <input type="radio" onChange={handleCheckFeatured} name='check' id='featured'/>
                            </div>
                            <div className='flex gap-3 items-center'>
                                <label className="text-orange-600 text-sm font-semibold" htmlFor="none"> None</label>
                                <input type="radio" name='check' id='none'/>
                            </div>
                        </div>

                        <button type="submit" className="bg-orange-600 text-white py-1 font-bold hover:bg-orange-700">Submit</button>
                        <RotatingLines
                            visible={loader}
                            height="50"
                            width="50"
                            color="red"
                            strokeWidth="5"
                            animationDuration="0.75"
                            ariaLabel="rotating-lines-loading"
                        />
                    </form>
                </div>

                <div className="col-span-2"></div>
            </div>
        </div>
    );
};

export default CreatePost;
