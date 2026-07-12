import React, { useEffect } from "react";
import "./Hello.css";

import chicken from "../assets/chicken.png";
import eggs from "../assets/eggs.png";
import chickenline from "../assets/chickenline.png";
import eggline from "../assets/eggline.png";

import { Link } from "react-router-dom";

function Hello() {
  useEffect(() => {
    const loadChatbot = async () => {
      const Chatbot = await import(
        "https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js"
      );

      Chatbot.default.init({
        chatflowid: "d657ae0c-003c-4f4a-8c9c-7d6df2063517",
        apiHost: "https://cloud.flowiseai.com",

        theme: {
          button: {
            backgroundColor: "chocolate",
            right: 20,
            bottom: 20,
            size: 60,
            iconColor: "white",
          },

          chatWindow: {
            welcomeMessage:
              "🐔 Welcome to Fresh Farm! Ask me about chicken, eggs, prices, or delivery.",

            title: "Fresh Farm Assistant",

            showTitle: true,

            style: {
              fontFamily: "Poppins",
            },
          },
        },
      });
    };

    loadChatbot();
  }, []);

  return (
    <div className="front">
  

      <nav className="navbar">
       

        <div className="nav-links">
          <Link to="/">Home</Link>

          <a href="#about">About</a>

          <Link to="/products">Products</Link>
        </div>

        <div className="nav-right">
    <Link to="/wishlist" className="nav-item">
        ❤️ Wishlist
    </Link>

    <Link to="/cart" className="nav-item">
      🛒 Cart
    </Link>
          <Link to="/dashboard">
            <button className="account-btn">
              Account
            </button>
          </Link>
        </div>
      </nav>

      

      <div className="header">
        <h1>Fresh Farm Poultry</h1>
        <h1>Fresh Poultry Products Delivered to Your Door !!</h1>

        <Link to="/login">
          <button>Shop Now</button>
        </Link>
      </div>

      

      <div className="features">
        <h2 className="featured">Featured Categories</h2>

        <img
          className="chicken"
          src={chicken}
          alt="Chicken"
        />

        <p className="p1">
          Quality You Can Taste!
        </p>

        <img
          className="eggs"
          src={eggs}
          alt="Eggs"
        />

        <p className="p2">
          Crack Open Pure Freshness!
        </p>
      </div>

      

      <section id="about">
        <h2>About Us</h2>

        <p>
          Welcome to Our Poultry Farm! We are dedicated to
          providing fresh, healthy, and high-quality poultry
          products to our customers. Our farm follows hygienic
          and ethical farming practices to ensure the
          well-being of our birds and customer satisfaction.
        </p>

        <h3>What We Offer</h3>

        <ul>
          <li>🥚 Fresh farm eggs</li>
          <li>🍗 Quality chicken meat</li>
          <li>🐓 Healthy hens and roosters for sale</li>
          <li>🚚 Reliable delivery services</li>
        </ul>

        <h3>Our Mission</h3>

        <p>
          To provide nutritious poultry products while
          maintaining the highest standards of quality,
          cleanliness, and customer care.
        </p>

        <img
          className="chickenline"
          src={chickenline}
          alt="Chicken Line"
        />

        <img
          className="eggline"
          src={eggline}
          alt="Egg Line"
        />
      </section>
    </div>
  );
}

export default Hello;