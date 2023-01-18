import React, { useContext } from 'react'
import { context } from '../Context'
import Feedback from '../Feedback/Feedback'
import logo from "../images/an-logo.png"
import "./landingBaner.scss"
function LandingBaner() {
  let { users,signedin, fetchUsers,setUsers,setIsFeedback,isFeedback,isSignedin,languageValue} = useContext(context)
  let findUser = users.find((user) => user.email === signedin.email);

  return (
    <div className='landingBaner'>
      {languageValue === "en" && (
         <div>
         {isSignedin && (
 
       <h4>Welcome { findUser?.username[0].toUpperCase() + findUser?.username.slice(1)}</h4>
         )}
         
               <h1>An-Languages For Courses</h1>
         <p>In this website you will lern German and English lauguages, these made for all levels <br />
         Grammar, Vocabulary, Writting, Speaking, Listening
         </p>
               <h3 onClick={()=>setIsFeedback(true)}>Your Feedback is important</h3>
               <h2>Beginner to Advanced</h2>
           </div>
      )}
       {languageValue === "عربي" && (
         <div>
         {isSignedin && (
 
       <h4>اهلا وسهلا { findUser?.username[0].toUpperCase() + findUser?.username.slice(1)}</h4>
         )}
         
               <h1>An-Languages للكورسات</h1>
         <p>بهاد الموقع فيكم تتعلموا اللغتين الانكليزية و الالمانية <br />
         قواعد, سماعي, محادثة, كلمات
         </p>
               <h3 onClick={()=>setIsFeedback(true)}>فيك تعطيني رأيك بالموقع؟</h3>
               <h2>من مبتدئ الى متقدم</h2>
           </div>
    )}
     
          <a ><img src={logo} alt="" /></a>
    </div>
  )
}

export default LandingBaner