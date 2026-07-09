import React from "react";
import { Link } from "react-router-dom";
import './Dashboard.css';
import { useEffect } from "react";
import c from "../assets/c.png";
import h from "../assets/h.png";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
useEffect(() => {
    document.body.style.backgroundColor = "#FFF8DC";

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

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
          <h2>Welcome {user.name} !</h2>

          <p>Email: {user.email}</p>
        </>
      ) : (
        <h2>Please Login</h2>
      )}

      <br />

      <Link to="/"  className="link">HOME</Link>
    </div>
  );
}

export default Dashboard;