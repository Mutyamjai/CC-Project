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
        <div>
            <form onSubmit={handleSubmit(on_submit)}>
                <input type = 'number' placeholder='Search'
                {...register('order_number',{required:true})}></input>
                <button type='submit'>search</button>
                {
                    errors.order_number && (<p>Order Number can not be empty</p>)
                }
            </form>
            <h1>Searched Order</h1>
            {
                searched_order && (
                    <div>
                        <UnderWashingCard data={searched_order} set_confirmation_model={set_confirmation_model}
                            set_loading={set_loading}
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

            <h1>All under washing orders</h1>
            {
                details.map((item, index) => (
                    <UnderWashingCard key={index} data={item} set_confirmation_model={set_confirmation_model}
                            set_loading={set_loading}/>
                ))
            }

            {
                confirmation_model && <ConfirmationModel confirmation_model={confirmation_model}/>
            }
        </div>
    )
}
