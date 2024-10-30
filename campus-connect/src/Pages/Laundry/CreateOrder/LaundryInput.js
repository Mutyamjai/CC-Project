import React from 'react'

export default function LaundryInput({register, item, initial,handleInputChange}) {
    return (
        <div className='flex items-center justify-between mb-2'>
            <label className='text-lg md:text-sm font-semibold text-blue-300 flex-grow mr-2'>{item.displayName}<span className='text-gray-500'>  (₹{item.price})</span></label>
            <input
            type='number' name={item.name} defaultValue={initial || 0}
            {...register(`${item.name}`)}
            onChange={handleInputChange}
            className='w-16 p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 '
            style={{
                WebkitAppearance: 'none',  
                MozAppearance: 'textfield', 
                msOverflowStyle: 'none' ,   
            }}
            maxLength='2'></input>
        </div>
    )
}
