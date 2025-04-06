// Mock candidate data
const mockCandidates = [
  {
    id: 1,
    name: "John Doe",
    title: "Senior Software Engineer",
    location: "San Francisco, CA",
    experience: "7", // 7 years of experience
    skills: ["React", "Node.js", "TypeScript", "AWS"],
    status: "Active",
    lastUpdated: "2024-03-15T10:00:00Z",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    linkedin: "linkedin.com/in/john-doe",
    summary: "Experienced full-stack developer with a focus on modern web technologies.",
    education: [
      {
        degree: "B.S. Computer Science",
        school: "Stanford University",
        year: "2019"
      }
    ],
    experience: [
      {
        title: "Senior Software Engineer",
        company: "Tech Corp",
        duration: "2021 - Present",
        description: "Leading development of enterprise web applications"
      },
      {
        title: "Software Engineer",
        company: "Startup Inc",
        duration: "2019 - 2021",
        description: "Developed and maintained web applications"
      }
    ],
    applications: [
      {
        jobId: 1,
        jobTitle: "Senior Frontend Developer",
        company: "Tech Corp",
        status: "In Review",
        appliedDate: "2024-03-10"
      }
    ]
  },
  {
    id: 2,
    name: "Jane Smith",
    title: "Product Manager",
    location: "New York, NY",
    experience: "4", // 4 years of experience
    skills: ["Product Management", "Agile", "UX/UI", "JIRA"],
    status: "Active",
    lastUpdated: "2024-03-14T15:30:00Z",
    email: "jane.smith@example.com",
    phone: "(555) 987-6543",
    linkedin: "linkedin.com/in/jane-smith",
    summary: "Product manager with experience in SaaS and enterprise software.",
    education: [
      {
        degree: "M.B.A.",
        school: "Harvard Business School",
        year: "2020"
      }
    ],
    experience: [
      {
        title: "Product Manager",
        company: "Innovate Inc",
        duration: "2021 - Present",
        description: "Managing product roadmap and development"
      },
      {
        title: "Associate Product Manager",
        company: "Startup Co",
        duration: "2020 - 2021",
        description: "Product development and user research"
      }
    ],
    applications: [
      {
        jobId: 2,
        jobTitle: "Product Manager",
        company: "Innovate Inc",
        status: "Interview Scheduled",
        appliedDate: "2024-03-12"
      }
    ]
  }
];

// Function to get all candidates
export const getCandidates = async () => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockCandidates;
};

// Function to get a candidate by ID
export const getCandidateById = async (id) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockCandidates.find(candidate => candidate.id === id);
};

// Function to search candidates
export const searchCandidates = async (filters) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return mockCandidates.filter(candidate => {
    const matchesKeywords = !filters.keywords || 
      candidate.name.toLowerCase().includes(filters.keywords.toLowerCase()) ||
      candidate.title.toLowerCase().includes(filters.keywords.toLowerCase()) ||
      candidate.skills.some(skill => 
        skill.toLowerCase().includes(filters.keywords.toLowerCase())
      );
    
    const matchesLocation = !filters.location || 
      candidate.location.toLowerCase().includes(filters.location.toLowerCase());
    
    // Improved experience level matching
    const matchesExperience = !filters.experience || 
      (filters.experience === 'entry' && parseInt(candidate.experience) <= 2) ||
      (filters.experience === 'mid' && parseInt(candidate.experience) > 2 && parseInt(candidate.experience) <= 5) ||
      (filters.experience === 'senior' && parseInt(candidate.experience) > 5);
    
    return matchesKeywords && matchesLocation && matchesExperience;
  });
};

// Function to update candidate status
export const updateCandidateStatus = async (id, status) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const candidate = mockCandidates.find(c => c.id === id);
  if (candidate) {
    candidate.status = status;
    candidate.lastUpdated = new Date().toISOString();
  }
  return candidate;
}; 