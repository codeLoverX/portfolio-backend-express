const {Router} = require("express");
const excelMulter = require("../middlewares/excelMulter");
const SkillController = require("../controllers/SkillController");
const checkAuth = require("../middlewares/check-auth");
const { sendFileHelper, updateFileHelper } = require("../middlewares/updateFileHelper");
const router = Router();

// --- getExperiences
router.get("/", SkillController.getAllSkills);
// --- updateExperiences
router.get("/updateSkills/excelFile", SkillController.sendSkill, sendFileHelper);
router.post("/updateSkills/",  excelMulter.single("excelFile"), SkillController.updateSkill, updateFileHelper);

module.exports = router;
