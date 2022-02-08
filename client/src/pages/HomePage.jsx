import logo from "../logo.svg";
import "./HomePage.css";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Zx9SpeakerCard from "../components/Zx9SpeakerCard";
import About from "../components/About";
import Headphones from "./Headphones";

function HomePage() {
  return (
    <>
      <header className="home-header">
        <div className="header-content-wrap">
          <span>New Product</span>
          <h1>XX99 Mark II Headphones</h1>
          <p>
            Experience natural, lifelike audio and exceptional build quality
            made for the passionate music enthusiast.
          </p>
          <Link className="orange-btn" to="#">
            See product
          </Link>
        </div>
      </header>
      <ProductCard />
      <Zx9SpeakerCard />
      <About />
    </>
  );
}

export default HomePage;
