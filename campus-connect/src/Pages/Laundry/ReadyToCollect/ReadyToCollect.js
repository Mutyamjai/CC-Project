import React, { useEffect } from 'react'
import { fetch_ready_to_collect_orders, fetch_under_washing_orders } from '../../../Services/Service_Functions/laundry'
import { useSelector } from 'react-redux';
import Spinner from '../../../Components/Common/Spinner';
import { useState } from 'react';
export default function ReadyToCollect() {
    const {token} = useSelector((state) => state.auth);
    const {user_details} = useSelector((state) => state.profile)
    const[loading,set_loading] = useState(false)
    const[details,set_details] = useState(null)
    useEffect(()=>{
        const fetchReadyToCollectOrders = async () =>{
            try{
                const result = await fetch_ready_to_collect_orders(user_details.laundry_account,token)
                set_details(result)
                console.log(result);
            }
            catch(error){
                console.error("Error in fetching details",error)
            }
        }
        fetchReadyToCollectOrders();
    },[])

    if(loading){
        return(<Spinner/>)
    }
    return (
        <div>
            
        </div>
    )
}
