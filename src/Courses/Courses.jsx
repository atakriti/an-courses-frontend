import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import "./courses.scss"
import english from "../images/english.jpg"
import german from "../images/german.jpg"
import { context } from '../Context';

function Courses() {
  let {isSignedin} = useContext(context)
  return (
      <div className='courses'>
            <Link data-clip={isSignedin ? "German": "Sign in"} to="/course/de" data-title="German"><img src={german} alt="" /></Link>
            <Link data-clip={isSignedin ? "English": "Sign in"} to="/course/en" data-title="English"><img src={english} alt="" /></Link>
    </div>
  )
}

export default Courses