import React from 'react';

export default function OrderCard({ order, order_delivered_fun, complete_order_fun, set_confirmation_model }) {
    return (
        <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md mb-4">
            <div className="font-bold text-lg mb-2">Order: {order.order_number}</div>
            <div className="mb-1">Customer Name: {order.user_name}</div>
            <div className="mb-1">Contact Number: {order.contact_number}</div>
            <div className="mb-2">Price: ${order.total_amount.toFixed(2)}</div>

            <div className="mb-2">
                {order.cart.map((item, index) => (
                    <div key={index} className="border-b border-gray-600 py-1">
                        <p>Item Name: {item.item_name}</p>
                        <p>Count: {item.count}</p>
                    </div>
                ))}
            </div>

            {order.status === "Under_delivering" && (
                <button
                    onClick={() => {
                        set_confirmation_model({
                            data_1: `Delivered Order.`,
                            data_2: "Note that, on confirmation it will be stored that the order is delivered by you.",
                            btn1_text: "Confirm",
                            btn2_text: "Cancel",
                            btn1_fun: () => order_delivered_fun(order._id),
                            btn2_fun: () => set_confirmation_model(null)
                        });
                    }}
                    className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition-all duration-200 ease-in-out"
                >
                    Order Delivered
                </button>
            )}

            {order.status === "Student_received" && (
                <button
                    onClick={() => {
                        set_confirmation_model({
                            data_1: `Complete Order.`,
                            data_2: "Note that, on confirmation, all the data about the order will be deleted.",
                            btn1_text: "Confirm",
                            btn2_text: "Cancel",
                            btn1_fun: () => complete_order_fun(order._id),
                            btn2_fun: () => set_confirmation_model(null)
                        });
                    }}
                    className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition-all duration-200 ease-in-out"
                >
                    Complete Order
                </button>
            )}

            {order.status === "Delivered" && (
                <div className="text-yellow-400 font-semibold">Waiting for student confirmation!!!</div>
            )}
        </div>
    );
}
