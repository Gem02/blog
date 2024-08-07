import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { RotatingLines } from 'react-loader-spinner';

const Register = () => {
  const [names, setNames] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [emailError, setEmailError] = useState('');
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    if (!names.trim()) {
      errors.names = 'Fullname is required';
    }
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    return errors;
  };

  const sanitizeInput = (input) => {
    const sanitized = input.replace(/<[^>]*>?/gm, '');
    return sanitized;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    const sanitizedNames = sanitizeInput(names);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedPassword = sanitizeInput(password);
    setLoader(true);

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKENDURL}/register`, {
        names: sanitizedNames,
        email: sanitizedEmail,
        password: sanitizedPassword
      });

      if (response.status === 200) {
        setLoader(false);
        alert('Registration successful');
        navigate('/login');
      } else {
        setLoader(false);
        alert('Registration failed');
      }
    } catch (error) {
      setLoader(false);
      setEmailError(error.response?.data)
    }
  };

  return (
    <div className='h-dvh w-full flex justify-center items-center'>
      <div className='p-7 shadow-xl w-full max-w-lg'>
        <form onSubmit={handleSubmit}>
          <p className='font-bold text-2xl mb-2'>Registration</p>
          <div className='flex flex-col mt-2'>
            <label htmlFor="names" className='font-semibold text-sm text-slate-700'>Fullname</label>
            <input
              type="text"
              className='text-sm font-semibold focus:outline-none border-2 mt-1 p-2'
              placeholder='Enter Fullname'
              id='names'
              value={names}
              onChange={(e) => setNames(e.target.value)}
            />
            {errors.names && <span className="text-red-500 text-sm">{errors.names}</span>}
          </div>
          <div className='flex flex-col mt-3'>
            <label htmlFor="email" className='font-semibold text-sm text-slate-700'>Email</label>
            <input
              type="email"
              className='text-sm border-2 mt-1 p-2'
              placeholder='Enter email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
            {emailError && <span className="text-red-500 text-sm">{emailError}</span>}
          </div>
          <div className='flex flex-col mt-3'>
            <label htmlFor="password" className='font-semibold text-sm text-slate-700'>Password</label>
            <input
              type="password"
              className='text-sm border-2 mt-1 p-2'
              placeholder='Enter password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
          </div>
          <p className='text-sm'>Have an account already? <Link to={'/login'} className='text-orange-600 font-semibold'>Login here</Link></p>
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
  );
};

export default Register;
