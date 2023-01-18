import React, { useContext } from 'react'
import { context } from '../Context'
import "./welcome.scss"
function Welcome() {
    let { isWelcome, setIsWelcome,setLanguageValue } = useContext(context)
    let handleChange = (e) => {
        setLanguageValue(e.target.value)
        setIsWelcome(false)
      
      }
  return (
      <div className='welcome'>
          <div className="welcomeContainer">
              <h3 onClick={()=>setIsWelcome(false)}>X</h3>
              <div className="top">
                  <h1>اهلا وسهلا فيكم</h1>
                  <p>بتمنى يعجبكم الموقع و يفيدكم بقدر الامكان</p>
                  <p>فيكم تختارو لغة الواجهة</p>
                  <label htmlFor="1">
                  العربية
                  <input onClick={handleChange} type="button" value="عربي" id='1' />
                  </label>
              </div>
              <hr />
              <div className="bottom">
                  <h1>Welcome</h1>
                  <p>I hope, that you like the website and find it helpful</p>
                  <p>You can choose the interface language </p>
                  <label htmlFor="2">
                  English
                  <input onClick={handleChange} type="button" value="en" id='2' />
                  </label>
              </div>
          </div>
    </div>
  )
}

export default Welcome