import {Routes,Route} from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Navbar from './Components/Common/Navbar'
import VerifyOtp from './Pages/VerifyOtp'
import UpdatePassword from './Pages/UpdatePassword'
import ResetPassword from './Pages/ResetPassword'
import Universal from './Universal'
import { useSelector } from 'react-redux'
import ProtectedRoute from './Components/Common/ProtectedRoute'
import LaundryHome from './Pages/Laundry/LaundryHome'
import Create_Order from './Pages/Laundry/CreateOrder/CreateOrder'
import OrderStatus from './Pages/Laundry/UnderWashing/UnderWashing'
import ReadyToCollect from './Pages/Laundry/ReadyToCollect/ReadyToCollect'
import CompletedOrders from './Pages/Laundry/CompletedOrders/CompletedOrders'
import StudentActiveOrders from './Pages/Laundry/StudentActiveOrders/StudentActiveOrders'
import StudentCompletedOrders from './Pages/Laundry/StudentCompletedOrders/StudentCompletedOrders'
import ViewDetails from './Pages/Laundry/ViewDetails'
import CycleBooking from './Pages/Cycles/CycleBooking/CycleBooking'
import CyclesHome from './Pages/Cycles/CyclesHome'
import ManageCycle from './Pages/Cycles/ManageCycles/ManageCycle'
import ManageBooking from './Pages/Cycles/ManageBooking/ManageBooking'
import MyBookings from './Pages/Cycles/MyBookings'
import CanteenHome from './Pages/Canteen/CanteenHome'
import CreateItem from './Pages/Canteen/CreateItem'
import ManageItems from './Pages/Canteen/ManageItem/ManageItems'
import Menu from './Pages/Canteen/Menu/Menu'
import Cart from './Pages/Canteen/Cart'

function App() {
  const {user_details} = useSelector((state) => state.profile)
  return (
    <div className="App">
    <Navbar/> 
    <div className='h-[3.5rem] z-50 w-full'></div>
      <Routes>
        <Route path = '/' element = {<Home/>}/>
        <Route path = '/Signup' element = {<Signup/>}/>
        <Route path = '/Login' element = {<Login/>}/>
        <Route path = '/Verify_Otp' element = {<VerifyOtp/>}/>
        <Route path = '/Update_Password/:id' element = {<UpdatePassword/>}/>
        <Route path = '/Reset_Password' element = {<ResetPassword/>}/>
        <Route path = '*' element = {<Universal/>}/>
        <Route element = {
            <ProtectedRoute>
                <LaundryHome/>
            </ProtectedRoute>
        }>
        {
          user_details?.account_type === "Laundry" && (
              <>
                  <Route path = '/Laundry/Create_Order' element=<Create_Order/>/>
                  <Route path = '/Laundry/Under_Washing' element=<OrderStatus/>/>
                  <Route path = '/Laundry/Ready_to_Collect' element=<ReadyToCollect/>/>
                  <Route path = '/Laundry/Completed_Orders' element=<CompletedOrders/>/>
                  
              </>
          )
        }
        {
          user_details?.account_type === "Student" && (
              <>
              <Route path = '/Laundry/Student_Active_Orders' element=<StudentActiveOrders/>/>
              <Route path = '/Laundry/Student_Completed_Orders' element=<StudentCompletedOrders/>/>
              
              </>
          )
        }
          <Route path='/Laundry/View_Details/:id' element=<ViewDetails/>/>
        
        </Route>
        <Route element = {
            <ProtectedRoute>
                <CyclesHome/>
            </ProtectedRoute>
        }>
        {
          user_details?.account_type === "Student" && (
              <>
                <Route path='/Cycle/Cycle_Booking' element=<CycleBooking/>/>
                <Route path='/Cycle/My_Booking' element=<MyBookings/>/>
              </>
          )
        }
        {
          user_details?.account_type === "Cycle_admin" && (
            <>
              <Route path='/Cycle/Manage_Cycle' element=<ManageCycle/>/>
              <Route path='/Cycle/Manage_Booking' element=<ManageBooking/>/>
              
            </>
          ) 
        }
        </Route>
        <Route element={
            <ProtectedRoute>
                <CanteenHome/>
            </ProtectedRoute>
        }>
          {
              user_details?.account_type === "Canteen_admin" && (
                <>
                  <Route path='/Canteen/Create_Item' element=<CreateItem/>/>
                  <Route path='/Canteen/Manage_Item' element=<ManageItems/>/>
                  
                </>
              )
            }
            {
          user_details?.account_type === "Student" && (
              <>
                <Route path='/Canteen/Menu' element=<Menu/>/>
                <Route path='/Canteen/Cart' element=<Cart/>/>
              </>
          )
        }

        </Route>
      </Routes>
    </div>
  );
}

export default App;
