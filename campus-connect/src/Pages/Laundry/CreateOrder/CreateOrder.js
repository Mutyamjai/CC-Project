import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Washing_form from './WashingForm';
import Dry_Cleaning_form from './DryCleaningForm';
import Iron_form from './IronForm';
import StringtoNumber from '../../../Utility/StringtoNumber';
import { create_laundry_order, fetch_order_number } from '../../../Services/Service_Functions/laundry';
import Spinner from '../../../Components/Common/Spinner';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ConfirmationModel from '../../../Components/Common/ConfirmationModel';
import { GiWashingMachine } from "react-icons/gi";
import { MdDryCleaning } from "react-icons/md";
import { TbIroningSteam } from "react-icons/tb";

export default function Create_Order() {

    const {register,handleSubmit,formState:{errors}} = useForm();
    const [washing_data, set_washing_data] = useState({});
    const [iron_data, set_iron_data] = useState({});
    const [dry_cleaning_data, set_dry_cleaning_data] = useState({});
    const [x, set_x] = useState(false);
    const [xx, set_xx] = useState(false);
    const [xxx, set_xxx] = useState(false);
    const [y, set_y] = useState(0);
    const [yy, set_yy] = useState(0);
    const [yyy, set_yyy] = useState(0);
    const [z, set_z] = useState(0);
    const [zz, set_zz] = useState(0);
    const [zzz, set_zzz] = useState(0);
    const [order_number,set_order_number] = useState(-1);
    const [loading, set_loading] = useState(false);
    const [confirmation_model, set_confirmation_model] = useState(null);

    const {token} = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const on_submit = async (data) => {

        set_loading(true);
        const details = {
            user_name: data.user_name,
            order_number: order_number,
            washing: StringtoNumber(washing_data),
            iron: StringtoNumber(iron_data),
            dry_cleaning: StringtoNumber(dry_cleaning_data),
            total_price : y + yy + yyy,
            total_pieces: z + zz + zzz,
            total_washing: z,
            total_dry_cleaning: zz,
            total_iron: zzz,
            status : "Under_washing"
        }
        await create_laundry_order(details, token, navigate);
        set_confirmation_model(null);
        set_loading(false);
    }

    useEffect(() => {
        const fetchOrderNumber = async () => {
            try {
                const result = await fetch_order_number(token, navigate);
                set_order_number(result);
            } catch (error) {
                console.error("Error fetching order number:", error);
            }
        };
    
        fetchOrderNumber();
    }, []);
    

    if(loading)
        return <Spinner/>

  return (
    <div className='w-full h-screen bg-black flex items-center justify-center'>
        <div className='bg-spotify-dark-gray p-8 rounded-lg border border-blue-700 shadow-lg w-full max-w-md'>
            <h1 className='text-4xl text-blue-300 font-bold mb-6 text-center'>Create New Order</h1>

            <div>
                Order No : {order_number}
            </div>

            <form> 
                <div className='mb-4'>
                    <div>
                        <label className='text-blue-300 text-lg font-semibold text-[20px]'>Customer Username<sup className='text-red-500'>*</sup></label>
                        <input type='text' 
                        placeholder='Enter Customer Username'
                        name='user_name'
                        {...register('user_name', {required: true})}
                        className="w-full p-2 mt-1 border border-blue-700 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300">
                        </input>
                        {errors.user_name && <p className="text-red-500 text-sm">User name is required</p>}
                    </div>

                    <div className="flex justify-between mt-4">
                    <button type='button' onClick={() => set_x(true)} className="bg-blue-500 text-white py-2 px-4 rounded flex items-center hover:bg-blue-600 hover:scale-105 transition-transform duration-300" title="Add Washing Service">
                    <GiWashingMachine  className="mr-2" />Washing
                    </button>
                    <button type='button' onClick={() => set_xx(true)} className="bg-blue-500 text-white py-2 px-4 rounded flex items-center hover:bg-blue-600 hover:scale-105 transition-transform duration-300" title="Add Dry Cleaning Service">
                      <MdDryCleaning  className="mr-2" />Dry Cleaning
                    </button>
                    <button type='button' onClick={() => set_xxx(true)} className="bg-blue-500 text-white py-2 px-4 rounded flex items-center hover:bg-blue-600 hover:scale-105 transition-transform duration-300" title="Add Iron Service">
                    <TbIroningSteam className="mr-2" />Iron
                    </button>
                    </div>
                </div>

                {
                    x && (
                        <Washing_form set_x={set_x} set_washing_data={set_washing_data} set_total={set_y} order_data={washing_data} set_total_quantity={set_z}/>
                    )
                }

                {
                    xx && (
                    
                        <Dry_Cleaning_form set_xx={set_xx} set_dry_cleaning_data={set_dry_cleaning_data} set_total={set_yy} order_data={dry_cleaning_data} set_total_quantity={set_zz}/>
                    
                    )
                }

                {
                    xxx && (
                        <Iron_form set_xxx={set_xxx} set_iron_data={set_iron_data} set_total={set_yyy} order_data={iron_data} set_total_quantity={set_zzz}/>
                    )
                }

                {
                    confirmation_model && <ConfirmationModel confirmation_model={confirmation_model}/>
                }

                <div className='flex justify-between mb-4'>
                    <div className='bg-blue-500 text-white p-2 rounded w-1/2 sm-w-1/2 sm:mr-2 mb-4 sm:mb-0 hover:bg-blue-600 hover:scale-105  transition-transform duration-300'>
                        <div className='text-lg font-semibold text-center'>
                            Total Amount
                        </div>
                        <div className='text-4xl font-semibold text-center mt-2'>
                            <span>&#8377;</span>{y + yy + yyy}
                        </div>
                    </div>
                    <div className='bg-blue-500 text-white p-2 rounded w-1/2 sm:w-1/2 sm:mr-2 mb-4 sm:mb-0 hover:bg-blue-600 hover:scale-105 transition-transform duration-300'>
                        <div className='text-lg font-semibold text-center'>
                            Total Items
                        </div>
                        <div className='text-4xl font-semibold text-center mt-2 '>
                            {z + zz + zzz}
                        </div>
                    </div>
                </div>

                <div>
                    <div className='hover:cursor-pointer bg-blue-500 text-white py-2 px-4 
                        rounded hover:bg-green-600 hover:scale-105 transition-transform duration-300 ' onClick={() =>
                        set_confirmation_model({
                            data_1: "Confirm Order ???",
                            data_2: "Please note that order details can not be changed later.",
                            btn1_text: "Confirm",
                            btn2_text: "Cancel",
                            btn1_fun: handleSubmit(on_submit),
                            btn2_fun: () => set_confirmation_model(null)
                        })
                        }
                        >Create Order</div>
                </div>
            </form>
        </div>     
    </div>  
  )
}
