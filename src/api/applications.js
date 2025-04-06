// Mock applications data
const mockApplications = [
  {
    id: 1,
    jobId: 1,
    jobTitle: 'Senior Software Engineer',
    candidateId: 1,
    candidateName: 'John Doe',
    candidateTitle: 'Full Stack Developer',
    status: 'Under Review',
    appliedDate: '2024-03-15',
    lastUpdated: '2024-03-16',
    resume: 'john_doe_resume.pdf',
    coverLetter: 'I am excited to apply for the Senior Software Engineer position...',
    skills: ['React', 'Node.js', 'Python', 'AWS'],
    experience: '5 years',
    education: 'BS in Computer Science',
    currentCompany: 'Tech Corp',
    currentTitle: 'Software Engineer',
    location: 'San Francisco, CA',
    notes: 'Strong technical background, good communication skills'
  },
  {
    id: 2,
    jobId: 2,
    jobTitle: 'Product Manager',
    candidateId: 2,
    candidateName: 'Jane Smith',
    candidateTitle: 'Product Lead',
    status: 'Interview Scheduled',
    appliedDate: '2024-03-14',
    lastUpdated: '2024-03-15',
    resume: 'jane_smith_resume.pdf',
    coverLetter: 'With my experience in product management...',
    skills: ['Product Strategy', 'Agile', 'User Research', 'Data Analysis'],
    experience: '7 years',
    education: 'MBA in Product Management',
    currentCompany: 'Product Inc',
    currentTitle: 'Senior Product Manager',
    location: 'New York, NY',
    notes: 'Excellent track record in product launches'
  }
];

// Get all applications
export const getApplications = async () => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockApplications;
};

// Get application by ID
export const getApplicationById = async (id) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockApplications.find(app => app.id === id);
};

// Update application status
export const updateApplicationStatus = async (id, status) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const application = mockApplications.find(app => app.id === id);
  if (application) {
    application.status = status;
    application.lastUpdated = new Date().toISOString().split('T')[0];
  }
  return application;
};

// Search applications
export const searchApplications = async (filters) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let results = [...mockApplications];
  
  if (filters.status) {
    results = results.filter(app => app.status === filters.status);
  }
  
  if (filters.jobTitle) {
    results = results.filter(app => 
      app.jobTitle.toLowerCase().includes(filters.jobTitle.toLowerCase())
    );
  }
  
  if (filters.candidateName) {
    results = results.filter(app => 
      app.candidateName.toLowerCase().includes(filters.candidateName.toLowerCase())
    );
  }
  
  return results;
}; 