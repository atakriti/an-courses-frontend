import React from "react";
import {Routes,Route} from "react-router-dom"
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Home from "./Home";
import Register from "./Register/Register";
import "./style.scss"
function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/register" element={ <Register/>}/>
        <Route path="/" element={ <Home/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
