import React, { useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";

const LoginPopup = ({ setShowLogin, updatedToken }) => {
  const [currState, setCurrState] = useState("Login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    if (currState === "Sign Up") {
      await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBzRCcLO7YsgxzBwi0JvEoutuL3MaWIhZY",
        {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "Application/json",
          },
        }
      )
        .then((res) => {
          if (res.ok) {
            toast.success("Signed Up Successfully");
            return res.json();
          } else {
            return res.json().then((data) => {
              toast.error(data.error.message);
              throw new Error("Authentication Failed");
            });
          }
        })
        .then((data) => {
          console.log(data);
          localStorage.setItem("email", data.email);
          localStorage.setItem("token", data.idToken);
          updatedToken(data.idToken);
          setShowLogin(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBzRCcLO7YsgxzBwi0JvEoutuL3MaWIhZY",
        {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "Application/json",
          },
        }
      )
        .then((res) => {
          if (res.ok) {
            toast.success("Logged In Successfully");
            return res.json();
          } else {
            return res.json().then((data) => {
              toast.error(data.error.message);
              throw new Error("Authentication Failed");
            });
          }
        })
        .then((data) => {
          console.log(data);
          localStorage.setItem("email", data.email);
          localStorage.setItem("token", data.idToken);
          updatedToken(data.idToken);
          setShowLogin(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={formSubmitHandler}>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-input">
          {currState == "Login" ? (
            <></>
          ) : (
            <input type="text" placeholder="Your name" required />
          )}
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            required
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account ?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an accout ?{" "}
            <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
