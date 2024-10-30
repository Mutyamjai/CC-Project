import React, { useState } from 'react';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';
import MenuItems from '../MenuItems';

export default function MenuCategory({ category, items }) {
  const [status, set_status] = useState("display");

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg mb-4 border border-gray-600 overflow-hidden">
      <div 
        className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-700 transition duration-200" 
        onClick={() => set_status(status === 'display' ? 'hidden' : 'display')}
      >
        <h1 className="text-red-500 text-xl font-semibold">{category}</h1>
        <div className="text-red-500 text-2xl">
          {status === 'display' ? <FiChevronUp /> : <FiChevronDown />}
        </div>
      </div>

      <div className={`${status === 'display' ? 'block' : 'hidden'} bg-gray-900 p-4 space-y-3`}>
        {items.map((item, index) => (
          <MenuItems key={index} data={item} />
        ))}
      </div>
    </div>
  );
}
