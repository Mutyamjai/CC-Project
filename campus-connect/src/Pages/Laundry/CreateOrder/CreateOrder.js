import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Washing_form from './WashingForm';
import Dry_Cleaning_form from './DryCleaningForm';
import Iron_form from './IronForm';
import StringtoNumber from '../../../Utility/StringtoNumber';
import { fetch_order_number } from '../../../Services/Service_Functions/laundry';
import Spinner from '../../../Components/Common/Spinner';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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

    const {token} = useSelector((state) => state.auth);
    const navigate = useNavigate();

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
            total_iron: zzz,
            status : "under_washing"
        }

        console.log(details);
    }

    useEffect(async () => {
        const result = await fetch_order_number(token, navigate);
        await set_order_number(result);
    }, [])

    if(loading)
        return <Spinner/>

  return (

        <form onSubmit={handleSubmit(on_submit)}> 
            <div>
                <div>
                    <label>UserName</label>
                    <input type='text' name='user_name'
                     {...register('user_name', {required: true})}></input>
                    {errors.user_name && <p>User name is required</p>}
                </div>

                <button type='button' onClick={() => set_x(true)}>Washing</button>
                <button type='button' onClick={() => set_xx(true)}>Dry Cleaning</button>
                <button type='button' onClick={() => set_xxx(true)}>Iron</button>

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

            <div>
                total = {y + yy + yyy}
            </div>

            <div>
                total kapadey = {z + zz + zzz}
            </div>

            <div>
                <button type='submit'>Create Order</button>
            </div>
        </form>
  )
}
