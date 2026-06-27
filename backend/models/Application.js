const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  coverLetter: { type: String },
  portfolioUrl: { type: String },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  appliedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Application', ApplicationSchema);
