const mongoose = require('mongoose');

const { Schema } = mongoose;

const ReservationSchema = new Schema({
  id: { type: String, required: true },
  eventId: { type: String, required: true },
  location: { type: String, required: true },
  row: { type: String, required: true },
  number: { type: Number, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.models.reservation || mongoose.model('Reservation', ReservationSchema);
