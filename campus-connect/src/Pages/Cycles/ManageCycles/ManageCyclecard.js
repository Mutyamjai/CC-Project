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
    <div className='bg-gray-800 px-10 py-8 w-full border border-blue-700 rounded-lg max-w-md mx-auto flex flex-col mb-10 hover:shadow-lg hover:shadow-blue-300'>
        <div className=' text-2xl font-bold mb-2 text-white'>Cycle Id : {data.id}</div>
        <div className='flex justify-between text-lg font-medium text-white mb-2'>Cycle No : {data.cycle_number}</div>
        <div className='flex justify-between text-lg font-medium text-white mb-2'>
            Cycle status : {data.status}
        </div>
        <div className='flex justify-center'>
        {
            data.status === "Under_working" && 
            <button onClick={handle_click} className='bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 '> 
                Change state to under repair
            </button>
        }
        </div>
        <div className='flex justify-center'>
        {
            data.status === "Under_repair" && 
            <button onClick={handle_click} className='bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 '>
                Change state to under working
            </button>
        }
        </div>
    </div>
  )
}
