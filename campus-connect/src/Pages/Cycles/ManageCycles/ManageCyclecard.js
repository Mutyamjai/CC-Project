import React from 'react';

export default function ManageCyclecard({ data, set_confirmation_model, change_status_to_under_repair_button, change_status_to_under_working_button }) {

    const alterState = async (id) => {
        if (data.status === "Under_working") {
            change_status_to_under_repair_button(id);
        } else {
            change_status_to_under_working_button(id);
        }
    };

    const handleClick = () => {
        set_confirmation_model({
            data_1: "Confirm Change of State?",
            btn1_text: "Confirm",
            btn2_text: "Cancel",
            btn1_fun: () => alterState(data._id),
            btn2_fun: () => set_confirmation_model(null)
        });
    };

    return (
        <div className='bg-gray-800 bg-opacity-80 px-8 py-6 w-full border border-green-700 rounded-lg max-w-md mx-auto flex flex-col mb-10 transition-transform transform hover:scale-105 hover:border-4 hover:border-green-400 hover:shadow-2xl hover:shadow-green-300'>
            <div className='text-2xl font-bold text-white mb-4'>
                CYCLE ID :-  <span className='font-normal'>{ data.id}</span>
            </div>
            <div className='flex justify-between text-lg font-medium text-white mb-3'>
                <span>Cycle No:</span> <span>{data.cycle_number}</span>
            </div>
            <div className='flex justify-between text-lg font-medium text-white mb-4'>
                <span>Cycle Status:</span> <span>{data.status === "Under_working" ?(<div>Under Working</div>) : (<div>Under Repair</div>)}</span>
            </div>

            <div className='flex justify-center gap-4'>
                {data.status === "Under_working" && (
                    <button
                        onClick={handleClick}
                        className='bg-green-500 text-black font-bold py-2 px-4 rounded-lg focus:ring-green-600 focus:outline-none focus:ring-2 hover:bg-green-700 focus:ring-opacity-50 transition-colors'
                    >
                        Add to Repair
                    </button>
                )}

                {data.status === "Under_repair" && (
                    <button
                        onClick={handleClick}
                        className='bg-green-500 text-black font-bold py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 transition-colors'
                    >
                        Completed Repair
                    </button>
                )}
            </div>
        </div>
    );
}
