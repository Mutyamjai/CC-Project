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

        if(error.response.data?.message)
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

        if(error.response.data?.message)
            toast.error(error.response.data.message);
        else
            toast.error("SOME TECHNICAL ISSUE HAS BEEN TAKEN PLACE");
        navigate('/');
    }
    finally{
        return result;
    }
}

export async function fetch_under_washing_orders(laundry_account, token){
    let result;
    try{
        const response = await api_connector("POST", laundry.FETCH_UNDER_WASHING_ORDERS,{laundry_account: laundry_account} ,{Authorization: `Bearer ${token}`} );

        if(!response.data.success)
            throw new Error(response.data.message);

        toast.success(response.data.message);
        result = response.data.under_washing_orders;
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

export async function fetch_ready_to_collect_orders(laundry_account, token){
    let result;
    try{
        const response = await api_connector("POST", laundry.FETCH_READY_TO_COLLECT_ORDERS,{laundry_account: laundry_account} ,{Authorization: `Bearer ${token}`} );

        if(!response.data.success)
            throw new Error(response.data.message);

        toast.success(response.data.message);
        result = response.data.ready_to_collect_orders;
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

export async function fetch_completed_orders(laundry_account, token){
    let result;
    try{
        const response = await api_connector("POST", laundry.FETCH_COMPLETED_ORDERS,{laundry_account: laundry_account} ,{Authorization: `Bearer ${token}`} );

        if(!response.data.success)
            throw new Error(response.data.message);

        toast.success(response.data.message);
        result = response.data.completed_orders;
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

export async function fetch_student_completed_orders( token){
    let result;
    try{
        const response = await api_connector("GET", laundry.FETCH_STUDENT_COMPLETED_ORDERS,{} ,{Authorization: `Bearer ${token}`} );

        if(!response.data.success)
            throw new Error(response.data.message);

        toast.success(response.data.message);
        result = response.data.completed_orders;
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
export async function fetch_student_active_orders( token){
    let result;
    try{
        const response = await api_connector("GET", laundry.FETCH_STUDENT_ACTIVE_ORDERS,{} ,{Authorization: `Bearer ${token}`} );

        if(!response.data.success)
            throw new Error(response.data.message);

        toast.success(response.data.message);
        result = response.data.completed_orders;
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

export async function make_ready_to_collect(laundry_account, order_id , token, navigate){
    try{
        const response = await api_connector("POST", laundry.MAKE_READY_TO_COLLECT, {laundry_account: laundry_account, order_id: order_id} ,{Authorization: `Bearer ${token}`} );

        if(!response.data.success)
            throw new Error(response.data.message);

        toast.success(response.data.message);
        navigate("/Laundry/Ready_to_Collect")
    }
    catch(error){
        console.log(error);

        if(error.response.data?.message)
            toast.error(error.response.data.message);
        else
            toast.error("SOME TECHNICAL ISSUE HAS BEEN TAKEN PLACE");
    }
}

export async function make_it_completed_order(laundry_account, order_id , token, navigate){
    try{
        const response = await api_connector("POST", laundry.MAKE_IT_COMPLETED_ORDER, {laundry_account: laundry_account, order_id: order_id} ,{Authorization: `Bearer ${token}`} );

        if(!response.data.success)
            throw new Error(response.data.message);

        toast.success(response.data.message);
        navigate("/Laundry/Completed_Orders");
    }
    catch(error){
        console.log(error);

        if(error.response.data?.message)
            toast.error(error.response.data.message);
        else
            toast.error("SOME TECHNICAL ISSUE HAS BEEN TAKEN PLACE");
    }
}

export async function paid_in_cash(order_id, token, navigate){
    try{
        const response = await api_connector("POST", laundry.PAID_IN_CASH, { order_id: order_id} ,{Authorization: `Bearer ${token}`} );

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

export async function paid_in_online(order_id, token, navigate){
    try{
        const response = await api_connector("POST", laundry.PAID_IN_ONLINE, { order_id: order_id} ,{Authorization: `Bearer ${token}`} );

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


