import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CheckoutModal from "../components/CheckoutModal";
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
  const [modal, setModal] = useState(false);

  const showModal = () => {
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
    }
  };

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
      setGrandTotal(total + shipping);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    cartTotal();
    vatTotal();
    grandTotalHandler();
  }, [cart, vat, grandTotal]);

  const emoneyHandler = () => {
    if (emoney) {
      setEmoney(false);
    } else {
      setEmoney(true);
    }
  };

  return (
    <div className="checkout">
      {modal ? <CheckoutModal total={grandTotal} /> : ""}

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
          required="true"
        />

        <label for="email">Email Address</label>
        <input
          className="form-text-input"
          name="email"
          type="text"
          placeholder="axel@gmail.com"
          required="true"
        />

        <label for="name">Phone Number</label>
        <input
          className="form-text-input"
          name="Phone number"
          type="text"
          placeholder="+1202-555-0136"
          required="true"
        />

        <h5>Shipping info</h5>
        <label for="address">Your address</label>
        <input
          className="form-text-input"
          name="address"
          type="text"
          placeholder="1137 Williams Avenue"
          required="true"
        />

        <label for="zip">Zip Code</label>
        <input
          className="form-text-input"
          name="sip"
          type="text"
          placeholder="1000 Wp"
          required="true"
        />

        <label for="city">City</label>
        <input
          className="form-text-input"
          name="city"
          type="text"
          placeholder="Amsterdam"
          required="true"
        />

        <label for="country">Country</label>
        <input
          className="form-text-input"
          name="country"
          type="text"
          placeholder="The Netherlands"
          required="true"
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

        <h3 className="summary">Summary</h3>
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
        <div className="total-checkout">
          <span>total</span>
          <span className="total-span">${total.toLocaleString()}</span>
        </div>
        <div className="total-checkout">
          <span>Shipping</span>
          <span className="total-span">${shipping}</span>
        </div>
        <div className="total-checkout">
          <span>Vat (included)</span>
          <span className="total-span">
            ${Math.floor(vat).toLocaleString()}
          </span>
        </div>
        <div className="total-final">
          <span>Grand total</span>
          <span className="grand-total">
            ${Math.floor(grandTotal).toLocaleString()}
          </span>
        </div>
        <button onClick={showModal} type="submit" className="orange-btn">
          Continue & Pay
        </button>
      </form>
    </div>
  );
}
