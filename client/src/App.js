import React from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import routes from "./config/routes";
import Headphones from "./pages/Headphones";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/headphones" element={<Headphones />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
