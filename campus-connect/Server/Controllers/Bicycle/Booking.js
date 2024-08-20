const Cycle = require("../../Models/Bicycle/Cycle");
const Booking = require("../../Models/Bicycle/Booking");

async function find_intersection_bookings(start_time, end_time, date) {

    try{
        const results = await Booking.aggregate([
            {
                $match: {
                    $and: [{
                        date: date
                    },{
                        $or : [
                            {start_time: {$lt: end_time, $gt: start_time}},
                            {end_time: { $gt: start_time, $lt: end_time}},
                            {start_time: {$lte: start_time}, end_time: {$gte: end_time}}
                        ]
                    }]
                }
            },
            {
                $group:{
                    _id: "$cycle_id",
                    bookings: { $push: '$$ROOT' }
                }
            }
        ])

        return results;
    }
    catch(error){
        throw err;
    }
}

exports.find_available_cycle = async (req , res) => {

    try{
        const data = req.body;
        
        const existing_booking = await Booking.findOne({user_name : user_name});

        if(existing_booking){
            return res.status(400).json({
                success: false,
                message: "ONLY ONE ACTIVE BOOKING IS ALLOWED PER USER.",
            })
        }

        const working_cycles = await Cycle.find({status: "Under_working"}).exec();
        const working_cycles_id = working_cycles.map((cycle) => cycle._id);

        const intersecting_bookings = await find_intersection_bookings(data.start_time, data.end_time, data.date);
        const booked_cycles_id = intersecting_bookings.map(booking => booking._id);

        const available_cycle_id = working_cycles_id.find(cycle_id => !booked_cycles_id.includes(cycle_id.toString()));

        if(available_cycle_id){
            const cycle = await Cycle.findById(available_cycle_id._id);

            const new_booking_details = {
                user_name: data.user_name,
                email: data.email,
                contact_number: data.contact_number,
                start_time: data.start_time,
                end_time: data.end_time,
                date: data.date,
                cycle_id: cycle.id,
                status: "Not_issued"
            }

            const result = await Booking.create(new_booking_details);

            return res.status(200).json({
                success: true,
                message: "BOOKING SUCCESSFUL",
            })

        }
        else{
            return res.status(400).json({
                success: false,
                message: "NO CYCLES AVAILABLE FOR THIS BOOKING.",
            })
        }
    }
    catch(error){
        return res.status(500).json({
            success: false,
            details: error.message,
            message: "ERROR OCCURED WHILE FINDING AN AVAILABLE CYCLE.",
        })
    }
}

exports.issue_booking = async (req, res) => {
    try{
        const data = req.body;

        await Booking.findByIdAndUpdate(
            data._id,
            {
                status: "Not_issued"
            }
        )
        
        return res.status(200).json({
            success: true,
            message: "CYCLE ISSUED SUCCESSFULLY.",
        })
    }
    catch(error){
        
        return res.status(500).json({
            success: false,
            details: error.message,
            message: "ERROR OCCURED WHILE ISSUING THE BOOKING.",
        })
    }
}

exports.collect_booking = async (req, res) => {
    try{
        const data = req.body;
        await Booking.findByIdAndDelete(data._id);

        return res.status(200).json({
            success: true,
            message: "CYCLE RETURNED SUCCESSFULLY.",
        })
        
    }
    catch(error){
        return res.status(500).json({
            success: false,
            details: error.message,
            message: "ERROR OCCURED WHILE ISSUING THE BOOKING.",
        })
    }
}