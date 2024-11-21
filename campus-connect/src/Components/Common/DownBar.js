import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { DownBarData } from '../../Data/DownBarData';

function DownBarButton({ name, address, highlight }) {
    return (
        <div
            className={`flex-1 text-center py-2 rounded-md transition-all duration-300 ${
                highlight
                    ? 'bg-purple-600 text-white shadow-lg transform scale-105'
                    : 'bg-gray-200 text-gray-800 hover:bg-purple-100 hover:shadow-md'
            }`}
        >
            <Link to={address} className="block w-full h-full">
                {name}
            </Link>
        </div>
    );
}

export default function DownBar() {
    const [state, set_state] = useState('hidden');
    const [position, set_position] = useState('null');
    const [path_name, set_pathname] = useState('null');
    const { user_details } = useSelector((state) => state.profile);
    const location = useLocation();

    useEffect(() => {
        const pathName = location.pathname;
        const new_pos = pathName.split('/')[1];

        set_position(new_pos);
        set_pathname(pathName);

        if (new_pos === 'Laundry' || new_pos === 'Cycle' || new_pos === 'Canteen') {
            set_state('block');
        } else {
            set_state('hidden');
        }
    }, [location.pathname]);

    return (
        <div
            className={`w-full fixed bottom-0 bg-gray-900 text-gray-100 shadow-lg ${state} z-20 font-bold`}
        >
            {state === 'block' && user_details && (
                <div className="flex justify-between items-center px-4 py-2">
                    {DownBarData[position][user_details.account_type].map(
                        (item, index) => (
                            <DownBarButton
                                key={index}
                                name={item.name}
                                address={item.address}
                                highlight={item.address === path_name}
                            />
                        )
                    )}
                </div>
            )}
        </div>
    );
}
