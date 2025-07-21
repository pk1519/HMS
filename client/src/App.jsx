import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import PrivateRoute from './PrivateRoute';
import Bookings from './Bookings';
import BookRoom from './BookRoom';
import Analytics from './Analytics';
import RoomCalendar from './RoomCalendar';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route index element={<h1 className="text-4xl font-bold">Welcome to the Dashboard!</h1>} />
          <Route path="book" element={<BookRoom />} />
          <Route path="view" element={<Bookings />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="calendar" element={<RoomCalendar />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;