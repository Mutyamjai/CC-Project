import React, { useState } from 'react';
import ManageItemCard from './ManageItemCard';

export default function ManageCategory({ name, items, alter_availability }) {
    const [isVisible, setIsVisible] = useState(true);

    return (
        <div className='mb-6 bg-gray-800 p-4 rounded-lg shadow-md border border-gray-600'>
            <div className='flex items-center justify-between mb-2'>
                <h1 className='text-red-500 font-bold text-xl'>{name}</h1>
                <button
                    onClick={() => setIsVisible(!isVisible)}
                    className='bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-600 transition duration-200'
                >
                    {isVisible ? 'Hide' : 'Show'} Items
                </button>
            </div>

            {isVisible && (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {items.map((item, index) => (
                        <ManageItemCard data={item} key={index} alter_availability={alter_availability} />
                    ))}
                </div>
            )}
        </div>
    );
}
