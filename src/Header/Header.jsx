import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.scss";
import logo from "../images/header-logo.png";
import user from "../images/user.jpg";
import logo2 from "../images/an-logo.png";
import { useMediaQuery } from "react-haiku";
import { context } from "../Context";
import { GiHamburgerMenu } from "react-icons/gi";
import  {FaTimes} from "react-icons/fa"
function Header() {
  // let navigate = useNavigate()
  let {
    users,
    setSignedin,
    isSignedin,
    setIsSignedin,
    signedin,
    setIsFetching,
    isFetching,
  } = useContext(context);
  let handleSignout = () => {
    setIsSignedin(false);
    setIsFetching(true);
    setAnimateIsMenu(false)
    setTimeout(() => setIsMenu(false),300)
    setTimeout(() => setIsFetching(false), 2000);
    setSignedin({
      username: "",
      password: "",
    });
  };
  let [isMenu, setIsMenu] = useState(false);
  let [animateIsMenu, setAnimateIsMenu] = useState(false);
  const breakpoint = useMediaQuery("(max-width: 700px)");
  // ======================
  let handleMenuOpen = () => {
    setAnimateIsMenu(true)
    setTimeout(() => setIsMenu(true),100)
  };
  let handleMenuClose = () => {
    setAnimateIsMenu(false)
    setTimeout(() => setIsMenu(false),300)
  };
  return (
    <header>
      <Link className="logo" to="/">
        <img src={logo} alt="" />
      </Link>

      {!breakpoint && (
        <nav>
          <Link to="/contact">Contact</Link>
          <Link to="/about">About</Link>
          <Link to="/feedbackPage">Feedbacks</Link>
          {isSignedin ? (
            <Link className="signout" onClick={handleSignout} to="/">
              <span>Sign out</span>
              <img src={user} alt="" />
            </Link>
          ) : (
            <Link to="/register">Sign in</Link>
          )}
        </nav>
      )}

      {/* ======================= Mobile ================ */}
      {breakpoint && (
        <div className="hamburger">
          {isMenu ? <FaTimes onClick={handleMenuClose}/> : <GiHamburgerMenu onClick={handleMenuOpen} /> }
          
          {isMenu && (
            <div style={animateIsMenu ? {animation:"open 0.5s forwards ease-in-out"} : {animation:"close 0.5s forwards ease-in-out"}} className="nav">
              <Link onClick={handleMenuClose} to="/contact">Contact</Link>
              <Link onClick={handleMenuClose} to="/about">About</Link>
              <Link onClick={handleMenuClose} to="/feedbackPage">Feedbacks</Link>
              {isSignedin ? (
                <Link className="signout" onClick={handleSignout} to="/">
                  <span>Sign out</span>
                 
                </Link>
              ) : (
                <Link onClick={handleMenuClose} to="/register">Sign in</Link>
              )}
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
