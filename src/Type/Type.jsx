import React, { useContext } from 'react'
import "./type.scss"
import { Link, useNavigate, useParams } from 'react-router-dom'
import grammar from "../images/grammar.jpg"
import vocabs from "../images/vocabs.jpg"
import writting from "../images/writting.jpg"
import speaking from "../images/speaking.jpg"
import { BsFillLockFill, BsFillUnlockFill } from "react-icons/bs"
import {MdDoneAll} from "react-icons/md"
import { context } from '../Context'
function Type() {
  let {lan,level} = useParams()
  let { users, signedin} = useContext(context)
  // ====================== Find the user =========================
  let findUser = users?.find(user => user?.email === signedin?.email)
  let navigate = useNavigate()
  let handleVocabs = () => {
    if (findUser?.done[`${lan}-${level}-grammar`] === true) {
      navigate(`/course/${lan}/${level}/vocabs`)
    } else {
      alert("You must first finish Grammar")
    }
  }
  let handleWritting = () => {
    if (findUser?.done[`${lan}-${level}-grammar`] && findUser?.done[`${lan}-${level}-vocabs`] === true) {
      navigate(`/course/${lan}/${level}/writting`)
    } else {
      alert("You must first finish Grammar and Vocabulary")
    }
  }
  let handleSpeaking = () => {
    if (findUser?.done[`${lan}-${level}-grammar`] && findUser?.done[`${lan}-${level}-vocabs`] && findUser?.done[`${lan}-${level}-writting`] === true) {
      navigate(`/course/${lan}/${level}/speaking`)
    } else {
      alert("You must first finish Grammar, Vocabulary and Writting")
    }
  }
  return (
    <div className='german'>
      <div className="german_container">
        {/* ====================== One =================== */}
        <Link to={`/course/${lan}/${level}/grammar`}><img src={grammar} alt="" /><h3>Grammar</h3>
          <span className={findUser?.done[`${lan}-${level}-grammar`] === true ? "clip-green" : "clip-red"}>{findUser?.done[`${lan}-${level}-grammar`] === true ? <MdDoneAll/> : <BsFillUnlockFill/>}</span>
        </Link>
        {/* ====================== Two =================== */}
        <a onClick={handleVocabs}><img src={vocabs} alt="" /><h3>Vocabulary</h3>
          <span className={findUser?.done[`${lan}-${level}-vocabs`] === true ? "clip-green" : "clip-red"}>{findUser?.done[`${lan}-${level}-grammar`] === true ? <BsFillUnlockFill /> : <BsFillLockFill />}
          {findUser?.done[`${lan}-${level}-vocabs`] === true && <MdDoneAll/>}
          </span>
        </a>
        {/* ====================== Three =================== */}
        <a onClick={handleWritting}><img src={writting} alt="" /><h3>Write</h3>
          <span className={findUser?.done[`${lan}-${level}-writting`] === true ? "clip-green" : "clip-red"}  >{findUser?.done[`${lan}-${level}-grammar`] && findUser?.done[`${lan}-${level}-vocabs`] === true ? <BsFillUnlockFill /> : <BsFillLockFill />}
          {findUser?.done[`${lan}-${level}-writting`] === true && <MdDoneAll/>}
          </span>
        </a>
        {/* ====================== Four =================== */}
        <a onClick={handleSpeaking}><img src={speaking} alt="" /><h3>Speak</h3>
        <span className={findUser?.done[`${lan}-${level}-speaking`] === true ? "clip-green" : "clip-red"}>{findUser?.done[`${lan}-${level}-grammar`] && findUser?.done[`${lan}-${level}-vocabs`] && findUser?.done[`${lan}-${level}-writting`] === true ? <BsFillUnlockFill /> : <BsFillLockFill />}
          {findUser?.done[`${lan}-${level}-speaking`] === true && <MdDoneAll/>}
          </span>
        </a>
      </div>
    </div>
  )
}

export default Type