import React, { useState } from "react";
import "./contact.scss";
import emailjs from "@emailjs/browser";
import logo from "../images/contact-logo.png"
function Contact() {
  let [inputValue, setInputValue] = useState({
    username: "",
    email: "",
    phonenumber: null,
    textarea: "",
  });
  let handleChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };
  let handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_c5khqhu",
        "template_qz6ekje",
        e.target,
        "D2hQ0BJIq3C-XKKXe"
      )
      .then(
        (result) => {
          alert("You message is successfully sent");
        },
        (error) => {
          alert("There is an Error, please try again later");
        }
      );

    setInputValue({
      username: "",
      email: "",
      phonenumber: "",
      textarea: "",
    });
    e.target.reset();
  };
  return (
    <div className="contact">
      <form action="" onSubmit={handleSubmit}>
        <input
          required
          placeholder="Write your name..."
          type="text"
          name="username"
          id=""
          onChange={handleChange}
          value={inputValue.username}
        />
        <input
          required
          placeholder="Write your E-Mail..."
          type="email"
          name="email"
          id=""
          onChange={handleChange}
          value={inputValue.email}
        />
        <input
          placeholder="Write your Phonenumber..."
          type="number"
          name="phonenumber"
          id=""
          onChange={handleChange}
          value={inputValue.phonenumber}
        />
        <textarea
          placeholder="How can i help you ?"
          required
          name="textarea"
          id=""
          onChange={handleChange}
          value={inputValue.textarea}
          cols="40"
          rows="7"
        ></textarea>
        <button
          disabled={
            inputValue.email === "" &&
            inputValue.username === "" &&
            inputValue.textarea === "" &&
            inputValue.phonenumber === ""
          }
        >
          Send
        </button>
          </form>
          <a ><img src={logo} alt="" /></a>
    </div>
  );
}

export default Contact;
