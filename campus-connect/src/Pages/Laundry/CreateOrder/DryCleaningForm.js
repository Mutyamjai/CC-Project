import React from 'react'
import { dryCleanData } from '../../../Data/LaundryData';
import { useForm } from 'react-hook-form';
import LaundryInput from './LaundryInput';
import StringtoNumber from '../../../Utility/StringtoNumber';
import calculateTotalPrice from '../../../Utility/priceCaluclator';
import getTotalQuantity from '../../../Utility/quantityCounter';


export default function Dry_Cleaning_form({set_xx, set_dry_cleaning_data, set_total, order_data,set_total_quantity}) {
    
    const {register, handleSubmit} = useForm();

    const on_submit = async (data) => {
        const details = StringtoNumber(data);
        const totalPrice = calculateTotalPrice(dryCleanData, details);
        const totalQuantity = getTotalQuantity(details);
        await set_total(totalPrice);
        await set_dry_cleaning_data(data);
        await set_total_quantity(totalQuantity);
        await set_xx(false);
    }
    
  return (
    <div className='absolute inset-0 z-60 bg-black bg-opacity-50 flex items-center justify-center'>
        <div className='bg-spotify-dark-gray border-2 border-blue-700 rounded-lg shadow-xl w-11/12 max-w-lg p-8 relative mt-20'>
            <h1 className='text-2xl font-bold text-center text-blue-500 mb-4'>DRY CLEANING ORDER DETAILS</h1>

            <div className='absolute top-2 right-4 text-gray-500'>
                <button onClick={() => set_xx(false)}
                className='text-2xl font-bold text-gray-500 hover:text-red-500 focus:outline-none'>X</button>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-14 gap-y-4'>
            {
                dryCleanData.map((item, index) => (
                    <LaundryInput key={index} register={register} item={item} initial={order_data ? order_data[item.name] : 0} />
                ))
            }
            </div>
            
            <div className='mt-6 flex justify-center'>
                    <button type='button'
                    className='bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
                    onClick={
                        handleSubmit(on_submit)
                    }>Save</button>
            </div>
        </div>    

    </div>
  )
}
