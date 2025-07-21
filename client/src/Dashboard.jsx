
import React, { useContext, useState } from 'react';
import { useNavigate, Outlet, Link } from 'react-router-dom';
import { ThemeContext } from './ThemeContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className={`flex h-screen overflow-hidden ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}>
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden flex items-center p-4">
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-500 focus:outline-none focus:bg-gray-200">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isSidebarOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out w-64 bg-gray-800 text-white flex flex-col z-30`}>
        <div className="p-4 text-2xl font-bold border-b border-gray-700">
          Hostel Admin
        </div>
        <nav className="flex-1 px-2 py-4 space-y-2">
          <Link to="/dashboard" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
            Dashboard Overview
          </Link>
          <Link to="/dashboard/book" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
            Book a Room
          </Link>
          <Link to="/dashboard/view" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
            View Bookings
          </Link>
          <Link to="/dashboard/analytics" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
            Analytics
          </Link>
          <Link to="/dashboard/calendar" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
            Room Calendar
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className={`flex justify-between items-center p-4 border-b shadow-sm ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center">
            <button
              onClick={toggleTheme}
              className={`px-3 py-1 rounded-full text-sm font-medium ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-4`}
            >
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className={`flex-1 overflow-x-hidden overflow-y-auto p-4 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-200'}`}>
          <Outlet /> {/* This is where nested routes will render */}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
