const User = require("../../Models/User");
const Laundry_account = require("../../Models/Laundry/Laundry_account");
const Laundry_Order = require("../../Models/Laundry/Laundry_Order");

exports.fetch_order_number = async (req, res) => {
    try{

        const laundry_id = req.user.id;
        const user = await User.findOne({_id: laundry_id});
        const laundry_account_id = user.laundry_account;

        const laundry_account = await Laundry_account.findById(laundry_account_id);
        
        return res.status(200).json({
            success: true,
            order_number: laundry_account.order_number,
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