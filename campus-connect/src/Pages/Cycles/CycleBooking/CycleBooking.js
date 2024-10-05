import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { find_available_cycle } from '../../../Services/Service_Functions/cycle';
import { useNavigate } from 'react-router-dom';

const CycleBooking = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [highlight, setHighlight] = useState('today');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user_details } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let current_time = new Date();
    current_time.setMinutes(current_time.getMinutes() + 10);


    const hours = String(current_time.getHours()).padStart(2, '0');
    const minutes = String(current_time.getMinutes()).padStart(2, '0');
    const formattedCurrentTime = `${hours}:${minutes}`;

    console.log('Current time:', formattedCurrentTime);

    if (startTime < '05:00' || startTime > '22:00') {
      setError('Start time must be between 5 AM and 10 PM.');
      setLoading(false);
      return;
    }

    if (endTime < '05:00' || endTime > '22:00') {
      setError('End time must be between 5 AM and 10 PM.');
      setLoading(false);
      return;
    }

    if (startTime < formattedCurrentTime) {
      setError('Start time must be at least 10 minutes from the current time.');
      setLoading(false);
      return;
    }

    if (endTime <= startTime) {
      setError('End time must be later than the start time.');
      setLoading(false);
      return;
    }

    setError('');

    const date = selectedDate;
    const day = date.getDate();
    const month = date.getMonth() + 1; 
    const year = date.getFullYear();
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDate = `${formattedDay}-${formattedMonth}-${year}`;

    const obj = {
      start_time: startTime,
      end_time: endTime,
      date: formattedDate,
      user_name: user_details.user_name,
      email: user_details.email,
      contact_number: user_details.contact_number,
    };

    await find_available_cycle(obj, token, navigate);
    setLoading(false);
  };

  const handleToday = () => {
    setSelectedDate(new Date());
    setHighlight('today');
  };

  const handleTomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setSelectedDate(tomorrow);
    setHighlight('tomorrow');
  };

  return (
    <div className="bg-black text-white min-h-screen p-8 flex items-center justify-center">
      <div className="max-w-lg w-full bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-green-300 mb-4 text-center">Campus Cycle Booking</h1>
        <div className="flex justify-center mb-4">
          <button
            onClick={handleToday}
            className={`px-4 py-2 rounded-lg mx-2 ${highlight === 'today' ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300'} hover:bg-green-600 focus:outline-none`}
          >
            Today
          </button>
          <button
            onClick={handleTomorrow}
            className={`px-4 py-2 rounded-lg mx-2 ${highlight === 'tomorrow' ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300'} hover:bg-green-600 focus:outline-none`}
          >
            Tomorrow
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
          <div>
            <label htmlFor="bookingDate" className="block text-lg font-medium mb-1">Booking Date:</label>
            <input
              className="bg-gray-700 text-white py-2 px-3 border border-gray-600 rounded-lg w-full text-center"
              id="bookingDate"
              type="text"
              value={selectedDate.toLocaleDateString()}
              readOnly
            />
          </div>
          <div>
            <label htmlFor="startTime" className="block text-lg font-medium mb-1">Start Time:</label>
            <input
              className="bg-white text-black py-2 px-3 border border-gray-600 rounded-lg w-full"
              type="time"
              id="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="endTime" className="block text-lg font-medium mb-1">End Time:</label>
            <input
              className="bg-white text-black py-2 px-3 border border-gray-600 rounded-lg w-full"
              type="time"
              id="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-black font-bold py-2 px-4 rounded-lg w-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Book Cycle
          </button>
        </form>
      </div>
    </div>
  );
};

export default CycleBooking;
