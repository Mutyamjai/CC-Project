import { cycle } from "../apis";
import { api_connector } from "../apiConnector";
import toast from "react-hot-toast";

export async function add_cycle(id,token){

    try{
        const response = await api_connector("POST", cycle.ADD_CYCLE, {id:id},{Authorization: `Bearer ${token}`} );

        if(!response.data.success)
            throw new Error(response.data.message);
        
        toast.success(response.data.message);
        
    }
    catch(error){
        console.log(error);

        if(error.response.data?.message)
            toast.error(error.response.data.message);
        else
            toast.error("SOME TECHNICAL ISSUE HAS BEEN TAKEN PLACE");
    }
}