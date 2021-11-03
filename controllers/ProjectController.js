const Project = require("../models/ProjectModel");

const getAllProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({});
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: err });
  }
};

const sendProject = async (req, res, next) => {
  req.fileNameCustom = 'project.xlsx';
  next();
}

const updateProject = async (req, res, next) => {
  req.modelPathCustom= "projects";
  next();
}

module.exports = {
  sendProject,
  getAllProjects,
  updateProject,
};
