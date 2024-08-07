import React, {useState, useEffect} from 'react';
import {TiSocialFacebook, TiSocialTwitter, TiSocialInstagram} from 'react-icons/ti';
import {IoSearchSharp, IoAddSharp} from 'react-icons/io5';
import {Link, useNavigate} from 'react-router-dom';
import { TbMenu } from 'react-icons/tb';
import Menusidebar from '../Menusidebar';
import {useMenuBar} from '../../context/MenuBarContext';
import{useUserContext} from '../../context/user';
import LogoutButton from '../auth/Logout'
import axios from 'axios';



const SearchBar = () =>{

    
    const [query, setQuery] = useState('');
    const navigate = useNavigate();


    const handleSearch = async () =>{

        if (query !== '') {
            navigate(`/search/${query}`);
        }
    }

    return (
        <>
            <div className=' w-full flex h-fit p-4 bg-white justify-center'>
                <div className='flex w-3/5 sm:w-10/12 p-3 border-2 justify-between gap-3 bg-white'>
                    <input type="text" onChange={val => setQuery(val.target.value)} placeholder='Search here...' className='w-full focus:outline-none'/>
                    <IoSearchSharp size={20} className=' cursor-pointer' onClick={handleSearch}/>
                </div>
            </div>
        </>
    )
} 

const Header = () => {

    const {setShowSideBar} = useMenuBar();
    const {usernames, login} = useUserContext();
    const [ShowSearch, setShowSearch] = useState(false);
    const [dateInfo, setDateInfo] = useState({
        year: '',
        month: '',
        num: '',
        day: ''
    })

    useEffect(() => {
        const date = new Date();
        const currentYear = date.getFullYear();
        const number = date.getDate();

        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const dayNames = [
            "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
        ];

        const currentMonth = monthNames[date.getMonth()]; 
        const currentDay =  dayNames[date.getDay()];

        setDateInfo({
            year: currentYear,
            month: currentMonth,
            num: number,
            day: currentDay
        });

        axios.defaults.withCredentials = true;

    }, []);

  return (
    <div className='xsm:fixed bg-white z-50 w-full left-0 top-0 overflow-hidden'>
        <div className='bg-black flex justify-between px-20 lg:px-5 py-3 sm:items-center sm:flex-col xsm:hidden'>
            <div>
                <p className='text-white font-semibold'>{dateInfo.day} {dateInfo.num} {dateInfo.month}, {dateInfo.year}</p>
            </div>
            <div className='flex justify-center gap-10 sm:gap-2'>
                <div> { login?
                    <div className='flex gap-4'>
                        <p className='text-white font-semibold hover:text-orange-400'>{usernames}</p>
                        <Link to={'/newpost'} className='text-white font-semibold  hover:text-orange-400'>Create Post</Link>
                    </div>
                    :

                    <ul className='flex gap-4'>
                        <li><Link to={'/contact'} className='text-white font-semibold hover:text-orange-400'>Contact Us</Link></li>
                        <li><Link to={'/login'} className='text-white font-semibold hover:text-orange-400'>Login/</Link><Link to={'/register'} className='text-white font-semibold hover:text-orange-400'>Register</Link></li>
                    </ul>
                
                }
                </div>
                <div className='flex'>
                    <Link to={'/'} ><TiSocialFacebook  color='white' size={25} className='cursor-pointer hover:bg-orange-400'/></Link>
                    <Link to={'/'} ><TiSocialTwitter color='white' size={25}  className='cursor-pointer hover:bg-orange-400'/></Link>
                    <Link to={'/'} ><TiSocialInstagram  color='white' size={25} className='cursor-pointer hover:bg-orange-400'/></Link>
                    {login? <LogoutButton /> : null}
                </div>
            </div>
        </div>
        <div className='px-20 lg:px-5 sm:flex items-center gap-3 flex justify-between py-2  bg-gray-100'>
            <div className='xsm:block hidden cursor-pointer'><TbMenu size={25} onClick={() => setShowSideBar((current) => !current)} /></div>
            <div><Link to={'/'} className='text-4xl h-full sm:text-2xl'><strong className='text-orange-600'>GEM</strong>TECH</Link></div>
            {
                login ?
                <div className=' hidden xsm:flex ml-auto gap-2 '>
                    <Link to={'/newpost'} ><IoAddSharp size={30}/></Link>
                    <LogoutButton />
                </div>
                :
                <div className=' hidden xsm:block ml-auto'><Link to={'/login'} className=' text-sm font-bold py-1 px-3 border-2 rounded-sm'>Login</Link></div>
        
            }
            
            <div className='gap-5 flex justify-between xsm:hidden items-center'>
                <ul className='flex gap-7 sm:gap-3'>
                    <li><Link to={'/'} className='font-bold hover:text-orange-600 sm:text-xs'>HOME</Link></li>
                    <li><Link to={'/about'} className='font-bold hover:text-orange-600 sm:text-xs'>ABOUT</Link></li>
                    <li><Link to={'/news'} className='font-bold hover:text-orange-600 sm:text-xs'>NEWS</Link></li>
                    <li><Link to={'/contact'} className='font-bold hover:text-orange-600 sm:text-xs'>CONTACT</Link></li>
                </ul>
            
            <div><IoSearchSharp onClick={() => setShowSearch(!ShowSearch)} className='cursor-pointer text-2xl sm:xl' /></div>
            
        </div>
        
        
        </div>
        
        <Menusidebar />

        {ShowSearch ? <SearchBar /> : '' }

        
        
    </div>
  )
}

export default Header