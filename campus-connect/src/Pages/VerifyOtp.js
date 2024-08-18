
import React from 'react'
import OTPInput from 'react-otp-input';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Spinner from '../Components/Common/Spinner';
import { Link } from 'react-router-dom';
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaClockRotateLeft } from "react-icons/fa6";
import { send_otp } from '../Services/Service_Functions/auth';
import { useDispatch} from 'react-redux';
import { sign_up } from '../Services/Service_Functions/auth';
import { useNavigate } from 'react-router-dom';
import { set_loading } from '../Slices/authSlice';

export default function VerifyOtp() {

    const [otp, set_otp] = useState('');
    const {loading, signup_data} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handle_submit(event){
        event.preventDefault();

        dispatch(set_loading(true));
        console.log(signup_data);

        await sign_up( signup_data.user_name, signup_data.email, signup_data.password,
                        signup_data.confirm_password, signup_data.contact_number, signup_data.account_type, otp, navigate  );

        dispatch(set_loading(false));
    
    if(loading)
        return (<Spinner/>);
        

    }
    return (
        <div className='w-full h-screen flex items-center justify-center bg-gray-950'>
            {
                <div className="relative w-full h-full">
                {/* Background Image and Gradient Overlay */}
                <div className="absolute inset-0 bg-[url('./Assets/signup_bckground.jpg')] bg-cover bg-center">
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-800 to-black opacity-80">
                        <div className="relative z-10 w-full h-full flex items-center justify-center">
                            {/* Form Container */}
                                <div className="flex items-start justify-center gap-8">
                                    <div className="bg-black bg-opacity-80 rounded-lg p-8 max-w-lg w-full mx-auto shadow-lg">
                                        <div className='flex flex-col items-center justify-center gap-4'>

                                            <div className=' flex flex-col w-11/12 md:w-[400px] h-full justify-center gap-4 mx-auto'>

                                                <div className='text-3xl font-bold text-white overflow-y-hidden'>
                                                        Verify email
                                                </div>

                                                <div className='text-[18px] opacity-60 text-white'>
                                                    A verification code has been sent to you. Please enter the code below.
                                                </div>

                                                <OTPInput value={otp}
                                                    onChange={set_otp}
                                                    numInputs={6}
                                                    renderInput={(props) => <input {...props} 
                                                        placeholder='-'
                                                        className=" border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square focus:border-0 focus:outline-2 focus:outline-yellow-50"
                                                    />}
                                                    containerStyle={{justifyContent : 'space-between'}}
                                                    inputStyle={{
                                                        width : 48,
                                                        aspectRatio : 1
                                                    }}
                                                />
                                    
                                                <button className='w-full py-3 px-2 bg-green-500 rounded-md text-black ' onClick={handle_submit}>
                                                 <div className='text-xl text-semibold'>
                                                    Verify email
                                                 </div>   
                                                </button>
                                                

                                                <div className='flex justify-between text-blue-500'>
                                                    <Link to={"/"} className='flex items-center gap-2'>
                                                        <FaLongArrowAltLeft />
                                                        <p>Back to login</p>
                                                    </Link>

                                                    <div className='flex items-center gap-2 text-blue-500' onClick={(event) => {send_otp(signup_data.email)}}>
                                                        <FaClockRotateLeft />
                                                        <p>Resend mail</p>
                                            </div></div> 
                                        </div>
                                    </div>
                                </div>
                            </div>   
                        </div>
                    </div>
                </div>
            </div>    
            }
        </div>
   
    )
}
