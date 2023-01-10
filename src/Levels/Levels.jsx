import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import "./levels.scss"
import { BsFillLockFill, BsFillUnlockFill } from "react-icons/bs"
import {MdDoneAll} from "react-icons/md"
import a1 from "../images/a1.jpg"
import a2 from "../images/a2.jpg"
import b1 from "../images/b1.jpg"
import { context } from '../Context'
function Levels() {
  let { lan } = useParams()
  let { users, signedin} = useContext(context)
  // ====================== Find the user =========================
  let findUser = users?.find(user => user?.email === signedin?.email)
  let log1 = findUser?.done["de-a1-vocabs"] === undefined && "not"
  // data-clip={findUser?.done['de-a1-speaking'] === true && findUser?.done['de-a1-grammar'] === true && findUser?.done['de-a1-writting'] === true && findUser?.done['de-a1-vocabs'] === true ? <MdDoneAll/> : <BsFillUnlockFill/> } to={`/course/${lan}/a1`}
  console.log("🚀 ~ file: Levels.jsx:17 ~ Levels ~ log", log1)
  return (
      <div className='levels'>
      <div className="levels_container">
        {/* ================================= ONE ===================== */}
        <Link to={`/course/${lan}/a1`}><img src={a1} alt="" /><h3>A1</h3>
        <span>{findUser?.done['de-a1-speaking'] === true && findUser?.done['de-a1-grammar'] === true && findUser?.done['de-a1-writting'] === true && findUser?.done['de-a1-vocabs'] === true ? <MdDoneAll/> : <BsFillUnlockFill/> }</span>
        </Link>
        {/* =================================== TWO ======================== */}
        <Link to={`/course/${lan}/a2`}><img src={a2} alt="" /><h3>A2</h3>
          <span>
            {/* ==================== */}
            {findUser?.done['de-a1-speaking'] === true && findUser?.done['de-a1-grammar'] === true && findUser?.done['de-a1-writting'] === true && findUser?.done['de-a1-vocabs'] === true ? <BsFillUnlockFill /> : <BsFillLockFill />}
            
          {/* =================== */}
          {findUser?.done['de-a2-speaking'] === true && findUser?.done['de-a2-grammar'] === true && findUser?.done['de-a2-writting'] === true && findUser?.done['de-a2-vocabs'] === true && <MdDoneAll/>}
          </span>
        </Link>
        {/* =================================== THREE ======================== */}

        <Link to={`/course/${lan}/b1`}><img src={b1} alt="" /><h3>B1</h3>
          <span>
            {/* ======================= */}
            {findUser?.done['de-a2-speaking'] === true && findUser?.done['de-a2-grammar'] === true && findUser?.done['de-a2-writting'] === true && findUser?.done['de-a2-vocabs'] === true ? <BsFillUnlockFill /> : <BsFillLockFill />}
            {/* ==================== */}
            {findUser?.done['de-b1-speaking'] === true && findUser?.done['de-b1-grammar'] === true && findUser?.done['de-b1-writting'] === true && findUser?.done['de-b1-vocabs'] === true && <MdDoneAll/>}
          </span>
        </Link>
          </div>
    </div>
  )
}

export default Levels