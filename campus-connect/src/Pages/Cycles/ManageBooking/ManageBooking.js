import React, { useEffect, useState } from 'react';
import { collect_booking, fetch_today_booking_details, issue_booking } from '../../../Services/Service_Functions/cycle';
import { useSelector } from 'react-redux';
import ManageBookingCard from './ManageBookingCard';
import ConfirmationModel from '../../../Components/Common/ConfirmationModel';
import Spinner from '../../../Components/Common/Spinner';

export default function ManageBooking() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const date = selectedDate;

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDate = `${formattedDay}-${formattedMonth}-${year}`;
    const { token } = useSelector(state => state.auth);
    const [loading, setLoading] = useState(false);
    const [confirmationModel, setConfirmationModel] = useState(null);
    const [result, setResult] = useState(null);

    useEffect(() => {
        const getDetails = async () => {
            setLoading(true);
            const response = await fetch_today_booking_details(formattedDate, token);
            if (response) setResult(response);
            setLoading(false);
        };
        getDetails();
    }, [formattedDate, token]);

    const cycleIssuedButton = async (id) => {
        setLoading(true);
        const response = await issue_booking(id, token);
        if (response) {
            const newResult = result.map(item => item._id === id ? response : item);
            setResult(newResult);
        }
        setConfirmationModel(null);
        setLoading(false);
    };

    const cycleCollectedButton = async (id) => {
        setLoading(true);
        const response = await collect_booking(id, token);
        if (response) {
            const newResult = result.filter(item => item._id !== id);
            setResult(newResult);
        }
        setConfirmationModel(null);
        setLoading(false);
    };

    if (loading) {
        return <Spinner />;
    }

    const pendingBookings = result && result.filter(item => item.status === "Not_issued");
    const issuedBookings = result && result.filter(item => item.status === "Issued");

    return (
        <div className="bg-black min-h-screen p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-green-300 font-bold text-3xl mb-6 text-center">
                    Today's Bookings
                </h1>

                
                <div className="mb-8">
                    <h2 className="text-green-300 font-bold text-2xl mb-4 text-center">
                        Pending Bookings
                    </h2>
                    <div className="border-t border-gray-600 my-4"></div>
                    {pendingBookings && pendingBookings.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {pendingBookings.map((item, index) => (
                                <ManageBookingCard
                                    key={index}
                                    data={item}
                                    buttonFunction={cycleIssuedButton}
                                    setConfirmationModel={setConfirmationModel}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-gray-400 text-lg">
                            No Pending Bookings Available
                        </div>
                    )}
                </div>

                
                <div className="mb-8">
                    <h2 className="text-green-300 font-bold text-2xl mb-4 text-center">
                        Issued Bookings
                    </h2>
                    <div className="border-t border-gray-600 my-4"></div>
                    {issuedBookings && issuedBookings.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {issuedBookings.map((item, index) => (
                                <ManageBookingCard
                                    key={index}
                                    data={item}
                                    buttonFunction={cycleCollectedButton}
                                    setConfirmationModel={setConfirmationModel}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-gray-400 text-lg">
                            No Issued Bookings Available
                        </div>
                    )}
                </div>

                {/* Confirmation Model */}
                {confirmationModel && <ConfirmationModel confirmationModel={confirmationModel} />}
            </div>
        </div>
    );
}
