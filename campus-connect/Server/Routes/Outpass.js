const express = require("express");
const router = express.Router();

const { auth, is_warden, is_security, is_student } = require("../Middlewares/Auth");
const {create_outpass, get_student_outpass_details, delete_outpass} = require("../Controllers/Outpass/StudentOutpass");
const {accept_outpass, get_all_outpass_details, decline_outpass, security_accept_outpass} = require("../Controllers/Outpass/NonStudentOutpass");

router.post("/create_outpass",auth, is_student, create_outpass);
router.post("/delete_outpass",auth, is_student, delete_outpass);
router.post("/get_student_outpass_details",auth, is_student, get_student_outpass_details);

router.get("/get_all_outpass_details",auth, is_warden, get_all_outpass_details);
router.post("/decline_outpass",auth, is_warden, decline_outpass);
router.post("/accept_outpass",auth, is_warden, accept_outpass);

router.post("/security_accept_outpass",auth, is_security, security_accept_outpass);

module.exports = router;