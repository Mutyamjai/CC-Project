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
            new_cycle: new_cycle,
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
            {_id : id},
            {
                status : "Under_working"
            },
            {new: true}
        );

        if(!update_cycle){
            return res.status(401).json({
                success: false,
                message: "INVALID CYCLE ID.",
            })
        }
        else{
            return res.status(200).json({
                success: true,
                updated_cycle: update_cycle,
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
            {_id : id},
            {
                status : "Under_repair"
            }, 
            {new: true}
        );

        console.log(update_cycle);

        if(!update_cycle){
            return res.status(401).json({
                success: false,
                message: "INVALID CYCLE ID.",
            })
        }
        else{
            return res.status(200).json({
                success: true,
                updated_cycle: update_cycle,
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

exports.get_cycles_details = async (req, res) => {

    try {

        const cycle_details = await Cycle.find();

        return res.status(200).json({
            success: true,
            cycle_details: cycle_details,
            message: `CYCLE DETAILS FETCHED SUCCESFULLY.`,
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            details: error.message,
            message: "ERROR OCCURED WHILE FETCHING ALL CYCLES DETAILS.",
        })
    }
}

