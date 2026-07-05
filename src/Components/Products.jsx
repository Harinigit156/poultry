import React from "react";
import "./Products.css";

import chickenmeat from "../assets/chickenmeat.png";
import neweggs from "../assets/neweggs.png";
import chickenpair from "../assets/chickenpair.png";

import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { MdShoppingBag } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function Products() {
  const navigate = useNavigate();

  // ===========================
  // Add to Wishlist
  // ===========================
  const addToWishlist = (product) => {
    let wishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    const exists = wishlist.find(
      (item) => item.name === product.name
    );

    if (exists) {
      alert("Product already in wishlist");
      return;
    }

    wishlist.push(product);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );

    alert("Added to Wishlist");
  };

  // ===========================
  // Add to Cart
  // ===========================
  const addToCart = (product) => {
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

    alert("Added to Cart");
  };

  // ===========================
  // Buy Now
  // ===========================
  const buyNow = (product) => {
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

    navigate("/cart");
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