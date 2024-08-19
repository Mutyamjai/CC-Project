import React from 'react'
import { make_it_completed_order } from '../../../Services/Service_Functions/laundry';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import convert_date from '../../../Utility/dateConvertor';
export default function ReadyToCollectCard({data, set_confirmation_model, set_loading}) {

    const {token} = useSelector((state) => state.auth);
    const {user_details} = useSelector((state) => state.profile);
    const navigate = useNavigate();

    const on_submit = async () =>{
        set_loading(true);
        await make_it_completed_order(user_details.laundry_account, data._id, token, navigate);
        set_confirmation_model(null);
        set_loading(false);
    }
    return (
        <div>
            <div>
                order no : {data.order_number}
            </div>
            <div>
                user name : {data.user_name}
            </div>
            <div>
                date : {convert_date(data.created_at)}
            </div>
            <div>
                total pieces : {data.total_pieces}
            </div>
            <div>
                total cost : {data.total_price}
            </div>

            {
                data.status === "Ready_to_collect" && (
                    <div>Payment pending!!!</div>
                )
            }
            {
                data.status === 'Payment_done' && (
                    <div>
                        <div>Payment done through {data.paid_in}</div>
                        <button
                            onClick={() => {
                                set_confirmation_model({
                                    data_1: "Confirm Payment???",
                                    btn1_text: "Confirm",
                                    btn2_text: "Cancel",
                                    btn1_fun: () => on_submit(),
                                    btn2_fun: () => set_confirmation_model(null)
                                })
                            }}
                        >Confirm Payment</button>
                    </div>
                )
            }
            
        </div>
  )
}
