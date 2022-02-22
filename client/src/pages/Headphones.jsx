import { useEffect, useState } from "react";
import "./Headphones.css";
import { Link } from "react-router-dom";
import { Products } from "../api/api";
import ProductCard from "../components/ProductCard";
import About from "../components/About";

//  IMPORTS FOR REDUX
// import { useSelector, useDispatch } from "react-redux";
// import { getHeaphones as listHeadphones } from "../redux/actions/productActions";

export default function Headphones() {
  //BELOW IS WHAT I HAVE TRIED TO RENDER NEW REDUX CODE ADDED TODAY

  // const dispatch = useDispatch();

  // const getHeadphones = useSelector((state) => state.getHeadphones);
  // const { headphones, loading, error } = getHeadphones;

  // useEffect(() => {
  //   dispatch(listHeadphones());
  // }, [dispatch]);

  // THIS IS CODE I WAS USING BEFORE TRYING REDUX

  const [headphones, setHeadphones] = useState([]);

  async function getHeadphones() {
    const response = await new Products().getAllHeadphones();
    console.log("this is the response", response);
    console.log("this is the response data", response.data);

    setHeadphones(response.data.headphones);
  }

  useEffect(() => {
    getHeadphones();
  }, []);

  return (
    <>
      <div className="page-heading">
        <h2>headphones</h2>
      </div>
      {headphones
        .map((headphone) => {
          return (
            <article className="product-card" key={headphone._id}>
              <div className="product-img-wrap">
                <img src={headphone.image.mobile} alt="" />
              </div>
              <div className="product-content-wrap">
                {headphone.new === true ? (
                  <h5 className="new-product">new product</h5>
                ) : (
                  ""
                )}
                <h3>{headphone.name}</h3>
                <p>{headphone.description}</p>
                <Link
                  key={headphone._id}
                  className="orange-btn"
                  to={`/product/${headphone._id}`}
                >
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
