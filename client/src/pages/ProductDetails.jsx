import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Products } from "../api/api";
import About from "../components/About";
import ProductCard from "../components/ProductCard";

export default function ProductDetails(props) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [productQuantity, setProductQuantity] = useState(0);
  const [product, setProduct] = useState({});

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

  if (isLoading) {
    // change for a nice loading spinner
    return <h2>Loading</h2>;
  }
  return (
    <section>
      <div>
        <Link onClick={() => navigate(-1)} to="#">
          Go Back
        </Link>
        <img src={product.image.mobile} alt="" />
        {product.new === true ? <span>New Product</span> : ""}
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <span>{`$${product.price}`}</span>
        <span onClick={handleMinus}>-</span>
        <input
          type="number"
          id="quantity"
          name="quantity"
          min="0"
          max="10"
          value={productQuantity}
        />
        <span onClick={handlePlus}>+</span>
        <Link className="orange-button" to="#">
          Add to cart
        </Link>
        <h4>Features</h4>
        <p>{product.features}</p>
        <h4>in the box</h4>
        <ul>
          {product.includes.map((item) => {
            return <li>{`${item.quantity}x ${item.item}`}</li>;
          })}
        </ul>
      </div>
      <div>
        <img src={product.gallery.first.mobile} alt="stock photp" />
        <img src={product.gallery.second.mobile} alt="stock photp" />
        <img src={product.gallery.third.mobile} alt="stock photp" />
      </div>
      <h4>you may also like</h4>
      {product.others.map((item) => {
        return (
          <div>
            <img src={item.image.mobile} alt="" srcset="" />
            <h5>{item.name}</h5>
          </div>
        );
      })}
      <ProductCard />
      <About />
    </section>
  );
}
