import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../pages/Checkout.css";

export default function Checkout() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const [total, setTotal] = useState(0);
  const [shipping, setShipping] = useState(50);
  const [vat, setVat] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [emoney, setEmoney] = useState(false);

  const cartTotal = async () => {
    try {
      setTotal(
        cart.cartItems.reduce((price, item) => item.price * item.qty + price, 0)
      );
    } catch (err) {
      console.log(err);
    }
  };

  const vatTotal = async () => {
    try {
      setVat((total * 20) / 100);
    } catch (err) {
      console.log(err);
    }
  };

  const grandTotalHandler = async () => {
    try {
      setGrandTotal(total + vat + shipping);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    cartTotal();
    vatTotal();
    grandTotalHandler();
  }, [cart]);

  const emoneyHandler = () => {
    if (emoney) {
      setEmoney(false);
    } else {
      setEmoney(true);
    }
  };

  return (
    <div className="checkout">
      <button className="back-btn">Go Back</button>
      <form className="checkout-form">
        <h2>checkout</h2>
        <h5>billing details</h5>
        <label for="name">Name</label>
        <input
          className="form-text-input"
          name="name"
          type="text"
          placeholder="Axel Ward"
        />

        <label for="email">Email Address</label>
        <input
          className="form-text-input"
          name="email"
          type="text"
          placeholder="axel@gmail.com"
        />

        <label for="name">Phone Number</label>
        <input
          className="form-text-input"
          name="Phone number"
          type="text"
          placeholder="+1202-555-0136"
        />

        <h5>Shipping info</h5>
        <label for="address">Your address</label>
        <input
          className="form-text-input"
          name="address"
          type="text"
          placeholder="1137 Williams Avenue"
        />

        <label for="zip">Zip Code</label>
        <input
          className="form-text-input"
          name="sip"
          type="text"
          placeholder="1000 Wp"
        />

        <label for="city">City</label>
        <input
          className="form-text-input"
          name="city"
          type="text"
          placeholder="Amsterdam"
        />

        <label for="country">Country</label>
        <input
          className="form-text-input"
          name="country"
          type="text"
          placeholder="The Netherlands"
        />

        <h5>Payment Details</h5>

        <label>Payment method</label>
        <div className="checkbox-wrap">
          <input
            type="checkbox"
            name="e-money"
            id=""
            value={emoney}
            onChange={emoneyHandler}
          />
          <label htmlFor="">e-Money</label>
        </div>
        <div className="checkbox-wrap">
          <input type="checkbox" name="cash" id="" />
          <label htmlFor="cash">Cash on delivery</label>
        </div>
        {emoney ? (
          <>
            <div className="emoney-show">
              <label>e-Money Number</label>
              <input
                className="form-text-input"
                type="text"
                placeholder="12345566"
              />
            </div>
            <div className="emoney-show">
              <label>e-Money Pin</label>
              <input
                className="form-text-input"
                type="text"
                placeholder="1234"
              />
            </div>
          </>
        ) : (
          ""
        )}

        <h3>Summary</h3>
        {cartItems.map((item) => {
          return (
            <div className="item-wrap">
              <div className="price-qty-wrap">
                <img src={item.image} alt="" />

                <div>
                  {item.name.includes("Headphones") ? (
                    <h6>{item.name.replace("Headphones", "")}</h6>
                  ) : item.name.includes("Earphones") ? (
                    <h6>{item.name.replace("Wireless Earphones", "")}</h6>
                  ) : item.name.includes("Speaker") ? (
                    <h6>{item.name.replace("Speaker", "")}</h6>
                  ) : (
                    ""
                  )}

                  <span>{`$${item.price.toLocaleString()}`}</span>
                </div>
              </div>
              <span>x{item.qty}</span>
            </div>
          );
        })}
        <div>
          <span>total</span>
          <span>${total.toLocaleString()}</span>
        </div>
        <div>
          <span>Shipping</span>
          <span>${shipping}</span>
        </div>
        <div>
          <span>Vat (included)</span>
          <span>${Math.floor(vat).toLocaleString()}</span>
        </div>
        <div>
          <span>Grand total</span>
          <span>${Math.floor(grandTotal).toLocaleString()}</span>
        </div>
        <button>Continue & Pay</button>
      </form>
    </div>
  );
}
