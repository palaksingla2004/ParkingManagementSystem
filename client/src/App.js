import React from 'react'
import Navbar from './Components/Navbar';
import Signup from './Components/SignUp';
import Login from './Components/Login';
import ParkingSpace from './Components/ParkingSpace';
import Wallet from './Components/Wallet';


const App = () => {
  return (
    <div>
      <Navbar/>
      <Signup/>
      <Login />
      <ParkingSpace />
      <Wallet/>
      
    </div>
  )
}

export default App