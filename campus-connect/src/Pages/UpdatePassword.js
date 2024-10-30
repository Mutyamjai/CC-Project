
import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaLongArrowAltLeft } from "react-icons/fa";
import Spinner from '../Components/Common/Spinner';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {GoEye, GoEyeClosed} from "react-icons/go";
import { reset_password } from '../Services/Service_Functions/auth';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { set_loading } from '../Slices/authSlice';
import { useNavigate } from 'react-router-dom';

export default function UpdatePassword() {

    const {register, handleSubmit, formState:{errors}} = useForm();
    const {loading} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const {id} = useParams();

    const [x, setX] = useState("password");
    const [xx, setXX] = useState("password");

    function eyehandler1(event){
        event.preventDefault();
        if(x === "password")
            setX("text")
        else    
            setX("password");
    }

    function eyehandler2(event){
        event.preventDefault();
        if(xx === "password")
            setXX("text")
        else    
            setXX("password");
    }

    async function on_submit(data){

        dispatch(set_loading(true));
        await reset_password(data.password, data.confirm_password, id, navigate);
        dispatch(set_loading(false));
    }

    if(loading)
        return (<Spinner/>);

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gray-950 overflow-hidden">
            {
            <div className="absolute inset-0 bg-[url('./Assets/signup_bckground.jpg')] bg-cover bg-center overflow-hidden ">
                <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-800 to to-black opacity-80 overflow-hidden">
                    <div className="relative z-10 w-full h-full flex items-center justify-center">
                        <div className="bg-black rounded-lg p-5 w-11/12 md:w-3/4 lg:w-full lg:max-w-lg mx-auto shadow-lg">
                            <div className='flex-1 flex flex-col items-center justify-center min-h-full'>
                
                                                    <form onSubmit={handleSubmit(on_submit)} className=''>
                                                        <div className='text-4xl text-bold text-white '>Change Your Password </div>

                                                        <div className='text-[18px] opacity-60 text-white mt-3'>
                                                                <p>
                                                                    Enter your new password and you are all set.
                                                                </p>
                                                        </div>

                                                        <div className="flex flex-col gap-4 w-full justify-between">
                                                            <div className="flex flex-col">
                                                                <label className="text-[16px] text-white mt-2">New Password <sup className="text-red-700">*</sup></label>
                                                                <div className="relative flex items-center">
                                                                    <input type={x} 
                                                                        placeholder="Enter Password" 
                                                                        name="password"
                                                                        {...register('password', {
                                                                            required: {
                                                                                value: true, message: "Password is Required"
                                                                            },
                                                                            minLength:{
                                                                                value: 5, message: "Password should contain atleast 5 characters"
                                                                            },
                                                                        })}
                                                                        className="px-2 py-3 mt-1 rounded-md w-full bg-richblack-800 border-b-[1px] border-pure-greys-200 "></input>
                                                                    <button className="absolute right-0 rounded-md p-2 mt-1 bg-grey-600" onClick={eyehandler1}>
                                                                    {
                                                                        (x === "password") ? <GoEye></GoEye> : <GoEyeClosed></GoEyeClosed>
                                                                    }
                                                                    </button>
                                                                </div>
                                                                {errors.password && <p className='text-[#FF0000] text-[15px]'>{errors.password.message}</p>}
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <label className="text-[16px] text-white ">Confirm Password <sup className="text-red-700">*</sup></label>
                                                                <div className="relative flex items-center">
                                                                    <input type={xx}
                                                                        placeholder="Confirm Password" 
                                                                        name="confirm_password"
                                                                        {...register('confirm_password', {
                                                                            required: {
                                                                                value: true, message: "Confirm Password is Required"
                                                                            },
                                                                            minLength:{
                                                                                value: 5, message: "Confirm Password should contain atleast 5 characters"
                                                                            },
                                                                        })}
                                                                        className="px-2 py-3 rounded-md w-full bg-richblack-800 border-b-[1px] border-pure-greys-200 mb-3"></input>
                                                                    <button className="absolute right-0 rounded-md p-2 mt-1 bg-grey-600" onClick={eyehandler2}>
                                                                    {
                                                                        (xx === "password") ? <GoEye></GoEye> : <GoEyeClosed></GoEyeClosed>
                                                                    }
                                                                    </button>
                                                                </div>
                                                                {errors.confirm_password && <p className='text-[#FF0000] text-[15px]'>{errors.confirm_password.message}</p>}
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <button type='submit' className='w-full py-3 px-2 bg-green-500 rounded-md text-black font-bold mt-2'>
                                                                Reset Password
                                                            </button>
                                                        </div>

                                                        <Link to={"/"} className='flex items-center gap-2'>
                                                            <FaLongArrowAltLeft />
                                                            <p>Back to login</p>
                                                        </Link>
                                                    </form>
                            </div>                        
                        </div>                            


                    </div>                                
                </div>                                    

            </div>                                        
                
            }
        </div>
    )
}
