import React, { useEffect, useState } from 'react';
import { alter_item_status, get_all_items } from '../../../Services/Service_Functions/canteen';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { categoryData } from '../../../Data/CanteenData';
import ManageCategory from './ManageCategory';
import Spinner from '../../../Components/Common/Spinner';
import ManageItemCard from './ManageItemCard';

export default function ManageItems() {
    const [loading, set_loading] = useState(false);
    const [data, set_data] = useState([]);
    const [search_item, set_search_item] = useState([]);
    const { token } = useSelector((state) => state.auth);
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const [hasSearched, set_has_searched] = useState(false);

    const alter_availability = async (id, new_status) => {
        set_loading(true);
        const result = await alter_item_status(id, new_status, token);
        if (result) {
            const new_data = data.map((item) => item._id === result._id ? result : item);
            set_data(new_data);
            const new_search_data = search_item.map((item) => item._id === result._id ? result : item);
            set_search_item(new_search_data);
        }
        set_loading(false);
    };

    const on_submit = () => {
        set_loading(true);
        const searchTerm = watch('item_name').toLowerCase();
        const food = data.filter(d => d.item_name.toLowerCase().includes(searchTerm));
        set_search_item(food);
        
        if(searchTerm === "")
            set_has_searched(false);
        else
            set_has_searched(true); 
        set_loading(false);
    };

    useEffect(() => {
        const getItems = async () => {
            set_loading(true);
            const result = await get_all_items(token);
            if(result)
                set_data(result);
            set_loading(false);
        };

        set_loading(true);
        getItems();
        set_loading(false);

        // eslint-disable-next-line
    }, []);

    if (loading) 
        return <Spinner />;

    return (
        <div className="bg-black p-6 min-h-screen pb-10">
            <div className='w-5/6 mx-auto'>
                <h1 className='text-red-500 font-bold text-center mb-4 text-3xl'>Manage Items</h1>

                <form onSubmit={handleSubmit(on_submit)} className="mb-6 flex justify-center">
                    <label className="text-red-500 mr-2 text-xl">Search</label>
                    <input
                        type='text'
                        {...register('item_name', { required: true })}
                        className="flex-1 p-2 bg-gray-800 text-red-500 border border-gray-600 rounded transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Search for an item"
                    />
                    <button
                        type='submit'
                        className="ml-2 bg-red-500 text-white p-2 rounded transition duration-300 ease-in-out hover:bg-red-600"
                    >
                        Search
                    </button>
                    {errors.item_name && (
                        <p className="text-red-500 mt-2">Item Name Is Required</p>
                    )}
                </form>

                <h1 className='text-blue-300 font-bold text-center mb-3 text-2xl px-3 py-4'>SEARCHED ITEM</h1>

                {hasSearched && search_item.length === 0 ? ( 
                    <div className="mb-8 text-center text-xl font-bold mt-4 text-red-500">
                        ITEM NOT FOUND !!
                    </div>
                ) : (
                    search_item.map((item, index) => (
                        <ManageItemCard data={item} key={index} alter_availability={alter_availability} />
                    ))
                )}

                <div>
                    {categoryData.map((category, index) => (
                        <ManageCategory
                            name={category.displayName}
                            key={index}
                            items={data.filter((item) => item.category === category.name)}
                            alter_availability={alter_availability}
                        />
                    ))}
                </div>

                <button
                    type='button'
                    className="ml-2 bg-red-500 text-white p-2 rounded transition duration-300 ease-in-out hover:bg-red-600 mb-6 mx-auto"
                >
                    Close Shop
                </button>
            </div>
        </div>
    );
}
