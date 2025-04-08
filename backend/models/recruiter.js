import mongoose from 'mongoose';

const recruiterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  company: {
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
  role: {
    type: String,
    default: 'recruiter',
  },
}, {
  timestamps: true,
});

const Recruiter = mongoose.model('Recruiter', recruiterSchema);
export default Recruiter;
