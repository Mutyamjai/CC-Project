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

          localStorage.setItem("token", JSON.stringify(result.user.token));
          localStorage.setItem("user_details", JSON.stringify(result.user));

      }

      dispatch(set_loading(false));
  }

  if(loading){
    return (<Spinner/>)
  }

  return (
    <div>
        <form onSubmit={handleSubmit(on_submit)}>
            
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
                    
                <div>
                    <Link to="/Reset_Password">Forgot Password???</Link>
                </div>
            </div>
            <button type='submit' className=''>
                Log in
            </button>
        </form>
    </div>
  )
}
