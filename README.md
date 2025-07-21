# 🏨 HostelFlow

**HostelFlow** is a modern, responsive hostel booking management system built using **React.js** and **Node.js**. It includes a powerful admin dashboard for managing room bookings, tracking occupancy, and visualizing booking analytics in real-time.

![HostelFlow Screenshot](https://yourimageurl.com/preview.png) <!-- Replace with actual image link -->

---

## ✨ Features

### 🎯 Core Functionality
- 🔐 **User Authentication** – Secure login with JWT tokens
- 🛏️ **Room Booking Management** – Add, edit, and delete bookings
- 🔍 **Search & Filter** – Advanced search for quick access to booking info
- 📊 **Analytics Dashboard** – View trends and occupancy rates via charts
- 📆 **Calendar View** – Interactive view of room availability
- 📤 **Data Export** – Export booking data to CSV

### 🎨 User Experience
- 🌗 **Dark/Light Mode** – Toggle themes for better UX
- 📱 **Responsive Design** – Works on all screen sizes
- 💎 **Modern UI** – Glassmorphism effects with smooth animations
- 👤 **Avatar System** – Auto-generated avatars with initials
- 🏳️ **Flag Integration** – Country flags for guest nationalities

### 📊 Analytics & Reporting
- 📈 **Booking Frequency Charts** – Daily booking trends
- 🧮 **Occupancy Rate Visualization** – Pie charts for room usage
- 🔄 **Real-time Data** – Auto-updating booking information
- 📎 **CSV Export** – Download reports easily

---

## 🚀 Tech Stack

### Frontend
- [React 18](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [Chart.js](https://www.chartjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- [React Calendar](https://www.npmjs.com/package/react-calendar)

### Backend
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [JWT](https://jwt.io/)

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud instance)

### 📦 Frontend Setup

```bash
git clone https://github.com/yourusername/hostelflow.git
cd hostelflow
npm install
npm run dev
Navigate to http://localhost:5173

🧩 Backend Setup (Required)
The frontend expects a backend at: http://localhost:5000

API Endpoints:

POST /api/auth/login – Login

GET /api/bookings – Fetch all bookings

POST /api/bookings – Create a booking

PUT /api/bookings/:id – Update a booking

DELETE /api/bookings/:id – Delete a booking

GET /api/bookings/search – Search bookings

Booking Schema:

javascript
Copy
Edit
{
  roomNumber: String,
  name: String,
  address: String,
  phoneNumber: String,
  nationality: String,
  arrivalDate: Date
}
Authentication:

JWT-based login

Token stored in localStorage

Use x-auth-token header for protected routes

📁 Project Structure
pgsql
Copy
Edit
hostelflow/
├── src/
│   ├── components/
│   │   ├── Analytics.jsx
│   │   ├── Avatar.jsx
│   │   ├── BookRoom.jsx
│   │   ├── Bookings.jsx
│   │   ├── Dashboard.jsx
│   │   ├── EditBookingModal.jsx
│   │   ├── Login.jsx
│   │   ├── RoomCalendar.jsx
│   │   ├── PrivateRoute.jsx
│   │   ├── SplashScreen.jsx
│   │   └── ThemeContext.jsx
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   └── App.css
├── public/
├── package.json
└── README.md
🎨 Themes & Styling
Light and Dark Mode support

Responsive mobile-first design

Glassmorphism UI elements

Smooth hover and transition animations

📊 API Integration
Example Usage:

js
Copy
Edit
// Fetch bookings
const response = await axios.get('http://localhost:5000/api/bookings', {
  headers: { 'x-auth-token': token }
});

// Create booking
const response = await axios.post('http://localhost:5000/api/bookings', bookingData, {
  headers: { 'x-auth-token': token }
});
🔐 Authentication
JWT-based secure login

Token saved in localStorage

Protected routes using <PrivateRoute /> component

Auto redirect to login if unauthorized

📱 Mobile Responsiveness
Collapsible sidebar

Touch-friendly controls

Fully functional on phones and tablets

🚀 Deployment
Build & Deploy Frontend
bash
Copy
Edit
npm run build
# Deploy 'dist/' folder to Vercel, Netlify, GitHub Pages, etc.
Environment Variables
Create a .env file:

ini
Copy
Edit
VITE_API_URL=http://localhost:5000
🤝 Contributing
Fork the repository

Create your feature branch: git checkout -b feature/AmazingFeature

Commit changes: git commit -m 'Add some AmazingFeature'

Push to the branch: git push origin feature/AmazingFeature

Open a Pull Request

📋 TODO
 Add room categories and pricing

 Implement check-out functionality

 Email notifications for bookings

 Payment gateway integration

 Multi-language support

 Advanced reporting tools

 Guest messaging system

🐛 Known Issues
Calendar component needs styling tweaks in dark mode

Mobile sidebar animation requires smoothing

Search input lacks debounce

📄 License
Licensed under the MIT License

👨‍💻 Author
Priyanshu Kumar
GitHub: pk1519
Email: priyanshu345kumar@gmail.com

🙏 Acknowledgments
React.js – UI library

Chart.js – For data visualization

Tailwind CSS – For modern, responsive UI

All contributors and the open-source community ❤️

