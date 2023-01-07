import React, { useContext } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import "./header.scss"
import logo from "../images/header-logo.png"
import user from "../images/user.jpg";

import { context } from '../Context'
function Header() {
  // let navigate = useNavigate()
  let {  setSignedin, isSignedin, setIsSignedin } = useContext(context)
  let handleSignout = () => {
    setIsSignedin(false)
    setSignedin({
      username: "",
      password:""
    })
  }
  return (
      <header>
          <Link className='logo' to="/" ><img src={logo} alt="" /></Link>
          <nav> 
                <Link to="/contact">Contact</Link>
                <Link to="/about">About</Link>
                {/* <Link to="/courses">Courses</Link> */}
        <Link to="/feedback">Feedbacks</Link>
        {isSignedin ? (
                <Link className='signout' onClick={handleSignout} to="/"><span>Sign out</span><img src={user} alt="" /></Link>

        ): (
            
                <Link to="/register">Sign in</Link>
        )}
           
          </nav>
    </header>
  )
}

export default Header