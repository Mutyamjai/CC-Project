import React, { useState, useEffect } from 'react';
import { get_menu } from "../../../Services/Service_Functions/canteen";
import { useSelector } from 'react-redux';
import Spinner from '../../../Components/Common/Spinner';
import { categoryData } from '../../../Data/CanteenData';
import MenuCategory from './MenuCategory';
import MenuItems from '../MenuItems';
import { useForm } from 'react-hook-form';

export default function Menu() {
  const [loading, set_loading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const [data, set_data] = useState([]);
  const [search_item, set_search_item] = useState([]);
  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  const on_submit = () => {
    const searchTerm = watch('item_name').toLowerCase();
    const food = data.filter(d => d.item_name.toLowerCase().includes(searchTerm));
    set_search_item(food);
  }

  useEffect(() => {
    const get_menu_details = async () => {
      set_loading(true);
      const result = await get_menu(token);
      set_data(result);
      set_loading(false);
    }
    get_menu_details();
  }, [token]);

  if (loading) return <Spinner />;

  return (
    <div className="bg-black text-white min-h-screen p-8 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-gray-900 p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit(on_submit)} className="flex items-center space-x-2">
          <label className="text-xl font-medium text-red-500">Search</label>
          <input
            type="text"
            className="bg-gray-700 text-white py-2 px-5 border border-gray-600 rounded-lg w-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Enter item name"
            {...register('item_name', { required: true })}
          />
          <button
            type="submit"
            className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition-all duration-200 ease-in-out"
          >
            Search
          </button>
          {errors.item_name && <p className="text-red-500 mt-2">Item Name Is Required</p>}
        </form>

        <h1 className="text-red-300 font-bold text-center mt-6 mb-4 text-2xl">Searched Item</h1>
        <div className="space-y-3">
          {search_item.length > 0 ? (
            search_item.map((item, index) => (
              <MenuItems data={item} key={index} />
            ))
          ) : (
            search_item.length === 0 && (
              <div className="text-center text-xl font-bold mt-4 text-white">
                ITEM NOT FOUND !!
              </div>
            )
          )}
        </div>

        <div className="mt-8 space-y-6">
          {categoryData.map((category, index) => (
            <MenuCategory
              category={category.displayName}
              key={index}
              items={data.filter(item => item.category === category.name)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
