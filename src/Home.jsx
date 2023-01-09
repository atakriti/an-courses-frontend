import React, { useContext } from 'react'
import Baner from './Baner/Baner'
import { context } from './Context'
import Courses from './Courses/Courses'
import DownloadApp from './DownloadApp/DownloadApp'
import Footer from './Footer/Footer'
import Landing1 from './Landing1/Landing1'
import LandingBaner from './LandingBaner/LandingBaner'
import logo from "./images/an-logo.png"
import "./home.scss"
import Feedback from './Feedback/Feedback'
function Home() {
  let {isFetching,isFeedback} = useContext(context)
  return (
    <div>
      {isFetching && (
        <div className="isFetching">
          <a><img src={logo} alt="" /></a>
          <span class="loader"></span>
        </div>
      )}
      
        {isFeedback && (
        <Feedback/>
      )}
          <LandingBaner />
          <Courses/>
          <Baner />
          <Landing1/>
      <DownloadApp />
      <Footer/>
    </div>
  )
}

export default Home