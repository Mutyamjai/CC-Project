import React from 'react'

export default function StudentActiveOrdersCard({data, set_confirmation_model, set_loading}) {

    const pay_with_cash = async() => {
        set_loading(true);
        
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
                            <button>Pay with Cash</button>

                            <button>Pay with UPI</button>
                        </div>
                    </div>
                )
            }
            {
                data.status === "Payment_done" && (
                    <p></p>
                )
            }
        </div>
        
        
  )
}
