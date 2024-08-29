import React from 'react'
import { useSelector } from 'react-redux'
import MenuItems from './MenuItems';

export default function Cart() {
    const {cart} = useSelector((state) => state.cart);

    if(cart.length === 0){
        return (<div>
            Your Cart is empty
        </div>)
    }

    const total_quantity = cart.reduce((acc, item) => acc + item.count, 0);
    const total_price = cart.reduce((acc, item) => acc + (item.count * item.price), 0);
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
                <button>BUY NOW</button>
            </div>
        </div>
    )
}
