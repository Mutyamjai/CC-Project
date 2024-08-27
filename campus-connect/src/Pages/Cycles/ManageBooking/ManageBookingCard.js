import React from 'react'

export default function ManageBookingCard({data, button_function, set_confirmation_model}) {

    const on_submit = () => {
        set_confirmation_model({
            data_1: `${data.status === "Not_issued" ? "Confirm Cycle Issued" : "Confirm Cycle Collected"}`,
            btn1_text: "Confirm",
            btn2_text: "Cancel",
            btn1_fun: () => button_function(data._id),
            btn2_fun: () => set_confirmation_model(null)
        })
    }
    return (  
        <div>
            <div>Cycle Id : {data.cycle_id}</div>
            <div>Cycle No : {data.id}</div>
            <div>Student User Name : {data.user_name}</div>
            <div>Contact No : {data.contact_number}</div>
            <div>Start time : {data.start_time}</div>
            <div>End time : {data.end_time}</div>
            <div>Status : {data.status}</div>

            <button onClick={on_submit}>
                {data.status === 'Not_issued' ? "Cycle Issued": "Cycle Collected"}</button>
        </div>
            
            

        
    )
}
