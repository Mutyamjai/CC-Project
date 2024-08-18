import { api_connector } from "../apiConnector";
import toast from "react-hot-toast";
import { auth} from "../apis";

export async function send_otp(email, navigate){

    let result;
    try{
        const response = await api_connector("POST", auth.SEND_OTP, {email:email} );

        if(!response.data.success)
            throw new Error(response.data.message);
        
        toast.success(response.data.message);
        result = response.data;
        navigate('/Verify_Otp');
    }
    catch(error){
        console.log(error);
        if(error.response.data)
            toast.error(error.response.data.message);
        else
            toast.error("SOME TECHNICAL ISSUE HAS BEEN TAKEN PLACE");
    }
    finally{
        return result;
    }
}

export async function sign_up(user_name, email, password, confirm_password, contact_number, account_type, otp, navigate){

    let result;
    try{
        const response = await api_connector("POST", auth.SIGN_UP, {user_name, email, password, confirm_password, contact_number, account_type, otp});

        if(!response.data.success)
            throw new Error(response.data.message);
        
        toast.success(response.data.message);
        result = response.data;
        navigate('/');
    }
    catch(error){
        console.log(error);
        if(error.response.data)
            toast.error(error.response.data.message);
        else
            toast.error("SOME TECHNICAL ISSUE HAS BEEN TAKEN PLACE");
    }
    finally{
        return result;
    }
}

export async function log_in(email, password, navigate){

    let result;
    try{
        const response = await api_connector("POST", auth.LOG_IN, {email:email, password: password} );

        if(!response.data.success)
            throw new Error(response.data.message);
        
        toast.success(response.data.message);
        result = response.data;
        navigate('/');
    }
    catch(error){
        console.log(error);

        if(error.response.data)
            toast.error(error.response.data.message);
        else
            toast.error("SOME TECHNICAL ISSUE HAS BEEN TAKEN PLACE");
    }
    finally{
        return result;
    }
}

export async function send_reset_password_token(email, set_mail_sent){

    try{
        const response = await api_connector("POST", auth.RESET_PASSWORD_TOKEN, {email:email} );
        console.log(response);
        if(!response.data.success)
            throw new Error(response.data.message);
        
        toast.success(response.data.message);
        set_mail_sent(true);
    }
    catch(error){
        console.log(error);

        if(error.response.data)
            toast.error(error.response.data.message);
        else
            toast.error("SOME TECHNICAL ISSUE HAS BEEN TAKEN PLACE");
    }
}

export async function reset_password(password, confirm_password, id, navigate){

    try{
        const response = await api_connector("POST", auth.RESET_PASSWORD, {password: password, confirm_password: confirm_password, token:id} );

        if(!response.data.success)
            throw new Error(response.data.message);
        console.log(response);
        toast.success(response.data.message);
        navigate("/Login");
    }
    catch(error){
        console.log(error);

        if(error.response.data)
            toast.error(error.response.data.message);
        else
            toast.error("SOME TECHNICAL ISSUE HAS BEEN TAKEN PLACE");
    }
}