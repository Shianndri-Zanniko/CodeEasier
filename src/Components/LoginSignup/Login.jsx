import React from 'react'
import './Login.css'

import eye from '../assets/eye.svg'

export const Login = () => {
  return (
    <div className="main-container">
      <div className='container'>
        <div className='header'>
          <div className='text'>Sign In</div>
        </div>
        <div className='inputs'>
          <div className="input">
            <input type="email" placeholder='Email'/>
          </div>
          <div className="input">
            <input type="password" placeholder='Password'/>
            <img src={eye} alt="" className="eye-icon" />
          </div>
        </div>
        <div className="forgot-password"><span>Forgot Password?</span></div>
        <div className="submit-container">
          <div className="submit">Sign Up</div>
        </div>
        <div className="already-have-acc">Don't have an account? <span>Sign Up</span></div>
      </div>
    </div>

  )
}

export default Login