const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  category: { type: String, default: 'Tech News' },
  summary: { type: String, required: true },
  content: { type: String },
  link: { type: String },
  image: { type: String },
  featured: { type: Boolean, default: false }
});

module.exports = mongoose.model('News', NewsSchema);
