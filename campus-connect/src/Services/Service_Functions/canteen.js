import { api_connector } from "../apiConnector";
import { canteen } from "../apis";

export async function create_item(item_name, category, token){

    try{
        const response = await api_connector("POST", canteen.CREATE_ITEM, {item_name: item_name, category: category},{Authorization: `Bearer ${token}`} );

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