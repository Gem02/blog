import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import{useUserContext} from '../../context/user';

const LogoutButton = () => {
    const navigate = useNavigate();
    const {setLogin} = useUserContext(); 

    const handleLogout = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_BACKENDURL}/logout`, {}, { withCredentials: true });
           setLogin(false);
            navigate('/login');
        } catch (error) {
            console.error('Logout failed');
        }
    };

    return (
        <button onClick={handleLogout} className='logout-button font-semibold text-sm bg-slate-100 p-1 rounded-lg'>
            Logout
        </button>
    );
};

export default LogoutButton;
