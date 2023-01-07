import React from 'react'
import "./categories.scss"
import { Link, useParams } from 'react-router-dom'
import grammar from "../images/grammar.jpg"
import vocabs from "../images/vocabs.jpg"
import writting from "../images/writting.jpg"
function Categories() {
  let {lan,level} = useParams()

  return (
    <div className='german'>
      <div className="german_container">
    <Link to={`/course/${lan}/${level}/grammar`}><img src={grammar} alt="" /><h3>Grammar</h3></Link>
    <Link to={`/course/${lan}/${level}/vocabs`}><img src={vocabs} alt="" /><h3>Vocabulary</h3></Link>
    <Link to={`/course/${lan}/${level}/writting`}><img src={writting} alt="" /><h3>Write</h3></Link>
      </div>
    </div>
  )
}

export default Categories