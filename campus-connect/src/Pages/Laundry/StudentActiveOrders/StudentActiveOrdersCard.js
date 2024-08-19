import React from 'react'
import { paid_in_cash, paid_in_online } from '../../../Services/Service_Functions/laundry';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function StudentActiveOrdersCard({data, set_confirmation_model, set_loading}) {
    const navigate = useNavigate();
    const{token} = useSelector((state)=>state.auth);

    const pay_with_cash = async() => {
        set_loading(true);
        await paid_in_cash(data._id, token, navigate);
        set_confirmation_model(null);
        set_loading(false);
    }
    const pay_with_upi = async() => {
        set_loading(true);
        await paid_in_online(data._id, token, navigate);
        set_confirmation_model(null);
        set_loading(false);
    }
  return (
        <div>
            <div>{data.order_number}</div>
            <div>{data.created_at}</div>
            <div>{data.total_pieces}</div>
            <div>{data.total_price}</div>
            {
                data.status === "Under_washing" && (
                    <p>under washing</p>
                )
            }
            {
                data.status === "Ready_to_collect" && (
                    <div>
                        <p>clothes are ready to collect</p>
                        <div>
                            <button
                             onClick={() => {
                                set_confirmation_model({
                                    data_1: "Confirm Payment with cash??",
                                    data_2: "Please note that the change can not be altered later.",
                                    btn1_text: "Confirm",
                                    btn2_text: "Cancel",
                                    btn1_fun: () => pay_with_cash(),
                                    btn2_fun: () => set_confirmation_model(null)
                                })
                            }}
                            >Pay with Cash</button>

                            <button
                            onClick={() => {
                                set_confirmation_model({
                                    data_1: "Confirm Payment with cash??",
                                    data_2: "Please note that the change can not be altered later.",
                                    btn1_text: "Confirm",
                                    btn2_text: "Cancel",
                                    btn1_fun: () => pay_with_upi(),
                                    btn2_fun: () => set_confirmation_model(null)
                                })
                            }}
                            >Pay with UPI</button>
                        </div>
                    </div>
                )
            }
            {
                data.status === "Payment_done" && (
                    <p>Waiting for laundry owner for confirmation</p>
                )
            }
        </div>
        
        
  )
}
