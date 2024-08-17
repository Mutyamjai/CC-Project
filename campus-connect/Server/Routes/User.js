const express = require("express");
const router = express.Router();

const {login} = require("../Controllers/Login");
const {send_otp, sign_up} = require("../Controllers/AccountCreation");
// const {change_password} = require("../controllers/Change_password");
// const {auth} = require("../middle_wares/auth");
// const {reset_password_token, reset_password} = require("../controllers/Reset_password");

router.post("/login", login);
router.post("/sign_up", sign_up);
router.post("/send_otp", send_otp);

// router.post("/change_password", auth, change_password);

// router.post("/reset_password_token", reset_password_token);
// router.post("/reset_password", reset_password);

module.exports = router;