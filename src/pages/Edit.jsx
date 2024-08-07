import React, { useState, useEffect } from 'react';
import { Heading } from '../components/reuse/Reuse';
import axios from 'axios';
import { RotatingLines } from 'react-loader-spinner';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useUserContext } from '../context/user';
import { useNavigate, useParams } from 'react-router-dom';
import { Multiselect } from 'multiselect-react-dropdown';

const UpdatePost = () => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState([]);
    const [content, setContent] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [isFeatured, setIsFeatured] = useState(false);
    const [isSpecial, setIsSpecial] = useState(false);
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState('');
    const maincategory = category[0]?.value;
    const { usernames, userEmail, login } = useUserContext();
    const navigate = useNavigate();
    const { postId } = useParams(); 

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

    useEffect(() => {
        if ( !userEmail || !login) {
            navigate('/');
        }
        const fetchPost = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKENDURL}/fullpost/${postId}`);
                if (response.status === 200) {
                    const data = response.data.post;
                    setTitle(data.title);
                    setCategory([{ value: data.category }]);
                    setContent(data.content);
                    setSelectedTags(data.tags.map(tag => ({ value: tag })));
                    setIsFeatured(data.isFeatured);
                    setIsSpecial(data.isSpecial);
                    // Handle existing image if necessary
                }
            } catch (error) {
                console.error('Error fetching post data', error);
            }
        };

        fetchPost();
    }, [postId]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (content.replace(/<(.|\n)*?>/g, '').trim().length < 100) {
            setError('Content must be at least 100 characters long.');
            return;
        }
        setLoader(true);

      

        try {
            const result = await axios.put(`${process.env.REACT_APP_BACKENDURL}/updatePost/${postId}`, {
                title,
                maincategory,
                content,
                author: usernames,
                email: userEmail,
                tags: selectedTags.map(tag => tag.value),
                isSpecial,
                isFeatured
            });

            if (result.status === 200) {
                setLoader(false);
                alert('Post updated successfully');
                navigate('/');
            }
        } catch (error) {
            setLoader(false);
            console.log('Error updating post');
        }
    };


    return (
        <div className="px-20 lg:px-5">
            <Heading Name={'Update Post'} />
            <div className="grid grid-cols-5 md:block">
                <div className="col-span-3">

                    <div className='mt-10 flex gap-1 items-center'>
                        <p className='text-sm font-semibold'>Updated by</p>
                        <p className='text-lg text-orange-600 font-bold'>{usernames}</p>
                    </div>

                    <form className="flex flex-col gap-5" onSubmit={handleFormSubmit}>
                        <div className="mt-3 flex flex-col">
                            <label className="text-orange-600 text-sm font-semibold" htmlFor="title">Post Title</label>
                            <input
                                id="title"
                                type="text"
                                value={title}
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
                            <label className="text-orange-600 text-sm font-semibold" htmlFor="image">Post image (optional)</label>
                            <p className='bg-orange-100 text-orange-600 p-2 text-xs mt-2'><strong className='mr-2'>Note:</strong>Uploaded images can not be edited or deleted </p>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-orange-600 text-sm font-semibold" htmlFor="content">Post Content</label>
                            <ReactQuill value={content} onChange={(newValue) => setContent(newValue)} required />
                            {error && <p className="text-red-600 text-xs mt-2">{error}</p>}
                        </div>
                        <div className='flex flex-wrap gap-5'>
                            <div className='flex gap-3 items-center'>
                                <label className="text-orange-600 text-sm font-semibold" htmlFor="sponsored">Set as Sponsored Post:</label>
                                <input type="radio" checked={isSpecial} onChange={handleCheckSponsored} name='check' id='sponsored'/>
                            </div>
                            <div className='flex gap-3 items-center'>
                                <label className="text-orange-600 text-sm font-semibold" htmlFor="featured">Set as Featured Post:</label>
                                <input type="radio" checked={isFeatured} onChange={handleCheckFeatured} name='check' id='featured'/>
                            </div>
                            <div className='flex gap-3 items-center'>
                                <label className="text-orange-600 text-sm font-semibold" htmlFor="none">None</label>
                                <input type="radio" name='check' id='none' checked={!isSpecial && !isFeatured} />
                            </div>
                        </div>

                        <button type="submit" className="bg-orange-600 text-white py-2 font-bold hover:bg-orange-700">Update Post</button>
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

export default UpdatePost;
