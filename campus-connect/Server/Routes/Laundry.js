const express = require("express");
const router = express.Router();

const { auth, is_laundry } = require("../Middlewares/Auth");
const {create_order} = require("../Controllers/Laundry/CreateOrder");
const {fetch_order_number} = require("../Controllers/Laundry/FetchOrderNumber");

router.post("/create_order",auth, is_laundry, create_order);
router.get("/fetch_order_number",auth, is_laundry, fetch_order_number);


module.exports = router;