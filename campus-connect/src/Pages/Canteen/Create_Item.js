import React from 'react'
import { useForm } from 'react-hook-form'

export default function Create_Item() {
    const {register,handleSubmit,formState:{error}} = useForm();
  return (
        <div>
            <form>
                <label>Item Name : </label>
                <input ></input>
            </form>
        </div>
  )
}
