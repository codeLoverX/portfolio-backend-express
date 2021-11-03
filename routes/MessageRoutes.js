const {Router} = require("express");
const MessageController = require("../controllers/MessageController");
const router = Router();

router.post("/sendMessage/", MessageController.sendMessage)

module.exports = router;
