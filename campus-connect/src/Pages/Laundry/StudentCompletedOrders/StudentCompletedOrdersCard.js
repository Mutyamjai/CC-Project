import React from 'react'
import convert_date from '../../../Utility/dateConvertor'
import { useNavigate } from 'react-router-dom'
export default function StudentCompletedOrdersCard({data}) {
  const navigate = useNavigate();
  console.log(convert_date(data.created_at))
  return (
    <div onClick={() => navigate(`/Laundry/View_Details/${data._id}`)} className="bg-gray-800 border border-blue-700 hover:shadow-lg hover:shadow-blue-300 text-white p-4 rounded-lg  hover:cursor-pointer hover:bg-gray-700 transition duration-200 ease-in-out ">
        <div className="flex justify-between text-white font-bold text-xl">
            Order Number # 
            {data.order_number}
        </div>
        <div className="flex justify-between text-white text-lg">
            <span>Date:</span> 
            <span>{convert_date(data.created_at)}</span>
        </div>
        <div className="flex justify-between text-white text-lg">
            <span>Total Pieces:</span> 
            <span>{data.total_pieces}</span>
        </div>
        <div className="flex justify-between text-white text-lg">
            <span>Total Price:</span> 
            <span>{data.total_price}</span>
        </div>
    </div>
  )
}
