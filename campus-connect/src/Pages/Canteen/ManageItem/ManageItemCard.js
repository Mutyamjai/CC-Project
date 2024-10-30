import React from 'react'

export default function ManageItemCard({data, alter_availability}) {

    const handle_alter = () => {
        let new_status;

        if(data.status === "Available")
            new_status = "Not_available";
        else
            new_status = "Available";

        alter_availability(data._id, new_status);
    }
    return (
        <div className='border-2 border-black'>
            <div>{data.item_name}</div>
            <div>{data.price}</div>
            <img src={data.image}></img>
            <div>{data.status}</div>

            <button onClick={handle_alter}>Change the availability</button>
        </div>
    )
}
