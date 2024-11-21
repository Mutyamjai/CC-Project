const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();

exports.login = async (req, res) => {

    try{
        
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(403).json({
                success: false,
                message: "ALL FIELDS ARE MANDATORY, PLEASE TRY AGAIN",
            })
        };

        let user = await User.findOne({email: email})

        if(!user){
            return res.status(401).json({
                success: false,
                message: "USER NOT REGISTERED, PLEASE SIGN UP FIRST",
            })
        }

        if(await bcrypt.compare(password, user.password)){
            const payload = {
                email : user.email,
                id : user._id,
                account_type : user.account_type,
            }

            const token = jwt.sign(payload, process.env.SECRET_KEY, {
                expiresIn: "10h",
            });
            
            user = user.toObject();
            user.token = token;
            user.password = undefined;

            return res.status(200).json({
                success: true,
                user: user,
                message: "LOGGED IN SUCCESSFULLY",
            })
        }
        else{
            return res.status(401).json({
                success: false,
                message: "INVALID PASSWORD. PLEASE TRY AGAIN",
            })
        }

    }
    catch(error){
        return res.status(500).json({
            success: false,
            details: error.message,
            message: "ERROR OCCURED WHILE LOGGING IN. PLEASE TRY AGAIN",
        })
    }
}
