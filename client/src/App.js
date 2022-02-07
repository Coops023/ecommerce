import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import routes from "./config/routes";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="App">
      <Navbar />
      <HomePage />
    </div>
  );
}

export default App;
