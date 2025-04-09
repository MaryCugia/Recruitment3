// Mock data for job listings
const jobsData = [
  {
    id: 'job1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    location: 'Nairobi, Kenya',
    type: 'Full-time',
    salary: 'KES 250,000 - 350,000',
    description: 'We are looking for a Senior Frontend Developer to join our digital transformation team. The ideal candidate will have experience in developing scalable applications and working with cross-functional teams.',
    requirements: [
      'Bachelor\'s degree in Computer Science or related field',
      '5+ years of experience in software development',
      'Proficiency in JavaScript, React, and TypeScript',
      'Experience with modern frontend frameworks',
      'Strong problem-solving skills',
      'Excellent communication abilities'
    ],
    responsibilities: [
      'Develop and maintain enterprise applications',
      'Collaborate with product teams to implement new features',
      'Ensure code quality and best practices',
      'Mentor junior developers',
      'Participate in code reviews and technical discussions'
    ],
    benefits: [
      'Medical insurance',
      'Pension scheme',
      'Annual leave of 21 days',
      'Training and development opportunities',
      'Flexible working hours'
    ],
    postedDate: '2024-03-15',
    deadline: '2024-04-15',
    status: 'active'
  },
  {
    id: 'job2',
    title: 'Backend Developer',
    company: 'DataSystems Inc.',
    location: 'Nairobi, Kenya',
    type: 'Full-time',
    salary: 'KES 180,000 - 250,000',
    description: 'Join our backend development team to build robust and scalable server-side applications. We\'re looking for someone with strong problem-solving skills and experience in modern backend technologies.',
    requirements: [
      'Bachelor\'s degree in Computer Science or related field',
      '3+ years of backend development experience',
      'Proficiency in Node.js and Express',
      'Experience with MongoDB and SQL databases',
      'Knowledge of RESTful API design',
      'Understanding of microservices architecture'
    ],
    responsibilities: [
      'Design and implement backend services',
      'Develop RESTful APIs',
      'Optimize database queries',
      'Implement security measures',
      'Collaborate with frontend developers'
    ],
    benefits: [
      'Comprehensive medical cover',
      'Staff loan facilities',
      'Performance bonuses',
      'Professional development support',
      'Flexible working arrangements'
    ],
    postedDate: '2024-03-10',
    deadline: '2024-04-10',
    status: 'active'
  },
  {
    id: 'job3',
    title: 'Full Stack Developer',
    company: 'InnovateX',
    location: 'Nairobi, Kenya',
    type: 'Full-time',
    salary: 'KES 200,000 - 300,000',
    description: 'We are seeking a Full Stack Developer to work on our innovative projects. The ideal candidate should be comfortable working on both frontend and backend technologies.',
    requirements: [
      'Bachelor\'s degree in Computer Science or related field',
      '4+ years of full stack development experience',
      'Proficiency in JavaScript, React, and Node.js',
      'Experience with both SQL and NoSQL databases',
      'Knowledge of cloud platforms (AWS, Azure)',
      'Strong problem-solving abilities'
    ],
    responsibilities: [
      'Develop full stack applications',
      'Implement responsive user interfaces',
      'Design and optimize databases',
      'Ensure application security',
      'Collaborate with cross-functional teams'
    ],
    benefits: [
      'Health insurance',
      'Retirement benefits',
      'Annual performance bonus',
      'Continuous learning opportunities',
      'Remote work options'
    ],
    postedDate: '2024-03-05',
    deadline: '2024-04-05',
    status: 'active'
  },
  {
    id: 'job4',
    title: 'Data Scientist',
    company: 'AnalyticsPro',
    location: 'Nairobi, Kenya',
    type: 'Full-time',
    salary: '$80,000 - $100,000',
    posted: '2023-08-01',
    description: 'AnalyticsPro is seeking a Data Scientist to help extract insights from complex datasets and develop machine learning models for our clients.',
    requirements: [
      'Master\'s degree in Data Science, Statistics, or related field',
      'At least 3 years of experience in data science',
      'Proficiency with Python and data analysis libraries',
      'Experience with machine learning frameworks like TensorFlow',
      'SQL and database knowledge',
      'Data visualization skills',
      'Strong statistical analysis background'
    ]
  },
  {
    id: 'job5',
    title: 'DevOps Engineer',
    company: 'CloudSolutions',
    location: 'Remote',
    type: 'Full-time',
    salary: '$75,000 - $95,000',
    posted: '2023-08-05',
    description: 'CloudSolutions is looking for a DevOps Engineer to help automate and optimize our infrastructure and deployment processes.',
    requirements: [
      'At least 4 years of experience in DevOps or similar role',
      'Experience with AWS, Azure, or GCP',
      'Docker and container orchestration with Kubernetes',
      'CI/CD pipeline implementation',
      'Infrastructure as Code experience (Terraform, CloudFormation)',
      'Linux administration skills',
      'Monitoring and logging implementation'
    ]
  }
];

export default jobsData; 