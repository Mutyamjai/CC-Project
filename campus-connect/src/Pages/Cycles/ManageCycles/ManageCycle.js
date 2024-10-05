import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { add_cycle, fetch_cycle_details, update_cycle_status_to_repair, update_cycle_status_to_working } from '../../../Services/Service_Functions/cycle';
import ConfirmationModel from '../../../Components/Common/ConfirmationModel';
import toast from 'react-hot-toast';
import Spinner from '../../../Components/Common/Spinner';
import ManageCyclecard from './ManageCyclecard';

export default function ManageCycle() {
    const { register, getValues, formState: { errors } } = useForm();
    const { token } = useSelector(state => state.auth);
    const [loading, setLoading] = useState(false);
    const [confirmationModel, setConfirmationModel] = useState(null);
    const [details, setDetails] = useState([]);
    const [searchedOrder, setSearchedOrder] = useState(null);

    const addCycleButton = async (id) => {
        if (id === '') {
            toast.error("ID CANT BE EMPTY");
            setConfirmationModel(null);
            return;
        }
        setLoading(true);
        const result = await add_cycle(id, token);
        if (result) {
            const newDetails = [...details, result];
            setDetails(newDetails);
        }
        setConfirmationModel(null);
        setLoading(false);
    };

    const changeStatusToWorking = async (id) => {
        setLoading(true);
        const result = await update_cycle_status_to_working(id, token);
        if (result) {
            const newDetails = details.map(item => item._id !== id ? item : result);
            setDetails(newDetails);
            if (searchedOrder && searchedOrder._id === result._id) {
                setSearchedOrder(result);
            }
        }
        setConfirmationModel(null);
        setLoading(false);
    };

    const changeStatusToRepair = async (id) => {
        setLoading(true);
        const result = await update_cycle_status_to_repair(id, token);
        if (result) {
            const newDetails = details.map(item => item._id !== id ? item : result);
            setDetails(newDetails);
            if (searchedOrder && searchedOrder._id === result._id) {
                setSearchedOrder(result);
            }
        }
        setConfirmationModel(null);
        setLoading(false);
    };

    const onSubmit = () => {
        const id = getValues("id1");
        if (id === '') {
            toast.error("ID CANT BE EMPTY");
            return;
        }
        const foundOrder = details.find(item => item.id === id);
        setSearchedOrder(foundOrder);
    };

    useEffect(() => {
        const getDetails = async () => {
            setLoading(true);
            const response = await fetch_cycle_details(token);
            setDetails(response);
            setLoading(false);
        };
        getDetails();
    }, [token]);

    if (loading || !details) {
        return <Spinner />;
    }

    return (
        <div className="bg-black min-h-screen p-8 overflow-x-hidden w-full">
            <div className="w-full mb-8 flex flex-col items-center">
                <h1 className="text-green-300 font-bold text-3xl mb-6">
                    Add a Bicycle
                </h1>
                <div className="flex flex-col items-center w-full md:w-1/2">
                    <label className="text-green-300 font-bold mb-2 text-2xl">
                        Cycle Id:
                    </label>
                    <input
                        type="text"
                        placeholder="Enter Cycle Id"
                        {...register("id", { required: true })}
                        className="bg-gray-800 text-white py-3 px-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 w-1/2"
                    />
                    {errors.id && (
                        <p className="text-red-500 mt-2">Cycle ID is Required</p>
                    )}
                    <button
                        onClick={() => {
                            setConfirmationModel({
                                data_1: "Confirm Adding???",
                                btn1_text: "Confirm",
                                btn2_text: "Cancel",
                                btn1_fun: () => addCycleButton(getValues("id")),
                                btn2_fun: () => setConfirmationModel(null)
                            });
                        }}
                        className="bg-green-500 text-black font-bold py-3 px-3 mt-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 w-1/2 md:w-1/2"
                    >
                        Add Cycle
                    </button>
                </div>
            </div>

            {/* Partition Line */}
            <div className="border-b border-green-600 mb-8"></div>

            {/* Search Cycle Section */}
            <div className="flex flex-col items-center mb-10">
                <h1 className="text-green-300 font-bold text-2xl mb-4">
                    Search for a Cycle:
                </h1>
                <div className="flex flex-col items-center w-full md:w-1/2">
                    <input
                        type="text"
                        placeholder="Search by Cycle ID"
                        {...register("id1", { required: true })}
                        className="bg-gray-800 text-white py-3 px-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 w-1/2"
                    />
                    {errors.id1 && (
                        <p className="text-red-500 mt-2">Search ID is Required</p>
                    )}
                    <button
                        onClick={onSubmit}
                        className="bg-green-500 text-black font-bold py-3 px- mt-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 w-1/2 md:w-1/2"
                    >
                        Search
                    </button>
                </div>
            </div>

            {/* Searched Order Section */}
            <h1 className="text-green-300 font-bold text-center mb-5 text-2xl">
                Searched Order
            </h1>
            {searchedOrder && (
                <div className="mb-8 flex justify-center">
                    <ManageCyclecard
                        data={searchedOrder}
                        set_confirmation_model={setConfirmationModel}
                        change_status_to_under_repair_button={changeStatusToRepair}
                        change_status_to_under_working_button={changeStatusToWorking}
                    />
                </div>
            )}
            {searchedOrder === undefined && (
                <div className="mb-8 text-center text-xl font-bold mt-4 text-white">
                    Order Number not found
                </div>
            )}

            {/* Partition Line */}
            <div className="border-b border-green-600 mb-5"></div>

            {/* All Cycles Details */}
            <h1 className="text-green-300 font-bold text-center mb-5 text-2xl">
                ALL CYCLES DETAILS
            </h1>

            <div className={`grid ${details.length > 1 ? "grid-cols-1 md:grid-cols-2" : "flex justify-center"}`}>
                {details.map((item, index) => (
                    <ManageCyclecard
                        key={index}
                        data={item}
                        set_confirmation_model={setConfirmationModel}
                        change_status_to_under_repair_button={changeStatusToRepair}
                        change_status_to_under_working_button={changeStatusToWorking}
                    />
                ))}
                {details.length === 0 && (
                    <p className="text-white text-xl font-bold">No Cycles are Present</p>
                )}
            </div>

            {confirmationModel && <ConfirmationModel confirmation_model={confirmationModel} />}
        </div>
    );
}
