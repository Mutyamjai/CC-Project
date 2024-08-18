const User = require("../../Models/User");
const Laundry_account = require("../../Models/Laundry/Laundry_account");

exports.fetch_order_number = async (req, res) => {
    try{

        const laundry_id = req.user.id;
        const laundry_account_id = await User.findOne({_id: laundry_id}).laundry_account;
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