import React from 'react';
import SideBar from './SideBar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { set_token } from '../../Slices/authSlice';
import { set_user_details } from '../../Slices/profileSlice';
import toast from 'react-hot-toast';
import { sideBarData } from '../../Data/SideBarData';

export default function Navbar() {
    const { user_details } = useSelector((state) => state.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function Help({ name, address }) {
        return (
            <button
                onClick={() => navigate(address)}
                className="px-4 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 transition-all duration-300"
            >
                {name}
            </button>
        );
    }

    const log_out = () => {
        localStorage.clear();
        dispatch(set_token(null));
        dispatch(set_user_details(null));
        toast.success('LOGGED OUT SUCCESSFULLY.');
        navigate('/');
    };

    return (
        <div className="fixed z-[100] w-full h-[3.5rem] bg-gray-800 shadow-md">
            <div className="flex justify-between items-center h-full px-4 md:px-10">
                {/* Sidebar Toggle for Mobile */}
                <div className="md:hidden">
                    <SideBar />
                </div>

                {/* Navbar Branding */}
                <div className="text-white font-bold text-lg md:text-xl">
                    <button onClick={() => navigate('/')} className="hover:opacity-90">
                        MY APP
                    </button>
                </div>

                {/* Navigation Links */}
                <div className="hidden md:flex space-x-4">
                    <Help name="Home" address="/" />
                    {user_details &&
                        sideBarData
                            .filter((item) => item.account_type === user_details.account_type)
                            .map((item) => (
                                <Help key={item.name} name={item.name} address={item.address} />
                            ))}
                </div>

                {/* Profile and Auth Buttons */}
                <div className="flex space-x-4">
                    {user_details ? (
                        <>
                            <button
                                onClick={() => navigate('/Profile')}
                                className="px-4 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 transition-all duration-300"
                            >
                                Profile
                            </button>
                            <button
                                onClick={() => log_out()}
                                className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition-all duration-300"
                            >
                                Log Out
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => navigate('/Login')}
                                className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300"
                            >
                                Log In
                            </button>
                            <button
                                onClick={() => navigate('/SignUp')}
                                className="px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition-all duration-300"
                            >
                                Sign Up
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
