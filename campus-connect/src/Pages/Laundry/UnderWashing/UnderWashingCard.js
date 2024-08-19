import React from 'react'
//import ConfirmationModel from '../../../Components/Common/ConfirmationModel';
export default function UnderWashingCard({data}) {
  return (
    <div>
        <div>
            order no : {data.order_number}
        </div>
        <div>
            user name : {data.user_name}
        </div>
        <div>
            date : {data.created_at}
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
            // {
            //     set_confirmation_model({
            //         data_1: "Confirm Order ???",
            //         data_2: "Please note that order details can not be changed later.",
            //         btn1_text: "Confirm",
            //         btn2_text: "Cancel",
            //         btn1_fun: handleSubmit(on_submit),
            //         btn2_fun: () => set_confirmation_model(null)
            //     })
            // }
        >Ready To Collect</button>
    </div>
  )
}
