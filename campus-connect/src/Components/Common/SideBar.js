import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { sideBarData } from '../../Data/SideBarData';

function SideBarButton({ name, address }) {
    return (
        <Link
            to={address}
            className="text-lg py-2 px-4 rounded-md hover:bg-gray-200 transition-all duration-300"
        >
            {name}
        </Link>
    );
}

export default function SideBar() {
    const { user_details } = useSelector((state) => state.profile);
    const [state, set_state] = useState(false);

    return (
        <>
            {/* Hamburger Menu */}
            <div
                onClick={() => set_state(true)}
                className="p-2 text-white bg-gray-800 rounded-md cursor-pointer hover:bg-gray-700"
            >
                ☰
            </div>

            {/* Overlay */}
            {state && (
                <div
                    onClick={() => set_state(false)}
                    className="fixed inset-0 bg-black bg-opacity-50 z-[1500]"
                ></div>
            )}

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-screen w-3/4 max-w-[350px] bg-gray-900 text-white shadow-lg transform ${
                    state ? 'translate-x-0' : '-translate-x-full'
                } transition-transform duration-300 z-[2000] overflow-y-auto`}
            >
                {/* Close Button */}
                <div className="flex justify-between items-center p-4 border-b border-gray-700">
                    <h2 className="text-xl font-bold">Menu</h2>
                    <button
                        onClick={() => set_state(false)}
                        className="text-gray-400 hover:text-white transition-all duration-200"
                    >
                        ✖
                    </button>
                </div>

                {/* User Info */}
                {user_details ? (
                    <div className="p-4 border-b border-gray-700">
                        <p className="text-lg font-semibold">{user_details.user_name}</p>
                        <p className="text-sm text-gray-400">{user_details.email}</p>
                    </div>
                ) : (
                    <div className="p-4 border-b border-gray-700">
                        <SideBarButton name="LOGIN" address="/Login" />
                        <SideBarButton name="SIGN UP" address="/Signup" />
                    </div>
                )}

                {/* Navigation Links */}
                <div className="p-4">
                    <SideBarButton name="HOME" address="/" />
                </div>
                <div className="p-4 border-t border-gray-700">
                    {user_details &&
                        sideBarData
                            .filter((item) => item.account_type === user_details.account_type)
                            .map((item) => (
                                <SideBarButton
                                    key={item.name}
                                    name={item.name}
                                    address={item.address}
                                />
                            ))}
                </div>

                {/* Profile and Logout */}
                {user_details && (
                    <div className="p-4 border-t border-gray-700 flex flex-col space-y-2">
                        <SideBarButton name="PROFILE" address="/Profile" />
                        <button
                            className="text-lg py-2 px-4 rounded-md bg-red-500 hover:bg-red-600 transition-all duration-300"
                            onClick={() => {
                                // Log Out Functionality
                                localStorage.clear();
                                window.location.reload();
                            }}
                        >
                            LOG OUT
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
