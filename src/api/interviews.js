// Mock interview data
const mockInterviews = [
  {
    id: 1,
    candidateId: 1,
    candidateName: "John Doe",
    jobTitle: "Senior Software Engineer",
    company: "Tech Corp",
    type: "Technical",
    status: "Scheduled",
    date: "2024-03-20",
    time: "14:00",
    duration: "60",
    interviewer: "Sarah Johnson",
    location: "Virtual",
    meetingLink: "https://meet.google.com/abc-xyz",
    notes: "Focus on system design and problem-solving skills",
    preparation: "Review candidate's previous projects and GitHub contributions"
  },
  {
    id: 2,
    candidateId: 2,
    candidateName: "Jane Smith",
    jobTitle: "Product Manager",
    company: "Innovate Inc",
    type: "Behavioral",
    status: "Completed",
    date: "2024-03-18",
    time: "10:00",
    duration: "45",
    interviewer: "Michael Brown",
    location: "Office - Room 302",
    meetingLink: null,
    notes: "Strong leadership experience",
    preparation: "Review product management case studies",
    feedback: "Excellent communication skills and strategic thinking"
  }
];

// Function to schedule a new interview
export const scheduleInterview = async (interviewData) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const newInterview = {
    id: mockInterviews.length + 1,
    ...interviewData,
    status: "Scheduled",
    lastUpdated: new Date().toISOString()
  };
  
  mockInterviews.push(newInterview);
  return newInterview;
};

// Function to get all interviews
export const getInterviews = async () => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockInterviews;
};

// Function to get interviews for a specific candidate
export const getCandidateInterviews = async (candidateId) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockInterviews.filter(interview => interview.candidateId === candidateId);
};

// Function to update interview status
export const updateInterviewStatus = async (interviewId, status) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const interview = mockInterviews.find(i => i.id === interviewId);
  if (interview) {
    interview.status = status;
    interview.lastUpdated = new Date().toISOString();
  }
  return interview;
}; 