import React from "react";
import {Routes,Route} from "react-router-dom"
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Home from "./Home";
import Register from "./Register/Register";
import Categories from "./Categories/Categories";
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
        <Route path="/course/:lan/:level" element={<Categories />} />
        <Route path="/course/:lan/:level/:type" element={<SingleCourse />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
