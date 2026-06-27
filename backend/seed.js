const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Job = require('./models/Job');
const News = require('./models/News');
const Subscription = require('./models/Subscription');
const Registration = require('./models/Registration');
const Application = require('./models/Application');

dotenv.config();

const mockJobs = [
  {
    title: 'React Frontend Engineer',
    department: 'Digital Commerce',
    location: 'Sunnyvale, CA',
    description: 'We are seeking a talented React Frontend Engineer to build premium, state-of-the-art experiences for millions of Walmart customers worldwide. You will work on micro-frontends, optimize page speed, and implement highly visual, accessible layouts.',
    requirements: [
      '3+ years of professional React experience',
      'Strong expertise in JavaScript, HTML5, CSS3, and ES6+',
      'Experience with build tools (Webpack, Vite) and state management',
      'Knowledge of web performance optimization and accessibility (WCAG)'
    ],
    type: 'Full-time',
    salaryRange: '$120,000 - $160,000'
  },
  {
    title: 'Senior Backend Developer - Go / MongoDB',
    department: 'Supply Chain Tech',
    location: 'Bentonville, AR',
    description: 'Join our logistics tech squad and design high-throughput microservices using Go and MongoDB. You will own crucial route-planning engines and inventory tracking pipelines processing billions of items daily.',
    requirements: [
      '5+ years of software engineering experience',
      'Strong proficiency in Go (Golang) and REST/gRPC APIs',
      'Deep database experience with MongoDB, indexing, and aggregation pipelines',
      'Experience in containerized architectures (Docker, Kubernetes)'
    ],
    type: 'Full-time',
    salaryRange: '$140,000 - $190,000'
  },
  {
    title: 'AI/ML Research Scientist',
    department: 'Data & Intelligence',
    location: 'Sunnyvale, CA',
    description: 'Help shape the future of smart retail! Work on large language models (LLMs), recommendation algorithms, and computer vision models deployed in hundreds of physical stores and online.',
    requirements: [
      'MS or PhD in Computer Science, AI, or equivalent field',
      'Solid experience in PyTorch or TensorFlow',
      'Hands-on building, training, and deploying LLMs or generative AI applications',
      'Experience with vector databases and search technologies'
    ],
    type: 'Full-time',
    salaryRange: '$160,000 - $220,000'
  },
  {
    title: 'Cybersecurity Architect',
    department: 'Global Security',
    location: 'Dallas, TX',
    description: 'Own security governance and threat modeling for our core retail cloud platform. Define security patterns, review microservice architectures, and lead penetration testing assessments.',
    requirements: [
      '7+ years in Cybersecurity Engineering or Cloud Security',
      'Certifications such as CISSP, CCSP, or CEH are highly desired',
      'Deep understanding of threat modeling, OAuth2, JWT, and network isolation',
      'Experience working in multi-cloud environments (Azure, GCP)'
    ],
    type: 'Full-time',
    salaryRange: '$150,000 - $200,000'
  },
  {
    title: 'Software Developer Intern (Fall 2026)',
    department: 'Emerging Tech',
    location: 'Remote',
    description: 'Are you a university student looking to make an impact? Work alongside senior engineers on real-world projects in cloud services, blockchain prototypes, or retail AI agents during a 12-week internship.',
    requirements: [
      'Currently pursuing a BS/MS in Computer Science or related engineering field',
      'Proficiency in Java, Python, or JavaScript',
      'Basic understanding of Git and software development lifecycles',
      'Strong problem-solving skills and passion for technology'
    ],
    type: 'Internship',
    salaryRange: '$40 - $60 / hour'
  }
];

const mockNews = [
  {
    title: 'Walmart Global Tech Unveils Next-Gen AI Conversational Platform',
    date: 'June 24, 2026',
    category: 'Artificial Intelligence',
    summary: 'Our engineering teams have deployed a brand new conversational model assisting millions of shoppers in finding the perfect products, powered by cutting-edge neural architectures.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.',
    link: '#',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    featured: true
  },
  {
    title: 'Revolutionizing Supply Chain Logistics with Intelligent Automation',
    date: 'June 18, 2026',
    category: 'Logistics',
    summary: 'How Walmart uses deep reinforcement learning and computer vision in our distribution centers to accelerate deliveries and reduce waste by 30%.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris.',
    link: '#',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
    featured: true
  },
  {
    title: 'Walmart Open-Sources Cloud-Native Orchestration Framework',
    date: 'June 10, 2026',
    category: 'Open Source',
    summary: 'We are proud to share Luminate-Orchestrate with the developer community, facilitating scalable edge deployments for Kubernetes across hybrid environments.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa.',
    link: '#',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80',
    featured: false
  },
  {
    title: 'Empowering Women in STEM: Inside Our Tech Leadership Circles',
    date: 'May 28, 2026',
    category: 'Diversity & Culture',
    summary: 'A look at Walmart Global Tech’s global mentoring programs helping engineers excel, break barriers, and architect enterprise-scale solutions.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent.',
    link: '#',
    image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=600&q=80',
    featured: false
  },
  {
    title: 'Scaling for Peak Seasons: Engineering Resilience at Global Scale',
    date: 'May 15, 2026',
    category: 'Cloud Engineering',
    summary: 'How our database engines and caching tiers handle traffic surges exceeding 5 million requests per second without latency degradation.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra.',
    link: '#',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
    featured: false
  }
];

const seedDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/walmart-tech';
    console.log(`Seeding database: ${connStr}...`);
    await mongoose.connect(connStr);

    // Clear existing collections
    console.log('Clearing existing collections...');
    await Job.deleteMany({});
    await News.deleteMany({});
    await Subscription.deleteMany({});
    await Registration.deleteMany({});
    await Application.deleteMany({});

    // Seed Jobs
    console.log('Inserting jobs...');
    await Job.insertMany(mockJobs);

    // Seed News
    console.log('Inserting news...');
    await News.insertMany(mockNews);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`Error seeding database: ${error.message}`);
    process.exit(1);
  }
};

seedDB();
