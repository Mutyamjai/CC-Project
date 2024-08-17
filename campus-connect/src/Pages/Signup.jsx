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

export default function Signup() {
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
    return (
        <div className="bg-[url('./signup-bckground.jpg')]" >
            {
                loading ? <Spinner/> :
                (
                    <div className='text-black'>
                        <div>abc</div>
                        <p>Create New Account</p>
                        <div>
                            <p>Already a member?</p>
                            <Link to = '/Login'>Login</Link>
                        </div>
                        <form onSubmit={handleSubmit(on_submit)}>
                            <div>
                                <label htmlFor="role">Select your role:</label>
                                <select id="account_type" {...register('account_type')} defaultValue="Student">
                                    <option value="Student">Student</option>
                                    <option value="Dhobi">Dhobi</option>
                                    <option value="Saloon">Saloon</option>
                                    <option value="Cycle">Cycle</option>
                                    <option value="Magaram">Magaram</option>
                                </select>
                            </div>
                            <div className=''>
                                <label htmlFor='user_name'>User name</label>
                                <br/>
                                <input type="text" name="user_name" 
                                    {...register('user_name', {required: true})}
                                    placeholder="Enter User name" className="">
                                </input>
                                {errors.first_name && <p className='text-[#FF0000] text-[15px]'>User Name is required</p>}
                            </div>
                            <div className="">
                                <label className="text-[16px]">Email Address<sup className="">*</sup> </label>
                                <input type="email" name="email" 
                                    {...register('email', {required: true})}
                                    placeholder="Enter Email Address" className="">     
                                </input>
                                {errors.last_name && <p className='text-[#FF0000] text-[15px]'>Email Address is required</p>}
                            </div>
                            <div className="mail flex flex-col">
                                <label className="text-[16px]">Contact Number <sup className="text-pink-300">*</sup> </label>
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
                                    placeholder="Enter your mobile number" className="px-2 py-3 mt-1 rounded-md bg-richblack-800 border-b-[1px] border-pure-greys-200"></input>
                                {errors.contact_number && <p className='text-[#FF0000] text-[15px]'>{errors.contact_number.message}</p>}
                            </div>
                            <div className="">
                                <div className="">
                                    <label className="text-[16px]">Create Password <sup className="">*</sup></label>
                                    <div className="">
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
                                            className=""></input>
                                        <button className="" onClick={eyehandler1}>
                                        {
                                            (x === "password") ? <GoEye></GoEye> : <GoEyeClosed></GoEyeClosed>
                                        }
                                        </button>
                                    </div>
                                    {errors.password && <p className='text-[#FF0000] text-[15px]'>{errors.password.message}</p>}
                                </div>
                                <div className="">
                                    <label className="text-[16px]">Confirm Password <sup className="">*</sup></label>
                                    <div className="">
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
                                            className=""></input>
                                        <button className="" onClick={eyehandler2}>
                                        {
                                            (xx === "password") ? <GoEye></GoEye> : <GoEyeClosed></GoEyeClosed>
                                        }
                                        </button>
                                    </div>
                                    {errors.confirm_password && <p className='text-[#FF0000] text-[15px]'>{errors.confirm_password.message}</p>}
                                </div>
                            </div>
                            <button type='submit' className=''>
                                 Create Account
                            </button>        
                            
                        </form>
                    </div>
                )
            }
        </div>
    )
}
