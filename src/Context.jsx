import React, { createContext, useEffect, useState } from 'react'
import useLocalStorage from "use-local-storage"

export let context = createContext()

function Context(props) {
  let [users, setUsers] = useState([])
  let [isFetching,setIsFetching] = useState(false)
  let fetchUsers = async () => {
    let api = await fetch("http://localhost:4000/getTheAllUsers")
    // let api = await fetch("https://an-courses-backend.vercel.app/getTheAllUsers")
    let json = await api.json()
    return json
  }
  let [signedin, setSignedin] = useLocalStorage("course-signedin",{
    email: "",
    password: "",
  })
  let [isSignedin, setIsSignedin] = useLocalStorage("course-isSignedin", false)
  let [isFeedback, setIsFeedback] = useState(false)
  let [animateDownload, setAnimateDownload] = useState(false)
  let [animateIsSignin, setAnimateIsSignin] = useState(false)
  let [languageValue, setLanguageValue] = useLocalStorage("languages","en")
  let [isWelcome,setIsWelcome] = useLocalStorage("isWelcome",true)
  // ========================================== Precentage ===================================
  // const [percent, setPercent] = useState(0);
  // const [intervalId, setIntervalId] = useState(null);
  // const [time, setTime] = useState(0);

  // useEffect(() => {
    
  //     const startTime = Date.now();

  //     // Start a timer to update the percentage value over time
  //     const id = setInterval(() => {
  //       setPercent((prevPercent) => prevPercent + 10);
  //     }, time / 10);
  //     setIntervalId(id);
  //     // Perform the data fetch
  //     fetchUsers().then(result => setUsers(result))
  //     // Calculate the elapsed time and update the state
  //     const elapsedTime = Date.now() - startTime;
  //     setTime(elapsedTime);

  //     // Clear the timer when the fetch is complete
  //     clearInterval(intervalId);
    
    
  // }, []);
  // ========================================== End Precentage ===================================

  useEffect(() => {
    setIsFetching(true)
    fetchUsers().then(result => setUsers(result)).then(() => setIsFetching(false))
    
  },[])
  return (
    <context.Provider value={{fetchUsers,users, setUsers,signedin, setSignedin,isSignedin,setIsSignedin,isFetching,setIsFetching,isFeedback,setIsFeedback,animateDownload,setAnimateDownload,animateIsSignin,setAnimateIsSignin,languageValue, setLanguageValue,isWelcome,setIsWelcome}}>{props.children}</context.Provider>
  )
}

export default Context