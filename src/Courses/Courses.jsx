import React from 'react'
import "./courses.scss"
import english from "../images/english.jpg"
import german from "../images/german.jpg"
function Courses() {
  return (
      <div className='courses'>
            <a data-title="German"><img src={german} alt="" /></a>
            <a data-title="English"><img src={english} alt="" /></a>
    </div>
  )
}

export default Courses