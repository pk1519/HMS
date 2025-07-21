const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Booking = require('../models/Booking');
const { check, validationResult } = require('express-validator');

// @route   GET api/bookings
// @desc    Get all bookings
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ arrivalDate: -1 });
    res.json(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/bookings
// @desc    Add new booking
// @access  Private
router.post(
  '/',
  [auth, [
    check('roomNumber', 'Room number is required').not().isEmpty(),
    check('name', 'Name is required').not().isEmpty(),
    check('address', 'Address is required').not().isEmpty(),
    check('phoneNumber', 'Phone number is required').isLength({ min: 10, max: 10 }),
    check('nationality', 'Nationality is required').not().isEmpty(),
    check('arrivalDate', 'Arrival date is required').not().isEmpty(),
  ]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { roomNumber, name, address, phoneNumber, nationality, arrivalDate } = req.body;

    try {
      const newBooking = new Booking({
        roomNumber,
        name,
        address,
        phoneNumber,
        nationality,
        arrivalDate,
      });

      const booking = await newBooking.save();
      res.json(booking);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/bookings/:id
// @desc    Update booking
// @access  Private
router.put(
  '/:id',
  [auth, [
    check('roomNumber', 'Room number is required').not().isEmpty(),
    check('name', 'Name is required').not().isEmpty(),
    check('address', 'Address is required').not().isEmpty(),
    check('phoneNumber', 'Phone number is required').isLength({ min: 10, max: 10 }),
    check('nationality', 'Nationality is required').not().isEmpty(),
    check('arrivalDate', 'Arrival date is required').not().isEmpty(),
  ]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { roomNumber, name, address, phoneNumber, nationality, arrivalDate } = req.body;

    // Build booking object
    const bookingFields = {};
    if (roomNumber) bookingFields.roomNumber = roomNumber;
    if (name) bookingFields.name = name;
    if (address) bookingFields.address = address;
    if (phoneNumber) bookingFields.phoneNumber = phoneNumber;
    if (nationality) bookingFields.nationality = nationality;
    if (arrivalDate) bookingFields.arrivalDate = arrivalDate;

    try {
      let booking = await Booking.findById(req.params.id);

      if (!booking) return res.status(404).json({ msg: 'Booking not found' });

      booking = await Booking.findByIdAndUpdate(
        req.params.id,
        { $set: bookingFields },
        { new: true }
      );

      res.json(booking);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/bookings/:id
// @desc    Delete a booking
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) return res.status(404).json({ msg: 'Booking not found' });

    await Booking.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Booking removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/bookings/search
// @desc    Search bookings
// @access  Private
router.get('/search', auth, async (req, res) => {
  try {
    const { query } = req.query;
    const bookings = await Booking.find({
      $or: [
        { roomNumber: { $regex: query, $options: 'i' } },
        { name: { $regex: query, $options: 'i' } },
        { phoneNumber: { $regex: query, $options: 'i' } },
        { nationality: { $regex: query, $options: 'i' } },
      ],
    }).sort({ arrivalDate: -1 });
    res.json(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;