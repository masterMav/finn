const express = require("express");
const apiController = require("../controller/apiController");
const router = express.Router();

//routes
router.post("/register", apiController.register);
router.post("/login", apiController.login);
router.post("/change-password", apiController.changePassword);
router.post("/send-email", apiController.sendEmail);
router.post("/update-gamedata", apiController.updateGamedata);
router.post("/gamedata", apiController.getGamedata);
module.exports = router;
