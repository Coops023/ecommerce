import { useEffect, useState } from "react";
import "./Earphones.css";
import { Link } from "react-router-dom";
import { Products } from "../api/api";
import ProductCard from "../components/ProductCard";
import About from "../components/About";

export default function Earphones() {
  const [earphones, setEarphones] = useState([]);

  async function getEarphones() {
    const response = await new Products().getAllEarphones();
    console.log("this is the response", response);
    console.log("this is the response data", response.data);

    setEarphones(response.data.earphones);
  }

  useEffect(() => {
    getEarphones();
  }, []);

  return (
    <>
      <div className="page-heading">
        <h2>Earphones</h2>
      </div>
      {earphones
        .map((earphone) => {
          return (
            <article className="product-card" key={earphone.id}>
              <div className="product-img-wrap">
                <img src={earphone.image.mobile} alt="earphone" />
              </div>
              <div className="product-content-wrap">
                {earphone.new === true ? (
                  <h5 className="new-product">new product</h5>
                ) : (
                  ""
                )}
                <h3>{earphone.name}</h3>
                <p>{earphone.description}</p>
                <Link className="orange-btn" to="#">
                  {" "}
                  See product
                </Link>
              </div>
            </article>
          );
        })
        .reverse()}
      <ProductCard />
      <About />
    </>
  );
}
