import React from 'react'
import Baner from './Baner/Baner'
import Courses from './Courses/Courses'
import DownloadApp from './DownloadApp/DownloadApp'
import Footer from './Footer/Footer'
import Landing1 from './Landing1/Landing1'
import LandingBaner from './LandingBaner/LandingBaner'
function Home() {
  return (
    <div>
     
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