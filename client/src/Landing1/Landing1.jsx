import React from 'react'
import "./landing1.scss"
import logo from "../images/landing1.jpg"
function Landing1() {
  return (
      <div className='landing1'>
          <div>
              <h1>Wow Certificate ?!</h1>
              <p>Yes after getting done your full course either English or German, <br /> You will get a Certificate but it is Fake only just for fun, that you achived it </p>
              <h2>When you achieve the course the Download button will appear automatically</h2>
          </div>
          <a><img src={logo} alt="" /></a>
    </div>
  )
}

export default Landing1