const express = require("express");
const router = express.Router();

const {login} = require("../Controllers/Login");
const {send_otp, sign_up} = require("../Controllers/AccountCreation");
const {update_profile, change_password} = require("../Controllers/Profile");
const { auth} = require("../Middlewares/Auth");
const {reset_password_token, reset_password} = require("../Controllers/UpdatePassword");

router.post("/login", login);
router.post("/sign_up", sign_up);
router.post("/send_otp", send_otp);

// router.post("/change_password", auth, change_password);

router.post("/reset_password_token", reset_password_token);
router.post("/reset_password", reset_password);

router.post("/update_profile", auth, update_profile);
router.post("/change_password", auth, change_password);

module.exports = router;