import React, { useState } from 'react'
import "./register.scss"
import logo from "../images/An-languages-register.png"
import user from "../images/user.jpg"

function Register() {
    let [switchRegister,setSwitchRegister] = useState(1)
  return (
      <div className='register'>
          {switchRegister === 1 && (
              <form >
                  <a ><img src={user} alt="" /></a>
               <h1>Sign in</h1>
               <input type="email" name="email" placeholder='Email...' />
                  <input type="password" name="password" placeholder='Password...' />
                  <button>Sign in</button>
                  <h4 onClick={()=>setSwitchRegister(2)}>You don't have an account</h4>
           </form>
          )}
          {switchRegister === 2 && (
              <form >
                  <a ><img src={user} alt="" /></a>
                  
                  <h1>Sign up</h1>
                  <input type="text" name="username" placeholder='Name...' />
               <input type="email" name="email" placeholder='Email...' />
                  <input type="password" name="password" placeholder='Password...' />

                  <button>Sign up</button>
                  <h4 onClick={()=>setSwitchRegister(1)}>You have an account</h4>
           </form>
          )}
          <a className='register-logo'><img src={logo} alt="" /></a>
    </div>
  )
}

export default Register