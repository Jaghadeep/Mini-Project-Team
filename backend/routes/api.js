const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const News = require('../models/News');
const Subscription = require('../models/Subscription');
const Registration = require('../models/Registration');
const Application = require('../models/Application');

// ==========================================
// JOBS API ROUTES
// ==========================================

// GET /api/jobs - Search and filter jobs
router.get('/jobs', async (req, res) => {
  try {
    const { q, department, location, type } = req.query;
    let query = {};

    if (q) {
      query.$or = [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { department: { $regex: q, $options: 'i' } }
      ];
    }

    if (department && department !== 'All') {
      query.department = department;
    }

    if (location && location !== 'All') {
      query.location = location;
    }

    if (type && type !== 'All') {
      query.type = type;
    }

    const jobs = await Job.find(query).sort({ postedDate: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/jobs - Create a job
router.post('/jobs', async (req, res) => {
  try {
    const { title, department, location, description, requirements, type, salaryRange } = req.body;
    const reqArray = Array.isArray(requirements) 
      ? requirements 
      : requirements.split(',').map(r => r.trim()).filter(Boolean);

    const newJob = new Job({
      title,
      department,
      location,
      description,
      requirements: reqArray,
      type,
      salaryRange
    });

    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /api/jobs/:id - Delete a job
router.delete('/jobs/:id', async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==========================================
// NEWS API ROUTES
// ==========================================

// GET /api/news - Fetch news
router.get('/news', async (req, res) => {
  try {
    const news = await News.find().sort({ _id: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/news - Create a news story
router.post('/news', async (req, res) => {
  try {
    const { title, category, summary, content, link, image, featured } = req.body;
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });

    const newNews = new News({
      title,
      date: formattedDate,
      category,
      summary,
      content,
      link,
      image,
      featured
    });

    const savedNews = await newNews.save();
    res.status(201).json(savedNews);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /api/news/:id - Delete a news item
router.delete('/news/:id', async (req, res) => {
  try {
    const newsItem = await News.findByIdAndDelete(req.params.id);
    if (!newsItem) return res.status(404).json({ message: 'News item not found' });
    res.json({ message: 'News item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==========================================
// NEWSLETTER SUBSCRIPTION
// ==========================================

// POST /api/subscribe - Subscribe to newsletter
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    
    // Check if already subscribed
    const existing = await Subscription.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already subscribed!' });
    }

    const newSub = new Subscription({ email });
    await newSub.save();
    res.status(201).json({ message: 'Subscribed successfully!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ==========================================
// CONFERENCE REGISTRATION
// ==========================================

// POST /api/register-event - Register for conference
router.post('/register-event', async (req, res) => {
  try {
    const { name, email, jobTitle, company, conferenceName } = req.body;
    
    const newReg = new Registration({
      name,
      email,
      jobTitle,
      company,
      conferenceName
    });

    await newReg.save();
    res.status(201).json({ message: 'Registered successfully for the conference!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ==========================================
// JOB APPLICATIONS
// ==========================================

// POST /api/applications - Submit job application
router.post('/applications', async (req, res) => {
  try {
    const { name, email, coverLetter, portfolioUrl, jobId } = req.body;
    
    const newApp = new Application({
      name,
      email,
      coverLetter,
      portfolioUrl,
      jobId
    });

    await newApp.save();
    res.status(201).json({ message: 'Application submitted successfully!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ==========================================
// ADMIN DASHBOARD STATS
// ==========================================

// GET /api/stats - Fetch stats and details
router.get('/stats', async (req, res) => {
  try {
    const totalJobs = await Job.countDocuments();
    const totalNews = await News.countDocuments();
    const totalSubscriptions = await Subscription.countDocuments();
    const totalRegistrations = await Registration.countDocuments();
    const totalApplications = await Application.countDocuments();

    const registrations = await Registration.find().sort({ registeredAt: -1 }).limit(10);
    const subscriptions = await Subscription.find().sort({ subscribedAt: -1 }).limit(10);
    
    // Find applications and populate Job details
    const applications = await Application.find()
      .populate('jobId', 'title department')
      .sort({ appliedAt: -1 })
      .limit(10);

    res.json({
      counts: {
        jobs: totalJobs,
        news: totalNews,
        subscriptions: totalSubscriptions,
        registrations: totalRegistrations,
        applications: totalApplications
      },
      registrations,
      subscriptions,
      applications
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
