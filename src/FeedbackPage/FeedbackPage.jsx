import React, { useContext } from 'react'
import "./feedbackPage.scss"
import { context } from "../Context"
import user from "../images/user.jpg";
function FeedbackPage() {
  let {users,languageValue} = useContext(context)
  return (
    <div className='feedbackPage'>

      {users.map(item => (
        item.comment !== undefined ? (
          <div className="box">
          <a><img src={user} alt="" /></a>
          <h1>{item.username}</h1>
          <span>{Array(item.rate).fill().map(() => <h3>⭐️</h3>)}</span>
          <h4>{item.comment}</h4>
          <h5>{ item.timeStamp}</h5>
        </div>
        ) : <h1>{(languageValue === "en" && "There are no Feedbacks") || (languageValue === "عربي" && "لايوجد آراء")} </h1>
      ))}
    </div>
  )
}

export default FeedbackPage