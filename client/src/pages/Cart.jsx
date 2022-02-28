import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../pages/Cart.css";

export default function Cart() {
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const [sumCartItem, setSumCartItem] = useState(0);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log("CART DATA", cart.cartItems);

  const cartTotal = async () => {
    try {
      setTotal(
        cart.cartItems.reduce((price, item) => item.price * item.qty + price, 0)
      );
      console.log("total", total);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    cartTotal();
  }, [cart]);

  return (
    <div className="cart">
      {cart.cartItems === undefined ? (
        ""
      ) : (
        <div className="cart-container">
          <div className="cart-heading-remove">
            <h5>Cart {`(${cart.cartItems.length})`}</h5>
            <button className="remove-btn">Remove all</button>
          </div>

          {cart.cartItems == undefined ? (
            <h2>laoding..</h2>
          ) : (
            cartItems.map((x) => {
              return (
                <div className="cart-items">
                  <img className="prod-img" src={x.image} alt="product photo" />

                  <div className="item-name-price">
                    {x.name.includes("Headphones") ? (
                      <h5>{x.name.replace("Headphones", "")}</h5>
                    ) : x.name.includes("Earphones") ? (
                      <h5>{x.name.replace("Wireless Earphones", "")}</h5>
                    ) : x.name.includes("Speaker") ? (
                      <h5>{x.name.replace("Speaker", "")}</h5>
                    ) : (
                      ""
                    )}
                    <span>${x.price}</span>
                  </div>
                  <div className="qty-selector">
                    <input
                      className="quantity-selector"
                      type="button"
                      value="-"
                    />

                    <input
                      className="quantity-selector"
                      type="number"
                      id="quantity"
                      name="quantity"
                      min="0"
                      value={x.qty}
                    />
                    <input
                      className="quantity-selector"
                      type="button"
                      value="+"
                    />
                  </div>
                </div>
              );
            })
          )}

          <div className="total">
            <h5>total</h5>
            <span className="total-price">${total.toLocaleString()}</span>
          </div>
          <div className="checkout-btn-wrap">
            <button className="checkout-btn">Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}
