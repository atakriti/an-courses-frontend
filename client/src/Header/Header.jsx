import React from 'react'
import { Link } from 'react-router-dom'
import "./header.scss"
import logo from "../images/header-logo.png"
function Header() {
  return (
      <header>
          <Link className='logo' to="/" ><img src={logo} alt="" /></Link>
          <nav> 
                <Link to="/contact">Contact</Link>
                <Link to="/about">About</Link>
                {/* <Link to="/courses">Courses</Link> */}
                <Link to="/feedback">Feedbacks</Link>
                <Link to="/register">Sign in</Link>
           
          </nav>
    </header>
  )
}

export default Header