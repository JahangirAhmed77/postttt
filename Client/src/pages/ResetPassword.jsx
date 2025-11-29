import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const ResetPassword = () => {


  const {backendurl}=useContext(AppContext)
  axios.defaults.withCredentials = true

  const [email, setemail] = useState('')
  const [newpassword,setnewpassword]=useState('');

  
    
  const navigate = useNavigate()

  
  
  const onSubmitReset=async (e) => {
    e.preventDefault();

    try {
      const {data} = await axios.post('https://postback-mf0d394n.b4a.run/reset-password', {
        email,
        newPassword: newpassword
      });

      if(data.success){
        toast.success(data.message);
        navigate('/login');
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
      
    }
  
  }
   
  return (
    <div className='flex flex-col  justify-center items-center min-h-screen px-6 sm:px-0 bg-[url("/bg_img.png")] bg-cover bg-center'>
      <img onClick={() => navigate('/')} src={assets.logo} alt="" className='absolute left-5 sm:left-25 top-5  w-40 sm:w-60 cursor-pointer' />

      <form onSubmit={onSubmitReset} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm' >

        <h1 className='text-white text-2xl font-semibold text-center mb-4'>Reset Password</h1>
        <p className='text-center mb-6 text-gray-400 '>Enter your email and new password.</p>

        <div className='mb-4 flex  items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333a5c]'>
          <img src={assets.mail_icon} className='w-3 h-3' />
          <input type="email" placeholder='Email Id'
            className='bg-transparent outline-none text-white'
            value={email}
            onChange={(e) => setemail(e.target.value)}
            required
          />
        </div>

        <div className='mb-4 flex  items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333a5c]'>
          <img src={assets.lock_icon} className='w-3 h-3' />
          <input type="password" placeholder='Enter your new password'
            className='bg-transparent outline-none text-white'
            value={newpassword}
            onChange={(e) => setnewpassword(e.target.value)}
            required
          />
        </div>

        <button className='w-full py-2.5 bg-[#339999] text-white rounded-full mt-3'>Submit</button>
      </form>
    </div>
  )
}

export default ResetPassword