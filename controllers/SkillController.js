const Skill = require("../models/SkillsModel");

const getAllSkills = async (req, res, next) => {
  try {
    const skills = await Skill.find({});
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ error: err });
  }
};

const sendSkill = async (req, res, next) => {
  req.fileNameCustom = 'skills.xlsx';
  next();
}

const updateSkill = async (req, res, next) => {
  req.modelPathCustom= "skills";
  next();
}

module.exports = {
  getAllSkills,
  sendSkill, 
  updateSkill
};
