import {Routes,Route} from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Signup from './Pages/Signup'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path = '/' element = {<Home/>}/>
        <Route path = '/Signup' elemnt = {<Signup/>}/>
        <Route path = '/Login' elemnt = {<Login/>}/>
        
      </Routes>
    </div>
  );
}

export default App;
