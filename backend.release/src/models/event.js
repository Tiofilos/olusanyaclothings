const mongoose = require('mongoose');

const { Schema } = mongoose;

const EventSchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  pictureUrl: { type: String, default: null },
  datetime: { type: Date, required: true },
});

module.exports = mongoose.models.Event || mongoose.model('Event', EventSchema);
