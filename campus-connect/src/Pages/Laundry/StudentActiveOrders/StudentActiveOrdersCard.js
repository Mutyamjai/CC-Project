import React, { useState } from 'react'
import { paid_in_cash, paid_in_online } from '../../../Services/Service_Functions/laundry';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import convert_date from '../../../Utility/dateConvertor';
import ViewDetails from '../ViewDetails';
import { Link } from 'react-router-dom';
export default function StudentActiveOrdersCard({data, set_confirmation_model, set_loading}) {
    const navigate = useNavigate();
    const{token} = useSelector((state)=>state.auth);

    const pay_with_cash = async() => {
        set_loading(true);
        await paid_in_cash(data._id, token, navigate);
        set_confirmation_model(null);
        set_loading(false);
    }
    const pay_with_upi = async() => {
        set_loading(true);
        await paid_in_online(data._id, token, navigate);
        set_confirmation_model(null);
        set_loading(false);
    }
    
  return (
    <div className="hover:cursor-pointer w-5/6 flex flex-col justify-between bg-gray-800 p-4 rounded-lg min-h-full border border-blue-600 hover:shadow-lg hover:shadow-blue-300">
        
                <div onClick={() => navigate(`/Laundry/View_Details/${data._id}`)} className="hover:cursor-pointer">
                <div className=" text-white text-xl font-bold">
                    <span>Order Number #</span>
                    {data.order_number}
                </div>
                <div className="flex justify-between text-white">
                    <span>Date:</span>
                    <span>{convert_date(data.created_at)}</span>
                </div>
                <div className="flex justify-between text-white">
                    <span>Total Pieces:</span>
                    <span>{data.total_pieces}</span>
                </div>
                <div className="flex justify-between text-white">
                    <span>Total Price:</span>
                    <span>{data.total_price}</span>
                </div>
                    {
                        data.status === "Under_washing" && (
                            <p className="mt-4 text-yellow-400">Under Washing</p>
                        )
                    }
                    {
                        data.status === "Ready_to_collect" && (
                            <div className="mt-4">
                                <p className="text-green-400">Clothes are ready to collect</p>
                            <div className="mt-2 flex justify-between">
                                    <button
                                    onClick={() => {
                                        set_confirmation_model({
                                            data_1: "Confirm Payment with cash??",
                                            data_2: "Please note that the change can not be altered later.",
                                            btn1_text: "Confirm",
                                            btn2_text: "Cancel",
                                            btn1_fun: () => pay_with_cash(),
                                            btn2_fun: () => set_confirmation_model(null)
                                        })
                                    }}
                                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                    >Pay with Cash</button>

                                    <button
                                    onClick={() => {
                                        set_confirmation_model({
                                            data_1: "Confirm Payment with cash??",
                                            data_2: "Please note that the change can not be altered later.",
                                            btn1_text: "Confirm",
                                            btn2_text: "Cancel",
                                            btn1_fun: () => pay_with_upi(),
                                            btn2_fun: () => set_confirmation_model(null)
                                        })
                                    }}
                                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Pay with UPI</button>
                                </div>
                            </div>
                        )
                    }
                    {
                        data.status === "Payment_done" && (
                            <div className="mt-4 text-red-500">
                            <p>Waiting for laundry owner confirmation</p>
                            </div>
                        )
                    }
                </div>
            </div>    
        
        
  )
}
