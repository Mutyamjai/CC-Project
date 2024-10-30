import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { add_item, remove_item } from '../../Slices/cartSlice';

export default function MenuItems({data}) {

    const {cart} = useSelector((state) => state.cart);
    const item_in_cart = cart.find(item => item._id === data._id);
    const [count, set_count] = useState(item_in_cart ? item_in_cart.count : 0);
    
    const dispatch = useDispatch();

    const increase_item = () => {
        dispatch(add_item(data));
        set_count(count + 1);
        console.log(cart);
    }

    const decrease_item = () => {
        if(count === 0)
            return;
        dispatch(remove_item(data));
        set_count(count - 1);
    }
    return (
        <div>
            <div>{data.item_name}</div>
            <div>{data.price}</div>
            <div>{data.status}</div>
            <img src={data.image} width={100} height={100}></img>
            <div>{data.status}</div>

            <div>
                {
                    data.status === "Available" && (
                        <div className='flex'>
                            <button onClick={increase_item}>+</button>
                            <p>{count}</p>
                            <button onClick={decrease_item}>-</button>
                        </div>  
                    )
                }
                
            </div>
        </div>
    )
}
