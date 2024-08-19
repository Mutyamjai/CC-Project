const Laundry_account = require("../../Models/Laundry/Laundry_account");

exports.fetch_under_washing_orders = async (req, res) => {
    try{

        const laundry_account_id = req.body.laundry_account;

        const under_washing_orders = await Laundry_account.findById({laundry_account_id}).populate("under_washing").exec();
        
        return res.status(200).json({
            success: true,
            under_washing_orders: under_washing_orders,
            message: "UNDER WASHING ORDERS FETCHED SUCCESFULLY.",
        })
    }
    catch(error){

        return res.status(500).json({
            success: false,
            details: error.message,
            message: "ERROR OCCURED WHILE FETCHING UNDER WASHING ORDERS",
        })
    }
}

exports.fetch_ready_to_collect_orders = async (req, res) => {
    try{

        const laundry_account_id = req.body.laundry_account;
        const ready_to_collect_orders = await Laundry_account.findById({laundry_account_id}).populate("ready_to_collect").exec();
        
        return res.status(200).json({
            success: true,
            ready_to_collect_orders: ready_to_collect_orders,
            message: "READY TO COLLECT ORDERS FETCHED SUCCESFULLY.",
        })
    }
    catch(error){

        return res.status(500).json({
            success: false,
            details: error.message,
            message: "ERROR OCCURED WHILE FETCHING READY TO COLLECT ORDERS",
        })
    }
}

exports.fetch_completed_orders = async (req, res) => {
    try{

        const laundry_account_id = req.body.laundry_account;
        const completed_orders = await Laundry_account.findById({laundry_account_id}).populate("completed_orders").exec();
        
        return res.status(200).json({
            success: true,
            completed_orders: completed_orders,
            message: "COMPLETED ORDERS FETCHED SUCCESFULLY/",
        })
    }
    catch(error){

        return res.status(500).json({
            success: false,
            details: error.message,
            message: "ERROR OCCURED WHILE FETCHING COMPLETED ORDERS",
        })
    }
}