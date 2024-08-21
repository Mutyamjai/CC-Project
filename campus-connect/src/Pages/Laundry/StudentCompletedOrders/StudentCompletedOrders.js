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
        <div className="bg-black bg-opacity-90 min-h-screen p-8 w-full">
            <h1 className="text-blue-300 font-bold text-center text-2xl mb-8">
                All Completed Orders
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {details.length > 0 ? (
                    
                    details.map((item, index) => (
                       <div className="w-full md:w-5/6 mx-auto p-4  text-white rounded-lg">
                        <StudentCompletedOrdersCard data={item} key={index} 
                            
                        />
                       </div> 
                         
                    )
                    )
                    
                ) : (
                    <div className="text-center text-xl font-bold text-white col-span-full">
                        No Completed Orders are there
                    </div>
                )}
            </div>
        </div>
    );
}