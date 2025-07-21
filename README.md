HostelFlow 🏨
A modern, responsive hostel booking management system built with React.js and Node.js. HostelFlow provides a comprehensive admin dashboard for managing room bookings, viewing analytics, and tracking occupancy rates.
Show Image
✨ Features
🎯 Core Functionality

User Authentication - Secure login system with JWT tokens
Room Booking Management - Add, edit, and delete room bookings
Search & Filter - Advanced search functionality for bookings
Analytics Dashboard - Visual charts showing booking trends and occupancy rates
Calendar View - Interactive calendar showing room availability
Data Export - Export booking data to CSV format

🎨 User Experience

Dark/Light Mode - Toggle between themes for better user experience
Responsive Design - Mobile-first design that works on all devices
Modern UI - Glassmorphism effects and smooth animations
Avatar System - Auto-generated user avatars with initials
Flag Integration - Country flags for guest nationalities

📊 Analytics & Reporting

Booking Frequency Charts - Bar charts showing daily booking patterns
Occupancy Rate Visualization - Pie charts displaying room utilization
Real-time Data - Live updates of booking information
Export Capabilities - Download reports in CSV format

🚀 Tech Stack
Frontend

React 18 - Modern React with hooks
React Router - Client-side routing
Chart.js - Interactive charts and data visualization
Tailwind CSS - Utility-first CSS framework
Axios - HTTP client for API calls
React Calendar - Calendar component for date management

Backend (Required)

Node.js - Runtime environment
Express.js - Web framework
MongoDB - NoSQL database
JWT - JSON Web Tokens for authentication
Mongoose - MongoDB object modeling

🛠️ Installation & Setup
Prerequisites

Node.js (v14 or higher)
npm or yarn
MongoDB (local or cloud instance)

Frontend Setup

Clone the repository
bashgit clone https://github.com/yourusername/hostelflow.git
cd hostelflow

Install dependencies
bashnpm install

Start the development server
bashnpm run dev

Open your browser
Navigate to http://localhost:5173

Backend Setup (Required)
The frontend expects a backend API running on http://localhost:5000. You'll need to set up:

API Endpoints:

POST /api/auth/login - User authentication
GET /api/bookings - Fetch all bookings
POST /api/bookings - Create new booking
PUT /api/bookings/:id - Update booking
DELETE /api/bookings/:id - Delete booking
GET /api/bookings/search - Search bookings


Database Schema:
javascript// Booking model
{
  roomNumber: String,
  name: String,
  address: String,
  phoneNumber: String,
  nationality: String,
  arrivalDate: Date
}

Authentication:

JWT-based authentication
Token stored in localStorage
Protected routes with x-auth-token header



📁 Project Structure
hostelflow/
├── src/
│   ├── components/
│   │   ├── Analytics.jsx          # Analytics dashboard
│   │   ├── Avatar.jsx            # User avatar component
│   │   ├── BookRoom.jsx          # Room booking form
│   │   ├── Bookings.jsx          # Bookings list view
│   │   ├── Dashboard.jsx         # Main dashboard layout
│   │   ├── EditBookingModal.jsx  # Edit booking modal
│   │   ├── Login.jsx             # Login page
│   │   ├── RoomCalendar.jsx      # Calendar view
│   │   ├── PrivateRoute.jsx      # Route protection
│   │   ├── SplashScreen.jsx      # Loading screen
│   │   └── ThemeContext.jsx      # Theme management
│   ├── App.jsx                   # Main app component
│   ├── main.jsx                  # App entry point
│   ├── index.css                 # Global styles
│   └── App.css                   # Component styles
├── public/
├── package.json
└── README.md
🎨 Themes & Styling
HostelFlow supports both light and dark themes:

Light Mode: Clean, professional appearance
Dark Mode: Modern dark theme with glassmorphism effects
Responsive: Mobile-first design approach
Animations: Smooth transitions and hover effects

📊 API Integration
The application integrates with a REST API. Example API calls:
javascript// Fetch bookings
const response = await axios.get('http://localhost:5000/api/bookings', {
  headers: { 'x-auth-token': token }
});

// Create booking
const response = await axios.post('http://localhost:5000/api/bookings', bookingData, {
  headers: { 'x-auth-token': token }
});
🔐 Authentication

JWT-based authentication system
Tokens stored in localStorage
Automatic redirect to login for unauthenticated users
Protected routes using PrivateRoute component

📱 Mobile Responsiveness

Mobile-first design approach
Collapsible sidebar navigation
Touch-friendly interface
Optimized for tablets and smartphones

🚀 Deployment
Frontend Deployment
bash# Build for production
npm run build

# Deploy to your preferred hosting service
# (Vercel, Netlify, GitHub Pages, etc.)
Environment Variables
Create a .env file for environment-specific configurations:
VITE_API_URL=http://localhost:5000
🤝 Contributing

Fork the repository
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request

📋 TODO

 Add room categories and pricing
 Implement check-out functionality
 Add email notifications
 Integration with payment gateways
 Multi-language support
 Advanced reporting features
 Guest communication system

🐛 Known Issues

Calendar component styling needs refinement in dark mode
Mobile sidebar animation could be smoother
Search functionality needs debouncing

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
👨‍💻 Author
Your Name

GitHub: @yourusername
Email: your.email@example.com

🙏 Acknowledgments

React.js community for excellent documentation
Chart.js for powerful data visualization
Tailwind CSS for rapid UI development
All contributors who helped improve this project

## Contact me  --- priyanshu345kumar@gmail.com
