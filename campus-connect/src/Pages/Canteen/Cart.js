import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MenuItems from './MenuItems';
import Spinner from '../../Components/Common/Spinner';
import { useNavigate } from 'react-router-dom';
import { create_order } from '../../Services/Service_Functions/canteen';
import { clear_cart } from '../../Slices/cartSlice';

export default function Cart() {
    const {cart} = useSelector((state) => state.cart);
    const {token} = useSelector(state => state.auth);
    const {user_details} = useSelector(state => state.profile);
    const dispatch = useDispatch();
    const [loading, set_loading] = useState(false);
    const navigate = useNavigate();

    const total_quantity = cart.reduce((acc, item) => acc + item.count, 0);
    const total_price = cart.reduce((acc, item) => acc + (item.count * item.price), 0);

    const place_order = async (req, res) => {

        set_loading(true);
        const result = await create_order(user_details, cart, total_price, token, navigate);

        if(result){
            dispatch(clear_cart());
        }
        set_loading(false);
    }

    if(loading)
        return <Spinner/>

    if(cart.length === 0){
        return (<div>
            Your Cart is empty
        </div>)
    }

    return (
        <div className="bg-gray-900 min-h-screen p-8 overflow-x-hidden w-full flex flex-col items-center">
        <div className="w-full max-w-2xl bg-gray-800 px-6 py-4 border border-blue-700 rounded-lg mb-8 flex flex-col items-center">
            <div className="text-white text-lg font-bold mb-4">Your Cart</div>
            
            <div className="w-full mb-6 flex justify-between items-center text-white">
                <div className="text-lg">Total Quantity: <span className="font-semibold">{total_quantity}</span></div>
                <div className="text-lg">Total Price: <span className="font-semibold">₹{total_price}</span></div>
            </div>
    
            <div className="w-full transition-all duration-500 ease-in-out">
                {cart.map((item, index) => (
                    <MenuItems 
                        data={item} 
                        key={index} 
                        className="hover:cursor-pointer text-white mb-6 w-full px-4" 
                    />
                ))}
            </div>
    
            <button 
                onClick={place_order} 
                className="mt-6 py-2 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors text-lg font-semibold"
            >
                BUY NOW
            </button>
        </div>
    </div>
    
    )
}
