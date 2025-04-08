// backend/controllers/aboutController.js
import About from '../models/About.js';

export const getAboutContent = async (req, res) => {
  try {
    const aboutContent = await About.findOne();
    res.json(aboutContent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching about content' });
  }
};

export const updateAboutContent = async (req, res) => {
  try {
    const aboutContent = await About.findOneAndUpdate(
      {},
      req.body,
      { new: true, upsert: true }
    );
    res.json(aboutContent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating about content' });
  }
};