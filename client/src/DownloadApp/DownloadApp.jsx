import React from 'react'
import "./downloadApp.scss"
import {DiAndroid} from "react-icons/di"
function DownloadApp() {
  return (
      <div className='downloadApp'>
          <div className="baner1"></div>
          
              <span>
                  <p>Now you can get this website as an Application on your Android</p>
                  <button><DiAndroid/><h5>Download</h5></button>
              </span>
              
          
      </div>
  )
}

export default DownloadApp