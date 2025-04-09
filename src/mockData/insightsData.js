// Mock data for AI insights that simulates backend API responses
// This can be used to simulate different responses for different job IDs

const insightsData = {
  // Senior Software Engineer position at Safaricom
  'job1': {
    jobId: 'job1',
    jobTitle: 'Senior Software Engineer',
    company: 'Safaricom PLC',
    jobMatchScore: 85,
    skillMatch: {
      required: ['Java', 'Spring Boot', 'Microservices', 'M-Pesa Integration', 'Swahili', 'CSK Certification'],
      matched: ['Java', 'Spring Boot', 'Microservices', 'Swahili'],
      missing: ['M-Pesa Integration', 'CSK Certification']
    },
    experienceMatch: {
      required: '5+ years',
      candidate: '4 years',
      match: 'Partial'
    },
    educationMatch: {
      required: "Bachelor's in Computer Science",
      candidate: "Bachelor's in Computer Science",
      match: 'Full'
    },
    culturalFit: {
      score: 90,
      factors: [
        'Experience working in Kenyan tech ecosystem',
        'Understanding of local business practices',
        'Team collaboration skills',
        'Adaptability to local market needs'
      ]
    },
    recommendations: [
      'Obtain CSK certification to meet regulatory requirements',
      'Complete M-Pesa integration training course',
      'Enhance knowledge of Kenyan data protection laws',
      'Participate in local tech community events',
      'Consider pursuing a Master\'s degree in Computer Science from a Kenyan university'
    ]
  },
  
  // Data Analyst position at KCB Bank
  'job2': {
    jobId: 'job2',
    jobTitle: 'Data Analyst',
    company: 'KCB Bank Kenya',
    jobMatchScore: 78,
    skillMatch: {
      required: ['Python', 'R', 'SQL', 'Banking Analytics', 'CBK Regulations', 'Swahili'],
      matched: ['Python', 'SQL', 'Swahili'],
      missing: ['R', 'Banking Analytics', 'CBK Regulations']
    },
    experienceMatch: {
      required: '3+ years',
      candidate: '2 years',
      match: 'Partial'
    },
    educationMatch: {
      required: "Bachelor's in Statistics or related field",
      candidate: "Bachelor's in Mathematics",
      match: 'Partial'
    },
    culturalFit: {
      score: 85,
      factors: [
        'Understanding of Kenyan banking sector',
        'Knowledge of local financial regulations',
        'Strong communication skills',
        'Analytical thinking'
      ]
    },
    recommendations: [
      'Complete CBK regulatory compliance training',
      'Take banking analytics specialization course',
      'Learn R programming for financial analysis',
      'Join Kenya Bankers Association networking events',
      'Consider pursuing CFA certification'
    ]
  },
  
  // Digital Marketing Specialist position at Jumia
  'job3': {
    jobId: 'job3',
    jobTitle: 'Digital Marketing Specialist',
    company: 'Jumia Kenya',
    jobMatchScore: 92,
    skillMatch: {
      required: ['Social Media Marketing', 'E-commerce', 'Swahili', 'Local Market Knowledge', 'Analytics', 'Content Creation'],
      matched: ['Social Media Marketing', 'E-commerce', 'Swahili', 'Local Market Knowledge', 'Content Creation'],
      missing: ['Analytics']
    },
    experienceMatch: {
      required: '2+ years',
      candidate: '3 years',
      match: 'Full'
    },
    educationMatch: {
      required: "Bachelor's in Marketing",
      candidate: "Bachelor's in Marketing",
      match: 'Full'
    },
    culturalFit: {
      score: 95,
      factors: [
        'Understanding of Kenyan consumer behavior',
        'Experience with local social media platforms',
        'Creative approach to marketing',
        'Adaptability to market trends',
        'Strong local network'
      ]
    },
    recommendations: [
      'Enhance analytics skills with Google Analytics certification',
      'Stay updated with Kenya\'s digital marketing trends',
      'Build portfolio of successful Kenyan campaigns',
      'Network with local digital marketing professionals',
      'Consider pursuing Digital Marketing Institute certification'
    ]
  },
  
  // Full Stack Developer position
  'job4': {
    jobId: 'job4',
    jobTitle: 'Full Stack Developer',
    company: 'InnovateX',
    jobMatchScore: 92,
    skillMatch: {
      required: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Git', 'RESTful APIs'],
      matched: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Git', 'RESTful APIs'],
      missing: []
    },
    experienceMatch: {
      required: '2+ years',
      candidate: '3 years',
      match: 'Full'
    },
    educationMatch: {
      required: "Bachelor's degree",
      candidate: "Bachelor's in Computer Science",
      match: 'Full'
    },
    culturalFit: {
      score: 95,
      factors: [
        'Innovative thinking',
        'Adaptable to change',
        'Self-motivated',
        'Collaborative approach',
        'Passion for technology'
      ]
    },
    recommendations: [
      'Consider learning GraphQL to enhance your API skills',
      'Explore Next.js for server-side rendering expertise',
      'Build a full-stack project showcasing all your skills',
      'Highlight your end-to-end development experience in interviews'
    ]
  },
  
  // Data Scientist position
  'job5': {
    jobId: 'job5',
    jobTitle: 'Data Scientist',
    company: 'AnalyticsPro',
    jobMatchScore: 65,
    skillMatch: {
      required: ['Python', 'Machine Learning', 'SQL', 'TensorFlow', 'Data Visualization', 'Statistical Analysis'],
      matched: ['Python', 'SQL', 'Data Visualization'],
      missing: ['Machine Learning', 'TensorFlow', 'Statistical Analysis']
    },
    experienceMatch: {
      required: '3+ years',
      candidate: '1 year',
      match: 'Partial'
    },
    educationMatch: {
      required: "Master's in Data Science, Statistics, or related field",
      candidate: "Bachelor's in Computer Science",
      match: 'Partial'
    },
    culturalFit: {
      score: 80,
      factors: [
        'Analytical mindset',
        'Attention to detail',
        'Problem-solving abilities',
        'Curiosity and research orientation'
      ]
    },
    recommendations: [
      "Consider pursuing a Master's degree in Data Science",
      'Take advanced courses in Machine Learning and Statistical Analysis',
      'Complete TensorFlow certification',
      'Build a portfolio of data science projects showing your analytical skills',
      'Join data science communities to learn best practices'
    ]
  },
  
  // DevOps Engineer position
  'job6': {
    jobId: 'job6',
    jobTitle: 'DevOps Engineer',
    company: 'CloudSolutions',
    jobMatchScore: 70,
    skillMatch: {
      required: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Infrastructure as Code', 'Linux'],
      matched: ['Docker', 'CI/CD', 'Linux'],
      missing: ['AWS', 'Kubernetes', 'Infrastructure as Code']
    },
    experienceMatch: {
      required: '4+ years',
      candidate: '2 years',
      match: 'Partial'
    },
    educationMatch: {
      required: "Bachelor's in Computer Science or equivalent",
      candidate: "Bachelor's in Computer Science",
      match: 'Full'
    },
    culturalFit: {
      score: 85,
      factors: [
        'Strong troubleshooting skills',
        'Team collaboration',
        'Adaptable to changing requirements',
        'Process-oriented mindset'
      ]
    },
    recommendations: [
      'Obtain AWS Certified DevOps Engineer certification',
      'Learn Kubernetes through hands-on projects',
      'Practice Infrastructure as Code with Terraform or CloudFormation',
      'Contribute to open-source DevOps tools',
      'Join DevOps communities to stay current with best practices'
    ]
  }
};

export default insightsData; 