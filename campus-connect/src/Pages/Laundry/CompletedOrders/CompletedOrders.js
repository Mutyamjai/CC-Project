import React, { useEffect } from 'react'
import { fetch_completed_orders, fetch_under_washing_orders } from '../../../Services/Service_Functions/laundry'
import { useSelector } from 'react-redux';
import Spinner from '../../../Components/Common/Spinner';
import { useState } from 'react';
export default function CompletedOrders() {
    const {token} = useSelector((state) => state.auth);
    const {user_details} = useSelector((state) => state.profile)
    const[loading,set_loading] = useState(false)
    const[details,set_details] = useState(null)
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

    if(loading){
        return(<Spinner/>)
    }
    return (
        <div>
        </div>
    )
}
