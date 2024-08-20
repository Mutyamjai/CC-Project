const express = require("express");
const router = express.Router();

const {auth, is_cycle_admin, is_student} = require("../Middlewares/Auth");
const {add_cycle, update_cycle_status_to_repair, update_cycle_status_to_working} = require("../Controllers/Bicycle/Cycle");
const {find_available_cycle, issue_booking, collect_booking} = require("../Controllers/Bicycle/Booking");

router.post("/add_cycle", auth, is_cycle_admin, add_cycle);
router.post("/update_cycle_status_to_repair", auth, is_cycle_admin, update_cycle_status_to_repair);
router.post("/update_cycle_status_to_working", auth, is_cycle_admin, update_cycle_status_to_working);

router.post("/find_available_cycle", auth, is_student, find_available_cycle);
router.post("/issue_booking", auth, is_cycle_admin, issue_booking);
router.post("/collect_booking", auth, is_cycle_admin, collect_booking);

module.exports = router;