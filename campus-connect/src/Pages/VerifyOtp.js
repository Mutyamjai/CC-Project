
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
    }
    return (
        <div className='w-[100%] h-[100vh] '>
            {
                loading ? (<Spinner/>) : (
                    <div className=' flex flex-col w-11/12 md:w-[400px] h-full justify-center gap-4 mx-auto'>

                        <div className='text-3xl font-bold'>
                                Verify email
                        </div>

                        <div className='text-[18px] opacity-60'>
                            A verification has been to you. Please enter the code below.
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

                        <button className='w-full py-3 px-2 bg-yellow-100 rounded-md text-black' onClick={handle_submit}>
                            Verify email
                        </button>

                        <div className='flex justify-between'>
                            <Link to={"/"} className='flex items-center gap-2'>
                                <FaLongArrowAltLeft />
                                <p>Back to login</p>
                            </Link>

                            <div className='flex items-center gap-2 text-blue-200' onClick={(event) => {send_otp(signup_data.email)}}>
                                <FaClockRotateLeft />
                                <p>Resend mail</p>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
