import { api_connector } from "../apiConnector";
import { canteen } from "../apis";
import toast from "react-hot-toast";
export async function create_item(formData , token){

    try{
        const response = await api_connector("POST", canteen.CREATE_ITEM, formData ,{"Content-Type": "multipart/form-data", Authorization: `Bearer ${token}`} );

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

export async function get_all_items( token){
    let result;
    try{
        const response = await api_connector("GET", canteen.GET_ALL_ITEMS, {} ,{ Authorization: `Bearer ${token}`} );

        if(!response.data.success)
            throw new Error(response.data.message);
        
        result =  response.data.all_items
    }
    catch(error){
        console.log(error);

        if(error.response.data?.message)
            toast.error(error.response.data.message);
        else
            toast.error("SOME TECHNICAL ISSUE HAS BEEN TAKEN PLACE");
    }
    finally{
        return result;
    }
}

export async function alter_item_status(item_id, new_status, token){
    let result;
    try{
        const response = await api_connector("POST", canteen.ALTER_ITEM_STATUS , {item_id: item_id, new_status: new_status} ,{ Authorization: `Bearer ${token}`} );

        if(!response.data.success)
            throw new Error(response.data.message);
        
        result =  response.data.updated_item
    }
    catch(error){
        console.log(error);

        if(error.response.data?.message)
            toast.error(error.response.data.message);
        else
            toast.error("SOME TECHNICAL ISSUE HAS BEEN TAKEN PLACE");
    }
    finally{
        return result;
    }
}

export async function get_menu(token){
    let result;
    try{
        const response = await api_connector("GET", canteen.GET_MENU, {} ,{ Authorization: `Bearer ${token}`} );

        if(!response.data.success)
            throw new Error(response.data.message);
        
        result =  response.data.menu
    }
    catch(error){
        console.log(error);

        if(error.response.data?.message)
            toast.error(error.response.data.message);
        else
            toast.error("SOME TECHNICAL ISSUE HAS BEEN TAKEN PLACE");
    }
    finally{
        return result;
    }
}