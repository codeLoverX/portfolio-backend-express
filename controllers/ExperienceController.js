const Experience = require("../models/ExperienceModel");

const getAllExperiences = async (req, res, next) => {
  try {
    const experiences = await Experience.find({});
    res.status(200).json(experiences);
  } catch (error) {
    res.status(500).json({ error: err });
  }
};

const sendExperience = async (req, res, next) => {
  req.fileNameCustom = 'experience.xlsx';
  next();
};

const updateExperience = async (req, res, next) => {
  req.modelPathCustom= "experiences";
  next();
}

module.exports = {
  getAllExperiences,
  sendExperience,
  updateExperience
};
