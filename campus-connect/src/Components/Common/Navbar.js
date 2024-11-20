import React from 'react'
import SideBar from './SideBar'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { set_token } from '../../Slices/authSlice';
import { set_user_details } from '../../Slices/profileSlice';
import toast from 'react-hot-toast';
import { sideBarData } from '../../Data/SideBarData';

export default function Navbar() {

    const {user_details} = useSelector(state => state.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function Help({name, address}){
      return (
        <button onClick={() => navigate(address)}>
          {
            name
          }
        </button>
      )
    }

    const log_out = () => {
      localStorage.clear();
      dispatch(set_token(null));
      dispatch(set_user_details(null));
      
      toast.success("LOGGED OUT SUCCESSFULLY.");
      navigate("/");
    }

    return (
      <div className='fixed z-20 w-full bg-yellow-200 h-[3.5rem] flex'>

          <div className='md:hidden w-full'>
             <SideBar/>
          </div>
          NAVBAR
          
          <div>
            <Help name={"Home"} address={"/"}/>

            {
                user_details && (
                  <>
                      {
                        sideBarData
                        .filter(item => item.account_type === user_details.account_type)
                        .map(item => (
                        <Help key={item.name} name={item.name} address={item.address} />
                        ))
                      }
                  </>
                )
              }

          </div>

          <div>
            {
              user_details && (
                <div>
                  <button onClick={() => navigate("/Profile")}>
                    Profile
                  </button>

                  <button onClick={() => log_out()}>
                    Log Out
                  </button>
                </div>
              )
            }

            {
              !user_details && (
                <div>
                  <button onClick={() => navigate("/Login")}>
                    Log In
                  </button>

                  <button onClick={() => navigate("/SignUp")}>
                    Sign Up
                  </button>
                </div>
              )
            }
          </div>
      </div>
    )
}
