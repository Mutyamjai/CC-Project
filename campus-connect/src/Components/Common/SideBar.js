import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { sideBarData } from '../../Data/SideBarData';

function SideBarButton({name, address}){
    return (
        <>
            <Link to={address}>
                {name}
            </Link>
        </>
    )
}

export default function SideBar() {

    const {user_details} = useSelector(state => state.profile);
    const [state, set_state] = useState(false);

    return (
        <div>

            <div onClick={() => set_state(true)}>
                three lines
            </div>

            <div className={`w-3/4 max-w-[350px] absolute h-screen bg-white z-20 inset-0 border-2 border-red-600
                ${state ? "translate-x-0" : "-translate-x-full"} transition-all duration-400 ease-in z-50 overflow-y-scroll`}>

                <button onClick={() => set_state(false)}>
                    XX
                </button>
                {
                    !user_details && (
                        <div className='flex flex-col'>
                            <SideBarButton name="LOGIN" address="/Login"/>
                            <SideBarButton name="SIGN UP" address="/Signup"/>
                        </div>
                    )
                }

                {
                    user_details && (
                        <div>
                            <p>{user_details.user_name}</p>
                            <p>{user_details.email}</p>
                        </div>
                    )
                }

                <div className='b-2 border-2 border-black'></div>
                
                <div>
                    <SideBarButton name="HOME" address="/"/>
                </div>
                <div className='b-2 border-2 border-black'></div>

                {
                    user_details && (
                        <div className='flex flex-col'>
                            {
                                sideBarData
                                .filter(item => item.account_type === user_details.account_type)
                                .map(item => (
                                <SideBarButton key={item.name} name={item.name} address={item.address} />
                                ))
                            }
                        </div>
                    )
                }

                <div className='b-2 border-2 border-black'></div>

                {   
                    user_details &&
                    (
                        <div className='flex flex-col'>
                            <SideBarButton name="PROFILE" address="/Profile"/>
                            
                            <button>LOG OUT</button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
