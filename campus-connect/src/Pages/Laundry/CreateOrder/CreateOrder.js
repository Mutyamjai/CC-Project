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
            order_number: 0,
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

        <form onSubmit={handleSubmit(on_submit)}> 
            <div>

                <div>
                    Order No : {order_number}
                </div>
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

            {
                confirmation_model && <ConfirmationModel confirmation_model={confirmation_model}/>
            }

            <div>
                total = {y + yy + yyy}
            </div>

            <div>
                total kapadey = {z + zz + zzz}
            </div>

            <div>
                <div className='hover:cursor-pointer' onClick={() =>
                    set_confirmation_model({
                        data_1: "Confirm Order ???",
                        data_2: "Please note that order details can not be changed later.",
                        btn1_text: "Confirm",
                        btn2_text: "Cancel",
                        btn1_fun: handleSubmit(on_submit),
                        btn2_fun: () => set_confirmation_model(null)
                    })
                    }>Create Order</div>
            </div>
        </form>
  )
}
