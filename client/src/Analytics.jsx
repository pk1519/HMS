import React, { useState, useEffect, useContext } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import { ThemeContext } from './ThemeContext';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const Analytics = () => {
  const [bookingData, setBookingData] = useState({});
  const [occupancyData, setOccupancyData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/bookings', {
          headers: {
            'x-auth-token': token,
          },
        });
        const bookings = res.data;

        // Process data for booking frequency
        const bookingFrequency = bookings.reduce((acc, booking) => {
          const date = new Date(booking.arrivalDate).toLocaleDateString();
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        }, {});

        setBookingData({
          labels: Object.keys(bookingFrequency),
          datasets: [
            {
              label: 'Bookings per Day',
              data: Object.values(bookingFrequency),
              backgroundColor: theme === 'dark' ? 'rgba(75, 192, 192, 0.6)' : 'rgba(54, 162, 235, 0.6)',
              borderColor: theme === 'dark' ? 'rgba(75, 192, 192, 1)' : 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            },
          ],
        });

        // Process data for room occupancy (simple example: count unique room numbers)
        const uniqueRooms = new Set(bookings.map(booking => booking.roomNumber));
        const occupiedRooms = uniqueRooms.size;
        const totalRooms = 100; // Assuming a total of 100 rooms for demonstration
        const availableRooms = totalRooms - occupiedRooms;

        setOccupancyData({
          labels: ['Occupied', 'Available'],
          datasets: [
            {
              data: [occupiedRooms, availableRooms],
              backgroundColor: [
                theme === 'dark' ? 'rgba(255, 99, 132, 0.6)' : 'rgba(255, 159, 64, 0.6)',
                theme === 'dark' ? 'rgba(54, 162, 235, 0.6)' : 'rgba(75, 192, 192, 0.6)',
              ],
              borderColor: [
                theme === 'dark' ? 'rgba(255, 99, 132, 1)' : 'rgba(255, 159, 64, 1)',
                theme === 'dark' ? 'rgba(54, 162, 235, 1)' : 'rgba(75, 192, 192, 1)',
              ],
              borderWidth: 1,
            },
          ],
        });

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch analytics data');
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [theme]);

  if (loading) return <div className="text-center py-4">Loading analytics...</div>;
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

  return (
    <div className={`p-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
      <h2 className="text-2xl font-bold mb-4">Booking Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={`p-6 rounded-lg shadow-md transition duration-200 ${theme === 'dark' ? 'bg-darkcard' : 'bg-white'}`}>
          <h3 className="text-xl font-semibold mb-4">Booking Frequency</h3>
          {bookingData.labels && bookingData.labels.length > 0 ? (
            <Bar data={bookingData} options={{ responsive: true, maintainAspectRatio: false }} />
          ) : (
            <p>No booking data available for frequency chart.</p>
          )}
        </div>
        <div className={`p-6 rounded-lg shadow-md transition duration-200 ${theme === 'dark' ? 'bg-darkcard' : 'bg-white'}`}>
          <h3 className="text-xl font-semibold mb-4">Room Occupancy Rate</h3>
          {occupancyData.labels && occupancyData.labels.length > 0 ? (
            <Pie data={occupancyData} options={{ responsive: true, maintainAspectRatio: false }} />
          ) : (
            <p>No booking data available for occupancy chart.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;