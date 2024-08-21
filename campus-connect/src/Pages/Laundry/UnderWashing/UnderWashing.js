import React, { useEffect } from 'react'
import { fetch_under_washing_orders } from '../../../Services/Service_Functions/laundry'
import { useSelector } from 'react-redux';
import Spinner from '../../../Components/Common/Spinner';
import { useState } from 'react';
import UnderWashingCard from './UnderWashingCard';
import { useForm } from 'react-hook-form';
import ConfirmationModel from '../../../Components/Common/ConfirmationModel';

export default function OrderStatus() {
    const {token} = useSelector((state) => state.auth);
    const {user_details} = useSelector((state) => state.profile);
    const[loading,set_loading] = useState(false);
    const[details,set_details] = useState(null);
    const [confirmation_model, set_confirmation_model] = useState(null);
    const [searched_order, set_searched_order] = useState(null);
    const {register,handleSubmit,formState:{errors}} = useForm();

    useEffect(()=>{
        const fetchUnderwashingOrders = async () =>{
            try{
                const result = await fetch_under_washing_orders(user_details.laundry_account,token)
                set_details(result)
            }
            catch(error){
                console.error("Error in fetching details",error)
            }
        }
        fetchUnderwashingOrders();
    },[])
    function on_submit(data){
        const number = parseInt(data.order_number, 10)
        const order = details.find(o => o.order_number === number);
        //console.log(order);
        set_searched_order(order);
    }

    if(loading || !details){
        return(<Spinner/>)
    }
    return (
        <div className="bg-black bg-opacity-90 min-h-screen p-8 overflow-x-hidden w-full">
                    <div className="w-full mb-8 flex justify-center">
                    <form onSubmit={handleSubmit(on_submit)}>
                        <input type = 'number' placeholder='Search By Order No'
                        {...register('order_number',{required:true})}
                        className="bg-gray-800 text-white py-4 px-6 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                         </input>
                        <button type='submit' className="bg-blue-500 text-white ml-5 py-4 px-6 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500">Search</button>
                        {
                            errors.order_number && (<p className="text-red-500 mt-2">Order Number is Required</p>)
                        }  
                    </form>
                    </div>
                    <h1 className='text-blue-300 font-bold text-center mb-3 text-2xl'>SEARCHED ORDER</h1>
                    {
                        searched_order && (
                            <div className="mb-8 flex justify-center">
                                <UnderWashingCard data={searched_order} set_confirmation_model={set_confirmation_model}
                                    set_loading={set_loading}
                                />
                            </div>
                        )
                    }
                    {
                        searched_order === undefined && (
                            <div className="mb-8 text-center text-xl font-bold mt-4 text-white" >
                                ORDER NOT FOUND !!
                            </div>
                        )
                    }
                    
                    <div className="border-b border-blue-600 mb-5"></div>
                    <h1 className="text-blue-300 font-bold text-center mb-5 text-2xl"> UNDER WASHING ORDERS</h1>
                    <div className={`grid ${details.length > 1 ? 'grid-cols-1 md:grid-cols-2' : 'flex justify-center'}`}>
                    {
                        details.map((item, index) => (
                            <UnderWashingCard key={index} data={item} set_confirmation_model={set_confirmation_model}
                                    set_loading={set_loading}/>
                        ))
                    }   
                    </div>

                    <div className='flex justify-center'>
                    {
                        details.length === 0 && (
                            <p className=' text-white text-xl font-bold'>NO ORDERS ARE UNDER WASHING STAGE !!</p>
                        )
                    }
                    </div>

                    {
                        confirmation_model && <ConfirmationModel confirmation_model={confirmation_model}/>
                    }
        </div>
    )
}
