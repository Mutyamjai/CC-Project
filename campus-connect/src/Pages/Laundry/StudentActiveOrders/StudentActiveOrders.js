import React from 'react'

export default function StudentActiveOrders() {
    useEffect(()=>{
        const fetchReadyToCollectOrders = async () =>{
            try{
                const result = await fetch_ready_to_collect_orders(user_details.laundry_account,token)
                set_details(result)
                console.log(result);
            }
            catch(error){
                console.error("Error in fetching details",error)
            }
        }
        fetchReadyToCollectOrders();
    },[])
  return (
        <div>
            
        </div>
  )
}
