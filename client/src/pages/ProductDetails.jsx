import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Products } from "../api/api";
import About from "../components/About";
import ProductCard from "../components/ProductCard";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from "../redux/actions/productActions";
import { addToCart } from "../redux/actions/cartActions";

export default function ProductDetails({ match, history }) {
  // console.log(props, "line 23 props product details");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();

  const [price, setPrice] = useState(0);
  const [productQuantity, setProductQuantity] = useState(0);
  const [features, setFeatures] = useState("");

  const productDetails = useSelector((state) => state.getProductDetails);
  console.log("state line 18", productDetails);
  const { product, loading, error } = productDetails;

  useEffect(() => {
    if (product && id !== product) {
      dispatch(getProductDetails(id));
      console.log(product);
    }
  }, [dispatch, id]);

  const handlePlus = () => {
    setProductQuantity(productQuantity + 1);
  };
  const handleMinus = () => {
    setProductQuantity(productQuantity - 1);
  };

  const addComaToPrice = async () => {
    const { product } = await productDetails;

    setPrice(product.item.price.toLocaleString());
  };

  const seperateParagraph = async () => {
    const { product } = await productDetails;
    console.log("line 72 ProDeit", product);

    setFeatures(product.item.features.split(/\n/));
  };

  useEffect(() => {
    addComaToPrice();
  }, []);

  useEffect(() => {
    seperateParagraph();
  }, []);

  // if (isLoading) {
  //   // change for a nice loading spinner
  //   return <h2>Loading</h2>;
  // }
  return (
    <section className="product-details">
      {loading || product === undefined || product.item == undefined ? (
        <h1>loading...</h1>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <div>
            <Link className="go-back" onClick={() => navigate(-1)} to="#">
              Go Back
            </Link>
            <div className="product-details-main">
              <img
                className="product-img"
                src={product.item.image.mobile}
                alt=""
              />
              {product.item.new === true ? (
                <span className="new-product">New Product</span>
              ) : (
                ""
              )}
              <h3>{product.item.name}</h3>
              <p>{product.item.description}</p>
              <span className="product-price">{`$ ${price}`}</span>
              <div className="quantity-input">
                <div className="selector-wrap">
                  <span className="quantity-selector" onClick={handleMinus}>
                    -
                  </span>

                  <input
                    className="quantity-selector"
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="0"
                    max="10"
                    value={productQuantity}
                  />
                  <span className="quantity-selector" onClick={handlePlus}>
                    +
                  </span>

                  <Link className="orange-btn-product" to="#">
                    Add to cart
                  </Link>
                </div>
              </div>
            </div>
            <div className="features-contents">
              <h4>Features</h4>
              <p>{features[0]}</p>
              <p>{features[2]}</p>
              <h4>in the box</h4>
              <ul className="item-ul">
                {product.item.includes.map((item) => {
                  return (
                    <li key={item._id} className="item-li">
                      <span className="item-quantity">{item.quantity}x</span>
                      <span className="item-name">{item.item}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="gallery-photo">
            <img src={product.item.gallery.first.mobile} alt="stock photp" />
            <img src={product.item.gallery.second.mobile} alt="stock photp" />
            <img src={product.item.gallery.third.mobile} alt="stock photp" />
          </div>
          <h4 className="also-like-heading">you may also like</h4>
          <div className="you-may-also-like">
            {product.item.others.map((item) => {
              return (
                <div key={item._id}>
                  <img src={item.image.mobile} alt="" srcset="" />
                  <h5>{item.name}</h5>
                  <Link className="orange-btn" to="#">
                    see product
                  </Link>
                </div>
              );
            })}
          </div>
        </>
      )}

      <ProductCard />
      <About />
    </section>
  );
}
