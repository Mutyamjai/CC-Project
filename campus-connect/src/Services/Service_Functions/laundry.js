import { laundry } from "../apis";
import { api_connector } from "../apiConnector";
import toast from "react-hot-toast";

export async function create_laundry_order(details, token,navigate){

    try{
        const response = await api_connector("POST", laundry.CREATE_ORDER, details,{Authorization: `Bearer ${token}`} );

        if(!response.data.success)
            throw new Error(response.data.message);
        console.log(response);
        toast.success(response.data.message);
        navigate("/Laundry/Create_Order");
    }
    catch(error){
        console.log(error);

        if(error.response.data)
            toast.error(error.response.data.message);
        else
            toast.error("SOME TECHNICAL ISSUE HAS BEEN TAKEN PLACE");
    }
}
export async function fetch_order_number(token ,navigate){
    let result = -1;
    try{
        const response = await api_connector("GET", laundry.FETCH_ORDER_NUMBER,{} ,{Authorization: `Bearer ${token}`} );

        if(!response.data.success)
            throw new Error(response.data.message);
        //console.log(response);
        toast.success(response.data.message);
        //navigate("/Laundry/Create_Order");
        result = response.data.order_number;
    }
    catch(error){
        console.log(error);

        if(error.response.data)
            toast.error(error.response.data.message);
        else
            toast.error("SOME TECHNICAL ISSUE HAS BEEN TAKEN PLACE");
        navigate('/');
    }
    finally{
        return result;
    }
}