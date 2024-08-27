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
        <div className="bg-black bg-opacity-90 min-h-screen p-8 overflow-x-hidden w-full">
            <div className="w-full mb-8 flex justify-center">
                <h1 className='text-blue-300 font-bold text-center flex items-center justify-center ml-10 text-2xl'>Add a Bicycle</h1>
                
                <label className='text-blue-300 font-bold ml-3 mr-3 text-2xl flex justify-center items-center'>Cycle Id:</label>
                <input type='text' placeholder='Enter Cycle Id' 
                {...register("id", {required : true})} className="bg-gray-800 text-white py-4 px-6 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></input>
                {errors.id && (<p className="text-red-500 mt-2">Company Name is Required</p>)}

                <button onClick={() => {
                    set_confirmation_model({
                        data_1: "Confirm Adding???",
                        btn1_text: "Confirm",
                        btn2_text: "Cancel",
                        btn1_fun: () => add_cycle_button(getValues("id")),
                        btn2_fun: () => set_confirmation_model(null)
                    })
                    
                }} className="bg-blue-500 text-white ml-5 py-4 px-6 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500">Add cycle</button>
            </div>

            <div>

                <div>
                    <div className='flex items-center justify-center mb-5' >
                    <input type = 'text' placeholder='Search'
                    {...register('id1',{required:true})} className="bg-gray-800 text-white py-4 px-6 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></input>
                    <button onClick={on_submit} className="bg-blue-500 text-white ml-5 py-4 px-6 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500">search</button>
                    {
                        errors.order_number && (<p className="text-red-500 mt-2">Order Number can not be empty</p>)
                    }
                    </div>   
                    <h1 className='text-blue-300 font-bold text-center mb-3 text-2xl'>Searched Order</h1>
                    {
                        searched_order && (
                            <div className="mb-8 flex justify-center">
                                <ManageCyclecard data={searched_order} set_confirmation_model={set_confirmation_model}
                                change_status_to_under_repair_button={change_status_to_under_repair_button}
                                change_status_to_under_working_button={change_status_to_under_working_button}
                                    
                                />
                            </div>
                        )
                    }
                    {
                        searched_order === undefined && (
                            <div className="mb-8 text-center text-xl font-bold mt-4 text-white">
                                Order Number not found
                            </div>
                        )
                    } 
                
                </div>
                <div className="border-b border-blue-600 mb-5"></div>
                    <h1 className="text-blue-300 font-bold text-center mb-5 text-2xl">ALL CYCLES DETAILS</h1>

                    <div className={`grid ${details.length > 1 ? 'grid-cols-1 md:grid-cols-2' : 'flex justify-center'}`}>
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
                                <p className=' text-white text-xl font-bold'>No cycles are present</p>
                            )
                        }
                    </div>

               \
            </div>
            
            {
                confirmation_model && <ConfirmationModel confirmation_model={confirmation_model}/>
            }
        </div>
  )
}
