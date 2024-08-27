const express = require("express");
const router = express.Router();

const {auth, is_student, is_canteen_admin} = require("../Middlewares/Auth")
const {create_item} = require("../Controllers/Canteen/Item");

router.post("/create_item", auth, is_canteen_admin, create_item);

module.exports = router;