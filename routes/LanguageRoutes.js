const {Router} = require("express");
const LanguageController = require("../controllers/LanguageController");
const router = Router();

// --- getEducation
router.get("/", LanguageController.getAllLanguages)

module.exports = router;
