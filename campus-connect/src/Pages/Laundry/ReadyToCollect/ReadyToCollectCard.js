import React from 'react'
import { make_it_completed_order } from '../../../Services/Service_Functions/laundry';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import convert_date from '../../../Utility/dateConvertor';
<<<<<<< HEAD

=======
>>>>>>> c06f91aa70eb3377348a9667cce443831cebd327

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
        <div className='bg-gray-800 px-10 py-8 w-full border border-blue-700 rounded-lg max-w-md mx-auto flex flex-col mb-10 hover:shadow-lg hover:shadow-blue-300' >
             <div className='mb-4'>
                <div onClick={() => navigate(`/Laundry/View_Details/${data._id}`)} className="hover:cursor-pointer">
                    <div c >
                    Order No # {data.order_number}
                    </div>
                    <div className='flex justify-between text-lg font-medium text-white mb-2'>
                    Username : <span className='font-normal'>{data.user_name}</span>
                    </div>
                    <div className='flex justify-between text-lg font-medium text-white mb-2'>
                    Date : <span className='font-normal'>{convert_date(data.created_at)}</span>
                    </div>
                    <div className='flex justify-between text-lg font-medium text-white mb-2'>
                    Total Pieces :  <span className='font-normal'>{data.total_pieces}</span>
                    </div>
                    <div className='flex justify-between text-lg font-medium text-white mb-2'>
                    Total Cost : <span className='font-normal'>{data.total_price}</span>
                    </div>
                </div>
                <div className='flex justify-center'>
                    {
                        data.status === "Ready_to_collect" && (
                            <div className='text-blue-300 text-xl font-bold mt-8'>Payment Pending!!!</div>
                        )
                    }
                </div>    
                    {
                        data.status === 'Payment_done' && 
                        (
                            <div className='mt-8 text-center'>
                                <div className='text-white font-semibold mb-2 '>Payment done through {data.paid_in}</div>
                                <button
                                    onClick={() => {
                                        set_confirmation_model({
                                            data_1: "Confirm Payment???",
                                            btn1_text: "Confirm",
                                            btn2_text: "Cancel",
                                            btn1_fun: () => on_submit(),
                                            btn2_fun: () => set_confirmation_model(null),
                                            color: "00FF00"
                                        })
                                    }}
                            className='bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 '>Confirm Payment</button>
                            </div>
                        )
                    }
                    
                    
                </div>
        </div>    
  )
}
