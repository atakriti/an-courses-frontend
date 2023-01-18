import React, { useContext, useEffect, useState } from 'react'
import { context } from '../Context';
import ReactStars from "react-rating-stars-component";

import "./feedback.scss"
import axios from 'axios';
function Feedback() {
    let { users,signedin, fetchUsers,setUsers,setIsFeedback,isSignedin,animateIsSignin,setAnimateIsSignin} = useContext(context)

    let findUser = users.find((user) => user.email === signedin.email);

    let [foundUserState, setFoundUserState] = useState(findUser);
    let [rateValue,setRateValue] = useState(null)
    let [reviewValue, setReviewValue] = useState({
        comment: "",
        rate:rateValue
    })
    let handleSubmit =async (e) => {
      e.preventDefault()
      if (isSignedin) {
        setFoundUserState({...foundUserState,comment:reviewValue.comment,rate:reviewValue.rate})
        await axios.put(`https://an-courses-backend.vercel.app/updateUser/${foundUserState?._id}`, reviewValue)
      alert("Thank you for your Feedback")
      setIsFeedback(false)
    fetchUsers().then((result) => setUsers(result));
    setFoundUserState(findUser);
      } else {
        setAnimateIsSignin(true)
        setTimeout(( )=>setAnimateIsSignin(false),2000 )
      }
        
    }

    useEffect(() => {
        setFoundUserState(findUser);
    }, [users]);
    useEffect(() => {
        setReviewValue({...reviewValue,rate:rateValue})
    },[rateValue])
  return (
    <div className="reviewSubmit">
      <form onSubmit={handleSubmit}>
        <h1>Submit your Feedback</h1>
        <input
          type="text"
          onChange={(e) => setReviewValue({...reviewValue,comment:e.target.value})}
          value={reviewValue?.comment}
          placeholder="Write your comment here..."
          required
        />
        <ReactStars
          count={5}
          onChange={setRateValue}
          size={30}
          activeColor="#ffd700"
          classNames={"stars"}
        />
        <button>{ isSignedin ? "Submit" : "You should sign in"}</button>
        <h4 onClick={()=>setIsFeedback(false)}>Later</h4>
      </form>
    </div>
  )
}

export default Feedback