import React from 'react'
import { fetch_student_active_orders } from '../../../Services/Service_Functions/laundry';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import StudentActiveOrdersCard from './StudentActiveOrdersCard';
import Spinner from '../../../Components/Common/Spinner';
import ConfirmationModel from '../../../Components/Common/ConfirmationModel';
export default function StudentActiveOrders() {
    const {token} = useSelector((state) => state.auth);
    const[details,set_details] = useState(null)
    const[loading,set_loading] = useState(false)
    const[confirmation_model,set_confirmation_model] = useState(null)

    useEffect(()=>{
        const fetchStudentActiveOrders = async () =>{
            try{
                const result = await fetch_student_active_orders(token)
                set_details(result)
                console.log(result);
            }
            catch(error){
                console.error("Error in fetching details",error)
            }
        }
        fetchStudentActiveOrders();
    },[])
    if(loading||!details){
        return <Spinner/>
    }
  return (
        <div>
            <h1>All Active Orders</h1>
            {
                details.map((item,index) =>(
                    
                    <StudentActiveOrdersCard data={item} key={index} set_confirmation_model={set_confirmation_model} set_loading={set_loading}/>
                ))
            }
            {
                details.length === 0 && (
                    <p>No Active Orders are there</p>
                )
            }
            {
                confirmation_model && (
                    <ConfirmationModel confirmation_model={confirmation_model}/>
                )
                
            }
            
        </div>
  )
}
