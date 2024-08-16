const User = require("../Models/User");
const Otp = require("../Models/Otp");

const otp_generator = require("otp-generator");
const bcrypt = require("bcryptjs");

exports.send_otp = async (req, res) => {
    try{

        const email = req.body.email;

        const user = await User.findOne({email: email});

        if(user){
            return res.status(401).json({
                success: false,
                message: "USER IS ALREADY REGISTERED WITH EMAIL ADDRESS",
            })
        }
        
        var otp = otp_generator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        })


        var existing_otp = await Otp.findOne({otp : otp});

        while(existing_otp){
            var otp = otp_generator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            })

            var existing_otp = await Otp.findOne({otp : otp});
        }

        const otp_entry = await Otp.create({email, otp});
        
        return res.status(200).json({
            success: true,
            message: "OTP SENT SUCCESSFULLY",
        })
    }
    catch(error){

        console.log("ERROR OCCURED WHILE SENDING OTP", error);

        return res.status(500).json({
            success: false,
            details: error.message,
            message: "ERROR OCCURED WHILE SENDING OTP",
        })
    }
}


exports.sign_up = async (req, res) => {
    try{
        
        const { user_name, email, password, confirm_password, contact_number, account_type, otp } = req.body;

        if(!user_name || !email || !password || !contact_number || !confirm_password || !otp){
            return res.status(403).json({
                success: false,
                message: "SOME REQUIRED DETAILS ARE EMPTY",
            })
        }

        const existing_user = await User.findOne({email : email});

        if(existing_user){
            return res.status(400).json({
                success: false,
                message: "USER IS ALREADY REGISTERED",
            })
        }

        const recent_otp = await Otp.find({email: email}).sort({created_at : -1}).limit(1);

        if(!recent_otp){
            return res.status(400).json({
                success: false,
                message: "OTP HAS EXPIRED. RETRY AGAIN."
            });
        }
        else if(Number(otp) !== recent_otp[0].otp){

            return res.status(403).json({
                success: false,
                message: "INVALID OTP ENTERED"
            });
        }

        const hashed_pass = await bcrypt.hash(password, 10);
        
        const user = await User.create({
            user_name: user_name,
            email: email,
            contact_number : Number(contact_number),
            password: hashed_pass,
            account_type: account_type,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${user_name}`,
        })

        return res.status(200).json({
            success: true,
            message: "USER REGISTERED SUCCESSFULLY",
            user,
        })
    }
    catch(error){

        return res.status(500).json({
            success: false,
            message: error.message,
            details: "ERROR DURING SIGN UP PROCESS",
        })
    }
}