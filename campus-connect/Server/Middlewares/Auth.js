const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {

    try{

        const token = req.body.token || req.header("Authorization").replace("Bearer ", "");

        if(!token){
            return res.status(401).json({
                success: false,
                message: "TOKEN IS MISSING",
            })
        }

        try{
            const decode = jwt.verify(token, process.env.SECRET_KEY);
            req.user = decode;
        }
        catch(error){

            return res.status(401).json({
                success: false,
                message: "LOGIN TIME EXPIRED. PLEASE LOGIN AGAIN",
            })
        }

        next();
    }
    catch(error){
        return res.status(500).json({
            status: false,
            message: "SOMETHING WENT WRONG WHILE VALIDATING TOKEN",
        })
    }
}

exports.is_student = async(req, res, next) => {
    try{
        if(req.user.account_type !== "Student"){
            return res.status(401).json({
                success: true, 
                message: "THIS IS A PROTECTED ROUTE FOR STUDENT ONLY"
            })
        }

        next();
    }
    catch(error){
        return res.status(500).json({
            success: true,
            details: error.message,
            message: "ERROR OCCURED WHILE VALIDATING THE ROLE OF THE USER"
        })
    }
}

exports.is_laundry = async(req, res, next) => {
    try{
        if(req.user.account_type !== "Laundry"){
            return res.status(401).json({
                success: true, 
                message: "THIS IS A PROTECTED ROUTE FOR LAUNDRY ONLY"
            })
        }

        next();
    }
    catch(error){
        return res.status(500).json({
            success: true,
            details: error.message,
            message: "ERROR OCCURED WHILE VALIDATING THE ROLE OF THE USER"
        })
    }
}

//VALIDATING WHETHER THE USER IS A CYCLE ADMIN
exports.is_cycle_admin = async(req, res, next) => {
    try{
        if(req.user.account_type !== "Cycle_admin"){
            return res.status(401).json({
                success: true, 
                message: "THIS IS A PROTECTED ROUTE FOR CYCLE ADMIN ONLY"
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success: true,
            details: error.message,
            message: "ERROR OCCURED WHILE VALIDATING THE ROLE OF THE USER"
        })
    }
}