import React, { useEffect } from 'react'
import { alter_item_status, get_all_items } from '../../../Services/Service_Functions/canteen';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { categoryData } from '../../../Data/CanteenData';
import ManageCategory from './ManageCategory';
import Spinner from '../../../Components/Common/Spinner';
import { useForm } from 'react-hook-form';
import ManageItemCard from './ManageItemCard';

export default function ManageItems() {

    const [loading,set_loading] = useState(false);
    const [data,set_data] = useState(null);
    const [search_item,set_search_item] = useState(null);
    const {token} = useSelector((state) => state.auth);
    const {register,handleSubmit,formState:{errors},watch} = useForm();

    const alter_availability = async (id, new_status) => {
        set_loading(true);
        const result = await alter_item_status(id, new_status, token);
        console.log(result);
        if(result){
            const new_data = data.map((item) => item._id === result._id ? result : item);
            set_data(new_data);
        }
        set_loading(false);
    }
    const on_submit = () => {
        set_loading(true);
        const searchTerm = watch('item_name').toLowerCase();
        const food = data.filter(d=>d.item_name.toLowerCase().includes(searchTerm))
        set_search_item(food);
        set_loading(false);
    }

    useEffect(() => {
        
        const getItems = async () => {
            set_loading(true);
            const result = await get_all_items(token);
            console.log(result)
            set_data(result);
            set_loading(false);
        }
        getItems();
    },[])

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
                        <ManageItemCard data={item} key={index} alter_availability={alter_availability}
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
                    <ManageCategory name={category.displayName} key={index}
                        items={data.filter((item) => item.category === category.name)}
                        alter_availabilty={alter_availability}
                    />
                ))
            }
        </div>

    </div>
  )
}
