import React from 'react'
import Navbar from './Components/Navbar';
import Signup from './Components/SignUp';
import Login from './Components/Login';
import Footer from './Components/Footer';
import ParkingSpace from './Components/ParkingSpace';
import Wallet from './Components/Wallet';
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {
  return (
    <div>
      <Navbar/>
      <Signup/>
      <Login />
      <ParkingSpace />
      <Wallet/>
      <Footer/>
      
    </div>
  )
}

export default App
