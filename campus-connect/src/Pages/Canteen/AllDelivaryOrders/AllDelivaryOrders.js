import React, { useEffect, useState } from 'react'
import Spinner from '../../../Components/Common/Spinner';
import { complete_order, get_all_delivering_orders, make_it_delivered } from '../../../Services/Service_Functions/canteen';
import ConfirmationModel from '../../../Components/Common/ConfirmationModel';
import OrderCard from './OrderCard';
import { useSelector } from 'react-redux';

export default function AllDelivaryOrders() {

    const [loading, set_loading] = useState(false);
    const {token} = useSelector(state => state.auth);
    const [orders, set_orders] = useState([]);
    const [confirmation_model, set_confirmation_model] = useState(null);

    useEffect(()=> {
        const get_all_delivaring_orders_fun = async () => {
            set_loading(true);
            const result = await get_all_delivering_orders(token);

            if(result)
                set_orders(result);

            set_loading(false);
        }
        get_all_delivaring_orders_fun();
    }, [])

    const order_delivered_fun = async (order_id) => {
        set_loading(true);

        const result = await make_it_delivered(order_id, token);

        if(result)
            set_orders(orders.map(order => order._id === order_id ? result : order))
        set_confirmation_model(null);
        set_loading(false);
    }

    const complete_order_fun = async (order_id) => {
        set_loading(true);

        const result = await complete_order(order_id, token);

        if(result)
            set_orders(orders.filter(order => order._id != order_id));

        set_confirmation_model(null);
        set_loading(false);
    }
    if(loading)
        return <Spinner/>

    if(orders.length === 0){
        return (
            <div>
                NO DELIVARABLE ORDERS ARE FOUND.
            </div>
        )
    }

    return (
        <div>
            <h1>ALL DELIVARABLE ORDERS</h1>
            <div>
                <h1> Searched orders</h1>
            </div>

            <div>
                {
                    orders.map((order, index) => (
                        <OrderCard key={index} order={order} set_confirmation_model={set_confirmation_model} 
                            order_delivered_fun={order_delivered_fun} complete_order_fun={complete_order_fun}
                        />
                    ))
                }
            </div>

            {
                confirmation_model && <ConfirmationModel confirmation_model={confirmation_model}/>
            }
        </div>
    )
}
