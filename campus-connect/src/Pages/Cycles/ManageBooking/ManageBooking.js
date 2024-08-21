import React, { useEffect } from 'react'
import { collect_booking, fetch_today_booking_details, issue_booking } from '../../../Services/Service_Functions/cycle';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import ManageBookingCard from './ManageBookingCard';
import ConfirmationModel from '../../../Components/Common/ConfirmationModel';

export default function ManageBooking() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const date = selectedDate;

    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-indexed
    const year = date.getFullYear();
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDate = `${formattedDay}-${formattedMonth}-${year}`;
    const {token} = useSelector(state => state.auth);
    const [loading, set_loading] = useState(false);
    const [confirmation_model, set_confirmation_model] = useState(null);
    const [result,set_result] = useState(null);

    useEffect(() => {
        const getDetails = async () => {
            set_loading(true);

            const response = await fetch_today_booking_details(formattedDate,token);
            if(response)
                set_result(response);
            
            set_loading(false);
        }
        getDetails();
    },[])

    const cycle_issued_button = async (id) => {
        set_loading(true);
        const response = await issue_booking(id, token);

        if(response){
            const new_result = result.map((item) => item._id === id ? response : item);
            set_result(new_result);

        }
        set_confirmation_model(null);
        set_loading(false);
    }

    const cycle_collected_button = async (id) => {
        set_loading(true);
        const response = await collect_booking(id, token);

        if(response){
            const new_result = result.filter((item) => item._id !== id);
            set_result(new_result);
        }
        set_confirmation_model(null);
        set_loading(false);
    }
  return (
    <div>
        <h1>TODAY'S BOOKINGS</h1>
        <h1>Pending Bookings</h1>
        {
           result &&  result
            .filter(item => item.status === "Not_issued")
            .map((item, index) => (
                <ManageBookingCard key={index} data={item} button_function={cycle_issued_button} 
                    set_confirmation_model={set_confirmation_model}
                />
            ))
        }

        <h1>Issued Bookings</h1>
        {
           result &&  result
            .filter(item => item.status === "Issued")
            .map((item, index) => (
                <ManageBookingCard key={index} data={item} button_function={cycle_collected_button}
                    set_confirmation_model={set_confirmation_model}
                />
            ))
        }

        {
            confirmation_model && <ConfirmationModel confirmation_model={confirmation_model}/>
        }
        
    </div>
  )
}
