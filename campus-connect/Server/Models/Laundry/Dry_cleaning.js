const mongoose = require("mongoose");

const dry_cleaning_schema = new mongoose.Schema({
    
    pant: {
        type: Number,
        default: 0
    },
    shirt: {
        type: Number,
        default: 0
    },
    t_shirt: {
        type: Number,
        default: 0
    },
    tracks: {
        type: Number,
        default: 0
    },
    shorts: {
        type: Number,
        default: 0
    },
    bed_sheet: {
        type: Number,
        default: 0
    },
    sweater: {
        type: Number,
        default: 0
    },
    shoes: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model("Dry_cleaning", dry_cleaning_schema);