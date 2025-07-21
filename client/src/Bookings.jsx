import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditBookingModal from './EditBookingModal';
import { ThemeContext } from './ThemeContext';
import { useContext } from 'react';
import Avatar from './Avatar';

// Simple function to get a flag emoji based on nationality (very basic)
const getFlagEmoji = (nationality) => {
  const countryCodes = {
    "USA": "🇺🇸",
    "Canada": "🇨🇦",
    "UK": "🇬🇧",
    "India": "🇮🇳",
    "Australia": "🇦🇺",
    "Germany": "🇩🇪",
    "France": "🇫🇷",
    "Japan": "🇯🇵",
    "China": "🇨🇳",
    "Brazil": "🇧🇷",
    "Mexico": "🇲🇽",
    "South Africa": "🇿🇦",
    // Add more as needed
  };
  return countryCodes[nationality] || '🌐'; // Default to globe emoji
};

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { theme } = useContext(ThemeContext);

  const fetchBookings = async (query = '') => {
    try {
      const token = localStorage.getItem('token');
      const url = query
        ? `http://localhost:5000/api/bookings/search?query=${query}`
        : 'http://localhost:5000/api/bookings';
      const res = await axios.get(url, {
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

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/bookings/${id}`, {
          headers: {
            'x-auth-token': token,
          },
        });
        alert('Booking deleted successfully!');
        fetchBookings(); // Refresh the list
      } catch (err) {
        console.error(err.response.data);
        alert('Error deleting booking.');
      }
    }
  };

  const handleEdit = (booking) => {
    setCurrentBooking(booking);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentBooking(null);
  };

  const handleSaveBooking = () => {
    fetchBookings(); // Refresh bookings after save
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    fetchBookings(e.target.value);
  };

  const handleExportCSV = () => {
    const headers = ["Room Number", "Name", "Address", "Phone Number", "Nationality", "Arrival Date"];
    const rows = bookings.map(booking => [
      booking.roomNumber,
      booking.name,
      booking.address,
      booking.phoneNumber,
      booking.nationality,
      new Date(booking.arrivalDate).toLocaleDateString(),
    ]);

    let csvContent = headers.join(',') + '\n';
    rows.forEach(rowArray => {
      let row = rowArray.join(',');
      csvContent += row + '\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    if (link.download !== undefined) { // feature detection
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "bookings.csv");
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (loading) return <div className="text-center py-4">Loading bookings...</div>;
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

  return (
    <div className={`p-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
      <h2 className="text-2xl font-bold mb-4">All Bookings</h2>
      <div className="mb-4 flex flex-col md:flex-row justify-between items-center">
        <input
          type="text"
          placeholder="Search bookings..."
          className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline transition duration-200 ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'text-gray-700'}`}
          value={searchTerm}
          onChange={handleSearch}
        />
        <button
          onClick={handleExportCSV}
          className="mt-4 md:mt-0 md:ml-4 bg-accent hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-200"
        >
          Export to CSV
        </button>
      </div>
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className={`min-w-full ${theme === 'dark' ? 'bg-darkcard' : 'bg-white'}`}>
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Room No.</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Address</th>
              <th className="py-3 px-4 text-left">Phone No.</th>
              <th className="py-3 px-4 text-left">Nationality</th>
              <th className="py-3 px-4 text-left">Arrival Date</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className={`${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
            {bookings.map((booking) => (
              <tr key={booking._id} className="border-b border-gray-200 hover:bg-gray-50 transition duration-200">
                <td className="py-3 px-4">{booking.roomNumber}</td>
                <td className="py-3 px-4 flex items-center">
                  <Avatar name={booking.name} />
                  <span className="ml-2">{booking.name}</span>
                </td>
                <td className="py-3 px-4">{booking.address}</td>
                <td className="py-3 px-4">{booking.phoneNumber}</td>
                <td className="py-3 px-4">{getFlagEmoji(booking.nationality)} {booking.nationality}</td>
                <td className="py-3 px-4">{new Date(booking.arrivalDate).toLocaleDateString()}</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleEdit(booking)}
                    className="bg-primary hover:bg-blue-700 text-white px-3 py-1 rounded mr-2 transition duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(booking._id)}
                    className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded transition duration-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <EditBookingModal
          booking={currentBooking}
          onClose={handleCloseModal}
          onSave={handleSaveBooking}
        />
      )}
    </div>
  );
};

export default Bookings;