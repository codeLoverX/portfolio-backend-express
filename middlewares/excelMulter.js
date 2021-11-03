const multer = require("multer");
const path = require('path')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/projects/");
  },
  filename: (req, file, cb) => 
  {
    cb(null, file.originalname);
  },
});

const excelFilter = (req, file, cb) => {
  var ext = path.extname(file.originalname);
  if ([".xlsx", ".xls", ".csv"].includes(ext)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const excelMulter = multer({
  storage: storage,
  fileFilter: excelFilter,
});

module.exports = excelMulter;
