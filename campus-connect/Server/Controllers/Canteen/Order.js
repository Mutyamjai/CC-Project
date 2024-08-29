const Order = require("../../Models/Canteen/Order");
const {upload_image} = require("../../Utils/upload_image");

exports.create_order = async (req, res) => {

    try{

        const details = req.body;
        const user_name = details.user_name;

        const existing_order = await Order.findOne({user_name: user_name});

        if(existing_order){
            return res.status(400).json({
                success: false,
                message: "ONLY ONE ACTIVE BOOKING IS ALLOWED PER USER.",
            })
        }

        const new_booking = await Order.create(details);

        return res.status(200).json({
            success: true,
            message: "ORDER PLACED SUCCESSFULLY",
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            details: error.message,
            message: "ERROR OCCURED WHILE PLACING AN ORDER.",
        })
    }
}

exports.get_all_under_cooking_orders = async (req, res) => {

    try{
        const under_cooking_orders = await Order.find({staus: "Under_cooking"});

        return res.status(200).json({
            success: true,
            under_cooking_orders: under_cooking_orders,
            message: "UNDER COOKING ORDERS FETCHED SUCCESSFULLY.",
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            details: error.message,
            message: "ERROR OCCURED WHILE FETCHING UNDER COOKING ORDERS.",
        })
    }
}

exports.get_all_delivering_orders = async (req, res) => {

    try{
        const under_delivering_orders = await Order.find({staus: {$ne: "Under_cooking"}});

        return res.status(200).json({
            success: true,
            under_delivering_orders: under_delivering_orders,
            message: "ORDERS FETCHED SUCCESSFULLY.",
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            details: error.message,
            message: "ERROR OCCURED WHILE FETCHING ORDERS.",
        })
    }
}

exports.get_my_order_details = async (req, res) => {

    try{
        const user_name = req.body.user_name;
        const my_orders = await Order.findOne({user_name: user_name});

        return res.status(200).json({
            success: true,
            my_orders: my_orders,
            message: "MY ORDER DETAILS FETCHED SUCCESSFULLY.",
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            details: error.message,
            message: "ERROR OCCURED WHILE FETCHING MY ORDER DETAILS.",
        })
    }
}

exports.make_it_under_delivering = async (req, res) => {

    try{
        const {order_id} = req.body.order_id;
        const updated_order = await Order.findByIdAndUpdate(
            order_id,
            {
                status: "Under_delivering"
            },
            {new: true}
        )

        return res.status(200).json({
            success: true,
            message: "ORDER STATUS UPDATED SUCCESSFULLY.",
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            details: error.message,
            message: "ERROR OCCURED WHILE UPDATING THE ORDER STATUS.",
        })
    }
}

exports.make_it_delivered = async (req, res) => {

    try{
        const {order_id} = req.body.order_id;
        const updated_order = await Order.findByIdAndUpdate(
            order_id,
            {
                status: "Delivered"
            },
            {new: true}
        )

        return res.status(200).json({
            success: true,
            updated_order: updated_order,
            message: "ORDER STATUS UPDATED SUCCESSFULLY.",
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            details: error.message,
            message: "ERROR OCCURED WHILE UPDATING THE ORDER STATUS.",
        })
    }
}

exports.complete_order = async (req, res) => {

    try{
        const {order_id} = req.body.order_id;
        await Order.findByIdAndDelete(order_id);

        return res.status(200).json({
            success: true,
            message: "ORDER COMPLETED SUCCESSFULLY.",
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            details: error.message,
            message: "ERROR OCCURED WHILE UPDATING THE ORDER STATUS.",
        })
    }
}

exports.order_received = async (req, res) => {

    try{
        const {order_id} = req.body.order_id;
        const updated_order = await Order.findByIdAndUpdate(
            order_id,
            {
                status: "Student_received"
            },
            {new: true}
        )

        return res.status(200).json({
            success: true,
            updated_order: updated_order,
            message: "ORDER STATUS UPDATED SUCCESSFULLY.",
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            details: error.message,
            message: "ERROR OCCURED WHILE UPDATING THE ORDER STATUS.",
        })
    }
}