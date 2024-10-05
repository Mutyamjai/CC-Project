import React from 'react'
import MenuItems from '../MenuItems';
import { useState } from 'react';

export default function MenuCategory({category, items}) {
    const toggleStatus = () => {
        set_status(prevStatus => prevStatus === 'display' ? 'hidden' : 'display');
    }

    const [status, set_status] = useState("display");

    return (
        <div className='bg-gray-800 px-4 py-4 w-full border border-blue-700 rounded-lg max-w-3xl mx-auto flex flex-col mb-6 transition-all duration-300 ease-in-out'>
    <div className='flex justify-between items-center mb-3'>
        <h1 className='text-white text-xl font-bold'>{category}</h1>
        <button 
            onClick={toggleStatus}
            className="text-blue-300 hover:text-blue-500 transition-colors"
        >
            {status === 'display' ? 'Hide' : 'Show'} Menu
        </button>
    </div>

    <div className={`${status} transition-all duration-500 ease-in-out`}>
        {
            items.map((item, index) => (
                <MenuItems key={index} data={item} className="hover:cursor-pointer text-white mb-6 w-full px-4"/>
            ))
        }
    </div>
</div>

    )
}
