import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Products } from "../api/api";
import About from "../components/About";
import ProductCard from "../components/ProductCard";
import "./ProductDetails.css";

export default function ProductDetails(props) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [productQuantity, setProductQuantity] = useState(0);
  const [product, setProduct] = useState({});
  const [price, setPrice] = useState(0);
  const [features, setFeatures] = useState("");

  const fetchProduct = async () => {
    const response = await new Products().getOne(id);
    console.log("product details respose", response.data.products);
    setProduct(response.data.products);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handlePlus = () => {
    setProductQuantity(productQuantity + 1);
  };
  const handleMinus = () => {
    setProductQuantity(productQuantity - 1);
  };

  const addComaToPrice = async () => {
    const response = await new Products().getOne(id);

    setPrice(response.data.products.price.toLocaleString());
  };

  const seperateParagraph = async () => {
    const response = await new Products().getOne(id);
    // console.log(response.data.products.features.split(/\n/));
    setFeatures(response.data.products.features.split(/\n/));
  };

  useEffect(() => {
    addComaToPrice();
  }, []);

  useEffect(() => {
    seperateParagraph();
  }, []);

  if (isLoading) {
    // change for a nice loading spinner
    return <h2>Loading</h2>;
  }
  return (
    <section className="product-details">
      <div>
        <Link className="go-back" onClick={() => navigate(-1)} to="#">
          Go Back
        </Link>
        <div className="product-details-main">
          <img className="product-img" src={product.image.mobile} alt="" />
          {product.new === true ? (
            <span className="new-product">New Product</span>
          ) : (
            ""
          )}
          <h3>{product.name}</h3>
          <p>{product.description}</p>
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
            {product.includes.map((item) => {
              return (
                <li className="item-li">
                  <span className="item-quantity">{item.quantity}x</span>
                  <span className="item-name">{item.item}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="gallery-photo">
        <img src={product.gallery.first.mobile} alt="stock photp" />
        <img src={product.gallery.second.mobile} alt="stock photp" />
        <img src={product.gallery.third.mobile} alt="stock photp" />
      </div>
      <h4 className="also-like-heading">you may also like</h4>
      <div className="you-may-also-like">
        {product.others.map((item) => {
          return (
            <div>
              <img src={item.image.mobile} alt="" srcset="" />
              <h5>{item.name}</h5>
              <Link className="orange-btn" to="#">
                see product
              </Link>
            </div>
          );
        })}
      </div>
      <ProductCard />
      <About />
    </section>
  );
}
