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

  // const [speakers, setSpeakers] = useState([]);

  // async function getSpeakers() {
  //   const response = await new Products().getAllSpeakers();
  //   console.log("this is the response", response);
  //   console.log("this is the response data", response.data);

  //   setSpeakers(response.data.speakers);
  // }

  // useEffect(() => {
  //   getSpeakers();
  // }, []);

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
                <div className="product-img-wrap">
                  <img src={speaker.image.mobile} alt="speaker" />
                </div>
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
