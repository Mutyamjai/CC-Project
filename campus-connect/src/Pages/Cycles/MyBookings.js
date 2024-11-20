import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetch_student_booking_details } from '../../Services/Service_Functions/cycle';
import Spinner from '../../Components/Common/Spinner';

export default function MyBookings() {
  const { token } = useSelector(state => state.auth);
  const { user_details } = useSelector(state => state.profile);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getMyBookingDetails = async () => {
      setLoading(true);
      const res = await fetch_student_booking_details(user_details.user_name, token);

      if(res)
        setData(res);
      setLoading(false);
    }
    getMyBookingDetails();
    // eslint-disable-next-line
  }, []);

  if (loading) 
    return <Spinner />;

  return (
    <div className="bg-black text-white min-h-screen p-8 flex items-center justify-center">
      <div className="max-w-lg w-full bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-green-300 mb-6 text-center">My Booking</h1>
        {
          Object.keys(data).length > 0 ? (
            <div className="space-y-4">
              <div className="flex justify-between text-lg">
                <strong>Cycle ID :</strong> 
                <span>{data.id}</span>
              </div>
              <div className="flex justify-between text-lg">
                <strong>Student User Name :</strong> 
                <span>{data.user_name}</span>
              </div>
              <div className="flex justify-between text-lg">
                <strong>Contact No :</strong> 
                <span>{data.contact_number}</span>
              </div>
              <div className="flex justify-between text-lg">
                <strong>Start Time :</strong> 
                <span>{data.start_time}</span>
              </div>
              <div className="flex justify-between text-lg">
                <strong>End Time :</strong> 
                <span>{data.end_time}</span>
              </div>
              <div className="text-center mt-4">
                <span className={`text-xl font-bold ${data.status === "Not_issued" ? 'text-red-500' : 'text-green-400'}`}>
                  {data.status === "Not_issued" ? 'Not Issued' : 'Issued'}
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-400 text-xl mt-6">No Booking is Available</div>
          )
        }
      </div>
    </div>
  );
}
