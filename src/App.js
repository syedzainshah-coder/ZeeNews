import React, { Component } from "react";
import Navbar from "./Components/Navbar";
import NewsComp from "./Components/NewsComp";
// import Carousel from "./Components/Carousel";
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter as Router,
  Route,
  Routes,

} from "react-router-dom";

export default class App extends Component {
  
  constructor() {
    super();

    this.state = {
      mode: "Light",
      progress:0,
      api_key:process.env.REACT_APP_NEWS_API
   
    };
  }

  toggle = () => {
    if (this.state.mode === "Light") {
      document.querySelector(".bodypart").style.color = "yellow";
      document.querySelector(".bodypart").style.backgroundColor = "black";
      document.querySelector(".bodypart").style.transition = "all 1s";
      document.querySelector(".navbar-brand").style.color = "yellow"
      this.setState({
        mode: "Dark"
      });
    } else {
      document.querySelector(".bodypart").style.color = "black";
      document.querySelector(".bodypart").style.backgroundColor = "white";
      document.querySelector(".bodypart").style.transition = "all 1s";
      document.querySelector(".navbar-brand").style.color = "white"

      this.setState({
        mode: "Light"
      });
    }
  };
  setProgress = (progress) => {
    this.setState({
      progress:progress
     
    })
  }

  render() {
  
    return (
      <>
        <Router>
          <Navbar mode={this.state.mode} toggle={this.toggle} />
          <div>
            <LoadingBar
              color='#f11946'
              progress={this.state.progress}
             
            />
          
          </div>

          <Routes>
            <Route path="/" element={<NewsComp api_key={this.state.api_key}  setProgress={this.setProgress} query="science" pageSize={20} />} />
            <Route path="/cricket" element={<NewsComp api_key={this.state.api_key} setProgress={this.setProgress} query="cricket" pageSize={20} />} />
            <Route path="/sports" element={<NewsComp api_key={this.state.api_key} setProgress={this.setProgress} query="sports" pageSize={20} />} />
            <Route path="/weather" element={<NewsComp api_key={this.state.api_key} setProgress={this.setProgress} query="weather" pageSize={20} />} />
            <Route path="/education" element={<NewsComp api_key={this.state.api_key} setProgress={this.setProgress} query="education" pageSize={20} />} />

          </Routes>
        </Router>
        {/* <Carousel/> */}
      </>
    );
  }
}
