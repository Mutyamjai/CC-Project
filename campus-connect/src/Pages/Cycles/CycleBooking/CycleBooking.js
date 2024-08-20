import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

const CycleBooking = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [highlight, setHighlight] = useState('today');
  const [error, setError] = useState('');
  const user = useSelector((state) => state.user);
  const {token} = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentTime = new Date();
    currentTime.setMinutes(currentTime.getMinutes() + 10);
    const startDateTime = startTime;
    const endDateTime = endTime;

    if (startDateTime < currentTime) {
      setError('Start time must be at least 10 minutes from the current time.');
      return;
    }

    if (endDateTime <= startDateTime) {
      setError('End time must be later than the start time.');
      return;
    }

    setError('');
    const date = selectedDate;

// Extract the day, month, and year
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-indexed
    const year = date.getFullYear();

// Pad single digit day and month with leading zero
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

// Create the formatted date string
    const formattedDate = `${formattedDay}-${formattedMonth}-${year}`;
    const obj = {
      name: user.name,
      rollno: user.rollno,
      phoneno: user.phoneno,
      startTime: startTime,
      endTime: endTime,
      date: formattedDate,
    };

    const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/booking/findCycle`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials : 'include',
      body: JSON.stringify(obj),
    });

    const result = await fetchData.json();
    toast(result.message);
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
    <div className=''>
    <div className="">
    <h1 className="">Cycle Booking</h1>
    <div className="flex mb-4">
      <button
        className=''
        onClick={handleToday}
      >
        Today
      </button>
      <button
        className=''
        onClick={handleTomorrow}
      >
        Tomorrow
      </button>
    </div>
    <form onSubmit={handleSubmit}>
      {error && <div className="">{error}</div>}
      <div className="">
        <label className="" htmlFor="bookingDate">Booking Date:</label>
        <input
          className=""
          id="bookingDate"
          type="text"
          value={selectedDate.toLocaleDateString()}
          readOnly
        />
      </div>
      <div className="mb-4">
        <label className="" htmlFor="startTime">Start Time:</label>
        <input
          className=""
          type="time"
          id="startTime"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-spotify-green" htmlFor="endTime">End Time:</label>
        <input
          className=""
          type="time"
          id="endTime"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
      </div>
      <button
        className=""
        type="submit"
      >
        Book Cycle
      </button>
    </form>
  </div>
    </div>
  );
};

export default CycleBooking;
    