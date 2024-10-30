import React from 'react'

export default function OrderCard({order, make_it_under_delivering_fun}) {
    return (
        <div>
            <div>order: {order.order_number}</div>
            <div>customer name: {order.user_name}</div>
            <div>contact number: {order.contact_number}</div>
            <div>price: {order.total_amount}</div>

            <div>
                {
                    order.cart.map((item) => (
                        <div>
                            <p>item name : {item.item_name}</p>
                            <p>count : {item.count}</p>
                        </div>
                    ))
                }
            </div>

            <button onClick={() => make_it_under_delivering_fun(order._id)}>Done Cooking</button>
        </div>
    )
}
