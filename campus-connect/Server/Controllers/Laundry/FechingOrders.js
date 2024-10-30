const Laundry_account = require("../../Models/Laundry/Laundry_account");
const User = require("../../Models/User");

exports.fetch_under_washing_orders = async (req, res) => {
    try{

        const laundry_account_id = req.body.laundry_account;

        const laundry_account = await Laundry_account.findById(laundry_account_id).populate("under_washing").exec();
        const under_washing_orders = laundry_account.under_washing;
        
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
        
        const laundry_account = await Laundry_account.findById(laundry_account_id).populate("ready_to_collect").exec();
        const ready_to_collect_orders = laundry_account.ready_to_collect;

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
        const laundry_account = await Laundry_account.findById(laundry_account_id).populate("completed_orders").exec();
        const completed_orders = laundry_account.completed_orders;
        
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

exports.fetch_student_active_orders = async (req, res) => {
    try{

        const user_id = req.user.id;
        const user = await User.findById(user_id)
                            .populate({
                                path: "laundry_orders",
                                match: { status: { $ne: "Completed" } }
                            }).exec();
        
        return res.status(200).json({
            success: true,
            active_orders: user.laundry_orders,
            message: "ACTIVE ORDERS FETCHED SUCCESFULLY.",
        })
    }
    catch(error){

        return res.status(500).json({
            success: false,
            details: error.message,
            message: "ERROR OCCURED WHILE FETCHING ACTIVE ORDERS",
        })
    }
}

exports.fetch_student_completed_orders = async (req, res) => {
    try{

        const user_id = req.user.id;
        const user = await User.findById(user_id)
                            .populate({
                                path: "laundry_orders",
                                match: { status: "Completed" }
                            }).exec();
        
        return res.status(200).json({
            success: true,
            completed_orders: user.laundry_orders,
            message: "COMPLETED ORDERS FETCHED SUCCESFULLY.",
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