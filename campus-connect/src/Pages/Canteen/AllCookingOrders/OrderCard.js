import React from 'react';

export default function OrderCard({ order, make_it_under_delivering_fun }) {
    return (
        <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md mb-4">
            <h2 className="text-red-500 text-xl font-bold mb-2">Order: {order.order_number}</h2>
            <div className="mb-2">
                <p><strong>Customer Name:</strong> {order.user_name}</p>
                <p><strong>Contact Number:</strong> {order.contact_number}</p>
                <p><strong>Price:</strong> ${order.total_amount.toFixed(2)}</p>
            </div>

            <div className="border-t border-gray-600 mt-2 pt-2">
                <h3 className="text-red-400 font-semibold mb-1">Items:</h3>
                {order.cart.map((item, index) => (
                    <div key={index} className="flex justify-between mb-1">
                        <p>Item Name: {item.item_name}</p>
                        <p>Count: {item.count}</p>
                    </div>
                ))}
            </div>

            <button
                onClick={() => make_it_under_delivering_fun(order._id)}
                className="mt-4 bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition-all duration-200 ease-in-out"
            >
                Done Cooking
            </button>
        </div>
    );
}
