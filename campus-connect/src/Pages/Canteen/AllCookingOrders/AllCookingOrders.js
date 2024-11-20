import React, { useEffect, useState } from 'react';
import { get_all_delivering_orders, get_all_under_cooking_orders, make_it_under_delivering } from '../../../Services/Service_Functions/canteen';
import OrderCard from './OrderCard';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Spinner from '../../../Components/Common/Spinner';
import { useForm } from 'react-hook-form';

export default function AllCookingOrders() {
    const [loading, set_loading] = useState(false);
    const [all_orders, set_all_orders] = useState([]);
    const navigate = useNavigate();
    const { token } = useSelector(state => state.auth);
    const [search_item, set_search_item] = useState(null);
    const { register, handleSubmit, formState: { errors }, watch } = useForm();

    useEffect(() => {
        const get_all_under_cooking_orders_fun = async () => {
            set_loading(true);
            const result = await get_all_under_cooking_orders(token);
            if (result) set_all_orders(result);
            set_loading(false);
        };

        get_all_under_cooking_orders_fun();
    }, [token]);

    const on_submit = () => {
        set_loading(true);
        const searchTerm = watch('item_no');
        const order = all_orders.find(d => d.order_number === Number(searchTerm));
        set_search_item(order);
        set_loading(false);
    };

    const make_it_under_delivering_fun = async (id) => {
        set_loading(true);
        await make_it_under_delivering(id, token, navigate);
        set_loading(false);
    };

    if (loading) return <Spinner />;

    if (all_orders.length === 0) {
        return (
            <div className="bg-black text-white p-6 min-h-screen flex items-center justify-center">
                <div className="text-center text-xl font-bold">NO ACTIVE ORDERS ARE FOUND</div>
            </div>
        );
    }

    return (
        <div className="bg-black text-white p-6 min-h-screen">
            <h1 className="text-red-500 text-center text-3xl font-bold mb-4">ALL ACTIVE ORDERS</h1>

            <form onSubmit={handleSubmit(on_submit)} className="mb-6 flex items-center justify-center space-x-2">
                <label className="text-red-500 text-xl">Search</label>
                <input
                    type='number'
                    {...register('item_no', { required: true })}
                    className="bg-gray-700 text-white py-2 px-4 border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Enter order number"
                />
                <button
                    type='submit'
                    className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition-all duration-200 ease-in-out"
                >
                    Search
                </button>
                {errors.item_no && (
                    <p className="text-red-500 mt-2">Item Number Is Required</p>
                )}
            </form>

            <h1 className='text-blue-300 font-bold text-center mb-3 text-2xl'>SEARCHED ORDER</h1>

            {search_item && (
                <OrderCard order={search_item} make_it_under_delivering_fun={make_it_under_delivering_fun} />
            )}
            {search_item === undefined && (
                <div className="mb-8 text-center text-xl font-bold mt-4 text-red-500">
                    ITEM NOT FOUND !!
                </div>
            )}

            <div className="mt-4">
                {all_orders.map((order, index) => (
                    <OrderCard order={order} key={index} make_it_under_delivering_fun={make_it_under_delivering_fun} />
                ))}
            </div>
        </div>
    );
}
