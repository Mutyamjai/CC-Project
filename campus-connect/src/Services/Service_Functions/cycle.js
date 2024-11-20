import { cycle } from "../apis";
import { api_connector } from "../apiConnector";
import toast from "react-hot-toast";


export async function add_cycle(id,token){

    let result;
    try{
        const response = await api_connector("POST", cycle.ADD_CYCLE, {id:id},{Authorization: `Bearer ${token}`} );

        if(!response.data.success)
            throw new Error(response.data.message);
        
        toast.success(response.data.message);
        result = response.data.new_cycle;
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

export async function update_cycle_status_to_repair(id, token){

    let result;
    try{
        const response = await api_connector("POST", cycle.UPDATE_CYCLE_STATUS_TO_REPAIR, {id: id},{Authorization: `Bearer ${token}`} );

        if(!response.data.success)
            throw new Error(response.data.message);
        
        toast.success(response.data.message);
        result = response.data.updated_cycle;
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

export async function update_cycle_status_to_working(id, token){

    let result;
    try{
        const response = await api_connector("POST", cycle.UPDATE_CYCLE_STATUS_TO_WORKING, {id: id},{Authorization: `Bearer ${token}`} );

        if(!response.data.success)
            throw new Error(response.data.message);
        
        toast.success(response.data.message);
        result = response.data.updated_cycle;
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

export async function fetch_cycle_details(token){

    let result;
    try{
        const response = await api_connector("POST", cycle.GET_CYCLE_DETAILS, {},{Authorization: `Bearer ${token}`} );

        if(!response.data.success)
            throw new Error(response.data.message);
        
        result = response.data.cycle_details;
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

export async function find_available_cycle(details, token, navigate){

    try{
        const response = await api_connector("POST", cycle.FIND_AVAILABLE_CYCLE, {details : details},{Authorization: `Bearer ${token}`} );

        if(!response.data.success)
            throw new Error(response.data.message);
        
        toast.success(response.data.message);
        navigate("/Cycle/My_Booking");
    }
    catch(error){
        console.log(error);

        if(error.response.data?.message)
            toast.error(error.response.data.message);
        else
            toast.error("SOME TECHNICAL ISSUE HAS BEEN TAKEN PLACE");
    }
}

export async function fetch_today_booking_details(details, token){

    let result;
    try{
        const response = await api_connector("POST", cycle.GET_TODAY_BOOKING_DETAILS, {date : details},{Authorization: `Bearer ${token}`} );

        if(!response.data.success)
            throw new Error(response.data.message);

        result = response.data.booking_details;
        
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

export async function fetch_student_booking_details(details, token){

    let result;
    try{
        const response = await api_connector("POST", cycle.GET_STUDENT_BOOKING_DETAILS , {user_name : details},{Authorization: `Bearer ${token}`} );

        if(!response.data.success)
            throw new Error(response.data.message);

        result = response.data.booking_details;
        
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

export async function issue_booking(id, token){

    let result;
    try{
        const response = await api_connector("POST", cycle.ISSUE_BOOKING , {id: id},{Authorization: `Bearer ${token}`} );

        if(!response.data.success)
            throw new Error(response.data.message);

        result = response.data.updated_booking;
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

export async function collect_booking(id, token){

    let result;
    try{
        const response = await api_connector("POST", cycle.COLLECT_BOOKING , {id: id},{Authorization: `Bearer ${token}`} );

        if(!response.data.success)
            throw new Error(response.data.message);

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

export async function get_availabiity_details(today, tmr, token){

    let result;
    try{
        const response = await api_connector("POST", cycle.GET_AVAILABILITY_DETAILS , {today: today, tmr: tmr},{Authorization: `Bearer ${token}`} );

        if(!response.data.success)
            throw new Error(response.data.message);

        result = response.data;
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