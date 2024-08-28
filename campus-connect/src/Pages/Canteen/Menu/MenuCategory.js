import React from 'react'
import MenuItems from './MenuItems'

export default function MenuCategory({category, items}) {

    const [status, set_status] = useState("display");

    return (
        <div>
            <div>
                <h1>category</h1>
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
                        <MenuItems key={index} data={item}/>
                    ))
                }
            </div>
        </div>
    )
}
