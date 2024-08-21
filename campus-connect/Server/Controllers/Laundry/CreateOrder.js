const User = require("../../Models/User");
const Laundry_Order = require("../../Models/Laundry/Laundry_Order");
const Washing = require("../../Models/Laundry/Washing");
const Dry_cleaning = require("../../Models/Laundry/Dry_cleaning");
const Iron = require("../../Models/Laundry/Iron");
const Laundry_account = require("../../Models/Laundry/Laundry_account");

exports.create_order = async (req, res) => {
    try{
        let details = req.body;
        const laundry_id = req.user.id;
        const laundry_account_user = await User.findOne({_id: laundry_id});
        const laundry_account_id = laundry_account_user.laundry_account;

        const user = await User.findOne({user_name: details.user_name});

        if(!user){
            return res.status(404).json({
                success: false,
                message: "INVALID USER NAME",
            })
        }

        const washing = await Washing.create(details.washing);
        const dry_cleaning = await Dry_cleaning.create(details.dry_cleaning);
        const iron = await Iron.create(details.iron);
   
        details.washing = washing._id;
        details.dry_cleaning = dry_cleaning._id;
        details.iron = iron._id;

        const created_order = await Laundry_Order.create(details);

        const updated_laundry_account = await Laundry_account.findByIdAndUpdate(
            laundry_account_id,
            {
                $push: {
                    under_washing: created_order._id
                },
                $inc: { 
                    order_number: 1 
                }
            },
            {new: true}
        ).exec();

        user.laundry_orders.push(created_order._id);
        await user.save();

        return res.status(200).json({
            success: true,
            message: "ORDER CREATED SUCCESSFULLY",
        })
    }
    catch(error){

        return res.status(500).json({
            success: false,
            details: error.message,
            message: "ERROR OCCURED WHILE CREATING A LAUNDRY ORDER",
        })
    }
}