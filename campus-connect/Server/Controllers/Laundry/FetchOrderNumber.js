const User = require("../../Models/User");
const Laundry_account = require("../../Models/Laundry/Laundry_account");
const Laundry_Order = require("../../Models/Laundry/Laundry_Order");
const Counter = require("../../Models/Counter");

exports.fetch_order_number = async (req, res) => {
    try{

        const order_number = await Counter.findOne({name : "laundry_order_number"});
        console.log(order_number);
        
        return res.status(200).json({
            success: true,
            order_number: order_number.seq,
            message: "ORDER NUMBER FETCHED SUCCESSFULLY",
        })
    }
    catch(error){

        return res.status(500).json({
            success: false,
            details: error.message,
            message: "ERROR OCCURED WHILE FETCHING ORDER NUMBER.",
        })
    }
}

exports.fetch_order_details = async (req, res) => {
    try{

        const order_id = req.body.order_id;
        
        const order_details = await Laundry_Order.findById(order_id)
                        .populate("washing")
                        .populate("dry_cleaning")
                        .populate("iron")
                        .exec();
        
        if(!order_details){
            return res.status(404).json({
                success: false,
                message: "INVALID ORDER NUMBER!!!",
            })
        }
        return res.status(200).json({
            success: true,
            order_details: order_details,
            message: "ORDER DETAILS FETCHED SUCCESSFULLY",
        })
    }
    catch(error){

        return res.status(500).json({
            success: false,
            details: error.message,
            message: "ERROR OCCURED WHILE FETCHING ORDER DETAILS.",
        })
    }
}