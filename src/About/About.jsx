import React, { useContext } from 'react'
import "./about.scss"
import anwar from "../images/anwar.jpeg"
import { context } from '../Context'
function About() {
  let {languageValue, setLanguageValue} = useContext(context)
  return (
      <div className='about'>
      <div className="about_container">
        {languageValue === "عربي" && (
          <>
           <h1>بسم اللَّه الرحمن الرحيم </h1>
  <p>تم بفضل اللَّه انشاء موقع تعليم اللغة الالمانية و الانكليزية مع امكانية سماع السؤال للمبتدئين و الترجمة للغة العربية</p>
  <p>هذا الموقع يتضمن ثلاثة مستويات مع امكانية حفظ المستوى في حساب المستخدم بس لازم تساوي حساب</p>
  <p>فيكم تعطوا رأيكم بالموقع عن طريق كبس زر يلي بالصفحة الرئيسية</p>
            <p>بتمنى التوفيق للجميع</p>
            <a href='https://anwar-dev.com/' target={'_blank'}><img src={anwar} alt="" /></a>
        
        <h2>أنور تكريتي</h2>
          </>
        )}
        {languageValue === "en" && (
          <>
            <h1>About </h1>
              <p>Hello everyone, This website has Three Levels, and it can save the level in your account, so you need first to Sign up</p>
              <p>You can give me your Feedback by clicking on "Your Feedback is important" in the Homepage</p>
            <p>Good luck for everyone</p>
            <a href='https://anwar-dev.com/' target={'_blank'}><img src={anwar} alt="" /></a>
        
        <h2>Anwar Takriti</h2>
          </>
        )}
            
        
       
          </div>
    </div>
  )
}

export default About