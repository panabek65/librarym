const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  year: { type: Number },
  description: { type: String, default: '' },
  coverImageUrl: { type: String, default: 'https_placeholder_url' },
  status: {
    type: String,
    enum: ['available', 'reserved', 'borrowed'],
    default: 'available',
  },
  category: { type: String, default: 'General' },
  popularityScore: { type: Number, default: 0 }, // For the popular row
}, { timestamps: true });

module.exports = mongoose.model('Book', BookSchema);