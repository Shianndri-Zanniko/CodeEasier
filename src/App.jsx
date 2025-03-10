import { useState } from 'react'
import './App.css'
import { Background } from './Background'
import { SignUp } from './Components/LoginSignup/Signup'
import Login from './Components/LoginSignup/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Background />
      <Login />
    </div>
  )
}

export default App
