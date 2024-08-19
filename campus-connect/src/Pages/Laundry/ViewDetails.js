import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { view_order_details } from '../../Services/Service_Functions/laundry';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Spinner from '../../Components/Common/Spinner';

export default function ViewDetails() {
    const {order_id} = useParams();
    const {token} = useSelector((state)=>state.auth)
    const [details,set_details] = useState(null);
    useEffect(()=>{
        const getViewDetails = async () =>{
            try{
                const result = await view_order_details(order_id,token);
                set_details(result)
            }
            catch(error){
                console.error("Error in fetching details",error)
            }
        } 
        getViewDetails();
    })

    if(!details){
        return <Spinner/>
    }
    return (
            <div>
                <h1>Order Details</h1>
                    <div>{details.user_name}</div>
            </div>
    )
}
