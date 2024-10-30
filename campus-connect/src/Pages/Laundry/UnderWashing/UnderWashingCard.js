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
    <div className='bg-gray-800 px-10 py-8 w-full border border-blue-700 rounded-lg max-w-md mx-auto flex flex-col mb-10 hover:shadow-lg hover:shadow-blue-300' >
            <div className='mb-4'>
                <div onClick={() => navigate(`/Laundry/View_Details/${data._id}`)} className="hover:cursor-pointer ">
                    <div className=' text-2xl font-bold mb-2 text-white'>
                    Order No # {data.order_number}
                    </div>
                    <div className='flex justify-between text-lg font-medium text-white mb-2'>
                    <div className='flex-1'>Username :</div>
                    <div className='flex-2 text-right'>{data.user_name}</div>
                    </div>
                    <div className='flex justify-between text-lg font-medium text-white mb-2'>
                    <div className='flex-1'>Date :</div>
                    <div className='flex-2 text-right'>{convert_date(data.created_at)}</div>
                    </div>
                    <div className='flex justify-between text-lg font-medium text-white mb-2'>
                    Total Washing Clothes : <span className='font-normal'>{data.total_washing}</span>
                    </div>
                    <div className='flex justify-between text-lg font-medium text-white mb-2'>
                    Total Dry Cleaning Clothes : <span className='font-normal'>{data.total_dry_cleaning}</span>
                    </div>
                    <div className='flex justify-between text-lg font-medium text-white mb-2'>
                    Total Iron Clothes : <span className='font-normal'>{data.total_iron}</span>
                    </div>
                    <div className='flex justify-between text-lg font-medium text-white mb-2'>
                    Total Pieces : <span className='font-normal'>{data.total_pieces}</span>
                    </div>
                    <div className='flex justify-between text-lg font-medium text-white mb-2'>
                    Total Cost : <span className='font-normal'>{data.total_price}</span>
                    </div>
            </div> 
                    <div className='mt-8 text-center'>
                    <button
                        onClick={() => {
                            set_confirmation_model({
                                data_1: "Confirm It???",
                                data_2: "Please note that the change can not be altered.",
                                btn1_text: "Confirm",
                                btn2_text: "Cancel",
                                btn1_fun: () => on_submit(),
                                btn2_fun: () => set_confirmation_model(null),
                                color: "00FF00"
                            })
                        }}
                        className='bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 '
                    >Ready To Collect</button>
                    </div>
               
        </div>        
    </div>
  )
}
