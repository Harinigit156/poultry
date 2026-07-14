import React, { useEffect, useState } from "react";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import Ok from "../assets/Ok.png";
import Swal from "sweetalert2";

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

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

  const checkout = async () => {
    const user = JSON.parse(localStorage.getItem("user")) || {};

    if (cart.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Cart is Empty",
        text: "Please add products to your cart.",
        confirmButtonColor: "chocolate",
      });
      return;
    }

    const { value: formValues } = await Swal.fire({
      title: "Delivery Details",
      html: `
        <input
          id="swal-phone"
          class="swal2-input"
          placeholder="Contact Number"
          value="${user.phone || ""}"
        >

        <textarea
          id="swal-address"
          class="swal2-textarea"
          placeholder="Delivery Address"
        >${user.address || ""}</textarea>
      `,
      showCancelButton: true,
      confirmButtonText: "Place Order",
      confirmButtonColor: "chocolate",

      preConfirm: () => {
        const phone = document
          .getElementById("swal-phone")
          .value.trim();

        const address = document
          .getElementById("swal-address")
          .value.trim();

        if (!phone || !address) {
          Swal.showValidationMessage(
            "Please enter Contact Number and Address"
          );
          return false;
        }

        if (!/^[6-9]\d{9}$/.test(phone)) {
          Swal.showValidationMessage(
            "Enter a valid 10-digit mobile number"
          );
          return false;
        }

        return {
          phone,
          address,
        };
      },
    });

    if (!formValues) return;

    // Save phone & address
    user.phone = formValues.phone;
    user.address = formValues.address;

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    // Previous Orders
    const previousOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    // Convert Cart to Orders
    const newOrders = cart.map((item) => ({
      ...item,
      customerName: user.name,
      phone: formValues.phone,
      address: formValues.address,
      orderDate: new Date().toLocaleString(),
    }));

    const updatedOrders = [
      ...previousOrders,
      ...newOrders,
    ];

    localStorage.setItem(
      "orders",
      JSON.stringify(updatedOrders)
    );

    // Clear Cart
    localStorage.removeItem("cart");
    setCart([]);

    Swal.fire({
      icon: "success",
      title: "Order Placed Successfully 🎉",
      text: "Your order has been placed successfully.",
      background: "beige",
      confirmButtonColor: "chocolate",
    }).then(() => {
      navigate("/dashboard#orders");
    });
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

          <h2>Grand Total : ₹ {grandTotal}</h2>

          <button onClick={checkout}>
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
