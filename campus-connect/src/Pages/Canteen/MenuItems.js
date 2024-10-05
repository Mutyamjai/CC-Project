import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { add_item, remove_item } from '../../Slices/cartSlice';

export default function MenuItems({data}) {

    const {cart} = useSelector((state) => state.cart);
    const item_in_cart = cart.find(item => item._id === data._id);
    const [count, set_count] = useState(item_in_cart ? item_in_cart.count : 0);
    
    const dispatch = useDispatch();

    const increase_item = () => {
        dispatch(add_item(data));
        set_count(count + 1);
        console.log(cart);
    }

    const decrease_item = () => {
        if(count === 0)
            return;
        dispatch(remove_item(data));
        set_count(count - 1);
    }
    return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg  text-white flex flex-row items-center mb-6 max-w-3xl w-full  mx-auto">
        <div className='pr-2'>
            <img 
            src={data.image} 
            alt={data.item_name}
            className="w-[1/3] h-45 object-cover rounded-lg mb-3"
            />
        </div>
        <div className='flex flx-row '>
        <div className=' w-[100px]'>
    <div className="text-center text-lg font-bold mb-1 ">{data.item_name}</div>
    <div className="text-center text-sm text-gray-300 mb-1 ">Price: ₹{data.price}</div>
    </div>
    <div className='px-2'>
    <div className={`text-center text-sm  mb-3 ${data.status === "Available" ? "text-green-400" : "text-red-400"}`}>
        {data.status}
    </div>
    
    {data.status === "Available" && (
        <div className="flex items-center space-x-3 mt-3">
            <button 
                onClick={increase_item} 
                className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded-lg"
            >
                +
            </button>
            <p className="text-lg font-semibold">{count}</p>
            <button 
                onClick={decrease_item} 
                className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded-lg"
            >
                -
            </button>
        </div>  
    )}
    </div>
    </div>
</div>


    )
}
