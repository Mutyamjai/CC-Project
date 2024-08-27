import React from 'react'
import convert_date from '../../../Utility/dateConvertor'
import { useNavigate } from 'react-router-dom'

export default function CompletedOrdersCard({data}) {
const navigate = useNavigate();
return (
    <div className='bg-gray-800 px-10 py-8 w-full border border-blue-700 rounded-lg max-w-md mx-auto flex flex-col mb-10 hover:shadow-lg hover:shadow-blue-300' >
        <div className='mb-4'>
            <div onClick={() => navigate(`/Laundry/View_Details/${data._id}`)} className="hover:cursor-pointer">
                <div className=' text-2xl font-bold mb-2 text-white'>
                Order No # {data.order_number}
                </div>
                <div className='flex justify-between text-lg font-medium text-white mb-2'>
                Username : <span className='font-normal'>{data.user_name}</span>
                </div>
                <div className='flex justify-between text-lg font-medium text-white mb-2'>
                Date : <span className='font-normal'>{convert_date(data.created_at)}</span>
                </div>
                <div className='flex justify-between text-lg font-medium text-white mb-2'>
                Total Pieces :  <span className='font-normal'>{data.total_pieces}</span>
                </div>
                <div className='flex justify-between text-lg font-medium text-white mb-2'>
                Total Cost : <span className='font-normal'>{data.total_price}</span>
                </div>

                
            </div>
        </div>    
    </div>        
  )
}
