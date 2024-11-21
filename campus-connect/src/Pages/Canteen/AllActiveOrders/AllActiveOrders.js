import React, { useEffect, useState } from 'react';
import { accept_order, decline_order, get_all_active_orders, make_it_under_delivering } from '../../../Services/Service_Functions/canteen';
import OrderCard from './OrderCard';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Spinner from '../../../Components/Common/Spinner';
import { useForm } from 'react-hook-form';

export default function AllActiveOrders() {

    const [loading, set_loading] = useState(false);
    const [all_under_cooking, set_all_under_cooking] = useState([]);
    const [new_orders, set_new_orders] = useState([]);
    const navigate = useNavigate();
    const { token } = useSelector(state => state.auth);
    const {user_details} = useSelector(state => state.profile);
    const [search_item, set_search_item] = useState(null);
    const { register, handleSubmit, formState: { errors }, watch } = useForm();

    useEffect(() => {
        const get_all_under_cooking_orders_fun = async () => {
            set_loading(true);
            const result = await get_all_active_orders(token);
            if (result){
                set_all_under_cooking(result.under_cooking_orders);
                set_new_orders(result.new_orders);
            }
            set_loading(false);
        };

        get_all_under_cooking_orders_fun();
    }, [token]);

    const on_submit = () => {
        set_loading(true);
        const searchTerm = watch('item_no');
        const order1 = all_under_cooking.find(d => d.order_number === Number(searchTerm));
        const order2 = new_orders.find(d => d.order_number === Number(searchTerm));
        set_search_item(order1 || order2);
        set_loading(false);
    };

    const make_it_under_delivering_fun = async (id) => {
        set_loading(true);
        await make_it_under_delivering(id, token, navigate);
        set_loading(false);
    };

    const accept_order_fun = async (id) => {
        set_loading(true);
        const response = await accept_order(id, token);

        if(response){
            let help = new_orders.filter(order => order._id !== id);
            set_new_orders(help);

            help = all_under_cooking;
            help.push(response);
            set_all_under_cooking(help);
        }
        set_loading(false);
    };

    const decline_order_fun = async (id, order_no) => {
        set_loading(true);
        const response = await decline_order(id, order_no, user_details._id, token, navigate);

        if(response){
            let help = new_orders.filter(order => order._id !== id);
            set_new_orders(help);
        }
        set_loading(false);
    };

    if (loading) 
        return <Spinner />;

    return (
        <div className="bg-black text-white p-6 min-h-screen">
            <div className='w-5/6 mx-auto'>
                <h1 className="text-red-500 text-center text-3xl font-bold mb-4">ALL ACTIVE ORDERS</h1>

                <h1 className='text-blue-300 font-bold text-center mb-3 text-2xl'>SEARCH ORDER</h1>

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


                {search_item && (
                    <OrderCard order={search_item} make_it_under_delivering_fun={make_it_under_delivering_fun} 
                        accept_order={accept_order_fun} decline_order={decline_order_fun}
                    />
                )}
                {search_item === undefined && (
                    <div className="mb-8 text-center text-xl font-bold mt-4 text-red-500">
                        ITEM NOT FOUND !!
                    </div>
                )}

                <h1 className='text-blue-300 font-bold text-center mb-3 text-2xl'>UNDER COOKING ORDER</h1>
                <div className="mt-4">
                    {all_under_cooking.map((order, index) => (
                        <OrderCard order={order} key={index} make_it_under_delivering_fun={make_it_under_delivering_fun} 
                            accept_order={accept_order_fun} decline_order={decline_order_fun}
                        />
                    ))}
                </div>
                
                {all_under_cooking.length === 0 && (
                    <div className="bg-gray-900 p-6 rounded-lg shadow-md w-full max-w-lg text-center mx-auto">
                        <h2 className="text-red-500 text-2xl font-semibold">NO UNDER COOKING ORDERS ARE FOUND.</h2>
                    </div>
                )}

                <h1 className='text-blue-300 font-bold text-center m-5 text-2xl'>NEW ORDERS</h1>
                <div className="mt-4">
                    {new_orders.map((order, index) => (
                        <OrderCard order={order} key={index} make_it_under_delivering_fun={make_it_under_delivering_fun} 
                            accept_order={accept_order_fun} decline_order={decline_order_fun}
                        />
                    ))}
                </div>

                {new_orders.length === 0 && (
                    <div className="bg-gray-900 p-6 rounded-lg shadow-md w-full max-w-lg text-center mx-auto">
                        <h2 className="text-red-500 text-2xl font-semibold">NO NEW ORDERS ARE PLACED.</h2>
                    </div>
                )}
            </div>
        </div>
    );
}
