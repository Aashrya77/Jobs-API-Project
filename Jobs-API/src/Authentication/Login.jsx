import React from "react";
import "./Auth.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {


  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        {
          email: email,
          password: password,
        }
      );
      localStorage.setItem("token", response.data.token);
     
      const token = localStorage.getItem("token");
      if (!token) {
        alert("User not authenticated");
        return;
      }

      navigate("/jobs");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container">
        <h1 style={{ textAlign: "center" }}>Login</h1>
        <form action="" onSubmit={loginUser}>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="Email"
            name="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <label htmlFor="Password">Password: </label>
          <input
            type="password"
            id="Password"
            name="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button>Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
