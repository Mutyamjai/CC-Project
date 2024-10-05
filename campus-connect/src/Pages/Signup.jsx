import React from 'react'
import { useSelector } from "react-redux";
import Spinner from "../Components/Common/Spinner";
import { Link } from 'react-router-dom';
import {useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react'
import {GoEye, GoEyeClosed} from "react-icons/go";
import toast from 'react-hot-toast';
import {set_loading, set_signup_data} from '../Slices/authSlice';
import { send_otp } from '../Services/Service_Functions/auth';


export default function Signup() 
{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {register, handleSubmit, formState: {errors}} = useForm();
    const {loading} = useSelector((state) => state.auth);
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
    const on_submit = async (data) => {
        console.log(data)
        if(data.password !== data.confirm_password)
            toast.error("PASSWORD AND CONFIRM PASSWORD ARE NOT SAME");
        else{
            dispatch(set_loading(true));
            
            dispatch(set_signup_data(data));
            await send_otp(data.email, navigate);

            dispatch(set_loading(false));
        }
    }

    if(loading)
        return (<Spinner/>);

    return (
        
    <div className="relative h-screen flex items-center justify-center bg-gray-950">
      <div className="absolute inset-0 bg-[url('./Assets/signup_bckground.jpg')] bg-cover bg-center ">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-800 to to-black opacity-80">
        <div className="relative z-10 w-full h-full flex items-center justify-center">
                    {/* <div className="flex w-full h-full max-w-4xl mx-auto p-6 text-white bg-black bg-opacity-50 rounded"> */}
                    <div className="bg-black rounded-lg p-5 w-11/12 md:w-3/4 lg:w-full lg:max-w-lg mx-auto shadow-lg">
                        <div className='flex-1 flex flex-col items-center justify-center'>
            <div className='text-white'>
                <p className='text-4xl mb-1 font-semibold overflow-y-hidden' >Create New Account</p>
                      
                <div className='text-blue-700 mb-2 flex gap-2'>
                <p className='text-l text-white'>Already a member?</p> 
                    <Link to = '/Login'>Login</Link>
                </div>

                <form onSubmit={handleSubmit(on_submit)}>
                    <div className='form-group mt-4'>
                        <label htmlFor="role" className='block text-white-700'>Select your role <sup className="text-red-500">*</sup>  </label>
                        <select id="account_type" {...register('account_type')} defaultValue="Student" className="block w-full mt-1 p-1 border rounded text-black ">
                            <option value="Student">Student</option>
                            <option value="Laundry">Laundry</option>
                            <option value="Cycle_admin">Cycle</option>
                            <option value="Canteen_admin">Canteen</option>
                        </select>
                    </div>
                            <div className='mt-2'>
                                <label htmlFor='user_name'>Username <sup className="text-red-500">*</sup> </label>
                                <br/>
                                <input type="text" name="user_name" 
                                    {...register('user_name', {required: true})}
                                    placeholder="Enter Username" className="block w-full mt-1 p-1 border border-gray-300 rounded bg-white appearance-none text-black">
                                </input>
                                {errors.first_name && <p className='text-[#FF0000] text-[15px]'>UserName is required</p>}
                            </div>
                            <div className="mt-2">
                                <label className="text-[16px] block">Email Address<sup className="text-red-500">*</sup>  </label>
                                <input type="email"
                                 name="email" 
                                {...register('email', {required: true})}
                                placeholder="Enter Email Address" className="block w-full mt-1 p-1 border rounded text-black">     
                                </input>
                                {errors.email && <p className='text-[#FF0000] text-[15px]'>Email Address is required</p>}
                            </div>
                            <div className="mail flex flex-col mt-2">
                                <label className="text-[16px]">Contact Number <sup className="text-red-500">*</sup>  </label>
                                <input type="number" name="contact_number" 
                                    {...register('contact_number', {
                                        required: {
                                            value: true, message: "Contact Number is Required"
                                        },
                                        minLength:{
                                            value: 10, message: "Invalid Number!!!!"
                                        },
                                        maxLength: {
                                            value: 12, message: "Invalid Number!!!"
                                        }
                                    })}
                                    placeholder="Enter your mobile number" className="block w-full mt-1 p-1 border rounded text-black"></input>
                                {errors.contact_number && <p className='text-[#FF0000] text-[15px]'>{errors.contact_number.message}</p>}
                            </div>
                            <div className="mt-2">
                                <div className="">
                                    <label className="text-[16px]">Create Password <sup className="text-red-500">*</sup> </label>
                                    <div className="relative">
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
                                            className="block w-full mt-1 p-1 pr-10 border rounded text-black"></input>
                                        <button className="absolute top-1/2 right-5 transform -translate-y-1/2 text-black" onClick={eyehandler1}>
                                        {
                                            (x === "password") ?  <GoEyeClosed></GoEyeClosed> : <GoEye></GoEye>
                                        }
                                        </button>
                                    </div>
                                    {errors.password && <p className='text-[#FF0000] text-[15px]'>{errors.password.message}</p>}
                                </div>
                                <div className="mt-2">
                                    <label className="text-[16px] ">Confirm Password <sup className="text-red-500">*</sup> </label>
                                    <div className="relative">
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
                                            className="block w-full mt-1 p-1 border rounded text-black"></input>
                                        <button className="absolute top-1/2 right-5 transform -translate-y-1/2 text-black" onClick={eyehandler2}>
                                        {
                                            (xx === "password") ? <GoEyeClosed></GoEyeClosed> : <GoEye></GoEye> 
                                        }
                                        </button>
                                    </div>
                                    {errors.confirm_password && <p className='text-[#FF0000] text-[15px]'>{errors.confirm_password.message}</p>}
                                </div>
                            </div>

                            <div className='flex justify-center'>
                                <button type='submit' className='bg-green-500 text-white p-2 rounded mt-4 px-4 '>
                                    Create Account
                                </button>   
                            </div>
                               
                        </form>
                        </div>
                        </div>
                    </div>
                 </div> 
                 </div>
                 </div>
                 </div> 
                //  </div>
                );
            }
