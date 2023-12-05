import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Registration from "./components/Registration";
import Awards from "./components/Awards";
import Dates from "./components/Dates";
import Events from "./components/Events";
import Rules from "./components/Rules";
import Tracks from "./components/Tracks";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element= {<Registration/>} />
        <Route path="/Awards" element={<Awards />} />
        <Route path="/Dates" element={<Dates />} />
        <Route path="/Events" element={<Events />} />
        <Route path="/Rules" element={<Rules />} />
        <Route path="/Tracks" element={<Tracks />} />

      </Routes>
    </Router>
  );
}

export default App;
