import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { categoryData } from '../../Data/CanteenData';
import { create_item } from '../../Services/Service_Functions/canteen';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useRef } from 'react';
import Spinner from '../../Components/Common/Spinner';

export default function CreateItem() {
    const {register,handleSubmit,formState:{errors}} = useForm();
    const [loading,set_loading] = useState("false");
    const fileInputRef = useRef();
    const [img_file,set_img_file] = useState(null);
    const [preview_img,set_preview_img] = useState(null);
    const {token} = useSelector((state)=> state.auth)
    const on_submit = async (data) =>{
        if(!img_file){
            toast.error("ITEM IMAGE CANT BE EMPTY")
            return;
        }
        set_loading(true);
        const formData = new FormData()
        formData.append("image",img_file)
        formData.append("item_name",data.item_name)
        formData.append("category",data.category)
        formData.append("price",data.price)
        await create_item(formData,token)
        set_loading(false);
    }
    function handleFileChange(event){
        const file = event.target?.files[0];

        if(file){
            set_img_file(file);
            preview_file(file);
        }
    }

    const preview_file = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            set_preview_img(reader.result);
        }
    }

    function handleClick(){
        fileInputRef.current.click();
    }
    if(loading){
       return (<Spinner/>) 
    }
  return (
        <div>
            <form onSubmit={handleSubmit(on_submit)}>
                <div>
                    <label>Item Name : </label>
                    <input type='text' placeholder='Enter Item Name'
                    {...register("item_name",{required: true})}></input>
                    {errors.item_name && <p className="text-red-500 text-sm">Item name is required</p>}
                </div>
                <div>
                    <label>Price : </label>
                    <input type='number' placeholder='Enter Price'
                    {...register("price",{required: true})}></input>
                    {errors.price && <p className="text-red-500 text-sm">Price is required</p>}
                </div>
                <div>
                    <label>Category</label>
                    <select id='category'
                    {...register("category",{required: true})}>
                    {
                        categoryData.map((type,index) =>(
                            <option key={index} value={type.name}>{type.displayName}</option>
                        ))
                    }</select>
                    {errors.category && <p className="text-red-500 text-sm">Category is required</p>}
                </div>
                <div>
                    <img src={preview_img}></img>
                    
                    <div>
                        <label>Upload Image</label>
                        <input type='file' accept='image/png, imgae/jpeg' className='hidden' ref={fileInputRef} onChange={handleFileChange}></input>
                        <button type='button' onClick={handleClick}>Select Image</button>
                    </div>
                </div>
                <button type='submit'>Save</button>

            </form>
        </div>
  )
}
