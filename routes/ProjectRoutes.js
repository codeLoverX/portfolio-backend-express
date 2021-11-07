const {Router} = require("express");
const multer = require("../middlewares/multer");
const ProjectController = require("../controllers/ProjectController");
const checkAuth = require("../middlewares/check-auth");
const { sendFileHelper, updateFileHelper } = require("../middlewares/updateFileHelper");
const router = Router();

// --- getMessage
router.get("/", ProjectController.getAllProjects);
// --- updateMessage
router.get("/updateProjects/excelFile", ProjectController.sendProject, sendFileHelper);
// router.post("/updateProjects/",  multer.fields([{name:'excelFile'}, {name: 'imageFile'}]), ProjectController.updateProject, updateFileHelper);
router.post("/updateProjects/",  multer.fields([{name:'excelFile'}, {name: 'imageFile'}]), ProjectController.updateProject, updateFileHelper);


module.exports = router;
