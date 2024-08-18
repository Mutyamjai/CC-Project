const mongoose = require("mongoose");

const washing_schema = new mongoose.Schema({
    
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
    towel: {
        type: Number,
        default: 0
    },
    bed_sheet: {
        type: Number,
        default: 0
    },
    pillow_cover: {
        type: Number,
        default: 0
    },
    inners: {
        type: Number,
        default: 0
    },
    socks: {
        type: Number,
        default: 0
    },
    hankey: {
        type: Number,
        default: 0
    },
    sweater: {
        type: Number,
        default: 0
    },

})

module.exports = mongoose.model("Washing", washing_schema);