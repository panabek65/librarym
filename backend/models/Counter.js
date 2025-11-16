const mongoose = require('mongoose');

// This schema helps us track the count for each 'namesurname' combination
const CounterSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // This will be 'firstnamelastname'
  seq: { type: Number, default: 0 }
});

module.exports = mongoose.model('Counter', CounterSchema);