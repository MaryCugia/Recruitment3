// This is a mock API service. In a real application, this would make actual HTTP requests to a backend server.

// Mock jobs data
const mockJobs = [
  {
    id: 1,
    title: 'Senior Software Engineer',
    department: 'Engineering',
    location: 'San Francisco, CA',
    type: 'Full-time',
    status: 'Active',
    postedDate: '2024-03-01',
    description: 'We are looking for a Senior Software Engineer to join our team...',
    requirements: [
      '5+ years of experience in software development',
      'Strong knowledge of React and Node.js',
      'Experience with cloud platforms (AWS/GCP)',
      'Excellent problem-solving skills'
    ],
    responsibilities: [
      'Design and implement new features',
      'Mentor junior developers',
      'Participate in code reviews',
      'Collaborate with cross-functional teams'
    ],
    salary: '$120,000 - $150,000',
    benefits: [
      'Health insurance',
      '401(k) matching',
      'Flexible work hours',
      'Remote work options'
    ]
  },
  {
    id: 2,
    title: 'Product Manager',
    department: 'Product',
    location: 'New York, NY',
    type: 'Full-time',
    status: 'Active',
    postedDate: '2024-03-05',
    description: 'We are seeking an experienced Product Manager to lead our product initiatives...',
    requirements: [
      '3+ years of product management experience',
      'Strong analytical skills',
      'Excellent communication abilities',
      'Experience with Agile methodologies'
    ],
    responsibilities: [
      'Define product strategy',
      'Gather and analyze user feedback',
      'Prioritize feature development',
      'Work with engineering and design teams'
    ],
    salary: '$100,000 - $130,000',
    benefits: [
      'Health insurance',
      'Stock options',
      'Professional development budget',
      'Paid time off'
    ]
  }
];

const API_URL = 'http://localhost:5000/api';  // Update this to match your backend URL

// Get all jobs
export const getJobs = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockJobs;
};

// Get job by ID
export const getJobById = async (id) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockJobs.find(job => job.id === id);
};

// Create new job
export const createJob = async (jobData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  const newJob = {
    ...jobData,
    id: mockJobs.length + 1,
    postedDate: new Date().toISOString().split('T')[0],
    status: 'Active'
  };
  mockJobs.push(newJob);
  return newJob;
};

// Update job
export const updateJob = async (id, jobData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  const index = mockJobs.findIndex(job => job.id === id);
  if (index !== -1) {
    mockJobs[index] = { ...mockJobs[index], ...jobData };
    return mockJobs[index];
  }
  return null;
};

// Delete job
export const deleteJob = async (id) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  const index = mockJobs.findIndex(job => job.id === id);
  if (index !== -1) {
    mockJobs.splice(index, 1);
    return true;
  }
  return false;
}; 