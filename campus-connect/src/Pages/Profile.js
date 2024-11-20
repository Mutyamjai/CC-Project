import React from 'react'
import {GoEye, GoEyeClosed} from "react-icons/go";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { change_password, update_profile } from '../Services/Service_Functions/auth';
import Spinner from '../Components/Common/Spinner';
import { set_user_details } from '../Slices/profileSlice';

export default function Profile() {

    const {user_details} = useSelector(state => state.profile);
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [x, setX] = useState("password");
    const [xx, setXX] = useState("password");
    const [edit, set_edit] = useState(false);
    const [loading, set_loading] = useState(false);
    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.auth);

    const [data, set_data] = useState({
        user_name:user_details?.user_name || "",
        email: user_details?.email || "",
        contact_number: user_details?.contact_number || ""
    })

    function change_data(event){
        set_data((prev) => (
            {
                ...prev,
                [event.target.name] : event.target.value,
            }
        ))
        console.log(data);
    }

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
        set_loading(true);
        await change_password(data.old_password, data.new_password, token);
        set_loading(false);
    }

    const update_details_fun = async () => {

        if(!data.user_name && !data.contact_number && !data.email){
            toast.error("DETAILS CAN NOT BE EMPTY TO UPDATE");
            return;
        }
        
        set_loading(true);
        const response = await update_profile(data.user_name, data.email, data.contact_number, token);

        if(response)
            dispatch(set_user_details(response));
        
        set_loading(false);

    }

    if(loading)
        return <Spinner/>

    return (
        <div>
            {
                !user_details && (
                    <div>
                        Please Login First
                    </div>
                )
            }
            {
                user_details && (
                    <div>
                        <div>
                            <div className='flex'>
                                <h1>USER DETAILS</h1>
                                <button onClick={() => {
                                    if(edit)
                                        set_edit(false);
                                    else
                                        set_edit(true);
                                }}>Enable Edit</button>
                            </div>

                            <div className="flex flex-col">
                                <label className="text-[16px]">USER NAME</label>
                                <input type="text" name="user_name" 
                                    value = {data.user_name}
                                    onChange={change_data}
                                    readOnly={!edit}>
                                </input>
                            </div>

                            <div className="flex flex-col">
                                <label className="text-[16px]">EMAIL</label>
                                <input type="text" name="email" 
                                    value = {data.email}
                                    onChange={change_data}
                                    readOnly={!edit}>
                                </input>
                            </div>

                            <div className="flex flex-col">
                                <label className="text-[16px]">CONTACT NUMBER</label>
                                <input type="number" name="contact_number" 
                                    value = {data.contact_number}
                                    onChange={change_data}
                                    readOnly={!edit}>
                                </input>
                            </div>

                            <button className={`${edit ? "block" : "hidden"}`} 
                                onClick={update_details_fun}>
                                Update Profile
                            </button>

                        </div>

                        <form onSubmit={handleSubmit(on_submit)}>
                                <div>
                                    <h1>CHANGE PASSWORD</h1>

                                    <div>
                                        <div>
                                            <label>Current Password </label>
                                            <div>
                                                <input type={x} 
                                                    placeholder="Enter Current Password" 
                                                    name="old_password"
                                                    {...register('old_password', {
                                                    required: {
                                                        value: true, message: "Old Password is Required"
                                                    },
                                                })}>
                                                </input>

                                                <button onClick={eyehandler1}>
                                                {
                                                    (x === "password") ? <GoEye></GoEye> : <GoEyeClosed></GoEyeClosed>
                                                }
                                                </button>
                                            </div>
                                            {errors.old_password && <p>{errors.old_password.message}</p>}
                                        </div>
                                        
                                        <div >
                                            <label>Confirm Password</label>
                                            <div>
                                                <input type={xx}
                                                    placeholder="Enter New Password" 
                                                    name="new_password"
                                                    {...register('new_password', {
                                                    required: {
                                                        value: true, message: "New Password is Required"
                                                    },
                                                    minLength:{
                                                        value: 5, message: "New Password should contain atleast 5 characters"
                                                    },
                                                })}>        
                                                </input>

                                                <button onClick={eyehandler2}>
                                                {
                                                    (xx === "password") ? <GoEye></GoEye> : <GoEyeClosed></GoEyeClosed>
                                                }
                                                </button>
                                            </div>
                                            {errors.new_password && <p>{errors.new_password.message}</p>}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <button type='submit'>Update</button>
                                </div>

                            </form>
                    </div>
                )
            }
        </div>
    )
}
