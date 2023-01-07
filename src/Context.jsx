import React, { createContext, useEffect, useState } from 'react'
import useLocalStorage from "use-local-storage"

export let context = createContext()

function Context(props) {
  let [users, setUsers] = useState([])
  console.log("🚀 ~ file: Context.jsx:6 ~ Context ~ users", users)
  let fetchUsers = async () => {
    let api = await fetch("http://localhost:4000/getTheAllUsers")
    let json = await api.json()
    return json
  }
  let [signedin, setSignedin] = useLocalStorage("course-signedin",{
    email: "",
    password: "",
  })
  let [isSignedin,setIsSignedin] = useLocalStorage("course-isSignedin",false)
  useEffect(() => {
      fetchUsers().then(result => setUsers(result))
  },[])
  return (
    <context.Provider value={{fetchUsers,users, setUsers,signedin, setSignedin,isSignedin,setIsSignedin}}>{props.children}</context.Provider>
  )
}

export default Context