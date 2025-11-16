const express = require('express');
const router = express.Router();
const {
  addReservation,
  getMyReservations,
  getAllReservations,
  cancelReservation,
} = require('../controllers/reservationController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').post(protect, addReservation).get(protect, admin, getAllReservations);
router.get('/my', protect, getMyReservations);
router.put('/:id/cancel', protect, admin, cancelReservation);

module.exports = router;