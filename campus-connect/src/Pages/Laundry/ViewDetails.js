import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { view_order_details } from '../../Services/Service_Functions/laundry';
import { useSelector } from 'react-redux';
import Spinner from '../../Components/Common/Spinner';
import convert_date from '../../Utility/dateConvertor';
import { washingData, dryCleanData, ironData } from '../../Data/LaundryData';

function Helper({ set_active, active, heading, pieces, order_data, data, name }) {
    return (
        <div className="border rounded-lg shadow-md p-4 bg-gray-100 mb-6 transition-transform duration-300">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-blue-600">{heading}</h2>
                <button
                    onClick={() => set_active(active === name ? "null" : name)}
                    className={`p-2 text-sm text-white rounded-md bg-blue-600 hover:bg-blue-700 ${
                        active === name ? "ring-2 ring-blue-300" : ""
                    }`}
                >
                    {active === name ? "Hide Details" : "View Details"}
                </button>
            </div>
            <div className="text-sm text-gray-700 mt-2">Total Pieces: {pieces}</div>
            {active === name && (
                <div className="mt-4 bg-blue-50 border-t border-blue-200 pt-3">
                    {data.map((item, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center py-1 border-b border-gray-300 last:border-b-0"
                        >
                            <div className="text-gray-800 font-medium">{item.displayName}</div>
                            <div className="text-gray-500">Price: ₹{item.price}</div>
                            <div className="text-gray-500">Count: {order_data[item.name]}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default function ViewDetails() {
    const { id } = useParams();
    const { token } = useSelector((state) => state.auth);
    const [details, set_details] = useState(null);
    const [loading, set_loading] = useState(false);
    const [active, set_active] = useState("none");

    useEffect(() => {
        const getViewDetails = async () => {
            try {
                const result = await view_order_details(id, token);
                if (result) set_details(result);
            } catch (error) {
                console.error("Error in fetching details", error);
            }
        };

        set_loading(true);
        getViewDetails();
        set_loading(false);

        // eslint-disable-next-line
    }, []);

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="min-h-screen bg-black py-10">
            <div className="flex justify-center items-center">
                <div className="text-center bg-gray-800 shadow-lg rounded-lg w-full max-w-3xl px-6 py-8">
                    {!details && (
                        <div className="text-red-600 font-bold">INVALID ORDER!!!!</div>
                    )}
                    {details && (
                        <div>
                            <h1 className="text-3xl font-bold text-blue-700 mb-4">
                                Order Details
                            </h1>
                            <div className="text-lg text-gray-600 mb-2">
                                Order Number: {details.order_number}
                            </div>
                            <div className="text-lg text-gray-600 mb-2">
                                Customer: {details.user_name}
                            </div>
                            <div className="text-lg text-gray-600 mb-4">
                                Date: {convert_date(details.created_at)}
                            </div>

                            <Helper
                                set_active={set_active}
                                heading={"Washing"}
                                pieces={details.total_washing}
                                order_data={details.washing}
                                data={washingData}
                                name={"washing"}
                                active={active}
                            />

                            <Helper
                                set_active={set_active}
                                heading={"Iron"}
                                pieces={details.total_iron}
                                order_data={details.iron}
                                data={ironData}
                                name={"iron"}
                                active={active}
                            />

                            <Helper
                                set_active={set_active}
                                heading={"Dry Cleaning"}
                                pieces={details.total_dry_cleaning}
                                order_data={details.dry_cleaning}
                                data={dryCleanData}
                                name={"dry_cleaning"}
                                active={active}
                            />

                            <div className="text-xl font-semibold text-blue-700 mt-6">
                                Total Price: ₹{details.total_price}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
