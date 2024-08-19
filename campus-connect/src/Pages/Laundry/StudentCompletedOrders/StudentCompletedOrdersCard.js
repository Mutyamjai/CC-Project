import React from 'react'
import convert_date from '../../../Utility/dateConvertor'
export default function StudentCompletedOrdersCard({data}) {
  console.log(convert_date(data.created_at))
  return (
    <div className='text-black'>
        <div>{data.order_number}</div>
        <div>{convert_date(data.created_at)}</div>
        <div>{data.total_pieces}</div>
        <div>{data.total_price}</div>
    </div>
  )
}
