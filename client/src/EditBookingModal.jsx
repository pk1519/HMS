
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ThemeContext } from './ThemeContext';

const EditBookingModal = ({ booking, onClose, onSave }) => {
  const [formData, setFormData] = useState(booking);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    setFormData(booking);
  }, [booking]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/bookings/${formData._id}`, formData, {
        headers: {
          'x-auth-token': token,
        },
      });
      onSave();
      onClose();
    } catch (err) {
      console.error(err.response.data);
      alert('Error updating booking.');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
      <div className={`p-8 rounded-lg shadow-xl w-full max-w-md transform transition-all duration-300 ${theme === 'dark' ? 'bg-darkcard text-white' : 'bg-white'}`}>
        <h2 className="text-2xl font-bold mb-4">Edit Booking</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className={`block text-sm font-bold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`} htmlFor="roomNumber">
              Room Number
            </label>
            <input
              type="text"
              id="roomNumber"
              name="roomNumber"
              value={formData.roomNumber}
              onChange={handleChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline transition duration-200 ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'text-gray-700'}`}
              required
            />
          </div>
          <div className="mb-4">
            <label className={`block text-sm font-bold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`} htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline transition duration-200 ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'text-gray-700'}`}
              required
            />
          </div>
          <div className="mb-4">
            <label className={`block text-sm font-bold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`} htmlFor="address">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline transition duration-200 ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'text-gray-700'}`}
              required
            />
          </div>
          <div className="mb-4">
            <label className={`block text-sm font-bold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`} htmlFor="phoneNumber">
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline transition duration-200 ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'text-gray-700'}`}
              required
              minLength="10"
              maxLength="10"
            />
          </div>
          <div className="mb-4">
            <label className={`block text-sm font-bold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`} htmlFor="nationality">
              Nationality
            </label>
            <input
              type="text"
              id="nationality"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline transition duration-200 ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'text-gray-700'}`}
              required
            />
          </div>
          <div className="mb-4">
            <label className={`block text-sm font-bold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`} htmlFor="arrivalDate">
              Arrival Date
            </label>
            <input
              type="date"
              id="arrivalDate"
              name="arrivalDate"
              value={formData.arrivalDate ? new Date(formData.arrivalDate).toISOString().split('T')[0] : ''}
              onChange={handleChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline transition duration-200 ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'text-gray-700'}`}
              required
            />
          </div>
          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBookingModal;
