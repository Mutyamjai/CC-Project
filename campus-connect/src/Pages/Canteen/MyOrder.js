import React, { useEffect, useState } from 'react'
import { get_my_order_details, order_received } from '../../Services/Service_Functions/canteen';
import { useSelector } from 'react-redux';
import ConfirmationModel from '../../Components/Common/ConfirmationModel';

export default function MyOrder() {

    const [loading, set_loading] = useState(false);
    const {user_details} = useSelector(state => state.profile);
    const {token} = useSelector(state => state.auth);
    const [order, set_order] = useState(null);
    const [confirmation_model, set_confirmation_model] = useState(null);

    useEffect(() => {
        const get_my_order_details_fun = async () => {
            set_loading(true);
            const result = await get_my_order_details(user_details.user_name, token);
            set_order(result);
            set_loading(false);
        }

        get_my_order_details_fun();
    }, [])

    const order_received_fun = async (req, res) => {
        set_loading(true);
        let response = await order_received(order._id, token);

        if(response)
            set_order(response);

        set_confirmation_model(null);
        set_loading(false);
    }

    if(loading)
        return <Spinner/>

    if(!order){
        return(
            <div>
                NO ORDER IS PLACED BY YOU
            </div>
        )
    }

    return (
        <div>
            <div>
                <p>order number: {order.order_number}</p>
                <p>user name: {order.user_name}</p>
                <p>contact number: {order.contact_number}</p>
                <p>payment method: {order.payment_method}</p>
                <p>total amount : {order.total_amount}</p>
            </div>

            <div>
                {
                    order.cart.map((item) => (
                        <div>
                            <p>item name : {item.item_name}</p>
                            <p>count : {item.count}</p>
                        </div>
                    ))
                }
            </div>

            <div>
                {
                    order.status === "Under_cooking" && (
                        <div>
                            status : Under Cooking
                        </div>
                    )
                }

                {
                    order.status === "Under_delivering" && (
                        <div>
                            status : Cooking done
                        </div>
                    )
                }

                {
                    order.status === "Delivered" && (
                        <button onClick={() => {
                            set_confirmation_model({
                                data_1: `Received Order.`,
                                date_2: "Note that, on confirmation it will be stored that the order is received.",
                                btn1_text: "Confirm",
                                btn2_text: "Cancel",
                                btn1_fun: () => order_received_fun(),
                                btn2_fun: () => set_confirmation_model(null)
                            })
                        }}>
                            Received Order
                        </button>
                    )
                }

                {
                    order.status === "Student_received" && (
                        <div>
                            Order received successfully
                        </div>
                    )
                }
            </div>

            {
                confirmation_model && <ConfirmationModel confirmation_model={confirmation_model}/>
            }
        </div>
    )
}
