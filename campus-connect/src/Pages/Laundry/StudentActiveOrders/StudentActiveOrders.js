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
    const[details,set_details] = useState([]);
    const[loading,set_loading] = useState(false);
    const[confirmation_model,set_confirmation_model] = useState(null);

    useEffect(()=>{
        const fetchStudentActiveOrders = async () =>{
            try{
                const result = await fetch_student_active_orders(token)
                if(result)
                    set_details(result)
            }
            catch(error){
                console.error("Error in fetching details",error)
            }
        }
        set_loading(true);
        fetchStudentActiveOrders();
        set_loading(false);

        // eslint-disable-next-line
    },[])

    if(loading){
        return <Spinner/>
    }

    return (
        <div className="bg-black bg-opacity-90 min-h-screen p-8 overflow-x-hidden w-full justify-center">
                <div className="w-full mb-8 flex justify-center">
                    <h1 className="text-blue-300 font-bold text-center mb-3 text-2xl">All Active Orders</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                        {
                            details.map((item,index) =>(
                                <div key={index}
                                className="flex items-center justify-center w-full lg:w-5/6 mx-auto">
                                <StudentActiveOrdersCard data={item}  key={index} set_confirmation_model={set_confirmation_model} set_loading={set_loading}/>
                                </div>
                            ))
                        }
                        {
                            details.length === 0 && (
                                <div className="mt-8 text-center text-xl font-bold text-white">
                                <p>No Active Orders are there</p>
                                </div>
                            )
                        }
                </div>        
                        {
                            confirmation_model && (
                                <ConfirmationModel confirmation_model={confirmation_model}/>
                            )
                            
                        }
                        
        </div>
    )
}
