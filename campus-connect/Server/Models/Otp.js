const mongoose = require("mongoose");
const mail_sender = require("../Utils/mail_sender");

const otp_schema = new mongoose.Schema({
    
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: Number,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now(),
        expires: 5 * 60,
    }
});

async function send_verification_mail(email, otp){

    try{
        const mail_response = await mail_sender(email, "Verification of Email from Campus Connect", otp);
    }
    catch(error){
        throw error;
    }
}

otp_schema.pre("save", async function(next){
    await send_verification_mail(this.email, this.otp);
    next();
})

module.exports = mongoose.model("Otp", otp_schema);