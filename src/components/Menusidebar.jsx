import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { useMenuBar } from '../context/MenuBarContext'

const Menusidebar = () => {

    const {showSideBar, hideMenu} = useMenuBar()
    
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        if (query !== '') {
            hideMenu();
            navigate(`/search/${query}`);
        }
    };

    return (
        <div className={showSideBar ? 'fixed w-9/12 z-50 h-full pt-5 top-18 bg-white left-0 sm:block hidden' : 'hidden'}>
            <div className='p-2'>
                <div className='shadow-lg flex items-center w-full justify-between p-2'>
                    <input
                        type='search'
                        name='search'
                        value={query}
                        onChange={val => setQuery(val.target.value)}
                        placeholder='Search here'
                        className='focus:outline-none w-full px-2 text-sm'
                    />
                    <BsSearch size={'20px'} color='gray' onClick={handleSearch} />
                </div>
            </div>
            <div className='p-3 flex flex-col w-full relative'>
                <div className='absolute cursor-pointer -right-2 top-4 flex items-center justify-center bg-white shadow-lg h-7 w-7 rounded-full'>
                    <MdKeyboardArrowLeft size={25} className='mr-0.5' onClick={() => hideMenu()} />
                </div>
                <Link to={'/'} onClick={() => hideMenu() } className='py-2 hover:bg-orange-50 px-2 w-full font-bold text-sm hover:text-orange-600'>
                    HOME
                </Link>
                <Link to={'/about'} onClick={() => hideMenu() } className='py-2 hover:bg-orange-50 px-2 w-full font-bold text-sm hover:text-orange-600'>
                    ABOUT
                </Link>
                <Link to={'/news'} onClick={() => hideMenu() } className='py-2 hover:bg-orange-50 px-2 w-full font-bold text-sm hover:text-orange-600'>
                    NEWS
                </Link>
                <Link to={'/contact'} onClick={() => hideMenu() } className='py-2 hover:bg-orange-50 px-2 w-full font-bold text-sm hover:text-orange-600'>
                    CONTACT
                </Link>
            </div>
        </div>
    );
};

export default Menusidebar;
