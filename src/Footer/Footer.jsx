import React, { useContext, useEffect, useState } from "react";
import "./footer.scss";
import { BsFacebook, BsLinkedin, BsGithub } from "react-icons/bs";
import { context } from "../Context";
import axios from "axios";
function Footer() {
  const currentYear = new Date().getFullYear();
  let {
    users,
    signedin,
    setAnimateDownload,
    animateDownload,
    setIsSignedin,
    setSignedin,
    fetchUsers,
    setUsers,
    isSignedin,
    languageValue,
  } = useContext(context);
  // ====================== Find the user =========================
  let findUser = users?.find((user) => user?.email === signedin?.email);
  let [isDelete, setIsDelete] = useState(false);
  let [inputValue, setInputValue] = useState("");
  let handleDeleteAccount = async (e) => {
    e.preventDefault();
    if (inputValue === findUser.password) {
      await axios.delete(`http://localhost:4000/deleteUser/${findUser?._id}`);
      setIsSignedin(false);
      setSignedin({
        email: "",
        password: "",
      });
      fetchUsers().then((result) => setUsers(result));
      alert("Your account is Deleted");
      setIsDelete(false);
      setInputValue("");
    } else {
      alert("The password is not correct !");
      setInputValue("");
    }
  };

  return (
    <footer>
      {isDelete && (
        <div className="popDelete">
          <div className="popDeleteContainer">
            <h1>Hello {findUser?.username}</h1>
            <h3>Please confirm the password to delete your account</h3>
            <form>
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                type="text"
                name="text"
                id=""
                placeholder="Write your password..."
              />
              <button onClick={handleDeleteAccount}>Confirm</button>
            </form>
            <h4 onClick={() => setIsDelete(false)}>Close</h4>
          </div>
        </div>
      )}

      <span>
        {languageValue === "en" && isSignedin && (
          <button onClick={() => setIsDelete(true)}>Delete my account</button>
        )}
        
        {languageValue === "عربي" && isSignedin && (
          <button onClick={() => setIsDelete(true)}>الغاء الحساب</button>
        )}

        <h2> Developed by Anwar Takriti {currentYear}</h2>
        <div className="icons">
          <a
            target={"_blank"}
            href="https://www.facebook.com/profile.php?id=100004043302646"
          >
            {" "}
            <BsFacebook />
          </a>
          <a
            target={"_blank"}
            href="https://www.linkedin.com/in/anwar-takriti-232029248/"
          >
            <BsLinkedin />
          </a>
          <a target={"_blank"} href="https://github.com/atakriti">
            {" "}
            <BsGithub />
          </a>
        </div>
      </span>
    </footer>
  );
}

export default Footer;
