const Candidate = require('../models/Candidate');  // Import the Candidate model

// Search candidates based on query parameters
exports.searchCandidates = async (req, res) => {
  const { keywords, location, experience, skills } = req.body;

  try {
    // Build search query object
    let searchQuery = {};

    if (keywords) {
      searchQuery.$text = { $search: keywords };  // Use text search for keywords (make sure to index the fields)
    }

    if (location) {
      searchQuery.location = { $regex: location, $options: 'i' }; // Case-insensitive search
    }

    if (experience) {
      searchQuery.experience = experience;  // Exact match for experience level
    }

    if (skills) {
      searchQuery.skills = { $in: skills.split(',').map(skill => skill.trim()) };  // Match any of the skills
    }

    // Fetch candidates based on the search query
    const candidates = await Candidate.find(searchQuery).exec();

    // Respond with the candidates found
    res.status(200).json(candidates);
  } catch (error) {
    console.error('Error searching candidates:', error);
    res.status(500).json({ message: 'Failed to search candidates' });
  }
};

// Get a specific candidate by ID
exports.getCandidateById = async (req, res) => {
  const { candidateId } = req.params;

  try {
    // Fetch the candidate details by ID
    const candidate = await Candidate.findById(candidateId).exec();

    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    // Respond with the candidate profile
    res.status(200).json(candidate);
  } catch (error) {
    console.error('Error fetching candidate profile:', error);
    res.status(500).json({ message: 'Failed to fetch candidate profile' });
  }
};

// Schedule an interview for a candidate
exports.scheduleInterview = async (req, res) => {
  const { candidateId, interviewDetails } = req.body;

  try {
    // Find the candidate by ID and add the interview details
    const candidate = await Candidate.findById(candidateId).exec();

    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    // Add interview details to the candidate's interview array (assuming you have an "interviews" field)
    candidate.interviews.push(interviewDetails);
    await candidate.save();

    res.status(200).json({ message: 'Interview scheduled successfully', candidate });
  } catch (error) {
    console.error('Error scheduling interview:', error);
    res.status(500).json({ message: 'Failed to schedule interview' });
  }
};

// Update candidate profile (if needed)
exports.updateCandidateProfile = async (req, res) => {
  const { candidateId } = req.params;
  const updatedProfileData = req.body;

  try {
    const candidate = await Candidate.findByIdAndUpdate(candidateId, updatedProfileData, { new: true });

    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    res.status(200).json({ message: 'Candidate profile updated', candidate });
  } catch (error) {
    console.error('Error updating candidate profile:', error);
    res.status(500).json({ message: 'Failed to update candidate profile' });
  }
};

// Send email to candidate
exports.contactCandidate = async (req, res) => {
  const { candidateId, emailContent } = req.body;

  try {
    const candidate = await Candidate.findById(candidateId).exec();

    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    // Assuming the use of a mailer function to send emails (e.g., Nodemailer)
    await sendEmail(candidate.email, emailContent); // You'll need to implement this function

    res.status(200).json({ message: 'Email sent successfully to candidate' });
  } catch (error) {
    console.error('Error sending email to candidate:', error);
    res.status(500).json({ message: 'Failed to send email to candidate' });
  }
};

// Helper function to send email (this will need to be implemented with a real email service like Nodemailer)
const sendEmail = async (email, content) => {
  // Here, implement your email sending logic (e.g., using Nodemailer)
  console.log(`Sending email to: ${email}, Content: ${content}`);
};
