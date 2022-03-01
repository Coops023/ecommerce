import { useEffect, useState } from "react";
import "./Speakers.css";
import { Link } from "react-router-dom";
import { Products } from "../api/api";
import ProductCard from "../components/ProductCard";
import About from "../components/About";

import { useSelector, useDispatch } from "react-redux";
import { getSpeakers as listSpeakers } from "../redux/actions/productActions";

export default function Speakers() {
  const dispatch = useDispatch();
  const getSpeakers = useSelector((state) => state.getSpeakers);
  // console.log("state line 18", getEarphones);
  const { speakers, loading, error } = getSpeakers;

  useEffect(() => {
    dispatch(listSpeakers());
  }, [dispatch]);

  return (
    <>
      <div className="page-heading">
        <h2>Speakers</h2>
      </div>
      {loading || speakers.item === undefined ? (
        <h1>loading...</h1>
      ) : (
        speakers.item
          .map((speaker) => {
            return (
              <article className="product-card" key={speaker.id}>
                <img
                  className="product-image"
                  src={speaker.image.mobile}
                  alt="speaker"
                />

                <div className="product-content-wrap">
                  {speaker.new === true ? (
                    <h5 className="new-product">new product</h5>
                  ) : (
                    ""
                  )}
                  <h3>{speaker.name}</h3>
                  <p>{speaker.description}</p>
                  <Link className="orange-btn" to={`/product/${speaker._id}`}>
                    {" "}
                    See product
                  </Link>
                </div>
              </article>
            );
          })
          .reverse()
      )}
      <ProductCard />
      <About />
    </>
  );
}
