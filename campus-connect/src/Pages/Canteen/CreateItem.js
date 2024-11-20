import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { categoryData } from '../../Data/CanteenData';
import { create_item } from '../../Services/Service_Functions/canteen';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import Spinner from '../../Components/Common/Spinner';

export default function CreateItem() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, set_loading] = useState(false);
    const fileInputRef = useRef();
    const [img_file, set_img_file] = useState(null);
    const [preview_img, set_preview_img] = useState(null);
    const { token } = useSelector((state) => state.auth);

    const on_submit = async (data) => {
        if (!img_file) {
            toast.error("ITEM IMAGE CANT BE EMPTY");
            return;
        }
        set_loading(true);
        const formData = new FormData();
        formData.append("image", img_file);
        formData.append("item_name", data.item_name);
        formData.append("category", data.category);
        formData.append("price", data.price);
        await create_item(formData, token);
        set_loading(false);
    };

    function handleFileChange(event) {
        const file = event.target?.files[0];
        if (file) {
            set_img_file(file);
            preview_file(file);
        }
    }

    const preview_file = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            set_preview_img(reader.result);
        };
    };

    function handleClick() {
        fileInputRef.current.click();
    }

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="bg-black p-6 min-h-screen">
            <form onSubmit={handleSubmit(on_submit)} className="text-white w-5/6 mx-auto">
                <h1 className="text-red-500 font-bold text-3xl text-center mb-4">Create Item</h1>
                
                <div className="mb-4">
                    <label className="text-red-500">Item Name:</label>
                    <input
                        type='text'
                        placeholder='Enter Item Name'
                        {...register("item_name", { required: true })}
                        className="p-2 bg-gray-800 text-red-500 border border-gray-600 rounded w-full"
                    />
                    {errors.item_name && <p className="text-red-500 text-sm">Item name is required</p>}
                </div>

                <div className="mb-4">
                    <label className="text-red-500">Price:</label>
                    <input
                        type='number'
                        placeholder='Enter Price'
                        {...register("price", { required: true })}
                        className="p-2 bg-gray-800 text-red-500 border border-gray-600 rounded w-full"
                    />
                    {errors.price && <p className="text-red-500 text-sm">Price is required</p>}
                </div>

                <div className="mb-4">
                    <label className="text-red-500">Category:</label>
                    <select
                        id='category'
                        {...register("category", { required: true })}
                        className="p-2 bg-gray-800 text-red-500 border border-gray-600 rounded w-full"
                    >
                        {categoryData.map((type, index) => (
                            <option key={index} value={type.name}>{type.displayName}</option>
                        ))}
                    </select>
                    {errors.category && <p className="text-red-500 text-sm">Category is required</p>}
                </div>

                <div className="mb-4">
                    {preview_img && <img src={preview_img} alt="Preview" className="mb-2 rounded" />}
                    <label className="text-red-500">Upload Image:</label>
                    <div>
                        <input
                            type='file'
                            accept='image/png, image/jpeg'
                            className='hidden'
                            ref={fileInputRef}
                            onChange={handleFileChange}
                        />
                        <button
                            type='button'
                            onClick={handleClick}
                            className="bg-red-500 text-white p-2 rounded transition duration-300 ease-in-out hover:bg-red-600"
                        >
                            Select Image
                        </button>
                    </div>
                </div>

                <button
                    type='submit'
                    className="bg-red-500 text-white p-2 rounded transition duration-300 ease-in-out hover:bg-red-600"
                >
                    Save
                </button>
            </form>
        </div>
    );
}
