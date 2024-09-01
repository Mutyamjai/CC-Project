import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import {get_menu} from "../../../Services/Service_Functions/canteen";
import { useSelector } from 'react-redux';
import Spinner from '../../../Components/Common/Spinner';
import { categoryData } from '../../../Data/CanteenData';
import MenuCategory from './MenuCategory';

export default function Menu() {

    const [loading, set_loading] = useState(false);
    const {token} = useSelector((state) => state.auth);
    const [data, set_data] = useState(null);

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
        <div>
            <div>
                <h1>Search</h1>
            </div>

            <div>
                {
                    categoryData.map((category, index) => (
                        <MenuCategory name={category.displayName} key={index} items={data.filter(item => item.category === category.name)}/>
                    ))
                }
            </div>
        </div>
    )
}
