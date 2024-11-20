import React from 'react';

export default function ManageItemCard({ data, alter_availability }) {
    const handle_alter = () => {
        const new_status = data.status === "Available" ? "Not_available" : "Available";
        alter_availability(data._id, new_status);
    };

    return (
        <div className='bg-gray-800 border border-gray-800 rounded-lg shadow-md p-6 mb-4 flex flex-col items-center'>
            <img src={data.image} alt={data.item_name} className='w-32 h-32 rounded-md mb-2 border border-gray-700' />
            <div className='text-white text-lg font-semibold mb-1'>{data.item_name}</div>
            <div className='text-white text-md mb-1'>
                Price: <span className='font-bold'>{data.price}</span>
            </div>
            <div className={`text-sm mb-2 ${data.status === 'Available' ? 'text-green-400' : 'text-red-400'}`}>
                Status: {data.status}
            </div>
            <button
                onClick={handle_alter}
                className={`bg-red-500 text-white font-bold rounded px-4 py-2 hover:bg-red-600 transition duration-200`}
            >
                {data.status === "Available" ? "Mark as Not Available" : "Mark as Available"}
            </button>
        </div>
    );
}

