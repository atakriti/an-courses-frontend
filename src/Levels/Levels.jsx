import React from 'react'
import { Link, useParams } from 'react-router-dom'
import "./levels.scss"
import a1 from "../images/a1.jpg"
import a2 from "../images/a2.jpg"
import b1 from "../images/b1.jpg"
function Levels() {
    let {lan} = useParams()
  return (
      <div className='levels'>
          <div className="levels_container">
          <Link to={`/course/${lan}/a1`}><img src={a1} alt="" /><h3>A1</h3></Link>
    <Link to={`/course/${lan}/a2`}><img src={a2} alt="" /><h3>A2</h3></Link>
    <Link to={`/course/${lan}/b1`}><img src={b1} alt="" /><h3>B1</h3></Link>
          </div>
    </div>
  )
}

export default Levels