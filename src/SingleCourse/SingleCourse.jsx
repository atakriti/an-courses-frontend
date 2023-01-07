import React from 'react'
import { useParams } from 'react-router-dom'
import "./singleCourse.scss"
function SingleCourse() {
  let {lan,level,type} = useParams()

  return (
    <div>SingleCourse</div>
  )
}

export default SingleCourse