import React, {useState, useEffect} from 'react'
import {MdLocationOn, MdLocalPhone} from 'react-icons/md'
import {BiSolidEnvelope} from 'react-icons/bi';
import axios from 'axios';
import {useUserContext} from '../context/user';
import { RotatingLines } from 'react-loader-spinner';

const Contact = () => {

    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [message, setmessage] = useState('');
    const [subject, setsubject] = useState('');
    const {setLogin, login} = useUserContext();
    const [loader, setLoader] = useState(false);

    useEffect(() => {

        const fetchUser = async () =>{
          try {
            const response = await axios.get(`${process.env.REACT_APP_BACKENDURL}/userInfo`);
            if (response.status === 200) {
              console.log('You are logged in');
            }else {
              console.log('You need login');
            }
      
          } catch (error) {
            console.log('not logged in');
            setLogin(false);
          }
        }
        
        fetchUser()
        
    
      }, [setLogin])
    
    const handlesubmit = async (e) =>{
        e.preventDefault();
        if (login) {
         setLoader(true);
            try {
                const response = await axios.post(`${process.env.REACT_APP_BACKENDURL}/contact`, { name, email, message, subject });
                if (response.status === 200) {
                    setLoader(false);
                    alert('Emaile sent successfully');
                    setemail('');
                    setname('');
                    setmessage('');
                    setsubject('');
                }
                setLoader(false);

            } catch (error) {
                setLoader(false);
                alert('sorry something went wrong. Try again later');
            }
        } else {
            
            alert('You need to login First')
        }
    }

  return (
    <div className='px-20 lg:px-5 mt-5 xsm:mt-14'>
        <div className='grid grid-cols-3 gap-5 md:block'>

            <div className=' col-span-2'>
                <div className=' bg-slate-50 p-5 sm:px-2 mt-5'>
                        <RotatingLines
                            visible={loader}
                            height="50"
                            width="50"
                            color="red"
                            strokeWidth="5"
                            animationDuration="0.75"
                            ariaLabel="rotating-lines-loading"
                        />
                    <p className=' text-3xl font-bold'>Contact Me</p>
                    <p className=' text-slate-500 mb-7'>Don't worry your email address will not be published.</p>
                    <form onSubmit={handlesubmit}>
                        <div>
                            <div className='flex w-full gap-3 xsm:block'>
                                <div className='flex flex-col w-full'>
                                    <label htmlFor="name">Name:</label>
                                    <input type="text" value={name} onChange={ val => setname(val.target.value)} placeholder='Enter name' id='name' className='p-2 mt-1 w-full border-2' required/>
                                </div>
                                <div className='flex flex-col w-full'>
                                    <label htmlFor="email">Email</label>
                                    <input type="email" value={email} onChange={ val => setemail(val.target.value)} placeholder='Enter email' id='email' className='p-2 mt-1 w-full border-2' required/>
                                </div>
                                
                            </div>

                            <div className='flex flex-col w-full'>
                                <label htmlFor="subject">Subject:</label>
                                <input type="text" required value={subject} onChange={ val => setsubject(val.target.value)} placeholder='Enter Subject' id='name' className=' font-bold p-2 mt-1 w-full border-2' />
                            </div>
                            
                            <div className='mt-5 flex flex-col'>
                                <label htmlFor="message">Message:</label>
                                <textarea className='p-3 mt-1 w-full border-2' value={message} onChange={ val => setmessage(val.target.value)} name="message" id="message" cols="30"  rows="5" required ></textarea>
                            </div>

                            <button type="submit" className='mt-3 hover:bg-orange-700 font-bold text-xs px-4 py-2 bg-orange-600 text-white'>SEND</button>
                        </div>
                    </form>
                </div>
            </div>
            

            <div className=' col-span-1'>
                <p className=' font-bold text-2xl mt-4'>Location Info</p>
                <div className='mt-5'>
                    <div className='flex gap-3 lg:gap-2 mt-3 items-center'>
                        <div className='p-2 border-2'><MdLocationOn size={30} /></div>
                        <p className='font-semibold lg:text-sm lg:font-bold'>PO Box 930272 Diye Zarmaganda, Jos Plateau State Nigeria </p>
                    </div>
                    <div className='flex gap-3 lg:gap-2 mt-5 items-center'>
                        <div className='p-2 border-2'><MdLocalPhone size={30} /></div>
                        <p className='font-semibold lg:text-sm lg:font-bold'>+234 814 9342 531 0r +234 901 9606 073 </p>
                    </div>
                    <div className='flex gap-3 lg:gap-2 mt-5 items-center'>
                        <div className='p-2 border-2'><BiSolidEnvelope size={30} /></div>
                        <p className='font-semibold lg:text-sm lg:font-bold'>mangaigodwin@gmail.com</p>
                    </div>
                </div>
            </div>
        </div>

        

    </div>
  )
}

export default Contact