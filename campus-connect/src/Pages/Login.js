import React from 'react'
import Spinner from '../Components/Common/Spinner'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { set_loading } from '../Slices/authSlice';
import {GoEye, GoEyeClosed} from "react-icons/go";
import { useState } from 'react';

export default function Login() {
  const {register,handleSubmit,formState: {errors}} = useForm();
  const {loading} = useSelector((state) => state.auth);
  const [x, setX] = useState("password");

  function eyehandler1(event){
    event.preventDefault();
    if(x === "password")
        setX("text")
    else    
        setX("password");
  }

  const on_submit = async (data) => {

      
  }

  if(loading){
    return (<Spinner/>)
  }

  return (
    <div>
        <form >
            
            <div>
                <label className=''>Email Address<sup className=''>*</sup></label>
                <input type='email' name='email'
                    {...register('email',{required: true})}
                    placeholder='Enter Email Address' className=''>
                    </input>
                {errors.email && <p className='text-[#FF0000] text-[15px]'>Email Address is required</p>}
            </div>
            <div className=''>
                <label className=''>Create Password <sup className=''>*</sup></label>
                <div className=''>
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
                        className=''></input>
                    <button className='' onClick={eyehandler1}>
                      {
                          (x === "password") ? <GoEye></GoEye> : <GoEyeClosed></GoEyeClosed>
                      }
                    </button>
                </div>
                {errors.password && <p className='text-[#FF0000] text-[15px]'>{errors.password.message}</p>}
            </div>
        </form>
    </div>
  )
}
