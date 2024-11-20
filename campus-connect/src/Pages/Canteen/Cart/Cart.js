import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../../Components/Common/Spinner';
import { useNavigate } from 'react-router-dom';
import { create_order } from '../../../Services/Service_Functions/canteen';
import { clear_cart } from '../../../Slices/cartSlice';
import CartItems from './CartItem';

export default function Cart() {
    const { cart } = useSelector((state) => state.cart);
    const { token } = useSelector((state) => state.auth);
    const { user_details } = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const [loading, set_loading] = useState(false);
    const [data, set_data] = useState(cart);
    const navigate = useNavigate();

    const total_quantity = cart.reduce((acc, item) => acc + item.count, 0);
    const total_price = cart.reduce((acc, item) => acc + (item.count * item.price), 0);

    const place_order = async () => {
        set_loading(true);
        const result = await create_order(user_details, cart, total_price, token, navigate);
        if (result) {
            dispatch(clear_cart());
        }
        set_loading(false);
    };

    useEffect(() => {
        set_data(cart);
    }, [cart])

    if (loading) 
        return <Spinner />;

    if (cart.length === 0) {
        return (
            <div className="bg-black min-h-screen p-8 text-white flex flex-col items-center justify-center">
                <div className="bg-gray-900 p-6 rounded-lg shadow-md w-full max-w-lg text-center">
                    <h2 className="text-red-500 text-2xl font-semibold mb-4">Your Cart is Empty</h2>
                    <p className="mb-4">It seems you haven't added anything to your cart yet.</p>
                    <button
                        onClick={() => navigate('/Canteen/Menu')}
                        className="bg-red-500 text-black font-bold py-3 px-8 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
                    >
                        Go to Menu
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-black min-h-screen p-8 text-white flex flex-col items-center">
            <div className="bg-gray-900 p-6 rounded-lg shadow-md w-full max-w-lg mb-4">
                <div className="flex justify-between border-b border-gray-700 pb-2 mb-4">
                    <span className="text-red-500 font-semibold">Total Quantity:</span>
                    <span>{total_quantity}</span>
                </div>
                <div className="flex justify-between border-b border-gray-700 pb-2 mb-4">
                    <span className="text-red-500 font-semibold">Total Price:</span>
                    <span>${total_price.toFixed(2)}</span>
                </div>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg shadow-md w-full max-w-lg mb-4 space-y-4">
                {data.map((item, index) => (
                    <CartItems data={item} key={index} />
                ))}
            </div>

            <button
                onClick={place_order}
                className="bg-red-500 text-black font-bold py-3 px-8 rounded-lg w-full max-w-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
            >
                BUY NOW
            </button>
        </div>
    );
}
