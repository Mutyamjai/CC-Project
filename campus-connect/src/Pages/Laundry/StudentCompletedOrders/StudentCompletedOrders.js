import React from 'react'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import StudentCompletedOrdersCard from './StudentCompletedOrdersCard';
import Spinner from '../../../Components/Common/Spinner';
import ConfirmationModel from '../../../Components/Common/ConfirmationModel';
import { fetch_student_completed_orders } from '../../../Services/Service_Functions/laundry';

export default function StudentCompletedOrders() {
    const {token} = useSelector((state) => state.auth);
    const[details,set_details] = useState(null);
    const[loading,set_loading] = useState(false);

    useEffect(()=>{
      const fetchStudentCompletedOrders = async () =>{
          try{
              const result = await fetch_student_completed_orders(token);
              set_details(result)
              console.log(result);
          }
          catch(error){
              console.error("Error in fetching details",error)
          }
      }
      fetchStudentCompletedOrders();
    },[])
    if(loading||!details){
      return <Spinner/>
    }
    return (
          <div>
              <h1>All Completed Orders</h1>
              { 
                  details.map((item,index) =>(
                      
                      <StudentCompletedOrdersCard data={item} key={index} />
                  ))
              }
              <div>hello</div>
              {
                  details.length === 0 && (
                      <p>No Completed Orders are there</p>
                  )
              }
          </div>
    )
}
