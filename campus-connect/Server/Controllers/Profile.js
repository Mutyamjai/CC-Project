const User = require("../Models/User");
const bcrypt = require("bcryptjs");

exports.update_profile = async (req, res) => {
    try{

        const { user_name, email, contact_number } = req.body;
        user_id = req.user.id;
        const user = await User.findOne({_id: user_id});

        if(!user){
            return res.status(404).json({
                success: false,
                message: "UNABLE TO FIND THE DETAILS OF THE USER.",
            })
        }

        const check_name = await User.findOne({user_name: user_name});

        if(check_name && check_name != user_id){
            return res.status(402).json({
                success: false,
                message: "USER NAME IS ALREADY TAKEN.",
            })
        }
        user.email = email;
        user.user_name = user_name;
        user.contact_number = contact_number;
        await user.save();

        user.password = null;

        return res.status(200).json({
            success: true,
            updated_user: user,
            message: "PROFILE UPDATED SUCCESSFULLY",
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "ERROR OCCURED WHILE UPDATING THE PROFILE.",
            details: error.message
        })
    }
}

exports.change_password = async (req, res) => {

    try{

        const { old_password, new_password} = req.body;
        const id = req.user.id;

        if(!id || !new_password || !old_password){
            return res.status(403).json({
                success: false,
                message: "ALL FIELDS ARE MANDATORY, PLEASE TRY AGAIN",
            })
        };

        let user = await User.findOne({_id : id});

        if(!user){
            return res.status(401).json({
                success: false,
                message: "USER NOT REGISTERED, PLEASE SIGN UP FIRST",
            })
        }

        if(await bcrypt.compare(old_password, user.password)){

            const hashed_password = await bcrypt.hash(new_password, 10);

            await User.findByIdAndUpdate(
                {_id : user._id},
                {password: hashed_password},
                {new : true}
            )
            
            return res.status(200).json({
                success: true,
                message: "PASSWORD CHANGED SUCCESFULLY",
            })
        }
        else{
            return res.status(401).json({
                success: false,
                message: "OLD PASSWORD DO NOT MATCH YOUR ACCOUNT PASSWORD. PLEASE TRY AGAIN",
            })
        }

    }
    catch(error){
        return res.status(500).json({
            success: false,
            details: error.message,
            message: "ERROR OCCURED WHILE CHANGING PASSWORD. PLEASE TRY AGAIN",
        })
    }
}