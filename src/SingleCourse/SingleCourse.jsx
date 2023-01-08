import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { context } from "../Context";
import data from "../data";
import { BsTranslate } from "react-icons/bs"
import { GiSpeaker } from "react-icons/gi"
import {MdKeyboardVoice} from "react-icons/md"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import "./singleCourse.scss";
function SingleCourse() {

  let { lan, level, type } = useParams();
  let navigate = useNavigate()
  let { users, signedin } = useContext(context)
  // ====================== Find the user =========================
  let findUser = users.find(user => user.email === signedin.email)
  let [foundUserState, setFoundUserState] = useState(findUser)  
  // ====================== End Find the user =========================
  let filterData = data.filter((item) => item.lan === lan && item.type === type && item.level === level);
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
  let handleNext = async (e) => {
    e.preventDefault()
    if (counter === filterData?.length - 1 && clickedSentence?.isCorrect || counter === filterData?.length - 1 && filterData[counter].answer === inputValue ) {
      setFoundUserState({...foundUserState,done:{...foundUserState?.done,[`${lan}-${level}-${type}`]: true}})
      await axios.put(`http://localhost:4000/updateUser/${foundUserState?._id}`,{...foundUserState,done:{...foundUserState?.done,[`${lan}-${level}-${type}`]: true}})
      navigate(`/course/${lan}/${level}`)
    }else if (clickedSentence?.isCorrect === true) {
      setCounter(counter + 1)
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
    text = text.replace(/_/g, '')
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
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
    console.log("🚀 ~ file: SingleCourse.jsx:99 ~ SingleCourse ~ listening", listening)
  inputValue = transcript
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
      <div className="singleCourse_container">
        <h1>{`${lan === "de" && "German" || lan === "en" && "English"} – ${level[0].toUpperCase() + level.slice(1)} – ${type[0].toUpperCase() + type.slice(1)}`}</h1>
        <h4>{ `${counter + 1} out of ${filterData.length}`}</h4>
        <h3>{filterData[counter]?.question}</h3>
        <div className="btns">
          <BsTranslate onClick={()=>setTranslate(!translate)} />
          <GiSpeaker onClick={handleSpeech} />
          {type === "writting" && (
            <MdKeyboardVoice onClick={handleRecord} className={listening && "mic"} />
            )}
        </div>
        {type === "writting" && (
            <h6>{ listening ? "Mic is on" : "Mic is off"}</h6>
            )}
        <h5>{translate && filterData[counter].translate}</h5>
       
        <ul>
          {filterData[counter]?.options?.map((item,i) => (
            <li className={i === clickedIndex && colorCorrect && "green" || i === clickedIndex && colorFalse && "red" } onClick={()=>handleClickSentence(i,item)}>{item.answer}</li>
          ))}
        </ul>
        {type === "writting" && (
          <form action="">
            <input onChange={(e)=>setInputValue(e.target.value)} value={inputValue} type="text" name="writting" id="" placeholder="Correct the Sentence" />
            {writtingFalse && <h5>The answer is not correct <br /> It can be the uppercase, space after the coma or question mark</h5>}
            <button onClick={handleNext}>Next</button>
          </form>
        )}
        {clickedSentence?.isCorrect === true && (
          <button onClick={handleNext}>Next</button>
        )}
      </div>
    </div>
  );
}

export default SingleCourse;
