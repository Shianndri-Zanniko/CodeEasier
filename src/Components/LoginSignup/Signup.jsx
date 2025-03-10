import React from 'react'
import './Signup.css'

import eye from '../assets/eye.svg'

export const SignUp = () => {
  return (
    <div className="main-container">
      <div className='container'>
        <div className='header'>
          <div className='text'>Sign Up</div>
        </div>
        <div className='inputs'>
          <div className="input">
            <input type="text" placeholder='Full Name'/>
          </div>
          <div className="input">
            <input type="email" placeholder='Email'/>
          </div>
          <div className="input">
            <input type="password" placeholder='Password'/>
            <img src={eye} alt="" className="eye-icon" />
          </div>
          <div className="input">
            <input type="password" placeholder='Confirm Password'/>
            <img src={eye} alt="" className="eye-icon" place/>
          </div>
        </div>
        <div className="forgot-password"><span>Forgot Password?</span></div>
        <div className="submit-container">
          <div className="submit">Sign Up</div>
        </div>
        <div className="already-have-acc">Already have an account? <span>Sign In</span></div>
      </div>
    </div>

  )
}

export default SignUp