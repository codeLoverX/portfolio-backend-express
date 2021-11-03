const Language = require("../models/LanguageModel");

const getAllLanguages = async (req, res, next) => {
  try {
    const languages = await Language.find({});
    res.status(200).json(languages);
  } catch (error) {
    res.status(500).json({ error: err });
  }
};

module.exports = {
  getAllLanguages
};
