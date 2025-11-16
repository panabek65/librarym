const Reservation = require('../models/Reservation');
const Book = require('../models/Book');

// @desc    Create new reservation
// @route   POST /api/reservations
// @access  Private
exports.addReservation = async (req, res) => {
  const { bookId } = req.body;

  try {
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Check if book is available
    if (book.status !== 'available') {
      return res.status(400).json({ message: 'Book is not available for reservation' });
    }

    // Create reservation
    const reservation = new Reservation({
      user: req.user._id,
      book: bookId,
    });

    const createdReservation = await reservation.save();

    // Update book status to 'reserved'
    book.status = 'reserved';
    await book.save();

    res.status(201).json(createdReservation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get user's reservations
// @route   GET /api/reservations/my
// @access  Private
exports.getMyReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ user: req.user._id }).populate('book');
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// --- ADMIN ONLY ---

// @desc    Get all reservations
// @route   GET /api/reservations
// @access  Private/Admin
exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({}).populate('user', 'userId firstName').populate('book', 'title');
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Cancel a reservation (Admin)
// @route   PUT /api/reservations/:id/cancel
// @access  Private/Admin
exports.cancelReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (reservation) {
      reservation.status = 'cancelled';
      const updatedReservation = await reservation.save();

      // Make book available again
      const book = await Book.findById(reservation.book);
      if (book) {
        book.status = 'available';
        await book.save();
      }
      res.json(updatedReservation);
    } else {
      res.status(404).json({ message: 'Reservation not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};