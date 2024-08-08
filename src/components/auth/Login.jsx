import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import{useUserContext} from '../../context/user';
import { RotatingLines } from 'react-loader-spinner';


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ErrorLogin, setErrorLogin] = useState('');
    const {setUserEmail, setUserNames, setLogin} = useUserContext();
    const [loader, setLoader] = useState(false);

    axios.defaults.withCredentials = true;

    const navigate = useNavigate()

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setLoader(true);
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKENDURL}/login`, {email, password}, {withCredentials: true});
           
            if(response.data.login){
               setLogin(true);
               setLoader(false);
               setUserEmail(response.data.user.email);
               setUserNames(response.data.user.names);
               navigate('/news');
            }

        } catch (error) {
            setLoader(false);
            setErrorLogin('Invalid Login details')
        }
        
    }

  return (
    <div className=' h-dvh w-full flex justify-center items-center'>
        <div className='p-7 shadow-xl w-full max-w-lg'>
            <form onSubmit={handleSubmit}>
                <p className='font-bold text-2xl mb-2'>Login</p>
                <p className=' text-red-600 text-sm'>{ErrorLogin}</p>
                <div className='flex flex-col mt-3'>
                    <label htmlFor="email" className='font-semibold text-sm text-slate-700'>Email</label>
                    <input type="email" className='text-sm border-2 mt-1 p-2'  placeholder='Enter email' id='email' onChange={(text) => setEmail(text.target.value)} />
                </div>
                <div className='flex flex-col mt-3'>
                    <label htmlFor="password" className=' font-semibold text-sm text-slate-700'>Password</label>
                    <input type="password" className='text-sm border-2 mt-1 p-2'  placeholder='Enter password' id='password' onChange={(text) => setPassword(text.target.value)} />
                </div>
                <p className='text-sm'>Don't have an account yet? <Link to={'/register'} className='text-orange-600 font-semibold'>Register here</Link></p>
                <button type='submit' className='w-full mt-5 hover:bg-orange-800 bg-orange-600 p-2 font-bold text-sm text-white'>SUBMIT</button>
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
            </form>
        </div>
    </div>
  )
}

export default Login