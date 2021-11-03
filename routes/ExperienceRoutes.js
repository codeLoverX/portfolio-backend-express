const {Router} = require("express");
const ExperienceController = require("../controllers/ExperienceController");
const checkAuth = require("../middlewares/check-auth");
const excelMulter = require("../middlewares/excelMulter");
const { sendFileHelper, updateFileHelper } = require("../middlewares/updateFileHelper");
const router = Router();

// --- getExperiences
router.get("/", ExperienceController.getAllExperiences);
// --- updateExperiences
router.get("/updateExperiences/excelFile", ExperienceController.sendExperience, sendFileHelper);
router.post("/updateExperiences/",  excelMulter.single("excelFile"), ExperienceController.updateExperience, updateFileHelper);

module.exports = router;
