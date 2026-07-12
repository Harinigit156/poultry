import React, { useEffect, useState } from "react";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import './Cart.css';
import Ok from "../assets/Ok.png";
import Swal from "sweetalert2";
function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const items = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(items);
  };


  const increaseQuantity = (name) => {
    const updatedCart = cart.map((item) =>
      item.name === name
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const decreaseQuantity = (name) => {
    const updatedCart = cart
      .map((item) =>
        item.name === name
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };


  const removeItem = (name) => {
    const updatedCart = cart.filter(
      (item) => item.name !== name
    );

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const grandTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
const checkout = () => {
  
  const previousOrders =
    JSON.parse(localStorage.getItem("orders")) || [];

  
  const updatedOrders = [...previousOrders, ...cart];

  
  localStorage.setItem(
    "orders",
    JSON.stringify(updatedOrders)
  );

  
  localStorage.removeItem("cart");
  setCart([]);
 Swal.fire({
       icon: "success",
       title: "Your Orders has been placed",
       
       background: "beige",
       confirmButtonColor:"chocolate",
     });
  
  navigate("/dashboard#orders");
};
  return (
    <div className="cart-page">
      <div className="Ok-animation">
        <img
          src={Ok}
          alt="Chicken"
          className="Ok-svg"
        />
      </div>

      <h1>My Cart</h1>

      {cart.length === 0 ? (
        <h2>Your Cart is Empty</h2>
      ) : (
        <>
          {cart.map((item, index) => (
            <div
              key={index}
              className="cart-card"
            >
              <img
                src={item.image}
                alt={item.name}
                width="180"
              />

              <h3>{item.name}</h3>

              <p>Price : ₹ {item.price}</p>

              <div>

                <button
                  onClick={() =>
                    decreaseQuantity(item.name)
                  }
                >
                  <FaMinus />
                </button>

                <span
                  style={{
                    margin: "0 15px",
                    fontSize: "18px",
                  }}
                >
                  {item.quantity}
                </span>

                <button
                  onClick={() =>
                    increaseQuantity(item.name)
                  }
                >
                  <FaPlus />
                </button>

              </div>

              <h4>
                Total : ₹ {item.price * item.quantity}
              </h4>

              <button
                onClick={() =>
                  removeItem(item.name)
                }
              >
                <FaTrash /> Remove
              </button>

              
            </div>
          ))}

          <h2>
            Grand Total : ₹ {grandTotal}
          </h2>

        <button onClick={checkout}>
  Proceed to Checkout
</button>
        </>
      )}
    </div>
  );
}

export default Cart;