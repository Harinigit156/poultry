import React, { useEffect, useState } from "react";
import { FaTrash, FaShoppingCart } from "react-icons/fa";
import './Wishlist.css';
import Rooster from "../assets/Rooster.png";
import Swal from "sweetalert2";
function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = () => {
    const items =
      JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(items);
  };

  // Remove from Wishlist
  const removeFromWishlist = (name) => {
    const updatedWishlist = wishlist.filter(
      (item) => item.name !== name
    );

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updatedWishlist)
    );

    setWishlist(updatedWishlist);
  };

  // Move to Cart
  const moveToCart = (product) => {
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

    removeFromWishlist(product.name);

    Swal.fire({
      icon: "success",
      title: "Moved to Cart",
      
      background: "beige",
      confirmButtonColor:"chocolate",
    });
  };

  return (
    <div className="wishlist-page">
     <div className="wishlist-animation">
  <img
    src={Rooster}
    alt="Chicken"
    className="wishlist-svg"
  />
</div>
      <h1>My Wishlist</h1>

      {wishlist.length === 0 ? (
        <h2>Your Wishlist is Empty!</h2>
      ) : (
        <div className="wishlist-container">
          {wishlist.map((item, index) => (
            <div className="wishlist-card" key={index}>
              <img
                src={item.image}
                alt={item.name}
                width="180"
              />

              <h3>{item.name}</h3>

              <h4>₹{item.price}</h4>

              <button className="move"
                onClick={() => moveToCart(item)}
              >
                <FaShoppingCart /> Move to Cart
              </button>

              <button className="remove"
                onClick={() =>
                  removeFromWishlist(item.name)
                }
              >
                <FaTrash /> Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;