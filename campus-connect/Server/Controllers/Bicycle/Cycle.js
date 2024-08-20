const Cycle = require("../../Models/Bicycle/Cycle");
const Booking = require("../../Models/Bicycle/Booking");

exports.add_cycle = async (req, res) => {
    try{

        const id = req.body.id;

        const cycle_exist = await Cycle.findOne({id : id});

        if(cycle_exist){
            return res.status(401).json({
                success: false,
                message: "CYCLE WITH THIS ID ALREADY EXIST.",
            })
        }

        details = {
            id : id,
            status : "Under_working"
        }

        const new_cycle = await Cycle.create(details);
        
        return res.status(200).json({
            success: true,
            message: `NEW CYCLE WITH CYCLE NUMBER ${new_cycle.cycle_number} IS ADDED.`,
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            details: error.message,
            message: "ERROR OCCURED ADDING A NEW CYCLE.",
        })
    }
}

exports.update_cycle_status_to_working = async (req, res) => {
    try {
        
        const id = req.body.id;

        if(!id){
            return res.status(401).json({
                success: false,
                message: "INSUFFICIENT DETAILS.",
            })
        }
       
        const update_cycle = await Cycle.findOneAndUpdate(
            {id : id},
            {
                status : "Under_working"
            }
        );

        if(update_cycle){
            return res.status(401).json({
                success: false,
                message: "INVALID CYCLE ID.",
            })
        }
        else{
            return res.status(200).json({
                success: true,
                message: `THE CYCLE STATUS IS UPDATED TO UNDER WORKING.`,
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            details: error.message,
            message: "ERROR OCCURED WHILE UPDATING THE STATUS OF CYCLE.",
        })
    }
}


exports.update_cycle_status_to_repair = async (req, res) => {
    try {
        
        const id = req.body.id;

        if(!id){
            return res.status(401).json({
                success: false,
                message: "INSUFFICIENT DETAILS.",
            })
        }
       
        const update_cycle = await Cycle.findOneAndUpdate(
            {id : id},
            {
                status : "Under_repair"
            }
        );

        if(update_cycle){
            return res.status(401).json({
                success: false,
                message: "INVALID CYCLE ID.",
            })
        }
        else{
            return res.status(200).json({
                success: true,
                message: `THE CYCLE STATUS IS UPDATED TO UNDER REPAIRING.`,
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            details: error.message,
            message: "ERROR OCCURED WHILE UPDATING THE STATUS OF CYCLE.",
        })
    }
}
