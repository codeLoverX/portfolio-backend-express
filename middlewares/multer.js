const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/projects/");
  },
  filename: (req, file, cb) => {
    // cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
    cb(null, file.originalname);
  },
});

const uploadMulter = multer({
  storage: storage,
});

module.exports = uploadMulter;
