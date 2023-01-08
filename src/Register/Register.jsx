import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./register.scss";
import logo from "../images/An-languages-register.png";
import user from "../images/user.jpg";
import { context } from "../Context";

function Register() {
    let { users,fetchUsers,setUsers,setSignedin,setIsSignedin } = useContext(context)
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
            navigate("/")
        }else{
            alert("E-Mail or Password is not correct !")
        }
        
    }
        // ==================== Sign up =================
    let handleChangeSignup = (e) => {
        setSignUpValue({...signUpValue,[e.target.name]:e.target.value})
    }
    let handleSubmitSignup = async (e) => {
        e.preventDefault()
        await axios.post("http://localhost:4000/postingUser", signUpValue)
        setSwitchRegister(1)
      fetchUsers().then(result => setUsers(result))

        setSigninValue({
            email: signUpValue.email,
            password:signUpValue.password
        })
    }
  return (
    <div className="register">
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
