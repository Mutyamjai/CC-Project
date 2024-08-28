const express = require("express");
const router = express.Router();

const {auth, is_student, is_canteen_admin} = require("../Middlewares/Auth")
const {create_item, get_all_items, alter_item_status, get_menu} = require("../Controllers/Canteen/Item");

router.post("/create_item", auth, is_canteen_admin, create_item);
router.get("/get_all_items", auth, is_canteen_admin, get_all_items);
router.post("/alter_item_status", auth, is_canteen_admin, alter_item_status);
router.get("/get_menu", auth, is_student, get_menu);

module.exports = router;