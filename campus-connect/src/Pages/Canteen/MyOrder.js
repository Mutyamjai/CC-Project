import React, { useEffect, useState } from 'react';
import { get_my_order_details, order_received } from '../../Services/Service_Functions/canteen';
import { useSelector } from 'react-redux';
import ConfirmationModel from '../../Components/Common/ConfirmationModel';
import Spinner from '../../Components/Common/Spinner';

export default function MyOrder() {
    const [loading, set_loading] = useState(false);
    const { user_details } = useSelector(state => state.profile);
    const { token } = useSelector(state => state.auth);
    const [order, set_order] = useState(null);
    const [confirmation_model, set_confirmation_model] = useState(null);

    useEffect(() => {
        const get_my_order_details_fun = async () => {
            set_loading(true);
            const result = await get_my_order_details(user_details.user_name, token);
            set_order(result);
            set_loading(false);
        };

        get_my_order_details_fun();
    }, [user_details.user_name, token]);

    const order_received_fun = async () => {
        set_loading(true);
        let response = await order_received(order._id, token);
        if (response) set_order(response);
        set_confirmation_model(null);
        set_loading(false);
    };

    if (loading) return <Spinner />;

    if (!order) {
        return (
            <div className="text-center text-white text-2xl mt-20 font-semibold">
                NO ORDER IS PLACED BY YOU
            </div>
        );
    }

    return (
        <div className="bg-black min-h-screen p-8 text-white flex flex-col items-center">
            <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-lg mb-4">
                <h2 className="text-red-500 font-bold text-xl mb-4">Order Details</h2>
                <div className="space-y-2">
                    <p><span className="font-semibold">Order Number:</span> {order.order_number}</p>
                    <p><span className="font-semibold">User Name:</span> {order.user_name}</p>
                    <p><span className="font-semibold">Contact Number:</span> {order.contact_number}</p>
                    <p><span className="font-semibold">Payment Method:</span> {order.payment_method}</p>
                    <p><span className="font-semibold">Total Amount:</span> ${order.total_amount.toFixed(2)}</p>
                </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-lg mb-4">
                <h3 className="text-red-500 font-bold text-xl mb-4">Items in Order</h3>
                <div className="space-y-4">
                    {order.cart.map((item, index) => (
                        <div key={index} className="border-b border-gray-700 pb-2">
                            <p><span className="font-semibold">Item Name:</span> {item.item_name}</p>
                            <p><span className="font-semibold">Count:</span> {item.count}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-lg mb-4">
                <h3 className="text-red-500 font-bold text-xl mb-4">Order Status</h3>
                <div className="space-y-2">
                    {order.status === "Under_cooking" && (
                        <p className="text-yellow-500">Status: Under Cooking</p>
                    )}
                    {order.status === "Under_delivering" && (
                        <p className="text-yellow-500">Status: Cooking done</p>
                    )}
                    {order.status === "Delivered" && (
                        <button
                            onClick={() => {
                                set_confirmation_model({
                                    data_1: `Received Order.`,
                                    data_2: "Note that, on confirmation it will be stored that the order is received.",
                                    btn1_text: "Confirm",
                                    btn2_text: "Cancel",
                                    btn1_fun: () => order_received_fun(),
                                    btn2_fun: () => set_confirmation_model(null),
                                });
                            }}
                            className="bg-red-500 text-black font-bold py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
                        >
                            Received Order
                        </button>
                    )}
                    {order.status === "Student_received" && (
                        <p className="text-green-500">Order received successfully</p>
                    )}
                </div>
            </div>

            {confirmation_model && <ConfirmationModel confirmation_model={confirmation_model} />}
        </div>
    );
}
