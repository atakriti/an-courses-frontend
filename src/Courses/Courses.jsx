import React, { useContext } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import "./courses.scss"
import english from "../images/english.jpg"
import german from "../images/german.jpg"
import { context } from '../Context';

function Courses() {
  let { isSignedin } = useContext(context)
  let navigate = useNavigate()
  let handleGerman = () => {
    if (isSignedin) {
      navigate("/course/de")
    } else {
      alert("First Sign in Please")
    }
  }
  let handleEnglish = () => {
    if (isSignedin) {
      navigate("/course/en")
    } else {
      alert("First Sign in Please")
    }
  }
  return (
      <div className='courses'>
            <a onClick={handleGerman} data-clip={isSignedin ? "German": "Sign in"}  data-title="German"><img src={german} alt="" /> </a>
            <a onClick={handleEnglish} data-clip={isSignedin ? "English": "Sign in"}  data-title="English"><img src={english} alt="" /></a>
    </div>
  )
}

export default Courses