import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import egggif from "../assets/egggif.gif";
import Swal from "sweetalert2";
function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      console.log("Response:", res.data);

    
      if (res.status === 200 || res.status === 201) {
      Swal.fire({
  icon: "success",
  title: "Registration Success",
  text: res.data.message || "Registration Successful",
  confirmButtonColor: "chocolate",
});
        navigate("/login");
      }
    } catch (error) {
      console.error(error);

      if (error.response) {
  Swal.fire({
    icon: "error",
    title: "Registration Failed",
    text: error.response.data.message,
    confirmButtonColor: "red",
  });
  navigate("/login");
} else {
  Swal.fire({
    icon: "error",
    title: "Server Error",
    text: "Server not responding",
    confirmButtonColor: "red",
  });
}
    }
  };

  return (
    <div className="rg">
      <img
        src={egggif}
        alt="Chicken"
        className="egggif"
      />

      <h1>Register</h1>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <br />
        <br />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <br />
        <br />

        <button type="submit" className="register">
          Register
        </button>
      </form>

      <p>
        Already have an account?{" "}
        <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Register;