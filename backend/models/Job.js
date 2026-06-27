const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  department: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  requirements: [{ type: String }],
  type: { type: String, enum: ['Full-time', 'Part-time', 'Contract', 'Internship'], default: 'Full-time' },
  salaryRange: { type: String },
  postedDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Job', JobSchema);
