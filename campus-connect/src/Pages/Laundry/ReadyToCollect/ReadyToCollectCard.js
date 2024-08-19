import React from 'react'
//import 
export default function ReadyToCollectCard({data, set_confirmation_model, set_loading}) {
    const on_submit = async () =>{

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
                date : {data.created_at}
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
                        data_1: "Proceed to Payment???",
                        data_2: "Please note that the change can not be altered.",
                        btn1_text: "Confirm",
                        btn2_text: "Cancel",
                        btn1_fun: () => on_submit(),
                        btn2_fun: () => set_confirmation_model(null)
                    })
                }}
            >Make Bill</button>
        </div>
  )
}
