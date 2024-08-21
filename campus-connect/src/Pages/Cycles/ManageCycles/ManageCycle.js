import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { add_cycle, fetch_cycle_details, update_cycle_status_to_repair, update_cycle_status_to_working } from '../../../Services/Service_Functions/cycle';
import ConfirmationModel from '../../../Components/Common/ConfirmationModel';
import toast from 'react-hot-toast';
import Spinner from '../../../Components/Common/Spinner';
import ManageCyclecard from './ManageCyclecard';

export default function ManageCycle() {
    const {register,getValues, handleSubmit,formState:{errors}} = useForm();
    const {token} = useSelector(state => state.auth)
    const [loading, set_loading] = useState(false);
    const [confirmation_model, set_confirmation_model] = useState(null);
    const [details,set_details] = useState([]);
    const [searched_order, set_searched_order] = useState(null);

    const add_cycle_button = async (id)=>{
        console.log(id);
        if(id === ''){
            toast.error("ID CANT BE EMPTY");
            set_confirmation_model(null);
            return;
        }
        set_loading(true);

        const result = await add_cycle( id ,token);
        if(result){
            const new_details = details;
            new_details.push(result);
            set_details(new_details);
        }
        set_confirmation_model(null);
        set_loading(false);
    }

    const change_status_to_under_working_button = async (id) => {
        set_loading(true);
        const result = await update_cycle_status_to_working(id, token);

        if(result){
            const new_details = details.map((item) => item._id !== id ? item : result);
            set_details(new_details);

            if(searched_order){
                if(searched_order._id === result._id)
                    set_searched_order(result);
            }
        }
        set_confirmation_model(null);
        set_loading(false);
    }

    const change_status_to_under_repair_button = async (id) => {
        set_loading(true);
        const result = await update_cycle_status_to_repair(id, token);

        if(result){
            const new_details = details.map((item) => item._id !== id ? item : result);
            set_details(new_details);

            if(searched_order){
                if(searched_order._id === result._id)
                    set_searched_order(result);
            }
        }
        set_confirmation_model(null);
        set_loading(false);
    }

    function on_submit(){
        if(getValues("id1") === ''){
            toast.error("ID CANT BE EMPTY");
            return;
        }
        const new_details = details.find(item => item.id === getValues("id1"))
        set_searched_order(new_details);
    }

    useEffect(() => {
        const getDetails = async () => {
            set_loading(true);
            const response = await fetch_cycle_details(token);
            set_details(response);
            set_loading(false);
        }
        getDetails();
    },[])
    
    if(loading || !details){
        return <Spinner/>
    }

    return (
        <div>
            <div>
                <h1>Add a Bicycle</h1>
                <label>Cycle Id:</label>
                <input type='text' placeholder='Enter Company Name' 
                {...register("id", {required : true})} ></input>
                {errors.id && (<p className='text-red-600'>Company Name is Required</p>)}

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

            <div>

                <div>
                    <div >
                    <input type = 'text' placeholder='Search'
                    {...register('id1',{required:true})}></input>
                    <button onClick={on_submit}>search</button>
                    {
                        errors.order_number && (<p>Order Number can not be empty</p>)
                    }
                    </div>   
                    <h1>Searched Order</h1>
                    {
                        searched_order && (
                            <div>
                                <ManageCyclecard data={searched_order} set_confirmation_model={set_confirmation_model}
                                change_status_to_under_repair_button={change_status_to_under_repair_button}
                                change_status_to_under_working_button={change_status_to_under_working_button}
                                    
                                />
                            </div>
                        )
                    }
                    {
                        searched_order === undefined && (
                            <div>
                                Order Number not found
                            </div>
                        )
                    } 
                
                </div>

                <div>
                    <h1>ALL CYCLES DETAILS</h1>

                    <div>
                        {
                            details.map((item, index) => (
                                <ManageCyclecard key={index} data={item} set_confirmation_model={set_confirmation_model}
                                    change_status_to_under_repair_button={change_status_to_under_repair_button}
                                    change_status_to_under_working_button={change_status_to_under_working_button}
                                />
                            ))
                        }

                        {
                            details.length === 0 && (
                                <p>No cycles are present</p>
                            )
                        }
                    </div>

                </div>
            </div>
            
            {
                confirmation_model && <ConfirmationModel confirmation_model={confirmation_model}/>
            }
        </div>
  )
}
