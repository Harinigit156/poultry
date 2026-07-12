import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Dashboard.css";
import Swal from "sweetalert2";
import c from "../assets/c.png";
import h from "../assets/h.png";

function Dashboard() {
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    document.body.style.backgroundColor = "#FFF8DC";

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  // Load Orders
  useEffect(() => {
    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    setOrders(savedOrders);
  }, []);

  
  useEffect(() => {
    if (location.hash === "#orders") {
      const section = document.getElementById("orders");

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
  }, [location]);
  const cancelOrder = (index) => {
  const updatedOrders = orders.filter((_, i) => i !== index);

  setOrders(updatedOrders);

  localStorage.setItem(
    "orders",
    JSON.stringify(updatedOrders)
  );
  Swal.fire({
    icon: "success",
    title: "Order Cancellation",
    text: "Your Order has been ordered Successfully",
    background: "white",
    confirmButtonColor:"chocolate",
  });
};
const handleLogout = () => {
  Swal.fire({
    title: "Sign Out?",
    text: "Are you sure you want to sign out?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "No",
    confirmButtonColor: "red",
    cancelButtonColor: "gray",
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("user");

      Swal.fire({
        icon: "success",
        title: "Signed Out",
        text: "You have been signed out successfully.",
        confirmButtonColor: "chocolate",
      }).then(() => {
        navigate("/login");
      });
    }
  });
};
  return (
    <div style={{ padding: "30px" }} className="dash">

      <img
        src={c}
        alt="Chicken"
        className="c"
      />

      <img
        src={h}
        alt="Chicken"
        className="h"
      />

      <h1>My Account</h1>

      {user ? (
        <>
          <h2>Welcome {user.name}!</h2>
          <p>Email: {user.email}</p>
        </>
      ) : (
        <h2>Please Login</h2>
      )}
      {user && (
  <button
    className="logout"
    onClick={handleLogout}
  >
    Logout
  </button>
)}
      <br />

      <Link to="/" className="link">
        HOME
      </Link>
     
      
      <div id="orders" className="orders">

        <h2>My Orders</h2>

        {orders.length === 0 ? (
          <p>No Orders Yet</p>
        ) : (
          orders.map((item, index) => (
            <div
              key={index}
              className="order-card"
            >
              <img
                src={item.image}
                alt={item.name}
                width="150"
              />

              <h3>{item.name}</h3>

              <p>Price : ₹ {item.price}</p>

              <p>Quantity : {item.quantity}</p>

              <h4>
                Total : ₹ {item.price * item.quantity}
              </h4>
              <button
    className="cancel-btn"
    onClick={() => cancelOrder(index)}
  >
    Cancel Order
  </button>
            </div>
          ))
        )}

      </div>
 
    </div>
  );
}

export default Dashboard;