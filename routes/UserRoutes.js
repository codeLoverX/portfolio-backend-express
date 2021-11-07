const {Router} = require("express");
const UserController = require("../controllers/UserController");
const checkAuth = require("../middlewares/check-auth");
const router = Router();
 
router.get('/', UserController.getUsers)
router.post("/signup", checkAuth, UserController.signup);
router.post("/login", UserController.login);

module.exports = router;
