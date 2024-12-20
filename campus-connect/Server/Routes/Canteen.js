const express = require("express");
const router = express.Router();

const {auth, is_student, is_canteen_admin} = require("../Middlewares/Auth")
const {create_item, get_all_items, alter_item_status, get_menu} = require("../Controllers/Canteen/Item");
const {create_order, get_my_order_details, get_all_active_orders, get_all_delivering_orders
, make_it_under_delivering, make_it_delivered, order_received, complete_order, accept_order, decline_order} = require("../Controllers/Canteen/Order")

router.post("/create_item", auth, is_canteen_admin, create_item);
router.get("/get_all_items", auth, is_canteen_admin, get_all_items);
router.post("/alter_item_status", auth, is_canteen_admin, alter_item_status);
router.get("/get_menu", auth, is_student, get_menu);

router.get("/get_all_active_orders", auth, is_canteen_admin, get_all_active_orders);
router.get("/get_all_delivering_orders", auth, is_canteen_admin, get_all_delivering_orders);
router.post("/make_it_under_delivering", auth, is_canteen_admin, make_it_under_delivering);
router.post("/make_it_delivered", auth, is_canteen_admin, make_it_delivered);
router.post("/complete_order", auth, is_canteen_admin, complete_order);
router.post("/accept_order", auth, is_canteen_admin, accept_order);
router.post("/decline_order", auth, is_canteen_admin, decline_order);

router.post("/create_order", auth, is_student, create_order);
router.post("/get_my_order_details", auth, is_student, get_my_order_details);
router.post("/order_received", auth, is_student, order_received);

module.exports = router;