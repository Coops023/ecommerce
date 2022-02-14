import React from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import routes from "./config/routes";
import Headphones from "./pages/Headphones";
import Speakers from "./pages/Speakers";
import HomePage from "./pages/HomePage";
import Earphones from "./pages/Earphones";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/headphones" element={<Headphones />} />
        <Route exact path="/speakers" element={<Speakers />} />
        <Route exact path="/earphones" element={<Earphones />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
