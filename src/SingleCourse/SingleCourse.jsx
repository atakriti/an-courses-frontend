import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { context } from "../Context";
import data from "../data";
import { BsTranslate } from "react-icons/bs"
import { GiSpeaker } from "react-icons/gi"
import { MdKeyboardVoice } from "react-icons/md"
import logo from "../images/an-logo.png"
import jsPDF from "jspdf";
import certificate from "../images/an-logo.png";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import "./singleCourse.scss";
function SingleCourse() {
  let { users, signedin,setIsFetching,isFetching,fetchUsers,setUsers,setAnimateDownload } = useContext(context)
  // ====================== Find the user =========================
  let findUser = users.find(user => user.email === signedin.email)
  let [foundUserState, setFoundUserState] = useState(findUser)
  const pdf = new jsPDF();
  let text = `                     Thank you for visiting my Website \n
        Congratulation (${findUser?.username}) you completed the Course \n
           This Certificate is for fun, it is Fake and not Real \n
               only to remember that you could make it \n
                               What you achieved : \n
           A1 (Grammar, Vocabulary, Writting, Speaking) \n
           A2 (Grammar, Vocabulary, Writting, Speaking) \n
           B1 (Grammar, Vocabulary, Writting, Speaking) \n
           \n
           Best regards \n
           Anwar Takriti
      `;

  var imgWidth = 70;
  var imgHeight = 70;
  var x = (pdf.internal.pageSize.width - imgWidth) / 2;
  var y = 0.05 * pdf.internal.pageSize.height;
  pdf.addImage(certificate, "png", x, y, imgWidth, imgHeight);
  var textWidth = pdf.internal.pageSize.width * 0.8;

  // Determine the center position of the text
  var textX = (pdf.internal.pageSize.width - textWidth + 20) / 2;

  // Split the text into lines
  var textLines = pdf.splitTextToSize(text, textWidth);

  // Calculate the center position of the text
  var textY = y + imgHeight + 10;

  // Add the text to the PDF
  pdf.text(textX, textY, textLines);
  
  // ===========================================================================
  
  
  
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  // ====================================
  let { lan, level, type } = useParams();
  let navigate = useNavigate()
    
  // ====================== End Find the user =========================
  let filterData = data.filter((item) => item.lan === lan && item.type === type && item.level === level);
  let filterB1 = data.filter(item => item.type === "speaking" && item.level === "b1")
  console.log("🚀 ~ file: SingleCourse.jsx:69 ~ SingleCourse ~ filterB1", filterB1)
  let [counter, setCounter] = useState(0)
  let [clickedSentence, setClickedSentence] = useState()
  let [colorCorrect, setColorCorrect] = useState(false)
  let [colorFalse, setColorFalse] = useState(false)
  let [clickedIndex, setClickedIndex] = useState()
  let [inputValue, setInputValue] = useState("")
  let [writtingFalse, setWrittingFalse] = useState(false)
  let [translate, setTranslate] = useState(false)
  let [isSpeaking,setIsSpeaking] = useState(false)
  // console.log("🚀 ~ file: SingleCourse.jsx:16 ~ SingleCourse ~ clickedSentence", clickedSentence)
  // ==================================================================================================================
  let handleClickSentence = (i,item) => {
    setClickedSentence(item) 
    setClickedIndex(i)
    if (item.isCorrect === true) {
      setColorCorrect(true)
      setColorFalse(false)
    } else {
      setColorFalse(true)

      setColorCorrect(false)
    }
  }
  // =================================================================================================================
  let speechText = filterData[counter]?.question.toLowerCase() //! Here replacing the comma with empty
  speechText = speechText?.replace(/,/g, '')
  console.log("🚀 ~ file: SingleCourse.jsx:54 ~ SingleCourse ~ speechText", speechText)
  let handleNext = async (e) => {
    e.preventDefault()
    if (counter === filterData?.length - 1 && clickedSentence?.isCorrect || counter === filterData?.length - 1 && filterData[counter].answer === inputValue  ) {
      setFoundUserState({...foundUserState,done:{...foundUserState?.done,[`${lan}-${level}-${type}`]: true}})
      await axios.put(`http://localhost:4000/updateUser/${foundUserState?._id}`,{...foundUserState,done:{...foundUserState?.done,[`${lan}-${level}-${type}`]: true}})
      setIsFetching(true)
      fetchUsers().then(result => setUsers(result))
      setTimeout(()=>setIsFetching(false),2000)
      setTimeout(() => navigate(`/course/${lan}/${level}`), 2000)
//! ============================ Here when the b1 is done it must give him a certificate (I have to check it if it works)
      if (counter === filterB1.length - 1 && level === "b1") {
        setTimeout(() => setAnimateDownload(true),2000)
        
        setTimeout(() => setAnimateDownload(false), 6000)
        setTimeout(() => pdf.save("certificate.pdf"), 6000)
      }
      
    }else if (clickedSentence?.isCorrect === true || speechText === transcript.toLowerCase() ) {
      setCounter(counter + 1)
      resetTranscript()
      setTranslate(false)
      setClickedSentence()
      setColorFalse(false)
      setColorCorrect(false)
    } else if (filterData[counter].answer === inputValue) {
      setCounter(counter + 1)
      setInputValue("")
      setWrittingFalse(false)
    } else if (filterData[counter].answer !== inputValue) {
      setWrittingFalse(true)
    } 
  }
  // ================================================================================================================
  let handleSpeech = () => {
    let text = filterData[counter]?.question
    text = text?.replace(/_/g, '')
    if (lan === "de") {
      setIsSpeaking(true)
      let speech = new SpeechSynthesisUtterance(text)
      speech.addEventListener('end', () => {
        setIsSpeaking(false)
      })
     speech.lang = 'de-DE'
      speech.pitch = 1
      window.speechSynthesis.speak(speech)
      
    } else {
      setIsSpeaking(true)
      let speech = new SpeechSynthesisUtterance(text)
      speech.addEventListener('end', () => {
        setIsSpeaking(false)
      })
      speech.lang = 'en-US'
      speech.pitch = 1
      window.speechSynthesis.speak(speech)

    }
    
  }
  // ====================================================================================================

  // setInputValue(transcript)
  // inputValue = transcript
  
  let handleRecord = () => {
    if (lan === "de") {

      SpeechRecognition.startListening({ language: 'de-DE' })
    } else {
      SpeechRecognition.startListening({ language: 'en-US' })
      
    }
     
  }
  // console.log("testing", { [`${lan}-${level}-${type}`]: true });
  useEffect(() => {
        setFoundUserState(findUser)
    },[users])
  return (
    <div className="singleCourse">



      {isSpeaking && (
        <div className="speaking">
        <span class="loader"></span>
        </div>
      )}
      {listening && (
          <div className="speaking">
          <span class="loader"></span>
          </div>
      )}
       {isFetching && (
        <div className="isFetching">
          <a><img src={logo} alt="" /></a>
          <span class="loader"></span>
        </div>
      )}
      <div className="singleCourse_container">
        <h1>{`${lan === "de" && "German" || lan === "en" && "English"} – ${level[0].toUpperCase() + level.slice(1)} – ${type[0].toUpperCase() + type.slice(1)}`}</h1>
        <h4>{ `${counter + 1} out of ${filterData?.length}`}</h4>
        <h3>{filterData[counter]?.question}</h3>
        <div className="btns">
          <BsTranslate onClick={()=>setTranslate(!translate)} />
          <GiSpeaker onClick={handleSpeech} />
          
        </div>
        {type === "speaking" && (
            <div onClick={handleRecord} className={listening ? "mic_btn_active" : "mic_btn"}>
            <MdKeyboardVoice  />
            </div>
           )}
       
        {type === "speaking" && (
            <h6>{ listening ? "Mic is on" : "Mic is off"}</h6>
            )}
        <h5>{translate && filterData[counter]?.translate}</h5>
       
        <ul>
          {filterData[counter]?.options?.map((item,i) => (
            <li className={i === clickedIndex && colorCorrect && "green" || i === clickedIndex && colorFalse && "red" } onClick={()=>handleClickSentence(i,item)}>{item.answer}</li>
          ))}
        </ul>
        {type === "writting" && (
          <form action="">
            <input onChange={(e)=>setInputValue(e.target.value)} value={inputValue } type="text" name="writting" id="" placeholder="Write the Sentence here" />
            {writtingFalse && <h5>The answer is not correct <br /> It can be the uppercase, space after the coma or question mark</h5>}
            <button onClick={handleNext}>Next</button>
          </form>
        )}
        {type === "speaking" && (
          <p>{transcript}</p>
        )}
        {speechText === transcript.toLowerCase() && (
          <button onClick={handleNext}>Next</button>
        )}
        {clickedSentence?.isCorrect === true  && (
          <button onClick={handleNext}>Next</button>
        )}
      </div>
    </div>
  );
}

export default SingleCourse;
