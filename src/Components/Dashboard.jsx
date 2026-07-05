import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div style={{ padding: "30px" }}>
      <h1>My Account</h1>

      {user ? (
        <>
          <h2>Welcome {user.name}</h2>

          <p>Email: {user.email}</p>
        </>
      ) : (
        <h2>Please Login</h2>
      )}

      <br />

      <Link to="/">HOME</Link>
    </div>
  );
}

export default Dashboard;