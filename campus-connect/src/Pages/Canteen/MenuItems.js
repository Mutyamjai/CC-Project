import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add_item, remove_item } from '../../Slices/cartSlice';
import { FaIndianRupeeSign } from "react-icons/fa6";

export default function MenuItems({ data }) {
  const { cart } = useSelector((state) => state.cart);
  const item_in_cart = cart.find((item) => item._id === data._id);
  const [count, set_count] = useState(item_in_cart ? item_in_cart.count : 0);

  const dispatch = useDispatch();

  const increase_item = () => {
    dispatch(add_item(data));
    set_count(count + 1);
  };

<<<<<<< HEAD
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
=======
  const decrease_item = () => {
    if (count === 0) return;
    dispatch(remove_item(data));
    set_count(count - 1);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-4 border border-gray-600 flex items-center justify-between">
      <div className="flex items-center">
        <img
          src={data.image}
          alt={data.item_name}
          className="w-16 h-16 rounded-md border border-gray-700 mr-4"
        />
        <div>
          <h3 className="text-red-500 text-lg font-semibold">{data.item_name}</h3>
          <p className="text-white text-sm mt-1">
            Price: <FaIndianRupeeSign className="inline" /> {data.price}
          </p>
          <p className={`text-sm mt-1 ${data.status === 'Available' ? 'text-green-400' : 'text-red-400'}`}>
            {data.status}
          </p>
        </div>
      </div>

      {data.status === 'Available' && (
        <div className="flex items-center space-x-4">
          <button
            onClick={decrease_item}
            className="bg-red-500 text-white font-bold w-10 h-10 hover:bg-red-600 focus:outline-none flex items-center justify-center transition duration-200 border border-gray-600 rounded"
          >
            <span className="text-3xl leading-none">-</span>
          </button>
          <span className="text-white font-bold text-lg">{count}</span>
          <button
            onClick={increase_item}
            className="bg-red-500 text-white font-bold w-10 h-10 hover:bg-red-600 focus:outline-none flex items-center justify-center transition duration-200 border border-gray-600 rounded"
          >
            <span className="text-2xl leading-none">+</span>
          </button>
        </div>
      )}
    </div>
  );
>>>>>>> c06f91aa70eb3377348a9667cce443831cebd327
}
