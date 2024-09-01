import React, { useState } from 'react'
import ManageItemCard from './ManageItemCard';

export default function ManageCategory({name, items, alter_availability}) {
    
    const [status, set_status] = useState("display");

    return (    
        <div>
            <div className=''>
                <h1>{name}</h1>
                <button onClick={()=> {
                    if(status === 'display')
                        set_status("hidden");
                    else    
                        set_status("display");
                }}>drop down</button>
            </div>

            <div className={`${status}`}>
                {
                    items.map((item, index) => (
                        <ManageItemCard data={item} key={index}
                            alter_availability={alter_availability}
                        />
                    ))
                }
            </div>
        </div>
    )
}
