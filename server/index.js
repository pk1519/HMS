
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/bookings', require('./routes/bookings'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
