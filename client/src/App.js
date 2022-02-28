import React, { useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import routes from "./config/routes";
import Headphones from "./pages/Headphones";
import Speakers from "./pages/Speakers";
import HomePage from "./pages/HomePage";
import Earphones from "./pages/Earphones";
import ProductDetails from "./pages/ProductDetails";

import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

function App() {
  const [cart, setCart] = useState(false);

  const showCart = () => {
    if (cart) {
      setCart(false);
    } else {
      setCart(true);
    }
  };
  return (
    <div className="App">
      <Navbar showCart={showCart} />
      {!cart ? "" : <Cart showCart={showCart} />}
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/headphones" element={<Headphones />} />
        <Route exact path="/speakers" element={<Speakers />} />
        <Route exact path="/earphones" element={<Earphones />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/checkout" element={<Checkout />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
