import React, { useEffect, useState } from 'react';
import Spinner from '../../../Components/Common/Spinner';
import { complete_order, get_all_delivering_orders, make_it_delivered } from '../../../Services/Service_Functions/canteen';
import ConfirmationModel from '../../../Components/Common/ConfirmationModel';
import OrderCard from './OrderCard';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

export default function AllDelivaryOrders() {
    const [loading, set_loading] = useState(false);
    const { token } = useSelector(state => state.auth);
    const [orders, set_orders] = useState([]);
    const [confirmation_model, set_confirmation_model] = useState(null);
    const [search_item, set_search_item] = useState(null);
    const { register, handleSubmit, formState: { errors }, watch } = useForm();

    useEffect(() => {
        const get_all_delivaring_orders_fun = async () => {
            set_loading(true);
            const result = await get_all_delivering_orders(token);

            if (result) set_orders(result);

            set_loading(false);
        };
        get_all_delivaring_orders_fun();
    }, [token]);

    const on_submit = () => {
        set_loading(true);
        const searchTerm = watch('item_no');
        const order = orders.find(d => d.order_number === Number(searchTerm));
        set_search_item(order);
        set_loading(false);
    };

    const order_delivered_fun = async (order_id) => {
        set_loading(true);
        const result = await make_it_delivered(order_id, token);

        if (result)
            set_orders(orders.map(order => order._id === order_id ? result : order));
        set_confirmation_model(null);
        set_loading(false);
    };

    const complete_order_fun = async (order_id) => {
        set_loading(true);
        const result = await complete_order(order_id, token);

        if (result)
            set_orders(orders.filter(order => order._id !== order_id));

        set_confirmation_model(null);
        set_loading(false);
    };

    if (loading) return <Spinner />

    if (orders.length === 0) {
        return (
            <div className="bg-black text-white min-h-screen flex items-center justify-center">
                <h1 className="text-red-500 text-2xl">NO DELIVERABLE ORDERS ARE FOUND.</h1>
            </div>
        );
    }

    return (
        <div className="bg-black text-white min-h-screen p-8">
            <h1 className="text-3xl font-bold text-center mb-6 text-red-500">ALL DELIVERABLE ORDERS</h1>
            <form onSubmit={handleSubmit(on_submit)} className="flex justify-center mb-6">
                <div className="flex items-center">
                    <label className="mr-2 text-lg">Search:</label>
                    <input
                        type='number'
                        placeholder="Enter order number"
                        {...register('item_no', { required: true })}
                        className="bg-gray-700 text-white py-2 px-4 border border-gray-600 rounded-lg mr-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <button
                        type='submit'
                        className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition-all duration-200 ease-in-out"
                    >
                        Search
                    </button>
                </div>
                {errors.item_no && (<p className="text-red-500 mt-2">Item Number Is Required</p>)}
            </form>

            <h1 className='text-blue-300 font-bold text-center mb-3 text-2xl'>SEARCHED ORDER</h1>
            {search_item && (
                <OrderCard
                    order={search_item}
                    set_confirmation_model={set_confirmation_model}
                    order_delivered_fun={order_delivered_fun}
                    complete_order_fun={complete_order_fun}
                />
            )}
            {search_item === undefined && (
                <div className="mb-8 text-center text-xl font-bold mt-4 text-red-500">
                    ITEM NOT FOUND !!
                </div>
            )}

            <div>
                {orders.map((order, index) => (
                    <OrderCard
                        key={index}
                        order={order}
                        set_confirmation_model={set_confirmation_model}
                        order_delivered_fun={order_delivered_fun}
                        complete_order_fun={complete_order_fun}
                    />
                ))}
            </div>

            {confirmation_model && <ConfirmationModel confirmation_model={confirmation_model} />}
        </div>
    );
}
