import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetch_student_booking_details } from '../../Services/Service_Functions/cycle';
import Spinner from '../../Components/Common/Spinner';

export default function MyBookings() {
    const {token} = useSelector(state => state.auth);
    const {user_details} = useSelector(state => state.profile)
    const [data,set_data] = useState({});
    const [loading, set_loading] = useState(false);

    useEffect(() => {

        const getMyBookingDetails = async () =>{
            set_loading(true);
            const res = await fetch_student_booking_details(user_details.user_name,token);
            set_data(res);
            set_loading(false);
        }
        getMyBookingDetails();
    }, [])

    if(loading)
        return <Spinner/>

    return (
        <div>
            {
                data && (<div>
                    <div>Cycle Id : {data.cycle_id}</div>
                    <div>Cycle No : {data.id}</div>
                    <div>Student User Name : {data.user_name}</div>
                    <div>Contact No : {data.contact_number}</div>
                    <div>Start time : {data.start_time}</div>
                    <div>End time : {data.end_time}</div>
                    <div>Status : {data.status}</div>
                </div>)
            }
            {
                Object.keys(data).length === 0 && <div>
                    No Booking is Available
                </div>
            }
        </div>
    )
}
