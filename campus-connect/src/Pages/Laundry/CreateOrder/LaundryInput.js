import React from 'react'

export default function LaundryInput({register, item, initial}) {
    return (
        <div>
            <label>{item.displayName}  {item.price}</label>
            <input
            type='number' name={item.name} defaultValue={initial || 0}
            {...register(`${item.name}`)}
            maxLength='2'></input>
        </div>
    )
}
