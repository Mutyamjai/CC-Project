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

export async function create_order(user_details, cart, total_amount, token, navigate){

    let result;
    try{
        const response = await api_connector("POST", canteen.CREATE_ORDER, {
            user_name: user_details.user_name,
            contact_number: user_details.contact_number,
            email: user_details.email,
            payment_method: "Cash",
            total_amount: total_amount,
            cart: cart
        } ,{ Authorization: `Bearer ${token}`} );

        if(!response.data.success)
            throw new Error(response.data.message);

        toast.success(response.data.message);
        result = true;
        navigate("/Cateen/My_Order")
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

export async function get_all_under_cooking_orders(token){
    let result;
    try{
        const response = await api_connector("GET", canteen.GET_ALL_UNDER_COOKING_ORDERS, {} ,{ Authorization: `Bearer ${token}`} );

        if(!response.data.success)
            throw new Error(response.data.message);
        
        result =  response.data.under_cooking_orders
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

export async function get_all_delivering_orders(token){
    let result;
    try{
        const response = await api_connector("GET", canteen.GET_ALL_DELIVERING_ORDERS, {} ,{ Authorization: `Bearer ${token}`} );

        if(!response.data.success)
            throw new Error(response.data.message);
        
        result =  response.data.under_delivering_orders
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

export async function get_my_order_details(user_name, token){
    let result;
    try{
        const response = await api_connector("POST", canteen.GET_MY_ORDER_DETAILS, {user_name: user_name} ,{ Authorization: `Bearer ${token}`} );

        if(!response.data.success)
            throw new Error(response.data.message);
        
        result =  response.data.my_orders
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

export async function make_it_delivered(order_id, token){
    let result;
    try{
        const response = await api_connector("POST", canteen.MAKE_IT_DELIVERED, {order_id: order_id} ,{ Authorization: `Bearer ${token}`} );

        if(!response.data.success)
            throw new Error(response.data.message);
        
        toast.success(response.data.message);
        result =  response.data.updated_order;
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

export async function make_it_under_delivering(order_id, token, naviagte){

    try{
        const response = await api_connector("POST", canteen.MAKE_IT_UNDER_DELIVERING, {order_id: order_id} ,{ Authorization: `Bearer ${token}`} );

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

export async function order_received(order_id, token){

    let result;
    try{
        const response = await api_connector("POST", canteen.ORDER_RECEIVED, {order_id: order_id} ,{ Authorization: `Bearer ${token}`} );

        if(!response.data.success)
            throw new Error(response.data.message);
        
        toast.success(response.data.message);
        result = response.data.updated_order;
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

export async function complete_order(order_id, token){

    let result;
    try{
        const response = await api_connector("POST", canteen.COMPLETE_ORDER, {order_id: order_id} ,{ Authorization: `Bearer ${token}`} );

        if(!response.data.success)
            throw new Error(response.data.message);
        
        toast.success(response.data.message);
        result = true;
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