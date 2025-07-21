
import React, { useState, useEffect, useContext } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Default calendar styles
import axios from 'axios';
import { ThemeContext } from './ThemeContext';

const RoomCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/bookings', {
          headers: {
            'x-auth-token': token,
          },
        });
        setBookings(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch bookings');
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const bookedDates = bookings.map(booking => new Date(booking.arrivalDate).toDateString());
      if (bookedDates.includes(date.toDateString())) {
        return 'bg-red-500 text-white rounded-full'; // Highlight booked dates
      }
    }
    return null;
  };

  if (loading) return <div className="text-center py-4">Loading calendar...</div>;
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

  return (
    <div className={`p-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
      <h2 className="text-2xl font-bold mb-4">Room Availability Calendar</h2>
      <div className={`flex justify-center ${theme === 'dark' ? 'bg-darkcard p-4 rounded-lg shadow-md' : 'bg-white p-4 rounded-lg shadow-md'}`}>
        <Calendar
          onChange={setDate}
          value={date}
          tileClassName={tileClassName}
          className={`${theme === 'dark' ? 'react-calendar-dark' : ''}`}
        />
      </div>
      <p className="mt-4 text-center">Red dates indicate booked rooms.</p>
    </div>
  );
};

export default RoomCalendar;
