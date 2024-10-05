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
        <div className="bg-gray-900 min-h-screen p-8 overflow-x-hidden w-full flex flex-col items-center">
    <div className="w-full mb-8 flex justify-center">
        <form onSubmit={handleSubmit(on_submit)} className="flex items-center space-x-4">
            <div>
                <label className="text-white font-semibold mb-2 block text-center text-2xl">Search</label>
                <input type='text'
                    {...register('item_name', { required: true })} placeholder='Enter Item Name'
                    className="bg-gray-800 text-white py-2 px-4 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button type='submit' className="ml-4 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors">Search</button>
                {
                    errors.item_name && (<p className="text-red-500 mt-2">Item Name Is Required</p>)
                }
            </div>
        </form>
    </div>
    <h1 className='text-blue-300 font-bold text-center mb-3 text-2xl'>SEARCHED ORDER</h1>
    <div className="px-6 py-4 flex flex-col items-center">
        {
            search_item && search_item.length > 0 ? (
                search_item.map((item, index) => (
                    <MenuItems data={item} key={index} className="hover:cursor-pointer text-white mb-6 w-full px-4" />
                ))
            ) : (
                <div className="text-center text-xl font-bold mt-4 text-white">
                    ITEM NOT FOUND !!
                </div>
            )
        }
    </div>
    <div className="border-b border-blue-600 mb-5 w-full"></div>
    <h1 className="text-blue-300 font-bold text-center mb-5 text-2xl">MENU</h1>
    <div className="w-full flex flex-col items-center">
        {
            categoryData.map((category, index) => (
                <MenuCategory category={category.displayName} key={index} items={data.filter(item => item.category === category.name)} />
            ))
        }
    </div>
    {
        categoryData.length === 0 && (
            <p className='text-white text-xl font-bold text-center'>NO ORDERS ARE THERE TO COLLECT !!</p>
        )
    }
</div>

    )
}
