import React from 'react'
import { useSelector } from "react-redux";
import Spinner from "../Components/Common/Spinner";
import { Link } from 'react-router-dom';
import {useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react'
import {GoEye, GoEyeClosed} from "react-icons/go";

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
                        <form onSubmit={handleSubmit()}>
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
                                <label htmlFor='user_name'>First name</label>
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
