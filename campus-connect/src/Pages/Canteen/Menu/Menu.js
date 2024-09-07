import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import {get_menu} from "../../../Services/Service_Functions/canteen";
import { useSelector } from 'react-redux';
import Spinner from '../../../Components/Common/Spinner';
import { categoryData } from '../../../Data/CanteenData';
import MenuCategory from './MenuCategory';
import MenuItems from '../MenuItems';
import { useForm } from 'react-hook-form';

export default function Menu() {

    const [loading, set_loading] = useState(false);
    const {token} = useSelector((state) => state.auth);
    const [data, set_data] = useState(null);
    const [search_item,set_search_item] = useState(null);
    const {register,handleSubmit,formState:{errors},watch} = useForm();


    const on_submit = () => {
        set_loading(true);
        const searchTerm = watch('item_name').toLowerCase();
        const food = data.filter(d=>d.item_name.toLowerCase().includes(searchTerm))
        set_search_item(food);
        set_loading(false);
    }

    useEffect(() => {
        const get_menu_details = async () => {

            set_loading(true);

            const result = await get_menu(token);
            console.log(result);
            set_data(result);

            set_loading(false);
        }

        get_menu_details();
    }, [])

    if(loading || !data)
        return <Spinner/>

    return (
        <div>
             <form onSubmit={handleSubmit(on_submit)}>
            <div>
                <label>Search</label>
                <input type='text'
                {...register('item_name',{required:true})}></input>
                <button type='submit'>Search</button>
                {
                    errors.item_name && (<p className="text-red-500 mt-2">Item Name Is Required</p>)
                }
            </div>
        </form>
        <h1 className='text-blue-300 font-bold text-center mb-3 text-2xl'>SEARCHED ORDER</h1>
            {
                search_item && (
                    search_item.map((item, index) => (
                        <MenuItems data={item} key={index} 
                        />
                    ))
                )
            }
            {
                search_item === undefined && (
                    <div className="mb-8 text-center text-xl font-bold mt-4 text-white" >
                                ITEM NOT FOUND !!
                    </div>
                )
            }

            <div>
                {
                    categoryData.map((category, index) => (
                        <MenuCategory name={category.displayName} key={index} items={data.filter(item => item.category === category.name)}/>
                    ))
                }
            </div>
        </div>
    )
}
