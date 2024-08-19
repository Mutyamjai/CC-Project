const express = require("express");
const router = express.Router();

const { auth, is_laundry } = require("../Middlewares/Auth");
const {create_order} = require("../Controllers/Laundry/CreateOrder");
const {fetch_order_number} = require("../Controllers/Laundry/FetchOrderNumber");
const {fetch_under_washing_orders, fetch_ready_to_collect_orders, fetch_completed_orders} = require("../Controllers/Laundry/FechingOrders");

router.post("/create_order",auth, is_laundry, create_order);
router.get("/fetch_order_number",auth, is_laundry, fetch_order_number);

router.get("/fetch_under_washing_orders",auth, is_laundry, fetch_under_washing_orders);
router.get("/fetch_ready_to_collect_orders",auth, fetch_ready_to_collect_orders);
router.get("/fetch_completed_orders",auth, is_laundry, fetch_completed_orders);

module.exports = router;