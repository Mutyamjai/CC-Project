import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { view_order_details } from '../../Services/Service_Functions/laundry';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Spinner from '../../Components/Common/Spinner';
import convert_date from '../../Utility/dateConvertor';
import { washingData, dryCleanData, ironData } from '../../Data/LaundryData';

function Helper({set_active, active, heading, pieces, order_data, data, name}){

    return (
        <div>
            <div>
                <h1>{heading}</h1>
                <div>{pieces}</div>
                <button onClick={() => {
                    if(active === name)
                        set_active("null");
                    else
                        set_active(name);
                }} className='bg-red-400'>
                    down
                </button>

                <div className='h-[2rem]'></div>
            </div>

            <div className={`${name === active ? "block" : "hidden"}`}>
                {
                    data.map((item, index) => (
                        <div>
                            <div>{item.displayName}</div>
                            <div>{item.price}</div>
                            <div>count : {order_data[item.name]}</div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default function ViewDetails() {
    const {id} = useParams();
    const {token} = useSelector((state)=>state.auth)
    const [details,set_details] = useState(null);
    const [loading, set_loading] = useState(false);
    const [active, set_active] = useState("none");

    useEffect(()=>{
        const getViewDetails = async () =>{
            try{
                const result = await view_order_details(id,token);

                if(result)
                    set_details(result)
            }
            catch(error){
                console.error("Error in fetching details",error)
            }
        } 

        set_loading(true);
        getViewDetails();
        set_loading(false);

         // eslint-disable-next-line
    }, [])

    if(loading){
        return <Spinner/>
    }

    return (
            <div>
                <div>
                    {
                        !details && 
                        <div>
                            INVALID ORDER!!!!
                        </div>
                    }
                </div>
                {
                    details && (<div>
                        <h1>Order Details</h1>
                        <div>{details.order_number}</div>
                        <div>{details.user_name}</div>
                        <div>{convert_date(details.created_at)}</div>
                        
                        <Helper set_active={set_active} heading={"Washing"} pieces={details.total_washing}
                            order_data={details.washing} data={washingData} name={"washing"} active={active}
                        />

                        <Helper set_active={set_active} heading={"Iron"} pieces={details.total_iron}
                            order_data={details.iron} name={"iron"} data={ironData} active={active}
                        />

                        <Helper set_active={set_active} heading={"Dry Cleaning"} pieces={details.total_dry_cleaning}
                            order_data={details.dry_cleaning} data={dryCleanData} name={"dry_cleaning"} active={active}
                        /> 
                        
                        <div>{details.price}</div>
                        <div>{details.total_pieces}</div>
                    </div>
                    )
                }
            </div>
    )
}
