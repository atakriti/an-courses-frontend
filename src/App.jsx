import React from "react";
import {Routes,Route} from "react-router-dom"
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Home from "./Home";
import Register from "./Register/Register";
import Type from "./Type/Type";
import "./style.scss"
import SingleCourse from "./SingleCourse/SingleCourse";
import Levels from "./Levels/Levels";
function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/register" element={ <Register/>}/>
        <Route path="/" element={<Home />} />
        <Route path="/course/:lan" element={<Levels />} />
        <Route path="/course/:lan/:level" element={<Type />} />
        <Route path="/course/:lan/:level/:type" element={<SingleCourse />} />
      </Routes>
      
    </div>
  );
}

export default App;
