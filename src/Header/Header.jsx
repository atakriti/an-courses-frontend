import React, { useContext } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import "./header.scss"
import logo from "../images/header-logo.png"
import user from "../images/user.jpg";
import logo2 from "../images/an-logo.png"

import { context } from '../Context'
function Header() {
  // let navigate = useNavigate()
  let { users,setSignedin, isSignedin, setIsSignedin,signedin,setIsFetching,isFetching } = useContext(context)
  let handleSignout = () => {
    setIsSignedin(false)
    setIsFetching(true)
    setTimeout(()=>setIsFetching(false),2000)
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
        <Link to="/feedbackPage">Feedbacks</Link>
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