import React from 'react'
import convert_date from '../../../Utility/dateConvertor'
import { useNavigate } from 'react-router-dom'

export default function CompletedOrdersCard({data}) {
const navigate = useNavigate();
return (
    <div onClick={() => navigate(`/Laundry/View_Details/${data._id}`)} className="hover:cursor-pointer">
        <div>
            order no : {data.order_number}
        </div>
        <div>
            user name : {data.user_name}
        </div>
        <div>
            date : {convert_date(data.created_at)}
        </div>
        <div>
            total pieces : {data.total_pieces}
        </div>
        <div>
            total cost : {data.total_price}
        </div>

        
    </div>
  )
}
