import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { find_available_cycle } from '../../../Services/Service_Functions/cycle';
import { useNavigate } from 'react-router-dom';

const CycleBooking = () => {

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [start_time, set_start_time] = useState('');
  const [end_time, set_end_time] = useState('');
  const [highlight, setHighlight] = useState('today');
  const [error, setError] = useState('');
  const [loading, set_loading] = useState(false);
  const {user_details} = useSelector((state) => state.profile);
  const {token} = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    set_loading(true);

    let current_time = new Date();
    current_time.setMinutes(current_time.getMinutes() + 10);
    current_time = `${current_time.getHours()}:${current_time.getMinutes()}`

    if(start_time < '05:00' || start_time > '22:00'){
        setError('Start time must be in between morning 5AM to night 10PM');
        return;
    }

    if(end_time < '05:00' || end_time > '22:00'){
      setError('End time must be in between morning 5AM to night 10PM');
      return;
    }
    if (start_time < current_time) {
        setError('Start time must be at least 10 minutes from the current time.');
        return;
    }

    if (end_time <= start_time) {
        setError('End time must be later than the start time.');
        return;
    }

    setError('');
    const date = selectedDate;

    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-indexed
    const year = date.getFullYear();

// Pad single digit day and month with leading zero
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

// Create the formatted date string
    const formattedDate = `${formattedDay}-${formattedMonth}-${year}`;
    const obj = {
        start_time: start_time,
        end_time: end_time,
        date: formattedDate,
        user_name: user_details.user_name,
        email: user_details.email,
        contact_number: user_details.contact_number,

    };
      await find_available_cycle(obj, token, navigate);
      set_loading(false);
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
                        id="start_time"
                        value={start_time}
                        onChange={(e) => set_start_time(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                  <label className="block text-spotify-green" htmlFor="endTime">End Time:</label>
                  <input
                      className=""
                      type="time"
                      id="end_time"
                      value={end_time}
                      onChange={(e) => set_end_time(e.target.value)}
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
    