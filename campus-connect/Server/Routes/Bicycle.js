const express = require("express");
const router = express.Router();

const {auth, is_cycle_admin, is_student} = require("../Middlewares/Auth");
const {add_cycle, update_cycle_status_to_repair, update_cycle_status_to_working, get_cycles_details} = require("../Controllers/Bicycle/Cycle");
const {find_available_cycle, issue_booking, collect_booking, get_today_booking_details} = require("../Controllers/Bicycle/Booking");

router.post("/add_cycle", auth, is_cycle_admin, add_cycle);
router.post("/update_cycle_status_to_repair", auth, is_cycle_admin, update_cycle_status_to_repair);
router.post("/update_cycle_status_to_working", auth, is_cycle_admin, update_cycle_status_to_working);
router.post("/get_cycles_details", auth, is_cycle_admin, get_cycles_details);

router.post("/find_available_cycle", auth, is_student, find_available_cycle);
router.post("/issue_booking", auth, is_cycle_admin, issue_booking);
router.post("/collect_booking", auth, is_cycle_admin, collect_booking);
router.post("/get_today_booking_details", auth, is_cycle_admin, get_today_booking_details);

module.exports = router;