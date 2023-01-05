import React from 'react'
import logo from "../images/an-logo.png"
import "./landingBaner.scss"
function LandingBaner() {
  return (
      <div className='landingBaner'>
          <div>
              <h1>An-Languages For Courses</h1>
              <p>In this website you will lern German and English lauguages, these made for all levels</p>
              <h3>Your Feedback is important</h3>
              <h2>Beginner to Advanced</h2>
          </div>
          <a ><img src={logo} alt="" /></a>
    </div>
  )
}

export default LandingBaner