const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
    user_name : {
        type : String,
        required : true
    },
    email : {
        type: String,
        required: true
    },
    contact_number:{
        type:Number,
        required: true
    },
    start_time:{
        type : String,
        required :true
    },
    end_time:{
        type : String,
        required :true
    },
    date:{
        type: String,
        required :true
    },
    cycle_id: {
        type : mongoose.Schema.Types.ObjectId,
        required :true
    },
    status:{
        type:String,
        required:true,
        enum : ["Issued", "Not_issued"]
    }
},{timestamps : true});

export const bookingModel = mongoose.model('Booking',bookingSchema);