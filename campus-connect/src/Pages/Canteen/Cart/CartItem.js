import React from 'react';
import { useDispatch } from 'react-redux';
import { add_item, remove_item } from '../../../Slices/cartSlice';
import { FaIndianRupeeSign } from "react-icons/fa6";

export default function CartItems({ data }) {


  const dispatch = useDispatch();

  const increase_item = () => {
    dispatch(add_item(data));
  };

  const decrease_item = () => {
    dispatch(remove_item(data));
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
          <span className="text-white font-bold text-lg">{data.count}</span>
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
}
