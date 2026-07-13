import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import './Login.css';
import gif from "../assets/gif.gif";
import Swal from "sweetalert2";
function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.post(
        "http://poultry-2-i927.onrender.com//api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      Swal.fire({
        icon: "success",
        
        text: "Login Successfull",
        background: "white",
        confirmButtonColor:"chocolate",
      });

      navigate("/dashboard");

    } catch (error) {

     Swal.fire({
  icon: "error",
  title: "Login Failed",
  text:
    error.response?.data?.message ||
    "Login Failed",
  confirmButtonColor: "chocolate",
});

    }
  };

  return (
    <div className="cl">
     <img
  src={gif}
  alt="Chicken"
  className="gif"
/>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <button type="submit" className="button">
          Login
        </button>

      </form>

      <p>
        Don't have an account?
        <Link to="/register">
          Register
        </Link>
      </p>

    </div>
  );
}

export default Login;