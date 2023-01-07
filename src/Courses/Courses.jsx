import React from 'react'
import { Link } from 'react-router-dom'
import "./courses.scss"
import english from "../images/english.jpg"
import german from "../images/german.jpg"
function Courses() {
  return (
      <div className='courses'>
            <Link to="/course/de" data-title="German"><img src={german} alt="" /></Link>
            <Link to="/course/en" data-title="English"><img src={english} alt="" /></Link>
    </div>
  )
}

export default Courses