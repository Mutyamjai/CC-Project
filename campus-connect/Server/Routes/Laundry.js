const express = require("express");
const router = express.Router();

const { auth, is_laundry, is_student } = require("../Middlewares/Auth");
const {create_order} = require("../Controllers/Laundry/CreateOrder");
const {fetch_order_number, fetch_order_details} = require("../Controllers/Laundry/FetchOrderNumber");
const {fetch_under_washing_orders, fetch_ready_to_collect_orders, fetch_completed_orders, fetch_student_active_orders, fetch_student_completed_orders} = require("../Controllers/Laundry/FechingOrders");
const {make_ready_to_collect, make_it_completed_order, paid_in_cash, paid_in_online} = require("../Controllers/Laundry/UpdateStatus")

router.post("/create_order",auth, is_laundry, create_order);
router.get("/fetch_order_number",auth, is_laundry, fetch_order_number);
router.post("/fetch_order_details",auth , fetch_order_details);

router.post("/fetch_under_washing_orders",auth, is_laundry, fetch_under_washing_orders);
router.post("/fetch_ready_to_collect_orders",auth, fetch_ready_to_collect_orders);
router.post("/fetch_completed_orders",auth, is_laundry, fetch_completed_orders);

router.get("/fetch_student_active_orders",auth, is_student, fetch_student_active_orders);
router.get("/fetch_student_completed_orders",auth, is_student, fetch_student_completed_orders);

router.post("/make_ready_to_collect",auth, is_laundry, make_ready_to_collect);
router.post("/make_it_completed_order",auth, is_laundry, make_it_completed_order);

router.post("/paid_in_cash",auth, is_student, paid_in_cash);
router.post("/paid_in_online",auth, is_student, paid_in_online);

module.exports = router;