
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import logo2 from './Logos/BengalsLogo.jpg';
import Position from "./Components/Positions";
import Teams from "./Components/Teams";
import TeamData from "./Components/TeamData";
import Search from "./Components/Search";
import Home from "./Components/Home";
import Compare from "./Components/Compare";


function App() {
  return (
    <Router>
        <div>
            <Navbar />
            <img src={logo2} className="logo2" alt="bg" />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/team" element={<Teams />} />
                <Route path="/data" element={<TeamData />} />
                <Route path="/position" element={<Position/>} />
                <Route path="/search" element={<Search />} />
                <Route path="/compare" element={<Compare/>} />
            </Routes>
        </div>
    </Router>
  );
}

export default App;
