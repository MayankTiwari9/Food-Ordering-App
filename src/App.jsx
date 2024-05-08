import React, { useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Cart from "./Pages/Cart/Cart";
import PlaceOrder from "./Pages/PlaceOrder/PlaceOrder";
import Footer from "./Components/Footer/Footer";
import LoginPopup from "./Components/LoginPopup/LoginPopup";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));

  console.log(token);

  const updatedToken = (token) => {
    setToken(token);
  };

  const logoutHandler = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <>
      {showLogin ? (
        <LoginPopup setShowLogin={setShowLogin} updatedToken={updatedToken} />
      ) : (
        <></>
      )}
      <div className="app">
        <Navbar
          setShowLogin={setShowLogin}
          token={token}
          onLogout={logoutHandler}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition:Bounce
        />
      </div>
      <Footer />
    </>
  );
};

export default App;
