import { api_connector } from "../apiConnector";
import toast from "react-hot-toast";
import { auth} from "../apis";

export async function send_otp(email, navigate){

    let result;
    try{
        const response = await api_connector("POST", auth.SEND_OTP, {email:email} );

        if(!response.data.success)
            throw new Error(response.data.message);
    
        result = response.data;
        navigate('/Verify_otp');
    }
    catch(error){
        console.log(error);
        toast.error(error.response.data.message);
    }
    finally{
        return result;
    }
}
