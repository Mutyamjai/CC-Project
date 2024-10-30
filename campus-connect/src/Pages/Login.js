import React from 'react'
import Spinner from '../Components/Common/Spinner'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { set_loading, set_token } from '../Slices/authSlice';
import { set_user_details } from '../Slices/profileSlice';
import {GoEye, GoEyeClosed} from "react-icons/go";
import { useState } from 'react';
import { log_in } from '../Services/Service_Functions/auth';
import { Link } from 'react-router-dom';

export default function Login() {

  const {register,handleSubmit,formState: {errors}} = useForm();
  const {loading} = useSelector((state) => state.auth);
  const [x, setX] = useState("password");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function eyehandler1(event){
    event.preventDefault();
    if(x === "password")
        setX("text")
    else    
        setX("password");
  }

  const on_submit = async (data) => {

      dispatch(set_loading(true));

      const result = await log_in(data.email, data.password, navigate);
      if(result){
          dispatch(set_token(result.user.token));
          dispatch(set_user_details(result.user));
            console.log(result.user);
          localStorage.setItem("token", JSON.stringify(result.user.token));
          localStorage.setItem("user_details", JSON.stringify(result.user));

      }

      dispatch(set_loading(false));
  }

  if(loading){
    return (<Spinner/>)
  }

  return (
    <div className="relative h-screen flex items-center justify-center bg-gray-950">
        <div className="absolute inset-0 bg-[url('./Assets/signup_bckground.jpg')] bg-cover bg-center ">
            <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-800 to to-black opacity-80">
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                    <div className="bg-black rounded-lg p-5 w-11/12 md:w-3/4 lg:w-full lg:max-w-lg mx-auto shadow-lg">
                        <div className='flex-1 flex flex-col items-center justify-center'>
                                    <form onSubmit={handleSubmit(on_submit)}>
                                        
                                        <div>
                                            <h1 className='text-4xl text-white font-semibold mb-4'>Login</h1>
                                            <label className='text-[20px] text-pretty text-bold text-white'>Email Address<sup className='text-red-600'>*</sup></label>
                                            <input type='email' name='email'
                                                {...register('email',{required: true})}
                                                placeholder='Enter Email Address' className='w-full p-2 mt-1 px-2 py-2 rounded-md bg-richblack-800 border-b-[1px] border-pure-greys-200'>
                                                </input>
                                            {errors.email && <p className='text-[#FF0000] text-[15px]'>Email Address is required</p>}
                                        </div>
                                        <div className='mt-3'>
                                            <label className='text-[20px] text-white text-semibold '>Enter Password <sup className='text-red-600'>*</sup></label>
                                            <div className='relative'>
                                                <input type = {x}
                                                    placeholder='Enter Password'
                                                    name='password'
                                                    {...register('password',{
                                                        required:{
                                                            value: true,message:"Password is Required"  
                                                        },
                                                        minLength:{
                                                            value: true, message: "Password is Required"
                                                        },
                                                    })}
                                                    className='px-2 py-2 mt-1 rounded-md w-full bg-richblack-800 border-b-[1px] border-pure-greys-200'></input>
                                                <button className='text-grey-600 absolute right-0 rounded-md p-2 top-2' onClick={eyehandler1}>
                                                {
                                                    (x === "password") ? <GoEye></GoEye> : <GoEyeClosed></GoEyeClosed>
                                                }
                                                </button>
                                            </div>
                                            {errors.password && <p className='text-[#FF0000] text-[15px]'>{errors.password.message}</p>}
                                                
                                            
                                        </div>
                                        <button type='submit' className='bg-green-500 w-full p-2 text-bold text-xl rounded-lg mt-5'>
                                           <p className='font-semibold'>Login</p>
                                        </button>
                                    </form>
                                    <div className="mt-4 text-center text-white text-sm">
                                    <p className="mb-2">Don't have an account? <Link to="/Signup" className='text-blue-300 underline'>Sign up here</Link>.</p>
                                    <p className="mb-2">Forgot your password? <Link to="/Reset_Password" className='text-blue-300 underline'>Reset it Here</Link>.</p>
                                    <p className="mb-2">Need help? <a href="mailto: lnmiitcampusconnect@gmail.com" className='text-blue-300 underline'>Contact support</a>.</p>
                                    </div>
                        </div>            
                    </div>                
                </div>                    
            </div>                        
        </div>                            
    </div>
  )
}
