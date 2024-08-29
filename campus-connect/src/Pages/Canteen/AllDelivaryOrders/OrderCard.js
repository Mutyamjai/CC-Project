import React from 'react'

export default function OrderCard({order, order_delivered_fun, complete_order_fun, set_confirmation_model}) {
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

            {
                order.status === "Under_delivering" && (
                    <button onClick={() => {
                        set_confirmation_model({
                            data_1: `Delivered Order.`,
                            data_2: "Note that, on confirmation it will be stored that the order is delivered by you.",
                            btn1_text: "Confirm",
                            btn2_text: "Cancel",
                            btn1_fun: () => order_delivered_fun(order._id),
                            btn2_fun: () => set_confirmation_model(null)
                        })
                    }}>
                        ORDER DELIVERED
                    </button>
                )
            }

            {
                order.status === "Student_received" && (
                    <button onClick={() => {
                        set_confirmation_model({
                            data_1: `Complete Order.`,
                            data_2: "Note that, on confirmation , all the data about the order will be deleted",
                            btn1_text: "Confirm",
                            btn2_text: "Cancel",
                            btn1_fun: () => complete_order_fun(order._id),
                            btn2_fun: () => set_confirmation_model(null)
                        })
                    }}>
                        COMPLETE ORDER
                    </button>
                )
            }

            {
                order.status === "Delivered" && (
                    <div>Waiting for student confirmation !!!</div>
                )
            }
        </div>
    )
}
