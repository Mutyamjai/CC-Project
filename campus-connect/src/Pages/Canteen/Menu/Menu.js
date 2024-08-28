import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import {get_menu} from "../../../Services/Service_Functions/canteen";
import { useSelector } from 'react-redux';
import Spinner from '../../../Components/Common/Spinner';
import ManageCategory from '../ManageItem/ManageCategory';

export default function Menu() {

    const [loading, set_loading] = useState(false);
    const {token} = useSelector((state) => state.auth);
    const [data, set_data] = useState(null);

    useEffect(() => {
        const get_menu = async () => {

            set_loading(true);

            const result = await get_menu(token);
            set_data(result);

            set_loading(false);
        }
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
                    ManageCategory.map((category, index) => (
                        <ManageCategory name={category.displayName} key={index} items={data.filter(item => item.category === category.name)}/>
                    ))
                }
            </div>
        </div>
    )
}
