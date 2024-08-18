import React from 'react'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Washing_form from './WashingForm';
import Dry_Cleaning_form from './DryCleaningForm';
import Iron_form from './IronForm';
import { GiWashingMachine } from "react-icons/gi";
import { MdDryCleaning } from "react-icons/md";
import { TbIroningSteam } from "react-icons/tb";
import StringtoNumber from '../../../Utility/StringtoNumber';

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

    const on_submit = (data) => {

        const details = {
            user_name: data.user_name,
            order_number: 0,
            washing: StringtoNumber(washing_data),
            iron: StringtoNumber(iron_data),
            dry_cleaning: StringtoNumber(dry_cleaning_data),
            total_price : y + yy + yyy,
            total_pieces: z + zz + zzz,
            total_washing: z,
            total_dry_cleaning: zz,
            total_iron: zzz
        }

        console.log(details);
    }

  return (
        <div className='w-full h-screen bg-black flex items-center justify-center'>
            <div className='bg-spotify-dark-gray p-8 rounded-lg border border-blue-700 shadow-lg w-full max-w-md'>
                <h1 className='text-4xl text-blue-300 font-bold mb-6 text-center'>Create New Order</h1>
                    <form onSubmit={handleSubmit(on_submit)}> 
                        <div className='mb-4'>
                            <div>
                                <label className='text-blue-300 text-lg font-semibold text-[20px]'>Customer Username<sup className='text-red-500'>*</sup></label>
                                <input type='text' 
                                placeholder='Enter Customer Username'
                                name='user_name'
                                {...register('user_name', {required: true})}
                                className="w-full p-2 mt-1 border border-blue-700 rounded bg-gray-700 text-white">
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

                        {/* Separate Boxes for Total Amount and Total Items */}
                        <div className='flex justify-between mb-4'>
                            {/* Box for Total Amount */}
                            <div className='bg-blue-500 text-white p-2 rounded w-1/2 sm-w-1/2 sm:mr-2 mb-4 sm:mb-0 hover:bg-blue-600 hover:scale-105 transition-transform duration-300'>
                                <div className='text-lg font-semibold text-center'>
                                    Total Amount
                                </div>
                                <div className='text-4xl font-semibold text-center mt-2'>
                                    <span>&#8377;</span>{y + yy + yyy}
                                </div>
                            </div>
                            {/* Box for Total Items */}
                            <div className='bg-blue-500 text-white p-2 rounded w-1/2 sm:w-1/2 sm:mr-2 mb-4 sm:mb-0 hover:bg-blue-600 hover:scale-105 transition-transform duration-300'>
                                <div className='text-lg font-semibold text-center'>
                                    Total Items
                                </div>
                                <div className='text-4xl font-semibold text-center mt-2 '>
                                    {z + zz + zzz}
                                </div>
                            </div>
                        </div>

                        <div className='flex justify-center'>
                            <button type='submit' className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-green-600 hover:scale-105 transition-transform duration-300 ">Create Order</button>
                        </div>
                    </form>
        </div>     
    </div>                
  )
}
