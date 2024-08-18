import React from 'react'
import { dryCleanData } from '../../../Data/LaundryData';
import { useForm } from 'react-hook-form';
import LaundryInput from './LaundryInput';
import StringtoNumber from '../../../Utility/StringtoNumber';
import calculateTotalPrice from '../../../Utility/priceCaluclator';
import getTotalQuantity from '../../../Utility/quantityCounter';

export default function Dry_Cleaning_form({set_xx, set_dry_cleaning_data, set_total, order_data,set_total_quantity}) {

    const {register, handleSubmit, formState: {errors}} = useForm();

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
    <div className='absolute inset-0 z-[60] bg-white bg-opacity-70'>
        <h1>DRY CLEANING FORM</h1>

        <div className='flex justify-end'>
            <button onClick={() => set_xx(false)}>X</button>
        </div>

        {
            dryCleanData.map((item, index) => (
                <LaundryInput key={index} register={register} item={item} initial={order_data ? order_data[item.name] : 0}/>
            ))
        }
        
        <div>
            <button type='button' onClick={
                handleSubmit(on_submit)
            }>Save</button>
        </div>

    </div>
  )
}
