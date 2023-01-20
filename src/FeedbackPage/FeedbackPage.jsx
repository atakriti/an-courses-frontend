import React, { useContext } from 'react'
import "./feedbackPage.scss"
import { context } from "../Context"
import user from "../images/user.jpg";
function FeedbackPage() {
  let dateObj = new Date();
  let month = dateObj.getUTCMonth() + 1; //months from 1-12
  let day = dateObj.getUTCDate();
  let year = dateObj.getUTCFullYear();
  let FullDate = day + "/" + month + "/" +  year

  // =============================
  let { users, languageValue } = useContext(context)
  let ask = users.some(item => item.comment !== undefined)
  return (
    <div className='feedbackPage'>
      {!ask && (
 <h1>{(languageValue === "en" && "There are no Feedbacks") || (languageValue === "عربي" && "لايوجد آراء")} </h1>
      )}
      {users.map(item => (
        item.comment !== undefined && (
          <div className="box">
          <a><img src={user} alt="" /></a>
          <h1>{item.username}</h1>
          <span>{Array(item.rate).fill().map(() => <h3>⭐️</h3>)}</span>
          <h4>{item.comment}</h4>
          <h5>{FullDate}</h5>
        </div>
        ) 
      ))}
    </div>
  )
}

export default FeedbackPage