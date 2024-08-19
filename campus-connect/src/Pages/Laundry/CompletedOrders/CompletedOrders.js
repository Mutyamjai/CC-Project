import React, { useEffect } from 'react'
import { fetch_completed_orders } from '../../../Services/Service_Functions/laundry'
import { useSelector } from 'react-redux';
import Spinner from '../../../Components/Common/Spinner';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import CompletedOrdersCard from '../CompletedOrders/CompletedOrdersCard';

export default function CompletedOrders() {
    const {token} = useSelector((state) => state.auth);
    const {user_details} = useSelector((state) => state.profile)
    const[loading,set_loading] = useState(false)
    const[details,set_details] = useState(null)
    const [searched_order, set_searched_order] = useState(null);
    const {register,handleSubmit,formState:{errors}} = useForm();
    
    useEffect(()=>{
        const fetchCompletedOrders = async () =>{
            try{
                const result = await fetch_completed_orders(user_details.laundry_account,token)
                set_details(result)
                console.log(result);
            }
            catch(error){
                console.error("Error in fetching details",error)
            }
        }
        fetchCompletedOrders();
    },[])
    function on_submit(data){
        const number = parseInt(data.order_number, 10)
        const order = details.find(o => o.order_number === number);
        //console.log(order);
        set_searched_order(order);
    }
    if(loading||!details){
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
                        <CompletedOrdersCard data={searched_order} 
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
            <h1>All Ready to collect items</h1>
            {
                details.map((item, index) => (
                    <CompletedOrdersCard key={index} data={item} 
                            />
                ))
            }
        </div>
    )
}
