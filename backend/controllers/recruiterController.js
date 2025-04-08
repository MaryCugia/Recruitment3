import Recruiter from '../models/Recruiter.js';

export const getAllRecruiters = async (req, res) => {
  try {
    const recruiters = await Recruiter.find();
    res.status(200).json(recruiters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getRecruiterById = async (req, res) => {
  try {
    const recruiter = await Recruiter.findById(req.params.id);
    if (!recruiter) {
      return res.status(404).json({ message: 'Recruiter not found' });
    }
    res.status(200).json(recruiter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createRecruiter = async (req, res) => {
  try {
    const newRecruiter = new Recruiter(req.body);
    const savedRecruiter = await newRecruiter.save();
    res.status(201).json(savedRecruiter);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Invalid recruiter data' });
  }
};

export const updateRecruiter = async (req, res) => {
  try {
    const updatedRecruiter = await Recruiter.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedRecruiter) {
      return res.status(404).json({ message: 'Recruiter not found' });
    }

    res.status(200).json(updatedRecruiter);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Update failed' });
  }
};

export const deleteRecruiter = async (req, res) => {
  try {
    const deletedRecruiter = await Recruiter.findByIdAndDelete(req.params.id);
    if (!deletedRecruiter) {
      return res.status(404).json({ message: 'Recruiter not found' });
    }

    res.status(200).json({ message: 'Recruiter deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
