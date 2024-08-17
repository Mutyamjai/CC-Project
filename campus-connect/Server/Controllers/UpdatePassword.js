const User = require("../models/User");
const mail_sender = require("../utils/mail_sender");
const bcrypt = require("bcryptjs");

exports.reset_password_token = async (req, res) => {

    try{

        const email = req.body.email;

        const user = await User.findOne({email : email});

        if(!user){
            return res.status(401).json({
                success: false,
                message: "EMAIL NOT REGISTERED. PLEASE ENTER A VALID EMAIL ID",
            })
        }

        const token = crypto.randomUUID();

        const updated_details = await User.findOneAndUpdate(
            {email : email},
            {
                token : token,
                reset_password_expiry_time : (Date.now() + 10 * 60 * 1000)
            },
            {new : true}
        )

        const url = `http://localhost:3000/update_password/${token}`;

        await mail_sender(email, "Reset Password Link", url);

        return res.status(200).json({
            success: true,
            message: "RESET PASSWORD LINK SENT SUCCESSFULLY. PLEASE CHECK YOUR MAIL RESPECTIVELY",
        })
    }
    catch(error){   
        return res.status(500).json({
            success: false,
            detaisl: error.message,
            message: "ERROR OCCURED WHILE RESETTING THE PASSWORD TOKEN. PLEASE TRY AGAIN",
        })
    }
}


exports.reset_password = async (req, res) => {

    try{
        //Get details from the request
        const {password, confirm_password, token} = req.body;

        if(password !== confirm_password){
            return res.status(401).json({
                success: false,
                message: "PASSWORD AND CONFIRM PASSWORD DO NOT MATCH",
            })
        }

        //check validation
        const user = await User.findOne({token: token});

        if(!user){
            return res.status(401).json({
                success: false,
                message: "INVALID TOKEN",
            })
        }

        const hashed_password = await bcrypt.hash(password, 10);

        if(user.reset_password_expiry_time > Date.now()){

            const updated_user = await User.findOneAndUpdate(
                {token : token},
                {password : hashed_password},
                {new : true}
            )
            
            return res.status(200).json({
                success: true,
                message: "RESET PASSWORD HAS DONE SUCCESSFULLY.",
            })

        }
        else{
            return res.status(400).json({
                success: false,
                message: "RESET PASSWORD LINK HAS BEEN EXPIRED. PLEASE TRY AGAIN LATER.",
            })
        }
    }
    catch(error){   
        return res.status(500).json({
            success: false,
            detaisl: error.message,
            message: "ERROR OCCURED WHILE RESETTING PASSWORD. PLEASE TRY AGAIN LATER.",
        })
    }
}