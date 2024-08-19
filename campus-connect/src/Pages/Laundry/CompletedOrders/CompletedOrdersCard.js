import React from 'react'

export default function CompletedOrdersCard({data}) {
  
return (
    <div>
        <div>
            order no : {data.order_number}
        </div>
        <div>
            user name : {data.user_name}
        </div>
        <div>
            date : {data.created_at}
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
