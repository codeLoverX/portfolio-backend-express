const mongoose = require("mongoose");

const skillsSchema = mongoose.Schema({
  type: { type: String, required: true },
  level: { type: Number, required: true },
});

module.exports = mongoose.model("Skills", skillsSchema);
