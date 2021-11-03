const Education = require("../models/EducationModel");

const getAllEducations = async (req, res, next) => {
  try {
    const educations = await Education.find({});
    res.status(200).json(educations);
  } catch (error) {
    res.status(500).json({ error: err });
  }
};

//  fs.unlinkSync(path)

const sendEducation = async (req, res, next) => {
  req.fileNameCustom = 'educations.xlsx';
  next();
}

const updateEducation = async (req, res, next) => {
  req.modelPathCustom= "education";
  next();
}


module.exports = {
  getAllEducations,
  sendEducation,
  updateEducation,
};
