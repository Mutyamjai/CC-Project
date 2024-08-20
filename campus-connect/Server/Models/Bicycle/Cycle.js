const mongoose = require("mongoose");

const cycle_schema=mongoose.Schema({
    id : {
        type : String,
        required : true
    },
    cycle_number : {
        type : Number,
        required : true,
    },
    status:{
        type : String,
        required : true,
        enum : ["Under_working", "Under_repair"]
    }
},{timestamps : true});

cycle_schema.pre('save', async function(next){
    if(this.isNew){
        const last_cycle = await mongoose.model('Cycle').findOne().sort({cycle_number : -1});
        this.cycle_number = last_cycle ? last_cycle.cycle_number + 1 : 1;
    }
    next();
})

module.exports = mongoose.model("Cycle", cycle_schema);
