import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { SignIn } from './Modals/Sign-in'
import { Register } from './Modals/Register'
import { Navbar } from './Components/Navbar'
import { Footer } from './Components/Footer'
import { Dashboard } from './Components/Dashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    // this is not of use because I'm using tanstack router and main.jsx directly look into the __root for routes.
    <div>
    <Navbar/>
    <Dashboard/>
    <Footer/>
    </div>
  ) 
}

export default App
