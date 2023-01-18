import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./register.scss";
import logo from "../images/An-courses-register.png";
import user from "../images/user.jpg";
import { context } from "../Context";

function Register() {
    let { users,fetchUsers,setUsers,setSignedin,setIsSignedin,setIsFetching } = useContext(context)
    let navigate = useNavigate()
  let [switchRegister, setSwitchRegister] = useState(1);
  let [signUpValue, setSignUpValue] = useState({
    username: "",
    email: "",
    password: "",
  });
  let [signinValue, setSigninValue] = useState({
    email: "",
    password: "",
  });
  let [isChangePassword, setIsChangePassword] = useState(false)
  let [changePasswordValue, setChangePasswordValue] = useState({
    emailChangePassword: "",
    newPassword:""
  })
// ======================= Sign in =============

    let handleChangeSignin = (e) => {
        setSigninValue({...signinValue,[e.target.name]:e.target.value})
    }
    let handleSubmitSignin = ( e) => {
        e.preventDefault()
      if (users?.some(user => user?.email === signinValue?.email && user?.password === signinValue?.password)) {
        setSignedin({
          email: signinValue?.email,
          password:signinValue?.password
        })
        setIsSignedin(true)
        setIsFetching(true)
        setTimeout(() => navigate("/"),2000)
            setTimeout(() => setIsFetching(false),2000)
      } else{
            alert("E-Mail or Password is not correct !")
        }
        
    }
        // ==================== Sign up =================
    let handleChangeSignup = (e) => {
        setSignUpValue({...signUpValue,[e.target.name]:e.target.value})
    }
    let handleSubmitSignup = async (e) => {
      e.preventDefault()
      if (users?.some(user => user?.email === signUpValue?.email)) { 
        alert("This email is allready exist")
      } else {
        await axios.post("https://an-languages-backend.vercel.app/postingUser", signUpValue)
        setIsFetching(true)
        setSwitchRegister(1)
      fetchUsers().then(result => setUsers(result)).then(() =>  setIsFetching(false))

        setSigninValue({
            email: signUpValue.email,
            password:signUpValue.password
        })
      }
        
    }
  
  // ============================ Change password ==============
  let handleChangeNewPassword = (e) => {
    setChangePasswordValue({...changePasswordValue,[e.target.name]:e.target.value})
  }
  let findChangePassword = users.find(user => user.email === changePasswordValue.emailChangePassword)
  let [findChangePasswordState,setFindChangePasswordState] = useState(findChangePassword)
  console.log("🚀 ~ file: Register.jsx:74 ~ Register ~ findChangePasswordState", findChangePasswordState)
  let handleChangePassword =async (e) => {
    e.preventDefault()
    setFindChangePasswordState({...findChangePasswordState,password:changePasswordValue.emailChangePassword})
    await axios.put(`https://an-languages-backend.vercel.app/updateUser/${findChangePassword._id}`, { ...findChangePasswordState, password:changePasswordValue.newPassword })
    setIsSignedin(false);
    setIsFetching(true);
    setIsChangePassword(false) 
    fetchUsers().then(result => setUsers(result)).then(() =>setIsFetching(false))
    // // setTimeout(() => setIsFetching(false), 2000);
    setSignedin({
      username: "",
      password: "",
    });

  }
  useEffect(() => {
    setFindChangePasswordState(findChangePassword)
  },[findChangePassword])
  return (
    <div className="register">
      {isChangePassword && (
        <div className="changePassword">
         
          <form onSubmit={handleChangePassword}>
          <h1>Did you forgot your password ?</h1>
          <h3>Please enter your E-Mail and the new password</h3>
            <input onChange={handleChangeNewPassword} value={changePasswordValue.emailChangePassword} placeholder="Please enter you E-Mail..." type="email" name="emailChangePassword" id="" />
            <input onChange={handleChangeNewPassword} value={changePasswordValue.newPassword} placeholder="Please enter you new password..." type="text" name="newPassword" id="" />
            <button>Done</button>
            <h4 onClick={()=>setIsChangePassword(false)}>Close</h4>
          </form>
        </div>
)}
      {switchRegister === 1 && (
        <form onSubmit={handleSubmitSignin}>
          <a>
            <img src={user} alt="" />
          </a>
          <h1>Sign in</h1>
          <input required onChange={handleChangeSignin} value={signinValue.email} type="email" name="email" placeholder="Email..." />
          <input required onChange={handleChangeSignin} value={signinValue.password} type="password" name="password" placeholder="Password..." />
          <button>Sign in</button>
          <h4 onClick={() => setSwitchRegister(2)}>
            You don't have an account
          </h4>
          <h4 onClick={()=>setIsChangePassword(true)}>Forgot Password?</h4>
        </form>
      )}
      {switchRegister === 2 && (
        <form onSubmit={handleSubmitSignup}>
          <a>
            <img src={user} alt="" />
          </a>

          <h1>Sign up</h1>
          <input required onChange={handleChangeSignup} value={signUpValue.username} type="text" name="username" placeholder="Name..." />
          <input required onChange={handleChangeSignup} value={signUpValue.email} type="email" name="email" placeholder="Email..." />
          <input required onChange={handleChangeSignup} value={signUpValue.password} type="password" name="password" placeholder="Password..." title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" />

          <button>Sign up</button>
          <h4 onClick={() => setSwitchRegister(1)}>You have an account</h4>
        </form>
      )}
      <a className="register-logo">
        <img src={logo} alt="" />
      </a>
    </div>
  );
}

export default Register;
