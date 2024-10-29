import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { DownBarData } from '../../Data/DownBarData';

function DownBarButton({name, address, highlight}){
    return (
        <div className={`${highlight ? 'bg-yellow-600': ''}`}>
            <Link to={address}>{name}</Link>
        </div>
    )
}

export default function DownBar() {

    const [state, set_state] = useState('hidden');
    const [position, set_position] = useState("null");
    const [path_name, set_pathname] = useState("null");
    const {user_details} = useSelector(state => state.profile);
    const location = useLocation();

    useEffect(() => {

        const pathName = location.pathname;
        const new_pos = pathName.split('/')[1];

        set_position(new_pos);
        set_pathname(pathName);

        if(new_pos === 'Laundry' || new_pos === 'Cycle' || new_pos === 'Canteen')
            set_state('block');
        else
            set_state('hidden');

    }, [location.pathname])
    console.log(user_details);
    
    return (
        <div className={`w-full h-[3rem] bg-red-400 absolute bottom-0 ${state}`}>
            {
                state === 'block' && user_details &&
                <div className='flex'>
                    {
                        DownBarData[position][user_details.account_type].map((item, index) => (
                            <DownBarButton key={index} name={item.name} address={item.address} highlight={item.address === path_name}/>
                        ))
                    }
                </div>
            }
        </div>
    )
}
