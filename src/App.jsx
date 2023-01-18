import React, { useContext } from "react";
import {Routes,Route} from "react-router-dom"
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Home from "./Home";
import Register from "./Register/Register";
import Type from "./Type/Type";
import "./style.scss"
import SingleCourse from "./SingleCourse/SingleCourse";
import Levels from "./Levels/Levels";
import About from "./About/About";
import Contact from "./Contact/Contact";
import FeedbackPage from "./FeedbackPage/FeedbackPage";
import { context } from "./Context";
import logo from "./images/an-logo.png"
import Feedback from "./Feedback/Feedback";
import {FaTimes} from "react-icons/fa"

function App() {
  let { users, animateDownload,signedin,isFetching,isFeedback,animateIsSignin } = useContext(context)
  // ====================== Find the user =========================
  let findUser = users.find(user => user.email === signedin.email)
  return (
    <div className="App">

      {animateIsSignin && (
        <div className="animateIsSingin">
          <div>
            <h3>You are not signed in </h3>
            <FaTimes/>
          </div>
        </div>
)}



 {animateDownload && (
        <div className="download">
        <div className='download_container'>
            <span class="loading">Loading</span>
            <h3>{findUser?.username} your Certificate is in progress...</h3>
            <span class="loader1"></span>
        </div>
        </div>
      )}

{isFetching && (
        <div className="isFetching">
          <a><img src={logo} alt="" /></a>
          <span class="loader"></span>
        </div>
      )}
         {isFeedback && (
        <Feedback/>
      )}

      <Header/>
      <Routes>
        <Route path="/register" element={ <Register/>}/>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/feedbackPage" element={<FeedbackPage />} />
        <Route path="/course/:lan" element={<Levels />} />
        <Route path="/course/:lan/:level" element={<Type />} />
        <Route path="/course/:lan/:level/:type" element={<SingleCourse />} />
      </Routes>
      
    </div>
  );
}

export default App;
