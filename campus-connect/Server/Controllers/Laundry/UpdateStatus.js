const Laundry_account = require("../../Models/Laundry/Laundry_account");
const Laundry_Order = require("../../Models/Laundry/Laundry_Order");

exports.make_ready_to_collect = async (req, res) => {
    try{

        const laundry_account_id = req.body.laundry_account;
        const order_id = req.body.order_id;

        const updated_order = await Laundry_Order.findByIdAndUpdate(
            order_id,
            {
                status: "Ready_to_collect"
            }
        ).exec();

        const updated_laundry_account = await Laundry_account.findByIdAndUpdate(
            laundry_account_id,
            {
                $pull: {
                    under_washing: order_id,
                },
                $push: {
                    ready_to_collect: order_id,
                }
            },
            {new: true}
        ).exec();

        return res.status(200).json({
            success: true,
            message: "ORDER HAS BEEN UPDATED TO READY TO COLLECT.",
        })
    }
    catch(error){

        return res.status(500).json({
            success: false,
            details: error.message,
            message: "ERROR OCCURED WHILE UPDATING THE ORDER TO READY TO COLLECT.",
        })
    }
}

exports.make_it_completed_order = async (req, res) => {
    try{

        const laundry_account_id = req.body.laundry_account;
        const order_id = req.body.order_id;

        const updated_order = await Laundry_Order.findByIdAndUpdate(
            order_id,
            {
                status: "Completed"
            }
        ).exec();

        const updated_laundry_account = await Laundry_account.findByIdAndUpdate(
            laundry_account_id,
            {
                $pull: {
                    ready_to_collect: order_id,
                },
                $push: {
                    completed_orders: order_id,
                }
            },
            {new: true}
        ).exec();

        return res.status(200).json({
            success: true,
            message: "ORDER HAS BEEN UPDATED TO COMPLETED.",
        })
    }
    catch(error){

        return res.status(500).json({
            success: false,
            details: error.message,
            message: "ERROR OCCURED WHILE UPDATING THE ORDER TO COMPLETED",
        })
    }
}

exports.paid_in_cash = async (req, res) => {

    try{

        const order_id = req.body.order_id;
        await Laundry_Order.findByIdAndUpdate(
            order_id,
            {
                paid_in: "Cash",
                status: "Payment_done"
            }
        )
        return res.status(200).json({
            success: true,
            message: "ORDER HAS BEEN UPDATED TO PAID IN CASH. TO COMPLETE ORDER, CONSULT LAUNDRY.",
        })
    }
    catch(error){

        return res.status(500).json({
            success: false,
            details: error.message,
            message: "ERROR OCCURED WHILE UPDATING THE ORDER TO PAID IN CASH.",
        })
    }
}

exports.paid_in_online = async (req, res) => {

    try{

        const order_id = req.body.order_id;

        await Laundry_Order.findByIdAndUpdate(
            order_id,
            {
                paid_in: "Online",
                status: "Payment_done"
            }
        )
        return res.status(200).json({
            success: true,
            message: "ORDER HAS BEEN UPDATED TO PAID IN ONLINE. TO COMPLETE ORDER, CONSULT LAUNDRY.",
        })
    }
    catch(error){

        return res.status(500).json({
            success: false,
            details: error.message,
            message: "ERROR OCCURED WHILE UPDATING THE ORDER TO PAID IN ONLINE.",
        })
    }
}

