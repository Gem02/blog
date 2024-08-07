import React, {useEffect} from 'react';
import {Heading} from '../components/reuse/Reuse';
import axios from 'axios';
import {useUserContext} from '../context/user'

const About = () => {

  const {setLogin} = useUserContext();

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
    

  })
  

  return (
    <div className='px-20 lg:px-5 mt-5 xsm:mt-14'>
        <Heading Name={'About Me'}/>
        <p className=' p-3 font-bold text-2xl sm:text-xl text-orange-600'>Crafting Code and Creativity: <span className='text-black'> Exploring Tech with Passion and Precision</span></p>

        <p className=' text-slate-700'>Welcome to my blog! My Name is Godwin Mangai E. A proud industrial Chemist from the prestigious University of Jos Plateau State Nigeria. I'm passionate about technology and creativity, and this blog is one of my side project just to display and showcase my knowledge and experiences in working with MongoDB, Express, React and Node (MERN STACK) and Tailwind CSS for styling..</p>
        
        <p className='mt-5 text-slate-700'>Beyond my technical skills, I'm a firm believer in continuous learning and growth. I'm constantly exploring new technologies and methodologies to stay at the forefront of the industry. </p>

        <p className='text-slate-700 mt-5'>In addition to my passion for development, I'm also open to new opportunities and collaborations. Whether you're looking for a skilled developer to join your team, contribute to a project, or explore a creative partnership, I'm eager to connect and discuss how we can work together to achieve our goals.</p>

        <p className=' text-slate-700 mt-3'> Thank you for visiting my blog. I hope you find inspiration, insights, and practical knowledge that you can apply to your own projects. Feel free to explore, comment, and reach out—I look forward to engaging with you!</p>
    </div>
  )
}

export default About