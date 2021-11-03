// --- imports
const {Router} = require("express");
const EducationController = require("../controllers/EducationController");
const checkAuth = require("../middlewares/check-auth");
const excelMulter = require("../middlewares/excelMulter");
const { sendFileHelper, updateFileHelper } = require("../middlewares/updateFileHelper");
const router = Router();


// --- getEducation
router.get("/", EducationController.getAllEducations);
// --- updateEducaton
router.get("/updateEducations/excelFile", EducationController.sendEducation, sendFileHelper);
router.post("/updateEducations/",  excelMulter.single("excelFile"), EducationController.updateEducation, updateFileHelper);


// --- exports
module.exports = router;
