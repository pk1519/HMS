import React, { useState, useContext } from 'react';
import axios from 'axios';
import { ThemeContext } from './ThemeContext';

const BookRoom = () => {
  const [formData, setFormData] = useState({
    roomNumber: '',
    name: '',
    address: '',
    phoneNumber: '',
    nationality: '',
    arrivalDate: '',
  });

  const { roomNumber, name, address, phoneNumber, nationality, arrivalDate } = formData;
  const { theme } = useContext(ThemeContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5000/api/bookings', formData, {
        headers: {
          'x-auth-token': token,
        },
      });
      console.log(res.data);
      alert('Booking added successfully!');
      // Clear form
      setFormData({
        roomNumber: '',
        name: '',
        address: '',
        phoneNumber: '',
        nationality: '',
        arrivalDate: '',
      });
    } catch (err) {
      console.error(err.response.data);
      alert('Error adding booking.');
    }
  };

  return (
    <div className={`p-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
      <h2 className="text-2xl font-bold mb-4">Book a New Room</h2>
      <form onSubmit={handleSubmit} className={`p-6 rounded-lg shadow-md transition duration-200 ${theme === 'dark' ? 'bg-darkcard' : 'bg-white'}`}>
        <div className="mb-4">
          <label className={`block text-sm font-bold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`} htmlFor="roomNumber">
            Room Number
          </label>
          <input
            type="text"
            id="roomNumber"
            name="roomNumber"
            value={roomNumber}
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
            value={name}
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
            value={address}
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
            value={phoneNumber}
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
            value={nationality}
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
            value={arrivalDate}
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline transition duration-200 ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'text-gray-700'}`}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
          >
            Add Booking
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookRoom;