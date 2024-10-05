import React from 'react';

export default function ManageBookingCard({ data, buttonFunction, setConfirmationModel }) {

    const onSubmit = () => {
        setConfirmationModel({
            data_1: `${data.status === "Not_issued" ? "Confirm Cycle Issued" : "Confirm Cycle Collected"}`,
            btn1_text: "Confirm",
            btn2_text: "Cancel",
            btn1_fun: () => buttonFunction(data._id),
            btn2_fun: () => setConfirmationModel(null)
        });
    };

    return (
        <div className="bg-gray-800 bg-opacity-80 p-6 w-full border border-green-700 rounded-lg max-w-md mx-auto flex flex-col mb-6 transition-transform transform hover:scale-105 hover:border-4 hover:border-green-400 hover:shadow-2xl hover:shadow-green-300">
            <div className="flex justify-between text-lg font-medium text-white mb-2">
                <span className="font-semibold">Cycle No:</span> 
                <span className="font-normal">{data.id}</span>
            </div>
            <div className="flex justify-between text-lg font-medium text-white mb-2">
                <span className="font-semibold">Student User Name:</span>
                <span className="font-normal">{data.user_name}</span>
            </div>
            <div className="flex justify-between text-lg font-medium text-white mb-2">
                <span className="font-semibold">Contact No:</span>
                <span className="font-normal">{data.contact_number}</span>
            </div>
            <div className="flex justify-between text-lg font-medium text-white mb-2">
                <span className="font-semibold">Start Time:</span>
                <span className="font-normal">{data.start_time}</span>
            </div>
            <div className="flex justify-between text-lg font-medium text-white mb-2">
                <span className="font-semibold">End Time:</span>
                <span className="font-normal">{data.end_time}</span>
            </div>
            <div className="flex justify-between text-lg font-medium text-white mb-4">
                <span className="font-semibold">Status:</span>
                <span className={`font-normal ${data.status === 'Not_issued' ? 'text-yellow-300' : 'text-green-300'}`}>
                    {data.status === "Not_issued" ? "Not Issued" : "Issued"}
                </span>
            </div>

            <div className="flex justify-center">
                <button
                    onClick={onSubmit}
                    className={`bg-green-500 text-black font-bold py-2 px-4 rounded-lg focus:ring-green-600 focus:outline-none focus:ring-2 hover:bg-green-700 focus:ring-opacity-50 transition-colors ${data.status === 'Not_issued' ? 'hover:border-yellow-400' : 'hover:border-green-400'}`}
                >
                    {data.status === 'Not_issued' ? "Issue Cycle" : "Collect Cycle"}
                </button>
            </div>
        </div>
    );
}
