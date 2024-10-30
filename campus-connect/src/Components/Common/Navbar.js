import React from 'react'
import SideBar from './SideBar'

export default function Navbar() {
    return (
      <div className='fixed z-20 w-full bg-yellow-200 h-[3.5rem]'>

          <div className='md:hidden w-full'>
             <SideBar/>
          </div>
          NAVBAR
          <div className='lg:block hidden'>

          </div>
      </div>
    )
}
