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
              </>
          )
        }


        </Route>
        

      </Routes>
    </div>
  );
}

export default App;
