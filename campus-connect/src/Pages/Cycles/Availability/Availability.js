import React, { useEffect, useState } from 'react';
import Spinner from '../../../Components/Common/Spinner';
import { get_availabiity_details } from '../../../Services/Service_Functions/cycle';
import { useSelector } from 'react-redux';

function format_date(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDate = `${formattedDay}-${formattedMonth}-${year}`;

    return formattedDate;
}

function Helper({ cycle_id, bookings, active, set_active }) {
    return (
        <div className="rounded-lg bg-gray-800  p-4 mb-4 shadow-md text-white w-3/4">
            <div className="flex justify-between items-center ">
                <h2 className="text-lg font-semibold text-green-500">Cycle ID: {cycle_id}</h2>
                <button
                    onClick={() => set_active(cycle_id === active ? "null" : cycle_id)}
                    className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 focus:outline-none"
                >
                    {cycle_id === active ? "Hide Details" : "View Details"}
                </button>
            </div>
            {cycle_id === active && (
                <div className="mt-4">
                    {bookings.map((item, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center py-2 border-b border-gray-700"
                        >
                            <div>Start: {item.start_time}</div>
                            <div>End: {item.end_time}</div>
                        </div>
                    ))}
                </div>
            )}

            {
                cycle_id === active && bookings.length === 0 && (
                    <div>
                        No Active Orders
                    </div>
                )
            }
        </div>
    );
}

export default function Availability() {
    const [loading, set_loading] = useState(false);
    const [today_bookings, set_today_bookings] = useState([]);
    const [tmr_bookings, set_tmr_bookings] = useState([]);
    const [today_active, set_today_active] = useState("null");
    const [tmr_active, set_tmr_active] = useState("null");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [highlight, setHighlight] = useState("today");

    const { token } = useSelector((state) => state.auth);

    useEffect(() => {
        const get_data = async (today, tmr) => {
            const response = await get_availabiity_details(today, tmr, token);

            if (response) {
                set_today_bookings(response.today_cycle_bookings);
                set_tmr_bookings(response.tmr_cycle_bookings);
            }
        };

        set_loading(true);

        const today = format_date(new Date());

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tmr = format_date(tomorrow);
        get_data(today, tmr);

        set_loading(false);
    }, []);

    const handleToday = () => {
        setSelectedDate(new Date());
        setHighlight("today");
    };

    const handleTomorrow = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        setSelectedDate(tomorrow);
        setHighlight("tomorrow");
    };

    if (loading) return <Spinner />;

    return (
        <div className="min-h-screen bg-black text-gray-300 p-6">
            <div className="mb-8">
                <div className="flex justify-center mb-4">
                    <button
                        onClick={handleToday}
                        className={`px-4 py-2 rounded-lg mx-2 ${
                            highlight === "today"
                                ? "bg-green-500 text-white"
                                : "bg-gray-700 text-gray-300"
                        } hover:bg-green-600 focus:outline-none`}
                    >
                        Today
                    </button>
                    <button
                        onClick={handleTomorrow}
                        className={`px-4 py-2 rounded-lg mx-2 ${
                            highlight === "tomorrow"
                                ? "bg-green-500 text-white"
                                : "bg-gray-700 text-gray-300"
                        } hover:bg-green-600 focus:outline-none`}
                    >
                        Tomorrow
                    </button>
                </div>

                <div className="text-center text-green-500 text-xl mb-4">
                    Selected Date: {selectedDate.toLocaleDateString()}
                </div>
            </div>

            {highlight === "today" && (
                <div>
                    {today_bookings.map((cycle, index) => (
                        <div className="flex justify-center">
                            <Helper
                                cycle_id={cycle.cycle.id}
                                key={index}
                                bookings={cycle.bookings}
                                active={today_active}
                                set_active={set_today_active}
                            />
                        </div>
                       
                    ))}
                </div>
            )}

            {highlight === "tomorrow" && (
                <div>
                    {tmr_bookings.map((cycle, index) => (
                        <div className="flex justify-center">
                            <Helper
                                cycle_id={cycle.cycle.id}
                                key={index}
                                bookings={cycle.bookings}
                                active={tmr_active}
                                set_active={set_tmr_active}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
