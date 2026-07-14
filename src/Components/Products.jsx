import React, { useEffect } from "react";
import "./Products.css";

import chickenmeat from "../assets/chickenmeat.png";
import neweggs from "../assets/neweggs.png";
import chickenpair from "../assets/chickenpair.png";

import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { MdShoppingBag } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Products() {
  const navigate = useNavigate();

 
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Please Login",
        text: "You need to login to view products.",
        confirmButtonColor: "chocolate",
      })
    }
  }, [navigate]);

  // Check Login Before Any Action
  const checkLogin = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Please Login",
        text: "Please login to continue.",
        confirmButtonColor: "chocolate",
      })

      return false;
    }

    return true;
  };

  // Add to Wishlist
  const addToWishlist = (product) => {
    if (!checkLogin()) return;

    let wishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    const exists = wishlist.find(
      (item) => item.name === product.name
    );

    if (exists) {
      Swal.fire({
        icon: "info",
        title: "Already Added",
        text: "Product already exists in Wishlist.",
        confirmButtonColor: "chocolate",
      });
      return;
    }

    wishlist.push(product);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );

    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Added to Wishlist Successfully",
      confirmButtonColor: "chocolate",
    });
  };

  // Add to Cart
  const addToCart = (product) => {
    if (!checkLogin()) return;

    let cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const exists = cart.find(
      (item) => item.name === product.name
    );

    if (exists) {
      exists.quantity += 1;
    } else {
      cart.push({
        ...product,
        quantity: 1,
      });
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Added to Cart Successfully",
      confirmButtonColor: "chocolate",
    });
  };
const buyNow = async (product) => {
  if (!checkLogin()) return;

  const user = JSON.parse(localStorage.getItem("user")) || {};

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
    focusConfirm: false,
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
          "Please enter a valid 10-digit mobile number"
        );
        return false;
      }

      return {
        phone,
        address,
      };
    },
  });

  // User clicked Cancel
  if (!formValues) return;

  // Save phone and address to logged-in user
  user.phone = formValues.phone;
  user.address = formValues.address;

  localStorage.setItem(
    "user",
    JSON.stringify(user)
  );

  // Get previous orders
  let orders =
    JSON.parse(localStorage.getItem("orders")) || [];

  // Add new order
  orders.push({
     ...product,
  quantity: 1,
  phone: formValues.phone,
  address: formValues.address,
  orderDate: new Date().toLocaleString(),
  });

  // Save orders
  localStorage.setItem(
    "orders",
    JSON.stringify(orders)
  );

  // Success message
  Swal.fire({
    icon: "success",
    title: "Order Placed Successfully 🎉",
    text: "Your order has been placed successfully.",
    confirmButtonColor: "chocolate",
  }).then(() => {
    navigate("/dashboard");
  });
};
  
  return (
    <div className="products-page">
      <h1>Explore Our Products</h1>

      <div className="product-container">

        {/* Chicken Meat */}
        <div className="product-card">
          <img
            className="product-img"
            src={chickenmeat}
            alt="Chicken Meat"
          />

          <h4>Chicken Meat</h4>

          <p>Half Kg - ₹300</p>
          <p>1 Kg - ₹500</p>

          <div className="product-button-group">

            <button
              className="wishlist-btn"
              onClick={() =>
                addToWishlist({
                  name: "Chicken Meat",
                  price: 500,
                  image: chickenmeat,
                })
              }
            >
              <FaHeart /> Wishlist
            </button>

            <button
              className="cart-btn"
              onClick={() =>
                addToCart({
                  name: "Chicken Meat",
                  price: 500,
                  image: chickenmeat,
                })
              }
            >
              <FaShoppingCart /> Add to Cart
            </button>

            <button
              className="buy-btn"
              onClick={() =>
                buyNow({
                  name: "Chicken Meat",
                  price: 500,
                  image: chickenmeat,
                })
              }
            >
              <MdShoppingBag /> Buy Now
            </button>

          </div>
        </div>

        {/* Eggs */}
        <div className="product-card">
          <img
            className="product-img"
            src={neweggs}
            alt="Eggs"
          />

          <h4>Farm Fresh Eggs</h4>

          <p>1 Dozen - ₹108</p>
          <p>Fresh & Nutritious</p>

          <div className="product-button-group">

            <button
              className="wishlist-btn"
              onClick={() =>
                addToWishlist({
                  name: "Farm Fresh Eggs",
                  price: 108,
                  image: neweggs,
                })
              }
            >
              <FaHeart /> Wishlist
            </button>

            <button
              className="cart-btn"
              onClick={() =>
                addToCart({
                  name: "Farm Fresh Eggs",
                  price: 108,
                  image: neweggs,
                })
              }
            >
              <FaShoppingCart /> Add to Cart
            </button>

            <button
              className="buy-btn"
              onClick={() =>
                buyNow({
                  name: "Farm Fresh Eggs",
                  price: 108,
                  image: neweggs,
                })
              }
            >
              <MdShoppingBag /> Buy Now
            </button>

          </div>
        </div>

        {/* Hen & Rooster Pair */}
        <div className="product-card">
          <img
            className="product-img"
            src={chickenpair}
            alt="Chicken Pair"
          />

          <h4>Hen & Rooster Pair</h4>

          <p>1 Pair - ₹7000</p>
          <p>Price varies by weight</p>

          <div className="product-button-group">

            <button
              className="wishlist-btn"
              onClick={() =>
                addToWishlist({
                  name: "Hen & Rooster Pair",
                  price: 7000,
                  image: chickenpair,
                })
              }
            >
              <FaHeart /> Wishlist
            </button>

            <button
              className="cart-btn"
              onClick={() =>
                addToCart({
                  name: "Hen & Rooster Pair",
                  price: 7000,
                  image: chickenpair,
                })
              }
            >
              <FaShoppingCart /> Add to Cart
            </button>

            <button
              className="buy-btn"
              onClick={() =>
                buyNow({
                  name: "Hen & Rooster Pair",
                  price: 7000,
                  image: chickenpair,
                })
              }
            >
              <MdShoppingBag /> Buy Now
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Products;
   
  
