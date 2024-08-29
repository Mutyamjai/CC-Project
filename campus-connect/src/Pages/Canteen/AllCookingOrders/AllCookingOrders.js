import React, { useEffect, useState } from 'react'
import { get_all_delivering_orders, make_it_under_delivering } from '../../../Services/Service_Functions/canteen';
import OrderCard from './OrderCard';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function AllCookingOrders() {

    const [loading, set_loading] = useState(false);
    const [all_orders, set_all_orders] = useState([]);
    const navigate = useNavigate();
    const {token} = useSelector(state => state.auth);

    useEffect(() => {

        const get_all_under_cooking_orders_fun = async () => {
            set_loading(true);
            const result = await get_all_delivering_orders(token);
            
            if(result)
                set_all_orders(result);

            set_loading(false);
        }

        get_all_under_cooking_orders_fun()
    }, [])

    const make_it_under_delivering_fun = async (id) => {
        set_loading(true);
        await make_it_under_delivering(id, token, navigate);
        set_loading(false);
    }
    
    if(loading)
        return <Spinner/>

    if(all_orders.length === 0){
        return (
            <div>
                NO ACTIVE ORDERS ARE FOUND
            </div>
        )
    }
    return (
        <div>
            <h1>ALL ACTIVE ORDERS</h1>

            <div>
                <h1>SEARCHED ORDER</h1>
            </div>

            <div>
                {
                    all_orders.map((order, index) => (
                        <OrderCard order={order} key={index} make_it_under_delivering_fun={make_it_under_delivering_fun}/>
                    ))
                }
            </div>
        </div>
    )
}
