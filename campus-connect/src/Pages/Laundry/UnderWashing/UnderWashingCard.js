import React from 'react'
import { make_ready_to_collect } from '../../../Services/Service_Functions/laundry';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import convert_date from '../../../Utility/dateConvertor';

export default function UnderWashingCard({data, set_confirmation_model, set_loading}) {

    const {token} = useSelector((state) => state.auth);
    const {user_details} = useSelector((state) => state.profile);
    const navigate = useNavigate();

    const on_submit = async () => {
        set_loading(true);
        await make_ready_to_collect(user_details.laundry_account ,data._id, token, navigate);
        set_confirmation_model(null);
        set_loading(false);
    }

  return (
    <div onClick={() => navigate(`/Laundry/View_Details/${data._id}`)} className="hover:cursor-pointer">
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
            total washing clothes : {data.total_washing}
        </div>
        <div>
            total dry cleaning clothes : {data.total_dry_cleaning}
        </div>
        <div>
            total iron clothes : {data.total_iron}
        </div>
        <div>
            total pieces : {data.total_pieces}
        </div>
        <div>
            total cost : {data.total_price}
        </div>

        <button
            onClick={() => {
                set_confirmation_model({
                    data_1: "Confirm It???",
                    data_2: "Please note that the change can not be altered.",
                    btn1_text: "Confirm",
                    btn2_text: "Cancel",
                    btn1_fun: () => on_submit(),
                    btn2_fun: () => set_confirmation_model(null)
                })
            }}
        >Ready To Collect</button>
    </div>
  )
}
