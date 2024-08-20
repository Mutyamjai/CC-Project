import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { add_cycle } from '../../../Services/Service_Functions/cycle';
import ConfirmationModel from '../../../Components/Common/ConfirmationModel';
import toast from 'react-hot-toast';

export default function ManageBooking() {
    const {register, getValues,formState:{errors}} = useForm();
    const {token} = useSelector(state => state.auth)
    const [loading,set_loading] = useState(false);
    const [confirmation_model,set_confirmation_model] = useState(null);

    const add_cycle_button = async (id)=>{
        console.log(id);
        if(id === ''){
            toast.error("ID CANT BE EMPTY");
            set_confirmation_model(null);
            return;
        }
        set_loading(true);
        await add_cycle(id,token);
        set_confirmation_model(null);
        set_loading(false);
    }
    useEffect(() => {

    })
    return (
        <div>
            <div>
                <h1>Add a Bicycle</h1>
                <label>Cycle Id:</label>
                <input type='text' placeholder='Enter Company Name' 
                {...register("id", {required : true})} ></input>
                {errors.id && (<p className='text-red-00'>Company Name is Required</p>)}

                <button onClick={() => {
                    set_confirmation_model({
                        data_1: "Confirm Adding???",
                        btn1_text: "Confirm",
                        btn2_text: "Cancel",
                        btn1_fun: () => add_cycle_button(getValues("id")),
                        btn2_fun: () => set_confirmation_model(null)
                    })
                    
                }}>Add cycle</button>
            </div>
            
            {
                confirmation_model && <ConfirmationModel confirmation_model={confirmation_model}/>
            }
        </div>
  )
}
