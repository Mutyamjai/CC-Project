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
        <div>
            <div>
                total quantity : {total_quantity}
            </div>

            <div>
                total price : {total_price}
            </div>

            <div>
                {
                    cart.map((item, index) => (
                        <MenuItems data={item} key={index}/>
                    ))
                }
            </div>

            <div>
                <button onClick={place_order}>BUY NOW</button>
            </div>
        </div>
    )
}
