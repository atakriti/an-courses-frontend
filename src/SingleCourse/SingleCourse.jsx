import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { context } from "../Context";
import data from "../data";
import "./singleCourse.scss";
function SingleCourse() {
  let { lan, level, type } = useParams();
  let { users, signedin } = useContext(context)
  // ====================== Find the user =========================
  let findUser = users.find(user => user.email === signedin.email)
  let [foundUserState, setFoundUserState] = useState(findUser)  
  // ====================== End Find the user =========================
  let filterData = data.filter((item) => item.lan === lan && item.type === type && item.level === level);
  console.log("🚀 ~ file: SingleCourse.jsx:15 ~ SingleCourse ~ filterData", filterData)
  let [counter, setCounter] = useState(0)


  // console.log("testing", { [`${lan}-${level}-${type}`]: true });
  useEffect(() => {
        setFoundUserState(findUser)
    },[users])
  return (
    <div className="singleCourse">
      <div className="singleCourse_container">
        <h1>{`${lan === "de" && "German" || lan === "en" && "English"} – ${level[0].toUpperCase() + level.slice(1)} – ${type[0].toUpperCase() + type.slice(1)}`}</h1>
        <h3>{filterData[counter].question}</h3>
        <ul>
          {filterData[counter]?.options?.map(item => (
            <li>{item.answer}</li>
          ))}
        </ul>
        <button>Next</button>
      </div>
    </div>
  );
}

export default SingleCourse;
