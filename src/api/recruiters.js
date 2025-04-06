// Mock recruiter data
const mockRecruiter = {
  id: 1,
  name: 'John Doe',
  title: 'Senior Recruiter',
  email: 'john.doe@example.com',
  phone: '(555) 123-4567',
  location: 'San Francisco, CA',
  department: 'Engineering',
  bio: 'Experienced recruiter specializing in tech roles with a focus on software engineering and product management.',
  expertise: ['Technical Recruitment', 'Candidate Sourcing', 'Interview Coordination'],
  linkedin: 'linkedin.com/in/john-doe',
  yearsOfExperience: '5'
};

// Function to get recruiter profile
export const getRecruiterProfile = async () => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockRecruiter;
};

// Function to update recruiter profile
export const updateRecruiterProfile = async (profileData) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In a real application, this would make an API call to update the profile
  Object.assign(mockRecruiter, profileData);
  return mockRecruiter;
}; 