// backend/models/About.js
import mongoose from 'mongoose';

const aboutSchema = new mongoose.Schema({
  mission: {
    title: String,
    content: String
  },
  features: [{
    title: String,
    description: String
  }],
  team: [{
    name: String,
    position: String,
    bio: String,
    image: String
  }],
  contact: {
    email: String,
    phone: String,
    address: String
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('About', aboutSchema);