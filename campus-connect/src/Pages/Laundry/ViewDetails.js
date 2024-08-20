import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { view_order_details } from '../../Services/Service_Functions/laundry';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Spinner from '../../Components/Common/Spinner';
import convert_date from '../../Utility/dateConvertor';

export default function ViewDetails() {
    const {id} = useParams();
    const {token} = useSelector((state)=>state.auth)
    const [details,set_details] = useState(null);
    useEffect(()=>{
        const getViewDetails = async () =>{
            try{
                const result = await view_order_details(id,token);
                set_details(result)
            }
            catch(error){
                console.error("Error in fetching details",error)
            }
        } 
        getViewDetails();
    }, [])

    if(!details){
        return <Spinner/>
    }
    return (
            <div>
                <h1>Order Details</h1>
                    <div>{details.user_name}</div>
                    <div>{details.order_number}</div>
                    <div>{convert_date(details.created_at)}</div>
                    <div>{details.user_name}</div>
                    <div>{details.user_name}</div>
                    <div>{details.user_name}</div>
            </div>
    )
}
