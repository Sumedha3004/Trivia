import React,{useState} from "react";
import { Link } from "react-router-dom";
import "./Intro.css";

const Intro = () => {
  const [userName,setUserName]=useState("");
  return (
    <div>
      <div className="intro-main">
        <div className="intro-head">
          <h1>Trivia Quiz</h1>
          <p className="intro-head">Test your knowledge</p>
        </div>
        <div className="intro-input">
          <input type="text" placeholder="Enter Your Name" value={userName} onChange={(e)=>setUserName(e.target.value)} required />
        </div>
        <div className="intro-category">
          <div className="intro-category-heading">
            <p>Select Category:</p>
          </div>
          <div className="intro-opt">
            <Link to="/sports" state={{userName}}>Sports</Link>
            <Link to="/cpp" state={{userName}}>C++</Link>
            <Link to="/gk" state={{userName}}>General Knowledge</Link>
            <Link to="/css" state={{userName}}>CSS</Link>
            <Link to="/java" state={{userName}}>Java</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
