import React from 'react'

export default function ManageCyclecard({data, set_confirmation_model, change_status_to_under_repair_button, change_status_to_under_working_button}) {

    const alter_state = async (id) => {
        if(data.status === "Under_working")
            change_status_to_under_repair_button(id);
        else
            change_status_to_under_working_button(id);
    }

    const handle_click = () => {
        set_confirmation_model({
            data_1: "Confirm Change of state???",
            btn1_text: "Confirm",
            btn2_text: "Cancel",
            btn1_fun: () => alter_state(data._id),
            btn2_fun: () => set_confirmation_model(null)
        })
    }
  return (
    <div>
        <div>Cycle Id : {data.id}</div>
        <div>Cycle No : {data.cycle_number}</div>
        <div>
            Cycle status : {data.status}
        </div>

        {
            data.status === "Under_working" && 
            <button onClick={handle_click}> 
                Change state to under repair
            </button>
        }
        {
            data.status === "Under_repair" && 
            <button onClick={handle_click}>
                change state to under working
            </button>
        }
    </div>
  )
}
