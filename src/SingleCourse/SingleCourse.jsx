import axios from "axios";
import React, { useContext, useEffect, useState,useCallback,useMemo,useRef } from "react";
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
import debounce from "lodash.debounce"
import "./singleCourse.scss";
function SingleCourse() {
  let dateObj = new Date();
  let month = dateObj.getUTCMonth() + 1; //months from 1-12
  let day = dateObj.getUTCDate();
  let year = dateObj.getUTCFullYear();
    let FullDate =  day + "/" + month + "/" +  year
    // ===========================================================
  let { users, signedin,setIsFetching,isFetching,fetchUsers,setUsers,setAnimateDownload,languageValue } = useContext(context)
  // ====================== Find the user =========================
  let findUser = users.find(user => user.email === signedin.email)
  let [foundUserState, setFoundUserState] = useState(findUser)
  let getKeysCertificate =  findUser  ? Object.keys(findUser?.done).filter(item => findUser?.done[item] === true) : [];
  let mappingKeysDE = getKeysCertificate?.map(item => item?.includes("de") && `\n ${item}`).filter(item => item !== false);
  let mappingKeysEN = getKeysCertificate?.map(item => item?.includes("en") && `\n ${item}`).filter(item => item !== false)
  const pdf = new jsPDF();
  pdf.setFont("helvetica", "bold");
pdf.setFontSize(24);
  pdf.text(50, 90, `${findUser?.username[0]?.toUpperCase() + findUser?.username?.slice(1)},`);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(16);
  pdf.text(50, 100, `Thank you for visiting my Website.`);
pdf.text(50, 110, `Congratulations, you completed the course.`);
pdf.text(50, 120, `This Certificate is for fun, it is fake and not real.`);
pdf.text(50, 130, `Only to remember that you could make it.`);
pdf.text(50, 140, `What you achieved :`);
 
pdf.text(50, 250, `Best regards,`);
pdf.text(50, 257, `Anwar Takriti`);
pdf.text(50, 267, `${FullDate}`);

  var imgWidth = 70;
  var imgHeight = 70;
  var x = (pdf.internal.pageSize.width - imgWidth) / 2;
  var y = 0.05 * pdf.internal.pageSize.height;
  pdf.addImage(certificate, "png", x, y, imgWidth, imgHeight);
  
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
  let [isShowResult,setIsShowResult] = useState(0)
    
  // ====================== End Find the user =========================
  let filterData = data.filter((item) => item.lan === lan && item.type === type && item.level === level);
  let filterB1 = data.filter(item => item.type === "speaking" && item.level === "b1")
  let [counter, setCounter] = useState(0)
  let [clickedSentence, setClickedSentence] = useState()
  let [colorCorrect, setColorCorrect] = useState(false)
  let [colorFalse, setColorFalse] = useState(false)
  let [clickedIndex, setClickedIndex] = useState()
  let [inputValue, setInputValue] = useState("")
  let [writtingFalse, setWrittingFalse] = useState(false)
  let [translate, setTranslate] = useState(false)
  let [isSpeaking, setIsSpeaking] = useState(false)
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
  let handleNext = async (e) => {
    e.preventDefault()
    if ((counter === filterData?.length - 1 && clickedSentence?.isCorrect) ||( counter === filterData?.length - 1 && filterData[counter].answer === inputValue.trim()  )) {
      setFoundUserState({...foundUserState,done:{...foundUserState?.done,[`${lan}-${level}-${type}`]: true}})
      setIsFetching(true)
      await axios.put(`https://an-courses-backend.vercel.app/updateUser/${foundUserState?._id}`,{...foundUserState,done:{...foundUserState?.done,[`${lan}-${level}-${type}`]: true}})
      setFoundUserState(findUser)
      fetchUsers().then(result => setUsers(result)).then(() => setIsFetching(false))
      // setTimeout(()=>setIsFetching(false),2000)
       navigate(`/course/${lan}/${level}`)
//! ============================ Here when the b1 is done it must give him a certificate
      if (counter === filterData?.length - 1 && speechText === transcript.toLowerCase() && lan === "de" && level === "b1") {
        if (foundUserState.done["en-b1-speaking"] === true) {
          pdf.setFont("helvetica", "normal");
          pdf.setFontSize(16);
          pdf.text(110, 150,"English:")
          pdf.text(110, 155,  mappingKeysEN.join("")) 
        }
        setTimeout(() => setAnimateDownload(true), 1000)
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(16);
        pdf.text(50, 150,"German:") 
        pdf.text(50, 155,  mappingKeysDE.join("")) 
        setTimeout(() => setAnimateDownload(false), 5000)
        setTimeout(() => pdf.save("certificate.pdf"), 5000)
        if (foundUserState.done["en-b1-speaking"] === true) {
          pdf.setFont("helvetica", "normal");
          pdf.setFontSize(16);
          pdf.text(110, 150,"English:")
          pdf.text(110, 155,  mappingKeysEN.join("")) 
        }
      }else if (counter === filterData?.length - 1 && speechText === transcript.toLowerCase() && lan === "en" && level === "b1") {
        if (foundUserState.done["de-b1-speaking"] === true) {
          pdf.setFont("helvetica", "normal");
          pdf.setFontSize(16);
          pdf.text(50, 150,"German:") 
        pdf.text(50, 155,  mappingKeysDE.join("")) 
        }
        setTimeout(() => setAnimateDownload(true), 1000)
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(16);
        pdf.text(110, 150,"English:")
        pdf.text(110, 155,  mappingKeysEN.join("")) 
        setTimeout(() => setAnimateDownload(false), 5000)
        setTimeout(() => pdf.save("certificate.pdf"), 5000)
       
      }
      
    }else if (clickedSentence?.isCorrect === true || speechText === transcript.toLowerCase() ) {
      setCounter(counter + 1)
      resetTranscript()
      setTranslate(false)
      setClickedSentence()
      setColorFalse(false)
      setColorCorrect(false)
      
    } else if (filterData[counter].answer === inputValue.trim()) {
      setCounter(counter + 1)
      // setInputValue("")
      e.target.reset()
      setWrittingFalse(false)
      setIsShowResult(0)
    } else if (filterData[counter].answer !== inputValue.trim()) {
      
      if (isShowResult === 3) {
        return;
      } else {
        setIsShowResult(isShowResult + 1)
        
      }
      setWrittingFalse(true)
      // setInputValue("")
      // e.target.reset()
    }
  }
  // ================================================================================================================

  // let refWritting = useRef()
  const handleChangeWritting = (e) => {
    const debounced = debounce(() => {
      setInputValue(e.target.value)
    }, 1);
    
    debounced();
  };
 
  // let handleChangeWritting = useMemo(
  //   () => (e) => setInputValue(e.target.value),
  //   []
  // );
  // =====================================================================================
  let handleSpeech = () => {
    let text = filterData[counter]?.question
    text = text?.replace(/_/g, '')
    text = text?.replace(/-/g, '')
    
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
        <h4>{`${counter + 1} out of ${filterData?.length}`}</h4>
        {type === "speaking" && (
          <h6>In speaking, don't care about the uppercase</h6>
        )}
       
        {languageValue === "en" && (
type === "writting" && (
  <h6>The result will show after {isShowResult}/3 attempts <br /> { isShowResult === 3 && filterData[counter].answer}</h6>
)
        )}
        {languageValue === "عربي" && (
type === "writting" && (
  <h6>النتيجة لح تطلع بعد  {isShowResult}/3 محاولات <br /> { isShowResult === 3 && filterData[counter].answer}</h6>
)
        )}



        
        <h2>{filterData[counter]?.question}</h2>
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
          <form onSubmit={handleNext}>
            <input onChange={handleChangeWritting}  type="text" name="writting" id="" placeholder="Write the sentence here" />
            {writtingFalse && <h5>The answer is not correct <br /> It can be the uppercase, space after the coma or question mark</h5>}
            <button >Next</button>
          </form>
        )}

        {type === "speaking" && (
          <p>{transcript}</p>
        )}
        {(type === "speaking" && speechText !== transcript.toLowerCase()) && (
          <h6>When it is correct the next button will show</h6>
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
