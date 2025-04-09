import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

async function testJobPosting() {
    try {
        // First, let's login as a recruiter to get a token
        const loginResponse = await axios.post(`${API_URL}/auth/login`, {
            email: 'recruiter@example.com',
            password: 'password123',
            role: 'recruiter'
        });

        const token = loginResponse.data.token;
        const headers = {
            Authorization: `Bearer ${token}`
        };

        // Test creating a new job posting
        console.log('Testing job creation...');
        const newJob = {
            title: 'Senior Software Engineer',
            description: 'Looking for an experienced software engineer to join our team.',
            requirements: '5+ years of experience, strong problem-solving skills',
            location: 'Remote',
            salary: '120000',
            company: 'Tech Corp',
            status: 'active'
        };

        const createResponse = await axios.post(`${API_URL}/jobs`, newJob, { headers });
        console.log('Job created successfully:', createResponse.data);

        // Test getting all active jobs
        console.log('\nTesting getting active jobs...');
        const activeJobsResponse = await axios.get(`${API_URL}/jobs/active`);
        console.log('Active jobs:', activeJobsResponse.data);

        // Test getting jobs posted by the recruiter
        console.log('\nTesting getting recruiter\'s jobs...');
        const myJobsResponse = await axios.get(`${API_URL}/jobs/recruiter/myjobs`, { headers });
        console.log('Recruiter\'s jobs:', myJobsResponse.data);

    } catch (error) {
        console.error('Error during testing:', error.response ? error.response.data : error.message);
    }
}

testJobPosting(); 