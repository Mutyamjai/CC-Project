import React from 'react'
import convert_date from '../../../Utility/dateConvertor'
import { useNavigate } from 'react-router-dom'
export default function StudentCompletedOrdersCard({data}) {
  const navigate = useNavigate();
  console.log(convert_date(data.created_at))
  return (
    <div onClick={() => navigate(`/Laundry/View_Details/${data._id}`)} className="hover:cursor-pointer">
        <div>{data.order_number}</div>
        <div>{convert_date(data.created_at)}</div>
        <div>{data.total_pieces}</div>
        <div>{data.total_price}</div>
    </div>
  )
}
