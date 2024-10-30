import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { FaLongArrowAltLeft } from "react-icons/fa";
import Spinner from '../Components/Common/Spinner';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { send_reset_password_token } from '../Services/Service_Functions/auth';
import {set_loading} from "../Slices/authSlice"

export default function ResetPassword() {

    const [mail_sent, set_mail_sent] = useState(false);
    const [email, set_email] = useState("");
    const {loading} = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    function change_data(event){
        set_email(event.target.value);
    }

    async function handle_click(event){
        event.preventDefault();
        
        dispatch(set_loading(true));
        await send_reset_password_token(email, set_mail_sent);
        dispatch(set_loading(false));
    }

    if(loading)
        return (<Spinner/>);

    return (
        <div className='w-full h-screen flex items-center justify-center bg-gray-950'>
            {
                <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-[url('./Assets/signup_bckground.jpg')] bg-cover bg-center">
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-800 to-black opacity-80">
                        <div className="relative z-10 w-full h-full flex items-center justify-center">
                            <div className="flex items-start justify-center gap-8">
                                <div className="bg-black bg-opacity-80 rounded-lg p-12 max-w-lg w-full mx-auto shadow-lg">
                                    <div className='flex flex-col items-center justify-center gap-4'>
                                        <div className=' flex flex-col w-11/12 md:w-[400px] h-full justify-center gap-4 mx-auto'>
                                            {
                                                mail_sent ? (<div className='text-3xl font-bold text-white'>
                                                    Please check your mail
                                                </div>) : (<div className='text-3xl font-bold text-white'>
                                                    Reset Your Password 
                                                </div>)
                                            }
                                            {
                                                mail_sent ? (<div className='text-[18px] opacity-60 text-white'>
                                                    We have sent the reset password link to your email {email}
                                                </div>) : (<div className='text-[18px] opacity-60 text-white'>
                                                    Have no fear. We'll email you instructions to reset your password.
                                                    If you dont have access to your email we can try account recovery
                                                </div>)
                                            }
                                            {
                                                (!mail_sent) && (<div className="mail flex flex-col text-white">

                                                    <label className="text-[20px] mb-2 ">Email Address <sup className="text-red-700 ">*</sup> </label>
                                                    <input type="email" name="email" 
                                                        value = {email}
                                                        onChange={change_data}
                                                        placeholder="Enter mail address" className="w-full p-2 text-black flex mb-4"></input>
                                        
                                                </div>)
                                            }
                                            {
                                                <div>
                                                    <button className='bg-green-500 text-black w-full p-3' onClick={handle_click}>
                                                        {mail_sent ? "Resend Email" : "Submit"}
                                                    </button>
                                                </div>
                                            }

                                            <Link to={"/login"} className='flex items-center gap-2 text-blue-700'>
                                                <FaLongArrowAltLeft />
                                                <p>Back to login</p>
                                            </Link>
                                        </div>    
                                    </div>        
                                </div>            
                            </div>                
                        </div>        
                    </div>
                </div></div>
                
            }
        </div>
    )
}