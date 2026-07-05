import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hello from "./Components/Hello";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Dashboard from "./Components/Dashboard";
import Products from "./Components/Products";
import Wishlist from "./Components/Wishlist";
import Cart from "./Components/Cart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<Hello />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;