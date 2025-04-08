import mongoose from 'mongoose';

const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  phone: {
    type: String,
  },
  resumeLink: {
    type: String,
  },
  skills: [{
    type: String,
  }],
  experience: {
    type: Number, // in years
    default: 0,
  },
  status: {
    type: String,
    enum: ['pending', 'interviewed', 'hired', 'rejected'],
    default: 'pending',
  }
}, {
  timestamps: true,
});

const Candidate = mongoose.model('Candidate', candidateSchema);
export default Candidate;
